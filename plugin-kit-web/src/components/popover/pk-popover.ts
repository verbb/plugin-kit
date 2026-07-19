import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { uniqueId } from '../../a11y/focus.js';
import { PkElement } from '../../base/pk-element.js';
import { resolveElementById } from '../../internal/resolve-element-by-id.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { PkPopup, type PkPopupPlacement } from '../popup/pk-popup.js';
import {
    syncPopupPlacementAnimation,
    waitForPopupReposition,
} from '../../utils/popup-placement-animation.js';
import { isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import { pkPopoverStyles } from './pk-popover.styles.js';

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
@customElement('pk-popover')
export class PkPopover extends PkElement {
    static override styles = pkPopoverStyles;

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom';

    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 4;

    /**
     * Drop default panel padding/fixed width so slotted chrome (command lists, etc.)
     * can control its own inset. Consumer outer `p-0` alone cannot reach `.panel`.
     */
    @property({ type: Boolean, reflect: true })
    flush = false;

    /**
     * Show a floating-ui arrow on the panel (off by default).
     * Named like other optional chrome (`with-clear`, `with-caret`) — tooltip always
     * paints its own arrow and has no toggle.
     */
    @property({ attribute: 'with-arrow', type: Boolean, reflect: true })
    withArrow = false;

    /** Anchor element id — alternative to the trigger slot. */
    @property({ reflect: true })
    for = '';

    /**
     * Live element anchor — use when the target lives in another shadow tree
     * (e.g. TipTap chips). Preferred over `for` / trigger slot when set.
     * Stays in the consumer tree so modal `showModal()` inert does not apply
     * (unlike portaling the panel to a root outside the dialog).
     */
    @property({ attribute: false })
    anchor: Element | null = null;

    @query('pk-popup')
    private popupElement!: PkPopup;

    private get panelElement(): HTMLDivElement | null {
        return this.popupElement?.getContentElement() as HTMLDivElement | null ?? null;
    }

    @state()
    private triggerElement: HTMLElement | null = null;

    /** True while the shared popup-content exit animation is running. */
    @state()
    private closing = false;

    /** Gates `data-open` so enter motion starts after Floating UI places the panel. */
    @state()
    private panelAnimated = false;

    private readonly triggerId = uniqueId('pk-popover-trigger');
    private dismissRegistered = false;
    /** Guard re-entry while openPopover/closePopover mutate `open`. */
    private syncingOpenSideEffects = false;
    /** Coalesce overlapping close calls (updated + light-dismiss) onto one exit. */
    private exitAnimationPromise: Promise<void> | null = null;

    override disconnectedCallback(): void {
        // Skip exit motion on teardown — demote immediately.
        void this.closePopover('api', true);
        super.disconnectedCallback();
    }

    /**
     * When controlled/toggle `open` flips false, arm `closing` in the same update so the
     * panel is not `hidden` for a frame before the exit animation starts.
     */
    override willUpdate(changed: PropertyValues): void {
        if (
            changed.has('open')
            && this.open === false
            && changed.get('open') === true
            && !this.syncingOpenSideEffects
            && !this.closing
        ) {
            this.closing = true;
            this.panelAnimated = false;
        }
    }

    /**
     * Controlled `open` (e.g. React) must arm/disarm light-dismiss the same way as
     * trigger toggles. Without this, programmatic open shows the panel but click-away
     * never fires.
     */
    override async updated(changed: PropertyValues): Promise<void> {
        super.updated(changed);

        if (!changed.has('open') || this.syncingOpenSideEffects) {
            return;
        }

        const previousOpen = changed.get('open');

        if (previousOpen === this.open) {
            return;
        }

        // Initial connect with open=false — nothing to tear down.
        if (previousOpen === undefined && this.open === false) {
            return;
        }

        if (this.open) {
            await this.openPopover();
        } else {
            await this.closePopover('api');
        }
    }

    private onTriggerSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        this.unbindTrigger(this.triggerElement);
        this.triggerElement = trigger ?? null;
        this.bindTrigger(this.triggerElement);
    }

    private bindTrigger(trigger: HTMLElement | null): void {
        if (!trigger) {
            return;
        }

        if (!trigger.id) {
            trigger.id = this.triggerId;
        }

        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.addEventListener('click', this.handleToggleClick);
        this.syncExpanded();
    }

    private unbindTrigger(trigger: HTMLElement | null): void {
        trigger?.removeEventListener('click', this.handleToggleClick);
    }

    private handleToggleClick = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();

        if (this.closing) {
            return;
        }

        // Flip `open` only — side effects run from `updated()` (same as dropdown-menu).
        this.open = !this.open;
    };

    private async openPopover(): Promise<void> {
        if (!this.getAnchor()) {
            return;
        }

        // Finish any in-flight exit before arming a new open.
        if (this.exitAnimationPromise) {
            await this.exitAnimationPromise;
        }

        // Already armed from a prior controlled/toggle open.
        if (this.dismissRegistered && this.open) {
            if (this.panelElement) {
                this.panelElement.hidden = false;
            }
            this.syncExpanded();
            return;
        }

        if (!this.dispatchEvent(new PkShowEvent())) {
            this.syncingOpenSideEffects = true;
            this.open = false;
            this.syncingOpenSideEffects = false;
            return;
        }

        this.syncingOpenSideEffects = true;
        this.open = true;
        this.syncingOpenSideEffects = false;
        this.closing = false;
        this.panelAnimated = false;

        if (this.panelElement) {
            this.panelElement.hidden = false;
            // Seed side before first paint so enter keyframes pick a direction.
            syncPopupPlacementAnimation(this.panelElement, this.placement);
        }

        this.syncExpanded();
        this.registerDismissHandlers();

        await this.updateComplete;
        const placement = await waitForPopupReposition(this.popupElement, this.placement);

        if (this.panelElement) {
            syncPopupPlacementAnimation(this.panelElement, placement);
        }

        // Flip data-open after placement so the shared enter animation can run.
        this.panelAnimated = true;

        this.dispatchEvent(new PkAfterShowEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: true },
            bubbles: true,
            composed: true,
        }));
    }

    /**
     * @param immediate Skip exit animation (disconnect / forced teardown).
     */
    async closePopover(source: PkOverlaySource = 'unknown', immediate = false): Promise<void> {
        if (this.exitAnimationPromise) {
            return this.exitAnimationPromise;
        }

        if (!this.dismissRegistered && !this.closing && !this.open) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            // Controlled close was cancelled — restore open and cancel exit arming.
            this.syncingOpenSideEffects = true;
            this.open = true;
            this.syncingOpenSideEffects = false;
            this.closing = false;
            this.panelAnimated = true;
            return;
        }

        this.unregisterDismissHandlers();
        this.closing = true;
        this.panelAnimated = false;

        if (this.open) {
            this.syncingOpenSideEffects = true;
            this.open = false;
            this.syncingOpenSideEffects = false;
        }

        const finishClose = async (): Promise<void> => {
            if (!immediate) {
                await this.updateComplete;
                await this.waitForExitAnimation();
            }

            this.closing = false;
            this.panelAnimated = false;

            if (this.panelElement) {
                this.panelElement.hidden = true;
                this.panelElement.removeAttribute('data-side');
            }

            this.syncExpanded();

            this.dispatchEvent(new PkAfterHideEvent());
            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: false },
                bubbles: true,
                composed: true,
            }));
        };

        this.exitAnimationPromise = finishClose().finally(() => {
            this.exitAnimationPromise = null;
        });

        return this.exitAnimationPromise;
    }

    private waitForExitAnimation(): Promise<void> {
        const panel = this.panelElement;

        if (!panel) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            let settled = false;

            const finish = (): void => {
                if (settled) {
                    return;
                }

                settled = true;
                panel.removeEventListener('animationend', onAnimationEnd);
                window.clearTimeout(fallback);
                panel.classList.remove('closing');
                resolve();
            };

            const onAnimationEnd = (event: AnimationEvent): void => {
                if (event.target === panel && event.animationName.startsWith('pk-popup-content-out')) {
                    finish();
                }
            };

            panel.classList.add('closing');
            panel.addEventListener('animationend', onAnimationEnd);
            const fallback = window.setTimeout(finish, 150);
        });
    }

    private getAnchor(): Element | string | null {
        if (this.anchor) {
            return this.anchor;
        }

        if (this.for) {
            return resolveElementById(this, this.for);
        }

        if (this.triggerElement) {
            return this.triggerElement;
        }

        return null;
    }

    private registerDismissHandlers(): void {
        if (this.dismissRegistered) {
            return;
        }

        registerDismissible(this);
        this.dismissRegistered = true;
        document.addEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.addEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private unregisterDismissHandlers(): void {
        if (this.dismissRegistered) {
            unregisterDismissible(this);
            this.dismissRegistered = false;
        }

        document.removeEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.removeEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private onDocumentPointerDown = (event: PointerEvent): void => {
        if (this.isPointerInside(event) || this.closing) {
            return;
        }

        void this.closePopover('light-dismiss');
    };

    private isPointerInside(event: PointerEvent): boolean {
        return isPointerInsideOverlay(event, {
            host: this,
            anchor: this.getAnchorElement(),
            panel: this.panelElement,
        });
    };

    private onDocumentKeyDown = (event: KeyboardEvent): void => {
        if (event.key !== 'Escape' || !isTopDismissible(this) || this.closing) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        void this.closePopover('escape');
    };

    private getAnchorElement(): HTMLElement | null {
        if (this.anchor instanceof HTMLElement) {
            return this.anchor;
        }

        if (this.triggerElement) {
            return this.triggerElement;
        }

        if (this.for) {
            return resolveElementById(this, this.for);
        }

        return null;
    }

    private syncExpanded(): void {
        this.triggerElement?.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }

    override render() {
        const anchor = this.getAnchor();

        return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${anchor ?? ''}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .arrow=${this.withArrow}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${classMap({
                        panel: true,
                        'pk-popup-content': true,
                        closing: this.closing,
                    })}
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                    tabindex=${this.open ? '-1' : nothing}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-popover': PkPopover;
    }
}
