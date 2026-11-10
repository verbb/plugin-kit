import { PropertyValues } from 'lit';
import { DateBucket, FormatType } from '@verbb/plugin-kit-core/utils/format';
import { PkElement } from '../../base/pk-element.js';
/**
 * Compact trend line with no axes, for stat tiles and table cells. The last point is
 * marked, hovering shows the value (and date, when `dates` are given), and the
 * accessible name summarises the first, last, highest and lowest values.
 *
 * @csspart base - Drawing area.
 * @csspart tooltip - Hover value.
 *
 * @cssproperty --pk-sparkline-height - Height of the line. Defaults to 32px.
 */
export declare class PkSparkline extends PkElement {
    static styles: import('lit').CSSResult;
    /** Values in order, oldest first. */
    values: unknown[];
    /** Optional bucket keys matching `values`, shown in the hover tooltip. */
    dates: unknown[];
    /** Date bucket of `dates`, for the hover label. */
    bucket: DateBucket;
    /** How values are formatted in the hover label and accessible summary. */
    format: FormatType;
    /** ISO 4217 currency code when `format="money"`. */
    currency: string;
    /** Colour slot 1–8. */
    color: number;
    /** Accessible name, e.g. "Submissions, last 14 days". */
    label: string;
    /** BCP 47 locale for values and dates. Defaults to the Craft or document locale. */
    locale: string;
    /** Joins the first and last values in the accessible summary. */
    toLabel: string;
    /** Precedes the highest value in the accessible summary. */
    highLabel: string;
    /** Precedes the lowest value in the accessible summary. */
    lowLabel: string;
    private canvas?;
    private tooltipElement?;
    private chart;
    private stopThemeObserver?;
    private animateNext;
    private hasAnimated;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    private summary;
    private build;
    private drawTooltip;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-sparkline': PkSparkline;
    }
}
//# sourceMappingURL=pk-sparkline.d.ts.map