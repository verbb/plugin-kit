import { c as n, h as i, l as customElement, m as b, n as c, p as A, s as r, t as o$1, u as o } from "../../chunks/lit-6rz1jOzS.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BZKcPYjM.js";
import { W as magnifyingGlass, Y as slidersOutline, _ as chevronRight, g as chevronLeft, h as chevronDown, it as xmark, k as gripMove, v as chevronUp } from "../../chunks/svg-D8YEDMfu.js";
import { n as renderIconHtml } from "../../chunks/render-DGT9Y3WS.js";
import "../../chunks/pk-button-C_4EHtBx.js";
import "../../chunks/pk-spinner-C0iiN8B0.js";
import "../../chunks/pk-state-panel-TILi3V8R.js";
import "../../chunks/pk-checkbox-DOtHW2Vb.js";
import "../../chunks/pk-input-DGvN5YDz.js";
import "../../chunks/pk-dialog-HlHbhRBL.js";
import "../../chunks/pk-dropdown-item-KZmo7q7g.js";
import "../../chunks/pk-dropdown-menu-CIQvXWJQ.js";
import "../../chunks/pk-status-label-Dw4_Ezv3.js";
import "../../chunks/pk-button-group-ChaajqnN.js";
import "../../chunks/pk-popover-7e3umaMq.js";
import "../../chunks/pk-option-D0daR2Ei.js";
import "../../chunks/pk-select-DWtVzf66.js";
//#region src/components/data-table/styles.ts
var dataTableStyles = i`
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
//#endregion
//#region src/components/data-table/filter-model.ts
/** The first operator preserves the original value-only filter semantics. */
function dataTableFilterOperators(filter) {
	let supported;
	switch (filter.type) {
		case "text":
			supported = [
				"contains",
				"equals",
				"not-equals",
				"not-contains",
				"starts-with",
				"ends-with",
				"empty",
				"not-empty"
			];
			break;
		case "number-range":
		case "date-range":
			supported = [
				"between",
				"equals",
				"not-equals",
				"greater-than",
				"at-least",
				"less-than",
				"at-most",
				"empty",
				"not-empty"
			];
			break;
		case "multi-select":
			supported = [
				"in",
				"not-in",
				"empty",
				"not-empty"
			];
			break;
		case "boolean":
			supported = [
				"equals",
				"empty",
				"not-empty"
			];
			break;
		default: supported = [
			"equals",
			"not-equals",
			"empty",
			"not-empty"
		];
	}
	const allowed = filter.operators?.filter((operator) => supported.includes(operator));
	return allowed?.length ? allowed : supported;
}
function dataTableFilterOperator(filter, operator) {
	const supported = dataTableFilterOperators(filter);
	return operator && supported.includes(operator) ? operator : supported[0];
}
var filterNeedsValue = (operator) => operator !== "empty" && operator !== "not-empty";
var filterValueIsBlank = (value) => Array.isArray(value) ? value.every((part) => !part.trim()) : !value.trim();
/** Calendar comparisons use UTC day boundaries, matching the existing date-range contract. */
function matchesDataTableFilter(filter, value, expected, requested, locale) {
	const operator = dataTableFilterOperator(filter, requested);
	const empty = value == null || value === "" || Array.isArray(value) && !value.length;
	if (operator === "empty") return empty;
	if (operator === "not-empty") return !empty;
	if (filterValueIsBlank(expected)) return true;
	if (filter.type === "number-range" || filter.type === "date-range") {
		if (empty) return false;
		const date = filter.type === "date-range";
		const actual = date ? Date.parse(String(value)) : Number(value);
		const [from = "", to = ""] = Array.isArray(expected) ? expected : [expected];
		const lower = date ? Date.parse(from) : Number(from);
		const upper = date ? Date.parse(to) + 864e5 - 1 : Number(to);
		if (!Number.isFinite(actual)) return false;
		if (operator === "between") return (!from || actual >= lower) && (!to || actual <= upper);
		if (!Number.isFinite(lower)) return false;
		const end = date ? lower + 864e5 - 1 : lower;
		if (operator === "equals") return actual >= lower && actual <= end;
		if (operator === "not-equals") return actual < lower || actual > end;
		if (operator === "greater-than") return actual > end;
		if (operator === "at-least") return actual >= lower;
		if (operator === "less-than") return actual < lower;
		return actual <= end;
	}
	const actual = value == null ? "" : String(value);
	const values = Array.isArray(expected) ? expected : [expected];
	if (operator === "in" || operator === "not-in") {
		const included = values.includes(actual);
		return operator === "in" ? included : !included;
	}
	const a = filter.type === "text" ? actual.toLocaleLowerCase(locale) : actual;
	const b = filter.type === "text" ? String(expected).toLocaleLowerCase(locale) : String(expected);
	switch (operator) {
		case "equals": return a === b;
		case "not-equals": return a !== b;
		case "not-contains": return !a.includes(b);
		case "starts-with": return a.startsWith(b);
		case "ends-with": return a.endsWith(b);
		default: return a.includes(b);
	}
}
//#endregion
//#region src/components/data-table/model.ts
var dataTableLabels = {
	search: "Search",
	clearSearch: "Clear search",
	pagination: "{label} pagination",
	scrollColumns: "Scroll {label} columns",
	sortDirection: "Sort direction",
	filters: "Filters",
	filterResults: "Filter results",
	addFilter: "Add a filter",
	allFiltersAdded: "All filters added",
	filterMatch: "Match all of the following conditions:",
	filterType: "Filter type",
	filterOperator: "{label}: Operator",
	removeFilter: "Remove {label} filter",
	applyFilters: "Apply",
	cancelFilters: "Cancel",
	filterRangeError: "{label}: the end must be on or after the start.",
	filterValueError: "{label}: enter a valid value.",
	filterContains: "contains",
	filterNotContains: "does not contain",
	filterEquals: "equals",
	filterNotEquals: "does not equal",
	filterStartsWith: "begins with",
	filterEndsWith: "ends with",
	filterIn: "is one of",
	filterNotIn: "is not one of",
	filterBetween: "is between",
	filterGreaterThan: "is greater than",
	filterAtLeast: "is at least",
	filterLessThan: "is less than",
	filterAtMost: "is at most",
	filterAfter: "is after",
	filterOnOrAfter: "is on or after",
	filterBefore: "is before",
	filterOnOrBefore: "is on or before",
	filterEmpty: "is empty",
	filterNotEmpty: "has a value",
	columns: "Table Columns",
	view: "View",
	sortBy: "Sort by",
	defaultOrder: "Default order",
	ascending: "Ascending",
	descending: "Descending",
	defaults: "Use defaults",
	close: "Close",
	reorder: "Reorder {label}",
	reorderHelp: "Drag to reorder, or use the Up and Down arrow keys.",
	reordered: "{label} moved to position {position} of {count}.",
	export: "Export",
	exporting: "Exporting…",
	clear: "Clear filters",
	all: "All",
	yes: "Yes",
	no: "No",
	from: "From",
	to: "To",
	previous: "Previous",
	next: "Next",
	empty: "No records yet",
	noResults: "No matching records",
	loading: "Loading…",
	updating: "Updating…",
	error: "Unable to load records",
	retry: "Retry",
	selectPage: "Select this page",
	selectRow: "Select {id}",
	selected: "{count} selected",
	range: "{start}–{end} of {total}",
	unknownRange: "{start}–{end}",
	actions: "Actions for {id}",
	moveUp: "Move {label} earlier",
	moveDown: "Move {label} later",
	sort: "Sort by {label}"
};
var defaultDataTableQuery = () => ({
	search: "",
	sort: [],
	filters: {},
	pageIndex: 0,
	pageSize: 25
});
var dataTableCellSlot = (key, columnId) => `cell-${typeof key}-${encodeURIComponent(String(key))}-${encodeURIComponent(columnId)}`;
var dataTableValue = (row, column) => column.value ? column.value(row) : row[column.id];
function dataTableText(value) {
	return value == null ? "" : Array.isArray(value) ? value.join(", ") : String(value);
}
/** Bounded local datasets only; remote consumers perform these operations at their endpoint. */
function queryDataTable(rows, columns, filters, query, locale) {
	const search = query.search.trim().toLocaleLowerCase(locale);
	const matching = rows.filter((row) => {
		if (search && !columns.some((column) => column.searchable !== false && dataTableText(dataTableValue(row, column)).toLocaleLowerCase(locale).includes(search))) return false;
		return filters.every((filter) => {
			const expected = query.filters[filter.id];
			if (expected == null) return true;
			return matchesDataTableFilter(filter, filter.value ? filter.value(row) : row[filter.id], expected, query.filterOperators?.[filter.id], locale);
		});
	});
	const collator = new Intl.Collator(locale, {
		numeric: true,
		sensitivity: "base"
	});
	matching.sort((a, b) => {
		for (const sort of query.sort) {
			const column = columns.find((item) => item.id === sort.id && item.sortable);
			if (!column) continue;
			const av = dataTableValue(a, column), bv = dataTableValue(b, column);
			const result = column.type === "date" ? (Date.parse(dataTableText(av)) || 0) - (Date.parse(dataTableText(bv)) || 0) : column.type === "number" && Number.isFinite(Number(av)) && Number.isFinite(Number(bv)) ? Number(av) - Number(bv) : typeof av === "number" && typeof bv === "number" ? av - bv : collator.compare(dataTableText(av), dataTableText(bv));
			if (result) return sort.direction === "asc" ? result : -result;
		}
		return 0;
	});
	const start = query.pageIndex * query.pageSize;
	return {
		rows: matching.slice(start, start + query.pageSize),
		total: matching.length,
		hasNext: start + query.pageSize < matching.length
	};
}
/** Cancellation alone is insufficient: a loader may ignore its AbortSignal. */
var DataTableRequestController = class {
	constructor() {
		this.generation = 0;
	}
	cancel() {
		this.generation++;
		this.abort?.abort();
	}
	async load(source, query) {
		this.cancel();
		const generation = this.generation;
		const abort = this.abort = new AbortController();
		try {
			const result = await source(structuredClone(query), { signal: abort.signal });
			return generation === this.generation ? result : void 0;
		} catch (error) {
			if (generation === this.generation) throw error;
			return;
		}
	}
};
//#endregion
//#region src/components/data-table/filter-controller.ts
var operatorLabels = {
	contains: "filterContains",
	"not-contains": "filterNotContains",
	equals: "filterEquals",
	"not-equals": "filterNotEquals",
	"starts-with": "filterStartsWith",
	"ends-with": "filterEndsWith",
	in: "filterIn",
	"not-in": "filterNotIn",
	between: "filterBetween",
	"greater-than": "filterGreaterThan",
	"at-least": "filterAtLeast",
	"less-than": "filterLessThan",
	"at-most": "filterAtMost",
	empty: "filterEmpty",
	"not-empty": "filterNotEmpty"
};
/** Owns a filter-editing session; only Apply mutates the table's public query. */
var DataTableFilterController = class {
	constructor(host) {
		this.host = host;
		this.rules = [];
		this.error = "";
		this.opened = false;
		this.closing = false;
		this.preserveUnknown = true;
		this.signature = "";
		this.position = () => {
			const anchor = this.host.renderRoot.querySelector(".search") ?? this.host.renderRoot.querySelector(".toolbar");
			const dialog = this.dialog;
			if (!anchor || !dialog) return;
			const box = anchor.getBoundingClientRect();
			const viewport = this.host.ownerDocument.defaultView;
			const anchored = box.width >= 450 && box.bottom >= 0 && viewport.innerHeight - box.bottom >= 240;
			dialog.toggleAttribute("data-anchored", anchored);
			dialog.style.setProperty("--filter-left", `${Math.max(8, Math.min(box.left + 1, viewport.innerWidth - box.width - 8))}px`);
			dialog.style.setProperty("--filter-top", `${box.bottom}px`);
			dialog.style.setProperty("--filter-width", `${box.width - 2}px`);
			dialog.style.setProperty("--filter-max-height", `${Math.max(200, viewport.innerHeight - box.bottom - 12)}px`);
		};
		host.addController(this);
	}
	text(key, values = {}) {
		return (this.host.labels[key] ?? dataTableLabels[key]).replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match));
	}
	get dialog() {
		return this.host.renderRoot.querySelector(".filter-dialog");
	}
	get trigger() {
		return this.host.renderRoot.querySelector(".filter-trigger");
	}
	get available() {
		return this.host.filters.filter((filter) => !this.rules.some((rule) => rule.id === filter.id));
	}
	get querySignature() {
		return JSON.stringify([
			this.host.query.filters,
			this.host.query.filterOperators,
			this.host.filters
		]);
	}
	hostUpdated() {
		if (this.opened && !this.closing && this.signature !== this.querySignature) {
			this.resetDraft();
			this.host.requestUpdate();
		}
	}
	hostDisconnected() {
		this.stopObserving();
		this.pendingAdd = void 0;
		this.opened = false;
		this.closing = false;
	}
	resetDraft() {
		this.rules = this.host.filters.filter((filter) => Object.hasOwn(this.host.query.filters, filter.id)).map((filter) => ({
			id: filter.id,
			operator: dataTableFilterOperator(filter, this.host.query.filterOperators?.[filter.id]),
			value: structuredClone(this.host.query.filters[filter.id])
		}));
		this.error = "";
		this.preserveUnknown = true;
		this.signature = this.querySignature;
	}
	stopObserving() {
		if (this.positionFrame !== void 0) cancelAnimationFrame(this.positionFrame);
		this.positionFrame = void 0;
		this.resizeObserver?.disconnect();
		this.resizeObserver = void 0;
		const viewport = this.host.ownerDocument.defaultView;
		viewport?.removeEventListener("resize", this.position);
		viewport?.removeEventListener("scroll", this.position, true);
	}
	async show() {
		if (this.opened || this.closing) return;
		this.resetDraft();
		this.opened = true;
		this.host.requestUpdate();
		await this.host.updateComplete;
		const dialog = this.dialog;
		if (!dialog || !this.host.isConnected) return;
		await dialog.updateComplete;
		this.position();
		this.resizeObserver = new ResizeObserver(() => {
			if (this.positionFrame !== void 0) cancelAnimationFrame(this.positionFrame);
			this.positionFrame = requestAnimationFrame(() => {
				this.positionFrame = void 0;
				this.position();
			});
		});
		const anchor = this.host.renderRoot.querySelector(".search") ?? this.host.renderRoot.querySelector(".toolbar");
		if (anchor) this.resizeObserver.observe(anchor);
		this.host.ownerDocument.defaultView?.addEventListener("resize", this.position);
		this.host.ownerDocument.defaultView?.addEventListener("scroll", this.position, true);
		await dialog.show();
		this.focusRule(this.rules[0]?.id);
	}
	focusRule(id) {
		((id ? this.host.renderRoot.querySelector(`.filter-rule[data-id="${CSS.escape(id)}"] .filter-type`) : this.host.renderRoot.querySelector(".add-filter")) ?? this.host.renderRoot.querySelector(".filter-apply"))?.focus({ preventScroll: true });
	}
	afterHide(event) {
		if (event.target !== this.dialog) return;
		this.stopObserving();
		this.opened = false;
		this.closing = false;
		this.error = "";
		this.host.requestUpdate();
		setTimeout(() => {
			if (!this.opened && this.host.isConnected) this.trigger?.focus({ preventScroll: true });
		}, 0);
	}
	async close() {
		if (this.closing) return;
		this.closing = true;
		await this.dialog?.hide();
	}
	change(id, patch) {
		this.rules = this.rules.map((rule) => rule.id === id ? {
			...rule,
			...patch
		} : rule);
		this.error = "";
		this.host.requestUpdate();
	}
	async add(id) {
		const filter = this.available.find((filter) => filter.id === id);
		if (!filter) return;
		this.rules = [...this.rules, {
			id,
			operator: dataTableFilterOperator(filter),
			value: ""
		}];
		this.host.requestUpdate();
		await this.host.updateComplete;
		this.focusRule(id);
	}
	async remove(id) {
		const index = this.rules.findIndex((rule) => rule.id === id);
		this.rules = this.rules.filter((rule) => rule.id !== id);
		this.error = "";
		this.host.requestUpdate();
		await this.host.updateComplete;
		this.focusRule(this.rules[index]?.id ?? this.rules[index - 1]?.id);
	}
	clearDraft() {
		this.rules = [];
		this.preserveUnknown = false;
		this.error = "";
		this.host.requestUpdate();
		this.host.updateComplete.then(() => this.focusRule());
	}
	operatorLabel(filter, operator) {
		if (filter.type === "date-range") {
			const dates = {
				"greater-than": "filterAfter",
				"at-least": "filterOnOrAfter",
				"less-than": "filterBefore",
				"at-most": "filterOnOrBefore"
			};
			if (dates[operator]) return this.text(dates[operator]);
		}
		return this.text(operatorLabels[operator]);
	}
	async apply() {
		if (this.closing) return;
		const filters = this.preserveUnknown ? { ...this.host.query.filters } : {};
		const operators = this.preserveUnknown ? { ...this.host.query.filterOperators } : {};
		for (const filter of this.host.filters) {
			delete filters[filter.id];
			delete operators[filter.id];
		}
		for (const rule of this.rules) {
			const filter = this.host.filters.find((filter) => filter.id === rule.id);
			if (!filter) continue;
			if (filterNeedsValue(rule.operator) && filterValueIsBlank(rule.value)) continue;
			if (filterNeedsValue(rule.operator) && (filter.type === "number-range" || filter.type === "date-range")) {
				const numbers = (Array.isArray(rule.value) ? rule.value : [rule.value]).map((value) => !value ? void 0 : filter.type === "date-range" ? Date.parse(value) : Number(value));
				if (numbers.some((number) => number !== void 0 && !Number.isFinite(number))) this.error = this.text("filterValueError", { label: filter.label });
				else if (rule.operator === "between" && numbers[0] != null && numbers[1] != null && numbers[0] > numbers[1]) this.error = this.text("filterRangeError", { label: filter.label });
				if (this.error) {
					this.host.requestUpdate();
					await this.host.updateComplete;
					this.focusRule(rule.id);
					return;
				}
			}
			filters[rule.id] = filterNeedsValue(rule.operator) ? structuredClone(rule.value) : "";
			if (rule.operator !== dataTableFilterOperator(filter)) operators[rule.id] = rule.operator;
		}
		const changed = JSON.stringify([filters, operators]) !== JSON.stringify([this.host.query.filters, this.host.query.filterOperators ?? {}]);
		this.closing = true;
		if (changed) this.host.setQuery({
			filters,
			filterOperators: operators
		});
		await this.dialog?.hide();
	}
	renderValue(filter, rule) {
		if (!filterNeedsValue(rule.operator)) return A;
		if (filter.type === "select" || filter.type === "multi-select" || filter.type === "boolean") {
			const options = filter.type === "boolean" ? [{
				value: "true",
				label: this.text("yes")
			}, {
				value: "false",
				label: this.text("no")
			}] : filter.options ?? [];
			return b`<pk-select
                class="filter-value"
                width="full"
                aria-label=${filter.label}
                .placeholder=${this.text("all")}
                .multiple=${filter.type === "multi-select"}
                .value=${Array.isArray(rule.value) ? "" : rule.value}
                .values=${Array.isArray(rule.value) ? rule.value : rule.value ? [rule.value] : []}
                @change=${(event) => {
				const select = event.currentTarget;
				this.change(rule.id, { value: filter.type === "multi-select" ? [...select.values] : select.value });
			}}
                >${options.map((option) => b`<pk-option .value=${option.value}>${option.label}</pk-option>`)}</pk-select
            >`;
		}
		const range = rule.operator === "between";
		const values = range ? Array.isArray(rule.value) ? rule.value : [rule.value, ""] : [Array.isArray(rule.value) ? rule.value[0] ?? "" : rule.value];
		return b`<div class="filter-values">
            ${values.map((value, index) => b`<pk-input
                        class="filter-input"
                        type=${filter.type === "date-range" ? "date" : filter.type === "number-range" ? "number" : "text"}
                        .label=${range ? `${filter.label}: ${this.text(index ? "to" : "from")}` : filter.label}
                        .placeholder=${range ? this.text(index ? "to" : "from") : ""}
                        .value=${value}
                        @input=${(event) => {
			const value = event.currentTarget.value;
			const next = [...values];
			next[index] = value;
			this.change(rule.id, { value: range ? next : value });
		}}
                    ></pk-input>`)}
        </div>`;
	}
	renderTrigger(slot) {
		if (!this.host.filters.length && !this.host.showFilters) return A;
		const count = Object.keys(this.host.query.filters).length + (this.host.query.criteria && Object.keys(this.host.query.criteria).length ? 1 : 0);
		return b`<pk-button
            class="filter-trigger"
            slot=${slot ?? A}
            variant="transparent"
            size="sm"
            ?data-active=${this.opened || count > 0}
            aria-label=${`${this.text("filters")}${count ? ` (${count})` : ""}`}
            aria-haspopup="dialog"
            aria-expanded=${this.opened ? "true" : "false"}
            @click=${() => this.show()}
            ><svg
                class="direction-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path
                    d="M3 4h18a1 1 0 0 1 .8 1.6L15 14v6a1 1 0 0 1-1.5.86l-4-2.4A1 1 0 0 1 9 17.6V14L2.2 5.6A1 1 0 0 1 3 4Z"
                /></svg
            >${count ? b`<span>${count}</span>` : A}</pk-button
        >`;
	}
	renderDialog() {
		return b`<pk-dialog
            class="filter-dialog"
            .label=${this.text("filterResults")}
            without-header
            @pk-after-hide=${(event) => this.afterHide(event)}
            @keydown=${(event) => {
			if (event.key === "Enter" && event.composedPath().some((node) => node.localName === "pk-input") && !event.composedPath().some((node) => node.localName === "pk-select")) {
				event.preventDefault();
				this.apply();
			}
		}}
            ><div class="filter-builder" part="filter-builder">
                ${this.rules.length ? b`<p class="filter-intro">${this.text("filterMatch")}</p>` : A}
                ${c(this.rules, (rule) => rule.id, (rule, index) => {
			const filter = this.host.filters.find((filter) => filter.id === rule.id);
			if (!filter) return A;
			return b`<div
                            class="filter-rule"
                            part="filter-rule"
                            data-id=${rule.id}
                            role="group"
                            aria-label=${filter.label}
                        >
                            <pk-select
                                class="filter-type"
                                aria-label=${`${filter.label}: ${this.text("filterType")}`}
                                width="full"
                                .value=${rule.id}
                                @change=${(event) => {
				this.pendingType = {
					id: rule.id,
					nextId: event.currentTarget.value
				};
			}}
                                @pk-after-hide=${(event) => {
				if (event.target !== event.currentTarget || this.pendingType?.id !== rule.id) return;
				const id = this.pendingType.nextId;
				this.pendingType = void 0;
				const next = this.host.filters.find((filter) => filter.id === id);
				if (!next || id === rule.id) return;
				this.change(rule.id, {
					id,
					operator: dataTableFilterOperator(next),
					value: ""
				});
				this.host.updateComplete.then(() => this.focusRule(id));
			}}
                            >
                                ${[filter, ...this.available].map((item) => b`<pk-option .value=${item.id}>${item.label}</pk-option>`)}
                            </pk-select>
                            <pk-select
                                class="filter-operator"
                                width="full"
                                .value=${rule.operator}
                                aria-label=${this.text("filterOperator", { label: filter.label })}
                                @change=${(event) => {
				const operator = event.currentTarget.value;
				this.change(rule.id, {
					operator,
					value: operator === "between" ? Array.isArray(rule.value) ? rule.value : [rule.value, ""] : filter.type === "multi-select" ? rule.value : Array.isArray(rule.value) ? rule.value[0] ?? "" : rule.value
				});
			}}
                            >
                                ${dataTableFilterOperators(filter).map((operator) => b`<pk-option .value=${operator}>${this.operatorLabel(filter, operator)}</pk-option>`)}
                            </pk-select>
                            ${this.renderValue(filter, rule)}
                            <pk-button
                                class="filter-remove"
                                variant="transparent"
                                size="sm"
                                aria-label=${this.text("removeFilter", { label: filter.label })}
                                @click=${() => this.remove(rule.id)}
                                ><span class="icon" aria-hidden="true"
                                    >${o(renderIconHtml(xmark))}</span
                                ></pk-button
                            >
                        </div>`;
		})}
                ${this.host.filters.length ? b`<div class="filter-add">
                              <pk-select
                                  class="add-filter"
                                  aria-label=${this.text("addFilter")}
                                  .placeholder=${this.available.length ? this.text("addFilter") : this.text("allFiltersAdded")}
                                  .disabled=${!this.available.length}
                                  .value=${""}
                                  @change=${(event) => {
			const select = event.currentTarget;
			const id = select.value;
			select.value = "";
			this.pendingAdd = id;
		}}
                                  @pk-after-hide=${(event) => {
			if (event.target !== event.currentTarget || !this.pendingAdd) return;
			const id = this.pendingAdd;
			this.pendingAdd = void 0;
			this.add(id);
		}}
                                  >${this.available.map((filter) => b`<pk-option .value=${filter.id}>${filter.label}</pk-option>`)}</pk-select
                              >
                          </div>` : A}
                <slot name="filters"></slot>
                ${this.error ? b`<p class="filter-error" role="alert">${this.error}</p>` : A}
            </div>
            <div slot="footer" class="filter-footer" part="filter-footer">
                <pk-button
                    variant="transparent"
                    .disabled=${!this.rules.length && !Object.keys(this.host.query.filters).length}
                    @click=${() => this.clearDraft()}
                    >${this.text("clear")}</pk-button
                >
                <span class="filter-footer-spacer"></span>
                <pk-button @click=${() => this.close()}
                    >${this.text("cancelFilters")}</pk-button
                >
                <pk-button
                    class="filter-apply"
                    variant="secondary"
                    @click=${() => this.apply()}
                    >${this.text("applyFilters")}</pk-button
                >
            </div></pk-dialog
        >`;
	}
};
//#endregion
//#region src/components/data-table/persistence.ts
var bindings = /* @__PURE__ */ new WeakMap();
var record = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function cleanView(value, columns, fallback) {
	const source = record(value) ? value : fallback;
	const ids = columns.map((column) => column.id);
	const list = (value, fallback) => [...new Set((Array.isArray(value) ? value : fallback).filter((id) => typeof id === "string" && ids.includes(id)))];
	const hiddenColumns = list(source.hiddenColumns, fallback.hiddenColumns).filter((id) => columns.find((column) => column.id === id)?.hideable !== false);
	if (ids.length && hiddenColumns.length === ids.length) hiddenColumns.splice(hiddenColumns.indexOf(ids[0]), 1);
	return {
		hiddenColumns: ids.filter((id) => hiddenColumns.includes(id)),
		columnOrder: [.../* @__PURE__ */ new Set([...list(source.columnOrder, fallback.columnOrder), ...ids])]
	};
}
function cleanSort(value, columns) {
	if (!Array.isArray(value)) return [];
	const seen = /* @__PURE__ */ new Set();
	return value.flatMap((item) => {
		if (!record(item) || typeof item.id !== "string" || seen.has(item.id) || !columns.some((column) => column.id === item.id && column.sortable) || item.direction !== "asc" && item.direction !== "desc") return [];
		seen.add(item.id);
		return [{
			id: item.id,
			direction: item.direction
		}];
	});
}
/** Attach after configuring columns/defaults/query and before connecting the table or starting its loader. */
function persistDataTableView(table, options) {
	bindings.get(table)?.disconnect();
	const storageKey = `pk:data-table:${JSON.stringify([
		options.version ?? 1,
		String(options.userId),
		options.key
	])}`;
	let storage;
	try {
		storage = options.storage ?? table.ownerDocument.defaultView?.localStorage;
	} catch {}
	const defaultSort = () => {
		const sort = cleanSort(table.defaultSort, table.columns);
		const first = table.columns.find((column) => column.sortable);
		return sort.length ? sort : first ? [{
			id: first.id,
			direction: "asc"
		}] : [];
	};
	const currentSort = () => {
		const sort = cleanSort(table.query.sort, table.columns);
		return sort.length ? sort : defaultSort();
	};
	try {
		const raw = storage?.getItem(storageKey);
		const saved = raw ? JSON.parse(raw) : void 0;
		if (record(saved)) {
			table.view = cleanView(saved.view, table.columns, table.view);
			if (options.restoreSort !== false) {
				const sort = cleanSort(saved.sort, table.columns);
				if (sort.length) table.query = {
					...table.query,
					sort
				};
			}
		}
	} catch {}
	let active = true;
	let pending = false;
	let lastSort = JSON.stringify(currentSort());
	const clear = () => {
		pending = false;
		lastSort = JSON.stringify(currentSort());
		try {
			storage?.removeItem(storageKey);
		} catch {}
	};
	const save = () => {
		pending = false;
		if (!active) return;
		const preferences = {
			view: cleanView(table.view, table.columns, table.defaultView),
			sort: currentSort()
		};
		const defaults = {
			view: cleanView(table.defaultView, table.columns, table.defaultView),
			sort: defaultSort()
		};
		lastSort = JSON.stringify(preferences.sort);
		if (JSON.stringify(preferences) === JSON.stringify(defaults)) clear();
		else try {
			storage?.setItem(storageKey, JSON.stringify(preferences));
		} catch {}
	};
	const schedule = () => {
		if (pending || !active) return;
		pending = true;
		queueMicrotask(() => {
			if (pending) save();
		});
	};
	const onView = (event) => {
		if (event.target === table) schedule();
	};
	const onQuery = (event) => {
		if (event.target === table && JSON.stringify(currentSort()) !== lastSort) schedule();
	};
	table.addEventListener("pk-view-change", onView);
	table.addEventListener("pk-query-change", onQuery);
	const binding = {
		storageKey,
		clear,
		disconnect() {
			if (pending) save();
			active = false;
			table.removeEventListener("pk-view-change", onView);
			table.removeEventListener("pk-query-change", onQuery);
			if (bindings.get(table) === binding) bindings.delete(table);
		}
	};
	bindings.set(table, binding);
	return binding;
}
//#endregion
//#region src/components/data-table/pk-data-table.ts
var PkDataTable = class PkDataTable extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.filterController = new DataTableFilterController(this);
		this.label = "Records";
		this.rows = [];
		this.columns = [];
		this.filters = [];
		this.rowKey = "id";
		this.query = defaultDataTableQuery();
		this.view = {
			hiddenColumns: [],
			columnOrder: []
		};
		this.mode = "client";
		this.pagination = "offset";
		this.hasNext = false;
		this.loading = false;
		this.error = "";
		this.searchable = true;
		this.showFilters = false;
		this.columnControls = true;
		this.hideToolbar = false;
		this.hideFooter = false;
		this.selectable = false;
		this.selectedKeys = [];
		this.exportFormats = [];
		this.exporting = false;
		this.defaultView = {
			hiddenColumns: [],
			columnOrder: []
		};
		this.defaultSort = [];
		this.searchDelay = 250;
		this.size = "default";
		this.layout = "embedded";
		this.locale = "";
		this.timeZone = "";
		this.labels = {};
		this.dragOffsets = {};
		this.reorderAnnouncement = "";
		this.tableScrollWidth = 0;
		this.hasHorizontalOverflow = false;
		this.sortLoading = false;
		this.viewClosePending = false;
		this.requests = new DataTableRequestController();
	}
	static {
		this.styles = dataTableStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.hasUpdated) this.observeLayout();
		if (this.hasUpdated && this.mode === "remote" && this.dataSource) this.refresh();
	}
	disconnectedCallback() {
		this.cancelColumnDrag();
		this.resizeObserver?.disconnect();
		if (this.layoutFrame !== void 0) cancelAnimationFrame(this.layoutFrame);
		this.layoutFrame = void 0;
		this.resizeObserver = void 0;
		this.pagingFocus = void 0;
		clearTimeout(this.searchTimer);
		this.requests.cancel();
		super.disconnectedCallback();
	}
	willUpdate(changed) {
		if (this.drag && (changed.has("columns") || changed.has("view"))) this.cancelColumnDrag();
		if (changed.has("query") || changed.has("rows") || changed.has("selectable")) {
			this.selectionAnchor = void 0;
			this.checkboxGesture = void 0;
		}
		if (!this.query.sort.length && this.resolvedDefaultSort.length) {
			this.query = {
				...this.query,
				sort: this.resolvedDefaultSort
			};
			if (this.mode === "remote") this.loading = true;
			this.emit("pk-query-change", { query: this.query });
		}
		const pageSize = Number.isFinite(this.query.pageSize) ? Math.max(1, Math.floor(this.query.pageSize)) : 25;
		const pageIndex = Number.isFinite(this.query.pageIndex) ? Math.max(0, Math.floor(this.query.pageIndex)) : 0;
		if (pageSize !== this.query.pageSize || pageIndex !== this.query.pageIndex) this.query = {
			...this.query,
			pageSize,
			pageIndex
		};
		if (changed.has("query")) {
			this.requests.cancel();
			clearTimeout(this.searchTimer);
			this.searchDraft = void 0;
			const previous = changed.get("query");
			this.sortLoading = Boolean(previous?.sort.length && JSON.stringify(previous.sort) !== JSON.stringify(this.query.sort));
			if (previous && JSON.stringify([
				previous.criteria,
				previous.search,
				previous.filters,
				previous.filterOperators,
				previous.sort
			]) !== JSON.stringify([
				this.query.criteria,
				this.query.search,
				this.query.filters,
				this.query.filterOperators,
				this.query.sort
			])) this.setSelection([]);
		}
		if (changed.has("loading") && !this.loading) this.sortLoading = false;
		if (changed.has("dataSource") || changed.has("mode")) {
			this.requests.cancel();
			this.loaded = void 0;
		}
		if (changed.has("mode") && this.mode === "client") {
			this.loading = false;
			this.error = "";
		}
		if (this.mode === "client" && (changed.has("rows") || changed.has("query"))) {
			const result = queryDataTable(this.rows, this.columns, this.filters, this.query, this.locale || void 0);
			const lastPage = Math.max(0, Math.ceil((result.total ?? 0) / this.query.pageSize) - 1);
			if (this.query.pageIndex > lastPage) {
				this.query = {
					...this.query,
					pageIndex: lastPage
				};
				this.emit("pk-query-change", { query: this.query });
			}
		}
	}
	updated(changed) {
		if (!this.resizeObserver) this.observeLayout();
		this.measureLayout();
		this.restorePagingFocus();
		if ((changed.has("query") || changed.has("dataSource") || changed.has("mode")) && this.mode === "remote" && this.dataSource) this.refresh();
	}
	observeLayout() {
		this.resizeObserver?.disconnect();
		this.resizeObserver = new ResizeObserver(() => {
			if (this.layoutFrame !== void 0) cancelAnimationFrame(this.layoutFrame);
			this.layoutFrame = requestAnimationFrame(() => {
				this.layoutFrame = void 0;
				this.measureLayout();
			});
		});
		for (const element of this.renderRoot.querySelectorAll(".scroll, table, thead")) this.resizeObserver.observe(element);
	}
	measureLayout() {
		const scroll = this.renderRoot.querySelector(".scroll");
		if (!scroll) return;
		const header = this.renderRoot.querySelector("thead");
		scroll.style.setProperty("--_pk-data-table-heading-height", `${header?.offsetHeight ?? 0}px`);
		this.tableScrollWidth = scroll.scrollWidth;
		this.hasHorizontalOverflow = scroll.scrollWidth > scroll.clientWidth + 1;
		const proxy = this.renderRoot.querySelector(".scrollbar");
		if (proxy) proxy.scrollLeft = scroll.scrollLeft;
	}
	syncHorizontalScroll(event, target) {
		const scroll = this.renderRoot.querySelector(target);
		if (scroll) scroll.scrollLeft = event.currentTarget.scrollLeft;
	}
	async restorePagingFocus() {
		if (!this.pagingFocus || this.loading) return;
		const pending = this.pagingFocus;
		const buttons = [...this.renderRoot.querySelectorAll(".pager pk-button")];
		await Promise.all(buttons.map((button) => button.updateComplete));
		if (this.pagingFocus !== pending || this.loading || !this.isConnected) return;
		this.pagingFocus = void 0;
		const { direction, button } = pending;
		let active = this.ownerDocument.activeElement;
		while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
		if (active && active !== this.ownerDocument.body && active !== button && active !== button.shadowRoot?.activeElement) return;
		const preferred = buttons[direction > 0 ? 1 : 0];
		((preferred && !preferred.disabled ? preferred : buttons.find((item) => !item.disabled)) ?? this.renderRoot.querySelector(".scroll"))?.focus({ preventScroll: true });
	}
	text(key, values = {}) {
		return (this.labels[key] ?? dataTableLabels[key]).replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
	}
	emit(name, detail = {}) {
		this.dispatchEvent(new CustomEvent(name, {
			detail,
			bubbles: true,
			composed: true
		}));
	}
	/** Request a new remote page. Superseded responses are ignored, even if the loader ignores abort. */
	async refresh() {
		if (this.mode !== "remote" || !this.dataSource) {
			this.emit("pk-retry");
			return;
		}
		this.loading = true;
		this.error = "";
		try {
			const result = await this.requests.load(this.dataSource, this.query);
			if (!result) return;
			if (!Array.isArray(result.rows)) throw new TypeError("DataTable dataSource must return rows.");
			this.loaded = result;
			this.loading = false;
			this.emit("pk-load", {
				result,
				query: this.query
			});
		} catch (error) {
			this.error = this.text("error");
			this.loading = false;
			this.emit("pk-load-error", { error });
		}
	}
	get resolvedDefaultSort() {
		if (this.defaultSort.length) return this.defaultSort.map((sort) => ({ ...sort }));
		const column = this.columns.find((column) => column.sortable);
		return column ? [{
			id: column.id,
			direction: "asc"
		}] : [];
	}
	/** Update query state and reset paging for search, sorting or criteria changes. */
	setQuery(patch) {
		this.requests.cancel();
		if ("sort" in patch && !patch.sort?.length) patch = {
			...patch,
			sort: this.resolvedDefaultSort
		};
		const criteriaChanged = "search" in patch || "sort" in patch || "filters" in patch || "filterOperators" in patch || "criteria" in patch;
		const resetPage = criteriaChanged || "pageSize" in patch;
		this.query = {
			...this.query,
			...patch,
			...resetPage ? {
				pageIndex: 0,
				cursor: void 0
			} : {}
		};
		if (criteriaChanged) {
			this.pagingFocus = void 0;
			this.setSelection([]);
		}
		if (this.mode === "remote") this.loading = true;
		this.emit("pk-query-change", { query: this.query });
	}
	setSelection(selectedKeys) {
		if (!selectedKeys.length) this.selectionAnchor = void 0;
		if (this.selectedKeys.length === 0 && selectedKeys.length === 0) return;
		this.selectedKeys = selectedKeys;
		this.emit("pk-selection-change", { selectedKeys });
	}
	canSelectRow(row) {
		return this.selectable && !this.loading && !this.error && this.isRowSelectable?.(row) !== false;
	}
	isRowControl(event) {
		for (const node of event.composedPath()) {
			if (node === event.currentTarget) break;
			if (node instanceof Element && node.matches("a, button, input, select, textarea, label, summary, [contenteditable]:not([contenteditable=\"false\"]), [role=\"button\"], [role=\"link\"], [role=\"checkbox\"], [role=\"switch\"], [tabindex], [data-table-interactive]")) return true;
		}
		return false;
	}
	selectRow(row, gesture, toggle = false) {
		if (!this.canSelectRow(row)) return;
		const key = this.key(row);
		const pageKeys = this.result.rows.map((item) => this.key(item));
		const anchor = this.selectionAnchor === void 0 ? -1 : pageKeys.indexOf(this.selectionAnchor);
		const index = pageKeys.indexOf(key);
		if (gesture.shiftKey && anchor !== -1 && index !== -1) {
			const range = this.result.rows.slice(Math.min(anchor, index), Math.max(anchor, index) + 1).filter((item) => this.canSelectRow(item)).map((item) => this.key(item));
			const retained = gesture.metaKey || gesture.ctrlKey ? this.selectedKeys : this.selectedKeys.filter((id) => !pageKeys.includes(id));
			this.setSelection([.../* @__PURE__ */ new Set([...retained, ...range])]);
			return;
		}
		this.selectionAnchor = key;
		if (toggle || gesture.metaKey || gesture.ctrlKey) this.setSelection(this.selectedKeys.includes(key) ? this.selectedKeys.filter((id) => id !== key) : [...this.selectedKeys, key]);
		else this.setSelection([key]);
	}
	clickRow(event, row) {
		if (event.button !== 0 || !this.canSelectRow(row) || this.isRowControl(event)) return;
		this.selectRow(row, event);
		event.currentTarget.querySelector("pk-checkbox")?.focus({ preventScroll: true });
	}
	clickRowCheckbox(event, row) {
		if (event.shiftKey && !(event.composedPath()[0] instanceof HTMLInputElement)) {
			event.preventDefault();
			this.checkboxGesture = void 0;
			this.selectRow(row, event, true);
			return;
		}
		this.checkboxGesture = {
			key: this.key(row),
			shiftKey: event.shiftKey,
			metaKey: event.metaKey,
			ctrlKey: event.ctrlKey
		};
	}
	changeRowCheckbox(row) {
		const gesture = this.checkboxGesture?.key === this.key(row) ? this.checkboxGesture : {};
		this.checkboxGesture = void 0;
		this.selectRow(row, gesture, true);
	}
	keyRow(event, row) {
		if (!this.canSelectRow(row) || event.defaultPrevented) return;
		const tr = event.currentTarget;
		const checkbox = tr.querySelector("pk-checkbox");
		if (!event.composedPath().includes(checkbox) && event.target !== tr) return;
		const command = event.metaKey || event.ctrlKey;
		const rows = this.result.rows.filter((item) => this.canSelectRow(item));
		if (command && event.key.toLowerCase() === "a") {
			event.preventDefault();
			this.setSelection([.../* @__PURE__ */ new Set([...this.selectedKeys, ...rows.map((item) => this.key(item))])]);
			return;
		}
		if (event.key === "Escape") {
			event.preventDefault();
			this.setSelection([]);
			return;
		}
		if (event.key === "Enter" || event.key === " " && event.shiftKey) {
			event.preventDefault();
			this.selectRow(row, event, true);
			return;
		}
		if (![
			"ArrowUp",
			"ArrowDown",
			"Home",
			"End"
		].includes(event.key)) return;
		event.preventDefault();
		const current = rows.findIndex((item) => this.key(item) === this.key(row));
		const first = event.key === "Home" || command && event.key === "ArrowUp";
		const last = event.key === "End" || command && event.key === "ArrowDown";
		const target = rows[first ? 0 : last ? rows.length - 1 : Math.max(0, Math.min(rows.length - 1, current + (event.key === "ArrowUp" ? -1 : 1)))];
		if (!target) return;
		if (event.shiftKey) {
			this.selectionAnchor ??= this.key(row);
			this.selectRow(target, event);
		}
		const pageIndex = this.result.rows.findIndex((item) => this.key(item) === this.key(target));
		const targetRow = this.renderRoot.querySelectorAll("tbody tr")[pageIndex];
		if (targetRow) {
			const footerHeight = this.layout === "index" ? this.renderRoot.querySelector(".footer-shell")?.offsetHeight ?? 0 : 0;
			const headerHeight = this.layout === "index" ? (this.renderRoot.querySelector(".header-shell")?.offsetHeight ?? 0) + (Number.parseFloat(getComputedStyle(this.renderRoot.querySelector(".header-shell")).top) || 0) + 2 : 0;
			targetRow.style.scrollMarginBlockStart = `${headerHeight}px`;
			targetRow.style.scrollMarginBlockEnd = `${footerHeight}px`;
		}
		targetRow?.querySelector("pk-checkbox")?.focus({ preventScroll: true });
		targetRow?.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
	}
	accessibleRowLabel(row) {
		return (typeof this.rowLabel === "function" ? this.rowLabel(row) : this.rowLabel ? dataTableText(row[this.rowLabel]) : "") || String(this.key(row));
	}
	key(row) {
		const key = typeof this.rowKey === "function" ? this.rowKey(row) : row[this.rowKey];
		if (typeof key !== "string" && typeof key !== "number") throw new TypeError("DataTable rows require a stable string or number rowKey.");
		return key;
	}
	get result() {
		if (this.mode === "client") return queryDataTable(this.rows, this.columns, this.filters, this.query, this.locale || void 0);
		return this.dataSource ? this.loaded ?? { rows: [] } : {
			rows: this.rows,
			total: this.total,
			hasNext: this.hasNext,
			nextCursor: this.nextCursor,
			previousCursor: this.previousCursor
		};
	}
	get orderedColumns() {
		const ordered = this.view.columnOrder.map((id) => this.columns.find((column) => column.id === id)).filter((column) => Boolean(column));
		return [.../* @__PURE__ */ new Set([...ordered, ...this.columns])];
	}
	setView(view) {
		this.view = view;
		this.emit("pk-view-change", { view });
	}
	toggleColumn(id) {
		const hidden = new Set(this.view.hiddenColumns);
		if (!hidden.has(id) && this.columns.filter((column) => column.hideable === false || !hidden.has(column.id)).length <= 1) return;
		if (hidden.has(id)) hidden.delete(id);
		else hidden.add(id);
		this.setView({
			...this.view,
			hiddenColumns: [...hidden]
		});
	}
	moveColumn(id, direction) {
		const order = this.orderedColumns.map((column) => column.id), index = order.indexOf(id);
		if (index + direction < 0 || index + direction >= order.length) return;
		order.splice(index, 1);
		order.splice(index + direction, 0, id);
		this.reorderAnnouncement = this.text("reordered", {
			label: this.columns.find((column) => column.id === id)?.label ?? id,
			position: index + direction + 1,
			count: order.length
		});
		this.setView({
			...this.view,
			columnOrder: order
		});
	}
	icon(icon, slot) {
		return b`<span
            class="icon"
            slot=${slot ?? A}
            aria-hidden="true"
            >${o(renderIconHtml(icon))}</span
        >`;
	}
	directionIcon(direction) {
		return b`<svg
            class="direction-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d=${direction === "asc" ? "M5 20V4m-3 3 3-3 3 3" : "M5 4v16m-3-3 3 3 3-3"}
            />
            <path d="M12 5h9M12 10h6M12 15h3M12 20h1" />
        </svg>`;
	}
	startColumnDrag(event, id) {
		if (event.button !== 0) return;
		const list = this.renderRoot.querySelector(".column-list");
		if (!list) return;
		event.preventDefault();
		const handle = event.currentTarget;
		handle.focus();
		const bounds = list.getBoundingClientRect();
		const rows = [...list.querySelectorAll(".column-option")].map((row) => {
			const rect = row.getBoundingClientRect();
			return {
				id: row.dataset.column,
				top: rect.top - bounds.top + list.scrollTop,
				height: rect.height
			};
		});
		this.drag = {
			id,
			startY: event.clientY,
			pointerY: event.clientY,
			startScroll: list.scrollTop,
			moved: false,
			targetIndex: rows.findIndex((row) => row.id === id),
			pointerId: event.pointerId,
			handle,
			list,
			rows
		};
		handle.setPointerCapture(event.pointerId);
	}
	dragColumn(event) {
		if (!this.drag || event.pointerId !== this.drag.pointerId) return;
		this.drag.pointerY = event.clientY;
		if (Math.abs(event.clientY - this.drag.startY) < 4 && !this.drag.moved) return;
		this.drag.moved = true;
		this.previewColumnDrag();
	}
	previewColumnDrag() {
		const drag = this.drag;
		if (!drag?.moved) return;
		const { list, rows } = drag;
		const bounds = list.getBoundingClientRect();
		const sourceIndex = rows.findIndex((row) => row.id === drag.id);
		const source = rows[sourceIndex];
		const desiredTop = source.top + drag.pointerY - drag.startY + list.scrollTop - drag.startScroll;
		const top = Math.max(Math.max(rows[0].top, list.scrollTop), Math.min(desiredTop, rows.at(-1).top + rows.at(-1).height - source.height, list.scrollTop + list.clientHeight - source.height));
		const center = top + source.height / 2;
		drag.targetIndex = rows.reduce((closest, row, index) => Math.abs(center - row.top - row.height / 2) < Math.abs(center - rows[closest].top - rows[closest].height / 2) ? index : closest, 0);
		this.dragOffsets = Object.fromEntries(rows.map((row, index) => [row.id, index === sourceIndex ? top - source.top : index > sourceIndex && index <= drag.targetIndex ? -source.height : index < sourceIndex && index >= drag.targetIndex ? source.height : 0]));
		const scroll = drag.pointerY < bounds.top + 24 ? -8 : drag.pointerY > bounds.bottom - 24 ? 8 : 0;
		if (this.dragFrame !== void 0) cancelAnimationFrame(this.dragFrame);
		this.dragFrame = void 0;
		if (scroll && (scroll < 0 ? list.scrollTop > 0 : list.scrollTop + list.clientHeight < list.scrollHeight)) this.dragFrame = requestAnimationFrame(() => {
			this.dragFrame = void 0;
			list.scrollTop += scroll;
			this.previewColumnDrag();
		});
	}
	cancelColumnDrag() {
		const drag = this.drag;
		this.drag = void 0;
		if (this.dragFrame !== void 0) cancelAnimationFrame(this.dragFrame);
		this.dragFrame = void 0;
		this.dragOffsets = {};
		if (drag?.handle.hasPointerCapture(drag.pointerId)) drag.handle.releasePointerCapture(drag.pointerId);
	}
	endColumnDrag(event, commit) {
		const drag = this.drag;
		if (!drag || event.pointerId !== drag.pointerId) return;
		this.cancelColumnDrag();
		if (commit && drag.moved) this.moveColumn(drag.id, drag.targetIndex - drag.rows.findIndex((row) => row.id === drag.id));
	}
	finishViewChildren(event) {
		const view = event.currentTarget.closest("pk-popover");
		if (!view || event.target !== view) return;
		if (this.drag && event.detail.source === "escape") {
			event.preventDefault();
			this.cancelColumnDrag();
			return;
		}
		this.cancelColumnDrag();
		const select = view.querySelector("pk-select");
		if (!select?.open) return;
		event.preventDefault();
		if (this.viewClosePending) return;
		this.viewClosePending = true;
		select.addEventListener("pk-after-hide", () => {
			this.viewClosePending = false;
			view.closePopover(event.detail.source);
		}, { once: true });
		select.hide();
	}
	renderView() {
		const sort = this.query.sort[0];
		const sortable = this.columns.filter((column) => column.sortable);
		const visibleCount = this.columns.filter((column) => column.hideable === false || !this.view.hiddenColumns.includes(column.id)).length;
		return b`<pk-popover
            class="view-popover"
            .label=${this.text("view")}
            @pk-hide=${this.finishViewChildren}
            placement="bottom-end"
            flush
        >
            <pk-button slot="trigger" with-caret
                >${this.icon(slidersOutline, "start")}${this.text("view")}</pk-button
            >
            <div class="view-grid">
                ${sortable.length ? b`<div class="view-label">
                                  ${this.text("sortBy")}
                              </div>
                              <div
                                  class="view-sort"
                                  role="group"
                                  aria-label=${this.text("sortBy")}
                              >
                                  <pk-select
                                      aria-label=${this.text("sortBy")}
                                      .value=${sort?.id ?? ""}
                                      @pk-change=${(event) => {
			const id = event.detail.value;
			if (id) this.setQuery({ sort: [{
				id,
				direction: sort?.direction ?? "asc"
			}] });
		}}
                                      >${sortable.map((column) => b`<pk-option value=${column.id}>${column.label}</pk-option>`)}</pk-select
                                  >
                                  <pk-button-group
                                      .label=${this.text("sortDirection")}
                                      >${["asc", "desc"].map((direction) => b`<pk-button .disabled=${!sort} variant=${sort?.direction === direction ? "secondary" : "default"} aria-label=${this.text(direction === "asc" ? "ascending" : "descending")} aria-pressed=${sort?.direction === direction ? "true" : "false"} @click=${() => sort && this.setQuery({ sort: [{
			id: sort.id,
			direction
		}] })}>${this.directionIcon(direction)}</pk-button>`)}</pk-button-group
                                  >
                              </div>` : A}
                <div class="view-label columns-label">
                    ${this.text("columns")}
                </div>
                <div
                    class="column-list"
                    role="group"
                    aria-label=${this.text("columns")}
                    ?data-reordering=${this.drag?.moved}
                >
                    <span id="reorder-help" class="sr-only"
                        >${this.text("reorderHelp")}</span
                    >
                    ${c(this.orderedColumns, (column) => column.id, (column) => b`<div
                                class="column-option"
                                data-column=${column.id}
                                ?data-dragging=${this.drag?.moved && this.drag.id === column.id}
                                style=${o$1({ transform: this.drag?.moved ? `translateY(${this.dragOffsets[column.id] ?? 0}px)` : void 0 })}
                            >
                                <button
                                    class="column-handle"
                                    type="button"
                                    aria-label=${this.text("reorder", { label: column.label })}
                                    aria-describedby="reorder-help"
                                    @pointerdown=${(event) => this.startColumnDrag(event, column.id)}
                                    @pointermove=${(event) => this.dragColumn(event)}
                                    @pointerup=${(event) => this.endColumnDrag(event, true)}
                                    @pointercancel=${(event) => this.endColumnDrag(event, false)}
                                    @lostpointercapture=${(event) => this.endColumnDrag(event, false)}
                                    @keydown=${(event) => {
			if (this.drag && event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				this.cancelColumnDrag();
				return;
			}
			if (this.drag) return;
			if (event.key === "ArrowUp" || event.key === "ArrowDown") {
				event.preventDefault();
				this.moveColumn(column.id, event.key === "ArrowUp" ? -1 : 1);
			}
		}}
                                >
                                    ${this.icon(gripMove)}
                                </button>
                                <pk-checkbox
                                    .checked=${column.hideable === false || !this.view.hiddenColumns.includes(column.id)}
                                    .disabled=${column.hideable === false || !this.view.hiddenColumns.includes(column.id) && visibleCount <= 1}
                                    @change=${() => this.toggleColumn(column.id)}
                                    >${column.label}</pk-checkbox
                                >
                            </div>`)}
                </div>
            </div>
            <div class="view-footer">
                <pk-button
                    variant="transparent"
                    @click=${() => {
			this.setView(structuredClone(this.defaultView));
			this.setQuery({ sort: structuredClone(this.defaultSort) });
		}}
                    >${this.text("defaults")}</pk-button
                ><pk-button
                    @click=${(event) => event.currentTarget.closest("pk-popover")?.closePopover()}
                    >${this.text("close")}</pk-button
                >
            </div>
            <span role="status" class="sr-only"
                >${this.reorderAnnouncement}</span
            >
        </pk-popover>`;
	}
	renderExport() {
		if (!this.exportFormats.length) return A;
		return b`<pk-dropdown-menu
            placement="top-end"
            @pk-select=${(event) => {
			if (this.loading || this.exporting || !this.exportFormats.some((format) => format.value === event.detail.value && !format.disabled)) return;
			const detail = {
				format: event.detail.value,
				query: structuredClone(this.query),
				view: structuredClone(this.view),
				columnIds: this.orderedColumns.filter((column) => column.hideable === false || !this.view.hiddenColumns.includes(column.id)).map((column) => column.id),
				selectedKeys: [...this.selectedKeys]
			};
			this.emit("pk-export", detail);
		}}
            ><pk-button
                slot="trigger"
                with-caret
                size="sm"
                .disabled=${this.loading || this.exporting}
                .loading=${this.exporting}
                aria-label=${this.text(this.exporting ? "exporting" : "export")}
                >${this.text(this.exporting ? "exporting" : "export")}</pk-button
            >${this.exportFormats.map((format) => b`<pk-dropdown-item value=${format.value} .disabled=${Boolean(format.disabled)}>${format.label}</pk-dropdown-item>`)}</pk-dropdown-menu
        >`;
	}
	sortColumn(id) {
		const current = this.query.sort[0];
		this.setQuery({ sort: [{
			id,
			direction: current?.id === id && current.direction === "asc" ? "desc" : "asc"
		}] });
	}
	inputSearch(event) {
		if (event.target !== event.currentTarget) return;
		const value = event.currentTarget.value;
		this.searchDraft = value;
		clearTimeout(this.searchTimer);
		if (!value) {
			if (this.query.search) this.setQuery({ search: "" });
		} else this.searchTimer = setTimeout(() => this.setQuery({ search: value }), this.searchDelay);
	}
	renderToolbar() {
		if (this.hideToolbar) return A;
		return b`<div class="toolbar" part="toolbar">
            <slot name="toolbar-start"></slot>
            ${this.searchable ? b`<pk-input class="search" type="search" with-clear .clearLabel=${this.text("clearSearch")} .label=${this.text("search")} placeholder=${this.text("search")} .value=${this.searchDraft ?? this.query.search} @input=${this.inputSearch}>${this.icon(magnifyingGlass, "start")}${this.filterController.renderTrigger("end")}</pk-input>` : A}
            <div class="toolbar-end">
                ${!this.searchable ? this.filterController.renderTrigger() : A}
                <slot name="toolbar-controls"></slot>
                ${this.columnControls ? this.renderView() : A}
                <slot name="toolbar-end"></slot>
            </div>
        </div>`;
	}
	renderCell(row, column) {
		const value = dataTableValue(row, column), key = this.key(row);
		const context = {
			row,
			column,
			value,
			rowKey: key
		};
		if (column.renderCell) return column.renderCell(context);
		if (column.type === "custom") return b`<slot name=${dataTableCellSlot(key, column.id)}
                >${dataTableText(value)}</slot
            >`;
		if (value == null || value === "") return "—";
		if (column.type === "number" && Number.isFinite(Number(value))) return new Intl.NumberFormat(this.locale || void 0, column.numberOptions).format(Number(value));
		if (column.type === "date") {
			const date = value instanceof Date ? value : new Date(dataTableText(value));
			if (!Number.isFinite(date.getTime())) return "—";
			return b`<time datetime=${date.toISOString()}
                >${new Intl.DateTimeFormat(this.locale || void 0, {
				...this.timeZone ? { timeZone: this.timeZone } : {},
				...column.dateOptions
			}).format(date)}</time
            >`;
		}
		if (column.type === "status") return b`<pk-status-label
                .status=${column.status?.(row) ?? dataTableText(value)}
                >${dataTableText(value)}</pk-status-label
            >`;
		if (column.type === "link") {
			const href = column.href?.(row) ?? dataTableText(value);
			try {
				if (![
					"http:",
					"https:",
					"mailto:",
					"tel:"
				].includes(new URL(href, document.baseURI).protocol)) return dataTableText(value);
			} catch {
				return dataTableText(value);
			}
			return b`<a
                href=${href}
                class=${column.wrap === true ? A : "cell-link"}
                title=${dataTableText(value)}
                >${dataTableText(value)}</a
            >`;
		}
		return dataTableText(value);
	}
	page(delta, result) {
		const button = this.renderRoot.querySelectorAll(".pager pk-button")[delta > 0 ? 1 : 0];
		if (button) this.pagingFocus = {
			direction: delta,
			button
		};
		this.setQuery({
			pageIndex: Math.max(0, this.query.pageIndex + delta),
			cursor: this.pagination === "cursor" ? delta > 0 ? result.nextCursor : result.previousCursor : void 0
		});
	}
	render() {
		const result = this.result;
		const columns = this.orderedColumns.filter((column) => column.hideable === false || !this.view.hiddenColumns.includes(column.id));
		const eligible = result.rows.filter((row) => this.isRowSelectable?.(row) !== false).map((row) => this.key(row));
		const selected = new Set(this.selectable ? this.selectedKeys : []);
		const checked = eligible.length > 0 && eligible.every((key) => selected.has(key));
		const start = result.rows.length ? this.query.pageIndex * this.query.pageSize + 1 : 0;
		const end = result.rows.length ? start + result.rows.length - 1 : 0;
		const next = this.pagination === "cursor" ? Boolean(result.nextCursor) : result.total != null ? end < result.total : Boolean(result.hasNext);
		const previous = this.pagination === "cursor" ? this.query.pageIndex > 0 && result.previousCursor !== void 0 : this.query.pageIndex > 0;
		const busy = this.loading || Boolean(this.error);
		const sorting = this.loading && this.sortLoading;
		const bodyLoading = this.loading && !sorting;
		const proxy = this.layout === "index" && !this.hideFooter && this.hasHorizontalOverflow;
		const count = this.text(result.total == null ? "unknownRange" : "range", {
			start,
			end,
			total: result.total ?? 0
		});
		return b`
            <div class="header-shell" part="header-shell">
                ${this.renderToolbar()}
            </div>
            ${this.filterController.renderDialog()}
            <div role="status" aria-live="polite" class="sr-only">
                ${this.loading ? this.text(result.rows.length ? "updating" : "loading") : selected.size ? `${count}. ${this.text("selected", { count: selected.size })}` : count}
            </div>
            ${this.error ? b`<pk-state-panel variant="error" .heading=${this.error}><pk-button slot="actions" @click=${() => this.refresh()}>${this.text("retry")}</pk-button></pk-state-panel>` : A}
            <div class="table-frame">
                <div
                    class="scroll"
                    part="scroll"
                    ?data-proxy=${proxy}
                    @scroll=${(event) => this.syncHorizontalScroll(event, ".scrollbar")}
                    role="region"
                    aria-label=${this.label}
                    tabindex="0"
                    aria-busy=${this.loading ? "true" : "false"}
                >
                    <table part="table">
                        <caption class="sr-only">
                            ${this.label}
                        </caption>
                        <thead>
                            <tr>
                                ${this.selectable ? b`<th class="small"><pk-checkbox aria-label=${this.text("selectPage")} .checked=${checked} .indeterminate=${!checked && eligible.some((key) => selected.has(key))} .disabled=${busy || eligible.length === 0} @change=${() => this.setSelection(checked ? this.selectedKeys.filter((key) => !eligible.includes(key)) : [.../* @__PURE__ */ new Set([...this.selectedKeys, ...eligible])])}></pk-checkbox></th>` : A}
                                ${columns.map((column) => {
			const sort = this.query.sort.find((item) => item.id === column.id);
			return b`<th
                                        scope="col"
                                        style=${o$1({ width: column.width })}
                                        class=${column.align ?? (column.type === "number" ? "end" : "")}
                                        ?data-sorted=${Boolean(sort)}
                                        ?data-sortable=${Boolean(column.sortable)}
                                        aria-sort=${sort ? sort.direction === "asc" ? "ascending" : "descending" : A}
                                    >
                                        ${column.sortable ? b`<button class="sort" aria-label=${this.text("sort", { label: column.label })} @click=${() => this.sortColumn(column.id)}>${column.label}${sort ? sorting ? b`<pk-spinner class="sort-spinner" size="xs" aria-hidden="true"></pk-spinner>` : this.icon(sort.direction === "asc" ? chevronUp : chevronDown) : A}</button>` : column.label}
                                    </th>`;
		})}
                                ${this.rowActions ? b`<th class="small"><span class="sr-only">${this.text("actions", { id: "" })}</span></th>` : A}
                            </tr>
                        </thead>
                        <tbody class=${busy && !sorting ? "busy" : ""} ?inert=${busy} ?data-loading=${bodyLoading}>
                            ${c(result.rows, (row) => this.key(row), (row) => b`<tr
                                        ?data-selected=${this.selectable && selected.has(this.key(row))}
                                        ?data-selectable=${this.canSelectRow(row)}
                                        @click=${(event) => this.clickRow(event, row)}
                                        @keydown=${(event) => this.keyRow(event, row)}
                                        @mousedown=${(event) => {
			if (event.button === 0 && this.canSelectRow(row) && (event.shiftKey || event.metaKey || event.ctrlKey) && !this.isRowControl(event)) event.preventDefault();
		}}
                                    >
                                        ${this.selectable ? b`<td class="small">
                                                      <pk-checkbox
                                                          aria-label=${this.text("selectRow", { id: this.accessibleRowLabel(row) })}
                                                          .checked=${selected.has(this.key(row))}
                                                          .disabled=${busy || this.isRowSelectable?.(row) === false}
                                                          @mousedown=${(event) => {
			if (event.shiftKey) {
				event.preventDefault();
				event.currentTarget.focus({ preventScroll: true });
			}
		}}
                                                          @click=${(event) => this.clickRowCheckbox(event, row)}
                                                          @change=${() => this.changeRowCheckbox(row)}
                                                      ></pk-checkbox>
                                                  </td>` : A}
                                        ${columns.map((column) => b`<td part="cell" class=${`${column.align ?? (column.type === "number" ? "end" : "")} ${column.wrap ?? ![
			"number",
			"date",
			"status"
		].includes(column.type ?? "text") ? "" : "nowrap"}`}>${this.renderCell(row, column)}</td>`)}
                                        ${this.rowActions ? b`<td class="small">
                                                      <pk-popover
                                                          placement="bottom-end"
                                                          ><pk-button
                                                              slot="trigger"
                                                              size="sm"
                                                              variant="transparent"
                                                              aria-label=${this.text("actions", { id: this.key(row) })}
                                                              >⋯</pk-button
                                                          >
                                                          <div class="panel">
                                                              ${this.rowActions(row).map((action) => b`<pk-button
                                                                          .disabled=${Boolean(action.disabled)}
                                                                          @click=${(event) => {
			event.currentTarget.closest("pk-popover")?.removeAttribute("open");
			this.emit("pk-row-action", {
				action: action.id,
				row,
				rowKey: this.key(row)
			});
		}}
                                                                          >${action.label}</pk-button
                                                                      >`)}
                                                          </div></pk-popover
                                                      >
                                                  </td>` : A}
                                    </tr>`)}
                        </tbody>
                    </table>
                    ${bodyLoading ? b`
                        ${!result.rows.length ? b`<div class="loading-space" aria-hidden="true"></div>` : A}
                        <div class="loading-indicator" aria-hidden="true"><pk-spinner></pk-spinner></div>
                    ` : A}
                    ${!result.rows.length && !bodyLoading && !this.error ? b`<slot name="empty"><pk-state-panel .heading=${this.text(this.query.search || Object.keys(this.query.filters).length ? "noResults" : "empty")}></pk-state-panel></slot>` : A}
                </div>
                ${this.hideFooter ? A : b`<div class="footer-shell" part="footer-shell">
                              ${proxy ? b`<div class="scrollbar" part="scrollbar" role="region" aria-label=${this.text("scrollColumns", { label: this.label })} tabindex="0" @scroll=${(event) => this.syncHorizontalScroll(event, ".scroll")}><div style=${o$1({ width: `${this.tableScrollWidth}px` })}></div></div>` : A}
                              <div class="footer" part="footer">
                                  <nav
                                      class="pager"
                                      aria-label=${this.text("pagination", { label: this.label })}
                                  >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text("previous")}
                                          .disabled=${!previous || this.loading}
                                          @click=${() => this.page(-1, result)}
                                          >${this.icon(chevronLeft)}</pk-button
                                      >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text("next")}
                                          .disabled=${!next || this.loading}
                                          @click=${() => this.page(1, result)}
                                          >${this.icon(chevronRight)}</pk-button
                                      >
                                      <span>${count}</span>
                                  </nav>
                                  ${this.selectable ? b`<div
                                                class="selection"
                                                part="selection"
                                                ?data-empty=${selected.size === 0}
                                                ?inert=${busy || selected.size === 0}
                                                aria-hidden=${selected.size === 0 ? "true" : A}
                                            >
                                                <span class="selection-count"
                                                    >${this.text("selected", { count: selected.size })}</span
                                                >
                                                <slot
                                                    name="selection-actions"
                                                ></slot>
                                            </div>` : A}
                                  <slot name="footer"></slot>
                                  <div class="footer-actions">
                                      ${this.renderExport()}
                                  </div>
                              </div>
                          </div>`}
            </div>
        `;
	}
};
__decorate([n()], PkDataTable.prototype, "label", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "rows", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "columns", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "filters", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "rowKey", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "query", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "view", void 0);
__decorate([n()], PkDataTable.prototype, "mode", void 0);
__decorate([n()], PkDataTable.prototype, "pagination", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "dataSource", void 0);
__decorate([n({ type: Number })], PkDataTable.prototype, "total", void 0);
__decorate([n({
	type: Boolean,
	attribute: "has-next"
})], PkDataTable.prototype, "hasNext", void 0);
__decorate([n({ attribute: "next-cursor" })], PkDataTable.prototype, "nextCursor", void 0);
__decorate([n({ attribute: "previous-cursor" })], PkDataTable.prototype, "previousCursor", void 0);
__decorate([n({ type: Boolean })], PkDataTable.prototype, "loading", void 0);
__decorate([n()], PkDataTable.prototype, "error", void 0);
__decorate([n({ type: Boolean })], PkDataTable.prototype, "searchable", void 0);
__decorate([n({
	type: Boolean,
	attribute: "show-filters"
})], PkDataTable.prototype, "showFilters", void 0);
__decorate([n({
	type: Boolean,
	attribute: "column-controls"
})], PkDataTable.prototype, "columnControls", void 0);
__decorate([n({
	type: Boolean,
	attribute: "hide-toolbar"
})], PkDataTable.prototype, "hideToolbar", void 0);
__decorate([n({
	type: Boolean,
	attribute: "hide-footer"
})], PkDataTable.prototype, "hideFooter", void 0);
__decorate([n({ type: Boolean })], PkDataTable.prototype, "selectable", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "selectedKeys", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "isRowSelectable", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "rowActions", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "exportFormats", void 0);
__decorate([n({ type: Boolean })], PkDataTable.prototype, "exporting", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "defaultView", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "defaultSort", void 0);
__decorate([n({
	type: Number,
	attribute: "search-delay"
})], PkDataTable.prototype, "searchDelay", void 0);
__decorate([n({ reflect: true })], PkDataTable.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkDataTable.prototype, "layout", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "rowLabel", void 0);
__decorate([n()], PkDataTable.prototype, "locale", void 0);
__decorate([n({ attribute: "time-zone" })], PkDataTable.prototype, "timeZone", void 0);
__decorate([n({ attribute: false })], PkDataTable.prototype, "labels", void 0);
__decorate([r()], PkDataTable.prototype, "loaded", void 0);
__decorate([r()], PkDataTable.prototype, "searchDraft", void 0);
__decorate([r()], PkDataTable.prototype, "dragOffsets", void 0);
__decorate([r()], PkDataTable.prototype, "reorderAnnouncement", void 0);
__decorate([r()], PkDataTable.prototype, "tableScrollWidth", void 0);
__decorate([r()], PkDataTable.prototype, "hasHorizontalOverflow", void 0);
PkDataTable = __decorate([customElement("pk-data-table")], PkDataTable);
//#endregion
export { DataTableRequestController, PkDataTable, dataTableCellSlot, dataTableFilterOperators, dataTableLabels, dataTableText, dataTableValue, defaultDataTableQuery, persistDataTableView, queryDataTable };
