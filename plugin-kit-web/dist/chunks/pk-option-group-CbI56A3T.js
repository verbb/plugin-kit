import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { i as uniqueId } from "./focus-aa5dlv8k.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
//#region src/components/select/pk-option-group.styles.ts
var pkOptionGroupStyles = css`
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
		return html`
            <div part="label" class="label" id=${this.labelId}>${this.label}</div>
            <div role="presentation">
                <slot></slot>
            </div>
        `;
	}
};
__decorate([property({ reflect: true })], PkOptionGroup.prototype, "label", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkOptionGroup.prototype, "hidden", void 0);
PkOptionGroup = __decorate([customElement("pk-option-group")], PkOptionGroup);
//#endregion
export { PkOptionGroup as t };

//# sourceMappingURL=pk-option-group-CbI56A3T.js.map