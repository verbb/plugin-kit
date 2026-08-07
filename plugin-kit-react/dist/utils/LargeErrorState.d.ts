import { ReactNode } from 'react';
export type LargeErrorStateProps = {
    error?: Error | null;
    title?: string | null;
    message?: string | null;
    detailsLabel?: string | null;
    actionLabel?: string | null;
    onAction?: (() => void) | null;
    showDetails?: boolean;
    containerClassName?: string;
    contentClassName?: string;
    children?: ReactNode;
};
/**
 * StatePanel error variant + optional stack details (Formie LargeErrorState).
 * Pass translated `title` / `message` / labels from the host plugin.
 */
export declare function LargeErrorState({ error, title, message, detailsLabel, actionLabel, onAction, showDetails, containerClassName, contentClassName, }: LargeErrorStateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LargeErrorState.d.ts.map