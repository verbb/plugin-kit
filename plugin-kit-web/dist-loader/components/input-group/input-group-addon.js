import { l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/input-group/pk-input-group-addon.styles.ts
var pkInputGroupAddonStyles = i`
    @layer pk-component {
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding-inline: 0.5rem;
            font-size: var(--pk-font-size-sm);
            color: var(--pk-color-gray-500);
            cursor: text;
            user-select: none;
            flex-shrink: 0;
        }

        :host([align='inline-start']) {
            padding-inline-start: 0.5rem;
        }

        :host([align='inline-end']) {
            padding-inline-end: 0.5rem;
        }

        :host([align='block-start']) {
            width: 100%;
            align-self: stretch;
            justify-content: flex-start;
            padding: 0.625rem 0.625rem 0;
        }

        :host([align='block-end']) {
            width: 100%;
            align-self: stretch;
            justify-content: flex-start;
            padding: 0 0.625rem 0.625rem;
        }

        :host([align='block-start']) .addon,
        :host([align='block-end']) .addon {
            display: flex;
            width: 100%;
            box-sizing: border-box;
        }

        :host([align='block-start']) ::slotted(*),
        :host([align='block-end']) ::slotted(*) {
            width: 100%;
        }

        :host([align='inline-start']) ::slotted(pk-input-group-button) {
            margin-inline-start: -0.3rem;
        }

        :host([align='inline-end']) ::slotted(pk-input-group-button) {
            margin-inline-end: -0.3rem;
        }

        ::slotted(svg) {
            width: 0.75rem;
            height: 0.75rem;
            flex-shrink: 0;
        }
    }
`;
//#endregion
//#region src/components/input-group/pk-input-group-addon.ts
var PkInputGroupAddon = class PkInputGroupAddon extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.align = "inline-start";
	}
	static {
		this.styles = pkInputGroupAddonStyles;
	}
	handleClick(event) {
		if (event.target.closest("button, pk-input-group-button, pk-button")) return;
		(this.closest("pk-input-group")?.querySelector("pk-input-group-input, pk-input-group-textarea"))?.focus();
	}
	render() {
		return b`
            <div
                part="base"
                class="addon"
                role="group"
                @click=${this.handleClick}
            >
                <slot></slot>
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkInputGroupAddon.prototype, "align", void 0);
PkInputGroupAddon = __decorate([t("pk-input-group-addon")], PkInputGroupAddon);
//#endregion
export { PkInputGroupAddon };
