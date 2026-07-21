import { d as registerDismissible, f as unregisterDismissible, n as uniqueId, u as isTopDismissible } from "../../chunks/pk-a11y-Cx5RZvhu.js";
import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { r as buttonGroupCornerRoleStyles } from "../../chunks/button-group-item.styles-BNc-ksl1.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "../../chunks/overlay-lifecycle-BG4QMRLw.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "../../chunks/popup-placement-animation-BPjq650B.js";
import { t as popupContentAnimationStyles } from "../../chunks/popup-content-animation.styles-C9ffC35f.js";
import { n as resolveElementById } from "../../chunks/pk-popup-BYFbKaHH.js";
import { n as isPointerInsideOverlay } from "../../chunks/popup-pointer-BTS3Y6LE.js";
//#region src/components/popover/pk-popover.styles.ts
var pkPopoverStyles = [
	buttonGroupCornerRoleStyles(),
	popupContentAnimationStyles,
	i`
        @layer pk-component {
            :host {
                /* Flex column parents stretch cross-axis size — pin to content.
                   (inline-block + align-self; same class of fix as dialog / dropdown.) */
                display: inline-block;
                max-width: 100%;
                align-self: flex-start;
                flex: none;
                vertical-align: middle;
            }

            :host([data-pk-group-orientation]) {
                display: inline-flex;
                vertical-align: middle;
                flex: 0 0 auto;
                align-self: auto;
            }

            :host([data-pk-group-orientation]) ::slotted([slot='trigger']) {
                --pk-bg-start-start-radius: inherit;
                --pk-bg-start-end-radius: inherit;
                --pk-bg-end-start-radius: inherit;
                --pk-bg-end-end-radius: inherit;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]) {
                margin-inline-start: var(--pk-bg-horizontal-indent, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]) {
                margin-block-start: var(--pk-bg-vertical-indent, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:has([slot='trigger'][variant='outline'], [slot='trigger'][variant='dashed'])) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            /* Match pk-popup's arrow fill to the panel surface when with-arrow is on. */
            :host([with-arrow]) {
                --pk-popup-arrow-color: var(--pk-color-white);
                --pk-popup-arrow-size: 8px;
            }

            .panel {
                box-sizing: border-box;
                width: 18rem;
                padding: 1rem;
                border-radius: var(--pk-radius-md);
                background: var(--pk-color-white);
                box-shadow: var(--pk-shadow-popover);
                /* Craft CP body text (~gray-700), not gray-900. */
                color: var(--pk-color-gray-700);
            }

            /* Flush panels for command/menu chrome that owns its own inset (variable picker, etc.).
               Match kit v1 PopoverContent min-w 260px / max-w 360px: without min-width,
               width max-content shrinks to short labels and looks narrower than the old picker. */
            :host([flush]) .panel {
                width: max-content;
                min-width: var(--pk-popover-flush-min-width, 16.25rem);
                max-width: min(var(--pk-popover-flush-max-width, 22.5rem), 100vw - 1rem);
                padding: 0;
            }

            .panel[hidden] {
                display: none !important;
            }
        }
    `
];
//#endregion
//#region src/components/popover/pk-popover.ts
var PkPopover = class PkPopover extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.open = false;
		this.placement = "bottom";
		this.sideOffset = 4;
		this.flush = false;
		this.withArrow = false;
		this.for = "";
		this.anchor = null;
		this.triggerElement = null;
		this.closing = false;
		this.panelAnimated = false;
		this.triggerId = uniqueId("pk-popover-trigger");
		this.dismissRegistered = false;
		this.syncingOpenSideEffects = false;
		this.exitAnimationPromise = null;
		this.handleToggleClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (this.closing) return;
			this.open = !this.open;
		};
		this.onDocumentPointerDown = (event) => {
			if (this.isPointerInside(event) || this.closing) return;
			this.closePopover("light-dismiss");
		};
		this.onDocumentKeyDown = (event) => {
			if (event.key !== "Escape" || !isTopDismissible(this) || this.closing) return;
			event.preventDefault();
			event.stopPropagation();
			this.closePopover("escape");
		};
	}
	static {
		this.styles = pkPopoverStyles;
	}
	get panelElement() {
		return this.popupElement?.getContentElement() ?? null;
	}
	disconnectedCallback() {
		this.closePopover("api", true);
		super.disconnectedCallback();
	}
	/**
	* When controlled/toggle `open` flips false, arm `closing` in the same update so the
	* panel is not `hidden` for a frame before the exit animation starts.
	*/
	willUpdate(changed) {
		if (changed.has("open") && this.open === false && changed.get("open") === true && !this.syncingOpenSideEffects && !this.closing) {
			this.closing = true;
			this.panelAnimated = false;
		}
	}
	/**
	* Controlled `open` (e.g. React) must arm/disarm light-dismiss the same way as
	* trigger toggles. Without this, programmatic open shows the panel but click-away
	* never fires.
	*/
	async updated(changed) {
		super.updated(changed);
		if (!changed.has("open") || this.syncingOpenSideEffects) return;
		const previousOpen = changed.get("open");
		if (previousOpen === this.open) return;
		if (previousOpen === void 0 && this.open === false) return;
		if (this.open) await this.openPopover();
		else await this.closePopover("api");
	}
	onTriggerSlotChange(event) {
		const [trigger] = event.target.assignedElements({ flatten: true });
		this.unbindTrigger(this.triggerElement);
		this.triggerElement = trigger ?? null;
		this.bindTrigger(this.triggerElement);
	}
	bindTrigger(trigger) {
		if (!trigger) return;
		if (!trigger.id) trigger.id = this.triggerId;
		trigger.setAttribute("aria-haspopup", "dialog");
		trigger.addEventListener("click", this.handleToggleClick);
		this.syncExpanded();
	}
	unbindTrigger(trigger) {
		trigger?.removeEventListener("click", this.handleToggleClick);
	}
	async openPopover() {
		if (!this.getAnchor()) return;
		if (this.exitAnimationPromise) await this.exitAnimationPromise;
		if (this.dismissRegistered && this.open) {
			if (this.panelElement) this.panelElement.hidden = false;
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
			syncPopupPlacementAnimation(this.panelElement, this.placement);
		}
		this.syncExpanded();
		this.registerDismissHandlers();
		await this.updateComplete;
		const placement = await waitForPopupReposition(this.popupElement, this.placement);
		if (this.panelElement) syncPopupPlacementAnimation(this.panelElement, placement);
		this.panelAnimated = true;
		this.dispatchEvent(new PkAfterShowEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: true },
			bubbles: true,
			composed: true
		}));
	}
	/**
	* @param immediate Skip exit animation (disconnect / forced teardown).
	*/
	async closePopover(source = "unknown", immediate = false) {
		if (this.exitAnimationPromise) return this.exitAnimationPromise;
		if (!this.dismissRegistered && !this.closing && !this.open) return;
		const hideEvent = new PkHideEvent(source);
		if (!this.dispatchEvent(hideEvent)) {
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
		const finishClose = async () => {
			if (!immediate) {
				await this.updateComplete;
				await this.waitForExitAnimation();
			}
			this.closing = false;
			this.panelAnimated = false;
			if (this.panelElement) {
				this.panelElement.hidden = true;
				this.panelElement.removeAttribute("data-side");
			}
			this.syncExpanded();
			this.dispatchEvent(new PkAfterHideEvent());
			this.dispatchEvent(new CustomEvent("pk-open-change", {
				detail: { open: false },
				bubbles: true,
				composed: true
			}));
		};
		this.exitAnimationPromise = finishClose().finally(() => {
			this.exitAnimationPromise = null;
		});
		return this.exitAnimationPromise;
	}
	waitForExitAnimation() {
		const panel = this.panelElement;
		if (!panel) return Promise.resolve();
		return new Promise((resolve) => {
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				panel.removeEventListener("animationend", onAnimationEnd);
				window.clearTimeout(fallback);
				panel.classList.remove("closing");
				resolve();
			};
			const onAnimationEnd = (event) => {
				if (event.target === panel && event.animationName.startsWith("pk-popup-content-out")) finish();
			};
			panel.classList.add("closing");
			panel.addEventListener("animationend", onAnimationEnd);
			const fallback = window.setTimeout(finish, 150);
		});
	}
	getAnchor() {
		if (this.anchor) return this.anchor;
		if (this.for) return resolveElementById(this, this.for);
		if (this.triggerElement) return this.triggerElement;
		return null;
	}
	registerDismissHandlers() {
		if (this.dismissRegistered) return;
		registerDismissible(this);
		this.dismissRegistered = true;
		document.addEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.addEventListener("keydown", this.onDocumentKeyDown, true);
	}
	unregisterDismissHandlers() {
		if (this.dismissRegistered) {
			unregisterDismissible(this);
			this.dismissRegistered = false;
		}
		document.removeEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.removeEventListener("keydown", this.onDocumentKeyDown, true);
	}
	isPointerInside(event) {
		return isPointerInsideOverlay(event, {
			host: this,
			anchor: this.getAnchorElement(),
			panel: this.panelElement
		});
	}
	getAnchorElement() {
		if (this.anchor instanceof HTMLElement) return this.anchor;
		if (this.triggerElement) return this.triggerElement;
		if (this.for) return resolveElementById(this, this.for);
		return null;
	}
	syncExpanded() {
		this.triggerElement?.setAttribute("aria-expanded", this.open ? "true" : "false");
	}
	render() {
		const anchor = this.getAnchor();
		return b`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${anchor ?? ""}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .arrow=${this.withArrow}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${e({
			panel: true,
			"pk-popup-content": true,
			closing: this.closing
		})}
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? "" : A}
                    tabindex=${this.open ? "-1" : A}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkPopover.prototype, "open", void 0);
__decorate([n({ reflect: true })], PkPopover.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkPopover.prototype, "sideOffset", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkPopover.prototype, "flush", void 0);
__decorate([n({
	attribute: "with-arrow",
	type: Boolean,
	reflect: true
})], PkPopover.prototype, "withArrow", void 0);
__decorate([n({ reflect: true })], PkPopover.prototype, "for", void 0);
__decorate([n({ attribute: false })], PkPopover.prototype, "anchor", void 0);
__decorate([e$1("pk-popup")], PkPopover.prototype, "popupElement", void 0);
__decorate([r()], PkPopover.prototype, "triggerElement", void 0);
__decorate([r()], PkPopover.prototype, "closing", void 0);
__decorate([r()], PkPopover.prototype, "panelAnimated", void 0);
PkPopover = __decorate([t("pk-popover")], PkPopover);
//#endregion
export { PkPopover };
