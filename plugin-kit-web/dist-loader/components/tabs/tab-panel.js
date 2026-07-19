import { f as A, l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/tabs/pk-tab-panel-base.ts
/** Shared tab panel behaviour for all tab variants. */
var PkTabPanelBase = class extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.hidden = true;
	}
	renderPanel(className) {
		return b`
            <div
                part="content"
                class=${className}
                role="tabpanel"
                id=${this.tabId ?? A}
                aria-labelledby=${this.tabId ?? A}
                aria-hidden=${this.hidden ? "true" : "false"}
                tabindex=${this.hidden ? A : "0"}
            >
                <slot></slot>
            </div>
        `;
	}
};
__decorate([n()], PkTabPanelBase.prototype, "value", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTabPanelBase.prototype, "hidden", void 0);
__decorate([n()], PkTabPanelBase.prototype, "tabId", void 0);
//#endregion
//#region src/components/tabs/pk-tab-panel.styles.ts
var pkTabPanelStyles = i`
    @layer pk-component {
        :host {
            /* Flex column so .content can own overflow when the host is height-capped
             * by a modal/pane parent (flex: 1 1 0% + min-height: 0). */
            display: flex;
            flex-direction: column;
            flex: var(--pk-tabs-panel-flex, none);
            min-height: var(--pk-tabs-panel-min-height, 0);
            min-width: 0;
            overflow: hidden;
        }

        :host([hidden]) {
            display: none !important;
        }

        .content {
            flex: 1 1 auto;
            min-height: 0;
            padding: var(--pk-tabs-panel-padding, 0);
            overflow-y: auto;
            border-radius: var(--pk-tabs-panel-radius, 0);
            background: var(--pk-tabs-panel-bg, transparent);
            outline: none;
            font-family: var(--pk-font-family);
            font-size: var(--pk-tabs-panel-font-size, var(--pk-font-size-base));
            line-height: var(--pk-line-height);
        }

        .content:focus-visible {
            box-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
            border-radius: var(--pk-radius-sm);
        }
    }
`;
//#endregion
//#region src/components/tabs/pk-tab-panel.ts
var PkTabPanel = class PkTabPanel extends PkTabPanelBase {
	static {
		this.styles = pkTabPanelStyles;
	}
	render() {
		return this.renderPanel("content pk-tabs__content");
	}
};
PkTabPanel = __decorate([t("pk-tab-panel")], PkTabPanel);
//#endregion
export { PkTabPanel };
