import { PropType, VNodeChild } from 'vue';
import { AppFaultRecord } from './types.js';
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
export declare const FaultFallback: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
    faults: {
        type: PropType<AppFaultRecord[]>;
        required: true;
    };
    meta: {
        type: PropType<Record<string, unknown>>;
        default: undefined;
    };
    onReload: {
        type: PropType<() => void>;
        required: true;
    };
    onResetUi: {
        type: PropType<() => void>;
        default: undefined;
    };
    onDismiss: {
        type: PropType<() => void>;
        default: undefined;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => VNodeChild, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    message: {
        type: StringConstructor;
        default: string;
    };
    faults: {
        type: PropType<AppFaultRecord[]>;
        required: true;
    };
    meta: {
        type: PropType<Record<string, unknown>>;
        default: undefined;
    };
    onReload: {
        type: PropType<() => void>;
        required: true;
    };
    onResetUi: {
        type: PropType<() => void>;
        default: undefined;
    };
    onDismiss: {
        type: PropType<() => void>;
        default: undefined;
    };
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    meta: Record<string, unknown>;
    title: string;
    message: string;
    onResetUi: () => void;
    onDismiss: () => void;
    compact: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=FaultFallback.d.ts.map