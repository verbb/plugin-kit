import { defineComponent, h, type PropType, type VNodeChild } from 'vue';

import { buildSupportBundle } from './buildSupportBundle.js';
import type { AppFaultRecord } from './types.js';

export type FaultFallbackProps = {
    title?: string;
    message?: string;
    faults: AppFaultRecord[];
    meta?: Record<string, unknown>;
    onReload: () => void;
    onResetUi?: () => void;
    onDismiss?: () => void;
    /** When true, show inline banner styling instead of full-panel takeover. */
    compact?: boolean;
};

const btnClass =
    'inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50';

const btnPrimaryClass =
    'inline-flex items-center justify-center rounded-md border border-transparent bg-[#0d78f2] px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#0b6ad9] disabled:opacity-50';

export const FaultFallback = defineComponent({
    name: 'FaultFallback',
    props: {
        title: { type: String, default: 'Something went wrong' },
        message: {
            type: String,
            default: 'The builder hit an unexpected error. You can try resetting the UI or reloading the builder.',
        },
        faults: { type: Array as PropType<AppFaultRecord[]>, required: true },
        meta: { type: Object as PropType<Record<string, unknown>>, default: undefined },
        onReload: { type: Function as PropType<() => void>, required: true },
        onResetUi: { type: Function as PropType<() => void>, default: undefined },
        onDismiss: { type: Function as PropType<() => void>, default: undefined },
        compact: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const copyDetails = async () => {
            const text = buildSupportBundle(props.faults, props.meta);

            try {
                await navigator.clipboard.writeText(text);
            } catch {
                console.warn('[plugin-kit] support bundle:\n', text);
            }
        };

        return (): VNodeChild => {
            const shellClass = props.compact
                ? 'rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950'
                : 'rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-900';

            return h('div', { class: shellClass, role: 'alert' }, [
                h('div', { class: 'font-semibold' }, props.title),
                h('p', { class: 'mt-2 text-[13px] leading-relaxed opacity-90' }, props.message),
                slots.default?.(),
                h('div', { class: 'mt-4 flex flex-wrap gap-2' }, [
                    props.onResetUi
                        ? h(
                              'button',
                              { type: 'button', class: btnClass, onClick: props.onResetUi },
                              'Reset UI',
                          )
                        : null,
                    h(
                        'button',
                        { type: 'button', class: btnPrimaryClass, onClick: props.onReload },
                        'Reload builder',
                    ),
                    h(
                        'button',
                        {
                            type: 'button',
                            class: btnClass,
                            onClick: () => {
                                void copyDetails();
                            },
                        },
                        'Copy details for support',
                    ),
                    props.onDismiss
                        ? h(
                              'button',
                              { type: 'button', class: btnClass, onClick: props.onDismiss },
                              'Dismiss',
                          )
                        : null,
                ]),
                !props.compact && props.faults[0]?.message
                    ? h(
                          'pre',
                          {
                              class:
                                  'mt-4 max-h-40 overflow-auto rounded border border-red-200/60 bg-white/70 p-3 text-xs text-red-800',
                          },
                          props.faults[0].message,
                      )
                    : null,
            ]);
        };
    },
});
