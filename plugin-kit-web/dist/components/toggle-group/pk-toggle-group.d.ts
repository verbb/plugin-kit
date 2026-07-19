import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkToggleSize, PkToggleVariant } from '../toggle/pk-toggle.js';
export type PkToggleGroupOrientation = 'horizontal' | 'vertical';
/**
 * Group of toggle buttons with shared selection.
 *
 * @slot - `pk-toggle` or `button[data-value]` items
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
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-toggle-group': PkToggleGroup;
    }
}
//# sourceMappingURL=pk-toggle-group.d.ts.map