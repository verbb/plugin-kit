import { t as SUPPORTS_POPOVER } from "./supports-popover-COjbi2RP.js";
import { f as A, i as e$1, l as n, m as i$1, p as b, s as e$2, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "./pk-base-BlxAYXJD.js";
import { t as computePopupTransformOrigin } from "./popup-placement-animation-WlEXnS85.js";
import { a as offset, c as size, i as flip, l as getOverflowAncestors, n as autoUpdate, o as platform, r as computePosition, s as shift, t as arrow, u as isContainingBlock } from "./floating-ui-87vslRWW.js";
//#region src/internal/resolve-element-by-id.ts
/** Resolve an element id from the same root as the host (shadow or document), then the document. */
function resolveElementById(host, id) {
	if (!id) return null;
	const root = host.getRootNode();
	if (root instanceof Document || root instanceof ShadowRoot) {
		const match = root.getElementById(id);
		if (match) return match;
	}
	return host.ownerDocument.getElementById(id);
}
//#endregion
//#region ../node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function e(t) {
	return i(t);
}
function r(t) {
	return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function i(e) {
	for (let t = e; t; t = r(t)) if (t instanceof Element && "none" === getComputedStyle(t).display) return null;
	for (let n = r(e); n; n = r(n)) {
		if (!(n instanceof Element)) continue;
		const e = getComputedStyle(n);
		if ("contents" !== e.display) {
			if ("static" !== e.position || isContainingBlock(e)) return n;
			if ("BODY" === n.tagName) return n;
		}
	}
	return null;
}
//#endregion
//#region src/events/pk-reposition.ts
/** Emitted when a popup repositions — mirrors  reposition semantics with pk naming. */
var PkRepositionEvent = class extends Event {
	constructor() {
		super("pk-reposition", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
//#endregion
//#region src/components/popup/pk-popup.styles.ts
var pkPopupStyles = i$1`
    @layer pk-component {
        :host {
            display: contents;
        }

        .popup {
            position: absolute;
            isolation: isolate;
            width: max-content;
            z-index: var(--pk-popup-z-index, 1000);
            /* Never transition coordinates — flip would animate the jump. */
            transition: none;

            /* Reset UA styles for [popover] — see  pk-popup. */
            inset: unset;
            padding: unset;
            margin: unset;
            height: unset;
            color: unset;
            background: unset;
            border: unset;
            overflow: unset;
        }

        .popup-fixed {
            position: fixed;
        }

        .popup:not(.active) {
            display: none;
        }

        /* Prefer visibility over opacity so enter animations are not fighting a
         * 0→1 fade. Matches base-ui isPositioned / hide-until-placed.
         */
        .popup.active:not(.positioned) {
            visibility: hidden;
            pointer-events: none;
        }

        .popup.show {
            animation: pk-popup-surface-in 100ms ease-out;
        }

        .popup.hide {
            animation: pk-popup-surface-out 100ms ease-in forwards;
        }

        @keyframes pk-popup-surface-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-popup-surface-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        .arrow {
            position: absolute;
            width: var(--pk-popup-arrow-size, 6px);
            height: var(--pk-popup-arrow-size, 6px);
            rotate: 45deg;
            background: var(--pk-popup-arrow-color, var(--pk-color-white));
            z-index: 1;
        }

        .hover-bridge {
            position: fixed;
            z-index: calc(var(--pk-popup-z-index, 1000) - 1);
            inset: 0;
            clip-path: polygon(
                var(--pk-hover-bridge-top-left-x, 0) var(--pk-hover-bridge-top-left-y, 0),
                var(--pk-hover-bridge-top-right-x, 0) var(--pk-hover-bridge-top-right-y, 0),
                var(--pk-hover-bridge-bottom-right-x, 0) var(--pk-hover-bridge-bottom-right-y, 0),
                var(--pk-hover-bridge-bottom-left-x, 0) var(--pk-hover-bridge-bottom-left-y, 0)
            );
            pointer-events: auto;
        }

        .hover-bridge:not(.hover-bridge-visible) {
            display: none;
        }
    }
`;
//#endregion
//#region src/components/popup/pk-popup.ts
function isVirtualElement(value) {
	return value !== null && typeof value === "object" && "getBoundingClientRect" in value;
}
function resolvePositionStrategy(positionMethod) {
	if (positionMethod) return positionMethod;
	return SUPPORTS_POPOVER ? "absolute" : "fixed";
}
function resolveScrollBoundary(anchorElement, boundary) {
	if (!SUPPORTS_POPOVER || isVirtualElement(anchorElement) || boundary !== "scroll") return;
	return getOverflowAncestors(anchorElement).filter((node) => node instanceof Element);
}
var PkPopup = class PkPopup extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.anchor = "";
		this.active = false;
		this.boundary = "viewport";
		this.placement = "bottom-start";
		this.distance = 4;
		this.skidding = 0;
		this.flip = true;
		this.flipFallbackPlacements = "";
		this.flipFallbackStrategy = "best-fit";
		this.flipPadding = 8;
		this.shift = true;
		this.shiftPadding = 8;
		this.arrow = false;
		this.arrowPlacement = "anchor";
		this.arrowPadding = 10;
		this.anchorTracking = true;
		this.hoverBridge = false;
		this.anchorElement = null;
		this.settlingInitialPosition = false;
		this.settleGeneration = 0;
	}
	static {
		this.styles = pkPopupStyles;
	}
	disconnectedCallback() {
		this.stop();
		super.disconnectedCallback();
	}
	updated(changed) {
		super.updated(changed);
		if (changed.has("active")) if (this.active) {
			this.resolveAnchor();
			this.start();
		} else this.stop();
		if (changed.has("anchor")) this.handleAnchorChange();
		if (this.active && !changed.has("active")) this.reposition();
	}
	/** Forces the popup to recalculate and reposition itself. */
	reposition() {
		if (this.settlingInitialPosition) return;
		this.repositionAsync();
	}
	/**
	* Runs Floating UI once and applies coords. Does not reveal an unpositioned
	* popup — `settleInitialPosition()` owns the first paint.
	*/
	async repositionAsync(emitEvent = true) {
		const floatingElement = this.popupElement;
		const arrowTarget = this.arrow ? this.arrowElement : null;
		if (!this.active || !this.anchorElement || !floatingElement) return false;
		const scrollBoundary = resolveScrollBoundary(this.anchorElement, this.boundary);
		const middleware = [offset({
			mainAxis: this.distance,
			crossAxis: this.skidding
		})];
		if (this.sync) middleware.push(size({ apply: ({ rects }) => {
			const syncWidth = this.sync === "width" || this.sync === "both";
			const syncHeight = this.sync === "height" || this.sync === "both";
			floatingElement.style.width = syncWidth ? `${rects.reference.width}px` : "";
			floatingElement.style.height = syncHeight ? `${rects.reference.height}px` : "";
		} }));
		else {
			floatingElement.style.width = "";
			floatingElement.style.height = "";
		}
		if (this.flip) middleware.push(flip({
			boundary: scrollBoundary,
			fallbackPlacements: this.flipFallbackPlacements ? this.flipFallbackPlacements.split(" ").map((value) => value.trim()).filter(Boolean) : void 0,
			fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
			padding: this.flipPadding
		}));
		if (this.shift) middleware.push(shift({
			boundary: scrollBoundary,
			padding: this.shiftPadding
		}));
		if (this.arrow && arrowTarget) middleware.push(arrow({
			element: arrowTarget,
			padding: this.arrowPadding
		}));
		const strategy = resolvePositionStrategy(this.positionMethod);
		const useFixedFallback = strategy === "fixed";
		floatingElement.classList.toggle("popup-fixed", useFixedFallback);
		const getOffsetParentFn = SUPPORTS_POPOVER ? (element) => platform.getOffsetParent(element, e) : platform.getOffsetParent;
		const { x, y, middlewareData, placement } = await computePosition(this.anchorElement, floatingElement, {
			placement: this.placement,
			middleware,
			strategy,
			platform: {
				...platform,
				getOffsetParent: getOffsetParentFn
			}
		});
		if (!this.active || !floatingElement.isConnected) return false;
		const staticSide = {
			top: "bottom",
			right: "left",
			bottom: "top",
			left: "right"
		}[placement.split("-")[0]];
		this.setAttribute("data-current-placement", placement);
		Object.assign(floatingElement.style, {
			left: `${x}px`,
			top: `${y}px`,
			...useFixedFallback ? { position: "fixed" } : { position: "" }
		});
		if (this.anchorElement) {
			const referenceRect = this.anchorElement.getBoundingClientRect();
			const floatingRect = floatingElement.getBoundingClientRect();
			floatingElement.style.setProperty("--pk-anchor-width", `${referenceRect.width}px`);
			floatingElement.style.setProperty("--pk-anchor-height", `${referenceRect.height}px`);
			const transformOrigin = computePopupTransformOrigin(placement, referenceRect, floatingRect, this.distance, middlewareData.shift);
			floatingElement.style.setProperty("--pk-transform-origin", transformOrigin);
		}
		if (this.arrow && arrowTarget) {
			const arrowX = middlewareData.arrow?.x;
			const arrowY = middlewareData.arrow?.y;
			let top = "";
			let right = "";
			let bottom = "";
			let left = "";
			if (this.arrowPlacement === "start") {
				const value = typeof arrowX === "number" ? `${this.arrowPadding}px` : "";
				top = typeof arrowY === "number" ? `${this.arrowPadding}px` : "";
				left = value;
			} else if (this.arrowPlacement === "end") {
				right = typeof arrowX === "number" ? `${this.arrowPadding}px` : "";
				bottom = typeof arrowY === "number" ? `${this.arrowPadding}px` : "";
			} else if (this.arrowPlacement === "center") {
				left = typeof arrowX === "number" ? "50%" : "";
				top = typeof arrowY === "number" ? "50%" : "";
			} else {
				left = typeof arrowX === "number" ? `${arrowX}px` : "";
				top = typeof arrowY === "number" ? `${arrowY}px` : "";
			}
			Object.assign(arrowTarget.style, {
				top,
				right,
				bottom,
				left,
				transform: "",
				[staticSide]: "calc(-1 * var(--pk-popup-arrow-size, 6px) / 2)"
			});
		}
		requestAnimationFrame(() => this.updateHoverBridge());
		if (emitEvent) this.dispatchEvent(new PkRepositionEvent());
		return true;
	}
	frames(count) {
		return new Promise((resolve) => {
			const step = (remaining) => {
				if (remaining <= 0) {
					resolve();
					return;
				}
				requestAnimationFrame(() => step(remaining - 1));
			};
			step(count);
		});
	}
	/**
	* Hide → layout → measure → confirm flip → reveal.
	* A single computePosition often runs before slotted content has height, so flip
	* picks the preferred side; autoUpdate then jumps — that was the visible flash.
	*/
	async settleInitialPosition() {
		const generation = ++this.settleGeneration;
		const floatingElement = this.popupElement;
		if (!floatingElement) {
			this.settlingInitialPosition = false;
			return;
		}
		await this.frames(2);
		if (!this.active || generation !== this.settleGeneration) return;
		await this.repositionAsync(false);
		floatingElement.offsetHeight;
		await this.frames(1);
		if (!this.active || generation !== this.settleGeneration) return;
		await this.repositionAsync(false);
		if (!this.active || generation !== this.settleGeneration) return;
		floatingElement.classList.add("positioned");
		this.settlingInitialPosition = false;
		requestAnimationFrame(() => this.updateHoverBridge());
		this.dispatchEvent(new PkRepositionEvent());
	}
	resolveAnchor() {
		if (typeof this.anchor === "string" && this.anchor) {
			this.anchorElement = resolveElementById(this, this.anchor);
			return;
		}
		if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
			this.anchorElement = this.anchor;
			return;
		}
		let slotted = this.querySelector("[slot=\"anchor\"]");
		if (slotted instanceof HTMLSlotElement) slotted = slotted.assignedElements({ flatten: true })[0] ?? null;
		this.anchorElement = slotted;
	}
	async handleAnchorChange() {
		await this.stop();
		this.resolveAnchor();
		if (this.anchorElement && this.active) this.start();
	}
	/** When false, skip popover top layer (e.g. menu/select use fixed coords to simplify modal handoff). */
	usesPopoverTopLayer() {
		return SUPPORTS_POPOVER && this.positionMethod !== "fixed";
	}
	/** `stop()` — sync hidePopover + cleanup autoUpdate. */
	stop() {
		return new Promise((resolve) => {
			const popup = this.popupElement;
			this.settleGeneration += 1;
			this.settlingInitialPosition = false;
			popup?.classList.remove("positioned");
			if (this.usesPopoverTopLayer()) popup?.hidePopover?.();
			if (this.cleanup) {
				this.cleanup();
				this.cleanup = void 0;
				popup?.style.removeProperty("--pk-transform-origin");
				requestAnimationFrame(() => resolve());
			} else resolve();
			this.removeAttribute("data-current-placement");
		});
	}
	/** @deprecated Prefer `stop()` — kept for select/combobox handoff call sites. */
	releasePositioning() {
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = void 0;
		}
	}
	/** @deprecated Prefer `stop()`. */
	async awaitHidden() {
		await this.stop();
	}
	start() {
		if (!this.anchorElement || !this.active || !this.isConnected || !this.popupElement) return;
		this.popupElement.classList.remove("positioned");
		this.settlingInitialPosition = true;
		if (this.usesPopoverTopLayer()) this.popupElement.showPopover?.();
		if (this.anchorTracking) this.cleanup = autoUpdate(this.anchorElement, this.popupElement, () => {
			if (this.settlingInitialPosition) return;
			this.reposition();
		});
		this.settleInitialPosition();
	}
	/** Slotted popup content root (e.g. `.panel`) —  keeps content in-tree. */
	getContentElement() {
		const slotted = ((this.shadowRoot?.querySelector("slot:not([name])"))?.assignedElements({ flatten: true }) ?? []).find((node) => node instanceof HTMLElement);
		if (slotted) return slotted;
		for (const node of this.childNodes) if (node instanceof HTMLElement && node.getAttribute("slot") !== "anchor") return node;
		return null;
	}
	updateHoverBridge() {
		const floatingElement = this.popupElement;
		if (!this.hoverBridge || !this.anchorElement || !floatingElement) return;
		const anchorRect = this.anchorElement.getBoundingClientRect();
		const popupRect = floatingElement.getBoundingClientRect();
		const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
		let topLeftX = 0;
		let topLeftY = 0;
		let topRightX = 0;
		let topRightY = 0;
		let bottomLeftX = 0;
		let bottomLeftY = 0;
		let bottomRightX = 0;
		let bottomRightY = 0;
		if (isVertical) if (anchorRect.top < popupRect.top) {
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
		else if (anchorRect.left < popupRect.left) {
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
		this.style.setProperty("--pk-hover-bridge-top-left-x", `${topLeftX}px`);
		this.style.setProperty("--pk-hover-bridge-top-left-y", `${topLeftY}px`);
		this.style.setProperty("--pk-hover-bridge-top-right-x", `${topRightX}px`);
		this.style.setProperty("--pk-hover-bridge-top-right-y", `${topRightY}px`);
		this.style.setProperty("--pk-hover-bridge-bottom-left-x", `${bottomLeftX}px`);
		this.style.setProperty("--pk-hover-bridge-bottom-left-y", `${bottomLeftY}px`);
		this.style.setProperty("--pk-hover-bridge-bottom-right-x", `${bottomRightX}px`);
		this.style.setProperty("--pk-hover-bridge-bottom-right-y", `${bottomRightY}px`);
	}
	render() {
		const useFixedFallback = !SUPPORTS_POPOVER || this.positionMethod === "fixed";
		const usePopoverTopLayer = this.usesPopoverTopLayer();
		return b`
            <slot name="anchor" @slotchange=${() => {
			this.handleAnchorChange();
		}}></slot>
            ${this.hoverBridge ? b`
                <div
                    part="hover-bridge"
                    class=${e$1({
			"hover-bridge": true,
			"hover-bridge-visible": this.active
		})}
                    aria-hidden="true"
                ></div>
            ` : A}
            <div
                popover=${usePopoverTopLayer ? "manual" : A}
                part="popup"
                class=${e$1({
			popup: true,
			active: this.active,
			"popup-fixed": useFixedFallback
		})}
            >
                ${this.arrow ? b`<div part="arrow" class="arrow"></div>` : A}
                <slot></slot>
            </div>
        `;
	}
};
__decorate([n()], PkPopup.prototype, "anchor", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkPopup.prototype, "active", void 0);
__decorate([n({ attribute: "position-method" })], PkPopup.prototype, "positionMethod", void 0);
__decorate([n({ reflect: true })], PkPopup.prototype, "boundary", void 0);
__decorate([n({ reflect: true })], PkPopup.prototype, "placement", void 0);
__decorate([n({ type: Number })], PkPopup.prototype, "distance", void 0);
__decorate([n({ type: Number })], PkPopup.prototype, "skidding", void 0);
__decorate([n({ type: Boolean })], PkPopup.prototype, "flip", void 0);
__decorate([n({ attribute: "flip-fallback-placements" })], PkPopup.prototype, "flipFallbackPlacements", void 0);
__decorate([n({ attribute: "flip-fallback-strategy" })], PkPopup.prototype, "flipFallbackStrategy", void 0);
__decorate([n({
	attribute: "flip-padding",
	type: Number
})], PkPopup.prototype, "flipPadding", void 0);
__decorate([n({ type: Boolean })], PkPopup.prototype, "shift", void 0);
__decorate([n({
	attribute: "shift-padding",
	type: Number
})], PkPopup.prototype, "shiftPadding", void 0);
__decorate([n({ type: Boolean })], PkPopup.prototype, "arrow", void 0);
__decorate([n({ attribute: "arrow-placement" })], PkPopup.prototype, "arrowPlacement", void 0);
__decorate([n({
	attribute: "arrow-padding",
	type: Number
})], PkPopup.prototype, "arrowPadding", void 0);
__decorate([n()], PkPopup.prototype, "sync", void 0);
__decorate([n({
	attribute: "anchor-tracking",
	type: Boolean
})], PkPopup.prototype, "anchorTracking", void 0);
__decorate([n({
	attribute: "hover-bridge",
	type: Boolean
})], PkPopup.prototype, "hoverBridge", void 0);
__decorate([e$2(".popup")], PkPopup.prototype, "popupElement", void 0);
__decorate([e$2(".arrow")], PkPopup.prototype, "arrowElement", void 0);
PkPopup = __decorate([t("pk-popup")], PkPopup);
//#endregion
export { resolveElementById as n, PkPopup as t };
