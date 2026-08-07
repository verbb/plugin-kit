import { getErrorMessage } from '@verbb/plugin-kit-core';
import type { ReactNode } from 'react';

import { StatePanel } from './StatePanel.js';

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
export function LargeErrorState({
    error = null,
    title = null,
    message = null,
    detailsLabel = null,
    actionLabel = null,
    onAction = null,
    showDetails = true,
    containerClassName = 'flex flex-1 items-center justify-center py-12',
    contentClassName = 'flex w-[90%] max-w-[560px] flex-col items-center text-center',
}: LargeErrorStateProps) {
    const resolvedError = error ? getErrorMessage(error) : null;
    const resolvedTitle = title || resolvedError?.heading || 'Something went wrong';
    const resolvedMessage = resolvedError?.text || message || 'An error has occurred.';
    const resolvedDetailsLabel = detailsLabel || 'Show error details';
    const traceAsString = resolvedError?.traceAsString || '';

    return (
        <StatePanel
            variant="error"
            title={resolvedTitle}
            message={resolvedMessage}
            containerClassName={containerClassName}
            contentClassName={contentClassName}
            primaryAction={
                actionLabel && onAction
                    ? { label: actionLabel, onClick: onAction, variant: 'primary' }
                    : null
            }
        >
            {showDetails && traceAsString ? (
                <details className="mb-4 w-full text-center text-xs text-rose-600">
                    <summary className="cursor-pointer">{resolvedDetailsLabel}</summary>

                    <div className="mt-2 whitespace-pre-wrap text-left">
                        <p className="mb-2">
                            {resolvedError?.heading}: {resolvedError?.text}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: traceAsString }} />
                    </div>
                </details>
            ) : null}
        </StatePanel>
    );
}
