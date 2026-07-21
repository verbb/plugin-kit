import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { uniqueId } from '../../a11y/focus.js';
import { PkElement } from '../../base/pk-element.js';
import { resolveElementById } from '../../internal/resolve-element-by-id.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
} from '../../events/overlay-lifecycle.js';
// Keep the internal element registered when production builds erase type-only imports.
import '../popup/pk-popup.js';
import type { PkPopup, PkPopupPlacement } from '../popup/pk-popup.js';
import { syncPopupPlacementAnimation, waitForPopupReposition, getPopupSide } from '../../utils/popup-placement-animation.js';
import { pkTooltipStyles } from './pk-tooltip.styles.js';

/**
 * Tooltip —  pattern: hover/focus shows floating hint.
 *
 * @slot trigger - Element that receives the tooltip
 * @slot - Tooltip content (falls back to `content` attribute)
 *
 * @csspart content - Tooltip body
 */
@customElement('pk-tooltip')
export class PkTooltip extends PkElement {
    static override styles = pkTooltipStyles;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'top';

    /** `hover focus` (default) or `manual` for programmatic open only. */
    @property({ reflect: true })
    trigger: 'hover focus' | 'manual' = 'hover focus';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Number, attribute: 'open-delay' })
    openDelay = 0;

    @property({ type: Number, attribute: 'close-delay' })
    closeDelay = 0;

    @property()
    content = '';

    /** Anchor element id — alternative to the trigger slot. */
    @property({ reflect: true })
    for = '';

    @query('pk-popup')
    private popupElement!: PkPopup;

    @state()
    private open = false;

    private triggerElement: HTMLElement | null = null;

    @state()
    private contentAnimated = false;

    @state()
    private closing = false;

    @state()
    private contentSide: ReturnType<typeof getPopupSide> | null = null;

    /**
     * True only when the default slot has real nodes. Pretty-printed HTML often
     * leaves whitespace text nodes in the default slot, which would otherwise
     * suppress the `content` attribute fallback and show an empty tooltip body.
     */
    @state()
    private hasSlottedBody = false;

    private readonly triggerId = uniqueId('pk-tooltip-trigger');
    private openTimer?: number;
    private closeTimer?: number;
    private readonly tooltipId = uniqueId('pk-tooltip');
    private showGeneration = 0;
    private exitGeneration = 0;

    override disconnectedCallback(): void {
        this.popupElement?.removeEventListener('pk-reposition', this.syncPlacementAnimation);
        this.clearTimers();
        this.hideTooltip(true);
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (changed.has('trigger') || changed.has('disabled') || changed.has('for')) {
            this.rebindTrigger();
        }

        if (this.disabled && this.open) {
            this.hideTooltip(true);
        }
    }

    override firstUpdated(): void {
        this.popupElement.addEventListener('pk-reposition', this.syncPlacementAnimation);

        if (this.for) {
            queueMicrotask(() => {
                this.resolveExternalTrigger();
            });
        }
    }

    /** Opens the tooltip programmatically. */
    async show(): Promise<void> {
        if (this.disabled) {
            return;
        }

        this.clearTimers();
        this.showTooltip(true);
        await this.updateComplete;
    }

    /** Closes the tooltip programmatically. */
    async hide(): Promise<void> {
        this.clearTimers();
        this.hideTooltip(true);
        await this.updateComplete;
    }

    private clearTimers(): void {
        window.clearTimeout(this.openTimer);
        window.clearTimeout(this.closeTimer);
    }

    private syncPlacementAnimation = (): void => {
        const placement = this.popupElement?.getAttribute('data-current-placement') ?? this.placement;
        const content = this.popupElement?.getContentElement();

        this.contentSide = placement ? getPopupSide(placement) : null;
        syncPopupPlacementAnimation(this.popupElement, placement);

        if (content) {
            syncPopupPlacementAnimation(content, placement);
        }
    };

    private resolveExternalTrigger(): void {
        this.triggerElement = resolveElementById(this, this.for);
        this.rebindTrigger();
    }

    private onTriggerSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        this.unbindTrigger(this.triggerElement);
        this.triggerElement = trigger ?? null;
        this.rebindTrigger();
        this.requestUpdate();
    }

    private onBodySlotChange = (event: Event): void => {
        const slot = event.target as HTMLSlotElement;
        this.hasSlottedBody = slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                return true;
            }

            return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());
        });
    };

    private rebindTrigger(): void {
        this.unbindTrigger(this.triggerElement);

        if (this.for) {
            this.triggerElement = resolveElementById(this, this.for);
        }

        this.bindTrigger(this.triggerElement);
    }

    private usesPointerTrigger(): boolean {
        return !this.disabled && this.trigger !== 'manual';
    }

    private bindTrigger(trigger: HTMLElement | null): void {
        if (!trigger || !this.usesPointerTrigger()) {
            return;
        }

        if (!trigger.id) {
            trigger.id = this.triggerId;
        }

        trigger.setAttribute('aria-describedby', this.tooltipId);
        trigger.addEventListener('mouseenter', this.scheduleShow);
        trigger.addEventListener('mouseleave', this.scheduleHide);
        trigger.addEventListener('focus', this.scheduleShow);
        trigger.addEventListener('blur', this.scheduleHide);
    }

    private unbindTrigger(trigger: HTMLElement | null): void {
        if (!trigger) {
            return;
        }

        trigger.removeAttribute('aria-describedby');
        trigger.removeEventListener('mouseenter', this.scheduleShow);
        trigger.removeEventListener('mouseleave', this.scheduleHide);
        trigger.removeEventListener('focus', this.scheduleShow);
        trigger.removeEventListener('blur', this.scheduleHide);
    }

    private scheduleShow = (): void => {
        if (!this.usesPointerTrigger()) {
            return;
        }

        window.clearTimeout(this.closeTimer);
        window.clearTimeout(this.openTimer);
        this.openTimer = window.setTimeout(() => this.showTooltip(), this.openDelay);
    };

    private scheduleHide = (): void => {
        if (!this.usesPointerTrigger()) {
            return;
        }

        window.clearTimeout(this.openTimer);
        window.clearTimeout(this.closeTimer);
        this.closeTimer = window.setTimeout(() => this.hideTooltip(), this.closeDelay);
    };

    private getAnchor(): Element | string | null {
        if (this.for) {
            return resolveElementById(this, this.for);
        }

        if (this.triggerElement) {
            return this.triggerElement;
        }

        return null;
    }

    private prepareContentForEnter(content: HTMLElement | null | undefined): void {
        if (!content) {
            return;
        }

        content.classList.remove('closing');
        content.style.animation = 'none';
        void content.getBoundingClientRect();
        content.style.removeProperty('animation');
        content.style.removeProperty('opacity');
        content.style.removeProperty('transform');
    }

    private showTooltip(force = false): void {
        if (!this.getAnchor()) {
            return;
        }

        if (this.open && this.contentAnimated && !this.closing && !force) {
            return;
        }

        if (!this.open) {
            this.dispatchEvent(new PkShowEvent());
        }

        const generation = ++this.showGeneration;
        this.exitGeneration += 1;
        this.closing = false;
        this.open = true;
        this.contentAnimated = false;
        this.prepareContentForEnter(this.popupElement?.getContentElement());

        void this.updateComplete.then(async () => {
            if (generation !== this.showGeneration) {
                return;
            }

            await waitForPopupReposition(this.popupElement, this.placement);

            if (generation !== this.showGeneration) {
                return;
            }

            this.syncPlacementAnimation();
            this.prepareContentForEnter(this.popupElement?.getContentElement());
            this.contentAnimated = true;

            this.dispatchEvent(new PkAfterShowEvent());
            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: true },
                bubbles: true,
                composed: true,
            }));
        });
    }

    private hideTooltip(immediate = false, cancelable = false): void {
        if ((!this.open && !this.closing) && !immediate) {
            return;
        }

        if (this.closing && !immediate) {
            return;
        }

        if (cancelable) {
            const hideEvent = new PkHideEvent('api');

            if (!this.dispatchEvent(hideEvent)) {
                return;
            }
        }

        this.showGeneration += 1;

        if (immediate) {
            this.finishHide();
            return;
        }

        if (!this.contentAnimated) {
            this.finishHide();
            return;
        }

        void this.playExitAnimation();
    }

    private async playExitAnimation(): Promise<void> {
        if (!this.open) {
            return;
        }

        const generation = this.exitGeneration + 1;
        this.exitGeneration = generation;

        const content = this.popupElement?.getContentElement();

        this.closing = true;
        this.contentAnimated = false;

        if (content) {
            await this.waitForExitAnimation(content);
        }

        if (generation !== this.exitGeneration) {
            return;
        }

        this.finishHide();
    }

    private waitForExitAnimation(content: HTMLElement): Promise<void> {
        return new Promise((resolve) => {
            let settled = false;

            const finish = (): void => {
                if (settled) {
                    return;
                }

                settled = true;
                content.removeEventListener('animationend', onAnimationEnd);
                window.clearTimeout(fallback);
                content.classList.remove('closing');
                resolve();
            };

            const onAnimationEnd = (event: AnimationEvent): void => {
                if (event.target === content && event.animationName.startsWith('pk-tooltip-out')) {
                    finish();
                }
            };

            content.classList.add('closing');
            content.addEventListener('animationend', onAnimationEnd);
            const fallback = window.setTimeout(finish, 200);
        });
    }

    private finishHide(): void {
        const content = this.popupElement?.getContentElement();

        this.closing = false;
        this.contentAnimated = false;
        this.contentSide = null;
        this.open = false;
        this.popupElement?.removeAttribute('data-side');
        this.prepareContentForEnter(content);

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));
    }

    override render() {
        const anchor = this.getAnchor();

        return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${anchor ?? ''}
                .placement=${this.placement}
                .distance=${4}
                hover-bridge
                flip
                shift
            >
                <div
                    part="content"
                    class=${classMap({
                        content: true,
                        'pk-popup-content': true,
                        closing: this.closing,
                    })}
                    id=${this.tooltipId}
                    role="tooltip"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.contentAnimated && !this.closing ? '' : nothing}
                    data-side=${this.contentSide ?? nothing}
                >
                    <slot @slotchange=${this.onBodySlotChange}></slot>
                    ${this.hasSlottedBody ? nothing : (this.content || nothing)}
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tooltip': PkTooltip;
    }
}
