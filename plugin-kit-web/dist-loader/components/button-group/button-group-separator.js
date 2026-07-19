import { l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/button-group/pk-button-group-separator.styles.ts
var pkButtonGroupSeparatorStyles = i`
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
		return b`
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
__decorate([n({ reflect: true })], PkButtonGroupSeparator.prototype, "orientation", void 0);
PkButtonGroupSeparator = __decorate([t("pk-button-group-separator")], PkButtonGroupSeparator);
//#endregion
export { PkButtonGroupSeparator };
