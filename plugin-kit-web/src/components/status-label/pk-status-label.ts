import { html } from 'lit';
import { customElement, property } from '../../decorators.js';
import { PkElement } from '../../base/pk-element.js';
import '../status/pk-status.js';
import type { PkStatusVariant } from '../status/pk-status.js';
import { pkStatusLabelStyles } from './pk-status-label.styles.js';

const tones: Record<PkStatusVariant, string> = {
    red: 'red',
    orange: 'orange',
    amber: 'amber',
    yellow: 'yellow',
    lime: 'lime',
    green: 'green',
    emerald: 'emerald',
    teal: 'teal',
    cyan: 'cyan',
    sky: 'sky',
    blue: 'blue',
    indigo: 'indigo',
    violet: 'violet',
    purple: 'purple',
    fuchsia: 'fuchsia',
    pink: 'pink',
    rose: 'rose',
    gray: 'gray',
    white: 'white',
    black: 'black',
    all: 'gray',
    on: 'teal',
    live: 'teal',
    active: 'teal',
    enabled: 'teal',
    off: 'red',
    suspended: 'red',
    expired: 'red',
    warning: 'amber',
    pending: 'orange',
    turquoise: 'teal',
    light: 'gray',
    grey: 'gray',
    disabled: 'gray',
    inactive: 'gray',
};

/**
 * A Craft-style status badge with a dot and visible label.
 *
 * @slot - Status text. Defaults to the status value; casing is visual only.
 * @csspart base - Badge container
 * @csspart indicator - Status dot host
 * @csspart label - Visible label
 * @cssproperty --pk-status-label-color - Text colour override, including on selected surfaces.
 * @cssproperty --pk-status-label-background - Complete badge background override.
 * @cssproperty --pk-status-label-neutral-tint - Base tint for neutral badges; use white on selected surfaces.
 */
@customElement('pk-status-label')
export class PkStatusLabel extends PkElement {
    static override styles = pkStatusLabelStyles;

    /** Semantic status or named colour, independent of the visible label. Unknown values use neutral styling. */
    @property({ reflect: true }) status: PkStatusVariant = 'gray';

    override render() {
        const known = Object.hasOwn(tones, this.status);
        return html`<span
            part="base"
            class="base"
            data-tone=${known ? tones[this.status] : 'gray'}
            data-indicator=${this.status}
        >
            <pk-status
                part="indicator"
                aria-hidden="true"
                .status=${known ? this.status : 'gray'}
            ></pk-status>
            <span part="label" class="label"><slot>${this.status}</slot></span>
        </span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-status-label': PkStatusLabel;
    }
}
