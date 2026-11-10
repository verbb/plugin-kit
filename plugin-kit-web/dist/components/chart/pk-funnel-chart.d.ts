import { nothing, TemplateResult } from 'lit';
import { ChartConfiguration, TooltipItem } from 'chart.js';
import { PkChartElement } from './pk-chart-element.js';
import { ChartEnvironment, ResolvedChartData, TableModel, TooltipModel } from './shared.js';
export type PkFunnelChartShape = 'steps' | 'centered' | 'tracks';
/**
 * Funnel built from bars, with no funnel plugin. `cols` are `[stage, value]` and each
 * row is one stage in order.
 *
 * Stages are ordered, so they use the single-hue `--pk-chart-ordinal-*` ramp that
 * darkens toward the outcome. `steps` (the default) draws columns with each stage's
 * count and its share of the previous step beneath; `centered` draws centred bars
 * with the share of the first step beside each. `tracks` draws HTML columns: each stage's
 * label and count above a tall track filled to its share of the first stage, with a caption
 * beneath. Captions come from `notes` in the data, or default as in `steps`.
 *
 * @csspart stage - One `tracks` column.
 * @csspart track - A `tracks` column's unfilled track.
 * @csspart fill - A `tracks` column's fill. The last stage's fill also has `fill-last`.
 * @cssproperty --pk-funnel-fill - `tracks` fill colour. Defaults to `--pk-chart-ordinal-3`.
 * @cssproperty --pk-funnel-track - `tracks` track colour. Defaults to a tint of the fill.
 * @cssproperty --pk-funnel-track-height - `tracks` track height. Defaults to 56px.
 */
export declare class PkFunnelChart extends PkChartElement {
    static styles: import('lit').CSSResult[];
    /**
     * `steps` draws columns with stage details beneath; `centered` draws centred horizontal
     * bars; `tracks` draws each stage's details around a tall filled track.
     */
    shape: PkFunnelChartShape;
    /** Follows each stage's conversion from the previous stage. */
    ofPreviousLabel: string;
    /** Follows each stage's share of the first stage. */
    ofFirstLabel: string;
    protected get htmlPlot(): boolean;
    private get stages();
    protected prepare(data: ResolvedChartData): ResolvedChartData;
    /** Spread the four ordinal tokens across however many stages there are. */
    private colors;
    protected buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration;
    /** A stage's caption: its note from the data, else `firstNote` or the share of the previous stage. */
    private renderNote;
    protected renderPlot(): TemplateResult | typeof nothing;
    protected renderSupplement(): TemplateResult | typeof nothing;
    protected buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null;
    protected buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-funnel-chart': PkFunnelChart;
    }
}
//# sourceMappingURL=pk-funnel-chart.d.ts.map