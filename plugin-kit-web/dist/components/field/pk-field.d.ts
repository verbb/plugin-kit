import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
/**
 * Form field shell — label, instructions, errors, warning, and tip around a slotted control.
 *
 * Mirrors Plugin Kit React `FieldLayout`. Use for schema-driven forms; controls may
 * also expose their own `label` / `instructions` for standalone usage.
 *
 * @slot label - Field label
 * @slot instructions - Help text below the label (property values support inline Markdown)
 * @slot hint - Alias for `instructions`
 * @slot header-end - Extra header actions (React `headerEnd`)
 * @slot errors - Custom error content (property values support inline Markdown)
 * @slot warning - Warning message (property values support inline Markdown)
 * @slot tip - Informational tip below the control (property values support inline Markdown)
 * @slot - Field control (`pk-input`, `pk-select`, etc.)
 *
 * @csspart header - Field header row
 * @csspart header-end - Trailing header actions
 * @csspart form-control - Root wrapper
 * @csspart label - Label element
 * @csspart control - Control slot wrapper
 * @csspart instructions - Instructions region
 * @csspart errors - Errors list
 * @csspart warning - Warning region
 * @csspart tip - Tip region
 */
export declare class PkField extends PkElement {
    static styles: import('lit').CSSResult[];
    private readonly hasSlotController;
    private readonly baseId;
    label: string;
    instructions: string;
    required: boolean;
    /** Shows the translatable-field icon beside the label. */
    translatable: boolean;
    warning: string;
    tip: string;
    errors: string[];
    /** Associates the label with a control id in the light DOM. */
    for: string;
    private controlSlot;
    connectedCallback(): void;
    updated(changed: PropertyValues): void;
    private get labelId();
    private get instructionsId();
    private get errorsId();
    private get warningId();
    private get tipId();
    private get controlId();
    private hasLabel;
    private hasInstructions;
    private hasHeaderEnd;
    private hasErrors;
    private hasWarning;
    private hasTip;
    private getControlElement;
    private focusControl;
    private onLabelClick;
    private syncControlAria;
    private onControlSlotChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-field': PkField;
    }
}
//# sourceMappingURL=pk-field.d.ts.map