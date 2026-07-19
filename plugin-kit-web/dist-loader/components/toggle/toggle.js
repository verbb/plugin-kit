import { f as A, l as n, m as i, p as b, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { i as buttonGroupIndentStyles, n as buttonGroupCornerRadiusStyles, r as buttonGroupCornerRoleStyles, t as buttonGroupBorderJoinStyles } from "../../chunks/button-group-item.styles-Dwakbyx5.js";
//#region src/components/toggle/pk-toggle.styles.ts
var pkToggleStyles = [
	buttonGroupCornerRoleStyles(),
	buttonGroupCornerRadiusStyles(".button"),
	buttonGroupIndentStyles(),
	buttonGroupBorderJoinStyles(".button"),
	i`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            min-width: 2rem;
            height: 2rem;
            margin: 0;
            padding: 0 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-lg);
            background: transparent;
            color: inherit;
            font: inherit;
            line-height: 1.4;
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
            appearance: none;
            transition: background-color 0.12s ease, box-shadow 0.12s ease;
        }

        .button:focus {
            outline: none;
        }

        .button:focus-visible {
            box-shadow: var(--pk-shadow-focus);
        }

        .button[aria-pressed='true'],
        .button[data-state='on'] {
            background: var(--pk-color-slate-250);
        }

        .button:hover:not(:disabled) {
            background: var(--pk-color-slate-250);
        }

        .button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
            pointer-events: none;
        }

        :host([variant='outline']) .button {
            border: 1px solid var(--pk-color-slate-300);
            background: transparent;
            color: var(--pk-color-gray-700);
        }

        :host([variant='outline']) .button:hover:not(:disabled),
        :host([variant='outline']) .button[aria-pressed='true'],
        :host([variant='outline']) .button[data-state='on'],
        :host([variant='outline'][pressed]) .button {
            background: var(--pk-color-slate-250);
        }

        :host([size='sm']) .button {
            min-width: 1.75rem;
            height: 1.75rem;
            padding-inline: 0.375rem;
            font-size: 0.8rem;
            border-radius: min(var(--pk-radius-md), 12px);
        }

        :host([size='lg']) .button {
            min-width: 2.25rem;
            height: 2.25rem;
            padding-inline: 0.625rem;
        }

        .button ::slotted(svg) {
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
            pointer-events: none;
        }

        :host([data-pk-group-join]) .button:focus-visible {
            z-index: 1;
            position: relative;
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-first][data-pk-group-orientation='horizontal']) .button {
            border-top-left-radius: min(var(--pk-radius-md), 12px);
            border-bottom-left-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-last][data-pk-group-orientation='horizontal']) .button {
            border-top-right-radius: min(var(--pk-radius-md), 12px);
            border-bottom-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-first][data-pk-group-orientation='vertical']) .button {
            border-top-left-radius: min(var(--pk-radius-md), 12px);
            border-top-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-last][data-pk-group-orientation='vertical']) .button {
            border-bottom-left-radius: min(var(--pk-radius-md), 12px);
            border-bottom-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-tg-orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host([data-tg-orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }

        :host([data-pk-group-orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host([data-pk-group-orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }

        :host-context(pk-button-group[exclusive]):host([pressed]) .button:focus-visible {
            box-shadow: var(--pk-shadow-focus-outset, var(--pk-shadow-focus));
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline']:not([pressed])) .button {
            background: var(--pk-action-fill);
            border-color: transparent;
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline'][pressed]) .button {
            border-color: transparent;
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline']) .button {
            border-radius: 0;
        }

        :host-context(pk-button-group[orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host-context(pk-button-group[orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }
    }
    `,
	i`
        :host([data-pk-group-join][data-pk-group-item-first][data-pk-group-orientation='horizontal'][variant='outline']) .button {
            border-left: 1px solid var(--pk-color-slate-300);
        }

        :host([data-pk-group-join][data-pk-group-item-first][data-pk-group-orientation='vertical'][variant='outline']) .button {
            border-top: 1px solid var(--pk-color-slate-300);
        }
    `
];
//#endregion
//#region src/components/toggle/pk-toggle.ts
var PkToggle = class PkToggle extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.pressed = false;
		this.disabled = false;
		this.variant = "default";
		this.size = "default";
		this.value = "";
		this.ariaLabel = null;
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	static {
		this.styles = pkToggleStyles;
	}
	handleClick() {
		if (this.disabled || this.closest("pk-toggle-group")) return;
		this.pressed = !this.pressed;
		this.dispatchEvent(new CustomEvent("pk-pressed-change", {
			detail: { pressed: this.pressed },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return b`
            <button
                part="base"
                class="button"
                type="button"
                ?disabled=${this.disabled}
                aria-pressed=${this.pressed ? "true" : "false"}
                aria-label=${this.ariaLabel ?? A}
                data-state=${this.pressed ? "on" : "off"}
                @click=${this.handleClick}
            >
                <slot></slot>
            </button>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkToggle.prototype, "pressed", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkToggle.prototype, "disabled", void 0);
__decorate([n({ reflect: true })], PkToggle.prototype, "variant", void 0);
__decorate([n({ reflect: true })], PkToggle.prototype, "size", void 0);
__decorate([n({ attribute: "data-value" })], PkToggle.prototype, "value", void 0);
__decorate([n({ attribute: "aria-label" })], PkToggle.prototype, "ariaLabel", void 0);
PkToggle = __decorate([t("pk-toggle")], PkToggle);
//#endregion
export { PkToggle };
