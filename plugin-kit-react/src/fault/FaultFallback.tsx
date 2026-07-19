import type { ReactNode } from 'react';

import { buildSupportBundle } from './buildSupportBundle.js';
import type { AppFaultRecord } from './types.js';

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

const btnClass =
    'inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50';

const btnPrimaryClass =
    'inline-flex items-center justify-center rounded-md border border-transparent bg-[#0d78f2] px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#0b6ad9] disabled:opacity-50';

export function FaultFallback({
    title = 'Something went wrong',
    message = 'The builder hit an unexpected error. You can try resetting the UI or reloading the builder.',
    faults,
    meta,
    onReload,
    onResetUi,
    onDismiss,
    compact = false,
    children,
}: FaultFallbackProps) {
    const copyDetails = async () => {
        const text = buildSupportBundle(faults, meta);

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            console.warn('[plugin-kit] support bundle:\n', text);
        }
    };

    const shellClass = compact
        ? 'rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950'
        : 'rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-900';

    return (
        <div className={shellClass} role="alert">
            <div className="font-semibold">{title}</div>
            <p className="mt-2 text-[13px] leading-relaxed opacity-90">{message}</p>

            {children}

            <div className="mt-4 flex flex-wrap gap-2">
                {onResetUi ? (
                    <button type="button" className={btnClass} onClick={onResetUi}>
                        Reset UI
                    </button>
                ) : null}
                <button type="button" className={btnPrimaryClass} onClick={onReload}>
                    Reload builder
                </button>
                <button type="button" className={btnClass} onClick={() => void copyDetails()}>
                    Copy details for support
                </button>
                {onDismiss ? (
                    <button type="button" className={btnClass} onClick={onDismiss}>
                        Dismiss
                    </button>
                ) : null}
            </div>

            {!compact && faults[0]?.message ? (
                <pre className="mt-4 max-h-40 overflow-auto rounded border border-red-200/60 bg-white/70 p-3 text-xs text-red-800">
                    {faults[0].message}
                </pre>
            ) : null}
        </div>
    );
}
