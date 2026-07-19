import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
/**
 * Radio button — use inside `pk-radio-group`.
 *
 * @slot - Visible label text
 *
 * @csspart base - Root label element
 * @csspart input - Native radio input
 * @csspart control - Visual radio circle
 * @csspart indicator - Indicator container
 */
export declare class PkRadio extends PkElement {
    static styles: import('lit').CSSResult;
    value: string;
    checked: boolean;
    disabled: boolean;
    invalid: boolean;
    required: boolean;
    tabIndex: number;
    ariaLabel: string | null;
    /** Set by `pk-radio-group` when the group is disabled. */
    forceDisabled: boolean;
    private input;
    private hasDefaultSlotContent;
    updated(changed: PropertyValues): void;
    focusControl(options?: FocusOptions): void;
    private defaultSlotChanged;
    private handleChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-radio': PkRadio;
    }
}
//# sourceMappingURL=pk-radio.d.ts.map