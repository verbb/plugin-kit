import { c as r, l as n, m as i, o, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { p as check } from "../../chunks/icons-B1i-oRoD.js";
import { n as renderIconHtml } from "../../chunks/render-DApFfV9S.js";
//#region src/events/pk-copy.ts
/** Emitted when copy-button successfully copies text. */
var PkCopyEvent = class extends Event {
	constructor(value) {
		super("pk-copy", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
		this.detail = { value };
	}
};
/** Emitted when copy-button fails to copy text. */
var PkCopyErrorEvent = class extends Event {
	constructor() {
		super("pk-copy-error", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
//#endregion
//#region src/utils/copy-to-clipboard.ts
/** Writes text to the clipboard — requires a secure context in most browsers. */
async function copyToClipboard(value) {
	await navigator.clipboard.writeText(value);
}
/** Resolves the string to copy from a `from` selector (from selector). */
function resolveCopyValue(root, from, fallbackValue) {
	if (!from) return fallbackValue || null;
	const isProperty = from.includes(".");
	const isAttribute = from.includes("[") && from.includes("]");
	let id = from;
	let field = "";
	if (isProperty) [id, field] = from.trim().split(".");
	else if (isAttribute) [id, field] = from.trim().replace(/\]$/, "").split("[");
	const target = "getElementById" in root ? root.getElementById(id) : null;
	if (!target) return null;
	if (isAttribute) return target.getAttribute(field) ?? "";
	if (isProperty) {
		const propertyValue = target[field];
		return propertyValue == null ? "" : String(propertyValue);
	}
	return target.textContent ?? "";
}
//#endregion
//#region src/components/copy-button/pk-copy-button.styles.ts
var pkCopyButtonStyles = i`
    @layer pk-component {
        :host {
            display: inline-block;
        }

        /* Match React CopyButton size="icon" — square, no horizontal padding. */
        pk-button::part(base) {
            padding-inline: 0;
            width: var(--pk-btn-height-default);
            min-width: var(--pk-btn-height-default);
        }
    }
`;
//#endregion
//#region src/components/copy-button/pk-copy-button.ts
var SUCCESS_ICON = renderIconHtml(check).replace("<svg", "<svg slot=\"start\" part=\"success-icon\"");
var COPIED_RESET_MS = 2e3;
var PkCopyButton = class PkCopyButton extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.from = "";
		this.disabled = false;
		this.variant = "transparent";
		this.copied = false;
		this.resetCopied = () => {
			this.copied = false;
		};
	}
	static {
		this.styles = pkCopyButtonStyles;
	}
	disconnectedCallback() {
		window.clearTimeout(this.resetTimer);
		super.disconnectedCallback();
	}
	scheduleReset() {
		window.clearTimeout(this.resetTimer);
		this.resetTimer = window.setTimeout(this.resetCopied, COPIED_RESET_MS);
	}
	async handleCopy() {
		if (this.disabled) return;
		const valueToCopy = resolveCopyValue(this.getRootNode(), this.from, this.value);
		if (valueToCopy == null || valueToCopy === "") {
			this.dispatchEvent(new PkCopyErrorEvent());
			return;
		}
		try {
			await copyToClipboard(valueToCopy);
			this.copied = true;
			this.scheduleReset();
			this.dispatchEvent(new PkCopyEvent(valueToCopy));
		} catch {
			this.dispatchEvent(new PkCopyErrorEvent());
		}
	}
	render() {
		return b`
            <pk-button
                part="button"
                variant=${this.variant}
                size="default"
                title="Copy"
                ?disabled=${this.disabled}
                @click=${this.handleCopy}
            >
                ${this.copied ? o(SUCCESS_ICON) : b`<slot name="icon" slot="start"></slot>`}
            </pk-button>
        `;
	}
};
__decorate([n()], PkCopyButton.prototype, "value", void 0);
__decorate([n()], PkCopyButton.prototype, "from", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCopyButton.prototype, "disabled", void 0);
__decorate([n({ reflect: true })], PkCopyButton.prototype, "variant", void 0);
__decorate([r()], PkCopyButton.prototype, "copied", void 0);
PkCopyButton = __decorate([t("pk-copy-button")], PkCopyButton);
//#endregion
export { PkCopyButton };
