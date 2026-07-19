import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkRadio } from '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { PkRadioGroup, type PkRadioGroupOrientation } from '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkRadioGroupElement = createPluginKitComponent({
    tagName: 'pk-radio-group',
    elementClass: PkRadioGroup,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onInput: 'input',
        onChange: 'change',
    },
});

const PkRadioElement = createPluginKitComponent({
    tagName: 'pk-radio',
    elementClass: PkRadio,
    react: React,
    events: {
        onPkRadioSelect: 'pk-radio-select',
    },
});

type PkRadioGroupElementProps = React.ComponentProps<typeof PkRadioGroupElement>;
type PkRadioElementProps = React.ComponentProps<typeof PkRadioElement>;

/** React facade over `<pk-radio-group>`. Behavior and styles live in the web component. */
export const RadioGroup = forwardRef<PkRadioGroup, PkRadioGroupElementProps>(function RadioGroup(props, ref) {
    const {
        disabled, invalid, required, ...rest
    } = props;

    return (
        <PkRadioGroupElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'invalid', 'required'], { disabled, invalid, required })}
        />
    );
});

RadioGroup.displayName = 'RadioGroup';

export const Radio = forwardRef<PkRadio, PkRadioElementProps>(function Radio(props, ref) {
    const {
        disabled, invalid, required, checked, ...rest
    } = props;

    return (
        <PkRadioElement
            ref={ref}
            {...rest}
            {...trueBooleanProps(['disabled', 'invalid', 'required', 'checked'], {
                disabled, invalid, required, checked,
            })}
        />
    );
});

Radio.displayName = 'Radio';

export { PkRadioGroupElement, PkRadioElement };
export type RadioGroupProps = PkRadioGroupElementProps;
export type RadioProps = PkRadioElementProps;
export type { PkRadioGroupOrientation };
