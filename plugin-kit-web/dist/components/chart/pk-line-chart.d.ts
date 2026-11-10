import { ChartConfiguration, TooltipItem } from 'chart.js';
import { PkChartElement } from './pk-chart-element.js';
import { ChartEnvironment, LegendItem, ResolvedChartData, TableModel, TooltipModel } from './shared.js';
export type PkLineChartCurve = 'smooth' | 'linear';
/**
 * Line or area chart for one or more series over a category or date axis, with an
 * optional dashed previous period from `data.comparisonRows`.
 *
 * With one series the previous period is a neutral dashed line; with several, each
 * previous period is dashed in its own series colour so the pairs stay identifiable.
 * One tooltip lists every series at the hovered point, with the change against the
 * previous period.
 */
export declare class PkLineChart extends PkChartElement {
    /** Fill the area under each line with a fading wash. */
    area: boolean;
    /** `smooth` uses monotone curves that never overshoot the data. */
    curve: PkLineChartCurve;
    /** Title under the horizontal axis, e.g. a unit. */
    xLabel: string;
    /** Title beside the vertical axis. */
    yLabel: string;
    /** Fix the start of the value axis. Defaults to zero, or below it for negative data. */
    min: number | null;
    /** Fix the end of the value axis instead of fitting the data. */
    max: number | null;
    protected buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;
    protected buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[];
    protected buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;
    protected buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-line-chart': PkLineChart;
    }
}
//# sourceMappingURL=pk-line-chart.d.ts.map