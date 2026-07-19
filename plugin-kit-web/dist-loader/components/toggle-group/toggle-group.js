import { c as r, l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/toggle-group/pk-toggle-group.styles.ts
var pkToggleGroupStyles = i`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .group {
            display: inline-flex;
            width: fit-content;
            align-items: center;
            border-radius: var(--pk-radius-lg);
            gap: calc(var(--pk-toggle-group-spacing, 0) * 0.25rem);
        }

        :host([size='sm']) .group {
            border-radius: min(var(--pk-radius-md), 10px);
        }

        :host([orientation='vertical']) .group {
            flex-direction: column;
            align-items: stretch;
        }
    }
`;
//#endregion
//#region src/components/toggle-group/pk-toggle-group.ts
var GROUP_JOIN_ATTR = "data-pk-group-join";
var GROUP_ITEM_FIRST = "data-pk-group-item-first";
var GROUP_ITEM_LAST = "data-pk-group-item-last";
var GROUP_ORIENTATION_ATTR = "data-pk-group-orientation";
var TOGGLE_ORIENTATION_ATTR = "data-tg-orientation";
var PkToggleGroup = class PkToggleGroup extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "horizontal";
		this.variant = "default";
		this.size = "default";
		this.spacing = 0;
		this.joined = true;
		this.multiple = false;
		this.value = [];
		this.items = [];
		this.syncItems = () => {
			const slot = this.shadowRoot?.querySelector("slot");
			if (!slot) return;
			this.items = slot.assignedElements({ flatten: true });
			this.applyGroupProps();
			this.syncGroupLayout();
			this.applySelection();
		};
		this.handleClick = (event) => {
			const target = event.target.closest("[data-value]");
			if (!target || !this.items.includes(target) || this.isItemDisabled(target)) return;
			event.preventDefault();
			const itemValue = this.getItemValue(target);
			if (!itemValue) return;
			if (this.multiple) this.value = this.value.includes(itemValue) ? this.value.filter((v) => v !== itemValue) : [...this.value, itemValue];
			else this.value = this.value.includes(itemValue) ? [] : [itemValue];
			this.applySelection();
			this.dispatchEvent(new CustomEvent("pk-value-change", {
				detail: { value: [...this.value] },
				bubbles: true,
				composed: true
			}));
		};
	}
	static {
		this.styles = pkToggleGroupStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.syncJoinedFromSpacing();
		this.addEventListener("click", this.handleClick);
		this.addEventListener("slotchange", this.syncItems);
	}
	disconnectedCallback() {
		this.removeEventListener("click", this.handleClick);
		this.removeEventListener("slotchange", this.syncItems);
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("spacing")) this.syncJoinedFromSpacing();
		if (changed.has("joined") && !changed.has("spacing")) this.spacing = this.joined ? 0 : 2;
		if (changed.has("variant") || changed.has("size") || changed.has("spacing") || changed.has("orientation")) this.syncGroupLayout();
		if (changed.has("value") && this.items.length) this.applySelection();
	}
	clearLayoutAttrs(item) {
		item.removeAttribute(GROUP_JOIN_ATTR);
		item.removeAttribute(GROUP_ITEM_FIRST);
		item.removeAttribute(GROUP_ITEM_LAST);
		item.removeAttribute(GROUP_ORIENTATION_ATTR);
		item.removeAttribute(TOGGLE_ORIENTATION_ATTR);
	}
	syncGroupLayout() {
		for (const item of this.items) this.clearLayoutAttrs(item);
		for (const item of this.items) if (this.orientation !== "horizontal") item.setAttribute(TOGGLE_ORIENTATION_ATTR, this.orientation);
		if (this.spacing !== 0) return;
		for (let index = 0; index < this.items.length; index++) {
			const item = this.items[index];
			item.setAttribute(GROUP_ORIENTATION_ATTR, this.orientation);
			item.setAttribute(GROUP_JOIN_ATTR, "");
			if (index === 0) item.setAttribute(GROUP_ITEM_FIRST, "");
			if (index === this.items.length - 1) item.setAttribute(GROUP_ITEM_LAST, "");
		}
	}
	syncJoinedFromSpacing() {
		this.joined = this.spacing === 0;
	}
	applyGroupProps() {
		for (const item of this.items) {
			if (item.tagName !== "PK-TOGGLE") continue;
			item.setAttribute("variant", this.variant);
			item.setAttribute("size", this.size);
		}
	}
	getItemValue(item) {
		return item.getAttribute("data-value") ?? item.dataset.value ?? null;
	}
	isItemDisabled(item) {
		return item.hasAttribute("disabled") || item.matches(":disabled");
	}
	applySelection() {
		for (const item of this.items) {
			const itemValue = this.getItemValue(item);
			if (!itemValue) continue;
			const selected = this.value.includes(itemValue);
			item.setAttribute("aria-pressed", selected ? "true" : "false");
			if (item.tagName === "PK-TOGGLE") if (selected) item.setAttribute("pressed", "");
			else item.removeAttribute("pressed");
		}
	}
	render() {
		return b`
            <div
                part="base"
                class="group"
                role="group"
                style=${`--pk-toggle-group-spacing: ${this.spacing}`}
                @slotchange=${this.syncItems}
            >
                <slot></slot>
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkToggleGroup.prototype, "orientation", void 0);
__decorate([n({ reflect: true })], PkToggleGroup.prototype, "variant", void 0);
__decorate([n({ reflect: true })], PkToggleGroup.prototype, "size", void 0);
__decorate([n({
	type: Number,
	reflect: true
})], PkToggleGroup.prototype, "spacing", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkToggleGroup.prototype, "joined", void 0);
__decorate([n({ type: Boolean })], PkToggleGroup.prototype, "multiple", void 0);
__decorate([n({
	type: Array,
	attribute: false
})], PkToggleGroup.prototype, "value", void 0);
__decorate([r()], PkToggleGroup.prototype, "items", void 0);
PkToggleGroup = __decorate([t("pk-toggle-group")], PkToggleGroup);
//#endregion
export { PkToggleGroup };
