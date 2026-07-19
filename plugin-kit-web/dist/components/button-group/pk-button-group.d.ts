import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
export type PkButtonGroupOrientation = 'horizontal' | 'vertical';
/**
 * Visually groups related buttons —  `pk-button-group` pattern (CSS var join, no JS).
 *
 * @slot - Buttons, toolbars, and overlay triggers
 *
 * @csspart base - Group container
 */
export declare class PkButtonGroup extends PkElement {
    static styles: import('lit').CSSResult;
    orientation: PkButtonGroupOrientation;
    /**
     * Draw 1px dividers between adjacent controls (Craft default).
     * Set `separators="false"` for flush join. Explicit `pk-button-group-separator` elements always work for segment splits.
     */
    separators: boolean;
    /**
     * Exclusive icon/text toggle styling — Craft `.btngroup--exclusive`.
     * Use with `pk-toggle` items for view-mode pickers.
     */
    exclusive: boolean;
    /** Accessible label for the group —  `pk-button-group.label`. */
    label: string;
    private defaultSlot;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private scheduleSyncGroupLayout;
    private handleSlotChange;
    /** Overlap-join adjacent items within each segment; 1px divider between joins when `separators` is on. */
    private syncGroupLayout;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-button-group': PkButtonGroup;
    }
}
//# sourceMappingURL=pk-button-group.d.ts.map