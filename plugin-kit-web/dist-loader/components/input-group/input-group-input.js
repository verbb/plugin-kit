import { f as A, l as n, m as i, p as b, r as o, s as e, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/input-group/pk-input-group-input.styles.ts
var pkInputGroupInputStyles = i`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            min-width: 0;
            align-self: stretch;
        }

        .input {
            display: block;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 6px 8px;
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
        }

        .input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        .input:disabled {
            cursor: not-allowed;
        }

        :host([size='xs']) .input {
            padding: 4px 6px;
            font-size: 11px;
        }

        :host([size='sm']) .input {
            padding: 4px 8px;
            font-size: 12px;
        }

        :host([size='lg']) .input {
            padding: 8px 12px;
            font-size: var(--pk-font-size-base);
        }

        :host([size='xl']) .input {
            padding: 10px 16px;
            font-size: 16px;
        }
    }
`;
//#endregion
//#region src/components/input-group/pk-input-group-input.ts
var PkInputGroupInput = class PkInputGroupInput extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.type = "text";
		this.size = "default";
		this.placeholder = "";
		this.value = "";
		this.disabled = false;
		this.readonly = false;
		this.invalid = false;
	}
	static {
		this.styles = pkInputGroupInputStyles;
	}
	focus(options) {
		this.inputElement?.focus(options);
	}
	render() {
		return b`
            <input
                part="input"
                class="input"
                data-slot="input-group-control"
                type=${this.type}
                .value=${this.value}
                placeholder=${this.placeholder}
                autocomplete=${o(this.autocomplete)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-invalid=${this.invalid ? "true" : A}
                @input=${this.handleInput}
            />
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
__decorate([e(".input")], PkInputGroupInput.prototype, "inputElement", void 0);
__decorate([n({ reflect: true })], PkInputGroupInput.prototype, "type", void 0);
__decorate([n({ reflect: true })], PkInputGroupInput.prototype, "size", void 0);
__decorate([n()], PkInputGroupInput.prototype, "placeholder", void 0);
__decorate([n({
	attribute: "value",
	reflect: true
})], PkInputGroupInput.prototype, "value", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInputGroupInput.prototype, "disabled", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInputGroupInput.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInputGroupInput.prototype, "invalid", void 0);
__decorate([n()], PkInputGroupInput.prototype, "autocomplete", void 0);
PkInputGroupInput = __decorate([t("pk-input-group-input")], PkInputGroupInput);
//#endregion
export { PkInputGroupInput };
