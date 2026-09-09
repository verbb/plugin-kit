import { i as property, n as PkElement, s as customElement, t as __decorate } from "./decorate-R0X811qp.js";
import { css, html } from "lit";
//#region src/components/input-group/pk-input-group-button.styles.ts
var pkInputGroupButtonStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
        }

        pk-button {
            --pk-btn-height: var(--pk-btn-height-sm);
            --pk-btn-font: var(--pk-btn-font-sm);
            --pk-btn-padding-inline: var(--pk-btn-padding-inline-sm);
            --pk-btn-icon-size: var(--pk-btn-icon-size-sm);
            --pk-btn-radius: var(--pk-btn-radius-sm);
        }
    }
`;
//#endregion
//#region src/components/input-group/pk-input-group-button.ts
var PkInputGroupButton = class PkInputGroupButton extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "none";
		this.size = "xs";
		this.disabled = false;
	}
	static {
		this.styles = pkInputGroupButtonStyles;
	}
	render() {
		return html`
            <pk-button
                part="base"
                variant=${this.variant}
                size=${this.size === "icon-xs" || this.size === "icon-sm" ? "xs" : "xs"}
                ?disabled=${this.disabled}
            >
                <slot></slot>
            </pk-button>
        `;
	}
};
__decorate([property({ reflect: true })], PkInputGroupButton.prototype, "variant", void 0);
__decorate([property({ reflect: true })], PkInputGroupButton.prototype, "size", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkInputGroupButton.prototype, "disabled", void 0);
PkInputGroupButton = __decorate([customElement("pk-input-group-button")], PkInputGroupButton);
//#endregion
export { PkInputGroupButton as t };

//# sourceMappingURL=pk-input-group-button-CHQHsWd4.js.map