export type PkPointSelectDetail = {
    /** Row index in the chart's `data.rows`. */
    index: number;
    /** The selected row from `data.rows`, or `null` for a derived point such as a donut's "Other". */
    row: readonly unknown[] | null;
    /** Column id of the selected series. */
    series: string;
    /** Raw (unformatted) value at that point. */
    value: unknown;
};
/** Emitted when a point, bar, segment or stage is clicked, or chosen with Enter or Space. */
export declare class PkPointSelectEvent extends Event {
    readonly detail: PkPointSelectDetail;
    constructor(detail: PkPointSelectDetail);
}
export type PkLegendToggleDetail = {
    key: string;
    label: string;
    hidden: boolean;
};
/** Emitted when a legend item hides or shows its series. */
export declare class PkLegendToggleEvent extends Event {
    readonly detail: PkLegendToggleDetail;
    constructor(detail: PkLegendToggleDetail);
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-point-select': PkPointSelectEvent;
        'pk-legend-toggle': PkLegendToggleEvent;
    }
}
//# sourceMappingURL=pk-chart.d.ts.map