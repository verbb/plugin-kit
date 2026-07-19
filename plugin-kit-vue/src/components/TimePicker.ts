import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/time-picker.js';

/** Vue facade over `<pk-time-picker>`. Behavior and styles live in the web component. */
export const TimePicker = createPkComponent({
    name: 'PkTimePicker',
    tagName: 'pk-time-picker',
});

export const PkTimePickerElement = TimePicker;

export type TimePickerProps = Record<string, unknown>;
