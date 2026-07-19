import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
//#region src/components/input-group/pk-input-group-text.styles.ts
var pkInputGroupTextStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: var(--pk-font-size-sm);
            color: var(--pk-color-gray-500);
        }

        .text ::slotted(svg) {
            width: 0.75rem;
            height: 0.75rem;
            pointer-events: none;
        }
    }
`;
//#endregion
//#region src/components/input-group/pk-input-group-text.ts
var PkInputGroupText = class PkInputGroupText extends PkElement {
	static {
		this.styles = pkInputGroupTextStyles;
	}
	render() {
		return html`
            <span part="base" class="text">
                <slot></slot>
            </span>
        `;
	}
};
PkInputGroupText = __decorate([customElement("pk-input-group-text")], PkInputGroupText);
//#endregion
export { PkInputGroupText as t };

//# sourceMappingURL=pk-input-group-text-C6ekhtff.js.map