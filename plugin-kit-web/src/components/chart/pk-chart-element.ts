import { html, nothing, type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
    Chart,
    Tooltip,
    type ActiveElement,
    type ChartConfiguration,
    type ChartEvent,
    type TooltipItem,
    type TooltipModel as ChartJsTooltipModel,
} from 'chart.js';
import { property, query, state } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { PkLegendToggleEvent, PkPointSelectEvent, type PkPointSelectDetail } from '../../events/pk-chart.js';
import '../state-panel/pk-state-panel.js';
import '../spinner/pk-spinner.js';
import {
    crosshairPlugin,
    observeChartTheme,
    readEnvironment,
    resolveColumns,
    type AnyChart,
    type ChartData,
    type ChartEnvironment,
    type DatasetMeta,
    type LegendItem,
    type ResolvedChartData,
    type TableModel,
    type TooltipModel,
    type TooltipRow,
    valueLabelPlugin,
} from './shared.js';
import { pkChartStyles } from './styles.js';

// The HTML tooltip and keyboard-driven active points need the Tooltip plugin, which only
// works when registered (its option descriptors make `external` a callback). It is the one
// global registration; charts that leave `plugins.tooltip` unset elsewhere get Chart.js tooltips.
Chart.register(Tooltip);

export type PkChartState = '' | 'loading' | 'empty' | 'error';
export type PkChartView = 'chart' | 'table';
export type PkChartLegend = 'auto' | 'none';

type ChartMode = 'ready' | 'loading' | 'empty' | 'error';

// Properties that change copy or presentation only; anything else rebuilds the Chart.js instance.
const PRESENTATION_PROPERTIES = new Set<PropertyKey>([
    'label',
    'state',
    'view',
    'tableToggle',
    'legend',
    'hiddenKeys',
    'emptyHeading',
    'emptyMessage',
    'errorHeading',
    'errorMessage',
    'loadingLabel',
    'chartLabel',
    'tableLabel',
    'viewLabel',
    'seriesLabel',
    'tableAvailableLabel',
    'totalLabel',
    'description',
]);

const ARROW_UP = '<svg viewBox="0 0 8 8" aria-hidden="true"><path d="M4 1l3.5 5.5h-7z"/></svg>';
const ARROW_DOWN = '<svg viewBox="0 0 8 8" aria-hidden="true"><path d="M4 7L.5 1.5h7z"/></svg>';

function deepMerge<T extends Record<string, unknown>>(base: T, extra: Record<string, unknown>): T {
    const out: Record<string, unknown> = { ...base };

    for (const [key, value] of Object.entries(extra)) {
        const current = out[key];
        const mergeable = value && typeof value === 'object' && !Array.isArray(value)
            && current && typeof current === 'object' && !Array.isArray(current);

        out[key] = mergeable
            ? deepMerge(current as Record<string, unknown>, value as Record<string, unknown>)
            : value;
    }

    return out as T;
}

export const datasetMeta = (dataset: unknown): DatasetMeta => dataset as DatasetMeta;

/** Build a change pill (arrow plus signed text) as DOM, for tooltips. */
export function changeElement(change: NonNullable<TooltipRow['change']>): HTMLElement {
    const pill = document.createElement('span');
    pill.className = `change ${change.tone}`;

    if (change.direction) {
        pill.insertAdjacentHTML('afterbegin', change.direction > 0 ? ARROW_UP : ARROW_DOWN);
    }

    pill.append(document.createTextNode(change.text));

    return pill;
}

/**
 * Shared behaviour for the Chart.js-backed chart elements: data preparation, theming
 * from `--pk-chart-*` tokens, the HTML tooltip, legend, keyboard navigation, the data
 * table (always present for screen readers, visible in table view) and the
 * loading, empty and error states.
 *
 * @slot empty - Replaces the empty-state message.
 * @slot error - Replaces the error-state message.
 * @slot state-actions - Buttons shown in the error state, such as a retry action.
 *
 * @event pk-point-select - A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`.
 * @event pk-legend-toggle - A legend item hid or showed its series. Detail: `{ key, label, hidden }`.
 * @event pk-view-change - The chart/table toggle changed the view. Detail: `{ view }`.
 *
 * @csspart base - Outer wrapper.
 * @csspart toolbar - Legend and chart/table toggle row.
 * @csspart legend - Legend group.
 * @csspart body - Plot, table and state wrapper.
 * @csspart plot - Chart drawing area.
 * @csspart tooltip - Hover and keyboard tooltip.
 * @csspart table - Data table wrapper.
 * @csspart state - Loading, empty or error state panel.
 *
 * @cssproperty --pk-chart-height - Height of the drawing area. Defaults to 240px.
 *
 * @dependency pk-state-panel
 * @dependency pk-spinner
 */
export abstract class PkChartElement extends PkElement {
    static override styles: CSSResultGroup = pkChartStyles;

    /**
     * Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`.
     * Accepts JSON from the `data` attribute. Assign a new object to update it.
     */
    @property({ type: Object })
    data: ChartData | null = null;

    /** Accessible name for the chart and caption for its data table. */
    @property()
    label = '';

    /** `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it. */
    @property({ reflect: true })
    state: PkChartState = '';

    /** `table` shows the data table in place of the chart. */
    @property({ reflect: true })
    view: PkChartView = 'chart';

    /** Show the chart/table toggle. */
    @property({ type: Boolean, attribute: 'table-toggle', reflect: true })
    tableToggle = false;

    /** `auto` shows a legend whenever there is more than one series. */
    @property()
    legend: PkChartLegend = 'auto';

    /** BCP 47 locale for numbers and dates. Defaults to the Craft or document locale. */
    @property()
    locale = '';

    /** Heading of the empty state. */
    @property({ attribute: 'empty-heading' })
    emptyHeading = 'No data for this period';

    /** Message under the empty-state heading. The `empty` slot replaces it. */
    @property({ attribute: 'empty-message' })
    emptyMessage = '';

    /** Heading of the error state. */
    @property({ attribute: 'error-heading' })
    errorHeading = "This chart couldn't be loaded";

    /** Message under the error-state heading. The `error` slot replaces it. */
    @property({ attribute: 'error-message' })
    errorMessage = '';

    /** Text beside the spinner while the first data loads. */
    @property({ attribute: 'loading-label' })
    loadingLabel = 'Loading chart';

    /** Text of the chart button in the chart/table toggle. */
    @property({ attribute: 'chart-label' })
    chartLabel = 'Chart';

    /** Text of the table button in the chart/table toggle. */
    @property({ attribute: 'table-label' })
    tableLabel = 'Table';

    /** Accessible name of the chart/table toggle. */
    @property({ attribute: 'view-label' })
    viewLabel = 'Show as';

    /** Accessible name of the legend. */
    @property({ attribute: 'series-label' })
    seriesLabel = 'Series';

    /** Longer explanation for screen readers, ideally the chart's key takeaway. */
    @property()
    description = '';

    /** Appended to the chart's accessible name to point screen-reader users to the data table. */
    @property({ attribute: 'table-available-label' })
    tableAvailableLabel = 'Data is available as a table.';

    /** Label for stack totals in tooltips and the table column. */
    @property({ attribute: 'total-label' })
    totalLabel = 'Total';

    /** Legend keys whose series are hidden. */
    @state()
    protected hiddenKeys: ReadonlySet<string> = new Set();

    @query('canvas')
    private canvas?: HTMLCanvasElement;

    @query('.plot')
    private plot?: HTMLElement;

    @query('.tooltip')
    private tooltipElement?: HTMLElement;

    @query('.live')
    private liveRegion?: HTMLElement;

    protected chart: AnyChart | null = null;

    protected env?: ChartEnvironment;

    protected resolved?: ResolvedChartData;

    private activeIndex = -1;

    private needsBuild = true;

    private animateNext = true;

    // Entry animation plays on first draw only, so refreshed data (e.g. a live dashboard) redraws without replaying it.
    private hasAnimated = false;

    private stopThemeObserver?: () => void;

    private spokenTooltip = '';

    /** Ready-to-use Chart.js configuration for the prepared data. */
    protected abstract buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;

    protected abstract buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;

    protected abstract buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;

    protected buildLegend(_env: ChartEnvironment, _data: ResolvedChartData): LegendItem[] {
        return [];
    }

    /** Derive element-specific fields from the data (folding, normalising, conversion rates). */
    protected prepare(data: ResolvedChartData): ResolvedChartData {
        return data;
    }

    /** Content centred over the plot, such as a donut total. */
    protected renderOverlay(): TemplateResult | typeof nothing {
        return nothing;
    }

    /**
     * Whether the element draws its plot as HTML from `renderPlot()` instead of a Chart.js
     * canvas, as the funnel's `tracks` shape does. The table view, states and description
     * still come from this class; canvas tooltips and keyboard point navigation don't apply.
     */
    protected get htmlPlot(): boolean {
        return false;
    }

    /** The plot's content when `htmlPlot` is true. */
    protected renderPlot(): TemplateResult | typeof nothing {
        return nothing;
    }

    /** Content after the plot, such as a side legend or funnel stage labels. */
    protected renderSupplement(_legend: LegendItem[]): TemplateResult | typeof nothing {
        return nothing;
    }

    /** Where the legend renders: the toolbar above the plot, or the element's own supplement. */
    protected get legendInToolbar(): boolean {
        return true;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.needsBuild = true;

        // Lit does not re-render on reconnect, but disconnect destroyed the chart (e.g. a moved
        // node or a Craft slide-out that detaches and reattaches its DOM).
        if (this.hasUpdated) {
            this.requestUpdate();
        }

        this.stopThemeObserver = observeChartTheme(() => {
            // Theme, direction and locale changes redraw in place without replaying entry animation.
            this.animateNext = false;
            this.needsBuild = true;
            this.requestUpdate();
        });
    }

    override disconnectedCallback(): void {
        this.stopThemeObserver?.();
        this.destroyChart();
        super.disconnectedCallback();
    }

    /** The live Chart.js instance is internal; use attributes and events instead. */
    protected get mode(): ChartMode {
        if (this.state === 'error') {
            return 'error';
        }

        if (this.state === 'empty') {
            return 'empty';
        }

        const hasRows = Boolean(this.resolved && this.resolved.rows.length);

        if (!hasRows) {
            return this.state === 'loading' ? 'loading' : 'empty';
        }

        return 'ready';
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        const chartChanged = [...changed.keys()].some((key) => !PRESENTATION_PROPERTIES.has(key));

        // Element options (folding, stacking) can change the prepared data as well as the drawing.
        if (chartChanged || (!this.resolved && this.data)) {
            this.resolved = this.data && Array.isArray(this.data.rows) && Array.isArray(this.data.cols)
                ? this.prepare({ ...this.data, cols: resolveColumns(this.data.cols) })
                : undefined;
            this.needsBuild = true;
        }

        // Forget hidden keys whose series no longer exist, or they could never be shown again.
        if (changed.has('data') && this.resolved && this.hiddenKeys.size) {
            const keys = this.legendKeys(this.resolved);
            const kept = [...this.hiddenKeys].filter((key) => keys.has(key));

            if (kept.length !== this.hiddenKeys.size) {
                this.hiddenKeys = new Set(kept);
            }
        }

        if (this.isConnected) {
            this.env = readEnvironment(this, this.locale);
        }
    }

    protected override updated(): void {
        if (this.mode !== 'ready' || this.htmlPlot) {
            this.destroyChart();

            return;
        }

        if (this.needsBuild || !this.chart) {
            this.buildChart();
        }
    }

    private destroyChart(): void {
        this.chart?.destroy();
        this.chart = null;
        this.activeIndex = -1;
        // A new chart starts with nothing active, so Chart.js would never hide the old tooltip.
        this.tooltipElement?.classList.remove('visible');
    }

    private buildChart(): void {
        if (!this.canvas || !this.resolved || !this.isConnected) {
            return;
        }

        const env = this.env ?? readEnvironment(this, this.locale);
        const animate = this.animateNext && !this.hasAnimated && !env.reducedMotion;
        const config = this.buildConfig(env, this.resolved);

        config.options = deepMerge({
            responsive: true,
            maintainAspectRatio: false,
            locale: env.locale,
            animation: animate ? { duration: 500, easing: 'easeOutQuart' } : false,
            // Hover and keyboard focus snap the point marker in place; an eased grow reads as lag.
            transitions: { active: { animation: { duration: 0 } } },
            interaction: { mode: 'index', intersect: false },
            layout: { padding: { top: 6 } },
            plugins: {
                tooltip: {
                    enabled: false,
                    external: ({ tooltip }: { tooltip: ChartJsTooltipModel<never> }) => {
                        this.drawTooltip(tooltip);
                    },
                },
            },
            onClick: (event: ChartEvent, elements: ActiveElement[]) => {
                // Index mode lists every series at the clicked position; report the one under or
                // nearest the pointer rather than whichever dataset happens to come first.
                const { x, y } = event;
                const hit = x === null || y === null ? undefined
                    : elements.find((item) => (item.element as unknown as { inRange(px: number, py: number, final?: boolean): boolean }).inRange(x, y, true))
                        ?? [...elements].sort((a, b) => Math.hypot(a.element.x - x, a.element.y - y) - Math.hypot(b.element.x - x, b.element.y - y))[0];
                this.selectPoint(hit ? [hit] : elements);
            },
            onHover: (event: ChartEvent, elements: ActiveElement[]) => {
                const target = event.native?.target as HTMLElement | undefined;

                if (target) {
                    target.style.cursor = elements.length ? 'pointer' : 'default';
                }
            },
        }, (config.options ?? {}) as Record<string, unknown>) as ChartConfiguration['options'];

        // Inline (not global) plugins, so a consumer's own Chart.js charts are unaffected.
        config.plugins = [crosshairPlugin, valueLabelPlugin, ...(config.plugins ?? [])];

        this.destroyChart();
        this.chart = new Chart(this.canvas, config) as AnyChart;
        this.applyHidden(false);
        this.needsBuild = false;
        this.animateNext = true;
        this.hasAnimated = true;
    }

    /** Sync dataset visibility with the hidden legend keys. */
    protected applyHidden(update: boolean): void {
        const chart = this.chart;

        if (!chart) {
            return;
        }

        chart.data.datasets.forEach((dataset, index) => {
            chart.setDatasetVisibility(index, !this.hiddenKeys.has(datasetMeta(dataset).pkKey));
        });

        if (update) {
            chart.update();
        }
    }

    /** Keys a legend item can hide for this data. Series ids plus the comparison key by default. */
    protected legendKeys(data: ResolvedChartData): Set<string> {
        return new Set([...data.cols.slice(1).map((col) => col.id), '__comparison']);
    }

    /** True when hiding a series changes the drawing itself (e.g. 100% stacks renormalise). */
    protected get rebuildOnLegendToggle(): boolean {
        return false;
    }

    /** Event detail for a selected point. Subclasses map folded or derived points back to data. */
    protected pointDetail(datasetIndex: number, index: number): PkPointSelectDetail | null {
        const dataset = this.chart?.data.datasets[datasetIndex];

        if (!dataset || !this.resolved) {
            return null;
        }

        const meta = datasetMeta(dataset);

        return {
            index,
            row: this.resolved.rows[index] ?? null,
            series: meta.pkKey,
            value: meta.pkRaw ? meta.pkRaw[index] : dataset.data[index],
        };
    }

    protected toggleLegend(item: LegendItem): void {
        const hidden = new Set(this.hiddenKeys);
        const willHide = !hidden.has(item.key);

        if (willHide) {
            hidden.add(item.key);
        } else {
            hidden.delete(item.key);
        }

        this.hiddenKeys = hidden;

        if (this.rebuildOnLegendToggle) {
            this.animateNext = false;
            this.needsBuild = true;
        } else {
            this.applyHidden(true);
        }

        this.dispatchEvent(new PkLegendToggleEvent({ key: item.key, label: item.label, hidden: willHide }));
    }

    private setView(view: PkChartView): void {
        if (view === this.view) {
            return;
        }

        this.view = view;
        this.dispatchEvent(new CustomEvent('pk-view-change', { detail: { view }, bubbles: true, composed: true }));
    }

    // ── Tooltip ────────────────────────────────────────────────────────────

    private drawTooltip(tooltip: ChartJsTooltipModel<never>): void {
        const box = this.tooltipElement;

        if (!box || !this.env || !this.resolved) {
            return;
        }

        const model = tooltip.opacity === 0 || !tooltip.dataPoints?.length
            ? null
            : this.buildTooltip(tooltip.dataPoints, this.env, this.resolved);

        if (!model) {
            box.classList.remove('visible');

            return;
        }

        // Labels come from consumer data: always text nodes, never HTML.
        const title = document.createElement('div');
        title.className = 'tooltip-title';
        title.textContent = model.title;
        const children: HTMLElement[] = [title];
        const spoken = [model.title];

        for (const row of model.rows) {
            const line = document.createElement('div');
            line.className = row.shape ? 'tooltip-row' : 'tooltip-row plain';

            if (row.shape) {
                line.append(this.keyElement(row.shape, row.color ?? ''));
            }

            const label = document.createElement('span');
            label.className = 'tooltip-label';
            label.textContent = row.label;
            const value = document.createElement('span');
            value.className = 'tooltip-value';
            value.textContent = row.value;
            line.append(label, value);

            if (row.change) {
                line.append(document.createElement('span'), changeElement(row.change));
            }

            children.push(line);
            spoken.push(`${row.label} ${row.value}${row.change ? `, ${row.change.text}` : ''}`);
        }

        if (model.footer) {
            const footer = document.createElement('div');
            footer.className = 'tooltip-footer';
            const name = document.createElement('span');
            name.textContent = model.footer[0];
            const total = document.createElement('b');
            total.textContent = model.footer[1];
            footer.append(name, total);
            children.push(footer);
            spoken.push(model.footer.join(' '));
        }

        box.replaceChildren(...children);
        this.spokenTooltip = spoken.join('. ');
        box.classList.add('visible');

        const plot = this.plot!;
        const width = box.offsetWidth;
        const height = box.offsetHeight;
        const gap = 14;
        let x = this.env.rtl ? tooltip.caretX - gap - width : tooltip.caretX + gap;

        if (x + width > plot.clientWidth) {
            x = tooltip.caretX - gap - width;
        }

        if (x < 0) {
            x = Math.min(plot.clientWidth - width, tooltip.caretX + gap);
        }

        const y = Math.max(0, Math.min(plot.clientHeight - height, tooltip.caretY - height / 2));
        box.style.transform = `translate(${Math.max(0, x)}px, ${y}px)`;
    }

    private keyElement(shape: string, color: string): HTMLElement {
        const key = document.createElement('span');
        key.className = shape === 'rect' ? 'key' : `key ${shape}`;
        key.style.setProperty('--_key-color', color);

        return key;
    }

    // ── Keyboard ───────────────────────────────────────────────────────────

    protected pointCount(): number {
        return this.chart?.data.labels?.length ?? 0;
    }

    protected activeElementsAt(index: number): { datasetIndex: number; index: number }[] {
        const chart = this.chart;

        if (!chart) {
            return [];
        }

        return chart.data.datasets
            .map((_dataset, datasetIndex) => ({ datasetIndex, index }))
            .filter((item) => chart.isDatasetVisible(item.datasetIndex)
                && chart.data.datasets[item.datasetIndex].data[index] != null);
    }

    private handleKeydown(event: KeyboardEvent): void {
        const count = this.pointCount();

        if (!count || !this.chart) {
            return;
        }

        const rtl = this.env?.rtl ?? false;
        const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
        const back = rtl ? 'ArrowRight' : 'ArrowLeft';
        let index = this.activeIndex;

        switch (event.key) {
            case forward:
            case 'ArrowDown':
                index = index < 0 ? 0 : Math.min(count - 1, index + 1);
                break;
            case back:
            case 'ArrowUp':
                index = index < 0 ? count - 1 : Math.max(0, index - 1);
                break;
            case 'Home':
                index = 0;
                break;
            case 'End':
                index = count - 1;
                break;
            case 'Escape':
                this.clearActive();

                return;
            case 'Enter':
            case ' ':
                if (index >= 0) {
                    event.preventDefault();
                    this.selectPoint(this.activeElementsAt(index));
                }

                return;
            default:
                return;
        }

        event.preventDefault();
        this.setActive(index);
    }

    private setActive(index: number): void {
        const chart = this.chart;
        const elements = this.activeElementsAt(index);
        this.activeIndex = index;

        if (!chart || !elements.length) {
            // A gap in the data: clear the previous highlight rather than leaving it on screen.
            if (chart) {
                chart.setActiveElements([]);
                chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
                chart.update('none');
            }

            return;
        }

        const point = chart.getDatasetMeta(elements[0].datasetIndex).data[index];
        chart.setActiveElements(elements);
        chart.tooltip?.setActiveElements(elements, { x: point.x, y: point.y });
        chart.update('none');

        if (this.liveRegion) {
            this.liveRegion.textContent = this.spokenTooltip;
        }
    }

    private clearActive(): void {
        if (!this.chart) {
            return;
        }

        this.activeIndex = -1;
        this.chart.setActiveElements([]);
        this.chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
        this.chart.update('none');
    }

    private selectPoint(elements: { datasetIndex: number; index: number }[]): void {
        const first = elements[0];
        const detail = first ? this.pointDetail(first.datasetIndex, first.index) : null;

        if (detail) {
            this.dispatchEvent(new PkPointSelectEvent(detail));
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────

    protected renderLegend(items: LegendItem[], className = 'legend'): TemplateResult | typeof nothing {
        if (!items.length) {
            return nothing;
        }

        return html`
            <div class=${className} part="legend" role="group" aria-label=${this.seriesLabel}>
                ${items.map((item) => html`
                    <button
                        type="button"
                        class="legend-item"
                        aria-pressed=${this.hiddenKeys.has(item.key) ? 'false' : 'true'}
                        @click=${() => this.toggleLegend(item)}
                    >
                        <span
                            class=${classMap({ key: true, line: item.shape === 'line', dash: item.shape === 'dash' })}
                            style=${styleMap({ '--_key-color': item.color })}
                        ></span>
                        <span class="legend-label">${item.label}</span>
                        ${item.value ? html`<span class="legend-value">${item.value}</span>` : nothing}
                        ${item.share ? html`<span class="legend-share">${item.share}</span>` : nothing}
                    </button>
                `)}
            </div>
        `;
    }

    private renderTable(): TemplateResult | typeof nothing {
        if (!this.env || !this.resolved) {
            return nothing;
        }

        const model = this.buildTable(this.env, this.resolved);

        return html`
            <table>
                <caption>${this.label}</caption>
                <thead>
                    <tr>
                        ${model.head.map((cell) => html`<th scope="col" class=${cell.numeric ? 'numeric' : ''}>${cell.text}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${model.rows.map((row) => html`
                        <tr>
                            ${row.map((cell, index) => index === 0
                                ? html`<th scope="row">${cell}</th>`
                                : html`<td class=${model.head[index]?.numeric ? 'numeric' : ''}>${cell}</td>`)}
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    private renderState(mode: Exclude<ChartMode, 'ready'>): TemplateResult {
        if (mode === 'loading') {
            return html`
                <pk-state-panel class="loading" part="state" size="sm" heading=${this.loadingLabel}>
                    <pk-spinner slot="icon" size="xs"></pk-spinner>
                </pk-state-panel>
            `;
        }

        const error = mode === 'error';
        const message = error ? this.errorMessage : this.emptyMessage;

        return html`
            <pk-state-panel
                part="state"
                size="sm"
                variant=${error ? 'error' : 'empty'}
                heading=${error ? this.errorHeading : this.emptyHeading}
                announce=${error ? 'polite' : 'off'}
            >
                <slot name=${mode}>${message ? html`<p>${message}</p>` : nothing}</slot>
                ${error ? html`<slot name="state-actions" slot="actions"></slot>` : nothing}
            </pk-state-panel>
        `;
    }

    override render() {
        const mode = this.mode;
        const ready = mode === 'ready';
        const table = this.view === 'table';
        const legend = ready && this.env && this.resolved && this.legend !== 'none'
            ? this.buildLegend(this.env, this.resolved)
            : [];
        const toolbarLegend = this.legendInToolbar && !table ? legend : [];
        const showToolbar = ready && (toolbarLegend.length > 0 || this.tableToggle);

        return html`
            <div
                part="base"
                class=${classMap({ base: true, refreshing: ready && this.state === 'loading' })}
                aria-busy=${this.state === 'loading' ? 'true' : 'false'}
            >
                ${showToolbar ? html`
                    <div class="toolbar" part="toolbar">
                        ${this.renderLegend(toolbarLegend)}
                        ${this.tableToggle ? html`
                            <div class="toggle" role="group" aria-label=${this.viewLabel}>
                                <button type="button" aria-pressed=${table ? 'false' : 'true'} @click=${() => this.setView('chart')}>${this.chartLabel}</button>
                                <button type="button" aria-pressed=${table ? 'true' : 'false'} @click=${() => this.setView('table')}>${this.tableLabel}</button>
                            </div>
                        ` : nothing}
                    </div>
                ` : nothing}
                <div class="body" part="body">
                    <div
                        class=${classMap({ plot: true, 'html-plot': this.htmlPlot })}
                        part="plot"
                        role="img"
                        aria-roledescription="chart"
                        aria-label=${`${this.label}. ${this.tableAvailableLabel}`}
                        aria-describedby=${this.description ? 'description' : nothing}
                        tabindex=${ready && !table && !this.htmlPlot ? '0' : '-1'}
                        ?hidden=${!ready || table}
                        @keydown=${this.handleKeydown}
                        @blur=${this.clearActive}
                    >
                        ${this.htmlPlot ? (ready ? this.renderPlot() : nothing) : html`
                            <canvas aria-hidden="true"></canvas>
                            <div class="overlay" aria-hidden="true">${ready ? this.renderOverlay() : nothing}</div>
                            <div class="tooltip" part="tooltip" aria-hidden="true"></div>
                        `}
                    </div>
                    ${ready && !table ? this.renderSupplement(legend) : nothing}
                    <div class=${table ? 'table-wrap' : 'table-wrap sr-only'} part="table" ?hidden=${!ready}>
                        ${ready ? this.renderTable() : nothing}
                    </div>
                    ${ready ? nothing : this.renderState(mode)}
                </div>
                ${this.description ? html`<p id="description" class="sr-only">${this.description}</p>` : nothing}
                <div class="live sr-only" aria-live="polite"></div>
            </div>
        `;
    }
}
