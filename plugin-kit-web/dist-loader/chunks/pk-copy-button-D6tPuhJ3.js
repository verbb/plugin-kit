import { c as customElement, m as i, o as r, p as b, s as n, u as o } from "./lit-B6nFKgbW.js";
import { c as __decorate, l as PkElement } from "./pk-base-BGegy7-X.js";
import { C as copy, m as check } from "./svg-BRgqS9vA.js";
import { n as renderIconHtml } from "./render-D9G_a_c2.js";
import { t as HasSlotController } from "./has-slot-DJv86HKx.js";
import "./pk-button-DV9Tk5Pd.js";
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
            border-color: var(--pk-copy-button-border-color);
            border-radius: var(--pk-copy-button-radius);
            background: var(--pk-copy-button-background);
            color: var(--pk-copy-button-color);
        }

        pk-button::part(base):hover:not(:disabled) {
            border-color: var(
                --pk-copy-button-hover-border-color,
                var(--pk-copy-button-border-color)
            );
            background: var(--pk-copy-button-hover-background);
            color: var(--pk-copy-button-hover-color, var(--pk-copy-button-color));
        }

        /*
         * In-control trailing action (slot=end on pk-input, etc.): same family as
         * combobox expand/clear and image-browser clear — flex-reserved hit box
         * flush to the field edge, glyph sized via --pk-input-decoration-size.
         */
        :host([slot='end']) {
            display: inline-flex;
            align-self: stretch;
            height: auto;
            /* size=none buttons resolve --pk-btn-icon-size: 1em against this. */
            font-size: var(--pk-input-decoration-size, 0.75rem);
        }

        :host([slot='end']) pk-button {
            display: flex;
            height: 100%;
        }

        :host([slot='end']) pk-button::part(base) {
            box-sizing: border-box;
            width: calc(
                var(--pk-input-decoration-size, 0.75rem) + var(--pk-input-padding-inline, 8px)
            );
            min-width: calc(
                var(--pk-input-decoration-size, 0.75rem) + var(--pk-input-padding-inline, 8px)
            );
            height: 100%;
            min-height: 100%;
            padding: 0;
            border-width: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
        }

        :host([slot='end']) pk-button::part(base):hover:not(:disabled) {
            color: var(--pk-color-gray-800);
        }
    }
`;
//#endregion
//#region src/components/copy-button/pk-copy-button.ts
var SUCCESS_ICON = renderIconHtml(check).replace("<svg", "<svg slot=\"start\" part=\"success-icon\"");
var COPY_ICON = renderIconHtml(copy).replace("<svg", "<svg slot=\"start\" part=\"copy-icon\"");
var COPIED_RESET_MS = 2e3;
var PkCopyButton = class PkCopyButton extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.hasSlotController = new HasSlotController(this, "icon");
		this.value = "";
		this.from = "";
		this.disabled = false;
		this.variant = "transparent";
		this.ariaLabel = "Copy";
		this.copiedLabel = "Copied";
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
	/** Copy the configured value and emit the corresponding result event. */
	async copy() {
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
		const inControl = this.getAttribute("slot") === "end";
		return b`
            <pk-button
                part="button"
                variant=${inControl ? "none" : this.variant}
                size=${inControl ? "none" : "default"}
                ?icon=${inControl}
                aria-label=${this.copied ? this.copiedLabel : this.ariaLabel}
                ?disabled=${this.disabled}
                @click=${this.copy}
            >
                ${this.copied ? o(SUCCESS_ICON) : this.hasSlotController.test("icon") ? b`<slot name="icon" slot="start"></slot>` : o(COPY_ICON)}
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
__decorate([n({ attribute: "aria-label" })], PkCopyButton.prototype, "ariaLabel", void 0);
__decorate([n({ attribute: "copied-label" })], PkCopyButton.prototype, "copiedLabel", void 0);
__decorate([r()], PkCopyButton.prototype, "copied", void 0);
PkCopyButton = __decorate([customElement("pk-copy-button")], PkCopyButton);
//#endregion
export { PkCopyEvent as i, copyToClipboard as n, PkCopyErrorEvent as r, PkCopyButton as t };
