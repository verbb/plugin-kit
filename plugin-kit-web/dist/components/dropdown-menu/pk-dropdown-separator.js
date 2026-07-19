import { n as PkElement, t as __decorate } from "../../chunks/decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
//#region src/components/dropdown-menu/pk-dropdown-separator.ts
var PkDropdownSeparator = class PkDropdownSeparator extends PkElement {
	static {
		this.styles = css`
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
		return html`<hr part="base" />`;
	}
};
PkDropdownSeparator = __decorate([customElement("pk-dropdown-separator")], PkDropdownSeparator);
//#endregion
export { PkDropdownSeparator };

//# sourceMappingURL=pk-dropdown-separator.js.map