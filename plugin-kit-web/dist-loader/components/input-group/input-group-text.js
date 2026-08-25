import { m as i, p as b, u as customElement } from "../../chunks/lit-DpLik9Rf.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-B21zXxSo.js";
//#region src/components/input-group/pk-input-group-text.styles.ts
var pkInputGroupTextStyles = i`
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
		return b`
            <span part="base" class="text">
                <slot></slot>
            </span>
        `;
	}
};
PkInputGroupText = __decorate([customElement("pk-input-group-text")], PkInputGroupText);
//#endregion
export { PkInputGroupText };
