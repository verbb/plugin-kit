import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkCheckbox } from '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';

import { readPkCheckedDetail } from '../utils/pk-change.js';

const PkCheckboxElement = createPluginKitComponent({
    tagName: 'pk-checkbox',
    elementClass: PkCheckbox,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onChange: 'change',
    },
});

export type CheckboxProps = Omit<React.ComponentProps<typeof PkCheckboxElement>, 'checkboxValue'> & {
    /** Controlled checked state. Omit for uncontrolled. */
    checked?: boolean;
    /**
     * Initial checked state when uncontrolled.
     * Mapped to `checked` on first paint — `pk-checkbox` only reads `default-checked` on form reset.
     */
    defaultChecked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    'data-state'?: 'focus-visible';
    /** Controlled checked updates — unwraps `pk-change` `detail.checked`. */
    onCheckedChange?: (checked: boolean) => void;
};

/** React facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
export function Checkbox({
    children,
    checked,
    defaultChecked,
    indeterminate = false,
    disabled = false,
    invalid = false,
    required = false,
    value = 'on',
    'data-state': dataState,
    onCheckedChange,
    onPkChange,
    ...props
}: CheckboxProps) {
    // Uncontrolled + defaultChecked: seed the WC `checked` prop once. Keep subsequent
    // user toggles by not forcing a controlled `checked={false}` default (legacy Base UI habit).
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
    const isControlled = checked !== undefined;
    const resolvedChecked = isControlled ? checked : uncontrolledChecked;

    const handlePkChange = (event: Event): void => {
        const next = readPkCheckedDetail(event);

        if (!isControlled) {
            setUncontrolledChecked(next);
        }

        onPkChange?.(event as Parameters<NonNullable<CheckboxProps['onPkChange']>>[0]);
        onCheckedChange?.(next);
    };

    return (
        <PkCheckboxElement
            checked={resolvedChecked}
            defaultChecked={defaultChecked}
            indeterminate={indeterminate}
            disabled={disabled}
            invalid={invalid}
            required={required}
            checkboxValue={value}
            {...(dataState ? { 'data-state': dataState } : {})}
            onPkChange={handlePkChange}
            {...props}
        >
            {children}
        </PkCheckboxElement>
    );
}

export { PkCheckboxElement };
