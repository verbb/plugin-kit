import { css, html, type PropertyValues } from 'lit';
import {
    CategoryScale,
    Chart,
    Filler,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
    type ScriptableContext,
    type TooltipModel,
} from 'chart.js';
import { createFormatter, type DateBucket, type FormatType } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property, query } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { areaGradient, observeChartTheme, readEnvironment, type AnyChart } from './shared.js';

// Tooltip must be registered (its option descriptors make `external` a callback); Filler stays per chart.
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

/** Accepts a JSON array or a comma-separated list. */
const listConverter = {
    fromAttribute(value: string | null): unknown[] {
        if (!value) {
            return [];
        }

        const trimmed = value.trim();

        if (trimmed.startsWith('[')) {
            try {
                return JSON.parse(trimmed) as unknown[];
            } catch {
                return [];
            }
        }

        return trimmed.split(',').map((item) => item.trim());
    },
};

const toNumbers = (values: unknown[]): (number | null)[] => values.map((value) => {
    const number = value === null || value === '' ? NaN : Number(value);

    return Number.isFinite(number) ? number : null;
});

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
@customElement('pk-sparkline')
export class PkSparkline extends PkElement {
    static override styles = css`
        @layer pk-component {
            :host {
                position: relative;
                display: block;
                min-width: 60px;
                height: var(--pk-sparkline-height, 32px);
            }

            .base {
                position: relative;
                width: 100%;
                height: 100%;
            }

            canvas {
                display: block;
            }

            .tooltip {
                position: absolute;
                z-index: 3;
                top: 0;
                left: 0;
                padding: 3px 7px;
                border-radius: var(--pk-radius-md);
                background: var(--pk-chart-tooltip-background);
                box-shadow: var(--pk-chart-tooltip-shadow);
                color: var(--pk-chart-text);
                font: 600 11px/1.3 var(--pk-font-family);
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
            }

            .tooltip.visible {
                opacity: 1;
            }

            .tooltip span {
                margin-inline-start: 6px;
                color: var(--pk-chart-text-muted);
                font-weight: 400;
            }
        }
    `;

    /** Values in order, oldest first. */
    @property({ converter: listConverter })
    values: unknown[] = [];

    /** Optional bucket keys matching `values`, shown in the hover tooltip. */
    @property({ converter: listConverter })
    dates: unknown[] = [];

    /** Date bucket of `dates`, for the hover label. */
    @property()
    bucket: DateBucket = 'day';

    /** How values are formatted in the hover label and accessible summary. */
    @property()
    format: FormatType = 'number';

    /** ISO 4217 currency code when `format="money"`. */
    @property()
    currency = '';

    /** Colour slot 1–8. */
    @property({ type: Number })
    color = 1;

    /** Accessible name, e.g. "Submissions, last 14 days". */
    @property()
    label = '';

    /** BCP 47 locale for values and dates. Defaults to the Craft or document locale. */
    @property()
    locale = '';

    /** Joins the first and last values in the accessible summary. */
    @property({ attribute: 'to-label' })
    toLabel = 'to';

    /** Precedes the highest value in the accessible summary. */
    @property({ attribute: 'high-label' })
    highLabel = 'high';

    /** Precedes the lowest value in the accessible summary. */
    @property({ attribute: 'low-label' })
    lowLabel = 'low';

    @query('canvas')
    private canvas?: HTMLCanvasElement;

    @query('.tooltip')
    private tooltipElement?: HTMLElement;

    private chart: AnyChart | null = null;

    private stopThemeObserver?: () => void;

    private animateNext = true;

    private hasAnimated = false;

    override connectedCallback(): void {
        super.connectedCallback();

        // Disconnect destroyed the chart; Lit does not re-render on reconnect by itself.
        if (this.hasUpdated) {
            this.requestUpdate();
        }

        this.stopThemeObserver = observeChartTheme(() => {
            this.animateNext = false;
            this.build();
        });
    }

    override disconnectedCallback(): void {
        this.stopThemeObserver?.();
        this.chart?.destroy();
        this.chart = null;
        super.disconnectedCallback();
    }

    protected override updated(changed: PropertyValues<this>): void {
        if (changed.size && [...changed.keys()].some((key) => key !== 'label')) {
            this.build();
        } else if (!this.chart) {
            this.build();
        }
    }

    private summary(values: (number | null)[]): string {
        const present = values.filter((value): value is number => value !== null);

        if (!present.length) {
            return this.label;
        }

        const env = readEnvironment(this, this.locale);
        const format = createFormatter({ type: this.format, currency: this.currency || undefined }, { locale: env.locale });

        return `${this.label}: ${format(present[0])} ${this.toLabel} ${format(present[present.length - 1])}, ${this.highLabel} ${format(Math.max(...present))}, ${this.lowLabel} ${format(Math.min(...present))}`;
    }

    private build(): void {
        this.chart?.destroy();
        this.chart = null;

        const values = toNumbers(this.values);

        if (!this.canvas || !this.isConnected || !values.length) {
            return;
        }

        const env = readEnvironment(this, this.locale);
        const color = env.theme.series[(Math.max(1, this.color) - 1) % env.theme.series.length];
        const format = createFormatter({ type: this.format, currency: this.currency || undefined }, { locale: env.locale });
        const dateFormat = createFormatter({ type: 'date', bucket: this.bucket }, { context: 'axis', locale: env.locale });
        const present = values.filter((value): value is number => value !== null);

        if (!present.length) {
            return;
        }

        const low = Math.min(...present);
        const high = Math.max(...present);
        const pad = (high - low) * 0.08 || Math.abs(high) * 0.08 || 1;
        const last = values.length - 1;
        const animate = this.animateNext && !this.hasAnimated && !env.reducedMotion;

        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: values.map((_value, index) => index),
                datasets: [{
                    data: values,
                    borderColor: color,
                    borderWidth: 1.5,
                    tension: 0.3,
                    cubicInterpolationMode: 'monotone',
                    fill: 'origin',
                    backgroundColor: (context: ScriptableContext<'line'>) => areaGradient(color, 0.18)(context as never),
                    pointRadius: (context: ScriptableContext<'line'>) => (context.dataIndex === last ? 2.5 : 0),
                    pointBackgroundColor: color,
                    pointBorderWidth: 0,
                    pointHoverRadius: 3,
                    pointHitRadius: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: animate ? { duration: 450 } : false,
                transitions: { active: { animation: { duration: 0 } } },
                layout: { padding: { top: 3, bottom: 1, left: 3, right: 3 } },
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { display: false, reverse: env.rtl },
                    y: { display: false, min: low - pad, max: high + pad },
                },
                plugins: {
                    tooltip: {
                        enabled: false,
                        external: ({ tooltip }: { tooltip: TooltipModel<'line'> }) => this.drawTooltip(tooltip, values, format, dateFormat),
                    },
                },
            },
            plugins: [Filler],
        }) as AnyChart;
        this.animateNext = true;
        this.hasAnimated = true;
    }

    private drawTooltip(
        tooltip: TooltipModel<'line'>,
        values: (number | null)[],
        format: (value: unknown) => string,
        dateFormat: (value: unknown) => string,
    ): void {
        const box = this.tooltipElement;

        if (!box) {
            return;
        }

        if (tooltip.opacity === 0 || !tooltip.dataPoints?.length) {
            box.classList.remove('visible');

            return;
        }

        const index = tooltip.dataPoints[0].dataIndex;
        box.replaceChildren(document.createTextNode(format(values[index])));

        if (this.dates[index] !== undefined) {
            const date = document.createElement('span');
            date.textContent = dateFormat(this.dates[index]);
            box.append(date);
        }

        box.classList.add('visible');
        const width = box.offsetWidth;
        const x = Math.max(0, Math.min(this.clientWidth - width, tooltip.caretX - width / 2));
        box.style.transform = `translate(${x}px, ${-box.offsetHeight - 4}px)`;
    }

    override render() {
        return html`
            <div class="base" part="base" role="img" aria-label=${this.summary(toNumbers(this.values))}>
                <canvas aria-hidden="true"></canvas>
                <div class="tooltip" part="tooltip" aria-hidden="true"></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-sparkline': PkSparkline;
    }
}
