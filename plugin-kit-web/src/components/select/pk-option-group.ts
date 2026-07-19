import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { uniqueId } from '../../a11y/focus.js';
import { pkOptionGroupStyles } from './pk-option-group.styles.js';

/**
 * Visual option group for `pk-select` —  listbox grouping pattern.
 *
 * @slot - `pk-option` items in this group
 *
 * @csspart label - Group label
 */
@customElement('pk-option-group')
export class PkOptionGroup extends PkElement {
    static override styles = pkOptionGroupStyles;

    @property({ reflect: true })
    label = '';

    @property({ type: Boolean, reflect: true })
    hidden = false;

    private readonly labelId = uniqueId('pk-option-group-label');

    override connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'group');
        this.setAttribute('aria-labelledby', this.labelId);
    }

    override render() {
        return html`
            <div part="label" class="label" id=${this.labelId}>${this.label}</div>
            <div role="presentation">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-option-group': PkOptionGroup;
    }
}
