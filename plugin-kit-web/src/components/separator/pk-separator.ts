import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
import { pkSeparatorStyles } from './pk-separator.styles.js';

export type PkSeparatorOrientation = 'horizontal' | 'vertical';

/**
 * Visual divider between related content.
 *
 * Default rhythm uses an inner `.line` (not `:host` margin) so outer resets
 * like Tailwind preflight cannot zero the spacing.
 *
 * @csspart base - Painted rule (inner line)
 */
@customElement('pk-separator')
export class PkSeparator extends PkElement {
    static override styles = pkSeparatorStyles;

    @property({ reflect: true })
    orientation: PkSeparatorOrientation = 'horizontal';

    override connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'separator');
        this.syncAriaOrientation();
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (changed.has('orientation')) {
            this.syncAriaOrientation();
        }
    }

    private syncAriaOrientation(): void {
        this.setAttribute('aria-orientation', this.orientation);
    }

    override render() {
        // Paint + default margin live inside the shadow — insulated from outer `* { margin: 0 }`.
        return html`<div class="line" part="base"></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-separator': PkSeparator;
    }
}
