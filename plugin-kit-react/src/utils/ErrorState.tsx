import { getErrorMessage } from '@verbb/plugin-kit-core';
import type { PkStatePanelSize } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';
import type { ReactNode } from 'react';

import { Button } from '../components/Button.js';
import { StatePanel } from '../components/StatePanel.js';

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
export function ErrorState({
    error = null,
    heading = null,
    message = null,
    detailsLabel = null,
    copyLabel = null,
    copiedLabel = null,
    copyErrorLabel = null,
    actionLabel = null,
    onAction = null,
    showDetails = true,
    size = 'default',
    className,
    children = null,
}: ErrorStateProps) {
    const resolvedError = error ? getErrorMessage(error) : null;
    const resolvedHeading = heading || resolvedError?.heading || 'Something went wrong';
    const resolvedMessage = message || resolvedError?.text || 'An error has occurred.';
    const resolvedDetailsLabel = detailsLabel || 'Show error details';
    const resolvedCopyLabel = copyLabel || 'Copy error details';
    const resolvedCopiedLabel = copiedLabel || 'Error details copied.';
    const resolvedCopyErrorLabel = copyErrorLabel || 'Copy failed. Select the details and copy them manually.';
    const errorSummary = resolvedError
        ? [resolvedError.heading, resolvedError.text].filter(Boolean).join(': ')
        : '';
    const errorDetails = [errorSummary, ...(resolvedError?.traceAsArray || [])]
        .filter(Boolean)
        .join('\n\n');

    return (
        <StatePanel
            variant="error"
            size={size}
            heading={resolvedHeading}
            detailsLabel={resolvedDetailsLabel}
            copyLabel={resolvedCopyLabel}
            copiedLabel={resolvedCopiedLabel}
            copyErrorLabel={resolvedCopyErrorLabel}
            copyable={showDetails && Boolean(errorDetails)}
            className={className}
        >
            <span>{resolvedMessage}</span>
            {children}

            {showDetails && errorDetails ? <pre slot="details">{errorDetails}</pre> : null}

            {actionLabel && onAction ? (
                <Button slot="actions" type="button" variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            ) : null}
        </StatePanel>
    );
}
