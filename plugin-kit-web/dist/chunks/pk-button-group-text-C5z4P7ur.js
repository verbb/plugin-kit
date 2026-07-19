import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { n as buttonGroupCornerRadiusStyles } from "./button-group-item.styles-DYmBR28a.js";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
//#region src/components/button-group/pk-button-group-text.styles.ts
var pkButtonGroupTextStyles = [buttonGroupCornerRadiusStyles(".text", "var(--pk-radius-lg)"), css`
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
		return html`
            <span part="base" class="text pk-btn-group__text">
                <slot></slot>
            </span>
        `;
	}
};
PkButtonGroupText = __decorate([customElement("pk-button-group-text")], PkButtonGroupText);
//#endregion
export { PkButtonGroupText as t };

//# sourceMappingURL=pk-button-group-text-C5z4P7ur.js.map