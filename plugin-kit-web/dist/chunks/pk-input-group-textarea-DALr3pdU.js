import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
//#region src/components/input-group/pk-input-group-textarea.styles.ts
var pkInputGroupTextareaStyles = css`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            min-width: 0;
            align-self: stretch;
        }

        .textarea {
            display: block;
            width: 100%;
            min-width: 0;
            min-height: 5rem;
            margin: 0;
            padding: 7px 10px;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: 1.4;
            appearance: none;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            resize: none;
        }

        .textarea::placeholder {
            color: var(--pk-color-gray-400);
        }

        .textarea:disabled {
            cursor: not-allowed;
        }
    }
`;
//#endregion
//#region src/components/input-group/pk-input-group-textarea.ts
var PkInputGroupTextarea = class PkInputGroupTextarea extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.placeholder = "";
		this.value = "";
		this.disabled = false;
		this.readonly = false;
		this.invalid = false;
		this.rows = 3;
	}
	static {
		this.styles = pkInputGroupTextareaStyles;
	}
	focus(options) {
		this.textareaElement?.focus(options);
	}
	render() {
		return html`
            <textarea
                part="textarea"
                class="textarea"
                data-slot="input-group-control"
                rows=${this.rows}
                .value=${this.value}
                placeholder=${this.placeholder}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-invalid=${this.invalid ? "true" : nothing}
                @input=${this.handleInput}
            ></textarea>
        `;
	}
	handleInput(event) {
		const target = event.target;
		this.value = target.value;
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
};
__decorate([query(".textarea")], PkInputGroupTextarea.prototype, "textareaElement", void 0);
__decorate([property()], PkInputGroupTextarea.prototype, "placeholder", void 0);
__decorate([property({
	attribute: "value",
	reflect: true
})], PkInputGroupTextarea.prototype, "value", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkInputGroupTextarea.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkInputGroupTextarea.prototype, "readonly", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkInputGroupTextarea.prototype, "invalid", void 0);
__decorate([property({ type: Number })], PkInputGroupTextarea.prototype, "rows", void 0);
PkInputGroupTextarea = __decorate([customElement("pk-input-group-textarea")], PkInputGroupTextarea);
//#endregion
export { PkInputGroupTextarea as t };

//# sourceMappingURL=pk-input-group-textarea-DALr3pdU.js.map