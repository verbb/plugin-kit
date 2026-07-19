import { ReactNode } from 'react';
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
    children?: ReactNode;
};
export declare function FaultFallback({ title, message, faults, meta, onReload, onResetUi, onDismiss, compact, children, }: FaultFallbackProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FaultFallback.d.ts.map