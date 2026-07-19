import { PkElement } from '../../base/pk-element.js';
export type PkInputGroupInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * Borderless input for use inside `pk-input-group`.
 *
 * @csspart input - Native input element
 */
export declare class PkInputGroupInput extends PkElement {
    static styles: import('lit').CSSResult;
    inputElement: HTMLInputElement;
    type: string;
    size: PkInputGroupInputSize;
    placeholder: string;
    value: string;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    autocomplete?: string;
    focus(options?: FocusOptions): void;
    render(): import('lit-html').TemplateResult<1>;
    private handleInput;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-input': PkInputGroupInput;
    }
}
//# sourceMappingURL=pk-input-group-input.d.ts.map