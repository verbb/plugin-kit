import { nothing, CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { ChartConfiguration, TooltipItem } from 'chart.js';
import { PkElement } from '../../base/pk-element.js';
import { PkPointSelectDetail } from '../../events/pk-chart.js';
import { AnyChart, ChartData, ChartEnvironment, DatasetMeta, LegendItem, ResolvedChartData, TableModel, TooltipModel, TooltipRow } from './shared.js';
export type PkChartState = '' | 'loading' | 'empty' | 'error';
export type PkChartView = 'chart' | 'table';
export type PkChartLegend = 'auto' | 'none';
type ChartMode = 'ready' | 'loading' | 'empty' | 'error';
export declare const datasetMeta: (dataset: unknown) => DatasetMeta;
/** Build a change pill (arrow plus signed text) as DOM, for tooltips. */
export declare function changeElement(change: NonNullable<TooltipRow['change']>): HTMLElement;
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
export declare abstract class PkChartElement extends PkElement {
    static styles: CSSResultGroup;
    /**
     * Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`.
     * Accepts JSON from the `data` attribute. Assign a new object to update it.
     */
    data: ChartData | null;
    /** Accessible name for the chart and caption for its data table. */
    label: string;
    /** `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it. */
    state: PkChartState;
    /** `table` shows the data table in place of the chart. */
    view: PkChartView;
    /** Show the chart/table toggle. */
    tableToggle: boolean;
    /** `auto` shows a legend whenever there is more than one series. */
    legend: PkChartLegend;
    /** BCP 47 locale for numbers and dates. Defaults to the Craft or document locale. */
    locale: string;
    /** Heading of the empty state. */
    emptyHeading: string;
    /** Message under the empty-state heading. The `empty` slot replaces it. */
    emptyMessage: string;
    /** Heading of the error state. */
    errorHeading: string;
    /** Message under the error-state heading. The `error` slot replaces it. */
    errorMessage: string;
    /** Text beside the spinner while the first data loads. */
    loadingLabel: string;
    /** Text of the chart button in the chart/table toggle. */
    chartLabel: string;
    /** Text of the table button in the chart/table toggle. */
    tableLabel: string;
    /** Accessible name of the chart/table toggle. */
    viewLabel: string;
    /** Accessible name of the legend. */
    seriesLabel: string;
    /** Longer explanation for screen readers, ideally the chart's key takeaway. */
    description: string;
    /** Appended to the chart's accessible name to point screen-reader users to the data table. */
    tableAvailableLabel: string;
    /** Label for stack totals in tooltips and the table column. */
    totalLabel: string;
    /** Legend keys whose series are hidden. */
    protected hiddenKeys: ReadonlySet<string>;
    private canvas?;
    private plot?;
    private tooltipElement?;
    private liveRegion?;
    protected chart: AnyChart | null;
    protected env?: ChartEnvironment;
    protected resolved?: ResolvedChartData;
    private activeIndex;
    private needsBuild;
    private animateNext;
    private hasAnimated;
    private stopThemeObserver?;
    private spokenTooltip;
    /** Ready-to-use Chart.js configuration for the prepared data. */
    protected abstract buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;
    protected abstract buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;
    protected abstract buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;
    protected buildLegend(_env: ChartEnvironment, _data: ResolvedChartData): LegendItem[];
    /** Derive element-specific fields from the data (folding, normalising, conversion rates). */
    protected prepare(data: ResolvedChartData): ResolvedChartData;
    /** Content centred over the plot, such as a donut total. */
    protected renderOverlay(): TemplateResult | typeof nothing;
    /**
     * Whether the element draws its plot as HTML from `renderPlot()` instead of a Chart.js
     * canvas, as the funnel's `tracks` shape does. The table view, states and description
     * still come from this class; canvas tooltips and keyboard point navigation don't apply.
     */
    protected get htmlPlot(): boolean;
    /** The plot's content when `htmlPlot` is true. */
    protected renderPlot(): TemplateResult | typeof nothing;
    /** Content after the plot, such as a side legend or funnel stage labels. */
    protected renderSupplement(_legend: LegendItem[]): TemplateResult | typeof nothing;
    /** Where the legend renders: the toolbar above the plot, or the element's own supplement. */
    protected get legendInToolbar(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** The live Chart.js instance is internal; use attributes and events instead. */
    protected get mode(): ChartMode;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(): void;
    private destroyChart;
    private buildChart;
    /** Sync dataset visibility with the hidden legend keys. */
    protected applyHidden(update: boolean): void;
    /** Keys a legend item can hide for this data. Series ids plus the comparison key by default. */
    protected legendKeys(data: ResolvedChartData): Set<string>;
    /** True when hiding a series changes the drawing itself (e.g. 100% stacks renormalise). */
    protected get rebuildOnLegendToggle(): boolean;
    /** Event detail for a selected point. Subclasses map folded or derived points back to data. */
    protected pointDetail(datasetIndex: number, index: number): PkPointSelectDetail | null;
    protected toggleLegend(item: LegendItem): void;
    private setView;
    private drawTooltip;
    private keyElement;
    protected pointCount(): number;
    protected activeElementsAt(index: number): {
        datasetIndex: number;
        index: number;
    }[];
    private handleKeydown;
    private setActive;
    private clearActive;
    private selectPoint;
    protected renderLegend(items: LegendItem[], className?: string): TemplateResult | typeof nothing;
    private renderTable;
    private renderState;
    render(): TemplateResult<1>;
}
export {};
//# sourceMappingURL=pk-chart-element.d.ts.map