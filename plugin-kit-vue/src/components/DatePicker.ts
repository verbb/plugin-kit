import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/date-picker.js';

/** Vue facade over `<pk-date-picker>`. Behavior and styles live in the web component. */
export const DatePicker = createPkComponent({
    name: 'PkDatePicker',
    tagName: 'pk-date-picker',
});

export const PkDatePickerElement = DatePicker;

export type DatePickerProps = Record<string, unknown>;
