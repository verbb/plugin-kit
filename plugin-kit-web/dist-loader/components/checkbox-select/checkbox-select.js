import { c as r, i as e, l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/checkbox-select/pk-checkbox-select.styles.ts
var pkCheckboxSelectStyles = i`
    @layer pk-component {
        :host {
            display: block;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: var(--pk-checkbox-select-gap, 0);
        }

        .options--horizontal {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--pk-checkbox-select-gap, 0);
        }

        ::slotted(pk-checkbox),
        pk-checkbox {
            display: block;
        }

        .options--horizontal pk-checkbox.all-option {
            width: 100%;
        }
    }
`;
//#endregion
//#region src/components/checkbox-select/pk-checkbox-select.ts
var ALL_VALUE = "*";
/** JSON array for Craft/Twig + docs HTML; property assignment still preferred in JS. */
var optionsConverter = {
	fromAttribute(value) {
		if (!value) return [];
		try {
			const parsed = JSON.parse(value);
			return Array.isArray(parsed) ? parsed.filter((item) => Boolean(item && typeof item === "object" && "value" in item)).map((item) => ({
				label: String(item.label ?? item.value),
				value: String(item.value)
			})) : [];
		} catch {
			return [];
		}
	},
	toAttribute(value) {
		return JSON.stringify(value ?? []);
	}
};
/** `*` for all-selected, otherwise a JSON string array. */
var valueConverter = {
	fromAttribute(value) {
		if (value == null || value === "") return [];
		if (value === "*") return "*";
		try {
			const parsed = JSON.parse(value);
			if (parsed === "*") return "*";
			return Array.isArray(parsed) ? parsed.map(String) : [];
		} catch {
			return [];
		}
	},
	toAttribute(value) {
		return value === "*" ? "*" : JSON.stringify(value ?? []);
	}
};
var PkCheckboxSelect = class PkCheckboxSelect extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.options = [];
		this.value = [];
		this.showAllOption = false;
		this.allLabel = "All";
		this.disabled = false;
		this.orientation = "vertical";
		this.ariaLabel = null;
		this.optionElements = [];
		this.allOptionElement = null;
		this.handleAllChange = (event) => {
			event.stopPropagation();
			this.value = event.detail.checked ? "*" : [];
			this.dispatchValueChange();
		};
		this.handleItemChange = (optionValue, event) => {
			event.stopPropagation();
			if (this.isAllSelected) return;
			const checked = event.detail.checked;
			const current = this.selectedValues;
			this.value = checked ? [...current, optionValue] : current.filter((value) => value !== optionValue);
			this.dispatchValueChange();
		};
	}
	static {
		this.styles = pkCheckboxSelectStyles;
	}
	connectedCallback() {
		if (!this.hasAttribute("role")) this.setAttribute("role", "group");
		super.connectedCallback();
	}
	updated(changed) {
		if (changed.has("options") || changed.has("showAllOption")) {
			this.rebuildOptionElements();
			return;
		}
		if (changed.has("value") || changed.has("disabled")) this.updateOptionStates();
	}
	firstUpdated() {
		this.rebuildOptionElements();
	}
	focus(options) {
		this.optionElements.find((element) => !element.disabled)?.focus(options);
	}
	get isAllSelected() {
		return this.value === "*";
	}
	get selectedValues() {
		if (this.isAllSelected) return this.options.map((option) => option.value);
		return Array.isArray(this.value) ? this.value : [];
	}
	dispatchValueChange() {
		const detailValue = this.isAllSelected ? "*" : [...this.selectedValues];
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: detailValue },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	rebuildOptionElements() {
		const container = this.shadowRoot?.querySelector(".options");
		if (!container) return;
		for (const element of this.optionElements) element.remove();
		this.optionElements = [];
		this.allOptionElement = null;
		if (this.showAllOption) {
			const allCheckbox = document.createElement("pk-checkbox");
			allCheckbox.classList.add("all-option");
			allCheckbox.append(this.allLabel);
			allCheckbox.addEventListener("pk-change", this.handleAllChange);
			container.append(allCheckbox);
			this.allOptionElement = allCheckbox;
			this.optionElements.push(allCheckbox);
		}
		for (const option of this.options) {
			const checkbox = document.createElement("pk-checkbox");
			checkbox.checkboxValue = option.value;
			checkbox.append(option.label);
			checkbox.addEventListener("pk-change", (event) => {
				this.handleItemChange(option.value, event);
			});
			container.append(checkbox);
			this.optionElements.push(checkbox);
		}
		this.updateOptionStates();
	}
	updateOptionStates() {
		if (this.allOptionElement) {
			this.allOptionElement.checked = this.isAllSelected;
			this.allOptionElement.disabled = this.disabled;
		}
		for (const option of this.options) {
			const checkbox = this.optionElements.find((element) => element !== this.allOptionElement && element.checkboxValue === option.value);
			if (!checkbox) continue;
			checkbox.checked = this.isAllSelected || this.selectedValues.includes(option.value);
			checkbox.disabled = this.disabled || this.isAllSelected;
		}
	}
	render() {
		return b`
            <div
                part="base"
                class=${e({
			options: true,
			"options--horizontal": this.orientation === "horizontal"
		})}
            ></div>
        `;
	}
};
__decorate([n({
	attribute: "options",
	converter: optionsConverter
})], PkCheckboxSelect.prototype, "options", void 0);
__decorate([n({
	attribute: "value",
	converter: valueConverter
})], PkCheckboxSelect.prototype, "value", void 0);
__decorate([n({
	type: Boolean,
	attribute: "show-all-option"
})], PkCheckboxSelect.prototype, "showAllOption", void 0);
__decorate([n({ attribute: "all-label" })], PkCheckboxSelect.prototype, "allLabel", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCheckboxSelect.prototype, "disabled", void 0);
__decorate([n({ reflect: true })], PkCheckboxSelect.prototype, "orientation", void 0);
__decorate([n({ attribute: "aria-label" })], PkCheckboxSelect.prototype, "ariaLabel", void 0);
__decorate([r()], PkCheckboxSelect.prototype, "optionElements", void 0);
PkCheckboxSelect = __decorate([t("pk-checkbox-select")], PkCheckboxSelect);
//#endregion
export { ALL_VALUE, PkCheckboxSelect };
