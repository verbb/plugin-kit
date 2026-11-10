import { nothing, TemplateResult } from 'lit';
import { ChartConfiguration, TooltipItem } from 'chart.js';
import { PkPointSelectDetail } from '../../events/pk-chart.js';
import { PkChartElement } from './pk-chart-element.js';
import { ChartEnvironment, LegendItem, ResolvedChartData, TableModel, TooltipModel } from './shared.js';
/**
 * Donut chart for part-to-whole at a glance. `cols` are `[category, value]`; each row
 * is one segment.
 *
 * Above `max-segments` the smallest tail folds into one "Other" segment, so the chart
 * never needs a ninth colour; the data table still lists every row. The centre shows
 * the total of the visible segments and the legend lists each value and share.
 */
export declare class PkDonutChart extends PkChartElement {
    static styles: import('lit').CSSResult[];
    /** Most segments drawn before the tail folds into "Other". */
    maxSegments: number;
    /** Label of the segment that collects rows beyond `max-segments`. */
    otherLabel: string;
    /** Label for each segment's percentage in tooltips and the table. */
    shareLabel: string;
    protected get legendInToolbar(): boolean;
    private get segments();
    protected prepare(data: ResolvedChartData): ResolvedChartData;
    private colors;
    /** Hidden state follows the category, so a refresh that reorders segments keeps it. */
    private visibleTotal;
    protected legendKeys(): Set<string>;
    protected pointDetail(_datasetIndex: number, index: number): PkPointSelectDetail | null;
    protected buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;
    protected applyHidden(update: boolean): void;
    protected pointCount(): number;
    protected activeElementsAt(index: number): {
        datasetIndex: number;
        index: number;
    }[];
    protected buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[];
    protected renderSupplement(legend: LegendItem[]): TemplateResult | typeof nothing;
    protected renderOverlay(): TemplateResult | typeof nothing;
    protected buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;
    protected buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-donut-chart': PkDonutChart;
    }
}
//# sourceMappingURL=pk-donut-chart.d.ts.map