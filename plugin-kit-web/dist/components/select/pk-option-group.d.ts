import { PkElement } from '../../base/pk-element.js';
/**
 * Visual option group for `pk-select` —  listbox grouping pattern.
 *
 * @slot - `pk-option` items in this group
 *
 * @csspart label - Group label
 */
export declare class PkOptionGroup extends PkElement {
    static styles: import('lit').CSSResult;
    label: string;
    hidden: boolean;
    private readonly labelId;
    connectedCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-option-group': PkOptionGroup;
    }
}
//# sourceMappingURL=pk-option-group.d.ts.map