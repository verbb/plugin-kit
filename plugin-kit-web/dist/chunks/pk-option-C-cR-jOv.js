import { t as icons_exports } from "./icons-BR8JcQj2.js";
import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { n as renderIconHtml } from "./render-Dvc3MHQR.js";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
//#region src/utils/highlight-text.ts
/** Split label text into matched/unmatched segments for typeahead highlighting. */
function splitHighlightParts(text, search) {
	const label = String(text ?? "");
	const query = String(search ?? "").trim();
	if (!query) return [{
		text: label,
		match: false
	}];
	const lowerLabel = label.toLowerCase();
	const lowerQuery = query.toLowerCase();
	const parts = [];
	let cursor = 0;
	let matchIndex = lowerLabel.indexOf(lowerQuery);
	while (matchIndex !== -1) {
		if (matchIndex > cursor) parts.push({
			text: label.slice(cursor, matchIndex),
			match: false
		});
		parts.push({
			text: label.slice(matchIndex, matchIndex + query.length),
			match: true
		});
		cursor = matchIndex + query.length;
		matchIndex = lowerLabel.indexOf(lowerQuery, cursor);
	}
	if (cursor < label.length) parts.push({
		text: label.slice(cursor),
		match: false
	});
	return parts.length > 0 ? parts : [{
		text: label,
		match: false
	}];
}
//#endregion
//#region src/components/select/pk-option.styles.ts
var pkOptionStyles = css`
    @layer pk-component {
        :host {
            display: block;
            /*
             * Slotted option labels inherit type metrics from this host (same
             * Craft-vs-Tailwind trap as pk-dropdown-item). Size tokens arrive via
             * pk-select ::slotted(pk-option) custom properties.
             */
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            color: var(--pk-color-gray-700);
        }

        .option {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block, 6px);
            padding-inline-start: var(--pk-select-item-padding-inline, 10px);
            padding-inline-end: var(--pk-select-item-padding-inline-end, 2rem);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            background: transparent;
            color: inherit;
            font: inherit;
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
        }

        :host([data-has-start]) .start {
            display: inline-flex;
        }

        :host([hidden]) {
            display: none !important;
        }

        .option:focus-visible,
        :host([highlighted]) .option {
            background: var(--pk-color-slate-100);
        }

        :host([disabled]) .option,
        .option[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .check {
            position: absolute;
            inset-inline-end: var(--pk-select-item-indicator-inset, 0.5rem);
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            color: var(--pk-color-gray-700);
            pointer-events: none;
            transform: translateY(-50%);
            line-height: 0;
        }

        :host([selected]) .check {
            display: inline-flex;
        }

        .check svg {
            display: block;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            flex-shrink: 0;
            pointer-events: none;
        }

        .label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            /* Allow custom multi-line option layouts (title + subtitle) to stack. */
            white-space: normal;
        }

        .match {
            padding: 0;
            border-radius: 2px;
            background: var(--pk-color-blue-100);
            color: inherit;
        }
    }
`;
//#endregion
//#region src/components/select/pk-option.ts
var CHECK_ICON = renderIconHtml(icons_exports.check);
var PkOption = class PkOption extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.label = "";
		this.disabled = false;
		this.selected = false;
		this.highlighted = false;
		this.hidden = false;
		this.focusIndex = -1;
		this.optionId = "";
		this.matchQuery = "";
	}
	static {
		this.styles = pkOptionStyles;
	}
	focusControl(preventScroll = true) {
		this.shadowRoot?.querySelector(".option")?.focus({ preventScroll });
	}
	/**
	* Label for the closed combobox/select value.
	* Prefers the `label` attribute when set; otherwise default-slot text
	* (excluding `slot="start"`), joined with spaces for multi-node layouts.
	*/
	getLabel() {
		if (this.label.trim()) return this.label.trim();
		const labelSlot = this.shadowRoot?.querySelector("slot:not([name])");
		if (!labelSlot) return this.textContent?.trim() ?? this.value;
		return labelSlot.assignedNodes().map((node) => (node.textContent ?? "").trim()).filter(Boolean).join(" ").trim();
	}
	/** Full default-slot text for typeahead matching (includes subtitle lines). */
	getSearchText() {
		const labelSlot = this.shadowRoot?.querySelector("slot:not([name])");
		if (!labelSlot) return this.getLabel();
		return labelSlot.assignedNodes().map((node) => (node.textContent ?? "").trim()).filter(Boolean).join(" ").trim() || this.getLabel();
	}
	/** True when the default slot has element children (custom multi-line / rich layouts). */
	hasRichLabelContent() {
		return [...this.children].some((node) => {
			if (!(node instanceof HTMLElement)) return false;
			return !node.slot || node.slot === "";
		});
	}
	/** Light-DOM elements assigned to the start decoration slot. */
	getStartElements() {
		return [...this.querySelectorAll(":scope > [slot=\"start\"]")].filter((node) => node instanceof HTMLElement);
	}
	firstUpdated() {
		(this.shadowRoot?.querySelector("slot[name=\"start\"]"))?.addEventListener("slotchange", () => this.syncStartDecoration());
		this.syncStartDecoration();
	}
	syncStartDecoration() {
		this.toggleAttribute("data-has-start", this.getStartElements().length > 0);
	}
	handleClick() {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent("pk-option-select", {
			detail: { value: this.value },
			bubbles: true,
			composed: true
		}));
	}
	handleMouseEnter() {
		if (this.disabled || this.hidden) return;
		this.dispatchEvent(new CustomEvent("pk-option-highlight", {
			detail: { value: this.value },
			bubbles: true,
			composed: true
		}));
	}
	handleKeyDown(event) {
		if (!new Set([
			"ArrowDown",
			"ArrowUp",
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End",
			"Enter",
			" ",
			"Escape"
		]).has(event.key)) return;
		const owner = this.closest("pk-select, pk-combobox");
		const panel = owner ? null : this.closest("[role=\"listbox\"]");
		if (!owner && !panel) return;
		event.preventDefault();
		event.stopPropagation();
		const keydownEvent = new CustomEvent("pk-listbox-keydown", {
			detail: { keyboardEvent: event },
			bubbles: true
		});
		if (owner) {
			owner.dispatchEvent(keydownEvent);
			return;
		}
		panel.dispatchEvent(keydownEvent);
	}
	renderLabel() {
		const query = this.matchQuery.trim();
		if (!query || this.hasRichLabelContent()) return html`
                <span part="label" class="label">
                    <slot></slot>
                </span>
            `;
		return html`
            <span part="label" class="label">
                ${splitHighlightParts(this.getLabel(), query).map((part) => part.match ? html`<mark class="match">${part.text}</mark>` : html`<span>${part.text}</span>`)}
            </span>
        `;
	}
	render() {
		return html`
            <button
                part="option"
                type="button"
                class="option"
                role="option"
                id=${this.optionId || nothing}
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? "true" : nothing}
                aria-selected=${this.selected ? "true" : "false"}
                tabindex=${this.focusIndex}
                @click=${this.handleClick}
                @mouseenter=${this.handleMouseEnter}
                @keydown=${this.handleKeyDown}
            >
                <span part="start" class="start">
                    <slot name="start"></slot>
                </span>
                ${this.renderLabel()}
                <span part="check" class="check" aria-hidden="true">${unsafeSVG(CHECK_ICON)}</span>
            </button>
        `;
	}
};
__decorate([property()], PkOption.prototype, "value", void 0);
__decorate([property()], PkOption.prototype, "label", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkOption.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkOption.prototype, "selected", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkOption.prototype, "highlighted", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkOption.prototype, "hidden", void 0);
__decorate([property({
	type: Number,
	attribute: "focus-index"
})], PkOption.prototype, "focusIndex", void 0);
__decorate([property()], PkOption.prototype, "optionId", void 0);
__decorate([property({ attribute: false })], PkOption.prototype, "matchQuery", void 0);
PkOption = __decorate([customElement("pk-option")], PkOption);
//#endregion
export { PkOption as t };

//# sourceMappingURL=pk-option-C-cR-jOv.js.map