import { f as A, l as n, m as i, p as b, s as e, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles } from "./pk-base-BlxAYXJD.js";
import { t as MirrorValidator } from "./mirror-validator-DEz3BsbN.js";
import { t as RequiredValidator } from "./required-validator-DXqqPVeW.js";
import { t as HasSlotController } from "./has-slot-BZDcCpf9.js";
import { n as readLegacyInstructions, t as hasInstructionContent } from "./field-labels-Vo3wHq49.js";
//#region src/components/lightswitch/pk-lightswitch.styles.ts
var pkLightswitchStyles = i`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
            --pk-lightswitch-border-color: var(--pk-color-slate-800);
            --pk-lightswitch-track-off: var(--pk-color-gray-200);
            --pk-lightswitch-track-on: var(--pk-color-teal-550);
            --pk-lightswitch-track-on-border: var(--pk-color-teal-550-border);
            --pk-lightswitch-focus-shadow: 0 0 0 1px #fff, 0 0 0 3px var(--pk-color-sky-600),
                0 0 6px 1px hsl(from var(--pk-color-sky-600) h s l / 0.8);
            --pk-lightswitch-invalid-shadow: 0 0 0 1px #fff, 0 0 0 2.5px var(--pk-color-rose-600);
            --pk-lightswitch-invalid-focus-shadow: 0 0 0 1px #fff, 0 0 0 3px var(--pk-color-rose-600),
                0 0 6px 1px hsl(from var(--pk-color-rose-600) h s l / 0.8);
        }

        :host([disabled]) {
            cursor: not-allowed;
        }

        .base {
            display: inline-flex;
            align-items: flex-start;
            gap: 0.5rem;
        }

        :host([disabled]) .base {
            opacity: 0.5;
        }

        .content {
            min-width: 0;
            cursor: pointer;
            user-select: none;
        }

        :host([disabled]) .content {
            cursor: not-allowed;
        }

        .label {
            display: block;
            /* Match checkbox / radio option labels (gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            line-height: 1rem;
        }

        .label:empty {
            display: none;
        }

        .instructions:empty,
        .hint:empty {
            display: none;
        }

        .switch {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 11px;
            background: var(--pk-lightswitch-track-off, #d8dee7);
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-border-color, #667c92);
            cursor: pointer;
            user-select: none;
            appearance: none;
            transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }

        .switch:focus {
            outline: none;
        }

        .switch:focus-visible {
            box-shadow: var(--pk-lightswitch-focus-shadow);
        }

        .switch[aria-checked='true'] {
            background: var(--pk-lightswitch-track-on, #0f9d8a);
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-track-on-border, #007d6f);
        }

        .switch[aria-checked='true']:focus-visible {
            box-shadow: var(--pk-lightswitch-focus-shadow);
        }

        :host([invalid]) .switch,
        :host(:state(user-invalid)) .switch,
        .switch[aria-invalid='true'] {
            box-shadow: var(--pk-lightswitch-invalid-shadow);
        }

        :host([invalid]) .switch[aria-checked='true'],
        :host(:state(user-invalid)) .switch[aria-checked='true'],
        .switch[aria-invalid='true'][aria-checked='true'] {
            background: var(--pk-lightswitch-track-on);
        }

        :host([invalid]) .switch:focus-visible,
        :host(:state(user-invalid)) .switch:focus-visible,
        .switch[aria-invalid='true']:focus-visible {
            box-shadow: var(--pk-lightswitch-invalid-focus-shadow);
        }

        .switch:disabled {
            cursor: not-allowed;
        }

        :host([size='default']) .switch {
            width: 34px;
            height: 22px;
        }

        :host([size='sm']) .switch {
            width: 28px;
            height: 18px;
            border-radius: 9px;
        }

        :host([size='xs']) .switch {
            width: 24px;
            height: 16px;
            border-radius: 8px;
        }

        :host([size='xxs']) .switch {
            width: 24px;
            height: 14px;
            border-radius: 7px;
        }

        .thumb {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--pk-color-white, #fff);
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-border-color, #667c92);
            pointer-events: none;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        :host([size='default']) .thumb {
            width: 18px;
            height: 18px;
            transform: translateX(2px);
        }

        :host([size='default']) .switch[aria-checked='true'] .thumb {
            transform: translateX(calc(100% - 4px));
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-track-on-border);
        }

        :host([size='sm']) .thumb {
            width: 14px;
            height: 14px;
            transform: translateX(2px);
        }

        :host([size='sm']) .switch[aria-checked='true'] .thumb {
            transform: translateX(calc(100% - 2px));
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-track-on-border);
        }

        :host([size='xs']) .thumb {
            width: 12px;
            height: 12px;
            transform: translateX(2px);
        }

        :host([size='xs']) .switch[aria-checked='true'] .thumb {
            transform: translateX(calc(100% - 2px));
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-track-on-border);
        }

        :host([size='xxs']) .thumb {
            width: 10px;
            height: 10px;
            transform: translateX(2px);
        }

        :host([size='xxs']) .switch[aria-checked='true'] .thumb {
            transform: translateX(12px);
            box-shadow: inset 0 0 0 1px var(--pk-lightswitch-track-on-border, #007d6f);
        }

        .thumb svg {
            width: 14px;
            height: 14px;
            color: var(--pk-lightswitch-track-on);
            opacity: 0;
            transform: translateY(1px);
            transition: opacity 0.15s ease;
        }

        .switch[aria-checked='true'] .thumb svg {
            opacity: 1;
        }

        :host([size='sm']) .thumb svg {
            width: 10px;
            height: 10px;
        }

        :host([size='xs']) .thumb svg,
        :host([size='xxs']) .thumb svg {
            display: none;
        }

        .input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
            opacity: 0;
        }
    }
`;
//#endregion
//#region src/components/lightswitch/pk-lightswitch.ts
var CHECK_ICON = b`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
        <path fill="currentColor" d="M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z" />
    </svg>
`;
var PkLightswitch = class PkLightswitch extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["change"];
		this.hasSlotController = new HasSlotController(this, "instructions", "hint");
		this.checked = false;
		this.defaultChecked = false;
		this.invalid = false;
		this.size = "default";
		this.value = "on";
		this.label = "";
		this.instructions = "";
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	static {
		this.styles = [formControlStyles, pkLightswitchStyles];
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			RequiredValidator({ validationProperty: "checked" })
		];
	}
	connectedCallback() {
		this.instructions = readLegacyInstructions(this, this.instructions);
		super.connectedCallback();
	}
	get validationTarget() {
		return this.input;
	}
	syncFormValue() {
		this.setFormValue(this.checked ? this.value : null, this.checked ? "on" : "off");
	}
	resetToDefaultValue() {
		this.checked = this.defaultChecked;
	}
	restoreFormState(state) {
		if (state === "on" || state === this.value) this.checked = true;
		else this.checked = false;
	}
	updated(changed) {
		if (this.input && changed.has("checked")) this.input.checked = this.checked;
		super.updated(changed);
	}
	click() {
		this.switchElement?.click();
	}
	focus(options) {
		this.switchElement?.focus(options);
	}
	blur() {
		this.switchElement?.blur();
	}
	toggle() {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.emitCheckedChange();
	}
	handleKeyDown(event) {
		const isRtl = this.matches(":dir(rtl)");
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			this.toggle();
			return;
		}
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			this.checked = isRtl;
			this.emitCheckedChange();
			return;
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			this.checked = !isRtl;
			this.emitCheckedChange();
		}
	}
	emitCheckedChange() {
		this.hasInteracted = true;
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { checked: this.checked },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	handleLabelClick(event) {
		if (this.disabled || event.target === this.switchElement) return;
		this.toggle();
	}
	hasLabelContent() {
		if (this.label) return true;
		const slot = this.shadowRoot?.querySelector("slot:not([name])");
		if (!slot) return false;
		return slot.assignedNodes({ flatten: true }).some((node) => {
			if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}
	render() {
		const hasInstructions = hasInstructionContent((name, flag) => this.hasSlotController.test(name, flag), this.instructions);
		const hasLabel = this.hasLabelContent();
		return b`
            <div part="base" class="base">
                <button
                    part="switch"
                    class="switch"
                    type="button"
                    role="switch"
                    ?disabled=${this.disabled}
                    aria-checked=${this.checked ? "true" : "false"}
                    aria-invalid=${this.invalid ? "true" : A}
                    aria-describedby=${hasInstructions ? "instructions" : A}
                    aria-labelledby=${hasLabel ? "label" : A}
                    @click=${this.toggle}
                    @keydown=${this.handleKeyDown}
                >
                    <span part="thumb" class="thumb">${CHECK_ICON}</span>
                </button>
                <input
                    part="input"
                    class="input"
                    type="checkbox"
                    tabindex="-1"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    value=${this.value}
                    aria-invalid=${this.invalid ? "true" : A}
                    @change=${(event) => event.stopPropagation()}
                />
                ${hasLabel || hasInstructions ? b`
                        <div class="content" @click=${this.handleLabelClick}>
                            ${hasLabel ? b`
                                    <span part="label" class="label" id="label">
                                        <slot></slot>${this.label}
                                    </span>
                                ` : A}
                            ${hasInstructions ? b`
                                    <span part="instructions" class="instructions form-control__instructions" id="instructions">
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </span>
                                ` : A}
                        </div>
                    ` : A}
            </div>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkLightswitch.prototype, "checked", void 0);
__decorate([n({
	attribute: "default-checked",
	type: Boolean
})], PkLightswitch.prototype, "defaultChecked", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkLightswitch.prototype, "invalid", void 0);
__decorate([n({ reflect: true })], PkLightswitch.prototype, "size", void 0);
__decorate([n()], PkLightswitch.prototype, "value", void 0);
__decorate([n()], PkLightswitch.prototype, "label", void 0);
__decorate([n()], PkLightswitch.prototype, "instructions", void 0);
__decorate([e(".input")], PkLightswitch.prototype, "input", void 0);
__decorate([e("[part=\"switch\"]")], PkLightswitch.prototype, "switchElement", void 0);
PkLightswitch = __decorate([t("pk-lightswitch")], PkLightswitch);
//#endregion
export { PkLightswitch as t };
