import { a as o, c as r, f as A, l as n, m as i, p as b, s as e, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "./pk-base-BlxAYXJD.js";
import { g as chevronRight, p as check } from "./icons-B1i-oRoD.js";
import { t as HasSlotController } from "./has-slot-BGJeJdHr.js";
import { n as renderIconHtml } from "./render-DApFfV9S.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "./popup-placement-animation-WlEXnS85.js";
import { t as popupContentAnimationStyles } from "./popup-content-animation.styles-S6CK-zPp.js";
//#region src/components/dropdown-menu/dropdown-menu-size.styles.ts
var dropdownMenuSizeTokens = {
	default: i`
        --pk-dropdown-item-padding-block: 8px;
        --pk-dropdown-item-padding-inline: 12px;
        --pk-dropdown-item-gap: 0.625rem;
        --pk-dropdown-item-font-size: var(--pk-font-size-base);
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 12px;
        --pk-dropdown-label-font-size: 13px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,
	xs: i`
        --pk-dropdown-item-padding-block: 3px;
        --pk-dropdown-item-padding-inline: 8px;
        --pk-dropdown-item-gap: 0.375rem;
        --pk-dropdown-item-font-size: 12px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 10px;
        --pk-dropdown-label-padding-inline: 8px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 11px;
    `,
	sm: i`
        --pk-dropdown-item-padding-block: 4px;
        --pk-dropdown-item-padding-inline: 10px;
        --pk-dropdown-item-gap: 0.4375rem;
        --pk-dropdown-item-font-size: 13px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 10px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 12px;
    `,
	lg: i`
        --pk-dropdown-item-padding-block: 10px;
        --pk-dropdown-item-padding-inline: 14px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 16px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 14px;
        --pk-dropdown-label-padding-inline: 14px;
        --pk-dropdown-label-font-size: 14px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,
	xl: i`
        --pk-dropdown-item-padding-block: 12px;
        --pk-dropdown-item-padding-inline: 16px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 18px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 16px;
        --pk-dropdown-label-padding-inline: 16px;
        --pk-dropdown-label-font-size: 15px;
        --pk-dropdown-details-font-size: var(--pk-font-size-base);
    `
};
/** Size tokens on `pk-dropdown-menu` — cascades to light-DOM menu children. */
var dropdownMenuHostSizeStyles = i`
    @layer pk-component {
        :host {
            ${dropdownMenuSizeTokens.default}
        }

        :host([size='xs']) {
            ${dropdownMenuSizeTokens.xs}
        }

        :host([size='sm']) {
            ${dropdownMenuSizeTokens.sm}
        }

        :host([size='lg']) {
            ${dropdownMenuSizeTokens.lg}
        }

        :host([size='xl']) {
            ${dropdownMenuSizeTokens.xl}
        }
    }
`;
/**
* Size tokens on popup panels.
* Do not include bare `:host` here; importing this in `pk-dropdown-item`
* would reset every item back to the default size.
*/
var dropdownMenuPanelSizeStyles = i`
    @layer pk-component {
        .panel[data-size='default'],
        .submenu-panel[data-size='default'] {
            ${dropdownMenuSizeTokens.default}
        }

        .panel[data-size='xs'],
        .submenu-panel[data-size='xs'] {
            ${dropdownMenuSizeTokens.xs}
        }

        .panel[data-size='sm'],
        .submenu-panel[data-size='sm'] {
            ${dropdownMenuSizeTokens.sm}
        }

        .panel[data-size='lg'],
        .submenu-panel[data-size='lg'] {
            ${dropdownMenuSizeTokens.lg}
        }

        .panel[data-size='xl'],
        .submenu-panel[data-size='xl'] {
            ${dropdownMenuSizeTokens.xl}
        }
    }
`;
i`
    ${dropdownMenuHostSizeStyles}
    ${dropdownMenuPanelSizeStyles}
`;
//#endregion
//#region src/components/dropdown-menu/pk-dropdown-item.styles.ts
var pkDropdownItemStyles = [
	popupContentAnimationStyles,
	dropdownMenuPanelSizeStyles,
	i`
    @layer pk-component {
        :host {
            display: block;
            position: relative;
            /*
             * Slotted label text inherits from this host (light DOM), not from
             * shadow `.item` — pin size-token metrics so Craft CP / Tailwind /
             * bare hosts all get the same item rhythm.
             */
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .item {
            display: flex;
            align-items: center;
            gap: var(--pk-dropdown-item-gap, 0.625rem);
            width: 100%;
            margin: 0;
            padding: var(--pk-dropdown-item-padding-block, 8px) var(--pk-dropdown-item-padding-inline, 12px);
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: var(--pk-dropdown-item-font-size, var(--pk-font-size-base));
            /* Explicit — do not let font:inherit re-leak page line-height. */
            line-height: var(--pk-dropdown-item-line-height, 1.5);
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([data-highlighted]) .item,
        :host([submenu-open]) .item {
            background: var(--pk-color-slate-100);
        }

        .item:focus-visible {
            background: var(--pk-color-slate-100);
        }

        .item[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .label {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .prefix {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            line-height: 0;
        }

        .prefix--empty {
            display: none;
        }

        .prefix ::slotted(*) {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-dropdown-item-icon-size, 12px);
            height: var(--pk-dropdown-item-icon-size, 12px);
            /* Kill pk-icon text-baseline nudge inside the padded flex row. */
            vertical-align: 0;
        }

        .prefix ::slotted(svg),
        .prefix ::slotted(*) svg,
        .prefix ::slotted(.pk-dropdown-item__prefix-icon) {
            display: block;
            width: var(--pk-dropdown-item-icon-size, 12px) !important;
            height: var(--pk-dropdown-item-icon-size, 12px) !important;
            max-width: var(--pk-dropdown-item-icon-size, 12px);
            max-height: var(--pk-dropdown-item-icon-size, 12px);
            flex-shrink: 0;
            pointer-events: none;
        }

        .details {
            margin-left: auto;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-dropdown-details-font-size, var(--pk-font-size-sm));
            letter-spacing: 0.04em;
        }

        .details:empty {
            display: none;
        }

        .check {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            color: var(--pk-color-gray-700);
        }

        .check svg {
            display: block;
            width: 12px;
            height: 12px;
            flex-shrink: 0;
            pointer-events: none;
        }

        .submenu-icon {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: 1rem;
            color: var(--pk-color-gray-700);
        }

        .submenu-icon svg {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
        }

        .check {
            opacity: 0;
        }

        :host([checked]) .check {
            opacity: 1;
        }

        :host([type='checkbox']) .check,
        :host([type='radio']) .check {
            margin-left: auto;
        }

        :host([type='checkbox'][checked]) .check,
        :host([type='radio'][checked]) .check {
            opacity: 1;
        }

        .submenu-icon:empty {
            display: none;
        }

        :host([destructive]) .item {
            color: var(--pk-color-error);
        }

        :host([destructive]) .item:hover:not([disabled]):not([aria-disabled='true']),
        :host([destructive]) .item:focus-visible {
            color: var(--pk-color-error);
        }

        .submenu-panel {
            width: max-content;
            min-width: 8rem;
            overflow: hidden;
            padding: 4px 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            /* Match root menu panel — Craft body text, not gray-900. */
            color: var(--text-color, var(--pk-color-gray-700));
        }

        .submenu-panel ::slotted(pk-dropdown-item),
        .submenu-panel ::slotted(pk-dropdown-separator),
        .submenu-panel ::slotted(pk-dropdown-label) {
            display: block;
        }

        .submenu-panel[hidden] {
            display: none !important;
        }
    }
`
];
//#endregion
//#region src/components/dropdown-menu/pk-dropdown-item.ts
var _PkDropdownItem;
var CHECK_ICON = renderIconHtml(check);
var SUBMENU_ICON = renderIconHtml(chevronRight);
var PkDropdownItem = class PkDropdownItem extends PkElement {
	static {
		_PkDropdownItem = this;
	}
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.type = "normal";
		this.radioGroup = "";
		this.disabled = false;
		this.destructive = false;
		this.checked = false;
		this.submenuOpen = false;
		this.active = false;
		this.submenuAnimated = false;
		this.hasSlotController = new HasSlotController(this, "submenu", "details", "start", "prefix");
		this.handleMouseEnter = () => {
			if (!this.hasSubmenu() || this.disabled) return;
			this.notifyParentOfOpening();
			this.submenuOpen = true;
		};
		this.handleHostClick = (event) => {
			if (this.disabled) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		};
	}
	static {
		this.styles = pkDropdownItemStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.syncRole();
		this.syncSubmenuAria();
		this.addEventListener("click", this.handleHostClick);
		this.addEventListener("mouseenter", this.handleMouseEnter);
	}
	disconnectedCallback() {
		this.removeEventListener("click", this.handleHostClick);
		this.removeEventListener("mouseenter", this.handleMouseEnter);
		this.closeSubmenu();
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("type") || changed.has("checked")) this.syncRole();
		if (changed.has("submenuOpen") || changed.size === 0) this.syncSubmenuAria();
		if (changed.has("submenuOpen")) if (this.submenuOpen) this.ensureSubmenuSurface();
		else this.submenuAnimated = false;
	}
	/** Light-DOM `slot="submenu"` — public for menu keyboard (`hasSubmenu`). */
	hasSubmenu() {
		return this.hasSlotController.test("submenu");
	}
	syncSubmenuAria() {
		const hasSubmenu = this.hasSubmenu();
		if (hasSubmenu) this.setAttribute("aria-haspopup", "menu");
		else this.removeAttribute("aria-haspopup");
		this.setAttribute("aria-expanded", hasSubmenu && this.submenuOpen ? "true" : "false");
	}
	focusControl() {
		this.shadowRoot?.querySelector(".item")?.focus({ preventScroll: true });
	}
	/** Callers `item.focus()` — route into the shadow control button. */
	focus(options) {
		const button = this.shadowRoot?.querySelector(".item");
		if (button) {
			button.focus(options);
			return;
		}
		super.focus(options);
	}
	/** Public for menu leave-detection (`submenuElement`). */
	get submenuElement() {
		return this.submenuPanelElement ?? null;
	}
	closeSubmenu() {
		this.submenuAnimated = false;
		this.submenuOpen = false;
	}
	/**
	* Opens the nested submenu panel (mouse + keyboard).
	* notify parent first so siblings close, then set `submenuOpen`.
	*/
	openSubmenu() {
		if (!this.hasSubmenu() || this.disabled || !this.isConnected) return;
		this.notifyParentOfOpening();
		this.submenuOpen = true;
	}
	/** `notifyParentOfOpening` — sibling close + bubble to the menu. */
	notifyParentOfOpening() {
		this.dispatchEvent(new CustomEvent("pk-submenu-open", {
			bubbles: true,
			composed: true,
			detail: { item: this }
		}));
		const parent = this.parentElement;
		if (!parent) return;
		for (const el of parent.children) if (el !== this && el instanceof _PkDropdownItem && el.getAttribute("slot") === this.getAttribute("slot") && el.submenuOpen) el.submenuOpen = false;
	}
	ensureSubmenuSurface() {
		if (!this.hasSubmenu() || this.disabled) return;
		this.submenuAnimated = true;
		this.updateComplete.then(() => {
			if (!this.submenuOpen || !this.submenuPanelElement) return;
			this.submenuPanelElement.hidden = false;
			syncPopupPlacementAnimation(this.submenuPanelElement, "right-start");
			waitForPopupReposition(this.submenuPopupElement, "right-start").then((placement) => {
				syncPopupPlacementAnimation(this.submenuPanelElement, placement);
			});
		});
	}
	syncRole() {
		if (this.type === "checkbox") {
			this.setAttribute("role", "menuitemcheckbox");
			this.setAttribute("aria-checked", this.checked ? "true" : "false");
			return;
		}
		if (this.type === "radio") {
			this.setAttribute("role", "menuitemradio");
			this.setAttribute("aria-checked", this.checked ? "true" : "false");
			return;
		}
		this.setAttribute("role", "menuitem");
		this.removeAttribute("aria-checked");
	}
	handleClick(event) {
		if (this.disabled) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		if (this.hasSubmenu()) {
			event.preventDefault();
			this.openSubmenu();
		}
	}
	render() {
		const hasSubmenu = this.hasSubmenu();
		const showCheck = this.type === "checkbox" || this.type === "radio";
		const hasLeadingIcon = this.hasSlotController.test("start") || this.hasSlotController.test("prefix");
		return b`
            <button
                part="item"
                type="button"
                class="item"
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? "true" : A}
                @click=${this.handleClick}
            >
                <span
                    part="prefix"
                    class=${hasLeadingIcon ? "prefix" : "prefix prefix--empty"}
                >
                    <slot name="start"></slot>
                    <slot name="prefix"></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="details"><slot name="details"></slot></span>
                ${showCheck ? b`<span class="check" aria-hidden="true">${o(CHECK_ICON)}</span>` : A}
                ${hasSubmenu ? b`<span class="submenu-icon" aria-hidden="true">${o(SUBMENU_ICON)}</span>` : A}
            </button>
            ${hasSubmenu ? b`
                <pk-popup
                    .active=${this.submenuOpen}
                    .anchor=${this}
                    placement="right-start"
                    .distance=${0}
                    .skidding=${-4}
                    flip
                    shift
                    hover-bridge
                    style="--pk-popup-z-index: 1001"
                >
                    <div
                        part="submenu"
                        class="submenu-panel pk-popup-content"
                        role="menu"
                        data-size=${resolveMenuSize(this)}
                        ?hidden=${!this.submenuOpen}
                        data-open=${this.submenuAnimated ? "" : A}
                        aria-orientation="vertical"
                    >
                        <slot name="submenu"></slot>
                    </div>
                </pk-popup>
            ` : A}
        `;
	}
};
__decorate([n()], PkDropdownItem.prototype, "value", void 0);
__decorate([n({ reflect: true })], PkDropdownItem.prototype, "type", void 0);
__decorate([n({ attribute: "radio-group" })], PkDropdownItem.prototype, "radioGroup", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDropdownItem.prototype, "disabled", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDropdownItem.prototype, "destructive", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDropdownItem.prototype, "checked", void 0);
__decorate([n({
	attribute: "submenu-open",
	type: Boolean,
	reflect: true
})], PkDropdownItem.prototype, "submenuOpen", void 0);
__decorate([n({ type: Boolean })], PkDropdownItem.prototype, "active", void 0);
__decorate([r()], PkDropdownItem.prototype, "submenuAnimated", void 0);
__decorate([e(".submenu-panel")], PkDropdownItem.prototype, "submenuPanelElement", void 0);
__decorate([e("pk-popup")], PkDropdownItem.prototype, "submenuPopupElement", void 0);
PkDropdownItem = _PkDropdownItem = __decorate([t("pk-dropdown-item")], PkDropdownItem);
function resolveMenuSize(item) {
	const panelSize = item.parentElement?.getAttribute("data-size");
	if (panelSize === "xs" || panelSize === "sm" || panelSize === "default" || panelSize === "lg" || panelSize === "xl") return panelSize;
	const menuSize = item.closest("pk-dropdown-menu")?.getAttribute("size");
	if (menuSize === "xs" || menuSize === "sm" || menuSize === "lg" || menuSize === "xl") return menuSize;
	return "default";
}
//#endregion
export { dropdownMenuHostSizeStyles as n, dropdownMenuPanelSizeStyles as r, PkDropdownItem as t };
