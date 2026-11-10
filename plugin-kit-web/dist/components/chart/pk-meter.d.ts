import { FormatType } from '@verbb/plugin-kit-core/utils/format';
import { PkElement } from '../../base/pk-element.js';
export type PkMeterTone = 'ok' | 'warning' | 'danger';
/**
 * Inline bar for a value within a range, sized for table cells. CSS only: no chart
 * library is loaded, so a long table of meters stays cheap.
 *
 * `low`, `high` and `optimum` follow the HTML `<meter>` element. A value in the
 * optimum region uses the accent colour; one region away is a warning and two is
 * danger. Outside the optimum a warning glyph appears (with or without `show-value`)
 * and the accessible value text says so, so the state never relies on colour alone.
 *
 * @csspart base - Meter row.
 * @csspart track - Unfilled track.
 * @csspart fill - Filled portion.
 * @csspart value - Formatted value.
 */
export declare class PkMeter extends PkElement {
    static styles: import('lit').CSSResult;
    /** Current value, clamped to `min`–`max`. */
    value: number;
    /** Start of the range. */
    min: number;
    /** End of the range. The default suits ratios such as `0.64` with `format="percent"`. */
    max: number;
    /** Values below this are in the low region. */
    low: number | null;
    /** Values above this are in the high region. */
    high: number | null;
    /** The best value. Its region is shown in the accent colour; one region away is a warning, two is danger. */
    optimum: number | null;
    /** How the value is formatted for display and screen readers. */
    format: FormatType;
    /** ISO 4217 currency code when `format="money"`. */
    currency: string;
    /** Accessible name, e.g. "Contact Us completion rate". */
    label: string;
    /** Print the formatted value beside the bar. */
    showValue: boolean;
    /** BCP 47 locale for the value. Defaults to the Craft or document locale. */
    locale: string;
    /** Appended to the accessible value one region from the optimum. */
    warningLabel: string;
    /** Appended to the accessible value two regions from the optimum. */
    dangerLabel: string;
    /** Regions as in HTML `<meter>`: below `low`, between, above `high`, ranked by distance from the optimum's region. */
    get tone(): PkMeterTone;
    private get clamped();
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-meter': PkMeter;
    }
}
//# sourceMappingURL=pk-meter.d.ts.map