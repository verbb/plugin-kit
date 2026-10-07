import { PkStatePanelSize } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';
import { ReactNode } from 'react';
export type ErrorStateProps = {
    error?: Error | null;
    heading?: string | null;
    message?: string | null;
    detailsLabel?: string | null;
    copyLabel?: string | null;
    copiedLabel?: string | null;
    copyErrorLabel?: string | null;
    actionLabel?: string | null;
    onAction?: (() => void) | null;
    showDetails?: boolean;
    size?: PkStatePanelSize;
    className?: string;
    children?: ReactNode;
};
/**
 * React error adapter over the shared StatePanel component, with optional stack details.
 * Pass translated `heading` / `message` / labels from the host plugin.
 */
export declare function ErrorState({ error, heading, message, detailsLabel, copyLabel, copiedLabel, copyErrorLabel, actionLabel, onAction, showDetails, size, className, children, }: ErrorStateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ErrorState.d.ts.map