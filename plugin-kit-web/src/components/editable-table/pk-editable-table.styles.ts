import { css } from 'lit';

export const pkEditableTableStyles = css`
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
