import { a as o, f as A, l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { j as icons, t as iconToSvg } from "../../chunks/svg-BCGsRUz7.js";
import { n as normalizeIconName, r as registerIcons, t as getIcon } from "../../chunks/registry-CmL0rH9r.js";
//#region ../plugin-kit-icons/dist/all.js
/**
* Side-effect entry: register every curated icon for `<pk-icon icon="…">` lookup.
*
* Prefer named imports + {@link registerIcons} in production CP bundles. Use this
* for docs, playgrounds, the no-build loader, and `registerAll()` workshops.
*
* ```ts
* import '@verbb/plugin-kit-icons/all.js';
* ```
*/
var entries = {};
for (const [name, icon] of Object.entries(icons)) entries[normalizeIconName(name)] = icon;
registerIcons(entries);
//#endregion
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
		if (!icon) return A;
		return b`${o(iconToSvg(icon, { title: this.label }))}`;
	}
};
__decorate([n()], PkIcon.prototype, "icon", void 0);
__decorate([n()], PkIcon.prototype, "name", void 0);
__decorate([n()], PkIcon.prototype, "label", void 0);
PkIcon = __decorate([t("pk-icon")], PkIcon);
//#endregion
