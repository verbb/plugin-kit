import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
export type PkTextareaSize = 'default' | 'sm';
/**
 * Multiline text field —  API, Craft visuals.
 *
 * @slot label
 * @slot instructions
 * @slot hint - Alias for `instructions`
 *
 * @csspart form-control - Wrapper
 * @csspart label - Label
 * @csspart instructions - Instructions
 * @csspart textarea - Native textarea
 */
export declare class PkTextarea extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly controlId;
    input: HTMLTextAreaElement;
    placeholder: string;
    private _value;
    get value(): string;
    set value(val: string | null);
    defaultValue: string | null;
    size: PkTextareaSize;
    label: string;
    instructions: string;
    readonly: boolean;
    invalid: boolean;
    /** Flush + fill parent cell (editable tables). */
    fitCell: boolean;
    /** Native `rows` — use `1` in table cells so intrinsic height doesn't overflow. */
    rows?: number;
    maxlength?: number;
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
    private handleInput;
    private handleChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-textarea': PkTextarea;
    }
}
//# sourceMappingURL=pk-textarea.d.ts.map