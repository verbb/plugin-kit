import { PropType, VNodeChild } from 'vue';
import { AppFaultContext, AppFaultKind, AppFaultRecord } from './types.js';
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
export declare const AppFaultProvider: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    meta: {
        type: PropType<Record<string, unknown>>;
        default: undefined;
    };
    onResetUi: {
        type: PropType<() => void>;
        default: undefined;
    };
    onReload: {
        type: PropType<() => void>;
        default: undefined;
    };
    enableWatchdog: {
        type: BooleanConstructor;
        default: boolean;
    };
    labels: {
        type: PropType<AppFaultProviderProps["labels"]>;
        default: undefined;
    };
}>, () => VNodeChild, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    meta: {
        type: PropType<Record<string, unknown>>;
        default: undefined;
    };
    onResetUi: {
        type: PropType<() => void>;
        default: undefined;
    };
    onReload: {
        type: PropType<() => void>;
        default: undefined;
    };
    enableWatchdog: {
        type: BooleanConstructor;
        default: boolean;
    };
    labels: {
        type: PropType<AppFaultProviderProps["labels"]>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    meta: Record<string, unknown>;
    onReload: () => void;
    onResetUi: () => void;
    labels: {
        fatalTitle?: string;
        fatalMessage?: string;
        stuckTitle?: string;
        stuckMessage?: string;
    } | undefined;
    enableWatchdog: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare function useAppFault(): AppFaultContextValue;
/** Optional composable — returns null outside a provider (for chrome mounted in separate trees). */
export declare function useAppFaultOptional(): AppFaultContextValue | null;
export type ResetUiButtonProps = {
    className?: string;
    label?: string;
};
/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
export declare const ResetUiButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
}>, () => VNodeChild, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    label: string;
    className: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export {};
//# sourceMappingURL=AppFaultProvider.d.ts.map