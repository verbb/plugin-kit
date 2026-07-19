import {
    computed,
    defineComponent,
    h,
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    type InjectionKey,
    type PropType,
    type VNodeChild,
} from 'vue';
import { recoverOverlays } from '@verbb/plugin-kit-web/plugin-kit';

import { AppFaultBoundary } from './AppFaultBoundary.js';
import { FaultFallback } from './FaultFallback.js';
import { isIgnorableGlobalError } from './isIgnorableGlobalError.js';
import type { AppFaultContext, AppFaultKind, AppFaultRecord } from './types.js';
import { useUiWatchdog } from './useUiWatchdog.js';

type RecordFaultInput = {
    kind: AppFaultKind;
    message: string;
    stack?: string;
    tagName?: string;
    fatal?: boolean;
};

export type AppFaultProviderProps = AppFaultContext & {
    /** When false, skip the main-thread watchdog (useful in tests). */
    enableWatchdog?: boolean;
    /** Labels for the fault UI — pass translated strings from the host app. */
    labels?: {
        fatalTitle?: string;
        fatalMessage?: string;
        stuckTitle?: string;
        stuckMessage?: string;
    };
};

export type AppFaultContextValue = {
    faults: AppFaultRecord[];
    hasFatalFault: boolean;
    isStuck: boolean;
    recordFault: (input: RecordFaultInput) => void;
    resetUi: () => void;
    reload: () => void;
    clearFaults: () => void;
    dismissStuck: () => void;
};

const AppFaultKey: InjectionKey<AppFaultContextValue> = Symbol('pluginKitAppFault');

const faultKey = (input: RecordFaultInput | AppFaultRecord): string =>
    `${input.kind}:${input.tagName ?? ''}:${input.message.split('\n')[0]}`;

export const AppFaultProvider = defineComponent({
    name: 'AppFaultProvider',
    props: {
        meta: { type: Object as PropType<Record<string, unknown>>, default: undefined },
        onResetUi: { type: Function as PropType<() => void>, default: undefined },
        onReload: { type: Function as PropType<() => void>, default: undefined },
        enableWatchdog: { type: Boolean, default: true },
        labels: {
            type: Object as PropType<AppFaultProviderProps['labels']>,
            default: undefined,
        },
    },
    setup(props, { slots }) {
        const faults = ref<AppFaultRecord[]>([]);
        const hasFatalFault = ref(false);
        const isStuck = ref(false);
        const seen = new Map<string, number>();

        const recordFault = (input: RecordFaultInput) => {
            const key = faultKey(input);
            const count = (seen.get(key) ?? 0) + 1;
            seen.set(key, count);

            const record: AppFaultRecord = {
                kind: input.kind,
                message: input.message,
                stack: input.stack,
                tagName: input.tagName,
                timestamp: Date.now(),
                count,
            };

            // Dedupe by key, keep newest first, cap at 8 for support bundles.
            faults.value = [record, ...faults.value.filter((item) => faultKey(item) !== key)].slice(0, 8);

            if (input.fatal !== false && (input.kind === 'vue' || input.kind === 'global')) {
                hasFatalFault.value = true;
            }
        };

        const resetUi = () => {
            const { actions, diagnostic } = recoverOverlays();
            console.info('[plugin-kit] overlay recovery:', actions.join(', '), diagnostic.report);
            props.onResetUi?.();
            isStuck.value = false;
            hasFatalFault.value = false;
            faults.value = [];
            seen.clear();
        };

        const reload = () => {
            if (props.onReload) {
                props.onReload();
                return;
            }

            window.location.reload();
        };

        const clearFaults = () => {
            hasFatalFault.value = false;
            faults.value = [];
            seen.clear();
        };

        const dismissStuck = () => {
            isStuck.value = false;
        };

        // Provide a reactive snapshot — inject consumers read .value via computed unwrap in templates,
        // but composables get the live refs through this object (mutated in place below).
        const contextValue: AppFaultContextValue = {
            get faults() {
                return faults.value;
            },
            get hasFatalFault() {
                return hasFatalFault.value;
            },
            get isStuck() {
                return isStuck.value;
            },
            recordFault,
            resetUi,
            reload,
            clearFaults,
            dismissStuck,
        };

        provide(AppFaultKey, contextValue);

        const onResetShortcut = (event: KeyboardEvent) => {
            const combo =
                (event.ctrlKey || event.metaKey) &&
                event.shiftKey &&
                (event.key === 'U' || event.key === 'u');

            if (!combo) {
                return;
            }

            event.preventDefault();
            resetUi();
        };

        const onError = (event: ErrorEvent) => {
            if (isIgnorableGlobalError(event.message, event.error)) {
                return;
            }

            recordFault({
                kind: 'global',
                message: event.message || event.error?.message || 'Unknown error',
                stack: event.error?.stack,
                fatal: true,
            });
        };

        const onRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason as Error | undefined;
            const message = reason?.message ?? String(event.reason);

            if (isIgnorableGlobalError(message, reason)) {
                return;
            }

            recordFault({
                kind: 'rejection',
                message,
                stack: reason?.stack,
                fatal: false,
            });
        };

        const onPkError = (event: Event) => {
            const detail = (event as CustomEvent<{ tagName?: string; message?: string; stack?: string }>)
                .detail;

            recordFault({
                kind: 'pk-error',
                tagName: detail?.tagName,
                message: detail?.message ?? 'Web component error',
                stack: detail?.stack,
                fatal: false,
            });
        };

        onMounted(() => {
            window.addEventListener('keydown', onResetShortcut, true);
            window.addEventListener('error', onError);
            window.addEventListener('unhandledrejection', onRejection);
            window.addEventListener('pk-error', onPkError);
        });

        onUnmounted(() => {
            window.removeEventListener('keydown', onResetShortcut, true);
            window.removeEventListener('error', onError);
            window.removeEventListener('unhandledrejection', onRejection);
            window.removeEventListener('pk-error', onPkError);
        });

        // Pause the watchdog once a fatal screen is up — no point flagging "stuck" over it.
        useUiWatchdog({
            enabled: computed(() => props.enableWatchdog && !hasFatalFault.value),
            onStall: () => {
                isStuck.value = true;
                recordFault({
                    kind: 'watchdog',
                    message: 'The builder stopped responding.',
                    fatal: false,
                });
            },
        });

        return (): VNodeChild =>
            h(AppFaultBoundary, {
                onFault: (fault: Omit<AppFaultRecord, 'timestamp' | 'count'>) =>
                    recordFault({
                        ...fault,
                        fatal: true,
                    }),
            }, {
                default: () => {
                    if (hasFatalFault.value) {
                        return h(FaultFallback, {
                            title: props.labels?.fatalTitle,
                            message: props.labels?.fatalMessage,
                            faults: faults.value,
                            meta: props.meta,
                            onReload: reload,
                            onResetUi: resetUi,
                        });
                    }

                    return [
                        isStuck.value
                            ? h(
                                  'div',
                                  { class: 'mb-3' },
                                  h(FaultFallback, {
                                      compact: true,
                                      title: props.labels?.stuckTitle ?? 'Builder became unresponsive',
                                      message:
                                          props.labels?.stuckMessage ??
                                          'The page may still scroll but clicks might not work. Reset UI to close stuck overlays, or reload if the problem continues.',
                                      faults: faults.value,
                                      meta: props.meta,
                                      onReload: reload,
                                      onResetUi: resetUi,
                                      onDismiss: dismissStuck,
                                  }),
                              )
                            : null,
                        slots.default?.(),
                    ];
                },
            });
    },
});

export function useAppFault(): AppFaultContextValue {
    const ctx = inject(AppFaultKey, null);

    if (!ctx) {
        throw new Error('useAppFault must be used within AppFaultProvider');
    }

    return ctx;
}

/** Optional composable — returns null outside a provider (for chrome mounted in separate trees). */
export function useAppFaultOptional(): AppFaultContextValue | null {
    return inject(AppFaultKey, null);
}

export type ResetUiButtonProps = {
    className?: string;
    label?: string;
};

/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
export const ResetUiButton = defineComponent({
    name: 'ResetUiButton',
    props: {
        className: { type: String, default: undefined },
        label: { type: String, default: 'Reset UI' },
    },
    setup(props) {
        const fault = useAppFaultOptional();

        return (): VNodeChild => {
            if (!fault) {
                return null;
            }

            return h(
                'button',
                {
                    type: 'button',
                    class: props.className,
                    title: 'Close stuck dialogs and overlays',
                    onClick: fault.resetUi,
                },
                props.label,
            );
        };
    },
});
