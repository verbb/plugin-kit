import { c as r, d as i, f as A, l as n, p as b, u as customElement } from "../../chunks/lit-DpLik9Rf.js";
import { c as __decorate } from "../../chunks/pk-base-CyzwylQ7.js";
import "../../chunks/pk-icon-B5ob3JdK.js";
import "../../chunks/pk-button-dngp-vOd.js";
import "../../chunks/pk-dialog-B6lzsRur.js";
import { a as sendCpConnectRequest, c as watchCpFormDirty, i as resolveConnectError, n as buildConnectPayload, o as serializeCpForm, r as escapeCpHtml, t as pkConnectStyles } from "../../chunks/pk-connect.styles-Bfgwu0VH.js";
import "../../chunks/pk-status-D3ArH2ui.js";
//#region src/components/connect/pk-connect.ts
var pkStatusForState = (status) => {
	if (status === "connected") return "on";
	if (status === "error") return "off";
	return "disabled";
};
var PkConnect = class PkConnect extends i {
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
		this.showDetails = false;
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
		if (!open) this.showDetails = false;
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
			"<div class=\"pk-connection-error\">",
			"<div class=\"pk-connection-error__stack\">",
			"<div class=\"pk-connection-error__icon\"><pk-icon icon=\"triangle-exclamation\"></pk-icon></div>",
			"<h3 class=\"pk-connection-error__heading\"></h3>",
			"<p class=\"pk-connection-error__message\"></p>",
			"<div class=\"pk-connection-error__details hidden\">",
			"<button type=\"button\" class=\"pk-connection-error__details-toggle\">",
			"<pk-icon icon=\"chevron-right\"></pk-icon>",
			`<span class="pk-connection-error__details-label">${escapeCpHtml(this.labelShowDetails)}</span>`,
			"</button>",
			"<div class=\"pk-connection-error__trace hidden\"></div>",
			"</div>",
			"</div>",
			"</div>"
		].join("");
		document.body.appendChild(dialog);
		const detailsToggle = dialog.querySelector(".pk-connection-error__details-toggle");
		const traceEl = dialog.querySelector(".pk-connection-error__trace");
		const detailsLabel = dialog.querySelector(".pk-connection-error__details-label");
		dialog.querySelector(".pk-connection-error__details");
		const chevron = dialog.querySelector("pk-icon");
		detailsToggle?.addEventListener("click", () => {
			this.showDetails = !this.showDetails;
			traceEl?.classList.toggle("hidden", !this.showDetails);
			chevron?.classList.toggle("is-open", this.showDetails);
			if (detailsLabel) detailsLabel.textContent = this.showDetails ? this.labelHideDetails : this.labelShowDetails;
		});
		dialog.addEventListener("pk-open-change", (event) => {
			const open = Boolean(event.detail?.open);
			this.setModalOpen(open);
			if (!open) {
				traceEl?.classList.add("hidden");
				chevron?.classList.remove("is-open");
				if (detailsLabel) detailsLabel.textContent = this.labelShowDetails;
			}
		});
		this.errorDialog = dialog;
		return dialog;
	}
	showErrorModal(error) {
		const dialog = this.ensureErrorDialog();
		const heading = dialog.querySelector(".pk-connection-error__heading");
		const message = dialog.querySelector(".pk-connection-error__message");
		const detailsWrap = dialog.querySelector(".pk-connection-error__details");
		const traceEl = dialog.querySelector(".pk-connection-error__trace");
		if (heading) heading.textContent = error.heading || this.labelErrorHeading;
		if (message) message.textContent = error.text || this.labelGenericError;
		const trace = error.traceAsString || error.trace || "";
		if (trace && detailsWrap && traceEl) {
			detailsWrap.classList.remove("hidden");
			traceEl.innerHTML = trace;
			traceEl.classList.add("hidden");
		} else detailsWrap?.classList.add("hidden");
		this.showDetails = false;
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
		if (this.isDirty) return b`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
		return b`
            <div class="heading">
                <pk-status
                    status=${pkStatusForState(this.status)}
                    class="pk-connect__status-icon"
                ></pk-status><span class=${this.statusLabelMuted ? "light" : A}>${this.statusLabel}</span>
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
__decorate([n({ reflect: true })], PkConnect.prototype, "action", void 0);
__decorate([n({ reflect: true })], PkConnect.prototype, "status", void 0);
__decorate([n({ attribute: "form-selector" })], PkConnect.prototype, "formSelector", void 0);
__decorate([n({ attribute: "source-id" })], PkConnect.prototype, "sourceId", void 0);
__decorate([n({ attribute: "id-param" })], PkConnect.prototype, "idParam", void 0);
__decorate([n()], PkConnect.prototype, "type", void 0);
__decorate([n({ attribute: "label-connected" })], PkConnect.prototype, "labelConnected", void 0);
__decorate([n({ attribute: "label-not-connected" })], PkConnect.prototype, "labelNotConnected", void 0);
__decorate([n({ attribute: "label-connecting" })], PkConnect.prototype, "labelConnecting", void 0);
__decorate([n({ attribute: "label-error" })], PkConnect.prototype, "labelError", void 0);
__decorate([n({ attribute: "label-connect" })], PkConnect.prototype, "labelConnect", void 0);
__decorate([n({ attribute: "label-refresh" })], PkConnect.prototype, "labelRefresh", void 0);
__decorate([n({ attribute: "label-save-to-connect" })], PkConnect.prototype, "labelSaveToConnect", void 0);
__decorate([n({ attribute: "label-error-heading" })], PkConnect.prototype, "labelErrorHeading", void 0);
__decorate([n({ attribute: "label-generic-error" })], PkConnect.prototype, "labelGenericError", void 0);
__decorate([n({ attribute: "label-show-details" })], PkConnect.prototype, "labelShowDetails", void 0);
__decorate([n({ attribute: "label-hide-details" })], PkConnect.prototype, "labelHideDetails", void 0);
__decorate([n({ attribute: "label-close" })], PkConnect.prototype, "labelClose", void 0);
__decorate([r()], PkConnect.prototype, "isDirty", void 0);
__decorate([r()], PkConnect.prototype, "loading", void 0);
__decorate([r()], PkConnect.prototype, "showDetails", void 0);
PkConnect = __decorate([customElement("pk-connect")], PkConnect);
//#endregion
export { PkConnect };
