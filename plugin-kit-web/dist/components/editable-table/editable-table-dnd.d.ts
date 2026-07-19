export type EditableTableSortableRow = {
    id: string;
    element: HTMLTableRowElement;
    handle?: HTMLElement;
};
export type EditableTableDndCallbacks = {
    /**
     * Commit reorder from the seated DOM order (stable `data-row-id`s).
     * Prefer this over from/to indices — the floated source row stays in the
     * tbody during drag, so index math is easy to get wrong after cancels.
     */
    onReorderTo: (orderedIds: string[]) => void;
};
/**
 * Table-native pointer drag for `<pk-editable-table>` rows.
 *
 * The live source `<tr>` becomes the floating overlay (same custom-element
 * instances — no clone reflow / “shift”). A hidden placeholder clone stays in
 * the tbody as the gap. Overlay motion is vertical-axis + tbody constrained.
 * Gap steps when the probe enters ~30% of a neighbor (direction-aware).
 * Drop commits by reading `data-row-id` order after seating — not index arithmetic.
 */
export declare class EditableTableDndController {
    private readonly callbacks;
    /** Fraction of each row height for the direction-aware swap band. */
    private static readonly SWAP_INSET;
    private rows;
    private disabled;
    private handleCleanups;
    private dragSession;
    constructor(callbacks: EditableTableDndCallbacks);
    get isActive(): boolean;
    /** Lit must not reconcile tbody while pointer drag owns row order. */
    get isSessionActive(): boolean;
    sync(rows: EditableTableSortableRow[], disabled: boolean): void;
    destroy(): void;
    private handlePointerDown;
    /** Vertical-axis + tbody-container constraints on the live floated row. */
    private updateOverlay;
    /**
     * Project the gap from the probe against the full row list.
     * Threshold is direction-aware so drag-up and drag-down feel the same.
     */
    private updateGap;
    private commitDrag;
    private cancelDrag;
    private restorePlaceholderToOrigin;
    private cleanupDrag;
    private freezeTableColumns;
    private createPlaceholder;
    /**
     * Promote the live row to a fixed overlay. Same pattern dnd-kit Feedback uses
     * for `<tr>`: pin cell widths, then position:fixed (raw TR rects go 0×0 otherwise).
     *
     * Returns the fixed-positioning origin in viewport coords. `position: fixed`
     * is viewport-based only when no ancestor is a containing block; a transformed
     * ancestor (pk-dialog panel animation, filters, contain) re-bases it, which
     * silently threw the overlay outside the dialog and made the row "disappear".
     */
    private liftRow;
    private unliftRow;
    private destroyHandles;
}
//# sourceMappingURL=editable-table-dnd.d.ts.map