import { i as customElement, t as __decorate } from "../../chunks/decorate-Br_PE9pq.js";
import { r as state, t as property } from "../../chunks/decorators-BkErmuYK.js";
import "../../chunks/pk-button-ntSVrer_.js";
import "../icon/pk-icon.js";
import "../../chunks/pk-state-panel-BTo2xiug.js";
import "../../chunks/pk-status-CdiRBRyh.js";
import "../../chunks/pk-dialog-C7KZGpQs.js";
import { t as pkConnectStyles } from "../../chunks/pk-connect.styles-oKhxa_m2.js";
import { LitElement, html, nothing } from "lit";
import { buildConnectPayload, escapeCpHtml, resolveConnectError, sendCpConnectRequest, serializeCpForm, watchCpFormDirty } from "@verbb/plugin-kit-core";
//#region src/components/connect/pk-connect.ts
var pkStatusForState = (status) => {
	if (status === "connected") return "on";
	if (status === "error") return "off";
	return "disabled";
};
var PkConnect = class PkConnect extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.action = "";
		this.status = "disconnected";
		this.formSelector = "#main-form";
		this.sourceId = null;
		this.idParam = "sourceId";
		this.type = "";
		this.labelConnected = "Connected";
		this.labelNotConnected = "Not Connected";
		this.labelConnecting = "Connecting…";
		this.labelError = "Error";
		this.labelConnect = "Connect";
		this.labelRefresh = "Refresh";
		this.labelSaveToConnect = "Save to connect.";
		this.labelErrorHeading = "Connection error";
		this.labelGenericError = "Unable to connect to the provider.";
		this.labelShowDetails = "Show details";
		this.labelHideDetails = "Hide details";
		this.labelClose = "Close";
		this.isDirty = false;
		this.loading = false;
		this.unwatchDirty = null;
		this.errorDialog = null;
	}
	static {
		this.styles = pkConnectStyles;
	}
	createRenderRoot() {
		return this;
	}
	connectedCallback() {
		super.connectedCallback();
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
		this.errorDialog?.remove();
		this.errorDialog = null;
		super.disconnectedCallback();
	}
	get labels() {
		return {
			connected: this.labelConnected,
			notConnected: this.labelNotConnected,
			connecting: this.labelConnecting,
			error: this.labelError,
			connect: this.labelConnect,
			refresh: this.labelRefresh,
			saveToConnect: this.labelSaveToConnect,
			errorHeading: this.labelErrorHeading,
			genericError: this.labelGenericError,
			showDetails: this.labelShowDetails,
			hideDetails: this.labelHideDetails
		};
	}
	get fieldHost() {
		return this.closest(".pk-connect-field");
	}
	get statusLabel() {
		switch (this.status) {
			case "connected": return this.labelConnected;
			case "error": return this.labelError;
			case "connecting": return this.labelConnecting;
			default: return this.labelNotConnected;
		}
	}
	get statusLabelMuted() {
		return this.status !== "connected" && this.status !== "error";
	}
	get actionLabel() {
		return this.status === "connected" ? this.labelRefresh : this.labelConnect;
	}
	setConnectStatus(status) {
		this.status = status;
		this.dispatchEvent(new CustomEvent("pk-status-change", {
			detail: { status },
			bubbles: true
		}));
	}
	setModalOpen(open) {
		this.fieldHost?.classList.toggle("pk-connect-field--modal-open", open);
	}
	ensureErrorDialog() {
		if (this.errorDialog) return this.errorDialog;
		const dialog = document.createElement("pk-dialog");
		dialog.className = "pk-connect-dialog";
		dialog.setAttribute("without-header", "");
		dialog.innerHTML = [
			`<pk-button slot="trigger" type="button" variant="none" size="none" icon class="pk-connect-dialog__close" data-dialog="close" aria-label="${escapeCpHtml(this.labelClose)}">`,
			"<pk-icon icon=\"xmark\"></pk-icon>",
			"</pk-button>",
			"<div class=\"pk-connect-dialog__content\">",
			"<pk-state-panel class=\"pk-connect-dialog__state\" variant=\"error\" size=\"lg\" announce=\"assertive\">",
			"<span class=\"pk-connect-dialog__message\"></span>",
			"</pk-state-panel>",
			"</div>"
		].join("");
		document.body.appendChild(dialog);
		dialog.addEventListener("pk-open-change", (event) => {
			const open = Boolean(event.detail?.open);
			this.setModalOpen(open);
		});
		this.errorDialog = dialog;
		return dialog;
	}
	showErrorModal(error) {
		const dialog = this.ensureErrorDialog();
		const statePanel = dialog.querySelector("pk-state-panel");
		const message = dialog.querySelector(".pk-connect-dialog__message");
		if (message) message.textContent = error.text || this.labelGenericError;
		const trace = error.traceAsArray.length > 0 ? error.traceAsArray.join("\n") : (error.traceAsString || error.trace || "").replace(/<br\s*\/?>/gi, "\n");
		dialog.querySelector("[slot=\"details\"]")?.remove();
		if (statePanel) {
			statePanel.heading = error.heading || this.labelErrorHeading;
			statePanel.detailsLabel = this.labelShowDetails;
			statePanel.detailsOpen = false;
			statePanel.copyable = Boolean(trace);
			if (trace) {
				const details = document.createElement("pre");
				details.slot = "details";
				details.textContent = trace;
				statePanel.appendChild(details);
			}
		}
		dialog.open = true;
		this.setModalOpen(true);
	}
	async handleConnectClick(event) {
		event.preventDefault();
		if (this.isDirty || this.loading || !this.action) return;
		this.loading = true;
		this.setConnectStatus("connecting");
		this.setModalOpen(false);
		const values = serializeCpForm(this.formSelector, this);
		const payload = buildConnectPayload(values, {
			idParam: this.idParam,
			sourceId: this.sourceId,
			type: this.type || values.type
		});
		try {
			const response = await sendCpConnectRequest(this.action, payload);
			this.loading = false;
			if (response?.data?.success) {
				this.setConnectStatus("connected");
				return;
			}
			if (response?.data?.message || response?.data?.success === false) {
				this.setConnectStatus("error");
				this.showErrorModal(resolveConnectError(response?.data?.message ?? null, this.labels));
			}
		} catch (error) {
			this.loading = false;
			this.setConnectStatus("error");
			this.showErrorModal(resolveConnectError(error, this.labels));
		}
	}
	render() {
		if (this.isDirty) return html`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
		return html`
            <div class="heading">
                <pk-status
                    status=${pkStatusForState(this.status)}
                    class="pk-connect__status-icon"
                ></pk-status><span class=${this.statusLabelMuted ? "light" : nothing}>${this.statusLabel}</span>
            </div>

            <div class="input ltr">
                <pk-button
                    type="button"
                    size="xs"
                    variant="default"
                    class="pk-connect__action"
                    spinner-size="xs"
                    ?loading=${this.loading}
                    ?disabled=${this.loading || this.isDirty}
                    @click=${this.handleConnectClick}
                >
                    ${this.actionLabel}
                </pk-button>
            </div>
        `;
	}
};
__decorate([property({ reflect: true })], PkConnect.prototype, "action", void 0);
__decorate([property({ reflect: true })], PkConnect.prototype, "status", void 0);
__decorate([property({ attribute: "form-selector" })], PkConnect.prototype, "formSelector", void 0);
__decorate([property({ attribute: "source-id" })], PkConnect.prototype, "sourceId", void 0);
__decorate([property({ attribute: "id-param" })], PkConnect.prototype, "idParam", void 0);
__decorate([property()], PkConnect.prototype, "type", void 0);
__decorate([property({ attribute: "label-connected" })], PkConnect.prototype, "labelConnected", void 0);
__decorate([property({ attribute: "label-not-connected" })], PkConnect.prototype, "labelNotConnected", void 0);
__decorate([property({ attribute: "label-connecting" })], PkConnect.prototype, "labelConnecting", void 0);
__decorate([property({ attribute: "label-error" })], PkConnect.prototype, "labelError", void 0);
__decorate([property({ attribute: "label-connect" })], PkConnect.prototype, "labelConnect", void 0);
__decorate([property({ attribute: "label-refresh" })], PkConnect.prototype, "labelRefresh", void 0);
__decorate([property({ attribute: "label-save-to-connect" })], PkConnect.prototype, "labelSaveToConnect", void 0);
__decorate([property({ attribute: "label-error-heading" })], PkConnect.prototype, "labelErrorHeading", void 0);
__decorate([property({ attribute: "label-generic-error" })], PkConnect.prototype, "labelGenericError", void 0);
__decorate([property({ attribute: "label-show-details" })], PkConnect.prototype, "labelShowDetails", void 0);
__decorate([property({ attribute: "label-hide-details" })], PkConnect.prototype, "labelHideDetails", void 0);
__decorate([property({ attribute: "label-close" })], PkConnect.prototype, "labelClose", void 0);
__decorate([state()], PkConnect.prototype, "isDirty", void 0);
__decorate([state()], PkConnect.prototype, "loading", void 0);
PkConnect = __decorate([customElement("pk-connect")], PkConnect);
//#endregion
export { PkConnect };

//# sourceMappingURL=pk-connect.js.map