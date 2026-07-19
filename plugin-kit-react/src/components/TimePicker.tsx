import React, { forwardRef } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkTimePicker } from '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';

import { trueBooleanProps } from '../utils/lit-react-booleans.js';

const PkTimePickerElement = createPluginKitComponent({
    tagName: 'pk-time-picker',
    elementClass: PkTimePicker,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkClear: 'pk-clear',
        onInput: 'input',
        onChange: 'change',
    },
});

type PkTimePickerElementProps = React.ComponentProps<typeof PkTimePickerElement>;

/** React facade over `<pk-time-picker>`. Behavior and styles live in the web component. */
export const TimePicker = forwardRef<PkTimePicker, PkTimePickerElementProps>(function TimePicker(props, ref) {
    const {
        disabled, invalid, clearable, multiple, open, ...rest
    } = props;

    return (
        <PkTimePickerElement
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

TimePicker.displayName = 'TimePicker';

export { PkTimePickerElement };
export type TimePickerProps = PkTimePickerElementProps;
