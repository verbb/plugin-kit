import { PkElement } from '../../base/pk-element.js';
/**
 * Select option — use inside `pk-select` or `pk-combobox`.
 *
 * @slot start - Presentational decoration before the label (e.g. `pk-status`).
 * @slot - Option label
 *
 * @csspart start - Start decoration container
 * @csspart option - Option button
 * @csspart label - Option label
 * @csspart check - Selected-state check indicator
 */
export declare class PkOption extends PkElement {
    static styles: import('lit').CSSResult;
    value: string;
    /**
     * Optional short label for the closed trigger / filter identity (v1 itemToStringLabel).
     * When set, preferred over concatenating rich default-slot text (title + subtitle).
     */
    label: string;
    disabled: boolean;
    selected: boolean;
    highlighted: boolean;
    hidden: boolean;
    focusIndex: number;
    optionId: string;
    /** When set, the label renders with matching query text highlighted (combobox filter). */
    matchQuery: string;
    focusControl(preventScroll?: boolean): void;
    /**
     * Label for the closed combobox/select value.
     * Prefers the `label` attribute when set; otherwise default-slot text
     * (excluding `slot="start"`), joined with spaces for multi-node layouts.
     */
    getLabel(): string;
    /** Full default-slot text for typeahead matching (includes subtitle lines). */
    getSearchText(): string;
    /** True when the default slot has element children (custom multi-line / rich layouts). */
    private hasRichLabelContent;
    /** Light-DOM elements assigned to the start decoration slot. */
    getStartElements(): HTMLElement[];
    firstUpdated(): void;
    private syncStartDecoration;
    private handleClick;
    private handleMouseEnter;
    private handleKeyDown;
    private renderLabel;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-option': PkOption;
    }
}
//# sourceMappingURL=pk-option.d.ts.map