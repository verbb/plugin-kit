import { m as i, p as b, u as customElement } from "../../chunks/lit-DpLik9Rf.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-B21zXxSo.js";
import { n as buttonGroupCornerRadiusStyles } from "../../chunks/button-group-item.styles-CsBQ3Cyh.js";
//#region src/components/button-group/pk-button-group-text.styles.ts
var pkButtonGroupTextStyles = [buttonGroupCornerRadiusStyles(".text", "var(--pk-radius-lg)"), i`
        @layer pk-component {
            :host {
                display: inline-flex;
                vertical-align: middle;
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            .text {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0 0.625rem;
                border: 1px solid var(--pk-color-slate-400);
                background: var(--pk-color-gray-100);
                color: var(--pk-color-gray-700);
                font-family: var(--pk-font-family);
                font-size: var(--pk-font-size-sm);
                font-weight: 500;
                line-height: var(--pk-line-height);
                white-space: nowrap;
            }
        }
    `];
//#endregion
//#region src/components/button-group/pk-button-group-text.ts
var PkButtonGroupText = class PkButtonGroupText extends PkElement {
	static {
		this.styles = pkButtonGroupTextStyles;
	}
	render() {
		return b`
            <span part="base" class="text pk-btn-group__text">
                <slot></slot>
            </span>
        `;
	}
};
PkButtonGroupText = __decorate([customElement("pk-button-group-text")], PkButtonGroupText);
//#endregion
export { PkButtonGroupText };
