import { d as registerDismissible, f as unregisterDismissible, r as activeElements, u as isTopDismissible } from "./pk-a11y-Cx5RZvhu.js";
import { l as n, m as i, p as b, s as e, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "./pk-base-BlxAYXJD.js";
import { r as buttonGroupCornerRoleStyles } from "./button-group-item.styles-Dwakbyx5.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-C3tSQ3UR.js";
import { t as animateWithClass } from "./animate-with-class-DT0jwaR_.js";
import { i as waitForPopupReposition } from "./popup-placement-animation-WlEXnS85.js";
import { n as dropdownMenuHostSizeStyles, r as dropdownMenuPanelSizeStyles, t as PkDropdownItem } from "./pk-dropdown-item-Cg2flqPt.js";
import { n as resolveElementById } from "./pk-popup-BNRyCsVX.js";
//#region src/components/dropdown-menu/pk-dropdown-menu.styles.ts
/**
* Dropdown panel motion —  `pk-dropdown` scale+fade, with transform
* origin from `pk-popup`’s `--pk-transform-origin` (Base UI / v1 alignment).
*  */
var pkDropdownMenuStyles = [
	buttonGroupCornerRoleStyles(),
	dropdownMenuHostSizeStyles,
	dropdownMenuPanelSizeStyles,
	i`
        @layer pk-component {
            /* Standalone: keep a real box so the trigger is not a flex-stretched
               child of the page (display:contents flattened pk-button to full card width).
               Button groups override below — same as legacy + React MenuButton inline-flex wrap. */
            :host {
                display: inline-block;
                position: relative;
                width: fit-content;
                max-width: 100%;
                align-self: flex-start;
                vertical-align: middle;
            }

            :host([data-pk-group-orientation]) {
                display: inline-flex;
                vertical-align: middle;
                flex: 0 0 auto;
                width: auto;
                max-width: none;
                align-self: auto;
            }

            /* Belt-and-suspenders if a parent still flattens layout onto the trigger. */
            ::slotted([slot='trigger']) {
                width: fit-content;
                max-width: 100%;
                flex: 0 0 auto;
                align-self: flex-start;
            }

            :host([data-pk-group-orientation]) ::slotted([slot='trigger']) {
                --pk-bg-start-start-radius: inherit;
                --pk-bg-start-end-radius: inherit;
                --pk-bg-end-start-radius: inherit;
                --pk-bg-end-end-radius: inherit;
                align-self: auto;
                max-width: none;
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

            /* Menu panel — hug content; do not stretch to trigger/anchor width. */
            .panel {
                display: flex;
                flex-direction: column;
                width: max-content;
                min-width: 8rem;
                margin: 0;
                overflow: auto;
                padding: 4px 0;
                border: 0;
                border-radius: var(--pk-radius-md);
                background: var(--pk-color-white);
                box-shadow: var(--pk-shadow-popup);
                /* v1 DropdownMenuItem had no face color — inherited Craft body
                 * (--text-color ≈ gray-700). Do not force gray-900 (too dark). */
                color: var(--text-color, var(--pk-color-gray-700));
                outline: none;
                text-align: start;
                user-select: none;
                /* Match v1 Base UI: popup writes --pk-transform-origin from the
                 * anchor center on the connecting edge (e.g. top-right for
                 * bottom-end). Keyword edge centers made end-aligned menus
                 * scale from the middle of the panel. */
                transform-origin: var(--pk-transform-origin, top);
            }

            .panel.show {
                animation: pk-dropdown-menu-show 100ms ease;
            }

            .panel.hide {
                animation: pk-dropdown-menu-show 100ms ease reverse;
            }

            .panel[hidden] {
                display: none !important;
            }

            ::slotted(pk-dropdown-item),
            ::slotted(pk-dropdown-separator),
            ::slotted(pk-dropdown-label),
            .panel > pk-dropdown-item,
            .panel > pk-dropdown-separator,
            .panel > pk-dropdown-label {
                display: block;
            }

            ::slotted([data-menu-item]) {
                display: flex;
                align-items: center;
                gap: 0.625rem;
                width: 100%;
                margin: 0;
                padding: 8px 12px;
                border: 0;
                background: transparent;
                color: inherit;
                font: inherit;
                font-size: var(--pk-font-size-base);
                text-align: left;
                white-space: nowrap;
                cursor: default;
                user-select: none;
                outline: none;
                box-sizing: border-box;
            }

            ::slotted([data-menu-item]:hover:not([disabled])) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item]:focus-visible) {
                background: var(--pk-color-slate-100);
            }

            ::slotted([data-menu-item][disabled]) {
                pointer-events: none;
                opacity: 0.5;
            }

            ::slotted(pk-dropdown-item[destructive]),
            ::slotted([data-destructive]) {
                color: var(--pk-color-error);
            }

            ::slotted([data-menu-separator]) {
                display: block;
                height: 1px;
                margin: 4px 0;
                background: var(--pk-color-slate-200);
                border: 0;
                padding: 0;
            }
        }

        /* Outside @layer so constructed stylesheets resolve the name reliably. */
        @keyframes pk-dropdown-menu-show {
            from {
                scale: 0.9;
                opacity: 0;
            }

            to {
                scale: 1;
                opacity: 1;
            }
        }
    `
];
//#endregion
//#region src/components/dropdown-menu/pk-dropdown-menu.ts
/** Tracks open menus — closing one closes others ( `pk-dropdown`). */
var openDropdowns = /* @__PURE__ */ new Set();
var PkDropdownMenu = class PkDropdownMenu extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.open = false;
		this.size = "default";
		this.placement = "bottom-start";
		this.sideOffset = 4;
		this.distance = 4;
		this.skidding = 0;
		this.for = "";
		this.userTypedQuery = "";
		this.userTypedTimeout = 0;
		this.openSubmenuStack = [];
		this.openedByKeyboard = false;
		this.triggerElement = null;
		this.handleMenuClick = (event) => {
			const item = this.resolveMenuItem(event);
			if (!item || item.disabled) return;
			if (item.hasSubmenu()) {
				if (!item.submenuOpen) {
					this.closeSiblingSubmenus(item);
					this.addToSubmenuStack(item);
					item.openSubmenu();
				}
				event.stopPropagation();
				return;
			}
			this.makeSelection(item);
		};
		this.handleSubmenuOpening = (event) => {
			const openingItem = event.detail?.item;
			if (!(openingItem instanceof PkDropdownItem)) return;
			this.closeSiblingSubmenus(openingItem);
			this.addToSubmenuStack(openingItem);
		};
		this.handleGlobalMouseMove = (event) => {
			const currentSubmenuItem = this.getCurrentSubmenuItem();
			if (!currentSubmenuItem?.submenuOpen || !currentSubmenuItem.submenuElement) return;
			const submenuElement = currentSubmenuItem.submenuElement;
			const composedPath = event.composedPath();
			const submenuItemHovered = currentSubmenuItem.matches(":hover");
			const submenuElementHovered = Boolean(submenuElement.matches(":hover"));
			const isOverItem = submenuItemHovered || composedPath.some((el) => el === currentSubmenuItem);
			const isOverSubmenu = submenuElementHovered || composedPath.some((el) => el instanceof HTMLElement && el.closest("[part=\"submenu\"]") === submenuElement);
			if (!isOverItem && !isOverSubmenu) window.setTimeout(() => {
				if (!submenuItemHovered && !submenuElementHovered) currentSubmenuItem.submenuOpen = false;
			}, 100);
		};
		this.handleTriggerClick = (event) => {
			const trigger = this.getTrigger();
			if (!trigger || !event.composedPath().includes(trigger)) return;
			event.preventDefault();
			event.stopPropagation();
			this.openedByKeyboard = false;
			this.open = !this.open;
		};
		this.handleExternalTriggerClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.openedByKeyboard = false;
			this.open = !this.open;
		};
		this.handleTriggerKeyDown = (event) => {
			const trigger = this.getTrigger();
			if (!trigger || !event.composedPath().includes(trigger)) return;
			if (this.open) return;
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				event.stopPropagation();
				this.openedByKeyboard = true;
				this.open = true;
			}
		};
		this.handleDocumentKeyDown = (event) => {
			const isRtl = this.isRtl();
			if (event.key === "Escape" && this.open && isTopDismissible(this)) {
				event.preventDefault();
				event.stopPropagation();
				this.open = false;
				this.getTrigger()?.focus({ preventScroll: true });
				return;
			}
			if (!this.open) return;
			const activeElement = [...activeElements()].find((el) => el.localName === "pk-dropdown-item");
			const isFocusedOnItem = activeElement?.localName === "pk-dropdown-item";
			const currentSubmenuItem = this.getCurrentSubmenuItem();
			const isInSubmenu = Boolean(currentSubmenuItem);
			let items;
			let activeItem;
			let activeItemIndex;
			if (isInSubmenu && currentSubmenuItem) {
				items = this.getSubmenuItems(currentSubmenuItem);
				activeItem = items.find((item) => item.active || item === activeElement);
				activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
			} else {
				items = this.getItems();
				activeItem = items.find((item) => item.active || item === activeElement);
				activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
			}
			let itemToSelect;
			if (event.key === "ArrowUp") {
				event.preventDefault();
				event.stopPropagation();
				itemToSelect = activeItemIndex > 0 ? items[activeItemIndex - 1] : items[items.length - 1];
			}
			if (event.key === "ArrowDown") {
				event.preventDefault();
				event.stopPropagation();
				itemToSelect = activeItemIndex !== -1 && activeItemIndex < items.length - 1 ? items[activeItemIndex + 1] : items[0];
			}
			if (event.key === (isRtl ? "ArrowLeft" : "ArrowRight") && isFocusedOnItem && activeItem) {
				if (activeItem.hasSubmenu()) {
					event.preventDefault();
					event.stopPropagation();
					this.closeSiblingSubmenus(activeItem);
					activeItem.openSubmenu();
					this.addToSubmenuStack(activeItem);
					window.setTimeout(() => {
						const submenuItems = this.getSubmenuItems(activeItem);
						if (submenuItems.length > 0) this.setActiveItem(submenuItems, submenuItems[0]);
					}, 0);
					return;
				}
			}
			if (event.key === (isRtl ? "ArrowRight" : "ArrowLeft") && isInSubmenu) {
				event.preventDefault();
				event.stopPropagation();
				const removedItem = this.removeFromSubmenuStack();
				if (removedItem) {
					removedItem.submenuOpen = false;
					window.setTimeout(() => {
						removedItem.focus({ preventScroll: true });
						removedItem.active = true;
						(removedItem.slot === "submenu" && removedItem.parentElement instanceof PkDropdownItem ? this.getSubmenuItems(removedItem.parentElement) : this.getItems()).forEach((item) => {
							if (item !== removedItem) item.active = false;
						});
					}, 0);
				}
				return;
			}
			if (event.key === "Home" || event.key === "End") {
				event.preventDefault();
				event.stopPropagation();
				itemToSelect = event.key === "Home" ? items[0] : items[items.length - 1];
			}
			if (event.key === "Tab") {
				this.open = false;
				return;
			}
			if (event.key.length === 1 && !(event.metaKey || event.ctrlKey || event.altKey) && !(event.key === " " && this.userTypedQuery === "")) {
				window.clearTimeout(this.userTypedTimeout);
				this.userTypedTimeout = window.setTimeout(() => {
					this.userTypedQuery = "";
				}, 1e3);
				this.userTypedQuery += event.key;
				const selectionQuery = this.userTypedQuery.trim().toLowerCase();
				itemToSelect = items.find((item) => {
					return (item.textContent || "").trim().toLowerCase().startsWith(selectionQuery);
				});
			}
			if (itemToSelect) {
				event.preventDefault();
				event.stopPropagation();
				this.setActiveItem(items, itemToSelect);
				return;
			}
			if ((event.key === "Enter" || event.key === " " && this.userTypedQuery === "") && isFocusedOnItem && activeItem) {
				event.preventDefault();
				event.stopPropagation();
				if (activeItem.hasSubmenu()) {
					this.closeSiblingSubmenus(activeItem);
					activeItem.openSubmenu();
					this.addToSubmenuStack(activeItem);
					window.setTimeout(() => {
						const submenuItems = this.getSubmenuItems(activeItem);
						if (submenuItems.length > 0) this.setActiveItem(submenuItems, submenuItems[0]);
					}, 0);
				} else this.makeSelection(activeItem);
			}
		};
		this.handleDocumentPointerDown = (event) => {
			const path = event.composedPath();
			const trigger = this.getTrigger();
			if (path.some((el) => el === this || el === trigger)) return;
			this.open = false;
		};
	}
	static {
		this.styles = pkDropdownMenuStyles;
	}
	/** Legacy compat for overlay lab snapshots and dismiss recovery. */
	get panelElement() {
		return this.menuElement ?? null;
	}
	get popup() {
		return this.popupElement ?? null;
	}
	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this.handleTriggerClick, true);
		this.addEventListener("keydown", this.handleTriggerKeyDown);
	}
	firstUpdated() {
		const sync = () => {
			if (this.for) {
				this.resolveExternalTrigger();
				return;
			}
			this.syncSlottedTrigger();
		};
		queueMicrotask(sync);
		requestAnimationFrame(sync);
	}
	disconnectedCallback() {
		window.clearTimeout(this.userTypedTimeout);
		this.removeEventListener("click", this.handleTriggerClick, true);
		this.removeEventListener("keydown", this.handleTriggerKeyDown);
		this.unbindTrigger(this.triggerElement);
		this.triggerElement = null;
		this.closeAllSubmenus();
		if (this.popupElement) this.popupElement.active = false;
		this.menuElement?.classList.remove("show", "hide");
		document.removeEventListener("keydown", this.handleDocumentKeyDown);
		document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.removeEventListener("mousemove", this.handleGlobalMouseMove);
		unregisterDismissible(this);
		openDropdowns.delete(this);
		super.disconnectedCallback();
	}
	async updated(changed) {
		super.updated(changed);
		if (changed.has("for")) this.resolveExternalTrigger();
		if (changed.has("open")) this.syncTriggerExpanded();
		if (!changed.has("open")) return;
		const previousOpen = changed.get("open");
		if (previousOpen === this.open) return;
		if (previousOpen === void 0 && this.open === false) return;
		if (this.open) await this.showMenu();
		else {
			this.closeAllSubmenus();
			await this.hideMenu("unknown");
		}
	}
	getItems(includeDisabled = false) {
		const items = (this.defaultSlot?.assignedElements({ flatten: true }) ?? []).filter((el) => el.localName === "pk-dropdown-item");
		return includeDisabled ? items : items.filter((item) => !item.disabled);
	}
	/** Submenu children of a parent item (light-DOM `slot="submenu"`). */
	getSubmenuItems(parentItem, includeDisabled = false) {
		const items = ((parentItem.shadowRoot?.querySelector("slot[name=\"submenu\"]"))?.assignedElements({ flatten: true }) ?? [...parentItem.children].filter((el) => el.getAttribute("slot") === "submenu")).filter((el) => el.localName === "pk-dropdown-item");
		return includeDisabled ? items : items.filter((item) => !item.disabled);
	}
	getTrigger() {
		if (this.for) return resolveElementById(this, this.for) ?? this.triggerElement;
		return this.querySelector("[slot=\"trigger\"]") ?? this.triggerElement;
	}
	/**
	* Floating UI / light-dismiss anchor — Element (not id string) so resolution
	* happens from this host's root, not pk-popup's shadow root.
	*/
	getAnchor() {
		return this.getTrigger() ?? "";
	}
	resolveExternalTrigger() {
		this.unbindTrigger(this.triggerElement);
		this.triggerElement = this.for ? resolveElementById(this, this.for) : null;
		this.bindTrigger(this.triggerElement);
		this.requestUpdate();
	}
	onTriggerSlotChange(event) {
		if (this.for) return;
		const [trigger] = event.target.assignedElements({ flatten: true });
		this.unbindTrigger(this.triggerElement);
		this.triggerElement = trigger ?? null;
		this.bindTrigger(this.triggerElement);
		this.requestUpdate();
	}
	/** Sync aria + cached trigger from the trigger slot (safe to call repeatedly). */
	syncSlottedTrigger() {
		const slot = this.renderRoot.querySelector("slot[name=\"trigger\"]");
		if (slot) this.onTriggerSlotChange({ target: slot });
	}
	/** Aria (+ listeners for external `for` triggers that sit outside this host). */
	bindTrigger(trigger) {
		if (!trigger) return;
		trigger.setAttribute("aria-haspopup", "menu");
		if (this.for) {
			trigger.addEventListener("click", this.handleExternalTriggerClick);
			trigger.addEventListener("keydown", this.handleTriggerKeyDown);
		}
		this.syncTriggerExpanded();
	}
	unbindTrigger(trigger) {
		trigger?.removeEventListener("click", this.handleExternalTriggerClick);
		trigger?.removeEventListener("keydown", this.handleTriggerKeyDown);
	}
	syncTriggerExpanded() {
		this.getTrigger()?.setAttribute("aria-expanded", this.open ? "true" : "false");
	}
	/** Called by `pk-dropdown-item` after a selection. */
	closeAfterSelect(_source = "api") {
		this.open = false;
	}
	/** `makeSelection()` — single `pk-select` on the menu host. */
	makeSelection(item) {
		const trigger = this.getTrigger();
		if (item.disabled) return;
		if (item.type === "checkbox") item.checked = !item.checked;
		if (item.type === "radio" && !item.checked) item.checked = true;
		const detail = {
			value: item.value,
			type: item.type,
			checked: item.checked,
			radioGroup: item.radioGroup
		};
		item.dispatchEvent(new CustomEvent("pk-select", {
			detail,
			bubbles: false,
			composed: false,
			cancelable: true
		}));
		const selectEvent = new CustomEvent("pk-select", {
			detail,
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(selectEvent);
		if (!selectEvent.defaultPrevented) {
			this.open = false;
			trigger?.focus({ preventScroll: true });
		}
	}
	resolveMenuItem(event) {
		const target = event.target;
		if (target instanceof PkDropdownItem) return target;
		if (target instanceof Element) {
			const closest = target.closest("pk-dropdown-item");
			if (closest instanceof PkDropdownItem) return closest;
		}
		return event.composedPath().find((node) => node instanceof PkDropdownItem) ?? null;
	}
	/** Resolves after exit animation and popup demotion — safe point to open a modal. */
	whenClosed() {
		if (!this.open) return this.popupElement?.active ? this.popupElement.stop() : Promise.resolve();
		return new Promise((resolve) => {
			this.addEventListener("pk-after-hide", () => {
				this.popupElement.stop().then(() => resolve());
			}, { once: true });
		});
	}
	/** Recovery hook — clears leaked document dismiss listeners after abnormal teardown. */
	forceDismissCleanup() {
		this.open = false;
		this.popupElement.active = false;
		this.menuElement?.classList.remove("show", "hide");
		this.closeAllSubmenus();
		document.removeEventListener("keydown", this.handleDocumentKeyDown);
		document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.removeEventListener("mousemove", this.handleGlobalMouseMove);
		unregisterDismissible(this);
		openDropdowns.delete(this);
	}
	isRtl() {
		return getComputedStyle(this).direction === "rtl";
	}
	addToSubmenuStack(item) {
		const index = this.openSubmenuStack.indexOf(item);
		if (index !== -1) this.openSubmenuStack = this.openSubmenuStack.slice(0, index + 1);
		else this.openSubmenuStack.push(item);
	}
	removeFromSubmenuStack() {
		return this.openSubmenuStack.pop();
	}
	getCurrentSubmenuItem() {
		return this.openSubmenuStack.length > 0 ? this.openSubmenuStack[this.openSubmenuStack.length - 1] : void 0;
	}
	closeAllSubmenus() {
		this.getItems(true).forEach((item) => {
			item.submenuOpen = false;
			item.active = false;
		});
		this.openSubmenuStack = [];
	}
	closeSiblingSubmenus(item) {
		const parentItem = item.closest("pk-dropdown-item:not([slot=\"submenu\"])");
		(parentItem instanceof PkDropdownItem ? this.getSubmenuItems(parentItem, true) : this.getItems(true)).forEach((sibling) => {
			if (sibling !== item && sibling.submenuOpen) sibling.submenuOpen = false;
		});
		if (!this.openSubmenuStack.includes(item)) this.openSubmenuStack.push(item);
	}
	setActiveItem(items, itemToSelect) {
		items.forEach((item) => {
			item.active = item === itemToSelect;
			if (item === itemToSelect) item.setAttribute("data-highlighted", "");
			else item.removeAttribute("data-highlighted");
		});
		itemToSelect.focus({ preventScroll: true });
		itemToSelect.scrollIntoView({ block: "nearest" });
	}
	/** `showMenu()` — only called from `updated()` when `open` becomes true. */
	async showMenu() {
		if (!this.popupElement || !this.menuElement) return;
		if (this.for && !this.triggerElement?.isConnected) this.resolveExternalTrigger();
		const showEvent = new PkShowEvent();
		if (!this.dispatchEvent(showEvent)) {
			this.open = false;
			return;
		}
		if (this.popupElement.active) {
			this.popupElement.active = false;
			this.menuElement.classList.remove("show", "hide");
			await this.updateComplete;
		}
		openDropdowns.forEach((dropdown) => {
			if (dropdown !== this) dropdown.open = false;
		});
		this.popupElement.active = true;
		this.open = true;
		openDropdowns.add(this);
		registerDismissible(this);
		document.addEventListener("keydown", this.handleDocumentKeyDown);
		document.addEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.addEventListener("mousemove", this.handleGlobalMouseMove);
		await this.updateComplete;
		await waitForPopupReposition(this.popupElement, this.placement, 100, { requireEvent: true });
		if (!this.open) {
			this.popupElement.active = false;
			openDropdowns.delete(this);
			unregisterDismissible(this);
			document.removeEventListener("keydown", this.handleDocumentKeyDown);
			document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
			document.removeEventListener("mousemove", this.handleGlobalMouseMove);
			return;
		}
		this.menuElement.classList.remove("hide");
		await animateWithClass(this.menuElement, "show");
		const items = this.getItems();
		if (items.length > 0) if (this.openedByKeyboard) this.setActiveItem(items, items[0]);
		else {
			items.forEach((item) => {
				item.active = false;
				item.removeAttribute("data-highlighted");
			});
			this.menuElement.focus({ preventScroll: true });
		}
		this.openedByKeyboard = false;
		this.dispatchEvent(new PkAfterShowEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: true },
			bubbles: true,
			composed: true
		}));
	}
	/**
	* `hideMenu()` — only called from `updated()` when `open` becomes false.
	* Demote popup via `active = false` after the hide animation (hide order).
	*/
	async hideMenu(source) {
		if (!this.popupElement || !this.menuElement) return;
		const hideEvent = new PkHideEvent(source);
		if (!this.dispatchEvent(hideEvent)) {
			this.open = true;
			return;
		}
		this.open = false;
		openDropdowns.delete(this);
		unregisterDismissible(this);
		document.removeEventListener("keydown", this.handleDocumentKeyDown);
		document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.removeEventListener("mousemove", this.handleGlobalMouseMove);
		this.userTypedQuery = "";
		window.clearTimeout(this.userTypedTimeout);
		this.getItems(true).forEach((item) => {
			item.active = false;
			item.removeAttribute("data-highlighted");
		});
		this.menuElement.classList.remove("show");
		await animateWithClass(this.menuElement, "hide");
		this.popupElement.active = false;
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		const popupActive = this.hasUpdated ? this.popupElement?.active : this.open;
		return b`
            <pk-popup
                .anchor=${this.for ? this.getAnchor() : ""}
                placement=${this.placement}
                .distance=${this.distance || this.sideOffset}
                .skidding=${this.skidding}
                ?active=${popupActive}
                flip
                shift
                .shiftPadding=${10}
                auto-size="vertical"
                .autoSizePadding=${10}
            >
                <slot
                    name="trigger"
                    slot="anchor"
                    @slotchange=${this.onTriggerSlotChange}
                ></slot>

                <div
                    id="menu"
                    part="panel"
                    class="panel"
                    role="menu"
                    tabindex="-1"
                    aria-orientation="vertical"
                    data-size=${this.size}
                    @click=${this.handleMenuClick}
                    @pk-submenu-open=${this.handleSubmenuOpening}
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
})], PkDropdownMenu.prototype, "open", void 0);
__decorate([n({ reflect: true })], PkDropdownMenu.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkDropdownMenu.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkDropdownMenu.prototype, "sideOffset", void 0);
__decorate([n({ type: Number })], PkDropdownMenu.prototype, "distance", void 0);
__decorate([n({ type: Number })], PkDropdownMenu.prototype, "skidding", void 0);
__decorate([n({ reflect: true })], PkDropdownMenu.prototype, "for", void 0);
__decorate([e("slot:not([name])")], PkDropdownMenu.prototype, "defaultSlot", void 0);
__decorate([e("#menu")], PkDropdownMenu.prototype, "menuElement", void 0);
__decorate([e("pk-popup")], PkDropdownMenu.prototype, "popupElement", void 0);
PkDropdownMenu = __decorate([t("pk-dropdown-menu")], PkDropdownMenu);
//#endregion
export { PkDropdownMenu as t };
