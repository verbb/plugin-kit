import React, { forwardRef, useCallback } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkCheckboxSelect,
    type PkCheckboxSelectOption,
    type PkCheckboxSelectValue,
} from '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkCheckboxSelectElement = createPluginKitComponent({
    tagName: 'pk-checkbox-select',
    elementClass: PkCheckboxSelect,
    react: React,
    events: {
        onPkChange: 'pk-change',
        // Keep native `change` available as `onNativeChange` if needed; React `onChange`
        // is value sugar (see EditableTable) so `onChange={setValue}` works.
        onNativeChange: 'change',
    },
});

type PkCheckboxSelectElementProps = React.ComponentProps<typeof PkCheckboxSelectElement>;

export type CheckboxSelectProps = Omit<PkCheckboxSelectElementProps, 'onChange'> & {
    /**
     * Controlled value callback — sugar over `onPkChange` detail.
     * Prefer this in React apps; `onPkChange` remains for CE parity.
     */
    onChange?: (value: PkCheckboxSelectValue) => void;
};

/** React facade over `<pk-checkbox-select>`. Behavior and styles live in the web component. */
export const CheckboxSelect = forwardRef<PkCheckboxSelect, CheckboxSelectProps>(
    function CheckboxSelect({ disabled, onChange, onPkChange, ...rest }, ref) {
        const handlePkChange = useCallback(
            (event: Event) => {
                onPkChange?.(event as Parameters<NonNullable<PkCheckboxSelectElementProps['onPkChange']>>[0]);

                if (!onChange) {
                    return;
                }

                const detail = (event as CustomEvent<{ value: PkCheckboxSelectValue }>).detail;
                if (detail && 'value' in detail) {
                    onChange(detail.value);
                }
            },
            [onChange, onPkChange],
        );

        return (
            <PkCheckboxSelectElement
                ref={ref}
                {...rest}
                {...trueBooleanProps(['disabled'], { disabled })}
                {...(onChange || onPkChange ? { onPkChange: handlePkChange } : {})}
            />
        );
    },
);

CheckboxSelect.displayName = 'CheckboxSelect';

export { PkCheckboxSelectElement };
export { ALL_VALUE } from '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
export type { PkCheckboxSelectOption, PkCheckboxSelectValue };
