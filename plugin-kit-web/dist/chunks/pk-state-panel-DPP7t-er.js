import { t as icons_exports } from "./icons-B8siZLOe.js";
import { a as query, i as property, n as PkElement, o as state, s as customElement, t as __decorate } from "./decorate-R0X811qp.js";
import { a as PkCopyEvent, i as PkCopyErrorEvent, n as copyToClipboard } from "./pk-copy-button-KegSx46o.js";
import { n as renderIconHtml } from "./render-BKGW1a68.js";
import { t as HasSlotController } from "./has-slot-9zjTXvea.js";
import "../components/icon/pk-icon.js";
import { css, html, nothing } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
//#region src/components/state-panel/pk-state-panel.styles.ts
var pkStatePanelStyles = css`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: var(--pk-state-panel-min-height, var(--_pk-state-panel-min-height));
            padding: var(--pk-state-panel-padding, var(--_pk-state-panel-padding));
            color: var(--pk-state-panel-body-color, var(--pk-color-gray-500));
            font-family: var(--pk-font-family);
            font-size: var(--_pk-state-panel-font-size);
            line-height: var(--pk-line-height);
            text-align: center;
            --pk-state-panel-accent: var(--pk-color-slate-500);
            --pk-state-panel-icon-background: color-mix(
                in srgb,
                var(--pk-color-slate-200) 55%,
                transparent
            );
            --_pk-state-panel-font-size: var(--pk-font-size-sm);
            --_pk-state-panel-title-size: var(--pk-font-size-base);
            --_pk-state-panel-content-width: 32rem;
            --_pk-state-panel-min-height: 11rem;
            --_pk-state-panel-padding: 2rem 0.875rem;
            --_pk-state-panel-icon-shell-size: 2.125rem;
            --_pk-state-panel-icon-size: 1.0625rem;
            --_pk-state-panel-icon-radius: var(--pk-radius-lg);
            --_pk-state-panel-icon-margin-bottom: 0.625rem;
            --_pk-state-panel-body-margin-top: 0.375rem;
            --_pk-state-panel-details-margin-top: 0.75rem;
            --_pk-state-panel-details-font-size: 0.75rem;
            --_pk-state-panel-details-content-margin-top: 0.625rem;
            --_pk-state-panel-details-max-height: 14rem;
            --_pk-state-panel-details-pre-padding: 0.625rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-md);
            --_pk-state-panel-details-pre-font-size: 0.6875rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-xs);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-xs);
            --_pk-state-panel-copy-inset: 0.375rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-md);
            --_pk-state-panel-copy-status-size: 0.6875rem;
            --_pk-state-panel-actions-gap: 0.4375rem;
            --_pk-state-panel-actions-margin-top: 1rem;
            --_pk-state-panel-action-height: var(--pk-btn-height-sm);
            --_pk-state-panel-action-font: var(--pk-btn-font-sm);
            --_pk-state-panel-action-padding-inline: var(--pk-btn-padding-inline-sm);
            --_pk-state-panel-action-icon-size: var(--pk-btn-icon-size-sm);
            --_pk-state-panel-action-icon-gap: var(--pk-btn-icon-gap-sm);
            --_pk-state-panel-action-caret-size: var(--pk-btn-caret-size-sm);
            --_pk-state-panel-action-radius: var(--pk-btn-radius-sm);
        }

        :host([size='sm']) {
            --_pk-state-panel-font-size: var(--pk-btn-font-xs);
            --_pk-state-panel-title-size: var(--pk-font-size-sm);
            --_pk-state-panel-content-width: 28rem;
            --_pk-state-panel-min-height: 8rem;
            --_pk-state-panel-padding: 1.25rem 0.75rem;
            --_pk-state-panel-icon-shell-size: 1.75rem;
            --_pk-state-panel-icon-size: 0.875rem;
            --_pk-state-panel-icon-radius: var(--pk-radius-md);
            --_pk-state-panel-icon-margin-bottom: 0.5rem;
            --_pk-state-panel-body-margin-top: 0.25rem;
            --_pk-state-panel-details-margin-top: 0.625rem;
            --_pk-state-panel-details-font-size: 0.6875rem;
            --_pk-state-panel-details-content-margin-top: 0.5rem;
            --_pk-state-panel-details-max-height: 10rem;
            --_pk-state-panel-details-pre-padding: 0.5rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-sm);
            --_pk-state-panel-details-pre-font-size: 0.6875rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-xxs);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-xxs);
            --_pk-state-panel-copy-inset: 0.3125rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-sm);
            --_pk-state-panel-copy-status-size: 0.6875rem;
            --_pk-state-panel-actions-gap: 0.375rem;
            --_pk-state-panel-actions-margin-top: 0.75rem;
            --_pk-state-panel-action-height: var(--pk-btn-height-xs);
            --_pk-state-panel-action-font: var(--pk-btn-font-xs);
            --_pk-state-panel-action-padding-inline: var(--pk-btn-padding-inline-xs);
            --_pk-state-panel-action-icon-size: var(--pk-btn-icon-size-xs);
            --_pk-state-panel-action-icon-gap: var(--pk-btn-icon-gap-xs);
            --_pk-state-panel-action-caret-size: var(--pk-btn-caret-size-xs);
            --_pk-state-panel-action-radius: var(--pk-btn-radius-xs);
        }

        :host([size='lg']) {
            --_pk-state-panel-font-size: var(--pk-font-size-base);
            --_pk-state-panel-title-size: 1rem;
            --_pk-state-panel-content-width: 35rem;
            --_pk-state-panel-min-height: 14rem;
            --_pk-state-panel-padding: 2.5rem 1rem;
            --_pk-state-panel-icon-shell-size: 2.5rem;
            --_pk-state-panel-icon-size: 1.25rem;
            --_pk-state-panel-icon-radius: 0.625rem;
            --_pk-state-panel-icon-margin-bottom: 0.75rem;
            --_pk-state-panel-body-margin-top: 0.5rem;
            --_pk-state-panel-details-margin-top: 1rem;
            --_pk-state-panel-details-font-size: 0.8125rem;
            --_pk-state-panel-details-content-margin-top: 0.75rem;
            --_pk-state-panel-details-max-height: 18rem;
            --_pk-state-panel-details-pre-padding: 0.75rem;
            --_pk-state-panel-details-pre-radius: var(--pk-radius-lg);
            --_pk-state-panel-details-pre-font-size: 0.75rem;
            --_pk-state-panel-copy-button-size: var(--pk-btn-height-sm);
            --_pk-state-panel-copy-icon-size: var(--pk-btn-icon-size-sm);
            --_pk-state-panel-copy-inset: 0.5rem;
            --_pk-state-panel-copy-radius: var(--pk-radius-lg);
            --_pk-state-panel-copy-status-size: 0.75rem;
            --_pk-state-panel-actions-gap: 0.5rem;
            --_pk-state-panel-actions-margin-top: 1.25rem;
            --_pk-state-panel-action-height: 2.125rem;
            --_pk-state-panel-action-font: var(--pk-font-size-base);
            --_pk-state-panel-action-padding-inline: 9px;
            --_pk-state-panel-action-icon-size: 14px;
            --_pk-state-panel-action-icon-gap: 6px;
            --_pk-state-panel-action-caret-size: 12px;
            --_pk-state-panel-action-radius: var(--pk-radius-lg);
        }

        :host([variant='info']) {
            --pk-state-panel-accent: var(--pk-color-sky-600);
            --pk-state-panel-icon-background: var(--pk-color-sky-50);
        }

        :host([variant='success']) {
            --pk-state-panel-accent: var(--pk-color-teal-600);
            --pk-state-panel-icon-background: var(--pk-color-teal-50);
        }

        :host([variant='warning']) {
            --pk-state-panel-accent: var(--pk-color-amber-600);
            --pk-state-panel-icon-background: var(--pk-color-amber-50);
        }

        :host([variant='error']) {
            --pk-state-panel-accent: var(--pk-color-rose-600);
            --pk-state-panel-icon-background: color-mix(
                in srgb,
                var(--pk-color-rose-500) 12%,
                transparent
            );
        }

        .panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: min(
                100%,
                var(--pk-state-panel-content-width, var(--_pk-state-panel-content-width))
            );
            min-width: 0;
        }

        .icon-shell {
            display: inline-flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            width: var(--pk-state-panel-icon-shell-size, var(--_pk-state-panel-icon-shell-size));
            height: var(--pk-state-panel-icon-shell-size, var(--_pk-state-panel-icon-shell-size));
            margin-bottom: var(--_pk-state-panel-icon-margin-bottom);
            border-radius: var(--pk-state-panel-icon-radius, var(--_pk-state-panel-icon-radius));
            background: var(--pk-state-panel-icon-background);
            color: var(--pk-state-panel-accent);
        }

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
            height: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
            font-size: var(--pk-state-panel-icon-size, var(--_pk-state-panel-icon-size));
        }

        .icon svg,
        .icon pk-icon,
        .icon ::slotted(*) {
            display: block;
            width: 100%;
            height: 100%;
            fill: currentColor;
        }

        .title {
            margin: 0;
            color: var(--pk-state-panel-title-color, var(--pk-color-gray-900));
            font-size: var(--pk-state-panel-title-size, var(--_pk-state-panel-title-size));
            font-weight: 600;
            line-height: 1.4;
        }

        .title ::slotted(*) {
            margin: 0;
            color: inherit;
            font: inherit;
        }

        .body {
            max-width: 100%;
            margin-top: var(--_pk-state-panel-body-margin-top);
        }

        .body ::slotted(*) {
            margin-block: 0;
        }

        .details {
            width: 100%;
            margin-top: var(--_pk-state-panel-details-margin-top);
            color: var(--pk-state-panel-accent);
            font-size: var(--_pk-state-panel-details-font-size);
        }

        summary {
            width: fit-content;
            margin-inline: auto;
            border-radius: var(--pk-radius-sm);
            cursor: pointer;
        }

        summary:focus-visible,
        .copy:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
        }

        .details-content {
            position: relative;
            margin-top: var(--_pk-state-panel-details-content-margin-top);
            color: var(--pk-color-gray-800);
            text-align: start;
        }

        .details-scroll {
            min-width: 0;
        }

        .details-content ::slotted(pre) {
            box-sizing: border-box;
            max-height: var(
                --pk-state-panel-details-max-height,
                var(--_pk-state-panel-details-max-height)
            );
            margin: 0;
            padding: var(--_pk-state-panel-details-pre-padding);
            overflow: auto;
            border: 1px solid var(--pk-color-gray-200);
            border-radius: var(--_pk-state-panel-details-pre-radius);
            background: var(--pk-color-white);
            color: var(--pk-color-gray-800);
            font:
                var(--_pk-state-panel-details-pre-font-size)/1.5 ui-monospace,
                SFMono-Regular,
                Consolas,
                'Liberation Mono',
                monospace;
            overflow-wrap: anywhere;
            user-select: text;
            white-space: pre-wrap;
        }

        :host([copyable]) .details-content ::slotted(pre) {
            max-height: none;
            padding-inline-end: calc(
                var(--_pk-state-panel-details-pre-padding) +
                    var(--_pk-state-panel-copy-button-size) +
                    var(--_pk-state-panel-copy-inset)
            );
            overflow: visible;
            border: 0;
            border-radius: 0;
            background: transparent;
        }

        :host([copyable]) .details-content {
            overflow: hidden;
            border: 1px solid var(--pk-color-gray-200);
            border-radius: var(--_pk-state-panel-details-pre-radius);
            background: var(--pk-color-white);
        }

        :host([copyable]) .details-scroll {
            position: relative;
            max-height: var(
                --pk-state-panel-details-max-height,
                var(--_pk-state-panel-details-max-height)
            );
            overflow: auto;
        }

        .copy-overlay {
            position: sticky;
            z-index: 1;
            top: 0;
            display: flex;
            justify-content: flex-end;
            height: 0;
            pointer-events: none;
        }

        .copy {
            flex: none;
            margin-block-start: var(--_pk-state-panel-copy-inset);
            margin-inline-end: var(--_pk-state-panel-copy-inset);
            pointer-events: auto;
            --pk-btn-height-default: var(--_pk-state-panel-copy-button-size);
            --pk-btn-icon-size-default: var(--_pk-state-panel-copy-icon-size);
            --pk-btn-radius-default: var(--_pk-state-panel-copy-radius);
            --pk-copy-button-background: var(--pk-color-white);
            --pk-copy-button-border-color: transparent;
            --pk-copy-button-hover-border-color: transparent;
            --pk-copy-button-color: var(--pk-color-gray-300);
            --pk-copy-button-hover-color: var(--pk-color-gray-500);
            --pk-copy-button-hover-background: color-mix(
                in srgb,
                var(--pk-color-gray-300) 6%,
                var(--pk-color-white)
            );
        }

        .copy-status {
            display: block;
            margin-top: 0.375rem;
            color: var(--pk-color-red-700);
            font-size: var(--_pk-state-panel-copy-status-size);
            text-align: start;
        }

        .copy-status:not([data-error]) {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: var(--_pk-state-panel-actions-gap);
            margin-top: var(--_pk-state-panel-actions-margin-top);
        }

        .actions slot::slotted(pk-button) {
            --pk-btn-height-default: var(--_pk-state-panel-action-height);
            --pk-btn-font-default: var(--_pk-state-panel-action-font);
            --pk-btn-padding-inline-default: var(--_pk-state-panel-action-padding-inline);
            --pk-btn-icon-size-default: var(--_pk-state-panel-action-icon-size);
            --pk-btn-icon-gap-default: var(--_pk-state-panel-action-icon-gap);
            --pk-btn-caret-size-default: var(--_pk-state-panel-action-caret-size);
            --pk-btn-radius-default: var(--_pk-state-panel-action-radius);
        }
    }
`;
//#endregion
//#region src/components/state-panel/pk-state-panel.ts
var COPY_STATUS_RESET_MS = 3e3;
var defaultIcons = {
	empty: icons_exports.emptySet,
	info: icons_exports.circleInfo,
	success: icons_exports.circleCheck,
	warning: icons_exports.triangleExclamation,
	error: icons_exports.triangleExclamation
};
var PkStatePanel = class PkStatePanel extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.hasSlotController = new HasSlotController(this, "title", "icon", "details", "actions");
		this.variant = "empty";
		this.size = "default";
		this.heading = "";
		this.headingLevel = 2;
		this.icon = "";
		this.hideIcon = false;
		this.announce = "off";
		this.detailsLabel = "Details";
		this.detailsOpen = false;
		this.copyable = false;
		this.copyLabel = "Copy details";
		this.copiedLabel = "Details copied.";
		this.copyErrorLabel = "Copy failed. Select the details and copy them manually.";
		this.copyStatus = "";
		this.copyFailed = false;
	}
	static {
		this.styles = pkStatePanelStyles;
	}
	disconnectedCallback() {
		window.clearTimeout(this.copyStatusResetTimer);
		super.disconnectedCallback();
	}
	hasTitle() {
		return Boolean(this.heading) || this.hasSlotController.test("title");
	}
	get detailsValue() {
		return (this.detailsSlot?.assignedNodes({ flatten: true }) ?? []).map((node) => node.textContent ?? "").join("").trim();
	}
	resetCopyStatusLater() {
		window.clearTimeout(this.copyStatusResetTimer);
		this.copyStatusResetTimer = window.setTimeout(() => {
			this.copyStatus = "";
			this.copyFailed = false;
		}, COPY_STATUS_RESET_MS);
	}
	showCopySuccess() {
		this.copyFailed = false;
		this.copyStatus = this.copiedLabel;
		this.resetCopyStatusLater();
	}
	showCopyError() {
		this.copyFailed = true;
		this.copyStatus = this.copyErrorLabel;
		this.resetCopyStatusLater();
	}
	handleCopySuccess() {
		this.showCopySuccess();
	}
	handleCopyError() {
		this.showCopyError();
		this.selectDetails();
	}
	selectDetails() {
		const nodes = this.detailsSlot?.assignedNodes({ flatten: true }) ?? [];
		const first = nodes[0];
		const last = nodes[nodes.length - 1];
		if (!first || !last) return;
		this.detailsOpen = true;
		const range = document.createRange();
		range.setStartBefore(first);
		range.setEndAfter(last);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
	}
	/** Copy the plain text assigned to the details slot. */
	async copyDetails() {
		const value = this.detailsValue;
		if (!value) {
			this.showCopyError();
			this.dispatchEvent(new PkCopyErrorEvent());
			return;
		}
		if (this.copyButton) {
			this.copyButton.value = value;
			await this.copyButton.copy();
			return;
		}
		try {
			await copyToClipboard(value);
			this.showCopySuccess();
			const copyEvent = new PkCopyEvent(value);
			this.dispatchEvent(copyEvent);
		} catch {
			this.showCopyError();
			this.selectDetails();
			this.dispatchEvent(new PkCopyErrorEvent());
		}
	}
	handleDetailsToggle(event) {
		this.detailsOpen = event.currentTarget.open;
	}
	renderIcon() {
		if (this.hideIcon) return nothing;
		let icon;
		if (this.hasSlotController.test("icon")) icon = html`<slot name="icon"></slot>`;
		else if (this.icon) icon = html`<pk-icon .icon=${this.icon}></pk-icon>`;
		else icon = unsafeSVG(renderIconHtml(defaultIcons[this.variant] ?? defaultIcons.empty));
		return html`
            <span part="icon-shell" class="icon-shell" aria-hidden="true">
                <span part="icon" class="icon">${icon}</span>
            </span>
        `;
	}
	render() {
		const role = this.announce === "assertive" ? "alert" : this.announce === "polite" ? "status" : nothing;
		const live = this.announce === "off" ? nothing : this.announce;
		const hasDetails = this.hasSlotController.test("details");
		const hasActions = this.hasSlotController.test("actions");
		return html`
            <div
                part="base"
                class="panel"
                role=${role}
                aria-live=${live}
                aria-atomic=${this.announce === "off" ? nothing : "true"}
            >
                ${this.renderIcon()}

                ${this.hasTitle() ? html`
                        <div
                            part="title"
                            class="title"
                            role="heading"
                            aria-level=${this.headingLevel}
                        >
                            ${this.hasSlotController.test("title") ? html`<slot name="title"></slot>` : this.heading}
                        </div>
                    ` : nothing}

                <div part="body" class="body"><slot></slot></div>

                ${hasDetails ? html`
                        <details
                            part="details"
                            class="details"
                            ?open=${this.detailsOpen}
                            @toggle=${this.handleDetailsToggle}
                        >
                            <summary part="details-summary">${this.detailsLabel}</summary>
                            <div part="details-content" class="details-content">
                                <div class="details-scroll">
                                    ${this.copyable ? html`
                                            <div class="copy-overlay">
                                                <pk-copy-button
                                                    part="copy-button"
                                                    class="copy"
                                                    variant="transparent"
                                                    aria-label=${this.copyLabel}
                                                    .copiedLabel=${this.copiedLabel}
                                                    .value=${this.detailsValue}
                                                    @pk-copy=${this.handleCopySuccess}
                                                    @pk-copy-error=${this.handleCopyError}
                                                ></pk-copy-button>
                                            </div>
                                        ` : nothing}
                                    <slot name="details"></slot>
                                </div>
                            </div>

                            ${this.copyable ? html`
                                    <span
                                        part="copy-status"
                                        class="copy-status"
                                        data-error=${this.copyFailed ? "" : nothing}
                                        role="status"
                                        aria-live="polite"
                                    >${this.copyStatus}</span>
                                ` : nothing}
                        </details>
                    ` : nothing}

                ${hasActions ? html`<div part="actions" class="actions"><slot name="actions"></slot></div>` : nothing}
            </div>
        `;
	}
};
__decorate([property({ reflect: true })], PkStatePanel.prototype, "variant", void 0);
__decorate([property({ reflect: true })], PkStatePanel.prototype, "size", void 0);
__decorate([property()], PkStatePanel.prototype, "heading", void 0);
__decorate([property({
	type: Number,
	attribute: "heading-level"
})], PkStatePanel.prototype, "headingLevel", void 0);
__decorate([property()], PkStatePanel.prototype, "icon", void 0);
__decorate([property({
	type: Boolean,
	attribute: "hide-icon",
	reflect: true
})], PkStatePanel.prototype, "hideIcon", void 0);
__decorate([property({ reflect: true })], PkStatePanel.prototype, "announce", void 0);
__decorate([property({ attribute: "details-label" })], PkStatePanel.prototype, "detailsLabel", void 0);
__decorate([property({
	type: Boolean,
	attribute: "details-open",
	reflect: true
})], PkStatePanel.prototype, "detailsOpen", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkStatePanel.prototype, "copyable", void 0);
__decorate([property({ attribute: "copy-label" })], PkStatePanel.prototype, "copyLabel", void 0);
__decorate([property({ attribute: "copied-label" })], PkStatePanel.prototype, "copiedLabel", void 0);
__decorate([property({ attribute: "copy-error-label" })], PkStatePanel.prototype, "copyErrorLabel", void 0);
__decorate([query("slot[name=\"details\"]")], PkStatePanel.prototype, "detailsSlot", void 0);
__decorate([query("pk-copy-button.copy")], PkStatePanel.prototype, "copyButton", void 0);
__decorate([state()], PkStatePanel.prototype, "copyStatus", void 0);
__decorate([state()], PkStatePanel.prototype, "copyFailed", void 0);
PkStatePanel = __decorate([customElement("pk-state-panel")], PkStatePanel);
//#endregion
export { PkStatePanel as t };

//# sourceMappingURL=pk-state-panel-DPP7t-er.js.map