import { PkElement } from '../../base/pk-element.js';
/**
 * Borderless textarea for use inside `pk-input-group`.
 *
 * @csspart textarea - Native textarea element
 */
export declare class PkInputGroupTextarea extends PkElement {
    static styles: import('lit').CSSResult;
    textareaElement: HTMLTextAreaElement;
    placeholder: string;
    value: string;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    rows: number;
    focus(options?: FocusOptions): void;
    render(): import('lit-html').TemplateResult<1>;
    private handleInput;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-textarea': PkInputGroupTextarea;
    }
}
//# sourceMappingURL=pk-input-group-textarea.d.ts.map