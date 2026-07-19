import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkSpinnerStyles } from './pk-spinner.styles.js';

export type PkSpinnerVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'dashed'
    | 'outline'
    | 'transparent';

export type PkSpinnerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type PkSpinnerTone = 'sky' | 'emerald' | 'violet' | 'amber';

/**
 * Loading indicator — mirrors plugin-kit-ui / plugin-kit-react Spinner.
 *
 * @csspart base - The spinning ring element
 */
@customElement('pk-spinner')
export class PkSpinner extends PkElement {
    static override styles = pkSpinnerStyles;

    @property({ reflect: true })
    variant: PkSpinnerVariant = 'default';

    @property({ reflect: true })
    size: PkSpinnerSize = 'sm';

    @property({ reflect: true })
    tone?: PkSpinnerTone;

    @property({ type: Boolean, reflect: true })
    centered = false;

    override render() {
        return html`
            <div part="base" class="spinner" aria-hidden="true"></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-spinner': PkSpinner;
    }
}
