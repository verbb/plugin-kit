import type { Chart, ChartType, Plugin } from 'chart.js';
import type { ChangePositive, FormatSpec, ValueFormatter } from '@verbb/plugin-kit-core/utils/format';

import { resolveHostLocale } from '../../utils/host-date.js';

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
    notes?: (string | { rate: number; text: string } | null)[];
};

export type ResolvedColumn = ChartColumn & { slot: number };

export type ResolvedChartData = Omit<ChartData, 'cols'> & { cols: ResolvedColumn[] };

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
    change?: { text: string; direction: number; tone: string } | null;
};

export type TooltipModel = {
    title: string;
    rows: TooltipRow[];
    footer?: [string, string];
};

export type TableModel = {
    head: { text: string; numeric?: boolean }[];
    rows: string[][];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyChart = Chart<ChartType, any[], unknown>;

/** Pinned slots are reserved first; unpinned series take the lowest free slot. */
export function resolveColumns(cols: ChartColumn[]): ResolvedColumn[] {
    const used = new Set(cols.slice(1).map((col) => col.color).filter((slot): slot is number => Boolean(slot)));
    let next = 1;

    return cols.map((col, index) => {
        if (index === 0) {
            return { ...col, slot: 0 };
        }

        // Value columns are numbers unless a type says otherwise.
        const valueCol = { ...col, type: col.type ?? 'number' as const };

        if (col.color) {
            return { ...valueCol, slot: col.color };
        }

        while (used.has(next)) {
            next++;
        }

        used.add(next);

        return { ...valueCol, slot: next };
    });
}

export function seriesColor(theme: ChartTheme, col: ResolvedColumn): string {
    return theme.series[(col.slot - 1) % theme.series.length];
}

/** Canvas cannot resolve `var()`; read the computed tokens from the element instead. */
export function readChartTheme(element: Element): ChartTheme {
    const style = getComputedStyle(element);
    const token = (name: string) => style.getPropertyValue(name).trim();

    return {
        series: [1, 2, 3, 4, 5, 6, 7, 8].map((slot) => token(`--pk-chart-series-${slot}`) || '#2563eb'),
        ordinal: [1, 2, 3, 4].map((step) => token(`--pk-chart-ordinal-${step}`) || '#2563eb'),
        other: token('--pk-chart-other') || '#9ca3af',
        comparison: token('--pk-chart-comparison') || '#8b95a1',
        surface: token('--pk-chart-surface') || '#fff',
        text: token('--pk-chart-text') || '#1f2933',
        secondary: token('--pk-chart-text-secondary') || '#515f6c',
        muted: token('--pk-chart-text-muted') || '#606d7b',
        grid: token('--pk-chart-grid') || '#e4ebf3',
        axis: token('--pk-chart-axis') || '#cdd6e0',
        crosshair: token('--pk-chart-crosshair') || '#9aa5b1',
        font: token('--pk-font-family') || 'system-ui, sans-serif',
    };
}

export function prefersReducedMotion(): boolean {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function readEnvironment(element: HTMLElement, locale: string): ChartEnvironment {
    return {
        locale: locale || resolveHostLocale(),
        rtl: getComputedStyle(element).direction === 'rtl',
        reducedMotion: prefersReducedMotion(),
        theme: readChartTheme(element),
    };
}

let probe: CanvasRenderingContext2D | null = null;

/** Apply an alpha to any CSS colour the canvas understands (hex, rgb(), hsl()). */
export function withAlpha(color: string, alpha: number): string {
    probe ??= document.createElement('canvas').getContext('2d');

    if (!probe) {
        return color;
    }

    probe.fillStyle = '#000';
    probe.fillStyle = color;
    const normalised = String(probe.fillStyle);
    let channels: number[];

    if (normalised.startsWith('#')) {
        channels = [1, 3, 5].map((start) => parseInt(normalised.slice(start, start + 2), 16));
    } else {
        channels = (normalised.match(/[\d.]+/g) ?? ['0', '0', '0']).slice(0, 3).map(Number);
    }

    return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
}

/** Vertical fade from the series colour to transparent, used for area washes. */
export function areaGradient(color: string, top = 0.2) {
    return (context: { chart: AnyChart }) => {
        const area = context.chart.chartArea;

        if (!area) {
            return withAlpha(color, top / 2);
        }

        const gradient = context.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
        gradient.addColorStop(0, withAlpha(color, top));
        gradient.addColorStop(1, withAlpha(color, 0));

        return gradient;
    };
}

type CrosshairOptions = { enabled?: boolean; color?: string };

/** Vertical hairline at the active index, drawn beneath the series. */
export const crosshairPlugin: Plugin = {
    id: 'pkCrosshair',
    beforeDatasetsDraw(chart, _args, options: CrosshairOptions) {
        if (!options?.enabled) {
            return;
        }

        const active = chart.getActiveElements();

        if (!active.length) {
            return;
        }

        const x = Math.round(active[0].element.x) + 0.5;
        const { top, bottom } = chart.chartArea;
        const { ctx } = chart;

        ctx.save();
        ctx.strokeStyle = options.color ?? '#9aa5b1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.stroke();
        ctx.restore();
    },
};

type ValueLabelOptions = {
    enabled?: boolean;
    horizontal?: boolean;
    rtl?: boolean;
    color?: string;
    font?: string;
    format?: (datasetIndex: number, index: number) => string;
};

/** Selective value labels at the end of each bar, in text colour (never the series colour). */
export const valueLabelPlugin: Plugin = {
    id: 'pkValueLabels',
    afterDatasetsDraw(chart, _args, options: ValueLabelOptions) {
        if (!options?.enabled || !options.format) {
            return;
        }

        const { ctx } = chart;

        ctx.save();
        ctx.font = `500 11px ${options.font ?? 'system-ui'}`;
        ctx.fillStyle = options.color ?? '#515f6c';

        chart.data.datasets.forEach((_dataset, datasetIndex) => {
            if (!chart.isDatasetVisible(datasetIndex)) {
                return;
            }

            chart.getDatasetMeta(datasetIndex).data.forEach((element, index) => {
                const text = options.format!(datasetIndex, index);

                if (!text) {
                    return;
                }

                if (options.horizontal) {
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = options.rtl ? 'right' : 'left';
                    ctx.fillText(text, element.x + (options.rtl ? -6 : 6), element.y);
                } else {
                    ctx.textBaseline = 'bottom';
                    ctx.textAlign = 'center';
                    ctx.fillText(text, element.x, element.y - 4);
                }
            });
        });

        ctx.restore();
    },
};

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
export function buildScales(env: ChartEnvironment, options: AxisOptions) {
    const { theme } = env;
    const category = {
        type: 'category' as const,
        stacked: Boolean(options.stacked),
        display: !options.hideCategory,
        reverse: false,
        position: undefined as 'left' | 'right' | undefined,
        grid: { display: false },
        border: { display: true, color: theme.axis },
        ticks: {
            color: theme.muted,
            maxRotation: 0,
            // A label down the side belongs to one bar, so skipping it leaves that bar unexplained.
            autoSkip: options.indexAxis !== 'y',
            autoSkipPadding: 18,
            padding: 6,
            font: { size: 11, family: theme.font },
            callback(this: { getLabelForValue(value: number): unknown }, value: string | number) {
                return options.categoryFormat(this.getLabelForValue(Number(value)));
            },
        },
    };
    const value = {
        type: 'linear' as const,
        stacked: Boolean(options.stacked),
        display: !options.hideValue,
        beginAtZero: true,
        min: options.min,
        max: options.max,
        reverse: false,
        position: undefined as 'left' | 'right' | undefined,
        grid: { color: theme.grid, drawTicks: false },
        border: { display: false },
        ticks: {
            color: theme.muted,
            padding: 8,
            maxTicksLimit: options.step ? undefined : 5,
            stepSize: options.step,
            font: { size: 11, family: theme.font },
            callback: (tick: string | number) => options.valueFormat(Number(tick)),
        },
    };

    const title = (text?: string) => ({
        display: Boolean(text),
        text: text ?? '',
        color: theme.muted,
        font: { size: 11, family: theme.font },
    });
    let scales: { x: typeof category | typeof value; y: typeof category | typeof value };

    if ((options.indexAxis ?? 'x') === 'x') {
        category.reverse = env.rtl;
        value.position = env.rtl ? 'right' : 'left';
        scales = { x: category, y: value };
    } else {
        value.reverse = env.rtl;
        category.position = env.rtl ? 'right' : 'left';
        category.ticks.color = theme.secondary;
        category.border = { display: false, color: theme.axis };
        scales = { x: value, y: category };
    }

    return {
        x: { ...scales.x, title: title(options.xLabel) },
        y: { ...scales.y, title: title(options.yLabel) },
    };
}

/** Whole-unit tick steps for duration axes, so labels read 1m, 2m, 3m rather than 50s, 1m 40s. */
export function durationStep(max: number): number {
    const steps = [1, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 10800, 21600, 43200, 86400];

    return steps.find((step) => max / step <= 5) ?? 86400;
}

type ThemeListener = () => void;

const themeListeners = new Set<ThemeListener>();
let themeObserver: MutationObserver | null = null;
let themeFrame = 0;

function notifyThemeListeners(): void {
    cancelAnimationFrame(themeFrame);
    themeFrame = requestAnimationFrame(() => themeListeners.forEach((listener) => listener()));
}

/**
 * One shared watcher for theme, direction, language and motion changes on the document.
 * Charts redraw from tokens when any of these change.
 */
export function observeChartTheme(listener: ThemeListener): () => void {
    if (!themeObserver && typeof MutationObserver === 'function') {
        themeObserver = new MutationObserver(notifyThemeListeners);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'dir', 'lang'],
        });

        if (typeof matchMedia === 'function') {
            matchMedia('(prefers-color-scheme: dark)').addEventListener('change', notifyThemeListeners);
            matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', notifyThemeListeners);
        }
    }

    themeListeners.add(listener);

    return () => {
        themeListeners.delete(listener);
    };
}
