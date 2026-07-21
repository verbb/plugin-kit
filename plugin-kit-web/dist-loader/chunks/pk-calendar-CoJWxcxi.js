import { a as o$1, c as r, f as A, i as e, l as n, m as i, o, p as b, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement, s as iconStyles } from "./pk-base-BlxAYXJD.js";
import { _ as chevronRight, g as chevronLeft } from "./svg-BCGsRUz7.js";
import { t as HasSlotController } from "./has-slot-BZDcCpf9.js";
import { n as renderIconHtml } from "./render-BCU9WDSk.js";
//#region src/utils/date.ts
/** ISO date helpers — ported from  `date-picker/internal/iso`. */
var ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
function parseIsoDate(value) {
	if (value == null || value === "") return null;
	if (value instanceof Date) return coerceToDate(value);
	if (typeof value !== "string") return null;
	const match = ISO_DATE.exec(value.trim());
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	if (month < 1 || month > 12 || day < 1 || day > 31) return null;
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
	return date;
}
function formatIsoDate(date) {
	if (!date || Number.isNaN(date.getTime())) return "";
	return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function coerceToDate(value) {
	if (value == null) return null;
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) return null;
		return new Date(value.getFullYear(), value.getMonth(), value.getDate());
	}
	return parseIsoDate(String(value));
}
function parseRange(value) {
	if (!value) return {
		from: null,
		to: null
	};
	const parts = value.split("/");
	if (parts.length === 1) return {
		from: parseIsoDate(parts[0]),
		to: null
	};
	const from = parseIsoDate(parts[0]);
	const to = parseIsoDate(parts[1]);
	if (!from || !to) return {
		from,
		to
	};
	return from.getTime() <= to.getTime() ? {
		from,
		to
	} : {
		from: to,
		to: from
	};
}
function formatRange(range) {
	if (!range) return "";
	const { from, to } = range;
	if (!from && !to) return "";
	if (from && !to) return formatIsoDate(from);
	if (!from && to) return formatIsoDate(to);
	return `${formatIsoDate(from)}/${formatIsoDate(to)}`;
}
/**
* Multi-date ("multiple" mode) serialization: a comma-separated list of ISO dates.
* Always parsed/emitted deduped and sorted ascending so the stored value is stable
* regardless of the order the user clicked days.
*/
function parseDateList(value) {
	if (!value) return [];
	const seen = /* @__PURE__ */ new Set();
	const dates = [];
	for (const part of value.split(",")) {
		const date = parseIsoDate(part.trim());
		if (!date) continue;
		const iso = formatIsoDate(date);
		if (seen.has(iso)) continue;
		seen.add(iso);
		dates.push(date);
	}
	dates.sort((a, b) => a.getTime() - b.getTime());
	return dates;
}
function formatDateList(dates) {
	const seen = /* @__PURE__ */ new Set();
	for (const date of dates) {
		const iso = formatIsoDate(date ?? null);
		if (iso) seen.add(iso);
	}
	return [...seen].sort().join(",");
}
/** Toggle a day in/out of a multi-date list, returning the new sorted CSV value. */
function toggleDateInList(value, date) {
	if (!formatIsoDate(date)) return value ?? "";
	const existing = parseDateList(value);
	return formatDateList(existing.some((entry) => isSameDay(entry, date)) ? existing.filter((entry) => !isSameDay(entry, date)) : [...existing, date]);
}
function isSameDay(a, b) {
	if (!a || !b) return false;
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function addDays(date, days) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
function addMonths(date, months) {
	const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
	const lastDay = daysInMonth(target.getFullYear(), target.getMonth());
	return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}
function addYears(date, years) {
	return addMonths(date, years * 12);
}
function daysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}
function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}
function todayDate() {
	const now = /* @__PURE__ */ new Date();
	return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
function diffDays(a, b) {
	const ms = a.getTime() - b.getTime();
	return Math.round(ms / 864e5);
}
/** ISO 8601 week number for the given date. */
function isoWeekNumber(date) {
	const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const dayNum = (target.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNum + 3);
	const firstThursday = new Date(target.getFullYear(), 0, 4);
	const firstDayNum = (firstThursday.getDay() + 6) % 7;
	firstThursday.setDate(firstThursday.getDate() - firstDayNum + 3);
	return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 864e5));
}
function formatDisplayDate(date, locale) {
	return new Intl.DateTimeFormat(locale || void 0, {
		year: "numeric",
		month: "short",
		day: "numeric"
	}).format(date);
}
//#endregion
//#region src/utils/date-matchers.ts
/** Date disabling matchers — ported from  `date-picker/internal/matchers`. */
function buildDisabledMatcher(options) {
	const { min, max, disabledDates = [], disabledDaysOfWeek = [], disablePast = false, disableFuture = false, today, isDateDisabled } = options;
	const minTime = min?.getTime() ?? Number.NEGATIVE_INFINITY;
	const maxTime = max?.getTime() ?? Number.POSITIVE_INFINITY;
	const todayTime = today.getTime();
	const dayOfWeekSet = new Set(disabledDaysOfWeek);
	const dateTimeSet = new Set(disabledDates.map((date) => date.getTime()));
	return function isDisabled(date) {
		const time = date.getTime();
		if (time < minTime || time > maxTime) return true;
		if (disablePast && time < todayTime) return true;
		if (disableFuture && time > todayTime) return true;
		if (dayOfWeekSet.size && dayOfWeekSet.has(date.getDay())) return true;
		if (dateTimeSet.size && dateTimeSet.has(time)) return true;
		if (isDateDisabled?.(date)) return true;
		return false;
	};
}
function parseDisabledDates(value) {
	if (value == null || value === "") return [];
	const list = Array.isArray(value) ? value : value.split(/\s+/);
	const out = [];
	for (const item of list) {
		if (item instanceof Date) {
			if (!Number.isNaN(item.getTime())) out.push(new Date(item.getFullYear(), item.getMonth(), item.getDate()));
			continue;
		}
		const parsed = parseIsoDate(String(item).trim());
		if (parsed) out.push(parsed);
	}
	return out;
}
var WEEKDAY_NAMES = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
};
function parseDaysOfWeek(value) {
	if (value == null || value === "") return [];
	const tokens = String(value).toLowerCase().split(/\s+/).filter(Boolean);
	const out = /* @__PURE__ */ new Set();
	for (const token of tokens) if (token in WEEKDAY_NAMES) out.add(WEEKDAY_NAMES[token]);
	return [...out];
}
function allDisabledInRange(start, end, isDisabled) {
	const rangeStart = start.getTime() <= end.getTime() ? start : end;
	const rangeEnd = start.getTime() <= end.getTime() ? end : start;
	const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());
	while (cursor.getTime() <= rangeEnd.getTime()) {
		if (!isDisabled(cursor)) return false;
		cursor.setDate(cursor.getDate() + 1);
	}
	return true;
}
//#endregion
//#region src/utils/week-info.ts
var SUNDAY_FIRST = new Set([
	"US",
	"CA",
	"MX",
	"BR",
	"JP",
	"PH",
	"IL",
	"AU",
	"NZ",
	"ZA",
	"CO",
	"VE",
	"PE",
	"EC",
	"GT",
	"HN",
	"NI",
	"SV",
	"CR",
	"PA",
	"DO",
	"PR",
	"JM",
	"TT",
	"BS",
	"BB",
	"BZ",
	"BO",
	"BM",
	"TW",
	"HK",
	"MO",
	"SG",
	"TH",
	"ET",
	"KE"
]);
var SATURDAY_FIRST = new Set([
	"SA",
	"AE",
	"QA",
	"KW",
	"BH",
	"OM",
	"YE",
	"JO",
	"SY",
	"IQ",
	"EG",
	"SD",
	"DZ",
	"LY"
]);
var FRI_SAT_WEEKEND = new Set([
	"SA",
	"AE",
	"QA",
	"KW",
	"BH",
	"OM",
	"YE",
	"JO",
	"EG",
	"SD",
	"DZ",
	"LY",
	"SY",
	"IQ",
	"IL"
]);
function regionFromLocale(locale) {
	try {
		return new Intl.Locale(locale).maximize().region ?? null;
	} catch {
		return null;
	}
}
function fallbackWeekInfo(locale) {
	const region = regionFromLocale(locale);
	let firstDay = 1;
	if (region && SUNDAY_FIRST.has(region)) firstDay = 7;
	else if (region && SATURDAY_FIRST.has(region)) firstDay = 6;
	const weekend = region && FRI_SAT_WEEKEND.has(region) ? [5, 6] : [6, 7];
	return {
		firstDay,
		weekend
	};
}
function getWeekInfo(locale) {
	try {
		const parsed = new Intl.Locale(locale);
		const info = typeof parsed.getWeekInfo === "function" ? parsed.getWeekInfo() : parsed.weekInfo;
		if (info && typeof info.firstDay === "number" && Array.isArray(info.weekend)) return {
			firstDay: info.firstDay,
			weekend: info.weekend
		};
	} catch {}
	return fallbackWeekInfo(locale);
}
/** Convert Intl first day (1=Mon..7=Sun) to JS `Date.getDay()` (0=Sun..6=Sat). */
function intlFirstDayToJsDay(intlFirstDay) {
	return intlFirstDay === 7 ? 0 : intlFirstDay;
}
function intlWeekendToJsDays(intlWeekend) {
	return intlWeekend.map(intlFirstDayToJsDay);
}
function resolveFirstDayOfWeek(attribute, locale) {
	if (attribute !== "auto") return {
		sun: 0,
		mon: 1,
		tue: 2,
		wed: 3,
		thu: 4,
		fri: 5,
		sat: 6
	}[attribute];
	return intlFirstDayToJsDay(getWeekInfo(locale).firstDay);
}
//#endregion
//#region src/components/calendar/pk-calendar.styles.ts
var pkCalendarStyles = i`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: inline-block;
            width: fit-content;
            max-width: 100%;
            color: var(--pk-color-gray-900);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1;
            --pk-date-cell-size: 1.75rem;
            --pk-date-cell-radius: 100%;
            --pk-date-gap: 0.25rem;
            --pk-date-column-min: var(--pk-date-cell-size);
            --pk-date-column-gap: 0;
        }

        :host([weekday-format='short']) {
            --pk-date-column-min: 2.125rem;
            --pk-date-column-gap: 0.125rem;
        }

        :host([weekday-format='long']) {
            --pk-date-column-min: 3.375rem;
            --pk-date-column-gap: 0.125rem;
        }

        :host([weekday-format='long']) .weekday {
            font-size: 0.7rem;
        }

        :host([size='xs']) {
            --pk-date-cell-size: 1.5rem;
            font-size: 11px;
        }

        :host([size='sm']) {
            --pk-date-cell-size: 1.625rem;
            font-size: 12px;
        }

        :host([size='lg']) {
            --pk-date-cell-size: 2rem;
            font-size: 14px;
        }

        :host([size='xl']) {
            --pk-date-cell-size: 2.25rem;
            font-size: 15px;
        }

        :host([disabled]) {
            opacity: 0.5;
            pointer-events: none;
        }

        .base {
            display: flex;
            flex-direction: column;
            gap: var(--pk-date-gap);
            width: fit-content;
            padding: 0.5rem;
            border: var(--pk-calendar-border, var(--pk-input-border));
            border-radius: var(--pk-radius-md);
            background: var(--pk-calendar-background, var(--pk-color-white));
        }

        :host(:not([bordered])) {
            --pk-calendar-border: 0;
            --pk-calendar-background: transparent;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.25rem;
            min-height: var(--pk-date-cell-size);
            padding-inline: 0.125rem;
        }

        .title {
            flex: 1;
            margin: 0;
            padding: 0.25rem 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            font-weight: 500;
            line-height: 1.2;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }

        .title:hover:not(:disabled) {
            background: var(--pk-color-slate-100);
        }

        .nav-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--pk-date-cell-size);
            height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0.25rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
        }

        .nav-button:hover:not(:disabled) {
            background: var(--pk-color-slate-100);
            color: var(--pk-color-gray-900);
        }

        .nav-button:disabled {
            opacity: 0.35;
            cursor: not-allowed;
        }

        .nav-button .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            flex-shrink: 0;
        }

        .nav-button .icon svg {
            display: block;
            width: 12px;
            height: 12px;
        }

        .months {
            display: flex;
            gap: 1rem;
        }

        .month {
            display: flex;
            flex-direction: column;
            width: fit-content;
            min-width: calc(var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6);
        }

        :host([data-week-numbers]) .month {
            min-width: calc(
                var(--pk-date-cell-size) + var(--pk-date-column-gap) + var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6
            );
        }

        .month-label {
            margin-bottom: 0.5rem;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            color: var(--pk-color-gray-700);
        }

        .weekdays,
        .week {
            display: grid;
            grid-template-columns: repeat(7, minmax(var(--pk-date-column-min), 1fr));
            column-gap: var(--pk-date-column-gap);
            align-items: center;
            width: 100%;
        }

        :host([data-week-numbers]) .weekdays,
        :host([data-week-numbers]) .week {
            grid-template-columns: var(--pk-date-cell-size) repeat(7, minmax(var(--pk-date-column-min), 1fr));
        }

        .grid {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            margin-top: 0.2rem;
        }

        .weeknumber-header,
        .weeknumber {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--pk-date-cell-size);
            color: var(--pk-color-gray-500);
            font-size: 0.8rem;
            font-weight: 400;
            user-select: none;
        }

        .weekday {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: var(--pk-date-column-min);
            height: var(--pk-date-cell-size);
            padding-inline: 0.125rem;
            color: var(--pk-color-gray-500);
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.1;
            text-align: center;
            white-space: nowrap;
            user-select: none;
        }

        .day,
        .day.is-placeholder {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            justify-self: center;
            width: var(--pk-date-cell-size);
            min-width: var(--pk-date-cell-size);
            max-width: var(--pk-date-cell-size);
            height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            font-weight: 400;
            line-height: 1;
            cursor: pointer;
        }

        .day.is-range-start,
        .day.is-range-end,
        .day.is-range-inner,
        .day.is-range-preview {
            justify-self: stretch;
            width: 100%;
            min-width: 0;
            max-width: none;
        }

        .day.is-range-start.is-range-end {
            justify-self: center;
            width: var(--pk-date-cell-size);
            min-width: var(--pk-date-cell-size);
            max-width: var(--pk-date-cell-size);
        }

        .day:focus-visible {
            outline: 2px solid var(--pk-color-blue-500);
            outline-offset: 1px;
            z-index: 1;
        }

        .day.is-outside {
            opacity: 0.6;
        }

        .day.is-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        /* Day grid — circular today ring (fixed cell size, not column width) */
        .day.is-today:not(.is-range-start):not(.is-range-end):not(.is-range-inner)::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px solid var(--pk-color-blue-500);
            border-radius: var(--pk-date-cell-radius);
            pointer-events: none;
        }

        .day.is-selected:not(.is-range-start):not(.is-range-end):not(.is-range-inner) {
            background: var(--pk-color-gray-200);
            border-radius: var(--pk-date-cell-radius);
            color: var(--pk-color-gray-900);
            font-weight: 400;
        }

        .day.is-range-start,
        .day.is-range-end {
            background: var(--pk-color-gray-200);
            color: var(--pk-color-gray-900);
            font-weight: 400;
        }

        .day.is-range-start.is-range-end {
            border-radius: var(--pk-date-cell-radius);
        }

        .day.is-range-start:not(.is-range-end) {
            border-radius: var(--pk-date-cell-radius) 0 0 var(--pk-date-cell-radius);
        }

        .day.is-range-end:not(.is-range-start) {
            border-radius: 0 var(--pk-date-cell-radius) var(--pk-date-cell-radius) 0;
        }

        .day.is-range-inner {
            background: var(--pk-color-gray-200);
            border-radius: 0;
        }

        .day.is-range-preview:not(.is-range-start):not(.is-range-end) {
            background: var(--pk-color-gray-200);
            opacity: 0.7;
        }

        .day.is-placeholder {
            visibility: hidden;
            pointer-events: none;
        }

        .live-region {
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

        slot[name='footer']::slotted(*) {
            display: block;
            padding-top: 0.25rem;
        }

        .view-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(var(--pk-date-cell-size), 1fr));
            gap: 0.25rem;
            width: 100%;
            min-width: calc(var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6);
        }

        .view-row {
            display: contents;
        }

        .view-cell {
            display: contents;
        }

        .view-item {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0.375rem 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            cursor: pointer;
        }

        .view-item.is-selected {
            background: var(--pk-color-gray-200);
            font-weight: 500;
        }

        /* Month/year grid — rectangular today outline */
        .view-item.is-today:not(.is-selected) {
            box-shadow: inset 0 0 0 1px var(--pk-color-blue-500);
            border-radius: var(--pk-radius-sm);
        }

        .view-item.is-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .view-item:focus-visible {
            outline: 2px solid var(--pk-color-blue-500);
            outline-offset: 1px;
        }
    }
`;
//#endregion
//#region src/components/calendar/pk-calendar.ts
var CHEVRON_LEFT = renderIconHtml(chevronLeft);
var CHEVRON_RIGHT = renderIconHtml(chevronRight);
var PkCalendar = class PkCalendar extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.hasSlotController = new HasSlotController(this, "footer", "previous-icon", "next-icon");
		this.mode = "single";
		this.size = "default";
		this.value = "";
		this.min = "";
		this.max = "";
		this.today = "";
		this.view = "days";
		this.months = 1;
		this.pageBy = "months";
		this.focusedDate = "";
		this.firstDayOfWeek = "auto";
		this.withOutsideDays = true;
		this.withWeekNumbers = false;
		this.weekdayFormat = "narrow";
		this.disabled = false;
		this.readonly = false;
		this.bordered = true;
		this.disabledDatesRaw = "";
		this.disabledDaysOfWeek = "";
		this.disablePast = false;
		this.disableFuture = false;
		this.minRange = 0;
		this.maxRange = 0;
		this.locale = "";
		this.viewAnchor = startOfMonth(todayDate());
		this.rangeAnchor = null;
		this.hoverDate = null;
		this.liveAnnouncement = "";
		this.focusedMonth = null;
		this.focusedYear = null;
		this.daySlotNames = [];
		this.handlePrevious = () => {
			if (this.view === "days") {
				this.viewAnchor = addMonths(this.viewAnchor, -this.pageStep);
				return;
			}
			if (this.view === "months") {
				this.viewAnchor = addYears(this.viewAnchor, -1);
				return;
			}
			this.viewAnchor = addYears(this.viewAnchor, -12);
		};
		this.handleNext = () => {
			if (this.view === "days") {
				this.viewAnchor = addMonths(this.viewAnchor, this.pageStep);
				return;
			}
			if (this.view === "months") {
				this.viewAnchor = addYears(this.viewAnchor, 1);
				return;
			}
			this.viewAnchor = addYears(this.viewAnchor, 12);
		};
		this.handleTitleClick = () => {
			if (this.disabled) return;
			if (this.view === "days") {
				this.setView("months");
				this.focusedMonth = this.resolvedFocusedDate.getMonth();
				return;
			}
			if (this.view === "months") {
				this.setView("years");
				this.focusedYear = this.resolvedFocusedDate.getFullYear();
			}
		};
		this.handleGridMouseLeave = () => {
			this.hoverDate = null;
		};
	}
	static {
		this.styles = pkCalendarStyles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.syncViewAnchor();
		this.syncCustomStates();
		this.updateDaySlots();
		this.childrenObserver = new MutationObserver(() => this.updateDaySlots());
		this.childrenObserver.observe(this, {
			childList: true,
			attributes: true,
			attributeFilter: ["slot"]
		});
	}
	disconnectedCallback() {
		this.childrenObserver?.disconnect();
		super.disconnectedCallback();
	}
	willUpdate(changed) {
		if (changed.has("value") || changed.has("focusedDate") || changed.has("mode")) this.syncViewAnchor();
		if (changed.has("disabled") || changed.has("readonly") || changed.has("mode") || changed.has("withWeekNumbers")) this.syncCustomStates();
		if (changed.has("view")) this.emitViewChange();
		super.willUpdate(changed);
	}
	updateDaySlots() {
		const names = [...this.children].map((child) => child.getAttribute("slot")).filter((name) => Boolean(name?.startsWith("day-")));
		if (names.join(",") !== this.daySlotNames.join(",")) this.daySlotNames = names;
	}
	syncCustomStates() {
		this.toggleAttribute("data-range", this.mode === "range");
		this.toggleAttribute("data-multiple", this.mode === "multiple");
		this.toggleAttribute("data-week-numbers", this.withWeekNumbers);
	}
	get resolvedLocale() {
		return this.locale || this.lang || document.documentElement.lang || "en";
	}
	get resolvedToday() {
		return parseIsoDate(this.today) ?? todayDate();
	}
	/** Representative selected date used to anchor the view/focus across all modes. */
	get primarySelectedDate() {
		if (this.mode === "single") return parseIsoDate(this.value);
		if (this.mode === "multiple") return parseDateList(this.value)[0] ?? null;
		return parseRange(this.value).from;
	}
	get resolvedFocusedDate() {
		return parseIsoDate(this.focusedDate) ?? coerceToDate(this.primarySelectedDate) ?? this.resolvedToday;
	}
	get isDisabledMatcher() {
		return buildDisabledMatcher({
			min: parseIsoDate(this.min),
			max: parseIsoDate(this.max),
			disabledDates: parseDisabledDates(this.disabledDatesRaw),
			disabledDaysOfWeek: parseDaysOfWeek(this.disabledDaysOfWeek),
			disablePast: this.disablePast,
			disableFuture: this.disableFuture,
			today: this.resolvedToday,
			isDateDisabled: this.isDateDisabled
		});
	}
	get weekendDays() {
		return new Set(intlWeekendToJsDays(getWeekInfo(this.resolvedLocale).weekend));
	}
	get pageStep() {
		return this.pageBy === "single" ? 1 : this.months;
	}
	get visibleMonthAnchors() {
		const anchors = [this.viewAnchor];
		if (this.months === 2) anchors.push(startOfMonth(addMonths(this.viewAnchor, 1)));
		return anchors;
	}
	syncViewAnchor() {
		const focus = this.resolvedFocusedDate;
		if (!this.visibleMonthAnchors.some((anchor) => isSameMonth(focus, anchor))) this.viewAnchor = startOfMonth(focus);
	}
	get valueAsDate() {
		return this.mode === "single" ? parseIsoDate(this.value) : null;
	}
	get valueAsRange() {
		return parseRange(this.value);
	}
	/** Sorted, deduped selection for `multiple` mode (empty otherwise). */
	get valueAsDates() {
		return this.mode === "multiple" ? parseDateList(this.value) : [];
	}
	focus(options) {
		const selector = this.view === "days" ? ".day.is-roving" : this.view === "months" ? ".view-item.is-roving" : ".view-item.is-roving";
		this.renderRoot.querySelector(selector)?.focus(options);
	}
	goToDate(date) {
		const parsed = coerceToDate(date);
		if (!parsed) return;
		this.viewAnchor = startOfMonth(parsed);
		this.focusedDate = formatIsoDate(parsed);
		this.view = "days";
	}
	goToToday() {
		this.goToDate(this.resolvedToday);
	}
	clear() {
		if (this.disabled || this.readonly) return;
		this.value = "";
		this.rangeAnchor = null;
		this.hoverDate = null;
		this.emitInput();
		this.emitChange();
	}
	emitInput() {
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
	}
	emitChange() {
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	emitFocusDay(date) {
		this.dispatchEvent(new CustomEvent("pk-focus-day", {
			detail: { date },
			bubbles: true,
			composed: true
		}));
	}
	emitViewChange() {
		this.dispatchEvent(new CustomEvent("pk-view-change", {
			detail: {
				view: this.view,
				date: this.resolvedFocusedDate
			},
			bubbles: true,
			composed: true
		}));
	}
	announce(message) {
		this.liveAnnouncement = `${message}\u200B`;
	}
	setView(next) {
		if (this.view === next) return;
		this.view = next;
	}
	handleDayClick(date, disabled) {
		if (this.disabled || this.readonly || disabled) return;
		if (this.mode === "single") {
			this.value = formatIsoDate(date);
			this.focusedDate = formatIsoDate(date);
			this.emitInput();
			this.emitChange();
			this.announce(formatDisplayDate(date, this.resolvedLocale));
			return;
		}
		if (this.mode === "multiple") {
			const wasSelected = parseDateList(this.value).some((entry) => isSameDay(entry, date));
			this.value = toggleDateInList(this.value, date);
			this.focusedDate = formatIsoDate(date);
			this.emitInput();
			this.emitChange();
			this.announce(`${wasSelected ? "Removed" : "Added"} ${formatDisplayDate(date, this.resolvedLocale)}`);
			return;
		}
		if (!this.rangeAnchor) {
			this.rangeAnchor = date;
			this.value = formatIsoDate(date);
			this.focusedDate = formatIsoDate(date);
			this.emitInput();
			return;
		}
		const from = this.rangeAnchor;
		const to = date;
		const ordered = from.getTime() <= to.getTime() ? {
			from,
			to
		} : {
			from: to,
			to: from
		};
		if (this.minRange > 0 && diffDays(ordered.to, ordered.from) + 1 < this.minRange) {
			this.announce(`Range must be at least ${this.minRange} days`);
			return;
		}
		if (this.maxRange > 0 && diffDays(ordered.to, ordered.from) + 1 > this.maxRange) {
			this.announce(`Range must be at most ${this.maxRange} days`);
			return;
		}
		this.value = formatRange(ordered);
		this.focusedDate = formatIsoDate(date);
		this.rangeAnchor = null;
		this.hoverDate = null;
		this.emitInput();
		this.emitChange();
		this.announce(`${formatDisplayDate(ordered.from, this.resolvedLocale)} – ${formatDisplayDate(ordered.to, this.resolvedLocale)}`);
	}
	handleDayHover(date) {
		if (this.mode !== "range" || !this.rangeAnchor) return;
		this.hoverDate = date;
		this.emitFocusDay(date);
	}
	handleMonthPick(monthIndex) {
		if (this.disabled || this.readonly) return;
		const next = new Date(this.viewAnchor.getFullYear(), monthIndex, 1);
		if (this.isMonthFullyDisabled(next)) return;
		this.viewAnchor = next;
		this.focusedDate = formatIsoDate(next);
		this.setView("days");
	}
	handleYearPick(year) {
		if (this.disabled || this.readonly) return;
		const next = new Date(year, this.viewAnchor.getMonth(), 1);
		if (this.isYearFullyDisabled(year)) return;
		this.viewAnchor = next;
		this.focusedDate = formatIsoDate(next);
		this.setView("months");
		this.focusedMonth = next.getMonth();
	}
	handleDayKeyDown(event, date, disabled) {
		if (disabled) return;
		let next = null;
		switch (event.key) {
			case "ArrowLeft":
				next = addDays(date, -1);
				break;
			case "ArrowRight":
				next = addDays(date, 1);
				break;
			case "ArrowUp":
				next = addDays(date, -7);
				break;
			case "ArrowDown":
				next = addDays(date, 7);
				break;
			case "PageUp":
				next = addMonths(date, -1);
				break;
			case "PageDown":
				next = addMonths(date, 1);
				break;
			case "Home":
				next = startOfMonth(date);
				break;
			case "End":
				next = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				this.handleDayClick(date, disabled);
				return;
			case "Escape":
				if (this.rangeAnchor) {
					event.preventDefault();
					this.rangeAnchor = null;
					this.hoverDate = null;
					this.requestUpdate();
				}
				return;
			default: return;
		}
		event.preventDefault();
		if (!next) return;
		this.focusedDate = formatIsoDate(next);
		if (!this.visibleMonthAnchors.some((anchor) => isSameMonth(next, anchor))) this.viewAnchor = startOfMonth(next);
		this.emitFocusDay(next);
		this.requestUpdate();
		queueMicrotask(() => this.focus());
	}
	isMonthFullyDisabled(monthStart) {
		return allDisabledInRange(monthStart, new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0), this.isDisabledMatcher);
	}
	isYearFullyDisabled(year) {
		return allDisabledInRange(new Date(year, 0, 1), new Date(year, 11, 31), this.isDisabledMatcher);
	}
	formatWeekdayLabel(date) {
		if (this.weekdayFormat === "narrow") return new Intl.DateTimeFormat(this.resolvedLocale, { weekday: "short" }).format(date).slice(0, 2);
		return new Intl.DateTimeFormat(this.resolvedLocale, { weekday: this.weekdayFormat }).format(date);
	}
	buildWeekdayLabels() {
		const firstDay = resolveFirstDayOfWeek(this.firstDayOfWeek, this.resolvedLocale);
		const labels = [];
		for (let index = 0; index < 7; index += 1) {
			const day = (firstDay + index) % 7;
			const date = new Date(2024, 0, day === 0 ? 7 : day);
			labels.push(this.formatWeekdayLabel(date));
		}
		return labels;
	}
	buildMonthDays(monthAnchor) {
		const firstDay = resolveFirstDayOfWeek(this.firstDayOfWeek, this.resolvedLocale);
		const monthStart = startOfMonth(monthAnchor);
		const gridStart = addDays(monthStart, -((monthStart.getDay() - firstDay + 7) % 7));
		const days = [];
		for (let index = 0; index < 42; index += 1) days.push(addDays(gridStart, index));
		return days;
	}
	computeDayState(date, monthAnchor) {
		const isDisabled = this.isDisabledMatcher(date);
		const range = parseRange(this.value);
		const selectedSingle = this.mode === "single" && isSameDay(parseIsoDate(this.value), date);
		const selectedMultiple = this.mode === "multiple" && parseDateList(this.value).some((entry) => isSameDay(entry, date));
		const rangeStart = this.mode === "range" && isSameDay(range.from, date);
		const rangeEnd = this.mode === "range" && isSameDay(range.to, date);
		const rangeInner = this.mode === "range" && range.from && range.to && date.getTime() > range.from.getTime() && date.getTime() < range.to.getTime();
		let rangePreview = false;
		if (this.mode === "range" && this.rangeAnchor && this.hoverDate) {
			const anchor = this.rangeAnchor;
			const hover = this.hoverDate;
			const start = anchor.getTime() <= hover.getTime() ? anchor : hover;
			const end = anchor.getTime() <= hover.getTime() ? hover : anchor;
			rangePreview = date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
		}
		return {
			date,
			monthAnchor,
			outside: !isSameMonth(date, monthAnchor),
			today: isSameDay(date, this.resolvedToday),
			weekend: this.weekendDays.has(date.getDay()),
			disabled: isDisabled,
			selected: selectedSingle || selectedMultiple || rangeStart || rangeEnd,
			rangeStart,
			rangeEnd,
			rangeInner: Boolean(rangeInner),
			rangePreview,
			roving: isSameDay(date, this.resolvedFocusedDate)
		};
	}
	renderDayContent(state) {
		const slotName = `day-${formatIsoDate(state.date)}`;
		if (this.daySlotNames.includes(slotName)) return b`<slot name=${slotName}></slot>`;
		const custom = this.dayContent?.(state.date);
		if (custom) return o(custom);
		return b`<span part="day-label">${state.date.getDate()}</span>`;
	}
	renderDay(state) {
		if (!this.withOutsideDays && state.outside) return b`<span part="day-placeholder" class="day is-placeholder" aria-hidden="true"></span>`;
		const label = formatDisplayDate(state.date, this.resolvedLocale);
		return b`
            <button
                type="button"
                part="day"
                class=${e({
			day: true,
			"is-outside": state.outside,
			"is-today": state.today,
			"is-weekend": state.weekend,
			"is-disabled": state.disabled,
			"is-selected": state.selected,
			"is-range-start": state.rangeStart,
			"is-range-end": state.rangeEnd,
			"is-range-inner": state.rangeInner,
			"is-range-preview": state.rangePreview,
			"is-roving": state.roving
		})}
                tabindex=${state.roving ? "0" : "-1"}
                ?disabled=${state.disabled}
                aria-label=${label}
                aria-selected=${state.selected ? "true" : "false"}
                aria-current=${state.today ? "date" : A}
                @click=${() => this.handleDayClick(state.date, state.disabled)}
                @mouseenter=${() => this.handleDayHover(state.date)}
                @keydown=${(event) => this.handleDayKeyDown(event, state.date, state.disabled)}
            >
                ${this.renderDayContent(state)}
            </button>
        `;
	}
	getMonthWeeks(monthAnchor) {
		const days = this.buildMonthDays(monthAnchor);
		const weeks = [];
		for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7));
		if (this.withOutsideDays) return weeks;
		return weeks.filter((week) => week.some((date) => isSameMonth(date, monthAnchor)));
	}
	renderMonth(monthAnchor, showLabel = false) {
		const weekdays = this.buildWeekdayLabels();
		const title = new Intl.DateTimeFormat(this.resolvedLocale, {
			month: "long",
			year: "numeric"
		}).format(monthAnchor);
		const weeks = this.getMonthWeeks(monthAnchor);
		return b`
            <div part="month" class="month">
                ${showLabel ? b`<div part="month-label" class="month-label">${title}</div>` : A}
                <div part="weekdays" class="weekdays" role="row">
                    ${this.withWeekNumbers ? b`<span part="weeknumbers" class="weeknumber-header" role="columnheader">#</span>` : A}
                    ${weekdays.map((weekday) => b`
                        <span part="weekday" class="weekday" role="columnheader">${weekday}</span>
                    `)}
                </div>
                <div
                    part="grid"
                    class="grid"
                    role="grid"
                    aria-label=${title}
                    @mouseleave=${this.handleGridMouseLeave}
                >
                    ${weeks.map((week) => b`
                        <div part="week" class="week" role="row">
                            ${this.withWeekNumbers ? b`<span part="weeknumber" class="weeknumber" role="gridcell">${isoWeekNumber(week[0])}</span>` : A}
                            ${week.map((date) => this.renderDay(this.computeDayState(date, monthAnchor)))}
                        </div>
                    `)}
                </div>
            </div>
        `;
	}
	renderViewRows(items) {
		const rows = [];
		for (let index = 0; index < items.length; index += 3) rows.push(b`
                <div part="view-row" class="view-row" role="row">
                    ${items.slice(index, index + 3)}
                </div>
            `);
		return rows;
	}
	renderMonthsView() {
		const year = this.viewAnchor.getFullYear();
		const formatter = new Intl.DateTimeFormat(this.resolvedLocale, { month: "long" });
		const selectedMonth = this.primarySelectedDate?.getMonth();
		const rovingMonth = this.focusedMonth ?? this.resolvedFocusedDate.getMonth();
		const items = [];
		for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
			const monthStart = new Date(year, monthIndex, 1);
			const disabled = this.isMonthFullyDisabled(monthStart);
			const selected = selectedMonth === monthIndex;
			const todayMonth = this.resolvedToday.getFullYear() === year && this.resolvedToday.getMonth() === monthIndex;
			const roving = rovingMonth === monthIndex;
			items.push(b`
                <div part="view-cell" class="view-cell" role="gridcell">
                    <button
                        type="button"
                        part="view-item ${todayMonth ? "view-item-today" : ""} ${selected ? "view-item-selected" : ""} ${disabled ? "view-item-disabled" : ""}"
                        class=${e({
				"view-item": true,
				"is-today": todayMonth,
				"is-selected": selected,
				"is-disabled": disabled,
				"is-roving": roving
			})}
                        tabindex=${roving ? "0" : "-1"}
                        ?disabled=${disabled}
                        @click=${() => this.handleMonthPick(monthIndex)}
                    >
                        ${formatter.format(monthStart)}
                    </button>
                </div>
            `);
		}
		return b`
            <div part="view-grid" class="view-grid" role="grid">
                ${this.renderViewRows(items)}
            </div>
        `;
	}
	renderYearsView() {
		const centerYear = this.viewAnchor.getFullYear();
		const decadeStart = Math.floor(centerYear / 12) * 12;
		const selectedYear = this.primarySelectedDate?.getFullYear();
		const rovingYear = this.focusedYear ?? this.resolvedFocusedDate.getFullYear();
		const items = [];
		for (let offset = 0; offset < 12; offset += 1) {
			const year = decadeStart + offset;
			const disabled = this.isYearFullyDisabled(year);
			const selected = selectedYear === year;
			const todayYear = this.resolvedToday.getFullYear() === year;
			const roving = rovingYear === year;
			items.push(b`
                <div part="view-cell" class="view-cell" role="gridcell">
                    <button
                        type="button"
                        part="view-item ${todayYear ? "view-item-today" : ""} ${selected ? "view-item-selected" : ""} ${disabled ? "view-item-disabled" : ""}"
                        class=${e({
				"view-item": true,
				"is-today": todayYear,
				"is-selected": selected,
				"is-disabled": disabled,
				"is-roving": roving
			})}
                        tabindex=${roving ? "0" : "-1"}
                        ?disabled=${disabled}
                        @click=${() => this.handleYearPick(year)}
                    >
                        ${year}
                    </button>
                </div>
            `);
		}
		return b`
            <div part="view-grid" class="view-grid" role="grid">
                ${this.renderViewRows(items)}
            </div>
        `;
	}
	renderHeaderTitle() {
		if (this.view === "months") return String(this.viewAnchor.getFullYear());
		if (this.view === "years") {
			const centerYear = this.viewAnchor.getFullYear();
			const decadeStart = Math.floor(centerYear / 12) * 12;
			return `${decadeStart} – ${decadeStart + 11}`;
		}
		if (this.months === 2) return `${new Intl.DateTimeFormat(this.resolvedLocale, {
			month: "long",
			year: "numeric"
		}).format(this.viewAnchor)} – ${new Intl.DateTimeFormat(this.resolvedLocale, {
			month: "long",
			year: "numeric"
		}).format(addMonths(this.viewAnchor, 1))}`;
		return new Intl.DateTimeFormat(this.resolvedLocale, {
			month: "long",
			year: "numeric"
		}).format(this.viewAnchor);
	}
	render() {
		const showDualLabels = this.view === "days" && this.months === 2;
		return b`
            <div part="base" class="base">
                <div part="header" class="header">
                    <button
                        type="button"
                        part="previous"
                        class="nav-button"
                        aria-label="Previous"
                        ?disabled=${this.disabled}
                        @click=${this.handlePrevious}
                    >
                        <slot name="previous-icon">
                            <span class="icon" aria-hidden="true">${o$1(CHEVRON_LEFT)}</span>
                        </slot>
                    </button>
                    <button
                        type="button"
                        part="title"
                        class="title"
                        ?disabled=${this.disabled}
                        @click=${this.view === "years" ? void 0 : this.handleTitleClick}
                    >
                        ${this.renderHeaderTitle()}
                    </button>
                    <button
                        type="button"
                        part="next"
                        class="nav-button"
                        aria-label="Next"
                        ?disabled=${this.disabled}
                        @click=${this.handleNext}
                    >
                        <slot name="next-icon">
                            <span class="icon" aria-hidden="true">${o$1(CHEVRON_RIGHT)}</span>
                        </slot>
                    </button>
                </div>

                <div part="months" class="months">
                    ${this.view === "days" ? this.visibleMonthAnchors.map((anchor) => this.renderMonth(anchor, showDualLabels)) : this.view === "months" ? this.renderMonthsView() : this.renderYearsView()}
                </div>

                ${this.hasSlotController.test("footer") ? b`<div part="footer"><slot name="footer"></slot></div>` : A}

                <div class="live-region" aria-live="polite" aria-atomic="true">
                    ${this.liveAnnouncement}
                </div>
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkCalendar.prototype, "mode", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "value", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "min", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "max", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "today", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "view", void 0);
__decorate([n({
	type: Number,
	reflect: true
})], PkCalendar.prototype, "months", void 0);
__decorate([n({
	attribute: "page-by",
	reflect: true
})], PkCalendar.prototype, "pageBy", void 0);
__decorate([n({
	attribute: "focused-date",
	reflect: true
})], PkCalendar.prototype, "focusedDate", void 0);
__decorate([n({
	attribute: "first-day-of-week",
	reflect: true
})], PkCalendar.prototype, "firstDayOfWeek", void 0);
__decorate([n({
	attribute: "with-outside-days",
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "withOutsideDays", void 0);
__decorate([n({
	attribute: "with-week-numbers",
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "withWeekNumbers", void 0);
__decorate([n({
	attribute: "weekday-format",
	reflect: true
})], PkCalendar.prototype, "weekdayFormat", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "disabled", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "bordered", void 0);
__decorate([n({ attribute: "disabled-dates" })], PkCalendar.prototype, "disabledDatesRaw", void 0);
__decorate([n({
	attribute: "disabled-days-of-week",
	reflect: true
})], PkCalendar.prototype, "disabledDaysOfWeek", void 0);
__decorate([n({
	attribute: "disable-past",
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "disablePast", void 0);
__decorate([n({
	attribute: "disable-future",
	type: Boolean,
	reflect: true
})], PkCalendar.prototype, "disableFuture", void 0);
__decorate([n({
	attribute: "min-range",
	type: Number
})], PkCalendar.prototype, "minRange", void 0);
__decorate([n({
	attribute: "max-range",
	type: Number
})], PkCalendar.prototype, "maxRange", void 0);
__decorate([n({ reflect: true })], PkCalendar.prototype, "locale", void 0);
__decorate([n({ attribute: false })], PkCalendar.prototype, "isDateDisabled", void 0);
__decorate([n({ attribute: false })], PkCalendar.prototype, "dayContent", void 0);
__decorate([r()], PkCalendar.prototype, "viewAnchor", void 0);
__decorate([r()], PkCalendar.prototype, "rangeAnchor", void 0);
__decorate([r()], PkCalendar.prototype, "hoverDate", void 0);
__decorate([r()], PkCalendar.prototype, "liveAnnouncement", void 0);
__decorate([r()], PkCalendar.prototype, "focusedMonth", void 0);
__decorate([r()], PkCalendar.prototype, "focusedYear", void 0);
__decorate([r()], PkCalendar.prototype, "daySlotNames", void 0);
PkCalendar = __decorate([t("pk-calendar")], PkCalendar);
//#endregion
export { parseIsoDate as a, parseDateList as i, coerceToDate as n, parseRange as o, formatIsoDate as r, PkCalendar as t };
