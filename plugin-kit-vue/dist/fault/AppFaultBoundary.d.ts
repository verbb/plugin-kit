import { VNodeChild } from 'vue';
import { AppFaultRecord } from './types.js';
type FaultPayload = Omit<AppFaultRecord, 'timestamp' | 'count'>;
/**
 * Catches Vue render/lifecycle errors in the builder subtree via `onErrorCaptured`.
 * Emits `fault` then returns null so the parent provider can show {@link FaultFallback}.
 *
 * Listen with `onFault` in `h()` / templates — Vue maps that to the `fault` emit
 * (do not declare an `onFault` prop; `on*` keys are event listeners in `h()`).
 */
export declare const AppFaultBoundary: import('vue').DefineComponent<{}, () => VNodeChild, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    fault: (_fault: FaultPayload) => true;
}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{
    onFault?: ((_fault: FaultPayload) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export {};
//# sourceMappingURL=AppFaultBoundary.d.ts.map