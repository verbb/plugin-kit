import { PkSelect } from '../select/pk-select.js';
/**
 * Time picker — select wrapper with 30-minute increments and a clock icon.
 * Mirrors React `TimePicker` (not  `pk-time-input`).
 *
 * @slot start - Overrides the default clock icon
 * @slot - Additional `pk-option` items append after the generated list
 *
 * @event input
 * @event change
 * @event pk-change - `detail.value`
 */
export declare class PkTimePicker extends PkSelect {
    static styles: import('lit').CSSResult[];
    private optionsSeeded;
    connectedCallback(): void;
    private ensureTimeOptions;
    private ensureClockIcon;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-time-picker': PkTimePicker;
    }
}
//# sourceMappingURL=pk-time-picker.d.ts.map