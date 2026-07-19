import { defineComponent, onErrorCaptured, ref, type VNodeChild } from 'vue';

import type { AppFaultRecord } from './types.js';

type FaultPayload = Omit<AppFaultRecord, 'timestamp' | 'count'>;

/**
 * Catches Vue render/lifecycle errors in the builder subtree via `onErrorCaptured`.
 * Emits `fault` then returns null so the parent provider can show {@link FaultFallback}.
 *
 * Listen with `onFault` in `h()` / templates — Vue maps that to the `fault` emit
 * (do not declare an `onFault` prop; `on*` keys are event listeners in `h()`).
 */
export const AppFaultBoundary = defineComponent({
    name: 'AppFaultBoundary',
    emits: {
        fault: (_fault: FaultPayload) => true,
    },
    setup(_props, { slots, emit }) {
        const hasError = ref(false);

        onErrorCaptured((error, _instance, info) => {
            hasError.value = true;

            const err = error instanceof Error ? error : new Error(String(error));
            // Append Vue's component info string the same way React appends componentStack.
            emit('fault', {
                kind: 'vue',
                message: err.message,
                stack: info ? `${err.stack ?? ''}\n\n${info}` : err.stack,
            });

            // Stop propagation — the provider owns fatal UI; avoid duplicate parent handlers.
            return false;
        });

        return (): VNodeChild => (hasError.value ? null : slots.default?.());
    },
});
