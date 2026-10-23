import { PkElement } from '../../base/pk-element.js';
import { PkStatusVariant } from '../status/pk-status.js';
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
export declare class PkStatusLabel extends PkElement {
    static styles: import('lit').CSSResult;
    /** Semantic status or named colour, independent of the visible label. Unknown values use neutral styling. */
    status: PkStatusVariant;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-status-label': PkStatusLabel;
    }
}
//# sourceMappingURL=pk-status-label.d.ts.map