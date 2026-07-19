import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkCombobox,
    type PkComboboxAsyncOption,
    type PkComboboxFetchHandler,
    type PkComboboxFilter,
    type PkComboboxSize,
} from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkComboboxElement = createPluginKitComponent({
    tagName: 'pk-combobox',
    elementClass: PkCombobox,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkClear: 'pk-clear',
        onPkCreate: 'pk-create',
        onInput: 'input',
        onChange: 'change',
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

type PkComboboxElementProps = React.ComponentProps<typeof PkComboboxElement>;

/** React facade over `<pk-combobox>`. Behavior and styles live in the web component. */
export const Combobox = forwardRef<PkCombobox, PkComboboxElementProps>(function Combobox(props, ref) {
    const {
        disabled, invalid, clearable, multiple, open, popupMode, allowCreate, allowCustomValue, ...rest
    } = props;

    return (
        <PkComboboxElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(
                ['disabled', 'invalid', 'clearable', 'multiple', 'open', 'popupMode', 'allowCreate', 'allowCustomValue'],
                {
                    disabled, invalid, clearable, multiple, open, popupMode, allowCreate, allowCustomValue,
                },
            )}
        />
    );
});

Combobox.displayName = 'Combobox';

export { PkComboboxElement };
export type ComboboxProps = PkComboboxElementProps;
export type { PkComboboxAsyncOption, PkComboboxFetchHandler, PkComboboxFilter, PkComboboxSize };
