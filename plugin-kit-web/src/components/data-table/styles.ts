import { css } from 'lit';

export const dataTableStyles = css`
    :host {
        display: block;
        min-width: 0;
        color: var(--pk-color-gray-700, #33404d);
        font: var(--pk-font-size-base, 14px)/1.42
            var(--pk-font-family, system-ui, sans-serif);
    }
    * {
        box-sizing: border-box;
    }
    .toolbar,
    .footer,
    .selection {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
    }
    .header-shell {
        display: flow-root;
    }
    :host([layout='index']) .header-shell {
        /* Keep the frame's 1px outer border clear of the toolbar's 2px mask. */
        margin-block-end: 3px;
        position: sticky;
        top: var(--pk-data-table-header-offset, 0px);
        z-index: 4;
        background: var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff));
        /* Cover the scroll container's inset and the white gap above the table header. */
        box-shadow:
            0 -2px 0 var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff)),
            0 2px 0 var(--pk-data-table-toolbar-background, var(--pk-color-white, #fff));
    }
    .toolbar {
        margin-bottom: 12px;
    }
    .search {
        flex: 1 1 200px;
        min-width: 140px;
    }
    .toolbar-end {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-inline-start: auto;
    }
    .table-frame {
        padding: 2px;
        background: var(--pk-color-white, #fff);
        border-radius: var(--pk-radius-lg, 5px);
        box-shadow: 0 0 0 1px var(--pk-color-gray-200, #cdd8e4);
    }
    .scroll {
        position: relative;
        overflow: auto;
        border-radius: var(--pk-radius-lg, 5px);
    }
    .scroll:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: 2px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        text-align: start;
    }
    th,
    td {
        padding: var(--pk-data-table-cell-padding, 7px 12px);
        text-align: start;
        vertical-align: middle;
    }
    th {
        padding-block: 14px;
        background: var(--pk-color-gray-50, #f3f7fc);
        color: var(--pk-color-gray-700, #3f4d5a);
        font-size: inherit;
        font-weight: 700;
        white-space: nowrap;
    }
    thead th:first-child {
        border-start-start-radius: var(--pk-radius-lg, 5px);
        border-end-start-radius: var(--pk-radius-lg, 5px);
    }
    thead th:last-child {
        border-start-end-radius: var(--pk-radius-lg, 5px);
        border-end-end-radius: var(--pk-radius-lg, 5px);
    }
    th:not([data-sorted]):has(.sort):hover {
        background: var(--pk-color-gray-100, #e4edf6);
    }
    tbody tr:last-child td {
        border-bottom: 0;
    }
    tbody tr:hover {
        background: var(--pk-color-gray-50, #f3f7fc);
    }
    tbody tr[data-selectable] {
        cursor: default;
    }
    tbody tr[data-selected],
    tbody tr[data-selected]:hover {
        --pk-data-table-cell-color: var(
            --pk-data-table-selected-color,
            var(--pk-color-white, #fff)
        );
        --pk-data-table-cell-muted-color: var(
            --pk-data-table-selected-color,
            var(--pk-color-white, #fff)
        );
        --pk-status-label-color: var(--pk-data-table-cell-color);
        --pk-status-label-neutral-tint: var(--pk-data-table-cell-color);
        --pk-status-ring: var(--pk-color-gray-200);
        background: var(
            --pk-data-table-selected-background,
            var(--pk-color-gray-500, #606d7b)
        );
        color: var(--pk-data-table-cell-color);
    }
    td {
        color: var(--pk-data-table-cell-color, inherit);
        max-width: 33vw;
        overflow-wrap: break-word;
    }
    .cell-link {
        display: block;
        max-width: 33vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cell-handle {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        padding-inline-start: 6px;
        border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
        border-radius: var(--pk-radius-md, 4px);
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
    }
    .cell-handle code {
        font-family: var(--pk-font-family-mono, ui-monospace, monospace);
        font-size: 12px;
        overflow-wrap: anywhere;
    }
    .cell-handle pk-copy-button {
        flex: none;
        --pk-btn-height-default: 24px;
        --pk-btn-icon-size-default: 12px;
        --pk-copy-button-color: currentColor;
        --pk-copy-button-hover-color: currentColor;
        --pk-copy-button-background: transparent;
        --pk-copy-button-hover-background: transparent;
        --pk-copy-button-border-color: transparent;
    }
    .cell-handle .icon {
        width: var(--pk-btn-icon-size-default, 12px);
        height: var(--pk-btn-icon-size-default, 12px);
    }
    .row-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }
    .row-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--pk-btn-height-xs, 26px);
        height: var(--pk-btn-height-xs, 26px);
        padding: 0;
        border: 0;
        border-radius: var(--pk-radius-md, 4px);
        background: transparent;
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
        cursor: move;
        touch-action: none;
        user-select: none;
        font: inherit;
    }
    .row-handle:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: 2px;
    }
    .row-handle[aria-disabled='true'] {
        cursor: default;
        opacity: 0.4;
    }
    tbody[data-row-dragging] tr {
        position: relative;
        background: var(--pk-color-white, #fff);
    }
    tbody tr[data-dragging] {
        z-index: 2;
        box-shadow: var(--pk-shadow-popup, 0 4px 12px rgb(0 0 0 / 0.15));
    }
    .row-order-hint {
        margin: 0 0 8px;
        color: var(--pk-color-gray-550, #596673);
    }
    .row-action::part(base) {
        color: var(--pk-data-table-cell-muted-color, var(--pk-color-gray-550, #596673));
    }
    .row-action[data-preset='move']::part(base):not(:disabled) {
        cursor: move;
    }
    tbody tr[data-selected] td {
        background: var(
            --pk-data-table-selected-background,
            var(--pk-color-gray-500, #606d7b)
        );
    }
    thead + tbody tr:first-child td {
        border-block-start: 1px solid var(--pk-color-white, #fff);
    }
    tbody tr + tr td {
        border-top: 1px solid transparent;
    }
    tbody tr[data-selected] + tr[data-selected] td {
        border-top-color: var(--pk-color-gray-300);
    }
    tbody tr[data-selected] a {
        color: inherit;
    }
    tbody tr[data-selected] pk-button[slot='trigger']::part(base) {
        color: var(--pk-data-table-cell-color);
    }
    tbody tr[data-selected] pk-checkbox {
        color: var(--pk-color-gray-700, #33404d);
    }

    .nowrap {
        white-space: nowrap;
        max-width: none;
    }
    .end {
        text-align: end;
        font-variant-numeric: tabular-nums;
    }
    .center {
        text-align: center;
    }
    .small {
        width: 1%;
        white-space: nowrap;
    }
    th[data-sortable] {
        padding: 0;
    }
    .sort {
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        padding-block: 14px;
        padding-inline: 14px 35px;
        position: relative;
        text-align: inherit;
        cursor: pointer;
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
    }
    .sort:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        outline-offset: -2px;
    }
    a {
        color: var(--pk-color-blue-600, #176696);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .footer {
        min-height: 48px;
        padding: 8px;
        background: color-mix(
            in srgb,
            var(--pk-color-gray-100, #e4edf6) 75%,
            transparent
        );
        border-radius: 0 0 var(--pk-radius-lg, 5px) var(--pk-radius-lg, 5px);
        color: var(--pk-color-gray-550, #596673);
        font-size: inherit;
        font-weight: 400;
    }
    .pager {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .filter-input::part(header),
    .search::part(header) {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }
    .column-option {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .column-option {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .range > * {
        flex: 1;
        min-width: 0;
    }
    .column-option {
        position: relative;
        padding: 0;
        min-height: 24px;
        gap: 4px;
    }
    .column-list[data-reordering] .column-option {
        transition: transform 120ms ease;
    }
    .column-option pk-checkbox {
        flex: 1;
    }
    select {
        font: inherit;
        color: inherit;
        background: var(--pk-color-white, #fff);
        border: 1px solid var(--pk-color-gray-250, #cbd5df);
        border-radius: var(--pk-radius-md, 4px);
        padding: 5px 8px;
        max-width: 100%;
    }

    .filter-trigger {
        /* Input adornments default to icon dimensions; this is an interactive control. */
        display: inline-flex;
        max-width: none;
        max-height: none;
    }
    .filter-trigger::part(base) {
        background: transparent;
    }
    .filter-trigger[slot="end"] {
        margin-inline-end: calc(-1 * var(--pk-input-padding-inline, 8px));
    }
    .filter-dialog {
        --pk-dialog-width: min(680px, calc(100vw - 32px));
    }
    .filter-dialog::part(panel) {
        color: var(--pk-color-gray-700);
        box-shadow: var(--pk-shadow-popup);
    }
    .filter-dialog[data-anchored]::part(panel) {
        /* Anchored filters behave like a popup, without the modal entrance/exit delay. */
        animation: none;
        margin: 0;
        inset: auto;
        top: var(--filter-top);
        left: var(--filter-left);
        width: var(--filter-width);
        max-height: var(--filter-max-height);
    }
    .filter-dialog[data-anchored]::part(panel)::backdrop {
        animation: none;
        background: transparent;
    }
    .filter-dialog::part(footer) {
        background: var(--pk-color-white);
        border-top: 0;
        padding: 0 24px 24px;
    }
    .filter-builder {
        padding: 24px;
    }
    .filter-intro {
        margin: 0 0 12px;
        color: var(--pk-color-gray-700);
    }
    .filter-rule {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 7px;
        border: 1px solid var(--pk-color-gray-200);
        background: var(--pk-color-gray-50);
    }
    .filter-rule:first-of-type {
        border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
    }
    .filter-rule + .filter-rule {
        border-top: 0;
    }
    .filter-type,
    .filter-operator {
        height: 34px;
        flex: 0 1 150px;
        min-width: 80px;
    }
    .filter-type {
        font-weight: 600;
    }
    .filter-values,
    .filter-value {
        flex: 1 1 160px;
        min-width: 0;
    }
    .filter-values {
        display: flex;
        gap: 8px;
    }
    .filter-values > * {
        flex: 1;
        min-width: 0;
    }
    .filter-values .filter-input {
        width: 100%;
    }
    .filter-remove {
        flex: none;
        margin-inline-start: auto;
    }
    .filter-add {
        padding: 7px;
        border: 1px dashed var(--pk-color-gray-250);
        border-radius: var(--pk-radius-lg);
    }
    .filter-rule + .filter-add {
        border-top: 0;
        border-radius: 0 0 var(--pk-radius-lg) var(--pk-radius-lg);
    }
    .filter-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
    }
    .filter-footer-spacer {
        flex: 1;
    }
    .filter-error {
        margin: 12px 0 0;
        color: var(--pk-color-rose-600);
    }
    .filter-builder slot[name='filters']::slotted(*) {
        margin-block-start: 16px;
    }
    .filter-dialog:not([data-anchored]) .filter-rule {
        flex-wrap: wrap;
    }
    .filter-dialog:not([data-anchored]) .filter-values,
    .filter-dialog:not([data-anchored]) .filter-value {
        flex-basis: calc(100% - 46px);
        order: 2;
    }
    .filter-dialog:not([data-anchored]) .filter-type,
    .filter-dialog:not([data-anchored]) .filter-operator {
        flex: 1 1 40%;
    }
    .filter-dialog:not([data-anchored]) .filter-remove {
        order: 3;
    }
    @media (max-width: 480px) {
        .filter-builder {
            padding: 16px;
        }
        .filter-dialog::part(footer) {
            padding: 0 16px 16px;
        }
        .filter-footer {
            flex-wrap: wrap;
        }
        .filter-footer pk-button {
            font-size: 13px;
        }
    }
    .selection {
        flex: 1 1 auto;
        justify-content: center;
        min-height: 30px;
        color: var(--pk-color-gray-700, #33404d);
    }
    .selection[data-empty] {
        visibility: hidden;
        pointer-events: none;
    }
    .selection-count {
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
    }
    .selection ::slotted(*) {
        max-width: 100%;
    }

    tbody[data-loading] {
        visibility: hidden;
    }
    .loading-space {
        height: var(--pk-state-panel-min-height, 11rem);
    }
    .loading-indicator {
        position: absolute;
        inset: var(--_pk-data-table-heading-height, 0px) 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    .footer-shell {
        min-width: 0;
    }
    :host([layout='index']) .footer-shell {
        position: sticky;
        bottom: var(--pk-data-table-footer-offset, 0px);
        z-index: 3;
        background: var(--pk-color-white);
        border-radius: 0 0 var(--pk-radius-lg, 5px) var(--pk-radius-lg, 5px);
    }
    .scrollbar {
        overflow-x: scroll;
        overflow-y: hidden;
        height: 16px;
        background: var(--pk-color-gray-50);
    }
    .scrollbar > div {
        height: 1px;
    }
    .scrollbar:focus-visible {
        outline: 2px solid var(--pk-color-sky-600);
        outline-offset: -2px;
    }
    .scroll[data-proxy] {
        scrollbar-width: none;
    }
    .scroll[data-proxy]::-webkit-scrollbar {
        display: none;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    .busy {
        opacity: 0.55;
        pointer-events: none;
    }
    :host([size='compact']) {
        --pk-data-table-cell-padding: 5px 10px;
    }
    :host([size='compact']) th {
        padding-block: 8px;
    }
    :host([size='compact']) th[data-sortable] {
        padding: 0;
    }
    :host([size='compact']) .sort {
        padding-block: 8px;
    }
    .icon {
        display: inline-flex;
        width: 1em;
        height: 1em;
        flex: none;
    }
    .icon svg {
        width: 100%;
        height: 100%;
    }
    .search .direction-icon {
        width: 16px;
        height: 16px;
    }
    .direction-icon {
        width: 20px;
        height: 20px;
    }
    th[data-sorted] {
        background: var(--pk-color-gray-200, #cdd8e4);
    }
    th.end .sort {
        justify-content: flex-end;
    }
    th.center .sort {
        justify-content: center;
    }
    .sort .icon {
        position: absolute;
        inset-inline-end: 14px;
        width: 10px;
        height: 10px;
        color: var(--pk-color-gray-500, #667482);
    }
    .sort .sort-spinner {
        position: absolute;
        inset-inline-end: 11px;
    }
    .footer-actions {
        margin-inline-start: auto;
    }
    .pager {
        gap: 3px;
    }
    .pager > span {
        margin-inline-start: 4px;
    }
    .pager pk-button::part(base) {
        width: 30px;
        height: 30px;
        min-height: 30px;
        padding: 0;
        color: var(--pk-color-gray-700);
        border-color: var(--pk-color-gray-400);
        background: transparent;
        opacity: 1;
    }
    .pager .icon {
        width: 10px;
        height: 10px;
    }
    .view-popover > pk-button,
    .footer-actions pk-button {
        --pk-btn-caret-size: 10px;
    }
    .view-popover {
        --pk-popover-flush-min-width: min(400px, calc(100vw - 20px));
        --pk-popover-flush-max-width: min(400px, calc(100vw - 20px));
        --pk-shadow-popover: var(--pk-shadow-popup);
    }
    .view-popover[open] > pk-button::part(base),
    .footer-actions pk-button[aria-expanded='true']::part(base) {
        background: var(--pk-color-slate-500);
    }
    .view-sort pk-button::part(base) {
        width: 42px;
        padding-inline: 0;
    }
    .pager pk-button:not([disabled])::part(base):hover {
        color: var(--pk-color-gray-800);
        border-color: var(--pk-color-gray-600);
        background: var(--pk-color-gray-200);
    }
    .pager pk-button:not([disabled])::part(base):focus-visible {
        border-color: var(--pk-color-gray-600);
        box-shadow: none;
        outline: 2px solid var(--pk-color-gray-600);
        outline-offset: 2px;
    }
    .pager pk-button:not([disabled])::part(base):active {
        color: var(--pk-color-white);
        border-color: var(--pk-color-gray-600);
        background: var(--pk-color-gray-600);
    }
    .pager pk-button[disabled]::part(base) {
        color: var(--pk-color-gray-300);
        border-color: var(--pk-color-gray-200);
    }
    .view-grid {
        display: grid;
        grid-template-columns: 150px minmax(0, 1fr);
    }
    .view-label {
        padding: 14px;
        background: var(--pk-color-white, #fff);
        border-inline-end: 1px solid var(--pk-color-gray-200, #dbe2e8);
        color: var(--pk-color-gray-600, #526171);
    }
    .view-sort {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        min-width: 0;
    }
    .view-sort pk-select {
        flex: 1;
        min-width: 0;
    }
    .view-sort pk-button-group {
        flex: none;
    }
    .columns-label,
    .column-list {
        border-top: 1px solid var(--pk-color-gray-200, #dbe2e8);
    }
    .column-list {
        padding: 8px 10px;
        max-height: min(360px, 45vh);
        overflow-y: auto;
        overscroll-behavior: contain;
    }
    .column-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 24px;
        flex: none;
        border: 0;
        padding: 2px;
        background: transparent;
        color: var(--pk-color-gray-500, #667482);
        cursor: move;
        touch-action: none;
    }
    .column-handle:active {
        cursor: move;
    }
    .column-handle:focus-visible {
        outline: 2px solid var(--pk-color-blue-500, #247db1);
        border-radius: 3px;
    }
    .column-list[data-reordering] .column-option[data-dragging] {
        z-index: 1;
        background: var(--pk-color-white, #fff);
        transition: none;
        user-select: none;
    }
    @media (prefers-reduced-motion: reduce) {
        .column-list[data-reordering] .column-option {
            transition: none;
        }
    }
    .view-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 24px;
        background: var(--pk-color-gray-50, #f3f7fc);
    }
    @media (max-width: 520px) {
        .search {
            flex-basis: 100%;
        }
        .selection {
            order: 3;
            flex-basis: 100%;
            justify-content: flex-start;
        }
        .view-grid {
            grid-template-columns: 100px minmax(0, 1fr);
        }
        .view-label {
            padding: 14px 12px;
        }
        .view-sort {
            flex-wrap: wrap;
            padding: 12px;
        }
        .view-sort pk-select {
            flex-basis: 100%;
        }
        .column-list {
            padding-inline: 10px;
        }
    }
`;
