import { n as PkElement, r as hostDisplayInlineBlock, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
//#region src/components/spinner/pk-spinner.styles.ts
var pkSpinnerStyles = [hostDisplayInlineBlock, css`
        @layer pk-component {
            :host {
                display: block;
                box-sizing: border-box;
            }

            :host([centered]) {
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: fit-content;
                height: fit-content;
                margin: 0;
                transform: translate(-50%, -50%);
            }

            .spinner {
                display: block;
                box-sizing: border-box;
                margin-inline: auto;
                border-style: solid;
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-radius: 50%;
                animation: pk-spinner-spin 0.5s linear infinite;
            }

            /* Sizes */
            :host([size='xxs']) .spinner {
                width: 0.75rem;
                height: 0.75rem;
                border-width: 1px;
            }

            :host([size='xs']) .spinner {
                width: 1rem;
                height: 1rem;
                border-width: 2px;
            }

            :host([size='sm']) .spinner,
            :host(:not([size])) .spinner {
                width: 1.5rem;
                height: 1.5rem;
                border-width: 2px;
            }

            :host([size='md']) .spinner {
                width: 2rem;
                height: 2rem;
                border-width: 2px;
            }

            :host([size='lg']) .spinner {
                width: 3rem;
                height: 3rem;
                border-width: 2px;
            }

            :host([size='xl']) .spinner {
                width: 4rem;
                height: 4rem;
                border-width: 2px;
            }

            /* Variants — matched to button loading contrast */
            :host([variant='default']:not([tone])) .spinner {
                border-top-color: var(--pk-color-red-500);
                border-right-color: var(--pk-color-red-500);
            }

            :host([variant='primary']:not([tone])) .spinner,
            :host([variant='secondary']:not([tone])) .spinner {
                border-top-color: var(--pk-color-white);
                border-right-color: var(--pk-color-white);
            }

            :host([variant='dashed']:not([tone])) .spinner,
            :host([variant='outline']:not([tone])) .spinner,
            :host([variant='transparent']:not([tone])) .spinner {
                border-top-color: var(--pk-color-gray-700);
                border-right-color: var(--pk-color-gray-700);
            }

            /* Standalone tone overrides */
            :host([tone='sky']) .spinner {
                border-top-color: var(--pk-color-sky-600);
                border-right-color: var(--pk-color-sky-600);
            }

            :host([tone='emerald']) .spinner {
                border-top-color: var(--pk-color-emerald-600);
                border-right-color: var(--pk-color-emerald-600);
            }

            :host([tone='violet']) .spinner {
                border-top-color: var(--pk-color-violet-600);
                border-right-color: var(--pk-color-violet-600);
            }

            :host([tone='amber']) .spinner {
                border-top-color: var(--pk-color-amber-500);
                border-right-color: var(--pk-color-amber-500);
            }

            @keyframes pk-spinner-spin {
                to {
                    transform: rotate(360deg);
                }
            }
        }
    `];
//#endregion
//#region src/components/spinner/pk-spinner.ts
var PkSpinner = class PkSpinner extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "default";
		this.size = "sm";
		this.centered = false;
	}
	static {
		this.styles = pkSpinnerStyles;
	}
	render() {
		return html`
            <div part="base" class="spinner" aria-hidden="true"></div>
        `;
	}
};
__decorate([property({ reflect: true })], PkSpinner.prototype, "variant", void 0);
__decorate([property({ reflect: true })], PkSpinner.prototype, "size", void 0);
__decorate([property({ reflect: true })], PkSpinner.prototype, "tone", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkSpinner.prototype, "centered", void 0);
PkSpinner = __decorate([customElement("pk-spinner")], PkSpinner);
//#endregion
export { PkSpinner as t };

//# sourceMappingURL=pk-spinner-Blxd3SIH.js.map