import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkToggleSize, PkToggleVariant } from '../toggle/pk-toggle.js';
export type PkToggleGroupOrientation = 'horizontal' | 'vertical';
/**
 * Group of toggle buttons with shared selection.
 *
 * @slot - `pk-toggle` or `button[data-value]` items
 *
 * Name the group with `aria-label`, or with `aria-labelledby` pointing at visible text in the same document. The
 * name is applied to the inner `role="group"` element, which is the one assistive technology reads.
 *
 * @csspart base - Group container
 */
export declare class PkToggleGroup extends PkElement {
    static styles: import('lit').CSSResult;
    orientation: PkToggleGroupOrientation;
    variant: PkToggleVariant;
    size: PkToggleSize;
    /** Gap between items — `0` joins adjacent toggles (React `spacing={0}`). */
    spacing: number;
    /** @deprecated Use `spacing="0"` — kept for backward compatibility. */
    joined: boolean;
    multiple: boolean;
    value: string[];
    /** Accessible name for the group. */
    ariaLabel: string | null;
    /** IDs of elements whose text names the group, resolved in the host's document or shadow root. */
    labelledBy: string | null;
    private items;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    private clearLayoutAttrs;
    private syncGroupLayout;
    private syncJoinedFromSpacing;
    private syncItems;
    private applyGroupProps;
    private getItemValue;
    private isItemDisabled;
    private applySelection;
    private handleClick;
    /**
     * An ID reference can't cross into the shadow root, so `aria-labelledby` is resolved to its text here and given
     * to the inner group as its label.
     */
    private resolvedLabel;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-toggle-group': PkToggleGroup;
    }
}
//# sourceMappingURL=pk-toggle-group.d.ts.map