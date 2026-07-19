import { n as uniqueId } from "./pk-a11y-Cx5RZvhu.js";
import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "./pk-base-BlxAYXJD.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-C3tSQ3UR.js";
import { i as waitForPopupReposition, n as getPopupSide, r as syncPopupPlacementAnimation } from "./popup-placement-animation-WlEXnS85.js";
import { n as resolveElementById } from "./pk-popup-BNRyCsVX.js";
var pkTooltipStyles = [i`
    @layer pk-component {
        .content.pk-popup-content {
            transform-origin: var(--pk-transform-origin, top);
        }

        .content.pk-popup-content[data-open] {
            animation: pk-tooltip-in 150ms ease forwards;
        }

        .content.pk-popup-content[data-open][data-side='top'] {
            animation-name: pk-tooltip-in-top;
        }

        .content.pk-popup-content[data-open][data-side='bottom'] {
            animation-name: pk-tooltip-in-bottom;
        }

        .content.pk-popup-content[data-open][data-side='left'] {
            animation-name: pk-tooltip-in-left;
        }

        .content.pk-popup-content[data-open][data-side='right'] {
            animation-name: pk-tooltip-in-right;
        }

        .content.pk-popup-content.closing {
            animation: pk-tooltip-out 150ms ease;
        }

        @keyframes pk-tooltip-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-tooltip-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        @keyframes pk-tooltip-in-top {
            from {
                opacity: 0;
                transform: scale(0.95) translateY(0.5rem);
            }

            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes pk-tooltip-in-bottom {
            from {
                opacity: 0;
                transform: scale(0.95) translateY(-0.5rem);
            }

            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes pk-tooltip-in-left {
            from {
                opacity: 0;
                transform: scale(0.95) translateX(0.5rem);
            }

            to {
                opacity: 1;
                transform: scale(1) translateX(0);
            }
        }

        @keyframes pk-tooltip-in-right {
            from {
                opacity: 0;
                transform: scale(0.95) translateX(-0.5rem);
            }

            to {
                opacity: 1;
                transform: scale(1) translateX(0);
            }
        }
    }
`, i`
    @layer pk-component {
        :host {
            display: inline-block;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            vertical-align: middle;
            --pk-popup-z-index: 250;
            --pk-tooltip-arrow-size: 9px;
            --pk-tooltip-arrow-inset: 1px;
        }

        .content:not([data-open]):not(.closing) {
            opacity: 0;
            pointer-events: none;
        }

        .content[data-open]:not(.closing) {
            opacity: 1;
        }

        .content {
            position: relative;
            isolation: isolate;
            overflow: visible;
            width: fit-content;
            max-width: 20rem;
            padding: 4px 8px;
            border-radius: var(--pk-radius-sm);
            background: #1c2e36;
            color: var(--pk-color-white);
            font-family: var(--pk-font-family);
            font-size: 12px;
            line-height: 1.4;
            pointer-events: none;
        }

        .content::after {
            content: '';
            position: absolute;
            z-index: -1;
            width: var(--pk-tooltip-arrow-size);
            height: var(--pk-tooltip-arrow-size);
            background: #1c2e36;
            border-radius: 2px;
            rotate: 45deg;
            pointer-events: none;
        }

        .content[data-side='top']::after {
            left: calc(50% - var(--pk-tooltip-arrow-size) / 2);
            bottom: calc(var(--pk-tooltip-arrow-size) * -0.5 + var(--pk-tooltip-arrow-inset));
        }

        .content[data-side='bottom']::after {
            left: calc(50% - var(--pk-tooltip-arrow-size) / 2);
            top: calc(var(--pk-tooltip-arrow-size) * -0.5 + var(--pk-tooltip-arrow-inset));
        }

        .content[data-side='left']::after {
            top: calc(50% - var(--pk-tooltip-arrow-size) / 2);
            right: calc(var(--pk-tooltip-arrow-size) * -0.5 + var(--pk-tooltip-arrow-inset));
        }

        .content[data-side='right']::after {
            top: calc(50% - var(--pk-tooltip-arrow-size) / 2);
            left: calc(var(--pk-tooltip-arrow-size) * -0.5 + var(--pk-tooltip-arrow-inset));
        }

        .content[hidden] {
            display: none !important;
        }
    }
    `];
//#endregion
//#region src/components/tooltip/pk-tooltip.ts
var PkTooltip = class PkTooltip extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.placement = "top";
		this.trigger = "hover focus";
		this.disabled = false;
		this.openDelay = 0;
		this.closeDelay = 0;
		this.content = "";
		this.for = "";
		this.open = false;
		this.triggerElement = null;
		this.contentAnimated = false;
		this.closing = false;
		this.contentSide = null;
		this.hasSlottedBody = false;
		this.triggerId = uniqueId("pk-tooltip-trigger");
		this.tooltipId = uniqueId("pk-tooltip");
		this.showGeneration = 0;
		this.exitGeneration = 0;
		this.syncPlacementAnimation = () => {
			const placement = this.popupElement?.getAttribute("data-current-placement") ?? this.placement;
			const content = this.popupElement?.getContentElement();
			this.contentSide = placement ? getPopupSide(placement) : null;
			syncPopupPlacementAnimation(this.popupElement, placement);
			if (content) syncPopupPlacementAnimation(content, placement);
		};
		this.onBodySlotChange = (event) => {
			const slot = event.target;
			this.hasSlottedBody = slot.assignedNodes({ flatten: true }).some((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) return true;
				return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());
			});
		};
		this.scheduleShow = () => {
			if (!this.usesPointerTrigger()) return;
			window.clearTimeout(this.closeTimer);
			window.clearTimeout(this.openTimer);
			this.openTimer = window.setTimeout(() => this.showTooltip(), this.openDelay);
		};
		this.scheduleHide = () => {
			if (!this.usesPointerTrigger()) return;
			window.clearTimeout(this.openTimer);
			window.clearTimeout(this.closeTimer);
			this.closeTimer = window.setTimeout(() => this.hideTooltip(), this.closeDelay);
		};
	}
	static {
		this.styles = pkTooltipStyles;
	}
	disconnectedCallback() {
		this.popupElement?.removeEventListener("pk-reposition", this.syncPlacementAnimation);
		this.clearTimers();
		this.hideTooltip(true);
		super.disconnectedCallback();
	}
	updated(changed) {
		super.updated(changed);
		if (changed.has("trigger") || changed.has("disabled") || changed.has("for")) this.rebindTrigger();
		if (this.disabled && this.open) this.hideTooltip(true);
	}
	firstUpdated() {
		this.popupElement.addEventListener("pk-reposition", this.syncPlacementAnimation);
		if (this.for) queueMicrotask(() => {
			this.resolveExternalTrigger();
		});
	}
	/** Opens the tooltip programmatically. */
	async show() {
		if (this.disabled) return;
		this.clearTimers();
		this.showTooltip(true);
		await this.updateComplete;
	}
	/** Closes the tooltip programmatically. */
	async hide() {
		this.clearTimers();
		this.hideTooltip(true);
		await this.updateComplete;
	}
	clearTimers() {
		window.clearTimeout(this.openTimer);
		window.clearTimeout(this.closeTimer);
	}
	resolveExternalTrigger() {
		this.triggerElement = resolveElementById(this, this.for);
		this.rebindTrigger();
	}
	onTriggerSlotChange(event) {
		const [trigger] = event.target.assignedElements({ flatten: true });
		this.unbindTrigger(this.triggerElement);
		this.triggerElement = trigger ?? null;
		this.rebindTrigger();
		this.requestUpdate();
	}
	rebindTrigger() {
		this.unbindTrigger(this.triggerElement);
		if (this.for) this.triggerElement = resolveElementById(this, this.for);
		this.bindTrigger(this.triggerElement);
	}
	usesPointerTrigger() {
		return !this.disabled && this.trigger !== "manual";
	}
	bindTrigger(trigger) {
		if (!trigger || !this.usesPointerTrigger()) return;
		if (!trigger.id) trigger.id = this.triggerId;
		trigger.setAttribute("aria-describedby", this.tooltipId);
		trigger.addEventListener("mouseenter", this.scheduleShow);
		trigger.addEventListener("mouseleave", this.scheduleHide);
		trigger.addEventListener("focus", this.scheduleShow);
		trigger.addEventListener("blur", this.scheduleHide);
	}
	unbindTrigger(trigger) {
		if (!trigger) return;
		trigger.removeAttribute("aria-describedby");
		trigger.removeEventListener("mouseenter", this.scheduleShow);
		trigger.removeEventListener("mouseleave", this.scheduleHide);
		trigger.removeEventListener("focus", this.scheduleShow);
		trigger.removeEventListener("blur", this.scheduleHide);
	}
	getAnchor() {
		if (this.for) return resolveElementById(this, this.for);
		if (this.triggerElement) return this.triggerElement;
		return null;
	}
	prepareContentForEnter(content) {
		if (!content) return;
		content.classList.remove("closing");
		content.style.animation = "none";
		content.getBoundingClientRect();
		content.style.removeProperty("animation");
		content.style.removeProperty("opacity");
		content.style.removeProperty("transform");
	}
	showTooltip(force = false) {
		if (!this.getAnchor()) return;
		if (this.open && this.contentAnimated && !this.closing && !force) return;
		if (!this.open) this.dispatchEvent(new PkShowEvent());
		const generation = ++this.showGeneration;
		this.exitGeneration += 1;
		this.closing = false;
		this.open = true;
		this.contentAnimated = false;
		this.prepareContentForEnter(this.popupElement?.getContentElement());
		this.updateComplete.then(async () => {
			if (generation !== this.showGeneration) return;
			await waitForPopupReposition(this.popupElement, this.placement);
			if (generation !== this.showGeneration) return;
			this.syncPlacementAnimation();
			this.prepareContentForEnter(this.popupElement?.getContentElement());
			this.contentAnimated = true;
			this.dispatchEvent(new PkAfterShowEvent());
			this.dispatchEvent(new CustomEvent("pk-open-change", {
				detail: { open: true },
				bubbles: true,
				composed: true
			}));
		});
	}
	hideTooltip(immediate = false, cancelable = false) {
		if (!this.open && !this.closing && !immediate) return;
		if (this.closing && !immediate) return;
		if (cancelable) {
			const hideEvent = new PkHideEvent("api");
			if (!this.dispatchEvent(hideEvent)) return;
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
		this.playExitAnimation();
	}
	async playExitAnimation() {
		if (!this.open) return;
		const generation = this.exitGeneration + 1;
		this.exitGeneration = generation;
		const content = this.popupElement?.getContentElement();
		this.closing = true;
		this.contentAnimated = false;
		if (content) await this.waitForExitAnimation(content);
		if (generation !== this.exitGeneration) return;
		this.finishHide();
	}
	waitForExitAnimation(content) {
		return new Promise((resolve) => {
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				content.removeEventListener("animationend", onAnimationEnd);
				window.clearTimeout(fallback);
				content.classList.remove("closing");
				resolve();
			};
			const onAnimationEnd = (event) => {
				if (event.target === content && event.animationName.startsWith("pk-tooltip-out")) finish();
			};
			content.classList.add("closing");
			content.addEventListener("animationend", onAnimationEnd);
			const fallback = window.setTimeout(finish, 200);
		});
	}
	finishHide() {
		const content = this.popupElement?.getContentElement();
		this.closing = false;
		this.contentAnimated = false;
		this.contentSide = null;
		this.open = false;
		this.popupElement?.removeAttribute("data-side");
		this.prepareContentForEnter(content);
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		const anchor = this.getAnchor();
		return b`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${anchor ?? ""}
                .placement=${this.placement}
                .distance=${4}
                hover-bridge
                flip
                shift
            >
                <div
                    part="content"
                    class=${e({
			content: true,
			"pk-popup-content": true,
			closing: this.closing
		})}
                    id=${this.tooltipId}
                    role="tooltip"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.contentAnimated && !this.closing ? "" : A}
                    data-side=${this.contentSide ?? A}
                >
                    <slot @slotchange=${this.onBodySlotChange}></slot>
                    ${this.hasSlottedBody ? A : this.content || A}
                </div>
            </pk-popup>
        `;
	}
};
__decorate([n({ reflect: true })], PkTooltip.prototype, "placement", void 0);
__decorate([n({ reflect: true })], PkTooltip.prototype, "trigger", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTooltip.prototype, "disabled", void 0);
__decorate([n({
	type: Number,
	attribute: "open-delay"
})], PkTooltip.prototype, "openDelay", void 0);
__decorate([n({
	type: Number,
	attribute: "close-delay"
})], PkTooltip.prototype, "closeDelay", void 0);
__decorate([n()], PkTooltip.prototype, "content", void 0);
__decorate([n({ reflect: true })], PkTooltip.prototype, "for", void 0);
__decorate([e$1("pk-popup")], PkTooltip.prototype, "popupElement", void 0);
__decorate([r()], PkTooltip.prototype, "open", void 0);
__decorate([r()], PkTooltip.prototype, "contentAnimated", void 0);
__decorate([r()], PkTooltip.prototype, "closing", void 0);
__decorate([r()], PkTooltip.prototype, "contentSide", void 0);
__decorate([r()], PkTooltip.prototype, "hasSlottedBody", void 0);
PkTooltip = __decorate([t("pk-tooltip")], PkTooltip);
//#endregion
export { PkTooltip as t };
