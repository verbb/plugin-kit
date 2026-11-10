import { css, html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { createFormatter, type FormatType } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { resolveHostLocale } from '../../utils/host-date.js';

export type PkMeterTone = 'ok' | 'warning' | 'danger';

const WARNING_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2l8.5 15h-17zm-.9 5v5h1.8V7zm0 6.5v1.8h1.8v-1.8z"/></svg>';

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
@customElement('pk-meter')
export class PkMeter extends PkElement {
    static override styles = css`
        @layer pk-component {
            :host {
                display: block;
                min-width: 80px;
                font-family: var(--pk-font-family);
            }

            .base {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .track {
                flex: 1;
                height: 6px;
                overflow: hidden;
                border-radius: 3px;
                background: color-mix(in srgb, var(--_meter-color) 16%, var(--pk-chart-surface));
            }

            .fill {
                display: block;
                height: 100%;
                border-radius: 3px;
                background: var(--_meter-color);
            }

            .value {
                display: inline-flex;
                gap: 4px;
                align-items: center;
                justify-content: flex-end;
                min-width: 4.2em;
                color: var(--pk-chart-text);
                font-size: 12px;
                font-variant-numeric: tabular-nums;
            }

            .value svg {
                width: 11px;
                height: 11px;
                fill: var(--_meter-color);
            }

            .ok {
                --_meter-color: var(--pk-chart-meter-ok);
            }

            .warning {
                --_meter-color: var(--pk-chart-meter-warning);
            }

            .danger {
                --_meter-color: var(--pk-chart-meter-danger);
            }
        }
    `;

    /** Current value, clamped to `min`–`max`. */
    @property({ type: Number })
    value = 0;

    /** Start of the range. */
    @property({ type: Number })
    min = 0;

    /** End of the range. The default suits ratios such as `0.64` with `format="percent"`. */
    @property({ type: Number })
    max = 1;

    /** Values below this are in the low region. */
    @property({ type: Number })
    low: number | null = null;

    /** Values above this are in the high region. */
    @property({ type: Number })
    high: number | null = null;

    /** The best value. Its region is shown in the accent colour; one region away is a warning, two is danger. */
    @property({ type: Number })
    optimum: number | null = null;

    /** How the value is formatted for display and screen readers. */
    @property()
    format: FormatType = 'number';

    /** ISO 4217 currency code when `format="money"`. */
    @property()
    currency = '';

    /** Accessible name, e.g. "Contact Us completion rate". */
    @property()
    label = '';

    /** Print the formatted value beside the bar. */
    @property({ type: Boolean, attribute: 'show-value', reflect: true })
    showValue = false;

    /** BCP 47 locale for the value. Defaults to the Craft or document locale. */
    @property()
    locale = '';

    /** Appended to the accessible value one region from the optimum. */
    @property({ attribute: 'warning-label' })
    warningLabel = 'outside the expected range';

    /** Appended to the accessible value two regions from the optimum. */
    @property({ attribute: 'danger-label' })
    dangerLabel = 'well outside the expected range';

    /** Regions as in HTML `<meter>`: below `low`, between, above `high`, ranked by distance from the optimum's region. */
    get tone(): PkMeterTone {
        if (this.low === null && this.high === null) {
            return 'ok';
        }

        const low = this.low ?? this.min;
        const high = this.high ?? this.max;
        const optimum = this.optimum ?? (this.min + this.max) / 2;
        const region = (value: number) => (value < low ? 0 : value > high ? 2 : 1);

        return (['ok', 'warning', 'danger'] as const)[Math.abs(region(this.clamped) - region(optimum))];
    }

    private get clamped(): number {
        return Math.min(this.max, Math.max(this.min, Number(this.value) || 0));
    }

    override render() {
        const tone = this.tone;
        const value = this.clamped;
        const range = this.max - this.min || 1;
        const text = createFormatter(
            { type: this.format, currency: this.currency || undefined },
            { locale: this.locale || resolveHostLocale() },
        )(value);
        const status = tone === 'warning' ? `, ${this.warningLabel}` : tone === 'danger' ? `, ${this.dangerLabel}` : '';

        return html`
            <div
                class="base ${tone}"
                part="base"
                role="meter"
                aria-label=${this.label}
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                aria-valuenow=${value}
                aria-valuetext=${`${text}${status}`}
            >
                <span class="track" part="track"><span class="fill" part="fill" style=${styleMap({ width: `${((value - this.min) / range) * 100}%` })}></span></span>
                ${this.showValue || tone !== 'ok' ? html`
                    <span class="value" part="value" aria-hidden="true">
                        ${tone === 'ok' ? nothing : unsafeSVG(WARNING_ICON)}${this.showValue ? text : nothing}
                    </span>
                ` : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-meter': PkMeter;
    }
}
