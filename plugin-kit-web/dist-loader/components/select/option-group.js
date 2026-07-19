import { n as uniqueId } from "../../chunks/pk-a11y-Cx5RZvhu.js";
import { l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/select/pk-option-group.styles.ts
var pkOptionGroupStyles = i`
    @layer pk-component {
        :host {
            display: block;
        }

        /* Hard hex fallbacks: when groups portal outside pk-select, size-token
         * vars / theme tokens may be absent and invalid color inherits option black.
         * Weight/color match v1 ComboboxLabel / SelectLabel (text-slate-700, no font-medium). */
        .label {
            padding-block-start: var(--pk-select-group-label-padding-block-start, 8px);
            padding-block-end: var(--pk-select-group-label-padding-block-end, 2px);
            padding-inline: var(--pk-select-item-padding-inline, 10px);
            color: var(--pk-select-group-label-color, var(--pk-color-slate-700, rgba(96, 125, 159, 0.7)));
            font-family: var(--pk-font-family);
            /* Default matches v1 ComboboxLabel/SelectLabel text-xs (12px). */
            font-size: var(--pk-select-group-label-font-size, 12px);
            font-weight: 400;
            line-height: 1.3;
            /* Light-DOM ancestors (e.g. Formie empty dropzone text-center) must not center labels. */
            text-align: left;
            user-select: none;
            pointer-events: none;
        }

        :host([hidden]),
        :host([data-pk-filter-empty]) {
            display: none !important;
        }
    }
`;
//#endregion
//#region src/components/select/pk-option-group.ts
var PkOptionGroup = class PkOptionGroup extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.hidden = false;
		this.labelId = uniqueId("pk-option-group-label");
	}
	static {
		this.styles = pkOptionGroupStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "group");
		this.setAttribute("aria-labelledby", this.labelId);
	}
	render() {
		return b`
            <div part="label" class="label" id=${this.labelId}>${this.label}</div>
            <div role="presentation">
                <slot></slot>
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkOptionGroup.prototype, "label", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkOptionGroup.prototype, "hidden", void 0);
PkOptionGroup = __decorate([t("pk-option-group")], PkOptionGroup);
//#endregion
export { PkOptionGroup };
