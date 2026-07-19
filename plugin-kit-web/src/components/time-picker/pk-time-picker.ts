import { customElement } from 'lit/decorators.js';

import { createIconElement, clock } from '../../icons/index.js';
import { PkSelect } from '../select/pk-select.js';
// Time picker seeds light-DOM options at connect — register the CE so getLabel() works.
import '../select/pk-option.js';
import { pkSelectStyles } from '../select/pk-select.styles.js';
import { generateTimeOptions } from '../../utils/time-options.js';
import { pkTimePickerStyles } from './pk-time-picker.styles.js';

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
@customElement('pk-time-picker')
export class PkTimePicker extends PkSelect {
    // Flatten — `pkSelectStyles` is already a CSSResult[].
    static override styles = [...pkSelectStyles, pkTimePickerStyles];

    private optionsSeeded = false;

    override connectedCallback(): void {
        this.ensureTimeOptions();
        this.ensureClockIcon();
        super.connectedCallback();
    }

    private ensureTimeOptions(): void {
        if (this.optionsSeeded || this.querySelector('pk-option')) {
            this.optionsSeeded = true;
            return;
        }

        for (const option of generateTimeOptions()) {
            const element = document.createElement('pk-option');
            element.value = option.value;
            element.textContent = option.label;
            this.append(element);
        }

        this.optionsSeeded = true;
    }

    private ensureClockIcon(): void {
        if (this.querySelector('[slot="start"]')) {
            return;
        }

        const icon = createIconElement(clock);
        icon.setAttribute('slot', 'start');
        this.prepend(icon);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-time-picker': PkTimePicker;
    }
}
