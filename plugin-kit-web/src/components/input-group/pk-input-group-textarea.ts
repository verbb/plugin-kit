import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkInputGroupTextareaStyles } from './pk-input-group-textarea.styles.js';

/**
 * Borderless textarea for use inside `pk-input-group`.
 *
 * @csspart textarea - Native textarea element
 */
@customElement('pk-input-group-textarea')
export class PkInputGroupTextarea extends PkElement {
    static override styles = pkInputGroupTextareaStyles;

    @query('.textarea')
    textareaElement!: HTMLTextAreaElement;

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

    @property({ type: Number })
    rows = 3;

    focus(options?: FocusOptions): void {
        this.textareaElement?.focus(options);
    }

    override render() {
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
                aria-invalid=${this.invalid ? 'true' : nothing}
                @input=${this.handleInput}
            ></textarea>
        `;
    }

    private handleInput(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
        this.value = target.value;
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-textarea': PkInputGroupTextarea;
    }
}
