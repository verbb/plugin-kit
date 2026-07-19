import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    getOverflowAncestors,
    offset,
    platform,
    shift,
    size,
    type Placement,
} from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
import { resolveElementById } from '../../internal/resolve-element-by-id.js';
import { PkRepositionEvent } from '../../events/pk-reposition.js';
import { waitForPopoverClosed } from '../../utils/top-layer.js';
import { computePopupTransformOrigin } from '../../utils/popup-placement-animation.js';
import { SUPPORTS_POPOVER } from '../../utils/supports-popover.js';
import { pkPopupStyles } from './pk-popup.styles.js';

export type PkPopupPlacement = Placement;

export type PkPopupVirtualElement = {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
};

function isVirtualElement(value: unknown): value is PkPopupVirtualElement {
    return (
        value !== null
        && typeof value === 'object'
        && 'getBoundingClientRect' in value
    );
}

function resolvePositionStrategy(
    positionMethod: 'fixed' | 'absolute' | undefined,
): 'fixed' | 'absolute' {
    if (positionMethod) {
        return positionMethod;
    }

    // Top-layer popovers use absolute coords; legacy fallback uses fixed viewport coords.
    return SUPPORTS_POPOVER ? 'absolute' : 'fixed';
}

function resolveScrollBoundary(
    anchorElement: Element | PkPopupVirtualElement,
    boundary: 'viewport' | 'scroll',
): Element[] | undefined {
    if (!SUPPORTS_POPOVER || isVirtualElement(anchorElement) || boundary !== 'scroll') {
        return undefined;
    }

    // Popover content leaves the anchor's overflow chain — pass ancestor bounds explicitly.
    return getOverflowAncestors(anchorElement).filter((node): node is Element => node instanceof Element);
}

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
@customElement('pk-popup')
export class PkPopup extends PkElement {
    static override styles = pkPopupStyles;

    /** Element id, DOM reference, or virtual element to anchor against. */
    @property()
    anchor: Element | string | PkPopupVirtualElement = '';

    /** When true, positioning runs and the popup is shown. */
    @property({ type: Boolean, reflect: true })
    active = false;

    /**
     * Floating UI positioning strategy.
     * Defaults to `absolute` when the Popover API is supported, otherwise `fixed`.
     */
    @property({ attribute: 'position-method' })
    positionMethod?: 'fixed' | 'absolute';

    /** Bounding box for flip/shift collision — `scroll` uses overflow ancestors when popover is active. */
    @property({ reflect: true })
    boundary: 'viewport' | 'scroll' = 'viewport';

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    @property({ type: Number })
    distance = 4;

    @property({ type: Number })
    skidding = 0;

    @property({ type: Boolean })
    flip = true;

    @property({ attribute: 'flip-fallback-placements' })
    flipFallbackPlacements = '';

    @property({ attribute: 'flip-fallback-strategy' })
    flipFallbackStrategy: 'best-fit' | 'initial' = 'best-fit';

    @property({ attribute: 'flip-padding', type: Number })
    flipPadding = 8;

    @property({ type: Boolean })
    shift = true;

    @property({ attribute: 'shift-padding', type: Number })
    shiftPadding = 8;

    @property({ type: Boolean })
    arrow = false;

    @property({ attribute: 'arrow-placement' })
    arrowPlacement: 'start' | 'end' | 'center' | 'anchor' = 'anchor';

    @property({ attribute: 'arrow-padding', type: Number })
    arrowPadding = 10;

    @property()
    sync?: 'width' | 'height' | 'both';

    /** When false, the popup is positioned once and not tracked on scroll/resize. */
    @property({ attribute: 'anchor-tracking', type: Boolean })
    anchorTracking = true;

    @property({ attribute: 'hover-bridge', type: Boolean })
    hoverBridge = false;

    @query('.popup')
    private popupElement?: HTMLElement;

    @query('.arrow')
    private arrowElement?: HTMLElement;

    private anchorElement: Element | PkPopupVirtualElement | null = null;
    private cleanup?: () => void;
    /** Coalesces concurrent stop() calls — await before opening another top-layer overlay. */
    private stopPromise: Promise<void> | null = null;

    override disconnectedCallback(): void {
        void this.stop();
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (changed.has('active')) {
            if (this.active) {
                this.resolveAnchor();
                this.start();
            } else {
                this.stop();
            }
        }

        if (changed.has('anchor')) {
            void this.handleAnchorChange();
        }

        if (this.active && !changed.has('active')) {
            this.reposition();
        }
    }

    /** Forces the popup to recalculate and reposition itself. */
    reposition(): void {
        const floatingElement = this.popupElement;
        const arrowTarget = this.arrow ? this.arrowElement : null;

        if (!this.active || !this.anchorElement || !floatingElement) {
            return;
        }

        const scrollBoundary = resolveScrollBoundary(this.anchorElement, this.boundary);

        const middleware = [
            offset({ mainAxis: this.distance, crossAxis: this.skidding }),
        ];

        if (this.sync) {
            middleware.push(
                size({
                    apply: ({ rects }) => {
                        const syncWidth = this.sync === 'width' || this.sync === 'both';
                        const syncHeight = this.sync === 'height' || this.sync === 'both';
                        floatingElement.style.width = syncWidth ? `${rects.reference.width}px` : '';
                        floatingElement.style.height = syncHeight ? `${rects.reference.height}px` : '';
                    },
                }),
            );
        } else {
            floatingElement.style.width = '';
            floatingElement.style.height = '';
        }

        if (this.flip) {
            middleware.push(
                flip({
                    boundary: scrollBoundary,
                    fallbackPlacements: this.flipFallbackPlacements
                        ? this.flipFallbackPlacements.split(' ').map((value) => value.trim()).filter(Boolean) as Placement[]
                        : undefined,
                    fallbackStrategy: this.flipFallbackStrategy === 'best-fit' ? 'bestFit' : 'initialPlacement',
                    padding: this.flipPadding,
                }),
            );
        }

        if (this.shift) {
            middleware.push(
                shift({
                    boundary: scrollBoundary,
                    padding: this.shiftPadding,
                }),
            );
        }

        if (this.arrow && arrowTarget) {
            middleware.push(
                arrow({
                    element: arrowTarget,
                    padding: this.arrowPadding,
                }),
            );
        }

        const strategy = resolvePositionStrategy(this.positionMethod);
        const useFixedFallback = strategy === 'fixed';

        floatingElement.classList.toggle('popup-fixed', useFixedFallback);

        const getOffsetParentFn = SUPPORTS_POPOVER
            ? (element: Element) => platform.getOffsetParent(element, offsetParent)
            : platform.getOffsetParent;

        void computePosition(this.anchorElement, floatingElement, {
            placement: this.placement,
            middleware,
            strategy,
            platform: {
                ...platform,
                getOffsetParent: getOffsetParentFn,
            },
        }).then(({ x, y, middlewareData, placement }) => {
            if (!this.active || !floatingElement.isConnected) {
                return;
            }

            const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
                placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
            ]!;

            this.setAttribute('data-current-placement', placement);

            Object.assign(floatingElement.style, {
                left: `${x}px`,
                top: `${y}px`,
                ...(useFixedFallback ? { position: 'fixed' } : { position: '' }),
            });

            if (this.anchorElement) {
                const referenceRect = this.anchorElement.getBoundingClientRect();
                const floatingRect = {
                    x,
                    y,
                    width: floatingElement.offsetWidth,
                    height: floatingElement.offsetHeight,
                };

                const transformOrigin = computePopupTransformOrigin(
                    placement,
                    referenceRect,
                    floatingRect,
                    this.distance,
                    middlewareData.shift,
                );

                floatingElement.style.setProperty('--pk-transform-origin', transformOrigin);
            }

            if (this.arrow && arrowTarget) {
                const arrowX = middlewareData.arrow?.x;
                const arrowY = middlewareData.arrow?.y;
                let top = '';
                let right = '';
                let bottom = '';
                let left = '';

                if (this.arrowPlacement === 'start') {
                    const value = typeof arrowX === 'number' ? `${this.arrowPadding}px` : '';
                    top = typeof arrowY === 'number' ? `${this.arrowPadding}px` : '';
                    left = value;
                } else if (this.arrowPlacement === 'end') {
                    right = typeof arrowX === 'number' ? `${this.arrowPadding}px` : '';
                    bottom = typeof arrowY === 'number' ? `${this.arrowPadding}px` : '';
                } else if (this.arrowPlacement === 'center') {
                    left = typeof arrowX === 'number' ? '50%' : '';
                    top = typeof arrowY === 'number' ? '50%' : '';
                } else {
                    left = typeof arrowX === 'number' ? `${arrowX}px` : '';
                    top = typeof arrowY === 'number' ? `${arrowY}px` : '';
                }

                Object.assign(arrowTarget.style, {
                    top,
                    right,
                    bottom,
                    left,
                    transform: '',
                    [staticSide]: 'calc(-1 * var(--pk-popup-arrow-size, 6px) / 2)',
                });
            }

            requestAnimationFrame(() => this.updateHoverBridge());
            this.dispatchEvent(new PkRepositionEvent());
        });
    }

    private resolveAnchor(): void {
        if (typeof this.anchor === 'string' && this.anchor) {
            this.anchorElement = resolveElementById(this, this.anchor);
            return;
        }

        if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
            this.anchorElement = this.anchor;
            return;
        }

        let slotted = this.querySelector('[slot="anchor"]');

        if (slotted instanceof HTMLSlotElement) {
            slotted = slotted.assignedElements({ flatten: true })[0] ?? null;
        }

        this.anchorElement = slotted;
    }

    private async handleAnchorChange(): Promise<void> {
        await this.stop();
        this.resolveAnchor();

        if (this.anchorElement && this.active) {
            await this.start();
        }
    }

    /** When false (menus/selects drive `active` imperatively on the instance). */
    private usesPopoverTopLayer(): boolean {
        return SUPPORTS_POPOVER;
    }

    private start(): void {
        if (!this.anchorElement || !this.active || !this.isConnected || !this.popupElement) {
            return;
        }

        if (this.usesPopoverTopLayer()) {
            this.popupElement.showPopover?.();
        }

        if (this.anchorTracking) {
            this.cleanup = autoUpdate(this.anchorElement, this.popupElement, () => {
                this.reposition();
            });
        }

        this.reposition();
    }

    private stop(): Promise<void> {
        if (this.stopPromise) {
            return this.stopPromise;
        }

        this.stopPromise = new Promise((resolve) => {
            if (this.usesPopoverTopLayer() && this.popupElement) {
                try {
                    // Avoid a second hidePopover while showModal() is promoting — Chrome can hang.
                    if (this.popupElement.matches(':popover-open')) {
                        this.popupElement.hidePopover();
                    }
                } catch {
                    /* noop */
                }
            }

            const hadCleanup = Boolean(this.cleanup);

            if (this.cleanup) {
                this.cleanup();
                this.cleanup = undefined;
            }

            this.removeAttribute('data-current-placement');

            if (this.popupElement) {
                this.popupElement.style.removeProperty('--pk-transform-origin');
            }

            const finish = (): void => {
                this.stopPromise = null;
                resolve();
            };

            if (hadCleanup) {
                requestAnimationFrame(finish);
            } else {
                finish();
            }
        });

        return this.stopPromise;
    }

    /** Await popover top-layer teardown — call before `showModal()` after closing a menu. */
    async awaitHidden(): Promise<void> {
        await this.stop();

        if (this.usesPopoverTopLayer() && this.popupElement) {
            await waitForPopoverClosed(this.popupElement, 800, { relaxed: true });
        }
    }

    /** Slotted popup content root (e.g. `.panel`) —  keeps content in-tree. */
    getContentElement(): HTMLElement | null {
        const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        const slotted = assigned.find((node): node is HTMLElement => node instanceof HTMLElement);

        if (slotted) {
            return slotted;
        }

        for (const node of this.childNodes) {
            if (node instanceof HTMLElement && node.getAttribute('slot') !== 'anchor') {
                return node;
            }
        }

        return null;
    }

    private updateHoverBridge(): void {
        const floatingElement = this.popupElement;

        if (!this.hoverBridge || !this.anchorElement || !floatingElement) {
            return;
        }

        const anchorRect = this.anchorElement.getBoundingClientRect();
        const popupRect = floatingElement.getBoundingClientRect();
        const isVertical = this.placement.includes('top') || this.placement.includes('bottom');

        let topLeftX = 0;
        let topLeftY = 0;
        let topRightX = 0;
        let topRightY = 0;
        let bottomLeftX = 0;
        let bottomLeftY = 0;
        let bottomRightX = 0;
        let bottomRightY = 0;

        if (isVertical) {
            if (anchorRect.top < popupRect.top) {
                topLeftX = anchorRect.left;
                topLeftY = anchorRect.bottom;
                topRightX = anchorRect.right;
                topRightY = anchorRect.bottom;
                bottomLeftX = popupRect.left;
                bottomLeftY = popupRect.top;
                bottomRightX = popupRect.right;
                bottomRightY = popupRect.top;
            } else {
                topLeftX = popupRect.left;
                topLeftY = popupRect.bottom;
                topRightX = popupRect.right;
                topRightY = popupRect.bottom;
                bottomLeftX = anchorRect.left;
                bottomLeftY = anchorRect.top;
                bottomRightX = anchorRect.right;
                bottomRightY = anchorRect.top;
            }
        } else if (anchorRect.left < popupRect.left) {
            topLeftX = anchorRect.right;
            topLeftY = anchorRect.top;
            topRightX = popupRect.left;
            topRightY = popupRect.top;
            bottomLeftX = anchorRect.right;
            bottomLeftY = anchorRect.bottom;
            bottomRightX = popupRect.left;
            bottomRightY = popupRect.bottom;
        } else {
            topLeftX = popupRect.right;
            topLeftY = popupRect.top;
            topRightX = anchorRect.left;
            topRightY = anchorRect.top;
            bottomLeftX = popupRect.right;
            bottomLeftY = popupRect.bottom;
            bottomRightX = anchorRect.left;
            bottomRightY = anchorRect.bottom;
        }

        this.style.setProperty('--pk-hover-bridge-top-left-x', `${topLeftX}px`);
        this.style.setProperty('--pk-hover-bridge-top-left-y', `${topLeftY}px`);
        this.style.setProperty('--pk-hover-bridge-top-right-x', `${topRightX}px`);
        this.style.setProperty('--pk-hover-bridge-top-right-y', `${topRightY}px`);
        this.style.setProperty('--pk-hover-bridge-bottom-left-x', `${bottomLeftX}px`);
        this.style.setProperty('--pk-hover-bridge-bottom-left-y', `${bottomLeftY}px`);
        this.style.setProperty('--pk-hover-bridge-bottom-right-x', `${bottomRightX}px`);
        this.style.setProperty('--pk-hover-bridge-bottom-right-y', `${bottomRightY}px`);
    }

    override render() {
        const useFixedFallback = !SUPPORTS_POPOVER || this.positionMethod === 'fixed';
        const usePopoverTopLayer = this.usesPopoverTopLayer();

        return html`
            ${this.hoverBridge ? html`
                <div
                    part="hover-bridge"
                    class=${classMap({
                        'hover-bridge': true,
                        'hover-bridge-visible': this.active,
                    })}
                    aria-hidden="true"
                ></div>
            ` : nothing}
            <div
                popover=${usePopoverTopLayer ? 'manual' : nothing}
                part="popup"
                class=${classMap({
                    popup: true,
                    active: this.active,
                    'popup-fixed': useFixedFallback,
                })}
            >
                ${this.arrow ? html`<div part="arrow" class="arrow"></div>` : nothing}
                <slot></slot>
            </div>
            <slot name="anchor" hidden></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-popup': PkPopup;
    }
}
