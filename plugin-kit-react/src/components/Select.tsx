import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkOption } from '@verbb/plugin-kit-web/components/select/pk-option.js';
import { PkOptionGroup } from '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import { PkSelect, type PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkSelectElement = createPluginKitComponent({
    tagName: 'pk-select',
    elementClass: PkSelect,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkClear: 'pk-clear',
        onInput: 'input',
        onChange: 'change',
        // `blur` does not bubble out of the delegatesFocus shadow root; `focusout` does.
        onFocusOut: 'focusout',
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

const PkOptionElement = createPluginKitComponent({
    tagName: 'pk-option',
    elementClass: PkOption,
    react: React,
    events: {
        onPkOptionSelect: 'pk-option-select',
        onPkOptionHighlight: 'pk-option-highlight',
    },
});

export const PkOptionGroupElement = createPluginKitComponent({
    tagName: 'pk-option-group',
    elementClass: PkOptionGroup,
    react: React,
});

type PkSelectElementProps = React.ComponentProps<typeof PkSelectElement>;
type PkOptionElementProps = React.ComponentProps<typeof PkOptionElement>;

/** React facades over the `<pk-select>` family. Behavior and styles live in the web components. */
export const Select = forwardRef<PkSelect, PkSelectElementProps>(function Select(props, ref) {
    const {
        disabled, invalid, clearable, multiple, open, ...rest
    } = props;

    return (
        <PkSelectElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(
                ['disabled', 'invalid', 'clearable', 'multiple', 'open'],
                {
                    disabled, invalid, clearable, multiple, open,
                },
            )}
        />
    );
});

Select.displayName = 'Select';

export const Option = forwardRef<PkOption, PkOptionElementProps>(function Option(props, ref) {
    const {
        disabled, selected, highlighted, hidden, ...rest
    } = props;

    return (
        <PkOptionElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(
                ['disabled', 'selected', 'highlighted', 'hidden'],
                {
                    disabled, selected, highlighted, hidden,
                },
            )}
        />
    );
});

Option.displayName = 'Option';

export const OptionGroup = PkOptionGroupElement;

export { PkSelectElement, PkOptionElement };
export type SelectProps = PkSelectElementProps;
export type OptionProps = PkOptionElementProps;
export type OptionGroupProps = React.ComponentProps<typeof PkOptionGroupElement>;
export type { PkSelectSize };
