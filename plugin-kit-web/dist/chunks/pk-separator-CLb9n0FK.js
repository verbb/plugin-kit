import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
//#region src/components/separator/pk-separator.styles.ts
/**
* Default block rhythm lives on the inner `.line`, not `:host` margin.
*
* Outer author styles (Tailwind preflight `* { margin: 0 }`, utilities, etc.) win
* over shadow `:host` margins — so host margin cannot be the spacing mechanism
* when kit sits next to a reset. Internal shadow margins are insulated.
*/
var pkSeparatorStyles = css`
    @layer pk-component {
        :host {
            display: block;
            flex-shrink: 0;
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
            background: transparent;
        }

        .line {
            display: block;
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
            background: var(--pk-color-slate-200);
        }

        :host([orientation='horizontal']) .line {
            width: 100%;
            height: 1px;
            margin-block: 0.25rem;
        }

        :host([orientation='vertical']) {
            display: inline-block;
            align-self: stretch;
            width: auto;
            height: 100%;
        }

        :host([orientation='vertical']) .line {
            width: 1px;
            height: 100%;
            margin-inline: 0.25rem;
        }

        /* CE :host { display } otherwise wins over the UA [hidden] rule. */
        :host([hidden]) {
            display: none !important;
        }
    }
`;
//#endregion
//#region src/components/separator/pk-separator.ts
var PkSeparator = class PkSeparator extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "horizontal";
	}
	static {
		this.styles = pkSeparatorStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "separator");
		this.syncAriaOrientation();
	}
	updated(changed) {
		super.updated(changed);
		if (changed.has("orientation")) this.syncAriaOrientation();
	}
	syncAriaOrientation() {
		this.setAttribute("aria-orientation", this.orientation);
	}
	render() {
		return html`<div class="line" part="base"></div>`;
	}
};
__decorate([property({ reflect: true })], PkSeparator.prototype, "orientation", void 0);
PkSeparator = __decorate([customElement("pk-separator")], PkSeparator);
//#endregion
export { PkSeparator as t };

//# sourceMappingURL=pk-separator-CLb9n0FK.js.map