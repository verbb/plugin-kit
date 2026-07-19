import { ReactNode } from 'react';
import { AppFaultContext, AppFaultKind, AppFaultRecord } from './types.js';
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
export declare function AppFaultProvider({ children, meta, onResetUi, onReload, enableWatchdog, labels, }: AppFaultProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useAppFault(): AppFaultContextValue;
/** Optional hook — returns null outside a provider (for chrome mounted in separate portals). */
export declare function useAppFaultOptional(): AppFaultContextValue | null;
export type ResetUiButtonProps = {
    className?: string;
    label?: string;
};
/** Always-reachable overlay recovery — mount in builder chrome, not inside dialogs. */
export declare function ResetUiButton({ className, label }: ResetUiButtonProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=AppFaultProvider.d.ts.map