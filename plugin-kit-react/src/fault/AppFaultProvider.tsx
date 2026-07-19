import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
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
    children: ReactNode;
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

type AppFaultContextValue = {
    faults: AppFaultRecord[];
    hasFatalFault: boolean;
    isStuck: boolean;
    recordFault: (input: RecordFaultInput) => void;
    resetUi: () => void;
    reload: () => void;
    clearFaults: () => void;
    dismissStuck: () => void;
};

const AppFaultReactContext = createContext<AppFaultContextValue | null>(null);

const faultKey = (input: RecordFaultInput): string =>
    `${input.kind}:${input.tagName ?? ''}:${input.message.split('\n')[0]}`;

export function AppFaultProvider({
    children,
    meta,
    onResetUi,
    onReload,
    enableWatchdog = true,
    labels,
}: AppFaultProviderProps) {
    const [faults, setFaults] = useState<AppFaultRecord[]>([]);
    const [hasFatalFault, setHasFatalFault] = useState(false);
    const [isStuck, setIsStuck] = useState(false);
    const seenRef = useRef(new Map<string, number>());

    const recordFault = useCallback((input: RecordFaultInput) => {
        const key = faultKey(input);
        const count = (seenRef.current.get(key) ?? 0) + 1;
        seenRef.current.set(key, count);

        const record: AppFaultRecord = {
            kind: input.kind,
            message: input.message,
            stack: input.stack,
            tagName: input.tagName,
            timestamp: Date.now(),
            count,
        };

        setFaults((prev) => {
            const withoutDup = prev.filter((item) => faultKey(item) !== key);
            return [record, ...withoutDup].slice(0, 8);
        });

        if (input.fatal !== false && (input.kind === 'react' || input.kind === 'global')) {
            setHasFatalFault(true);
        }
    }, []);

    const resetUi = useCallback(() => {
        const { actions, diagnostic } = recoverOverlays();
        console.info('[plugin-kit] overlay recovery:', actions.join(', '), diagnostic.report);
        onResetUi?.();
        setIsStuck(false);
        setHasFatalFault(false);
        setFaults([]);
        seenRef.current.clear();
    }, [onResetUi]);

    const reload = useCallback(() => {
        if (onReload) {
            onReload();
            return;
        }

        window.location.reload();
    }, [onReload]);

    const clearFaults = useCallback(() => {
        setHasFatalFault(false);
        setFaults([]);
        seenRef.current.clear();
    }, []);

    const dismissStuck = useCallback(() => {
        setIsStuck(false);
    }, []);

    useEffect(() => {
        const onResetShortcut = (event: KeyboardEvent) => {
            const combo =
                (event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'U' || event.key === 'u');

            if (!combo) {
                return;
            }

            event.preventDefault();
            resetUi();
        };

        window.addEventListener('keydown', onResetShortcut, true);

        return () => {
            window.removeEventListener('keydown', onResetShortcut, true);
        };
    }, [resetUi]);

    useEffect(() => {
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
            const detail = (event as CustomEvent<{ tagName?: string; message?: string; stack?: string }>).detail;

            recordFault({
                kind: 'pk-error',
                tagName: detail?.tagName,
                message: detail?.message ?? 'Web component error',
                stack: detail?.stack,
                fatal: false,
            });
        };

        window.addEventListener('error', onError);
        window.addEventListener('unhandledrejection', onRejection);
        window.addEventListener('pk-error', onPkError);

        return () => {
            window.removeEventListener('error', onError);
            window.removeEventListener('unhandledrejection', onRejection);
            window.removeEventListener('pk-error', onPkError);
        };
    }, [recordFault]);

    useUiWatchdog({
        enabled: enableWatchdog && !hasFatalFault,
        onStall: () => {
            setIsStuck(true);
            recordFault({
                kind: 'watchdog',
                message: 'The builder stopped responding.',
                fatal: false,
            });
        },
    });

    const value = useMemo<AppFaultContextValue>(
        () => ({
            faults,
            hasFatalFault,
            isStuck,
            recordFault,
            resetUi,
            reload,
            clearFaults,
            dismissStuck,
        }),
        [faults, hasFatalFault, isStuck, recordFault, resetUi, reload, clearFaults, dismissStuck],
    );

    return (
        <AppFaultReactContext.Provider value={value}>
            <AppFaultBoundary
                onFault={(fault) =>
                    recordFault({
                        ...fault,
                        fatal: true,
                    })
                }
            >
                {hasFatalFault ? (
                    <FaultFallback
                        title={labels?.fatalTitle}
                        message={labels?.fatalMessage}
                        faults={faults}
                        meta={meta}
                        onReload={reload}
                        onResetUi={resetUi}
                    />
                ) : (
                    <>
                        {isStuck ? (
                            <div className="mb-3">
                                <FaultFallback
                                    compact
                                    title={labels?.stuckTitle ?? 'Builder became unresponsive'}
                                    message={
                                        labels?.stuckMessage ??
                                        'The page may still scroll but clicks might not work. Reset UI to close stuck overlays, or reload if the problem continues.'
                                    }
                                    faults={faults}
                                    meta={meta}
                                    onReload={reload}
                                    onResetUi={resetUi}
                                    onDismiss={dismissStuck}
                                />
                            </div>
                        ) : null}
                        {children}
                    </>
                )}
            </AppFaultBoundary>
        </AppFaultReactContext.Provider>
    );
}

export function useAppFault(): AppFaultContextValue {
    const ctx = useContext(AppFaultReactContext);

    if (!ctx) {
        throw new Error('useAppFault must be used within AppFaultProvider');
    }

    return ctx;
}

/** Optional hook — returns null outside a provider (for chrome mounted in separate portals). */
export function useAppFaultOptional(): AppFaultContextValue | null {
    return useContext(AppFaultReactContext);
}

export type ResetUiButtonProps = {
    className?: string;
    label?: string;
};

/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
export function ResetUiButton({ className, label = 'Reset UI' }: ResetUiButtonProps) {
    const fault = useAppFaultOptional();

    if (!fault) {
        return null;
    }

    return (
        <button type="button" className={className} onClick={fault.resetUi} title="Close stuck dialogs and overlays">
            {label}
        </button>
    );
}
