import { m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/dropdown-menu/pk-dropdown-label.styles.ts
var pkDropdownLabelStyles = i`
    @layer pk-component {
        :host {
            display: block;
        }

        /* Match v1 DropdownMenuLabel — text-slate-700, regular weight (not medium). */
        .label {
            margin: 0;
            padding-block-start: 6px;
            padding-block-end: 4px;
            padding-inline: var(--pk-dropdown-label-padding-inline, 12px);
            color: var(--pk-color-slate-700, rgba(96, 125, 159, 0.7));
            font-size: var(--pk-dropdown-label-font-size, 13px);
            font-weight: 400;
            line-height: 1.3;
            user-select: none;
            pointer-events: none;
        }
    }
`;
//#endregion
//#region src/components/dropdown-menu/pk-dropdown-label.ts
var PkDropdownLabel = class PkDropdownLabel extends PkElement {
	static {
		this.styles = pkDropdownLabelStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "presentation");
	}
	render() {
		return b`
            <div part="label" class="label">
                <slot></slot>
            </div>
        `;
	}
};
PkDropdownLabel = __decorate([t("pk-dropdown-label")], PkDropdownLabel);
//#endregion
export { PkDropdownLabel };
