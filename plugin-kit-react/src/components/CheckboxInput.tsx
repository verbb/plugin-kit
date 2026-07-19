import React, { type ReactNode } from 'react';

import { Checkbox, type CheckboxProps } from './Checkbox.js';

export interface CheckboxInputProps extends Omit<CheckboxProps, 'children'> {
    label: ReactNode;
    description?: ReactNode;
    className?: string;
}

/**
 * Convenience facade pairing `<pk-checkbox>` with a label + optional description, mirroring the
 * `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>` (no Tailwind) — the
 * checkbox itself is styled inside the web component's shadow root.
 */
export function CheckboxInput({
    label,
    description,
    className,
    disabled,
    ...props
}: CheckboxInputProps) {
    return (
        <label
            data-slot="checkbox-input"
            className={className}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
            }}
        >
            <Checkbox disabled={disabled} {...props} />
            <span data-slot="checkbox-input-body" style={{ minWidth: 0, opacity: disabled ? 0.5 : undefined }}>
                <span data-slot="checkbox-input-label" style={{ display: 'block', lineHeight: 1.25 }}>
                    {label}
                </span>
                {description ? (
                    <span
                        data-slot="checkbox-input-description"
                        style={{ display: 'block', marginTop: '0.25rem', color: 'var(--pk-color-text-muted, #64748b)' }}
                    >
                        {description}
                    </span>
                ) : null}
            </span>
        </label>
    );
}
