import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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

//# sourceMappingURL=pk-input-group-button-XOfVLqGO.js.map