import { c as r, f as A, i as e, l as n, m as i, o, p as b, t as c, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { J as xmark, S as gear, b as ellipsis, l as arrowUp, o as arrowDown, z as plus } from "../../chunks/svg-BCGsRUz7.js";
import { t as getIcon } from "../../chunks/registry-CmL0rH9r.js";
import "../../chunks/pk-button-CK5FZiwP.js";
import { t as RequiredValidator } from "../../chunks/required-validator-DXqqPVeW.js";
import "../../chunks/pk-checkbox-CoDX2G3J.js";
import "../../chunks/pk-color-input-B73zaGYj.js";
import "../../chunks/pk-input-CXE7_rTQ.js";
import "../../chunks/pk-textarea-Ch8JpP83.js";
import { n as renderIconHtml } from "../../chunks/render-BCU9WDSk.js";
import "../../chunks/pk-dropdown-item-DkZRcPJ5.js";
import "../../chunks/pk-dropdown-menu-CajQAobW.js";
import "../../chunks/pk-lightswitch-BHEOy7aK.js";
import "../../chunks/pk-option-vh8UvSAI.js";
import "../../chunks/pk-select-CbmPJCx8.js";
import "../../chunks/pk-date-picker-CE4TlRRZ.js";
import "../../chunks/pk-combobox-fXGaY4L0.js";
import "../../chunks/pk-time-picker-DZljwJn9.js";
//#region src/components/editable-table/editable-table-dnd.ts
/**
* Table-native pointer drag for `<pk-editable-table>` rows.
*
* The live source `<tr>` becomes the floating overlay (same custom-element
* instances — no clone reflow / “shift”). A hidden placeholder clone stays in
* the tbody as the gap. Overlay motion is vertical-axis + tbody constrained.
* Gap steps when the probe enters ~30% of a neighbor (direction-aware).
* Drop commits by reading `data-row-id` order after seating — not index arithmetic.
*/
var EditableTableDndController = class EditableTableDndController {
	static {
		this.SWAP_INSET = .3;
	}
	constructor(callbacks) {
		this.callbacks = callbacks;
		this.rows = [];
		this.disabled = false;
		this.handleCleanups = [];
		this.dragSession = null;
	}
	get isActive() {
		return this.handleCleanups.length > 0;
	}
	/** Lit must not reconcile tbody while pointer drag owns row order. */
	get isSessionActive() {
		return this.dragSession !== null;
	}
	sync(rows, disabled) {
		if (this.dragSession) return;
		this.destroyHandles();
		this.rows = rows;
		this.disabled = disabled;
		for (const row of rows) {
			if (!row.handle) continue;
			const onPointerDown = (event) => {
				this.handlePointerDown(event, row);
			};
			row.handle.addEventListener("pointerdown", onPointerDown);
			this.handleCleanups.push(() => {
				row.handle?.removeEventListener("pointerdown", onPointerDown);
			});
		}
	}
	destroy() {
		this.cancelDrag();
		this.destroyHandles();
		this.rows = [];
	}
	handlePointerDown(event, row) {
		if (this.disabled || this.dragSession || event.button !== 0 || !event.isPrimary) return;
		const fromIndex = this.rows.findIndex((candidate) => candidate.id === row.id);
		const tbody = row.element.parentElement;
		const table = row.element.closest("table");
		if (fromIndex < 0 || !(tbody instanceof HTMLTableSectionElement) || !(table instanceof HTMLTableElement)) return;
		event.preventDefault();
		const cellWidths = [...row.element.cells].map((cell) => cell.getBoundingClientRect().width);
		const unfreezeColumns = this.freezeTableColumns(table, cellWidths);
		const sourceRect = row.element.getBoundingClientRect();
		const tbodyRect = tbody.getBoundingClientRect();
		const pointerOffset = {
			x: event.clientX - sourceRect.left,
			y: event.clientY - sourceRect.top
		};
		const placeholder = this.createPlaceholder(row.element, cellWidths, sourceRect.height);
		row.element.insertAdjacentElement("afterend", placeholder);
		const fixedOrigin = this.liftRow(row.element, sourceRect, cellWidths);
		const session = {
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
			committed: false
		};
		const doc = row.element.ownerDocument;
		const onPointerMove = (moveEvent) => {
			if (moveEvent.pointerId !== session.pointerId || session.committed) return;
			moveEvent.preventDefault();
			const liveTbody = session.tbody.getBoundingClientRect();
			session.tbodyTop = liveTbody.top;
			session.tbodyBottom = liveTbody.bottom;
			this.updateOverlay(session, moveEvent.clientY);
			this.updateGap(session, moveEvent.clientY - session.pointerOffset.y + session.rowHeight / 2);
		};
		const onPointerUp = (upEvent) => {
			if (upEvent.pointerId !== session.pointerId || session.committed) return;
			upEvent.preventDefault();
			this.commitDrag(session);
		};
		const onPointerCancel = (cancelEvent) => {
			if (cancelEvent.pointerId !== session.pointerId || session.committed) return;
			this.cancelDrag();
		};
		doc.addEventListener("pointermove", onPointerMove, { passive: false });
		doc.addEventListener("pointerup", onPointerUp, { passive: false });
		doc.addEventListener("pointercancel", onPointerCancel);
		session.cleanup.push(() => {
			doc.removeEventListener("pointermove", onPointerMove);
		}, () => {
			doc.removeEventListener("pointerup", onPointerUp);
		}, () => {
			doc.removeEventListener("pointercancel", onPointerCancel);
		});
		this.dragSession = session;
		this.updateOverlay(session, event.clientY);
	}
	/** Vertical-axis + tbody-container constraints on the live floated row. */
	updateOverlay(session, clientY) {
		const rawTop = clientY - session.pointerOffset.y;
		const minTop = session.tbodyTop;
		const maxTop = Math.max(minTop, session.tbodyBottom - session.rowHeight);
		const top = Math.min(maxTop, Math.max(minTop, rawTop));
		const row = session.row.element;
		row.style.top = `${top - session.fixedOrigin.y}px`;
		row.style.left = `${session.startLeft - session.fixedOrigin.x}px`;
	}
	/**
	* Project the gap from the probe against the full row list.
	* Threshold is direction-aware so drag-up and drag-down feel the same.
	*/
	updateGap(session, probeY) {
		const placeholder = session.placeholder;
		const source = session.row.element;
		const rows = [...session.tbody.querySelectorAll("tr[data-row-id]")].filter((row) => row !== source && !row.hasAttribute("data-pk-dnd-placeholder"));
		const placeholderRect = placeholder.getBoundingClientRect();
		const movingUp = probeY < placeholderRect.top + placeholderRect.height / 2;
		const inset = EditableTableDndController.SWAP_INSET;
		let before = null;
		for (const row of rows) {
			const rect = row.getBoundingClientRect();
			if (rect.height <= 0) continue;
			if (probeY < (movingUp ? rect.top + rect.height * (1 - inset) : rect.top + rect.height * inset)) {
				before = row;
				break;
			}
		}
		if (before) {
			if (placeholder.nextElementSibling !== before) session.tbody.insertBefore(placeholder, before);
			return;
		}
		if (session.tbody.lastElementChild !== placeholder) session.tbody.append(placeholder);
	}
	commitDrag(session) {
		if (session.committed || this.dragSession !== session) return;
		session.committed = true;
		this.cleanupDrag(session);
		this.dragSession = null;
		const orderedIds = [...session.tbody.querySelectorAll("tr[data-row-id]")].map((row) => row.dataset.rowId ?? "").filter((id) => id !== "");
		this.callbacks.onReorderTo(orderedIds);
	}
	cancelDrag() {
		const session = this.dragSession;
		if (!session || session.committed) return;
		session.committed = true;
		this.restorePlaceholderToOrigin(session);
		this.cleanupDrag(session);
		this.dragSession = null;
	}
	restorePlaceholderToOrigin(session) {
		const others = [...session.tbody.querySelectorAll("tr[data-row-id]")].filter((row) => row !== session.row.element && !row.hasAttribute("data-pk-dnd-placeholder"));
		if (session.fromIndex >= others.length) {
			if (session.tbody.lastElementChild !== session.placeholder) session.tbody.append(session.placeholder);
			return;
		}
		const before = others[session.fromIndex];
		if (before && session.placeholder.nextElementSibling !== before) session.tbody.insertBefore(session.placeholder, before);
	}
	cleanupDrag(session) {
		for (const cleanup of session.cleanup) cleanup();
		const row = session.row.element;
		session.placeholder.replaceWith(row);
		this.unliftRow(row);
		session.unfreezeColumns();
	}
	freezeTableColumns(table, widths) {
		table.querySelector(":scope > colgroup[data-pk-dnd-cols]")?.remove();
		const colgroup = table.ownerDocument.createElement("colgroup");
		colgroup.setAttribute("data-pk-dnd-cols", "true");
		for (const width of widths) {
			const col = table.ownerDocument.createElement("col");
			col.style.width = `${width}px`;
			colgroup.append(col);
		}
		const previousLayout = table.style.tableLayout;
		table.prepend(colgroup);
		table.style.tableLayout = "fixed";
		return () => {
			colgroup.remove();
			table.style.tableLayout = previousLayout;
		};
	}
	createPlaceholder(row, cellWidths, height) {
		const placeholder = row.cloneNode(true);
		placeholder.setAttribute("data-pk-dnd-placeholder", "true");
		placeholder.setAttribute("aria-hidden", "true");
		placeholder.removeAttribute("data-row-id");
		placeholder.style.visibility = "hidden";
		placeholder.style.pointerEvents = "none";
		placeholder.style.height = `${height}px`;
		[...placeholder.cells].forEach((cell, index) => {
			const width = cellWidths[index];
			if (typeof width === "number") {
				cell.style.width = `${width}px`;
				cell.style.minWidth = `${width}px`;
				cell.style.maxWidth = `${width}px`;
				cell.style.boxSizing = "border-box";
			}
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
	liftRow(row, rect, cellWidths) {
		row.classList.add("is-dragging");
		[...row.cells].forEach((cell, index) => {
			const width = cellWidths[index];
			if (typeof width === "number") {
				cell.style.width = `${width}px`;
				cell.style.minWidth = `${width}px`;
				cell.style.maxWidth = `${width}px`;
				cell.style.boxSizing = "border-box";
			}
		});
		row.style.position = "fixed";
		row.style.top = "0px";
		row.style.left = "0px";
		row.style.width = `${rect.width}px`;
		row.style.height = `${rect.height}px`;
		row.style.margin = "0";
		row.style.zIndex = "2147483647";
		row.style.pointerEvents = "none";
		row.style.boxShadow = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
		row.style.background = "var(--pk-color-white, #fff)";
		row.style.opacity = "0.96";
		const probe = row.getBoundingClientRect();
		const fixedOrigin = {
			x: probe.left,
			y: probe.top
		};
		row.style.top = `${rect.top - fixedOrigin.y}px`;
		row.style.left = `${rect.left - fixedOrigin.x}px`;
		return fixedOrigin;
	}
	unliftRow(row) {
		row.classList.remove("is-dragging");
		row.style.position = "";
		row.style.top = "";
		row.style.left = "";
		row.style.width = "";
		row.style.height = "";
		row.style.margin = "";
		row.style.zIndex = "";
		row.style.pointerEvents = "";
		row.style.boxShadow = "";
		row.style.background = "";
		row.style.opacity = "";
		for (const cell of row.cells) {
			cell.style.width = "";
			cell.style.minWidth = "";
			cell.style.maxWidth = "";
			cell.style.boxSizing = "";
		}
	}
	destroyHandles() {
		for (const cleanup of this.handleCleanups) cleanup();
		this.handleCleanups = [];
	}
};
//#endregion
//#region src/components/editable-table/pk-editable-table.styles.ts
var pkEditableTableStyles = i`
    @layer pk-component {
        :host {
            display: block;
            font-family: var(--pk-font-family);
            /* Craft CP body text (~gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            /* Shell matches v1 Table: border-gray-200 + rounded-md (token md = 4px). */
            --pk-et-border: 1px solid var(--pk-color-gray-200, #e5e7eb);
            --pk-et-radius: var(--pk-radius-md, 4px);
            --pk-et-gridline: var(--pk-color-gray-100, #f3f4f6);
            /* Static row height — matches v1 TableCell h-[34px] (border-box). */
            --pk-et-cell-height: 34px;
            --pk-et-action-size: 24px;
            --pk-et-action-icon: 12px;
            /* Grip reads smaller than ellipsis/x at the same token — nudge up slightly. */
            --pk-et-action-grip-icon: 14px;
        }

        /* v1 Table: shell scrolls horizontally; Add row sits outside so it stays full-width. */
        .et-scroll {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            border: var(--pk-et-border);
            border-radius: var(--pk-et-radius) var(--pk-et-radius) 0 0;
            background: var(--pk-color-white, #fff);
        }

        .et {
            /* v1 Table uses w-full: fill the shell, squish toward column width hints /
             * content minima, then overflow-x on .et-scroll takes over. */
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background: var(--pk-color-white, #fff);
        }

        thead {
            background: var(--pk-color-gray-50, #f8fafc);
        }

        thead th {
            padding: 0.375rem 0.5rem;
            text-align: left;
            font-size: 12px;
            font-weight: 500;
            color: var(--pk-color-gray-700, #374151);
            background: var(--pk-color-gray-50, #f8fafc);
            /* v1 TableHead has no cell borders — body cells own the gridlines. */
            border: 0;
            white-space: nowrap;
        }

        tbody td + td {
            border-inline-start: 1px solid var(--pk-et-gridline);
        }

        thead th.thin,
        tbody td.thin {
            width: 0.01%;
            white-space: nowrap;
        }

        thead th.actions,
        tbody td.actions {
            width: 0.01%;
            white-space: nowrap;
        }

        tbody td.actions {
            padding-inline: 0.25rem;
            /* v1 TableRow actions cell — soft cool wash so controls read as chrome, not data. */
            background: #fbfcfe;
        }

        .required {
            margin-left: 0.125rem;
            color: var(--pk-color-rose-600, #e11d48);
        }

        tbody td {
            box-sizing: border-box;
            padding: 0;
            height: var(--pk-et-cell-height);
            background: var(--pk-color-white, #fff);
            /* v1 TableCell: border-t gray-100 — also separates header once th borders are gone. */
            border-top: 1px solid var(--pk-et-gridline);
            vertical-align: middle;
            /* Match v1 TableCell whitespace-nowrap — drives intrinsic mins before scroll. */
            white-space: nowrap;
            /* Let auto table layout compress past control preferred sizes. */
            min-width: 0;
        }

        tbody tr.is-dragging {
            opacity: 0.4;
        }

        /* Semantic row tones from modifyRow — host Tailwind cannot style shadow <tr>. */
        tbody tr[data-tone='warning'] > td {
            background: color-mix(in srgb, var(--pk-color-amber-50, #fffbeb) 80%, transparent);
        }

        tbody tr[data-tone='muted'] > td {
            background: color-mix(in srgb, var(--pk-color-slate-100, #f1f5f9) 90%, transparent);
        }

        .cell-pk-control {
            display: block;
            width: 100%;
            min-width: 0;
            height: var(--pk-et-cell-height);
            min-height: var(--pk-et-cell-height);
            --pk-input-border-radius: 0;
            --pk-select-border-radius: 0;
            --pk-date-picker-border-radius: 0;
            --pk-input-bg: var(--pk-color-white, #fff);
            --pk-combobox-fill: var(--pk-color-white, #fff);
            --pk-input-height: var(--pk-et-cell-height);
        }

        pk-input.cell-pk-control::part(base) {
            padding-inline: 0.5rem;
            background: var(--pk-color-white, #fff);
        }

        /* v1 EditableTable Input is text-sm (14px); size=xs would be 11px. */
        pk-input.cell-pk-control:not([mono])::part(input) {
            font-size: var(--pk-font-size-base, 14px);
        }

        /* v1 handle/value: font-mono text-[0.9em] — do not let the 14px cell
         * override wipe pk-input[mono]'s optical scale. */
        pk-input.cell-pk-control[mono]::part(input) {
            font-size: calc(var(--pk-font-size-base, 14px) * 0.9);
            line-height: var(--pk-line-height-mono, 1.5);
        }

        /* Select/combobox sit inset horizontally only (v1 TableCell px-2).
         * No block padding — vertical inset comes from the size=xs chip itself. */
        tbody td:has(> pk-select.cell-pk-control),
        tbody td:has(> pk-combobox.cell-pk-control) {
            padding: 0 0.5rem;
        }

        pk-select.cell-pk-control,
        pk-combobox.cell-pk-control {
            display: block;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            /* Override shared .cell-pk-control height so the chip centers in the row. */
            height: auto;
            min-height: 0;
            /* Don't inherit the 34px cell --pk-input-height into the trigger. */
            --pk-input-height: auto;
            --pk-select-item-min-height: 0;
        }

        pk-input.cell-pk-control {
            /* Text-like cells fill the td. Inner input text keeps padding via ::part(base);
             * invalid chrome should hit the gridlines, not sit inside an inset chip. */
            height: var(--pk-et-cell-height);
            min-height: var(--pk-et-cell-height);
        }

        /* Date/time fill the cell flush — no trigger chrome (v1 border-none + h/w-full).
         * display:block so the inline-block host doesn't baseline-shift off center. */
        pk-date-picker.cell-pk-control,
        pk-time-picker.cell-pk-control {
            display: block;
            width: 100%;
            min-width: 0;
            height: var(--pk-et-cell-height);
            --pk-date-picker-height: var(--pk-et-cell-height);
            --pk-date-picker-min-width: 0;
            --pk-select-item-min-height: var(--pk-et-cell-height);
            --pk-select-trigger-border-width: 0;
        }

        /* The base trigger sizes to 100% of the host, but the shared form-control
         * wrappers default to auto height, collapsing that chain and top-aligning
         * the date. Stretch the wrappers so 100% resolves and align-items centers. */
        pk-date-picker.cell-pk-control::part(form-control),
        pk-date-picker.cell-pk-control::part(form-control-input) {
            height: 100%;
        }

        pk-date-picker.cell-pk-control::part(base) {
            width: 100%;
            min-width: 0;
            height: 100%;
            min-height: 100%;
            border: 0;
            border-radius: 0;
            background: transparent;
        }

        pk-date-picker.cell-pk-control::part(base):focus-visible {
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200, #e5e7eb);
        }

        pk-time-picker.cell-pk-control::part(control) {
            width: 100%;
            min-width: 0;
            height: 100% !important;
            min-height: 100% !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            background-color: transparent !important;
        }

        pk-time-picker.cell-pk-control::part(control):focus-visible {
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200, #e5e7eb);
        }

        td.has-error .cell-pk-control {
            --pk-input-border-color: var(--pk-color-rose-600, #e11d48);
        }

        /* Flush/borderless date/time only — select/combobox/color paint their own
         * invalid chrome via ?invalid, so a host ring would double up. */
        td.has-error pk-date-picker.cell-pk-control,
        td.has-error pk-time-picker.cell-pk-control {
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600, #e11d48);
        }

        .cell-static {
            padding: 0.5rem;
            font-size: var(--pk-font-size-base, 14px);
            line-height: 1.4;
            color: inherit;
        }

        /* Custom / slotted cells — fill the td; light-DOM content keeps host styles. */
        .cell-slot {
            display: block;
            width: 100%;
            min-width: 0;
            min-height: var(--pk-et-cell-height);
            height: 100%;
        }

        .cell-slot ::slotted(*) {
            display: block;
            width: 100%;
            min-width: 0;
            min-height: var(--pk-et-cell-height);
            box-sizing: border-box;
        }

        .cell-heading {
            font-weight: 600;
            color: var(--pk-color-gray-800, #1f2937);
        }

        .cell-mono {
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
        }

        .cell-check {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--pk-et-cell-height);
            min-width: 2.125rem;
        }

        .cell-check--switch {
            min-width: 3rem;
        }

        pk-checkbox,
        pk-radio,
        pk-lightswitch {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .row-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            /* v1 packs 24px action buttons flush — no gap between hitboxes. */
            gap: 0;
        }

        .row-actions pk-dropdown-menu {
            display: inline-flex;
        }

        /* Action row buttons: fixed 24px hitbox (v1), variant=none, icon-only color hover. */
        .row-actions pk-button.action-btn {
            --pk-btn-height: var(--pk-et-action-size);
            --pk-btn-icon-size: var(--pk-et-action-icon);
            --pk-btn-padding-inline: 0;
            color: var(--pk-color-gray-500, #6b7280);
            width: var(--pk-et-action-size);
            flex: 0 0 var(--pk-et-action-size);
        }

        .row-actions pk-button.action-btn::part(base) {
            width: var(--pk-et-action-size);
            height: var(--pk-et-action-size);
            min-height: var(--pk-et-action-size);
            padding: 0;
            background: transparent;
        }

        .row-actions pk-button.action-btn::part(base):hover:not(:disabled) {
            /* No hover fill — only the glyph color shifts (v1 hover:bg-transparent). */
            background: transparent;
            color: var(--pk-color-sky-600, #0284c7);
        }

        .row-actions pk-button.action-btn.action-delete::part(base):hover:not(:disabled) {
            background: transparent;
            color: var(--pk-color-rose-500, #f43f5e);
        }

        .row-actions pk-button.action-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        /* Light-DOM handle wrapper (v1) — pointer drag binds here so shadow clicks don't interfere.
           pk-button :host { cursor: pointer } wins over inherited span cursor — set it on the host. */
        .row-actions .action-handle {
            display: inline-flex;
            cursor: move;
        }

        .row-actions .action-handle pk-button.action-btn {
            cursor: move;
            --pk-btn-icon-size: var(--pk-et-action-grip-icon);
        }

        .row-actions .action-handle:has(pk-button:disabled),
        .row-actions .action-handle pk-button.action-btn[disabled] {
            cursor: default;
        }

        /* Before deferred drag binding — grip visible but inactive (v1 faded controls). */
        .row-actions .action-handle.is-pending {
            opacity: 0.45;
        }

        /* Live row is floated as the overlay; placeholder clone holds the gap. */
        tr.is-dragging {
            display: table-row;
        }

        tr[data-pk-dnd-placeholder] {
            visibility: hidden;
            pointer-events: none;
        }

        /* Attach dashed add-row under the table shell (v1 Button variant=dashed). */
        pk-button.add-row {
            display: block;
            width: 100%;
            margin-top: -1px;
            --pk-btn-radius: 0;
        }

        pk-button.add-row::part(base) {
            width: 100%;
            border-top: 0;
            border-radius: 0 0 var(--pk-et-radius) var(--pk-et-radius);
        }

        :host([disabled]) pk-button.add-row {
            opacity: 0.5;
            pointer-events: none;
        }

        .empty {
            padding: 0.75rem 0.625rem;
            color: var(--pk-color-gray-500, #6b7280);
            font-size: 13px;
        }
    }
`;
//#endregion
//#region src/components/editable-table/editable-table-model.ts
var GENERATED_CELL_MODE = {
	EMPTY: "empty",
	AUTO: "auto",
	MANUAL: "manual",
	SEEDED: "seeded"
};
var isGeneratedColumn = (column) => {
	return (column.type === "handle" || column.type === "value") && Boolean(column.name) && Boolean(column.source);
};
var isThinColumn = (column) => {
	return Boolean(column.thin || column.type === "checkbox" || column.type === "lightswitch" || column.type === "radio");
};
var isEmptyCellValue = (value) => {
	return value === void 0 || value === null || value === "";
};
var getGeneratedCellKey = (rowId, columnName) => {
	return `${rowId}:${columnName}`;
};
var normalizeOptions = (options) => {
	if (!Array.isArray(options)) return [];
	return options.map((option) => {
		if (typeof option === "string") return {
			label: option,
			value: option
		};
		return {
			label: String(option.label ?? option.value ?? ""),
			value: String(option.value ?? "")
		};
	});
};
var defaultValueForColumn = (column) => {
	if (column.type === "checkbox" || column.type === "lightswitch" || column.type === "radio") return false;
	return "";
};
/**
* Craft-free handle slug for derived `handle` columns.
* Mirrors the camelCase path of `@verbb/plugin-kit-core` `generateHandle` without `window.Craft`.
*/
var generateHandle = (sourceValue) => {
	const words = sourceValue.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/['"'""[\](){}:]/g, "").split(/[^a-z0-9]+/).filter(Boolean);
	if (words.length === 0) return "";
	return words.map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
};
var rowIdCounter = 0;
var nextRowId = () => {
	rowIdCounter += 1;
	return `etr_${Date.now().toString(36)}_${rowIdCounter}`;
};
/** Named slot for a `type: 'custom'` cell — light-DOM projection into the `<td>`. */
var getCustomCellSlotName = (rowId, columnName) => {
	return `cell:${rowId}:${columnName}`;
};
var BUILTIN_COLUMN_TYPES = new Set([
	"text",
	"textarea",
	"number",
	"email",
	"url",
	"select",
	"combobox",
	"checkbox",
	"radio",
	"lightswitch",
	"color",
	"date",
	"time",
	"heading",
	"label",
	"handle",
	"value",
	"custom"
]);
var isCustomColumn = (column) => {
	const type = column.type;
	if (type === "custom") return true;
	return typeof type === "string" && !BUILTIN_COLUMN_TYPES.has(type);
};
//#endregion
//#region src/components/editable-table/pk-editable-table.ts
/** Slotted start-icon markup for pk-button (bundled — no registry lookup). */
var START_GRIP_ICON = `
    <svg slot="start" viewBox="0 0 448 512" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z"></path>
    </svg>
`;
var START_ELLIPSIS_ICON = renderIconHtml(ellipsis).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var START_ARROW_UP_ICON = renderIconHtml(arrowUp).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var START_ARROW_DOWN_ICON = renderIconHtml(arrowDown).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var START_XMARK_ICON = renderIconHtml(xmark).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var START_PLUS_ICON = renderIconHtml(plus).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var START_GEAR_ICON = renderIconHtml(gear).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
var startIconHtml = (iconName) => {
	if (!iconName) return "";
	if (iconName === "gear") return START_GEAR_ICON;
	const icon = getIcon(iconName);
	if (!icon) return "";
	return renderIconHtml(icon).replace("<svg", "<svg slot=\"start\" aria-hidden=\"true\"");
};
var PkEditableTable = class PkEditableTable extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.columns = [];
		this.rows = [];
		this.allowAdd = true;
		this.allowDelete = true;
		this.allowReorder = true;
		this.addRowLabel = "";
		this.fieldName = "";
		this.cellErrors = {};
		this.newRowDefaults = {};
		this.modifyColumn = null;
		this.modifyRow = null;
		this.getRowMenuItems = null;
		this.internalRows = [];
		this.dndReady = false;
		this.generatedCellModes = /* @__PURE__ */ new Map();
		this.dndController = new EditableTableDndController({ onReorderTo: (orderedIds) => {
			this.commitReorderByIds(orderedIds);
		} });
		this.dndIdleId = null;
		this.dndTimeoutId = null;
		this.dndRowSignature = "";
	}
	static {
		this.styles = pkEditableTableStyles;
	}
	static get validators() {
		return [...super.validators, RequiredValidator()];
	}
	willUpdate(changed) {
		if (changed.has("rows")) {
			const incoming = Array.isArray(this.rows) ? this.rows : [];
			const previous = this.internalRows;
			this.internalRows = incoming.map((row, index) => {
				const existingId = typeof row._id === "string" ? row._id : typeof previous[index]?._id === "string" ? String(previous[index]._id) : nextRowId();
				return {
					...row,
					_id: existingId
				};
			});
			this.syncGeneratedModesFromRows();
			this.syncFormValue();
		}
		if (changed.has("allowReorder") || changed.has("disabled")) this.scheduleDndHydration();
		super.willUpdate(changed);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		this.scheduleDndHydration();
	}
	shouldUpdate(changed) {
		if (this.dndController.isSessionActive) return false;
		return super.shouldUpdate(changed);
	}
	updated(changed) {
		super.updated(changed);
		if (this.dndReady && this.allowReorder && !this.disabled) {
			if (!this.dndController.isSessionActive) this.syncDndSortables();
		} else if (this.dndController.isActive && (!this.allowReorder || this.disabled || !this.dndReady)) {
			this.dndController.destroy();
			this.dndRowSignature = "";
		}
	}
	disconnectedCallback() {
		this.cancelDndHydration();
		this.dndController.destroy();
		this.dndReady = false;
		super.disconnectedCallback();
	}
	/** Serialized rows, used for form submission and required validation (empty when no rows). */
	get value() {
		return this.internalRows.length ? JSON.stringify(this.cleanRows()) : "";
	}
	get validColumns() {
		return (Array.isArray(this.columns) ? this.columns : []).filter((column) => {
			return typeof column?.name === "string" && column.name.trim() !== "";
		});
	}
	get generatedColumns() {
		return this.validColumns.filter(isGeneratedColumn);
	}
	get showActionsColumn() {
		return this.allowReorder || this.allowDelete || Boolean(this.getRowMenuItems);
	}
	cleanRows() {
		return this.internalRows.map((row) => {
			const { _id, ...rest } = row;
			return rest;
		});
	}
	/**
	* Public cell write path for slotted / framework-projected custom cells.
	* Prefer this over mutating `rows` locally so generated columns + events stay in sync.
	*/
	setCellValue(rowIndex, columnName, value) {
		const row = this.internalRows[rowIndex];
		if (!row) return;
		const base = this.validColumns.find((column) => column.name === columnName);
		if (!base) return;
		this.updateCell(rowIndex, this.resolveColumn(row, base, rowIndex), value);
	}
	resolveColumn(row, column, rowIndex) {
		const patch = this.modifyColumn?.(row, column.name, column, rowIndex);
		if (!patch || typeof patch !== "object") return column;
		return {
			...column,
			...patch,
			name: column.name
		};
	}
	resolveRowModifier(row, rowIndex) {
		const patch = this.modifyRow?.(row, rowIndex);
		if (!patch || typeof patch !== "object") return {};
		return patch;
	}
	resolveRowMenuItems(row, rowIndex) {
		const items = this.getRowMenuItems?.(row, rowIndex);
		return Array.isArray(items) ? items.filter((item) => item && typeof item.label === "string") : [];
	}
	syncGeneratedModesFromRows() {
		const generated = this.generatedColumns;
		if (this.internalRows.length === 0 || generated.length === 0) {
			this.generatedCellModes.clear();
			return;
		}
		const validKeys = /* @__PURE__ */ new Set();
		for (const row of this.internalRows) {
			const rowId = String(row._id);
			for (const column of generated) {
				const key = getGeneratedCellKey(rowId, column.name);
				validKeys.add(key);
				if (this.generatedCellModes.has(key)) continue;
				this.generatedCellModes.set(key, isEmptyCellValue(row[column.name]) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);
			}
		}
		for (const key of [...this.generatedCellModes.keys()]) if (!validKeys.has(key)) this.generatedCellModes.delete(key);
	}
	syncFormValue() {
		const serialized = JSON.stringify(this.cleanRows());
		this.setFormValue(serialized, serialized);
	}
	restoreFormState(state) {
		if (typeof state !== "string") return;
		try {
			const parsed = JSON.parse(state);
			if (Array.isArray(parsed)) this.rows = parsed;
		} catch {}
	}
	/**
	* Inner cell controls (lightswitch, checkbox, select, pickers, inputs) all
	* dispatch `pk-change`/`input`/`change` with `bubbles` + `composed`, so those
	* events would otherwise escape this component's shadow root and masquerade as
	* the table's own events. Consumers bind `pk-change` and read `detail.rows`; a
	* leaked lightswitch `pk-change` carries `{ checked }` (no `rows`), which would
	* reset `rows` to `undefined` and wipe every row. We stop them at the table
	* wrapper — cell `@pk-change`/`@input` handlers already ran at their target, and
	* the table re-dispatches its own `{ rows }` payload from the host in emitChange.
	*/
	stopInnerControlEvent(event) {
		if (event.target !== this) event.stopPropagation();
	}
	emitChange() {
		const rows = this.internalRows.map((row) => ({ ...row }));
		this.rows = rows;
		this.syncFormValue();
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { rows },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	emitCellChange(rowIndex, columnName, value, row) {
		this.dispatchEvent(new CustomEvent("pk-cell-change", {
			detail: {
				rowIndex,
				columnName,
				value,
				row
			},
			bubbles: true,
			composed: true
		}));
	}
	commitRows(next, cellChanges = []) {
		this.internalRows = next;
		this.emitChange();
		for (const change of cellChanges) this.emitCellChange(change.rowIndex, change.columnName, change.value, change.row);
	}
	updateCell(rowIndex, column, value) {
		const row = this.internalRows[rowIndex];
		if (!row) return;
		if (column.type === "radio") {
			const nextChecked = Boolean(value);
			const allowUnselect = Boolean(column.allowUnselect);
			const next = this.internalRows.map((item) => ({ ...item }));
			const cellChanges = [];
			if (nextChecked) next.forEach((item, index) => {
				const target = index === rowIndex;
				if (Boolean(item[column.name]) !== target) {
					next[index] = {
						...item,
						[column.name]: target
					};
					cellChanges.push({
						rowIndex: index,
						columnName: column.name,
						value: target,
						row: this.internalRows[index]
					});
				}
			});
			else if (allowUnselect && Boolean(row[column.name])) {
				next[rowIndex] = {
					...row,
					[column.name]: false
				};
				cellChanges.push({
					rowIndex,
					columnName: column.name,
					value: false,
					row
				});
			} else return;
			if (cellChanges.length === 0) return;
			this.commitRows(next, cellChanges);
			return;
		}
		if (isGeneratedColumn(column)) this.generatedCellModes.set(getGeneratedCellKey(String(row._id), column.name), isEmptyCellValue(value) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.MANUAL);
		const sourceUpdate = { [column.name]: value };
		const derivedUpdates = {};
		for (const targetColumn of this.generatedColumns) {
			if (targetColumn.source !== column.name) continue;
			const targetKey = getGeneratedCellKey(String(row._id), targetColumn.name);
			const currentTargetValue = row[targetColumn.name];
			const existingMode = this.generatedCellModes.get(targetKey) ?? (isEmptyCellValue(currentTargetValue) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);
			if (existingMode === GENERATED_CELL_MODE.MANUAL || existingMode === GENERATED_CELL_MODE.SEEDED) continue;
			if (targetColumn.type === "handle") {
				derivedUpdates[targetColumn.name] = generateHandle(String(value ?? ""));
				this.generatedCellModes.set(targetKey, GENERATED_CELL_MODE.AUTO);
			} else if (targetColumn.type === "value") {
				derivedUpdates[targetColumn.name] = value;
				this.generatedCellModes.set(targetKey, GENERATED_CELL_MODE.AUTO);
			}
		}
		const allUpdates = {
			...sourceUpdate,
			...derivedUpdates
		};
		if (!Object.entries(allUpdates).some(([key, nextValue]) => row[key] !== nextValue)) return;
		const next = this.internalRows.slice();
		next[rowIndex] = {
			...row,
			...allUpdates
		};
		const cellChanges = Object.entries(allUpdates).map(([columnName, nextValue]) => ({
			rowIndex,
			columnName,
			value: nextValue,
			row
		}));
		this.commitRows(next, cellChanges);
	}
	addRow() {
		if (this.disabled || !this.allowAdd) return;
		const row = {
			_id: nextRowId(),
			...this.newRowDefaults && typeof this.newRowDefaults === "object" ? this.newRowDefaults : {}
		};
		for (const column of this.validColumns) if (!(column.name in row)) row[column.name] = defaultValueForColumn(column);
		this.internalRows = [...this.internalRows, row];
		this.syncGeneratedModesFromRows();
		this.emitChange();
	}
	removeRow(rowIndex) {
		if (this.disabled || !this.allowDelete) return;
		this.internalRows = this.internalRows.filter((_, index) => index !== rowIndex);
		this.syncGeneratedModesFromRows();
		this.emitChange();
	}
	moveRow(rowIndex, direction) {
		const target = rowIndex + direction;
		if (this.disabled || target < 0 || target >= this.internalRows.length) return;
		this.commitReorder(rowIndex, target);
	}
	commitReorder(fromIndex, toIndex) {
		if (this.disabled || fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= this.internalRows.length || toIndex >= this.internalRows.length) return;
		const next = this.internalRows.slice();
		const [moved] = next.splice(fromIndex, 1);
		next.splice(toIndex, 0, moved);
		this.internalRows = next;
		this.emitChange();
	}
	/**
	* Apply DOM-seated order after pointer drag. Uses stable `_id`s so a floated
	* source row left in the tbody can't skew from/to index arithmetic — and so a
	* cancelled drag that briefly moved the placeholder can't desync data vs DOM.
	*/
	commitReorderByIds(orderedIds) {
		if (this.disabled || orderedIds.length === 0) return;
		const byId = new Map(this.internalRows.map((row) => [String(row._id), row]));
		if (orderedIds.length !== byId.size) return;
		const next = [];
		for (const id of orderedIds) {
			const row = byId.get(id);
			if (!row) return;
			next.push(row);
		}
		if (next.every((row, index) => row === this.internalRows[index])) return;
		this.internalRows = next;
		this.emitChange();
	}
	scheduleDndHydration() {
		this.cancelDndHydration();
		if (!this.allowReorder || this.disabled) {
			this.dndReady = false;
			this.dndController.destroy();
			return;
		}
		if (this.dndReady) return;
		const enableDnd = () => {
			this.dndIdleId = null;
			this.dndTimeoutId = null;
			this.dndReady = true;
		};
		if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") this.dndIdleId = window.requestIdleCallback(enableDnd, { timeout: 1200 });
		else this.dndTimeoutId = setTimeout(enableDnd, 250);
	}
	cancelDndHydration() {
		if (this.dndIdleId !== null && typeof window !== "undefined" && typeof window.cancelIdleCallback === "function") {
			window.cancelIdleCallback(this.dndIdleId);
			this.dndIdleId = null;
		}
		if (this.dndTimeoutId !== null) {
			clearTimeout(this.dndTimeoutId);
			this.dndTimeoutId = null;
		}
	}
	syncDndSortables() {
		if (this.dndController.isSessionActive) return;
		const signature = `${this.internalRows.map((row) => String(row._id)).join("\0")}|${this.disabled ? "1" : "0"}`;
		if (signature === this.dndRowSignature && this.dndController.isActive) return;
		const rows = [...this.renderRoot.querySelectorAll("tr[data-row-id]:not([data-pk-dnd-placeholder])")];
		this.dndController.sync(rows.map((row) => ({
			id: row.dataset.rowId ?? "",
			element: row,
			handle: row.querySelector(".action-handle") ?? void 0
		})).filter((row) => row.id !== ""), this.disabled);
		this.dndRowSignature = signature;
	}
	getCellErrors(rowIndex, columnName) {
		const errors = (this.fieldName ? this.cellErrors?.[`${this.fieldName}.${rowIndex}.${columnName}`] : void 0) ?? this.cellErrors?.[`${rowIndex}.${columnName}`];
		if (!errors) return [];
		return Array.isArray(errors) ? errors.map(String) : [String(errors)];
	}
	readValueFromEvent(event) {
		const detail = event.detail;
		if (detail && "value" in detail) return String(detail.value ?? "");
		return String(event.target.value ?? "");
	}
	readCheckedFromEvent(event) {
		const detail = event.detail;
		if (detail && "checked" in detail) return Boolean(detail.checked);
		return Boolean(event.target.checked);
	}
	renderOptionElements(column) {
		return normalizeOptions(column.options).map((option) => {
			return b`<pk-option value=${option.value}>${option.label}</pk-option>`;
		});
	}
	renderSelectLike(column, value, rowIndex, invalid, { combobox = false } = {}) {
		const current = String(value ?? "");
		if (combobox) return b`<pk-combobox
                class="cell-pk-control"
                size="sm"
                width="full"
                allow-custom-value
                .value=${current}
                placeholder=${column.placeholder ?? ""}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		}}
            >
                ${this.renderOptionElements(column)}
            </pk-combobox>`;
		return b`<pk-select
            class="cell-pk-control"
            size="xs"
            width="full"
            .value=${current}
            placeholder=${column.placeholder ?? ""}
            ?disabled=${this.disabled}
            ?invalid=${invalid}
            aria-label=${column.label ?? column.name}
            @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		}}
        >
            ${this.renderOptionElements(column)}
        </pk-select>`;
	}
	renderCell(column, row, rowIndex, invalid) {
		const value = row[column.name];
		const type = column.type ?? "text";
		const onInput = (event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		};
		if (isCustomColumn(column)) return b`<div class="cell-slot">
                <slot name=${getCustomCellSlotName(String(row._id), column.name)}></slot>
            </div>`;
		if (type === "heading") return b`<div class="cell-static cell-heading">${String(value ?? "")}</div>`;
		if (type === "label") return b`<div class="cell-static">${String(value ?? "")}</div>`;
		if (type === "textarea") return b`<pk-textarea
                class="cell-pk-control"
                fit-cell
                size="sm"
                rows="1"
                .value=${String(value ?? "")}
                placeholder=${column.placeholder ?? A}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @input=${onInput}
            ></pk-textarea>`;
		if (type === "date") return b`<pk-date-picker
                class="cell-pk-control"
                size="sm"
                width="full"
                .value=${String(value ?? "")}
                placeholder=${column.placeholder ?? ""}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		}}
            ></pk-date-picker>`;
		if (type === "time") return b`<pk-time-picker
                class="cell-pk-control"
                size="sm"
                width="full"
                .value=${String(value ?? "")}
                placeholder=${column.placeholder ?? ""}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		}}
            ></pk-time-picker>`;
		if (type === "number" || type === "email" || type === "url") return b`<pk-input
                class="cell-pk-control"
                fit-cell
                size="xs"
                type=${type}
                .value=${String(value ?? "")}
                placeholder=${column.placeholder ?? A}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @input=${onInput}
            ></pk-input>`;
		if (type === "select") return this.renderSelectLike(column, value, rowIndex, invalid);
		if (type === "combobox") return this.renderSelectLike(column, value, rowIndex, invalid, { combobox: true });
		if (type === "checkbox") return b`<div class="cell-check">
                <pk-checkbox
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
		}}
                ></pk-checkbox>
            </div>`;
		if (type === "radio") return b`<div class="cell-check">
                <pk-checkbox
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
		}}
                ></pk-checkbox>
            </div>`;
		if (type === "lightswitch") return b`<div class="cell-check cell-check--switch">
                <pk-lightswitch
                    size="sm"
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
		}}
                ></pk-lightswitch>
            </div>`;
		if (type === "color") return b`<pk-color-input
                class="cell-pk-control"
                fit-cell
                size="xs"
                .value=${String(value ?? "")}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event) => {
			this.updateCell(rowIndex, column, this.readValueFromEvent(event));
		}}
            ></pk-color-input>`;
		return b`<pk-input
            class="cell-pk-control"
            fit-cell
            size="xs"
            type="text"
            ?mono=${type === "handle" || type === "value"}
            .value=${String(value ?? "")}
            placeholder=${column.placeholder ?? A}
            ?disabled=${this.disabled}
            ?invalid=${invalid}
            aria-label=${column.label ?? column.name}
            @input=${onInput}
        ></pk-input>`;
	}
	renderExtraMenuItems(row, rowIndex) {
		const items = this.resolveRowMenuItems(row, rowIndex);
		if (items.length === 0) return A;
		return b`${items.map((item) => {
			const iconHtml = startIconHtml(item.icon);
			return b`<pk-dropdown-item
                type=${item.type ?? "normal"}
                value=${item.value ?? item.action ?? ""}
                radio-group=${item.radioGroup ?? A}
                ?checked=${Boolean(item.checked)}
                ?disabled=${this.disabled || Boolean(item.disabled)}
                @click=${() => {
				if (this.disabled || item.disabled) return;
				this.dispatchEvent(new CustomEvent("pk-row-menu-select", {
					detail: {
						rowIndex,
						row,
						item,
						action: String(item.action ?? item.value ?? ""),
						value: String(item.value ?? "")
					},
					bubbles: true,
					composed: true
				}));
			}}
            >
                ${iconHtml ? o(iconHtml) : A}
                ${item.label}
            </pk-dropdown-item>`;
		})}`;
	}
	renderRow(row, rowIndex) {
		const columns = this.validColumns;
		const rowCount = this.internalRows.length;
		const rowId = String(row._id);
		const rowMod = this.resolveRowModifier(row, rowIndex);
		const extraMenuItems = this.resolveRowMenuItems(row, rowIndex);
		const showRowMenu = this.allowReorder || extraMenuItems.length > 0;
		return b`<tr
            data-row-id=${rowId}
            data-tone=${rowMod.tone || A}
            class=${rowMod.class ? e(Object.fromEntries(rowMod.class.split(/\s+/).filter(Boolean).map((token) => [token, true]))) : A}
            title=${rowMod.title || A}
        >
            ${columns.map((column) => {
			const resolved = this.resolveColumn(row, column, rowIndex);
			const errors = this.getCellErrors(rowIndex, column.name);
			const columnClass = resolved.class || column.class || "";
			return b`<td
                    class=${e({
				thin: isThinColumn(resolved),
				"has-error": errors.length > 0,
				...columnClass ? Object.fromEntries(columnClass.split(/\s+/).filter(Boolean).map((token) => [token, true])) : {}
			})}
                    style=${resolved.width || column.width ? `width: ${resolved.width || column.width}` : A}
                    title=${errors.length ? errors.join("\n") : A}
                >
                    ${this.renderCell(resolved, row, rowIndex, errors.length > 0)}
                </td>`;
		})}
            ${this.showActionsColumn ? b`<td class="actions">
                    <div class="row-actions">
                        ${this.allowReorder ? b`
                                <span
                                    class=${e({
			"action-handle": true,
			"is-pending": !this.dndReady
		})}
                                >
                                    <pk-button
                                        type="button"
                                        class="action-btn"
                                        variant="none"
                                        size="xs"
                                        aria-label="Reorder row"
                                        ?disabled=${this.disabled || !this.dndReady}
                                        title=${!this.dndReady && !this.disabled ? "Preparing drag…" : A}
                                    >${o(START_GRIP_ICON)}</pk-button>
                                </span>` : A}
                        ${showRowMenu ? b`<pk-dropdown-menu size="sm" placement="bottom-end" side-offset="2">
                                    <pk-button
                                        slot="trigger"
                                        type="button"
                                        class="action-btn"
                                        variant="none"
                                        size="xs"
                                        aria-label="Row actions"
                                        ?disabled=${this.disabled}
                                    >${o(START_ELLIPSIS_ICON)}</pk-button>
                                    ${this.renderExtraMenuItems(row, rowIndex)}
                                    ${this.allowReorder ? b`
                                            <pk-dropdown-item
                                                ?disabled=${this.disabled || rowIndex === 0}
                                                @click=${() => {
			this.moveRow(rowIndex, -1);
		}}
                                            >
                                                ${o(START_ARROW_UP_ICON)}
                                                Move up
                                            </pk-dropdown-item>
                                            <pk-dropdown-item
                                                ?disabled=${this.disabled || rowIndex === rowCount - 1}
                                                @click=${() => {
			this.moveRow(rowIndex, 1);
		}}
                                            >
                                                ${o(START_ARROW_DOWN_ICON)}
                                                Move down
                                            </pk-dropdown-item>` : A}
                                </pk-dropdown-menu>` : A}
                        ${this.allowDelete ? b`<pk-button
                                type="button"
                                class="action-btn action-delete"
                                variant="none"
                                size="xs"
                                aria-label="Delete row"
                                ?disabled=${this.disabled}
                                @click=${() => {
			this.removeRow(rowIndex);
		}}
                            >${o(START_XMARK_ICON)}</pk-button>` : A}
                    </div>
                </td>` : A}
        </tr>`;
	}
	render() {
		const columns = this.validColumns;
		return b`
            <div
                class="et-scroll"
                @pk-change=${this.stopInnerControlEvent}
                @input=${this.stopInnerControlEvent}
                @change=${this.stopInnerControlEvent}
            >
                <table class="et">
                    <thead>
                        <tr>
                            ${columns.map((column) => {
			const columnClass = column.class || "";
			return b`<th
                                    class=${e({
				thin: isThinColumn(column),
				...columnClass ? Object.fromEntries(columnClass.split(/\s+/).filter(Boolean).map((token) => [token, true])) : {}
			})}
                                    style=${column.width ? `width: ${column.width}` : A}
                                >
                                    ${column.label ?? column.name}
                                    ${column.required ? b`<span class="required">*</span>` : A}
                                </th>`;
		})}
                            ${this.showActionsColumn ? b`<th class="actions"></th>` : A}
                        </tr>
                    </thead>
                    <tbody>
                        ${c(this.internalRows, (row) => String(row._id), (row, index) => this.renderRow(row, index))}
                    </tbody>
                </table>
            </div>
            ${this.allowAdd ? b`<pk-button
                    type="button"
                    class="add-row"
                    variant="dashed"
                    ?disabled=${this.disabled}
                    @click=${() => {
			this.addRow();
		}}
                >
                    ${o(START_PLUS_ICON)}
                    ${this.addRowLabel || "Add row"}
                </pk-button>` : A}
        `;
	}
};
__decorate([n({ attribute: false })], PkEditableTable.prototype, "columns", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "rows", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "allow-add"
})], PkEditableTable.prototype, "allowAdd", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "allow-delete"
})], PkEditableTable.prototype, "allowDelete", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "allow-reorder"
})], PkEditableTable.prototype, "allowReorder", void 0);
__decorate([n({ attribute: "add-row-label" })], PkEditableTable.prototype, "addRowLabel", void 0);
__decorate([n({ attribute: "field-name" })], PkEditableTable.prototype, "fieldName", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "cellErrors", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "newRowDefaults", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "modifyColumn", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "modifyRow", void 0);
__decorate([n({ attribute: false })], PkEditableTable.prototype, "getRowMenuItems", void 0);
__decorate([r()], PkEditableTable.prototype, "internalRows", void 0);
__decorate([r()], PkEditableTable.prototype, "dndReady", void 0);
PkEditableTable = __decorate([t("pk-editable-table")], PkEditableTable);
//#endregion
export { PkEditableTable, getCustomCellSlotName, isCustomColumn, nextRowId };
