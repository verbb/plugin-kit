import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
/**
 * Popover —  pattern: trigger toggles a floating panel.
 *
 * @slot trigger - Popover trigger
 * @slot - Popover content
 *
 * @csspart panel - Floating content panel
 *
 * @attr with-arrow - Show a pointing arrow toward the trigger (default: off)
 */
export declare class PkPopover extends PkElement {
    static styles: import('lit').CSSResult[];
    open: boolean;
    placement: PkPopupPlacement;
    sideOffset: number;
    /**
     * Drop default panel padding/fixed width so slotted chrome (command lists, etc.)
     * can control its own inset. Consumer outer `p-0` alone cannot reach `.panel`.
     */
    flush: boolean;
    /**
     * Show a floating-ui arrow on the panel (off by default).
     * Named like other optional chrome (`with-clear`, `with-caret`) — tooltip always
     * paints its own arrow and has no toggle.
     */
    withArrow: boolean;
    /** Anchor element id — alternative to the trigger slot. */
    for: string;
    /**
     * Live element anchor — use when the target lives in another shadow tree
     * (e.g. TipTap chips). Preferred over `for` / trigger slot when set.
     * Stays in the consumer tree so modal `showModal()` inert does not apply
     * (unlike portaling the panel to a root outside the dialog).
     */
    anchor: Element | null;
    private popupElement;
    private get panelElement();
    private triggerElement;
    /** True while the shared popup-content exit animation is running. */
    private closing;
    /** Gates `data-open` so enter motion starts after Floating UI places the panel. */
    private panelAnimated;
    private readonly triggerId;
    private dismissRegistered;
    /** Guard re-entry while openPopover/closePopover mutate `open`. */
    private syncingOpenSideEffects;
    /** Coalesce overlapping close calls (updated + light-dismiss) onto one exit. */
    private exitAnimationPromise;
    disconnectedCallback(): void;
    /**
     * When controlled/toggle `open` flips false, arm `closing` in the same update so the
     * panel is not `hidden` for a frame before the exit animation starts.
     */
    willUpdate(changed: PropertyValues): void;
    /**
     * Controlled `open` (e.g. React) must arm/disarm light-dismiss the same way as
     * trigger toggles. Without this, programmatic open shows the panel but click-away
     * never fires.
     */
    updated(changed: PropertyValues): Promise<void>;
    private onTriggerSlotChange;
    private bindTrigger;
    private unbindTrigger;
    private handleToggleClick;
    private openPopover;
    /**
     * @param immediate Skip exit animation (disconnect / forced teardown).
     */
    closePopover(source?: PkOverlaySource, immediate?: boolean): Promise<void>;
    private waitForExitAnimation;
    private getAnchor;
    private registerDismissHandlers;
    private unregisterDismissHandlers;
    private onDocumentPointerDown;
    private isPointerInside;
    private onDocumentKeyDown;
    private getAnchorElement;
    private syncExpanded;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-popover': PkPopover;
    }
}
//# sourceMappingURL=pk-popover.d.ts.map