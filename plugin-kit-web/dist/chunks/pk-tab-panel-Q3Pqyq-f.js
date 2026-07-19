import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
//#region src/components/tabs/pk-tab-panel-base.ts
/** Shared tab panel behaviour for all tab variants. */
var PkTabPanelBase = class extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.hidden = true;
	}
	renderPanel(className) {
		return html`
            <div
                part="content"
                class=${className}
                role="tabpanel"
                id=${this.tabId ?? nothing}
                aria-labelledby=${this.tabId ?? nothing}
                aria-hidden=${this.hidden ? "true" : "false"}
                tabindex=${this.hidden ? nothing : "0"}
            >
                <slot></slot>
            </div>
        `;
	}
};
__decorate([property()], PkTabPanelBase.prototype, "value", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkTabPanelBase.prototype, "hidden", void 0);
__decorate([property()], PkTabPanelBase.prototype, "tabId", void 0);
//#endregion
//#region src/components/tabs/pk-tab-panel.styles.ts
var pkTabPanelStyles = css`
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
PkTabPanel = __decorate([customElement("pk-tab-panel")], PkTabPanel);
//#endregion
export { PkTabPanel as t };

//# sourceMappingURL=pk-tab-panel-Q3Pqyq-f.js.map