import { i as property, o as state, s as customElement, t as __decorate } from "../../chunks/decorate-R0X811qp.js";
import "../../chunks/pk-button-BWGDkuzc.js";
import "../../chunks/pk-status-D1IzTSI2.js";
import { t as pkConnectStyles } from "../../chunks/pk-connect.styles-DshgIW2n.js";
import { LitElement, html } from "lit";
import { submitCpFormAction, watchCpFormDirty } from "@verbb/plugin-kit-core";
//#region src/components/connect/pk-connect-oauth.ts
var PkConnectOauth = class PkConnectOauth extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.connected = false;
		this.connectAction = "";
		this.disconnectAction = "";
		this.paramName = "";
		this.paramValue = "";
		this.connectRedirect = "";
		this.disconnectRedirect = "";
		this.formSelector = "#main-form";
		this.skipDirtyWatch = false;
		this.labelConnected = "Connected";
		this.labelNotConnected = "Not Connected";
		this.labelConnect = "Connect";
		this.labelDisconnect = "Disconnect";
		this.labelSaveToConnect = "Save to connect.";
		this.isDirty = false;
		this.unwatchDirty = null;
	}
	static {
		this.styles = pkConnectStyles;
	}
	createRenderRoot() {
		return this;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.skipDirtyWatch) return;
		this.unwatchDirty = watchCpFormDirty({
			formSelector: this.formSelector,
			host: this,
			onDirty: () => {
				this.isDirty = true;
			}
		});
	}
	disconnectedCallback() {
		this.unwatchDirty?.();
		this.unwatchDirty = null;
		super.disconnectedCallback();
	}
	submitOAuthAction(action, redirect) {
		submitCpFormAction({
			formSelector: this.formSelector,
			host: this,
			action,
			redirect,
			paramName: this.paramName,
			paramValue: this.paramValue
		});
	}
	handleConnectClick(event) {
		event.preventDefault();
		this.submitOAuthAction(this.connectAction, this.connectRedirect);
	}
	handleDisconnectClick(event) {
		event.preventDefault();
		this.submitOAuthAction(this.disconnectAction, this.disconnectRedirect);
	}
	render() {
		if (this.isDirty) return html`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
		if (this.connected) return html`
                <div class="heading">
                    <pk-status status="on" class="pk-connect__status-icon"></pk-status>${this.labelConnected}
                </div>

                <div class="input ltr">
                    <pk-button
                        type="button"
                        size="xs"
                        variant="default"
                        class="pk-connect__action"
                        @click=${this.handleDisconnectClick}
                    >
                        ${this.labelDisconnect}
                    </pk-button>
                </div>
            `;
		return html`
            <div class="heading">
                <pk-status status="disabled" class="pk-connect__status-icon"></pk-status><span class="light">${this.labelNotConnected}</span>
            </div>

            <div class="input ltr">
                <pk-button
                    type="button"
                    size="xs"
                    variant="default"
                    class="pk-connect__action"
                    @click=${this.handleConnectClick}
                >
                    ${this.labelConnect}
                </pk-button>
            </div>
        `;
	}
};
__decorate([property({
	type: Boolean,
	reflect: true
})], PkConnectOauth.prototype, "connected", void 0);
__decorate([property({ attribute: "connect-action" })], PkConnectOauth.prototype, "connectAction", void 0);
__decorate([property({ attribute: "disconnect-action" })], PkConnectOauth.prototype, "disconnectAction", void 0);
__decorate([property({ attribute: "param-name" })], PkConnectOauth.prototype, "paramName", void 0);
__decorate([property({ attribute: "param-value" })], PkConnectOauth.prototype, "paramValue", void 0);
__decorate([property({ attribute: "connect-redirect" })], PkConnectOauth.prototype, "connectRedirect", void 0);
__decorate([property({ attribute: "disconnect-redirect" })], PkConnectOauth.prototype, "disconnectRedirect", void 0);
__decorate([property({ attribute: "form-selector" })], PkConnectOauth.prototype, "formSelector", void 0);
__decorate([property({
	type: Boolean,
	attribute: "skip-dirty-watch"
})], PkConnectOauth.prototype, "skipDirtyWatch", void 0);
__decorate([property({ attribute: "label-connected" })], PkConnectOauth.prototype, "labelConnected", void 0);
__decorate([property({ attribute: "label-not-connected" })], PkConnectOauth.prototype, "labelNotConnected", void 0);
__decorate([property({ attribute: "label-connect" })], PkConnectOauth.prototype, "labelConnect", void 0);
__decorate([property({ attribute: "label-disconnect" })], PkConnectOauth.prototype, "labelDisconnect", void 0);
__decorate([property({ attribute: "label-save-to-connect" })], PkConnectOauth.prototype, "labelSaveToConnect", void 0);
__decorate([state()], PkConnectOauth.prototype, "isDirty", void 0);
PkConnectOauth = __decorate([customElement("pk-connect-oauth")], PkConnectOauth);
//#endregion
export { PkConnectOauth };

//# sourceMappingURL=pk-connect-oauth.js.map