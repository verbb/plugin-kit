import { c as r, d as i, l as n, p as b, u as customElement } from "../../chunks/lit-DpLik9Rf.js";
import { c as __decorate } from "../../chunks/pk-base-CyzwylQ7.js";
import "../../chunks/pk-button-dngp-vOd.js";
import { c as watchCpFormDirty, s as submitCpFormAction, t as pkConnectStyles } from "../../chunks/pk-connect.styles-Bfgwu0VH.js";
import "../../chunks/pk-status-D3ArH2ui.js";
//#region src/components/connect/pk-connect-oauth.ts
var PkConnectOauth = class PkConnectOauth extends i {
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
		if (this.isDirty) return b`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
		if (this.connected) return b`
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
		return b`
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
__decorate([n({
	type: Boolean,
	reflect: true
})], PkConnectOauth.prototype, "connected", void 0);
__decorate([n({ attribute: "connect-action" })], PkConnectOauth.prototype, "connectAction", void 0);
__decorate([n({ attribute: "disconnect-action" })], PkConnectOauth.prototype, "disconnectAction", void 0);
__decorate([n({ attribute: "param-name" })], PkConnectOauth.prototype, "paramName", void 0);
__decorate([n({ attribute: "param-value" })], PkConnectOauth.prototype, "paramValue", void 0);
__decorate([n({ attribute: "connect-redirect" })], PkConnectOauth.prototype, "connectRedirect", void 0);
__decorate([n({ attribute: "disconnect-redirect" })], PkConnectOauth.prototype, "disconnectRedirect", void 0);
__decorate([n({ attribute: "form-selector" })], PkConnectOauth.prototype, "formSelector", void 0);
__decorate([n({
	type: Boolean,
	attribute: "skip-dirty-watch"
})], PkConnectOauth.prototype, "skipDirtyWatch", void 0);
__decorate([n({ attribute: "label-connected" })], PkConnectOauth.prototype, "labelConnected", void 0);
__decorate([n({ attribute: "label-not-connected" })], PkConnectOauth.prototype, "labelNotConnected", void 0);
__decorate([n({ attribute: "label-connect" })], PkConnectOauth.prototype, "labelConnect", void 0);
__decorate([n({ attribute: "label-disconnect" })], PkConnectOauth.prototype, "labelDisconnect", void 0);
__decorate([n({ attribute: "label-save-to-connect" })], PkConnectOauth.prototype, "labelSaveToConnect", void 0);
__decorate([r()], PkConnectOauth.prototype, "isDirty", void 0);
PkConnectOauth = __decorate([customElement("pk-connect-oauth")], PkConnectOauth);
//#endregion
export { PkConnectOauth };
