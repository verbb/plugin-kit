import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
/**
 * Tooltip —  pattern: hover/focus shows floating hint.
 *
 * @slot trigger - Element that receives the tooltip
 * @slot - Tooltip content (falls back to `content` attribute)
 *
 * @csspart content - Tooltip body
 */
export declare class PkTooltip extends PkElement {
    static styles: import('lit').CSSResult[];
    placement: PkPopupPlacement;
    /** `hover focus` (default) or `manual` for programmatic open only. */
    trigger: 'hover focus' | 'manual';
    disabled: boolean;
    openDelay: number;
    closeDelay: number;
    content: string;
    /** Anchor element id — alternative to the trigger slot. */
    for: string;
    private popupElement;
    private open;
    private triggerElement;
    private contentAnimated;
    private closing;
    private contentSide;
    /**
     * True only when the default slot has real nodes. Pretty-printed HTML often
     * leaves whitespace text nodes in the default slot, which would otherwise
     * suppress the `content` attribute fallback and show an empty tooltip body.
     */
    private hasSlottedBody;
    private readonly triggerId;
    private openTimer?;
    private closeTimer?;
    private readonly tooltipId;
    private showGeneration;
    private exitGeneration;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    firstUpdated(): void;
    /** Opens the tooltip programmatically. */
    show(): Promise<void>;
    /** Closes the tooltip programmatically. */
    hide(): Promise<void>;
    private clearTimers;
    private syncPlacementAnimation;
    private resolveExternalTrigger;
    private onTriggerSlotChange;
    private onBodySlotChange;
    private rebindTrigger;
    private usesPointerTrigger;
    private bindTrigger;
    private unbindTrigger;
    private scheduleShow;
    private scheduleHide;
    private getAnchor;
    private prepareContentForEnter;
    private showTooltip;
    private hideTooltip;
    private playExitAnimation;
    private waitForExitAnimation;
    private finishHide;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tooltip': PkTooltip;
    }
}
//# sourceMappingURL=pk-tooltip.d.ts.map