import { a as o, f as A, l as n, m as i, p as b, u as customElement } from "./lit-DpLik9Rf.js";
import { c as __decorate, l as PkElement } from "./pk-base-B21zXxSo.js";
import { t as iconToSvg } from "./svg-_Mtb7CHx.js";
import { i as subscribeIconRegistry, t as getIcon } from "./registry-BanyScVR.js";
//#region src/components/icon/pk-icon.ts
var PkIcon = class PkIcon extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.icon = "";
		this.name = "";
		this.unsubscribeRegistry = null;
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
	connectedCallback() {
		super.connectedCallback();
		this.unsubscribeRegistry = subscribeIconRegistry(() => {
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		this.unsubscribeRegistry?.();
		this.unsubscribeRegistry = null;
		super.disconnectedCallback();
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
PkIcon = __decorate([customElement("pk-icon")], PkIcon);
//#endregion
