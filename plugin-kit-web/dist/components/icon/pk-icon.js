import { n as PkElement, t as __decorate } from "../../chunks/decorate-W02hmVTt.js";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { getIcon, iconToSvg } from "@verbb/plugin-kit-icons";
//#region src/components/icon/pk-icon.ts
var PkIcon = class PkIcon extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.icon = "";
		this.name = "";
	}
	static {
		this.styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            width: 1em;
            height: 1em;
            line-height: 1;
            vertical-align: -0.125em;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
    `;
	}
	render() {
		const icon = getIcon(this.icon || this.name);
		if (!icon) return nothing;
		return html`${unsafeSVG(iconToSvg(icon, { title: this.label }))}`;
	}
};
__decorate([property()], PkIcon.prototype, "icon", void 0);
__decorate([property()], PkIcon.prototype, "name", void 0);
__decorate([property()], PkIcon.prototype, "label", void 0);
PkIcon = __decorate([customElement("pk-icon")], PkIcon);
//#endregion
export { PkIcon };

//# sourceMappingURL=pk-icon.js.map