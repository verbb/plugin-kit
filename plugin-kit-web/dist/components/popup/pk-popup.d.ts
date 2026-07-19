import { Placement } from '@floating-ui/dom';
import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
export type PkPopupPlacement = Placement;
export type PkPopupVirtualElement = {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
};
/**
 * Anchors floating content to a reference element —  popup pattern with pk naming.
 * When the Popover API is available, content stays in the component tree and is promoted to
 * the top layer via `popover="manual"` + `showPopover()` (no DOM reparenting).
 *
 * @event pk-reposition - Emitted when the popup is repositioned.
 *
 * @slot - Popup content.
 * @slot anchor - Anchor element when it lives inside the popup host.
 *
 * @csspart popup - Floating container.
 * @csspart arrow - Arrow element.
 * @csspart hover-bridge - Invisible bridge between anchor and popup.
 */
export declare class PkPopup extends PkElement {
    static styles: import('lit').CSSResult;
    /** Element id, DOM reference, or virtual element to anchor against. */
    anchor: Element | string | PkPopupVirtualElement;
    /** When true, positioning runs and the popup is shown. */
    active: boolean;
    /**
     * Floating UI positioning strategy.
     * Defaults to `absolute` when the Popover API is supported, otherwise `fixed`.
     */
    positionMethod?: 'fixed' | 'absolute';
    /** Bounding box for flip/shift collision — `scroll` uses overflow ancestors when popover is active. */
    boundary: 'viewport' | 'scroll';
    placement: PkPopupPlacement;
    distance: number;
    skidding: number;
    flip: boolean;
    flipFallbackPlacements: string;
    flipFallbackStrategy: 'best-fit' | 'initial';
    flipPadding: number;
    shift: boolean;
    shiftPadding: number;
    arrow: boolean;
    arrowPlacement: 'start' | 'end' | 'center' | 'anchor';
    arrowPadding: number;
    sync?: 'width' | 'height' | 'both';
    /** When false, the popup is positioned once and not tracked on scroll/resize. */
    anchorTracking: boolean;
    hoverBridge: boolean;
    private popupElement?;
    private arrowElement?;
    private anchorElement;
    private cleanup?;
    /** True while waiting for layout-stable coords before first paint. */
    private settlingInitialPosition;
    private settleGeneration;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    /** Forces the popup to recalculate and reposition itself. */
    reposition(): void;
    /**
     * Runs Floating UI once and applies coords. Does not reveal an unpositioned
     * popup — `settleInitialPosition()` owns the first paint.
     */
    private repositionAsync;
    private frames;
    /**
     * Hide → layout → measure → confirm flip → reveal.
     * A single computePosition often runs before slotted content has height, so flip
     * picks the preferred side; autoUpdate then jumps — that was the visible flash.
     */
    private settleInitialPosition;
    private resolveAnchor;
    private handleAnchorChange;
    /** When false, skip popover top layer (e.g. menu/select use fixed coords to simplify modal handoff). */
    private usesPopoverTopLayer;
    /** `stop()` — sync hidePopover + cleanup autoUpdate. */
    stop(): Promise<void>;
    /** @deprecated Prefer `stop()` — kept for select/combobox handoff call sites. */
    releasePositioning(): void;
    /** @deprecated Prefer `stop()`. */
    awaitHidden(): Promise<void>;
    private start;
    /** Slotted popup content root (e.g. `.panel`) —  keeps content in-tree. */
    getContentElement(): HTMLElement | null;
    private updateHoverBridge;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-popup': PkPopup;
    }
}
//# sourceMappingURL=pk-popup.d.ts.map