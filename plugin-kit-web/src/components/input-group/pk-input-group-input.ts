import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { PkElement } from '../../base/pk-element.js';
import { pkInputGroupInputStyles } from './pk-input-group-input.styles.js';

export type PkInputGroupInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

/**
 * Borderless input for use inside `pk-input-group`.
 *
 * @csspart input - Native input element
 */
@customElement('pk-input-group-input')
export class PkInputGroupInput extends PkElement {
    static override styles = pkInputGroupInputStyles;

    @query('.input')
    inputElement!: HTMLInputElement;

    @property({ reflect: true })
    type = 'text';

    @property({ reflect: true })
    size: PkInputGroupInputSize = 'default';

    @property()
    placeholder = '';

    @property({ attribute: 'value', reflect: true })
    value = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property()
    autocomplete?: string;

    focus(options?: FocusOptions): void {
        this.inputElement?.focus(options);
    }

    override render() {
        return html`
            <input
                part="input"
                class="input"
                data-slot="input-group-control"
                type=${this.type}
                .value=${this.value}
                placeholder=${this.placeholder}
                autocomplete=${ifDefined(this.autocomplete)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-invalid=${this.invalid ? 'true' : nothing}
                @input=${this.handleInput}
            />
        `;
    }

    private handleInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-input': PkInputGroupInput;
    }
}
