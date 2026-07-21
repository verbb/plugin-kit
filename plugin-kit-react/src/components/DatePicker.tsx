import React, { forwardRef, useMemo } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkDatePicker, type PkDatePickerMode, type PkDatePickerSize } from '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkDatePickerElement = createPluginKitComponent({
    tagName: 'pk-date-picker',
    elementClass: PkDatePicker,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkClear: 'pk-clear',
        onInput: 'input',
        onChange: 'change',
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
    },
});

type PkDatePickerElementProps = React.ComponentProps<typeof PkDatePickerElement>;

export type DatePickerProps = Omit<PkDatePickerElementProps, 'value' | 'onPkChange'> & {
    /** ISO string, Date, or empty — v1 DatePicker accepted Date. */
    value?: string | Date | null;
    /** React/Formie alias for the CE `invalid` boolean. */
    isInvalid?: boolean;
    /**
     * v1 callback — receives a local `Date` (or `undefined` when cleared).
     * Prefer `onPkChange` for raw ISO `detail.value` from the CE.
     */
    onValueChange?: (value: Date | undefined) => void;
    onPkChange?: PkDatePickerElementProps['onPkChange'];
    /** Sugar for the CE `with-clear` toggle. */
    clearable?: boolean;
    /** Sugar for the CE `mode="multiple"` (multi-date selection). Explicit `mode` wins. */
    multiple?: boolean;
};

/** Local YYYY-MM-DD — keep facade free of non-exported kit util paths. */
function formatIsoDate(date: Date): string {
    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return date;
}

/** Coerce Formie/v1 Date|string values to the CE’s ISO `YYYY-MM-DD` string. */
function toIsoValue(value: string | Date | null | undefined): string {
    if (value == null || value === '') {
        return '';
    }

    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
            return '';
        }

        return formatIsoDate(value);
    }

    const str = String(value);

    // Range (`from/to`) and multiple (`a,b,c`) values are already CE-formatted ISO lists —
    // pass them through untouched. Only a lone date(time) gets trimmed to `YYYY-MM-DD`.
    if (str.includes('/') || str.includes(',')) {
        return str;
    }

    const dateOnly = str.match(/^(\d{4}-\d{2}-\d{2})/);

    return dateOnly ? dateOnly[1] : str;
}

/** React facade over `<pk-date-picker>`. Behavior and styles live in the web component. */
export const DatePicker = forwardRef<PkDatePicker, DatePickerProps>(function DatePicker(props, ref) {
    const {
        value,
        onValueChange,
        onPkChange,
        disabled,
        invalid,
        isInvalid,
        clearable,
        multiple,
        mode,
        open,
        disablePast,
        disableFuture,
        withClear,
        required,
        ...rest
    } = props;

    // Docs / Formie often pass `isInvalid`; Lit property is `invalid`.
    const resolvedInvalid = Boolean(invalid ?? isInvalid);
    // `clearable` is the legacy/docs name for the CE's `with-clear` toggle — the CE
    // exposes a single `withClear` property (same convention as pk-input), so fold them.
    const resolvedWithClear = withClear ?? clearable;
    // `multiple` is sugar for the CE's `mode="multiple"`; an explicit `mode` wins.
    const resolvedMode = mode ?? (multiple ? 'multiple' : undefined);
    const isoValue = useMemo(() => toIsoValue(value), [value]);

    // Element event map types `onPkChange` as `(e: Event) => void`; widen at the boundary
    // and read the CustomEvent detail after a local cast.
    const handlePkChange = (event: Event) => {
        onPkChange?.(event as never);

        if (!onValueChange) {
            return;
        }

        const next = (event as CustomEvent<{ value?: string }>).detail?.value;
        onValueChange(next ? (parseIsoDate(next) ?? undefined) : undefined);
    };

    return (
        <PkDatePickerElement
            ref={ref}
            {...rest}
            value={isoValue}
            {...(resolvedMode ? { mode: resolvedMode } : {})}
            onPkChange={handlePkChange}
            {...trueBooleanProps(
                [
                    'disabled',
                    'invalid',
                    'open',
                    'disablePast',
                    'disableFuture',
                    'withClear',
                    'required',
                ],
                {
                    disabled,
                    invalid: resolvedInvalid,
                    open,
                    disablePast,
                    disableFuture,
                    withClear: resolvedWithClear,
                    required,
                },
            )}
        />
    );
});

DatePicker.displayName = 'DatePicker';

export { PkDatePickerElement };
export type { PkDatePickerMode, PkDatePickerSize };
