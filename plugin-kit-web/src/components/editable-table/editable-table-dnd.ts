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
export class EditableTableDndController {
    /** Fraction of each row height for the direction-aware swap band. */
    private static readonly SWAP_INSET = 0.3;

    private rows: EditableTableSortableRow[] = [];
    private disabled = false;
    private handleCleanups: Array<() => void> = [];
    private dragSession: DragSession | null = null;

    constructor(private readonly callbacks: EditableTableDndCallbacks) {}

    get isActive(): boolean {
        return this.handleCleanups.length > 0;
    }

    /** Lit must not reconcile tbody while pointer drag owns row order. */
    get isSessionActive(): boolean {
        return this.dragSession !== null;
    }

    sync(rows: EditableTableSortableRow[], disabled: boolean): void {
        if (this.dragSession) {
            return;
        }

        this.destroyHandles();
        this.rows = rows;
        this.disabled = disabled;

        for (const row of rows) {
            if (!row.handle) {
                continue;
            }

            const onPointerDown = (event: PointerEvent) => {
                this.handlePointerDown(event, row);
            };

            row.handle.addEventListener('pointerdown', onPointerDown);
            this.handleCleanups.push(() => {
                row.handle?.removeEventListener('pointerdown', onPointerDown);
            });
        }
    }

    destroy(): void {
        this.cancelDrag();
        this.destroyHandles();
        this.rows = [];
    }

    private handlePointerDown(event: PointerEvent, row: EditableTableSortableRow): void {
        if (
            this.disabled
            || this.dragSession
            || event.button !== 0
            || !event.isPrimary
        ) {
            return;
        }

        const fromIndex = this.rows.findIndex((candidate) => candidate.id === row.id);
        const tbody = row.element.parentElement;
        const table = row.element.closest('table');
        if (
            fromIndex < 0
            || !(tbody instanceof HTMLTableSectionElement)
            || !(table instanceof HTMLTableElement)
        ) {
            return;
        }

        event.preventDefault();

        const cellWidths = [...row.element.cells].map((cell) => cell.getBoundingClientRect().width);
        const unfreezeColumns = this.freezeTableColumns(table, cellWidths);
        const sourceRect = row.element.getBoundingClientRect();
        const tbodyRect = tbody.getBoundingClientRect();
        const pointerOffset = {
            x: event.clientX - sourceRect.left,
            y: event.clientY - sourceRect.top,
        };

        const placeholder = this.createPlaceholder(row.element, cellWidths, sourceRect.height);
        row.element.insertAdjacentElement('afterend', placeholder);

        // Float the live row — true visual snapshot (same pk-* instances, no clone shift).
        const fixedOrigin = this.liftRow(row.element, sourceRect, cellWidths);

        const session: DragSession = {
            row,
            fromIndex,
            table,
            tbody,
            placeholder,
            pointerId: event.pointerId,
            pointerOffset,
            startLeft: sourceRect.left,
            rowHeight: sourceRect.height,
            tbodyTop: tbodyRect.top,
            tbodyBottom: tbodyRect.bottom,
            fixedOrigin,
            unfreezeColumns,
            cleanup: [],
            committed: false,
        };

        const doc = row.element.ownerDocument;
        const onPointerMove = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== session.pointerId || session.committed) {
                return;
            }

            moveEvent.preventDefault();
            const liveTbody = session.tbody.getBoundingClientRect();
            session.tbodyTop = liveTbody.top;
            session.tbodyBottom = liveTbody.bottom;
            this.updateOverlay(session, moveEvent.clientY);
            this.updateGap(session, moveEvent.clientY - session.pointerOffset.y + session.rowHeight / 2);
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== session.pointerId || session.committed) {
                return;
            }

            upEvent.preventDefault();
            this.commitDrag(session);
        };

        const onPointerCancel = (cancelEvent: PointerEvent) => {
            if (cancelEvent.pointerId !== session.pointerId || session.committed) {
                return;
            }
            // Browser cancel must restore original slot — seating at the live
            // placeholder without a data commit left DOM/data diverged (random jumps).
            this.cancelDrag();
        };

        doc.addEventListener('pointermove', onPointerMove, { passive: false });
        doc.addEventListener('pointerup', onPointerUp, { passive: false });
        doc.addEventListener('pointercancel', onPointerCancel);
        session.cleanup.push(
            () => { doc.removeEventListener('pointermove', onPointerMove); },
            () => { doc.removeEventListener('pointerup', onPointerUp); },
            () => { doc.removeEventListener('pointercancel', onPointerCancel); },
        );

        this.dragSession = session;
        this.updateOverlay(session, event.clientY);
    }

    /** Vertical-axis + tbody-container constraints on the live floated row. */
    private updateOverlay(session: DragSession, clientY: number): void {
        const rawTop = clientY - session.pointerOffset.y;
        const minTop = session.tbodyTop;
        const maxTop = Math.max(minTop, session.tbodyBottom - session.rowHeight);
        const top = Math.min(maxTop, Math.max(minTop, rawTop));
        const row = session.row.element;
        // Viewport coords minus the fixed-positioning origin — a transformed ancestor
        // (e.g. pk-dialog panel) re-bases position:fixed away from the viewport.
        row.style.top = `${top - session.fixedOrigin.y}px`;
        row.style.left = `${session.startLeft - session.fixedOrigin.x}px`;
    }

    /**
     * Project the gap from the probe against the full row list.
     * Threshold is direction-aware so drag-up and drag-down feel the same.
     */
    private updateGap(session: DragSession, probeY: number): void {
        const placeholder = session.placeholder;
        const source = session.row.element;
        const rows = [...session.tbody.querySelectorAll<HTMLTableRowElement>('tr[data-row-id]')].filter(
            (row) => row !== source && !row.hasAttribute('data-pk-dnd-placeholder'),
        );

        const placeholderRect = placeholder.getBoundingClientRect();
        const movingUp = probeY < placeholderRect.top + placeholderRect.height / 2;
        const inset = EditableTableDndController.SWAP_INSET;

        let before: HTMLTableRowElement | null = null;
        for (const row of rows) {
            const rect = row.getBoundingClientRect();
            if (rect.height <= 0) {
                continue;
            }

            const thresholdY = movingUp
                ? rect.top + rect.height * (1 - inset)
                : rect.top + rect.height * inset;

            if (probeY < thresholdY) {
                before = row;
                break;
            }
        }

        if (before) {
            if (placeholder.nextElementSibling !== before) {
                session.tbody.insertBefore(placeholder, before);
            }
            return;
        }

        if (session.tbody.lastElementChild !== placeholder) {
            session.tbody.append(placeholder);
        }
    }

    private commitDrag(session: DragSession): void {
        if (session.committed || this.dragSession !== session) {
            return;
        }
        session.committed = true;

        // Seat the live row where the placeholder is — DOM order is source of truth.
        this.cleanupDrag(session);
        this.dragSession = null;

        const orderedIds = [...session.tbody.querySelectorAll<HTMLTableRowElement>('tr[data-row-id]')]
            .map((row) => row.dataset.rowId ?? '')
            .filter((id) => id !== '');

        this.callbacks.onReorderTo(orderedIds);
    }

    private cancelDrag(): void {
        const session = this.dragSession;
        if (!session || session.committed) {
            return;
        }
        session.committed = true;

        // Restore the gap to the pre-drag slot before seating, so we don't leave
        // a visually moved DOM that Lit later snaps back (or compounds on next drop).
        this.restorePlaceholderToOrigin(session);
        this.cleanupDrag(session);
        this.dragSession = null;
    }

    private restorePlaceholderToOrigin(session: DragSession): void {
        const others = [...session.tbody.querySelectorAll<HTMLTableRowElement>('tr[data-row-id]')].filter(
            (row) => row !== session.row.element && !row.hasAttribute('data-pk-dnd-placeholder'),
        );

        // among others+placeholder, origin slot is fromIndex (source removed from the count).
        if (session.fromIndex >= others.length) {
            if (session.tbody.lastElementChild !== session.placeholder) {
                session.tbody.append(session.placeholder);
            }
            return;
        }

        const before = others[session.fromIndex];
        if (before && session.placeholder.nextElementSibling !== before) {
            session.tbody.insertBefore(session.placeholder, before);
        }
    }

    private cleanupDrag(session: DragSession): void {
        for (const cleanup of session.cleanup) {
            cleanup();
        }

        const row = session.row.element;
        // Seat the live row where the placeholder was, then drop float styles.
        session.placeholder.replaceWith(row);
        this.unliftRow(row);
        session.unfreezeColumns();
    }

    private freezeTableColumns(table: HTMLTableElement, widths: number[]): () => void {
        const previous = table.querySelector(':scope > colgroup[data-pk-dnd-cols]');
        previous?.remove();

        const colgroup = table.ownerDocument.createElement('colgroup');
        colgroup.setAttribute('data-pk-dnd-cols', 'true');
        for (const width of widths) {
            const col = table.ownerDocument.createElement('col');
            col.style.width = `${width}px`;
            colgroup.append(col);
        }

        const previousLayout = table.style.tableLayout;
        table.prepend(colgroup);
        table.style.tableLayout = 'fixed';
        return () => {
            colgroup.remove();
            table.style.tableLayout = previousLayout;
        };
    }

    private createPlaceholder(
        row: HTMLTableRowElement,
        cellWidths: number[],
        height: number,
    ): HTMLTableRowElement {
        const placeholder = row.cloneNode(true) as HTMLTableRowElement;
        placeholder.setAttribute('data-pk-dnd-placeholder', 'true');
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.removeAttribute('data-row-id');
        placeholder.style.visibility = 'hidden';
        placeholder.style.pointerEvents = 'none';
        placeholder.style.height = `${height}px`;

        [...placeholder.cells].forEach((cell, index) => {
            const width = cellWidths[index];
            if (typeof width === 'number') {
                cell.style.width = `${width}px`;
                cell.style.minWidth = `${width}px`;
                cell.style.maxWidth = `${width}px`;
                cell.style.boxSizing = 'border-box';
            }
            // Drop cloned controls so they don't upgrade / steal focus while hidden.
            cell.replaceChildren();
        });

        return placeholder;
    }

    /**
     * Promote the live row to a fixed overlay. Same pattern dnd-kit Feedback uses
     * for `<tr>`: pin cell widths, then position:fixed (raw TR rects go 0×0 otherwise).
     *
     * Returns the fixed-positioning origin in viewport coords. `position: fixed`
     * is viewport-based only when no ancestor is a containing block; a transformed
     * ancestor (pk-dialog panel animation, filters, contain) re-bases it, which
     * silently threw the overlay outside the dialog and made the row "disappear".
     */
    private liftRow(row: HTMLTableRowElement, rect: DOMRect, cellWidths: number[]): { x: number; y: number } {
        row.classList.add('is-dragging');
        [...row.cells].forEach((cell, index) => {
            const width = cellWidths[index];
            if (typeof width === 'number') {
                cell.style.width = `${width}px`;
                cell.style.minWidth = `${width}px`;
                cell.style.maxWidth = `${width}px`;
                cell.style.boxSizing = 'border-box';
            }
        });

        row.style.position = 'fixed';
        // Probe where fixed (0,0) actually lands before applying real coords.
        row.style.top = '0px';
        row.style.left = '0px';
        row.style.width = `${rect.width}px`;
        row.style.height = `${rect.height}px`;
        row.style.margin = '0';
        row.style.zIndex = '2147483647';
        row.style.pointerEvents = 'none';
        // Tailwind shadow-lg — softer / lower than the old single-layer slate drop.
        row.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
        row.style.background = 'var(--pk-color-white, #fff)';
        row.style.opacity = '0.96';

        const probe = row.getBoundingClientRect();
        const fixedOrigin = { x: probe.left, y: probe.top };
        row.style.top = `${rect.top - fixedOrigin.y}px`;
        row.style.left = `${rect.left - fixedOrigin.x}px`;

        return fixedOrigin;
    }

    private unliftRow(row: HTMLTableRowElement): void {
        row.classList.remove('is-dragging');
        row.style.position = '';
        row.style.top = '';
        row.style.left = '';
        row.style.width = '';
        row.style.height = '';
        row.style.margin = '';
        row.style.zIndex = '';
        row.style.pointerEvents = '';
        row.style.boxShadow = '';
        row.style.background = '';
        row.style.opacity = '';

        for (const cell of row.cells) {
            cell.style.width = '';
            cell.style.minWidth = '';
            cell.style.maxWidth = '';
            cell.style.boxSizing = '';
        }
    }

    private destroyHandles(): void {
        for (const cleanup of this.handleCleanups) {
            cleanup();
        }
        this.handleCleanups = [];
    }
}

type DragSession = {
    row: EditableTableSortableRow;
    fromIndex: number;
    table: HTMLTableElement;
    tbody: HTMLTableSectionElement;
    placeholder: HTMLTableRowElement;
    pointerId: number;
    pointerOffset: { x: number; y: number };
    startLeft: number;
    rowHeight: number;
    tbodyTop: number;
    tbodyBottom: number;
    /** Viewport offset of the fixed-positioning containing block (0,0 unless an ancestor re-bases fixed). */
    fixedOrigin: { x: number; y: number };
    unfreezeColumns: () => void;
    cleanup: Array<() => void>;
    /** Prevents double commit from pointerup + pointercancel. */
    committed: boolean;
};
