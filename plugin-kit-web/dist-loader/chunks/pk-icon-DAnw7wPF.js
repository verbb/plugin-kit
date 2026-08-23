import { a as o, f as A, l as n, m as i, p as b, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "./pk-base-BlxAYXJD.js";
import { t as iconToSvg } from "./svg-_Mtb7CHx.js";
import { t as getIcon } from "./registry-CmL0rH9r.js";
//#region src/components/icon/pk-icon.ts
var PkIcon = class PkIcon extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.icon = "";
		this.name = "";
	}
	static {
		this.styles = i`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: none;
            /* Square em box + slight baseline nudge for inline text. Flex
             * parents (e.g. button slots) should zero vertical-align. */
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
            /* Allow intentional path overhang past the icon canvas. */
            overflow: visible;
        }
    `;
	}
	render() {
		const icon = getIcon(this.icon || this.name);
		if (!icon) return A;
		return b`${o(iconToSvg(icon, { title: this.label }))}`;
	}
};
__decorate([n()], PkIcon.prototype, "icon", void 0);
__decorate([n()], PkIcon.prototype, "name", void 0);
__decorate([n()], PkIcon.prototype, "label", void 0);
PkIcon = __decorate([t("pk-icon")], PkIcon);
//#endregion
