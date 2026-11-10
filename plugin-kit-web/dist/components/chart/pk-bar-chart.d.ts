import { ChartConfiguration, TooltipItem } from 'chart.js';
import { PkChartElement } from './pk-chart-element.js';
import { ChartEnvironment, LegendItem, ResolvedChartData, TableModel, TooltipModel } from './shared.js';
export type PkBarChartOrientation = 'vertical' | 'horizontal';
export type PkBarChartStacked = '' | 'normal' | 'percent';
/**
 * Bar chart: vertical or horizontal, grouped, stacked or 100% stacked.
 *
 * Bars are capped at 24px with a rounded end. Stacked segments are separated by a
 * 2px gap in the surface colour and only the outermost segment is rounded. For
 * `stacked="percent"` the element normalises each category to 100% and the tooltip
 * and table show both the share and the underlying value.
 */
export declare class PkBarChart extends PkChartElement {
    /** `horizontal` lays categories down the side, which suits long labels and ranked lists. */
    orientation: PkBarChartOrientation;
    /** Stack series: `normal` sums them, `percent` shows each as a share of its category. */
    stacked: PkBarChartStacked;
    /** Print each bar's value at its end. Best for single-series ranked bars. */
    valueLabels: boolean;
    /** Title under the horizontal axis, e.g. a unit. */
    xLabel: string;
    /** Title beside the vertical axis. */
    yLabel: string;
    /** Fix the start of the value axis. Ignored for 100% stacks. */
    min: number | null;
    /** Fix the end of the value axis instead of fitting the data. Ignored for 100% stacks. */
    max: number | null;
    private get horizontal();
    protected get rebuildOnLegendToggle(): boolean;
    private get stackMode();
    /** Only the last visible non-zero segment of a stack gets rounded corners. */
    private isOuterSegment;
    protected buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;
    protected buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[];
    protected buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;
    protected buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-bar-chart': PkBarChart;
    }
}
//# sourceMappingURL=pk-bar-chart.d.ts.map