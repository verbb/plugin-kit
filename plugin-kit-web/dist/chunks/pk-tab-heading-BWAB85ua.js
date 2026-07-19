import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
//#region src/components/tabs/pk-tab-heading.styles.ts
var pkTabHeadingStyles = css`
    @layer pk-component {
        :host {
            display: block;
            flex-shrink: 0;
            width: 100%;
        }

        .heading {
            margin: 0;
            padding: var(--pk-tabs-heading-padding, 0.75rem 0.5rem 0.375rem);
            color: var(--pk-tabs-heading-color, var(--pk-color-gray-400));
            font-family: var(--pk-font-family);
            font-size: var(--pk-tabs-heading-font-size, 11px);
            font-weight: var(--pk-tabs-heading-font-weight, 600);
            line-height: 1.3;
            letter-spacing: var(--pk-tabs-heading-letter-spacing, 0.04em);
            text-transform: var(--pk-tabs-heading-text-transform, uppercase);
            user-select: none;
            pointer-events: none;
        }
    }
`;
//#endregion
//#region src/components/tabs/pk-tab-heading.ts
var PkTabHeading = class PkTabHeading extends PkElement {
	static {
		this.styles = pkTabHeadingStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "presentation");
	}
	render() {
		return html`
            <div part="heading" class="heading">
                <slot></slot>
            </div>
        `;
	}
};
PkTabHeading = __decorate([customElement("pk-tab-heading")], PkTabHeading);
//#endregion
export { PkTabHeading as t };

//# sourceMappingURL=pk-tab-heading-BWAB85ua.js.map