import { m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/dropdown-menu/pk-dropdown-separator.ts
var PkDropdownSeparator = class PkDropdownSeparator extends PkElement {
	static {
		this.styles = i`
        @layer pk-component {
            :host {
                display: block;
            }

            hr {
                display: block;
                height: 1px;
                margin: 4px 0;
                border: 0;
                padding: 0;
                background: var(--pk-color-slate-200);
            }
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "separator");
	}
	render() {
		return b`<hr part="base" />`;
	}
};
PkDropdownSeparator = __decorate([t("pk-dropdown-separator")], PkDropdownSeparator);
//#endregion
export { PkDropdownSeparator };
