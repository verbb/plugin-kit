import { Chart, ChartType, Plugin } from 'chart.js';
import { ChangePositive, FormatSpec, ValueFormatter } from '@verbb/plugin-kit-core/utils/format';
/** One column of chart data. The first column is the category or date axis. */
export type ChartColumn = FormatSpec & {
    id: string;
    label: string;
    /** Pin the series to colour slot 1–8 so it keeps its colour when other series are filtered out. */
    color?: number;
    /** Direction that counts as an improvement when comparing periods. Defaults to `up`. */
    positive?: ChangePositive;
};
export type ChartRow = readonly unknown[];
/**
 * Shared data shape for every chart element.
 * `rows` hold the first column's key followed by one value per series.
 * `comparisonRows` align with `rows` by index; their first cell is the previous period's own key.
 */
export type ChartData = {
    cols: ChartColumn[];
    rows: ChartRow[];
    /** Legend label for the current period when a single series has a comparison. */
    currentLabel?: string;
    comparisonLabel?: string;
    comparisonRows?: ChartRow[];
    /** Optional caption under the first funnel stage, e.g. a value at risk. */
    firstNote?: string;
    /**
     * Optional captions under each funnel stage, aligned with `rows`. A string replaces the
     * stage's caption; `{ rate, text }` shows `rate` as a bold percentage followed by `text`.
     * `null` keeps the default (`firstNote` for the first stage, the share of the previous
     * stage after that).
     */
    notes?: (string | {
        rate: number;
        text: string;
    } | null)[];
};
export type ResolvedColumn = ChartColumn & {
    slot: number;
};
export type ResolvedChartData = Omit<ChartData, 'cols'> & {
    cols: ResolvedColumn[];
};
export type ChartTheme = {
    series: string[];
    ordinal: string[];
    other: string;
    comparison: string;
    surface: string;
    text: string;
    secondary: string;
    muted: string;
    grid: string;
    axis: string;
    crosshair: string;
    font: string;
};
export type ChartEnvironment = {
    locale: string;
    rtl: boolean;
    reducedMotion: boolean;
    theme: ChartTheme;
};
/** Extra fields the chart elements attach to Chart.js datasets. */
export type DatasetMeta = {
    pkKey: string;
    pkColumn: ResolvedColumn;
    pkColor: string;
    pkKind?: 'primary' | 'comparison';
    pkSeriesIndex?: number;
    /** Unnormalised values, when `data` holds derived values (100% stacks, funnel ranges). */
    pkRaw?: unknown[];
};
export type LegendItem = {
    key: string;
    label: string;
    color: string;
    shape: 'line' | 'dash' | 'rect';
    value?: string;
    share?: string;
};
export type TooltipRow = {
    label: string;
    value: string;
    color?: string;
    shape?: 'line' | 'dash' | 'rect';
    change?: {
        text: string;
        direction: number;
        tone: string;
    } | null;
};
export type TooltipModel = {
    title: string;
    rows: TooltipRow[];
    footer?: [string, string];
};
export type TableModel = {
    head: {
        text: string;
        numeric?: boolean;
    }[];
    rows: string[][];
};
export type AnyChart = Chart<ChartType, any[], unknown>;
/** Pinned slots are reserved first; unpinned series take the lowest free slot. */
export declare function resolveColumns(cols: ChartColumn[]): ResolvedColumn[];
export declare function seriesColor(theme: ChartTheme, col: ResolvedColumn): string;
/** Canvas cannot resolve `var()`; read the computed tokens from the element instead. */
export declare function readChartTheme(element: Element): ChartTheme;
export declare function prefersReducedMotion(): boolean;
export declare function readEnvironment(element: HTMLElement, locale: string): ChartEnvironment;
/** Apply an alpha to any CSS colour the canvas understands (hex, rgb(), hsl()). */
export declare function withAlpha(color: string, alpha: number): string;
/** Vertical fade from the series colour to transparent, used for area washes. */
export declare function areaGradient(color: string, top?: number): (context: {
    chart: AnyChart;
}) => string | CanvasGradient;
/** Vertical hairline at the active index, drawn beneath the series. */
export declare const crosshairPlugin: Plugin;
/** Selective value labels at the end of each bar, in text colour (never the series colour). */
export declare const valueLabelPlugin: Plugin;
export type AxisOptions = {
    indexAxis?: 'x' | 'y';
    /** Title under the horizontal axis. */
    xLabel?: string;
    /** Title beside the vertical axis. */
    yLabel?: string;
    stacked?: boolean;
    min?: number;
    max?: number;
    step?: number;
    hideCategory?: boolean;
    hideValue?: boolean;
    categoryFormat: ValueFormatter;
    valueFormat: ValueFormatter;
};
/** Category plus linear value scales with recessive hairline grid, mirrored for RTL. */
export declare function buildScales(env: ChartEnvironment, options: AxisOptions): {
    x: {
        title: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                family: string;
            };
        };
        type: "category";
        stacked: boolean;
        display: boolean;
        reverse: boolean;
        position: "left" | "right" | undefined;
        grid: {
            display: boolean;
        };
        border: {
            display: boolean;
            color: string;
        };
        ticks: {
            color: string;
            maxRotation: number;
            autoSkip: boolean;
            autoSkipPadding: number;
            padding: number;
            font: {
                size: number;
                family: string;
            };
            callback(this: {
                getLabelForValue(value: number): unknown;
            }, value: string | number): string;
        };
    } | {
        title: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                family: string;
            };
        };
        type: "linear";
        stacked: boolean;
        display: boolean;
        beginAtZero: boolean;
        min: number | undefined;
        max: number | undefined;
        reverse: boolean;
        position: "left" | "right" | undefined;
        grid: {
            color: string;
            drawTicks: boolean;
        };
        border: {
            display: boolean;
        };
        ticks: {
            color: string;
            padding: number;
            maxTicksLimit: number | undefined;
            stepSize: number | undefined;
            font: {
                size: number;
                family: string;
            };
            callback: (tick: string | number) => string;
        };
    };
    y: {
        title: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                family: string;
            };
        };
        type: "category";
        stacked: boolean;
        display: boolean;
        reverse: boolean;
        position: "left" | "right" | undefined;
        grid: {
            display: boolean;
        };
        border: {
            display: boolean;
            color: string;
        };
        ticks: {
            color: string;
            maxRotation: number;
            autoSkip: boolean;
            autoSkipPadding: number;
            padding: number;
            font: {
                size: number;
                family: string;
            };
            callback(this: {
                getLabelForValue(value: number): unknown;
            }, value: string | number): string;
        };
    } | {
        title: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                family: string;
            };
        };
        type: "linear";
        stacked: boolean;
        display: boolean;
        beginAtZero: boolean;
        min: number | undefined;
        max: number | undefined;
        reverse: boolean;
        position: "left" | "right" | undefined;
        grid: {
            color: string;
            drawTicks: boolean;
        };
        border: {
            display: boolean;
        };
        ticks: {
            color: string;
            padding: number;
            maxTicksLimit: number | undefined;
            stepSize: number | undefined;
            font: {
                size: number;
                family: string;
            };
            callback: (tick: string | number) => string;
        };
    };
};
/** Whole-unit tick steps for duration axes, so labels read 1m, 2m, 3m rather than 50s, 1m 40s. */
export declare function durationStep(max: number): number;
type ThemeListener = () => void;
/**
 * One shared watcher for theme, direction, language and motion changes on the document.
 * Charts redraw from tokens when any of these change.
 */
export declare function observeChartTheme(listener: ThemeListener): () => void;
export {};
//# sourceMappingURL=shared.d.ts.map