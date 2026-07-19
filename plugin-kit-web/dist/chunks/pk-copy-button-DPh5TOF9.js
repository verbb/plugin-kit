import { t as icons_exports } from "./icons-BR8JcQj2.js";
import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { n as renderIconHtml } from "./render-Dvc3MHQR.js";
import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
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
var pkCopyButtonStyles = css`
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
var SUCCESS_ICON = renderIconHtml(icons_exports.check).replace("<svg", "<svg slot=\"start\" part=\"success-icon\"");
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
		return html`
            <pk-button
                part="button"
                variant=${this.variant}
                size="default"
                title="Copy"
                ?disabled=${this.disabled}
                @click=${this.handleCopy}
            >
                ${this.copied ? unsafeHTML(SUCCESS_ICON) : html`<slot name="icon" slot="start"></slot>`}
            </pk-button>
        `;
	}
};
__decorate([property()], PkCopyButton.prototype, "value", void 0);
__decorate([property()], PkCopyButton.prototype, "from", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkCopyButton.prototype, "disabled", void 0);
__decorate([property({ reflect: true })], PkCopyButton.prototype, "variant", void 0);
__decorate([state()], PkCopyButton.prototype, "copied", void 0);
PkCopyButton = __decorate([customElement("pk-copy-button")], PkCopyButton);
//#endregion
export { PkCopyEvent as a, PkCopyErrorEvent as i, copyToClipboard as n, resolveCopyValue as r, PkCopyButton as t };

//# sourceMappingURL=pk-copy-button-DPh5TOF9.js.map