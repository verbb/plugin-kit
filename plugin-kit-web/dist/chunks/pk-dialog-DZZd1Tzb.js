import { t as icons_exports } from "./icons-BR8JcQj2.js";
import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { n as renderIconHtml } from "./render-Dvc3MHQR.js";
import { i as unregisterDismissible, n as isTopDismissible, r as registerDismissible } from "./dismissible-stack-XQUMfKO3.js";
import { a as unlockBodyScrolling, r as lockBodyScrolling } from "./scroll-lock-B4o9vdzJ.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-D0pkTQyI.js";
import { t as animateWithClass } from "./animate-with-class-CsDwYnXL.js";
import { css, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, query, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
//#region src/utils/craft-host-modal.ts
/**
* Craft CP Garnish modals (element selector, asset picker, …) live in normal
* document stacking — not the browser top layer. Native `<dialog>.showModal()`
* always paints above them, so open kit dialogs must briefly yield.
*/
var HOST_MODAL_SELECTOR = ".modal-shade, .modal";
var isVisiblyShown = (element) => {
	const style = getComputedStyle(element);
	return style.display !== "none" && style.visibility !== "hidden" && Number.parseFloat(style.opacity || "1") > 0;
};
/** True when a Craft/Garnish modal or shade is present and visible. */
function isCraftHostModalOpen(root = document) {
	const nodes = root.querySelectorAll(HOST_MODAL_SELECTOR);
	for (const node of nodes) {
		if (!(node instanceof HTMLElement)) continue;
		if (node.closest("pk-dialog")) continue;
		if (isVisiblyShown(node)) return true;
	}
	return false;
}
/**
* Watch the document for Craft modal mount/unmount and invoke `onChange`
* whenever presence flips. Used by `pk-dialog` to leave/re-enter the top layer.
*/
function observeCraftHostModal(onChange, options = {}) {
	const doc = options.getDocument?.() ?? document;
	const root = options.root ?? doc.body;
	let lastOpen = isCraftHostModalOpen(doc);
	const emit = () => {
		const next = isCraftHostModalOpen(doc);
		if (next === lastOpen) return;
		lastOpen = next;
		onChange(next);
	};
	const observer = new MutationObserver(() => {
		emit();
	});
	observer.observe(root, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: [
			"class",
			"style",
			"hidden"
		]
	});
	const intervalId = window.setInterval(emit, 250);
	return { disconnect: () => {
		observer.disconnect();
		window.clearInterval(intervalId);
	} };
}
//#endregion
//#region src/components/dialog/pk-dialog.styles.ts
var pkDialogStyles = css`
    @layer pk-component {
        :host {
            /* Not display:contents — that flattens the trigger slot into flex parents
               (e.g. playground cards) and stretches pk-button full width, same class of
               bug as the dropdown host. Dialog host is display none/block, not contents. */
            display: inline-block;
            width: fit-content;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            vertical-align: middle;
        }

        /*
         * Controlled dialogs (no slot="trigger") — panel is top-layer / fixed while
         * yielding. An inline-block host still sizes to the open <dialog> box in some
         * engines and expands parents (Formie nested field cards grow a blank gap).
         */
        :host(:not([data-has-trigger])) {
            position: absolute;
            width: 0;
            height: 0;
            max-width: none;
            margin: 0;
            padding: 0;
            overflow: visible;
            vertical-align: unset;
        }

        .dialog {
            display: flex;
            flex-direction: column;
            width: min(100%, var(--pk-dialog-width, var(--pk-dialog-max-width, 32rem)));
            min-width: var(--pk-dialog-min-width, 0);
            /* Keep UA :modal inset (0) — that + margin:auto centers the panel. Do not
             * unset inset; it breaks centering (field edit landed top-left). */
            height: var(--pk-dialog-height, fit-content);
            min-height: var(--pk-dialog-min-height, 0);
            max-height: var(--pk-dialog-max-height, calc(100vh - 2rem));
            margin: auto;
            padding: 0;
            /* v1 DialogContent: no CSS border — edge is the 1px ring inside --pk-shadow-modal. */
            border: 0;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-modal);
            color: var(--pk-color-gray-900);
            overflow: hidden;
            opacity: 1;
            transform: scale(1);
        }

        .dialog:focus,
        .dialog:focus-visible {
            outline: none;
        }

        .dialog:not([open]) {
            display: none;
        }

        .dialog--wide {
            --pk-dialog-max-width: 42rem;
        }

        /* motion only via animateWithClass — never auto-animate on [open] alone. */
        .dialog.show {
            animation: pk-dialog-in 0.15s ease;
        }

        .dialog.hide {
            animation: pk-dialog-out 0.15s ease forwards;
        }

        .dialog.pulse {
            animation: pk-dialog-pulse 0.25s ease;
        }

        @keyframes pk-dialog-in {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pk-dialog-out {
            from {
                opacity: 1;
                transform: scale(1);
            }

            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }

        @keyframes pk-dialog-pulse {
            0%, 100% {
                transform: scale(1);
            }

            50% {
                transform: scale(0.98);
            }
        }

        .dialog.show::backdrop {
            animation: pk-dialog-backdrop-in 0.15s ease;
        }

        .dialog.hide::backdrop {
            animation: pk-dialog-backdrop-in 0.15s ease reverse;
        }

        .dialog::backdrop {
            background: hsl(from var(--pk-color-gray-900) h s l / 0.2);
            opacity: 1;
        }

        @keyframes pk-dialog-backdrop-in {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .header {
            position: relative;
            display: flex;
            flex-shrink: 0;
            flex-direction: column;
            gap: 0.2rem;
            padding: 1rem;
            border-bottom: 1px solid var(--pk-color-gray-150);
            border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
            background: #f3f7fb;
            text-align: left;
        }

        .title {
            margin: 0;
            padding-inline-end: 2rem;
            font-size: 0.9375rem;
            font-weight: 600;
            line-height: 1.2;
            color: var(--pk-color-gray-900);
        }

        .description {
            margin: 0;
            padding-inline-end: 2rem;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1.4;
            color: var(--pk-color-gray-500);
        }

        .close {
            --pk-dialog-close-focus-padding: 0.25rem;
            position: absolute;
            top: calc(1rem - var(--pk-dialog-close-focus-padding));
            right: calc(1rem - var(--pk-dialog-close-focus-padding));
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: calc(1.125rem + 2 * var(--pk-dialog-close-focus-padding));
            height: calc(1.125rem + 2 * var(--pk-dialog-close-focus-padding));
            margin: 0;
            padding: var(--pk-dialog-close-focus-padding);
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            line-height: 0;
            opacity: 0.7;
            transition: opacity 0.12s ease;
            box-sizing: border-box;
        }

        .close-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
        }

        .close-icon svg {
            display: block;
            width: 1.125rem;
            height: 1.125rem;
        }

        .close:hover {
            opacity: 1;
            background: transparent;
        }

        .close:focus-visible {
            opacity: 1;
            box-shadow: 0 0 0 2px var(--pk-color-gray-600);
        }

        .body {
            flex: 1 1 auto;
            min-height: 0;
            overflow: auto;
            padding: 0;
            /* v1 DialogContent inherited CP text defaults (14px / gray-700) — do not
             * downshift body copy to sm/gray-600 or slotted content reads smaller than v1. */
            font-size: var(--pk-font-size-base);
            line-height: 1.5;
            color: var(--pk-color-gray-700);
        }

        .body--padded {
            padding: 1rem;
        }

        .footer {
            display: flex;
            flex-shrink: 0;
            flex-direction: row;
            justify-content: flex-end;
            gap: 0.5rem;
            padding: 0.625rem 1rem;
            border-top: 1px solid var(--pk-color-gray-150);
            border-radius: 0 0 var(--pk-radius-lg) var(--pk-radius-lg);
            background: #e4edf6;
        }
    }
`;
//#endregion
//#region src/components/dialog/pk-dialog.ts
var CLOSE_ICON = renderIconHtml(icons_exports.xmark);
var PkDialog = class PkDialog extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.open = false;
		this.label = "";
		this.description = "";
		this.disablePointerDismissal = false;
		this.withoutHeader = false;
		this.withoutBodyPadding = false;
		this.size = "default";
		this.triggerElement = null;
		this.previouslyFocused = null;
		this.yieldingToHostModal = false;
		this.hostModalObserver = null;
		this.yieldBox = null;
		this.handleDocumentKeyDown = (event) => {
			if (this.yieldingToHostModal) return;
			if (event.key === "Escape" && this.open && isTopDismissible(this)) {
				event.preventDefault();
				event.stopPropagation();
				this.requestClose("escape");
			}
		};
		this.onHostModalPresenceChange = (hostModalOpen) => {
			if (hostModalOpen) this.yieldToHostModal();
			else this.restoreFromHostModal();
		};
		this.showing = false;
		this.handleDialogCancel = (event) => {
			event.preventDefault();
			if (!this.dialogElement.classList.contains("hide") && isTopDismissible(this)) this.requestClose("escape");
		};
		this.handleDialogClick = (event) => {
			if (event.composedPath().some((node) => node instanceof Element && node.matches("[data-dialog=\"close\"], [data-dialog-close]"))) {
				event.stopPropagation();
				this.requestClose("close-button");
			}
		};
		this.handleDialogPointerDown = async (event) => {
			if (event.target !== this.dialogElement) return;
			if (!this.disablePointerDismissal) {
				this.requestClose("pointer-dismiss");
				return;
			}
			await animateWithClass(this.dialogElement, "pulse");
		};
		this.onTriggerClick = (event) => {
			event.preventDefault();
			this.open = true;
		};
		this.onFooterSlotChange = () => {
			this.requestUpdate();
		};
	}
	static {
		this.styles = pkDialogStyles;
	}
	/** Light-DOM `slot="header"` only — ignore built-in header fallback inside the shadow slot. */
	hasCustomHeaderSlot() {
		return this.querySelector(":scope > [slot=\"header\"]") !== null;
	}
	/** Pin modeless dialog to the viewport box it had under `showModal`. */
	applyYieldPosition(box) {
		const el = this.dialogElement;
		el.style.position = "fixed";
		el.style.top = `${box.top}px`;
		el.style.left = `${box.left}px`;
		el.style.width = `${box.width}px`;
		el.style.height = `${box.height}px`;
		el.style.margin = "0";
		el.style.maxHeight = "none";
		el.style.zIndex = "99";
		el.toggleAttribute("data-yielding", true);
	}
	clearYieldPosition() {
		const el = this.dialogElement;
		if (!el) return;
		el.style.position = "";
		el.style.top = "";
		el.style.left = "";
		el.style.width = "";
		el.style.height = "";
		el.style.margin = "";
		el.style.maxHeight = "";
		el.style.zIndex = "";
		el.removeAttribute("data-yielding");
		this.yieldBox = null;
	}
	/** Demote `showModal` → `show` so Craft Garnish can paint above (not inert/under). */
	yieldToHostModal() {
		if (this.yieldingToHostModal || !this.open || !this.dialogElement?.open) return;
		const rect = this.dialogElement.getBoundingClientRect();
		this.yieldBox = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height
		};
		this.yieldingToHostModal = true;
		try {
			this.dialogElement.close();
			this.dialogElement.show();
			this.applyYieldPosition(this.yieldBox);
		} catch {
			this.yieldingToHostModal = false;
			this.clearYieldPosition();
		}
	}
	/** Restore top-layer modal after Craft Garnish closes. */
	restoreFromHostModal() {
		if (!this.yieldingToHostModal) return;
		this.yieldingToHostModal = false;
		this.clearYieldPosition();
		if (!this.open || !this.dialogElement) return;
		try {
			if (this.dialogElement.open) this.dialogElement.close();
			this.dialogElement.showModal();
		} catch {}
	}
	firstUpdated() {
		if (this.open) this.show();
	}
	disconnectedCallback() {
		unlockBodyScrolling(this);
		this.removeOpenListeners();
		super.disconnectedCallback();
	}
	updated(changed) {
		super.updated(changed);
		if (!changed.has("open") || !this.hasUpdated) return;
		this.handleOpenChange();
	}
	/** `handleOpenChange` — declarative `open` drives show/close. */
	handleOpenChange() {
		if (this.open && !this.dialogElement.open) this.show();
		else if (!this.open && this.dialogElement.open) {
			this.open = true;
			this.requestClose("api");
		}
	}
	/** Shows the dialog —  `show()`. */
	async show(_source = "api") {
		if (this.showing || this.dialogElement?.open) return;
		this.showing = true;
		try {
			const showEvent = new PkShowEvent();
			if (!this.dispatchEvent(showEvent)) {
				this.open = false;
				return;
			}
			this.addOpenListeners();
			this.previouslyFocused = document.activeElement;
			this.open = true;
			this.dialogElement.showModal();
			lockBodyScrolling(this);
			requestAnimationFrame(() => {
				const elementToFocus = this.querySelector("[autofocus]");
				if (elementToFocus) {
					(elementToFocus.shadowRoot?.querySelector("input, textarea, select, button") ?? elementToFocus).focus({ preventScroll: true });
					return;
				}
				this.dialogElement.focus({ preventScroll: true });
			});
			await animateWithClass(this.dialogElement, "show");
			this.dispatchEvent(new CustomEvent("pk-open-change", {
				detail: { open: true },
				bubbles: true,
				composed: true
			}));
			this.dispatchEvent(new PkAfterShowEvent());
		} finally {
			this.showing = false;
		}
	}
	async hide(source = "unknown") {
		await this.requestClose(source);
	}
	closeDialog() {
		this.requestClose("close-button");
	}
	/** `requestClose()`. */
	async requestClose(source = "unknown") {
		const hideEvent = new PkHideEvent(typeof source === "string" ? source : "close-button");
		if (!this.dispatchEvent(hideEvent)) {
			this.open = true;
			await animateWithClass(this.dialogElement, "pulse");
			return;
		}
		this.removeOpenListeners();
		await animateWithClass(this.dialogElement, "hide");
		this.open = false;
		this.dialogElement.close();
		unlockBodyScrolling(this);
		const restoreFocus = this.previouslyFocused;
		this.previouslyFocused = null;
		if (restoreFocus?.isConnected) window.setTimeout(() => {
			restoreFocus.focus({ preventScroll: true });
		}, 0);
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
	}
	/** Recovery hook — clears hung modal state from overlay races. */
	forceOverlayReset() {
		this.open = false;
		this.yieldingToHostModal = false;
		this.clearYieldPosition();
		this.removeOpenListeners();
		if (this.dialogElement?.open) try {
			this.dialogElement.close();
		} catch {}
		this.dialogElement?.classList.remove("hide", "show", "pulse");
		unlockBodyScrolling(this);
	}
	addOpenListeners() {
		document.addEventListener("keydown", this.handleDocumentKeyDown);
		registerDismissible(this);
		this.hostModalObserver?.disconnect();
		this.hostModalObserver = observeCraftHostModal(this.onHostModalPresenceChange);
		this.onHostModalPresenceChange(isCraftHostModalOpen());
	}
	removeOpenListeners() {
		document.removeEventListener("keydown", this.handleDocumentKeyDown);
		unregisterDismissible(this);
		this.hostModalObserver?.disconnect();
		this.hostModalObserver = null;
		this.yieldingToHostModal = false;
		this.clearYieldPosition();
	}
	syncHasTriggerAttribute() {
		this.toggleAttribute("data-has-trigger", Boolean(this.triggerElement));
	}
	onTriggerSlotChange(event) {
		const [trigger] = event.target.assignedElements({ flatten: true });
		if (this.triggerElement) this.triggerElement.removeEventListener("click", this.onTriggerClick);
		this.triggerElement = trigger ?? null;
		this.syncHasTriggerAttribute();
		if (this.triggerElement) this.triggerElement.addEventListener("click", this.onTriggerClick);
	}
	render() {
		const showBuiltInHeader = !this.hasCustomHeaderSlot() && !this.withoutHeader && Boolean(this.label);
		const padBody = showBuiltInHeader && !this.withoutBodyPadding;
		const hasFooter = this.querySelector(":scope > [slot=\"footer\"]") !== null;
		return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <dialog
                part="panel"
                class=${classMap({
			dialog: true,
			open: this.open,
			"dialog--wide": this.size === "wide"
		})}
                tabindex="-1"
                @cancel=${this.handleDialogCancel}
                @click=${this.handleDialogClick}
                @pointerdown=${this.handleDialogPointerDown}
            >
                <slot name="header">
                    ${showBuiltInHeader ? html`
                            <header part="header" class="header">
                                <h2 part="title" class="title">
                                    <slot name="label">${this.label}</slot>
                                </h2>
                                ${this.description ? html`
                                        <p part="description" class="description">
                                            <slot name="description">${this.description}</slot>
                                        </p>
                                    ` : html`<slot name="description" hidden></slot>`}
                                <button type="button" class="close" data-dialog="close" aria-label="Close">
                                    <span class="close-icon" aria-hidden="true">${unsafeSVG(CLOSE_ICON)}</span>
                                </button>
                            </header>
                        ` : nothing}
                </slot>
                <div
                    part="body"
                    class=${classMap({
			body: true,
			"body--padded": padBody
		})}
                >
                    <slot></slot>
                </div>
                ${hasFooter ? html`
                        <footer part="footer" class="footer">
                            <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
                        </footer>
                    ` : html`<slot name="footer" @slotchange=${this.onFooterSlotChange} hidden></slot>`}
            </dialog>
        `;
	}
};
__decorate([property({
	type: Boolean,
	reflect: true
})], PkDialog.prototype, "open", void 0);
__decorate([property()], PkDialog.prototype, "label", void 0);
__decorate([property()], PkDialog.prototype, "description", void 0);
__decorate([property({
	attribute: "disable-pointer-dismissal",
	type: Boolean,
	reflect: true
})], PkDialog.prototype, "disablePointerDismissal", void 0);
__decorate([property({
	attribute: "without-header",
	type: Boolean,
	reflect: true
})], PkDialog.prototype, "withoutHeader", void 0);
__decorate([property({
	attribute: "without-body-padding",
	type: Boolean,
	reflect: true
})], PkDialog.prototype, "withoutBodyPadding", void 0);
__decorate([property({ reflect: true })], PkDialog.prototype, "size", void 0);
__decorate([query("dialog")], PkDialog.prototype, "dialogElement", void 0);
__decorate([state()], PkDialog.prototype, "triggerElement", void 0);
PkDialog = __decorate([customElement("pk-dialog")], PkDialog);
//#endregion
export { PkDialog as t };

//# sourceMappingURL=pk-dialog-DZZd1Tzb.js.map