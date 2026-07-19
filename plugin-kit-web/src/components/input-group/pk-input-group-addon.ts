import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkInputGroupAddonStyles } from './pk-input-group-addon.styles.js';

export type PkInputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

/**
 * Icon, text, or button content alongside an input-group control.
 *
 * Place after the control in the DOM; use `align` to position visually.
 *
 * @slot - Addon content
 *
 * @csspart base - Addon container
 */
@customElement('pk-input-group-addon')
export class PkInputGroupAddon extends PkElement {
    static override styles = pkInputGroupAddonStyles;

    @property({ reflect: true })
    align: PkInputGroupAddonAlign = 'inline-start';

    private handleClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).closest('button, pk-input-group-button, pk-button')) {
            return;
        }

        const group = this.closest('pk-input-group');

        const control = group?.querySelector('pk-input-group-input, pk-input-group-textarea') as
            | (HTMLElement & { focus(options?: FocusOptions): void })
            | null;

        control?.focus();
    }

    override render() {
        return html`
            <div
                part="base"
                class="addon"
                role="group"
                @click=${this.handleClick}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-addon': PkInputGroupAddon;
    }
}
