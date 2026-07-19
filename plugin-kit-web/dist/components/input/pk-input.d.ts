import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
export type PkInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * Text input —  API, Plugin Kit field visuals.
 *
 * @slot label
 * @slot instructions
 * @slot hint - Alias for `instructions`
 * @slot start - Leading adornment inside the field chrome (icon, unit, etc.)
 * @slot end - Trailing adornment inside the field chrome
 * @slot clear-icon
 *
 * @csspart form-control - Wrapper
 * @csspart label - Label
 * @csspart instructions - Instructions
 * @csspart base - Input row
 * @csspart input - Native input
 * @csspart start - Start slot container
 * @csspart end - End slot container
 * @csspart clear-button - Clear button
 */
export declare class PkInput extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly inputId;
    input: HTMLInputElement;
    type: string;
    private _value;
    get value(): string;
    set value(val: string | null);
    defaultValue: string | null;
    size: PkInputSize;
    label: string;
    instructions: string;
    withClear: boolean;
    placeholder: string;
    readonly: boolean;
    invalid: boolean;
    /** Flush + fill parent cell (editable tables). */
    fitCell: boolean;
    /** Monospace typography for handle, slug, and code-like values. */
    mono: boolean;
    pattern?: string;
    minlength?: number;
    maxlength?: number;
    min?: number | string;
    max?: number | string;
    step?: number | 'any';
    autocomplete?: string;
    autofocus: boolean;
    withLabel: boolean;
    withInstructions: boolean;
    connectedCallback(): void;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    formResetCallback(): void;
    updated(changed: PropertyValues): void;
    protected syncStandaloneAria(): void;
    private hasLabelContent;
    private hasInstructionsContent;
    focus(options?: FocusOptions): void;
    blur(): void;
    select(): void;
    private handleInput;
    private handleChange;
    /**
     * Shadow native inputs do not participate in HTML implicit form submission.
     * Bridge Enter → associated form.requestSubmit() (SchemaFormEngine hidden submitter).
     */
    private handleKeyDown;
    private handleClearClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input': PkInput;
    }
}
//# sourceMappingURL=pk-input.d.ts.map