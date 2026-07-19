import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
//#region src/components/button-group/pk-button-group-separator.styles.ts
var pkButtonGroupSeparatorStyles = css`
    @layer pk-component {
        :host {
            display: inline-block;
            align-self: stretch;
            flex-shrink: 0;
        }

        .separator {
            display: block;
            width: 1px;
            height: 100%;
            margin-block: 1px;
            background: var(--pk-btn-group-separator-color, transparent);
        }

        :host-context(pk-button-group[orientation='vertical']) {
            display: block;
            width: 100%;
            height: auto;
        }

        :host-context(pk-button-group[orientation='vertical']) .separator {
            width: 100%;
            height: 1px;
            margin-block: 1px;
        }
    }
`;
//#endregion
//#region src/components/button-group/pk-button-group-separator.ts
var PkButtonGroupSeparator = class PkButtonGroupSeparator extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "vertical";
	}
	static {
		this.styles = pkButtonGroupSeparatorStyles;
	}
	render() {
		return html`
            <div
                part="base"
                class="separator pk-btn-group__separator"
                role="separator"
                aria-orientation=${this.orientation}
                data-orientation=${this.orientation}
            ></div>
        `;
	}
};
__decorate([property({ reflect: true })], PkButtonGroupSeparator.prototype, "orientation", void 0);
PkButtonGroupSeparator = __decorate([customElement("pk-button-group-separator")], PkButtonGroupSeparator);
//#endregion
export { PkButtonGroupSeparator as t };

//# sourceMappingURL=pk-button-group-separator-DG0CYaqc.js.map