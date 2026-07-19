import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
export declare const ALL_VALUE: "*";
export type PkCheckboxSelectOption = {
    label: string;
    value: string;
};
export type PkCheckboxSelectValue = typeof ALL_VALUE | string[];
export type PkCheckboxSelectOrientation = 'horizontal' | 'vertical';
/**
 * Multi-select checkbox group — options via the `options` property/attribute (not slotted
 * checkboxes). Wrap in `pk-field` for label/instructions (mirrors React `CheckboxSelect` + `FieldLayout`).
 *
 * @fires pk-change - `{ value: string[] | '*' }`
 *
 * @csspart base - Checkbox options container
 */
export declare class PkCheckboxSelect extends PkElement {
    static styles: import('lit').CSSResult;
    options: PkCheckboxSelectOption[];
    /** Selected values, or `*` when the All option is active. */
    value: PkCheckboxSelectValue;
    showAllOption: boolean;
    allLabel: string;
    disabled: boolean;
    orientation: PkCheckboxSelectOrientation;
    ariaLabel: string | null;
    private optionElements;
    private allOptionElement;
    connectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    focus(options?: FocusOptions): void;
    private get isAllSelected();
    private get selectedValues();
    private dispatchValueChange;
    private handleAllChange;
    private handleItemChange;
    private rebuildOptionElements;
    private updateOptionStates;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-checkbox-select': PkCheckboxSelect;
    }
}
//# sourceMappingURL=pk-checkbox-select.d.ts.map