import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { PropertyValues } from 'lit';

import { chevronLeft, chevronRight, renderIconHtml } from '../../icons/index.js';
import { PkElement } from '../../base/pk-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import {
    addDays,
    addMonths,
    addYears,
    coerceToDate,
    diffDays,
    formatDisplayDate,
    formatIsoDate,
    formatRange,
    isoWeekNumber,
    isSameDay,
    isSameMonth,
    parseDateList,
    parseIsoDate,
    parseRange,
    startOfMonth,
    todayDate,
    toggleDateInList,
    type DateRange,
} from '../../utils/date.js';
import {
    allDisabledInRange,
    buildDisabledMatcher,
    parseDaysOfWeek,
    parseDisabledDates,
} from '../../utils/date-matchers.js';
import {
    getWeekInfo,
    intlWeekendToJsDays,
    resolveFirstDayOfWeek,
    type WeekdayName,
} from '../../utils/week-info.js';
import { pkCalendarStyles } from './pk-calendar.styles.js';

export type PkCalendarMode = 'single' | 'range' | 'multiple';
export type PkCalendarSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkCalendarFirstDayOfWeek = 'auto' | WeekdayName;
export type PkCalendarView = 'days' | 'months' | 'years';
export type PkCalendarPageBy = 'months' | 'single';
export type PkCalendarDayContent = (date: Date) => string | null;

const CHEVRON_LEFT = renderIconHtml(chevronLeft);
const CHEVRON_RIGHT = renderIconHtml(chevronRight);

type DayState = {
    date: Date;
    monthAnchor: Date;
    outside: boolean;
    today: boolean;
    weekend: boolean;
    disabled: boolean;
    selected: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    rangeInner: boolean;
    rangePreview: boolean;
    roving: boolean;
};

/**
 * Inline calendar grid — mirrors React `Calendar` ( `pk-date-picker` API).
 *
 * @slot previous-icon
 * @slot next-icon
 * @slot footer
 * @slot day-YYYY-MM-DD - Custom content for a specific day cell
 *
 * @event input - Value changes during interaction
 * @event change - User commits a new value
 * @event pk-focus-day - Focused day changed; `detail.date`
 * @event pk-view-change - View changed; `detail.view`, `detail.date`
 */
@customElement('pk-calendar')
export class PkCalendar extends PkElement {
    static override styles = pkCalendarStyles;

    private readonly hasSlotController = new HasSlotController(this, 'footer', 'previous-icon', 'next-icon');

    @property({ reflect: true })
    mode: PkCalendarMode = 'single';

    @property({ reflect: true })
    size: PkCalendarSize = 'default';

    @property({ reflect: true })
    value = '';

    @property({ reflect: true })
    min = '';

    @property({ reflect: true })
    max = '';

    @property({ reflect: true })
    today = '';

    @property({ reflect: true })
    view: PkCalendarView = 'days';

    @property({ type: Number, reflect: true })
    months: 1 | 2 = 1;

    @property({ attribute: 'page-by', reflect: true })
    pageBy: PkCalendarPageBy = 'months';

    @property({ attribute: 'focused-date', reflect: true })
    focusedDate = '';

    @property({ attribute: 'first-day-of-week', reflect: true })
    firstDayOfWeek: PkCalendarFirstDayOfWeek = 'auto';

    @property({ attribute: 'with-outside-days', type: Boolean, reflect: true })
    withOutsideDays = true;

    @property({ attribute: 'with-week-numbers', type: Boolean, reflect: true })
    withWeekNumbers = false;

    @property({ attribute: 'weekday-format', reflect: true })
    weekdayFormat: 'narrow' | 'short' | 'long' = 'narrow';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    /** When false, omits the outer frame — use inside popovers (e.g. `pk-date-picker`). */
    @property({ type: Boolean, reflect: true })
    bordered = true;

    @property({ attribute: 'disabled-dates' })
    disabledDatesRaw = '';

    @property({ attribute: 'disabled-days-of-week', reflect: true })
    disabledDaysOfWeek = '';

    @property({ attribute: 'disable-past', type: Boolean, reflect: true })
    disablePast = false;

    @property({ attribute: 'disable-future', type: Boolean, reflect: true })
    disableFuture = false;

    @property({ attribute: 'min-range', type: Number })
    minRange = 0;

    @property({ attribute: 'max-range', type: Number })
    maxRange = 0;

    @property({ reflect: true })
    locale = '';

    @property({ attribute: false })
    isDateDisabled?: (date: Date) => boolean;

    @property({ attribute: false })
    dayContent?: PkCalendarDayContent;

    @state()
    private viewAnchor = startOfMonth(todayDate());

    @state()
    private rangeAnchor: Date | null = null;

    @state()
    private hoverDate: Date | null = null;

    @state()
    private liveAnnouncement = '';

    @state()
    private focusedMonth: number | null = null;

    @state()
    private focusedYear: number | null = null;

    @state()
    private daySlotNames: string[] = [];

    private childrenObserver?: MutationObserver;

    override connectedCallback(): void {
        super.connectedCallback();
        this.syncViewAnchor();
        this.syncCustomStates();
        this.updateDaySlots();
        this.childrenObserver = new MutationObserver(() => this.updateDaySlots());
        this.childrenObserver.observe(this, { childList: true, attributes: true, attributeFilter: ['slot'] });
    }

    override disconnectedCallback(): void {
        this.childrenObserver?.disconnect();
        super.disconnectedCallback();
    }

    protected override willUpdate(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('focusedDate') || changed.has('mode')) {
            this.syncViewAnchor();
        }

        if (changed.has('disabled') || changed.has('readonly') || changed.has('mode') || changed.has('withWeekNumbers')) {
            this.syncCustomStates();
        }

        if (changed.has('view')) {
            this.emitViewChange();
        }

        super.willUpdate(changed);
    }

    private updateDaySlots(): void {
        const names = [...this.children]
            .map((child) => child.getAttribute('slot'))
            .filter((name): name is string => Boolean(name?.startsWith('day-')));

        if (names.join(',') !== this.daySlotNames.join(',')) {
            this.daySlotNames = names;
        }
    }

    private syncCustomStates(): void {
        this.toggleAttribute('data-range', this.mode === 'range');
        this.toggleAttribute('data-multiple', this.mode === 'multiple');
        this.toggleAttribute('data-week-numbers', this.withWeekNumbers);
    }

    private get resolvedLocale(): string {
        return this.locale || this.lang || document.documentElement.lang || 'en';
    }

    private get resolvedToday(): Date {
        return parseIsoDate(this.today) ?? todayDate();
    }

    /** Representative selected date used to anchor the view/focus across all modes. */
    private get primarySelectedDate(): Date | null {
        if (this.mode === 'single') {
            return parseIsoDate(this.value);
        }

        if (this.mode === 'multiple') {
            return parseDateList(this.value)[0] ?? null;
        }

        return parseRange(this.value).from;
    }

    private get resolvedFocusedDate(): Date {
        return parseIsoDate(this.focusedDate)
            ?? coerceToDate(this.primarySelectedDate)
            ?? this.resolvedToday;
    }

    private get isDisabledMatcher(): (date: Date) => boolean {
        return buildDisabledMatcher({
            min: parseIsoDate(this.min),
            max: parseIsoDate(this.max),
            disabledDates: parseDisabledDates(this.disabledDatesRaw),
            disabledDaysOfWeek: parseDaysOfWeek(this.disabledDaysOfWeek),
            disablePast: this.disablePast,
            disableFuture: this.disableFuture,
            today: this.resolvedToday,
            isDateDisabled: this.isDateDisabled,
        });
    }

    private get weekendDays(): Set<number> {
        return new Set(intlWeekendToJsDays(getWeekInfo(this.resolvedLocale).weekend));
    }

    private get pageStep(): number {
        return this.pageBy === 'single' ? 1 : this.months;
    }

    private get visibleMonthAnchors(): Date[] {
        const anchors = [this.viewAnchor];

        if (this.months === 2) {
            anchors.push(startOfMonth(addMonths(this.viewAnchor, 1)));
        }

        return anchors;
    }

    private syncViewAnchor(): void {
        const focus = this.resolvedFocusedDate;

        if (!this.visibleMonthAnchors.some((anchor) => isSameMonth(focus, anchor))) {
            this.viewAnchor = startOfMonth(focus);
        }
    }

    get valueAsDate(): Date | null {
        return this.mode === 'single' ? parseIsoDate(this.value) : null;
    }

    get valueAsRange(): DateRange {
        return parseRange(this.value);
    }

    /** Sorted, deduped selection for `multiple` mode (empty otherwise). */
    get valueAsDates(): Date[] {
        return this.mode === 'multiple' ? parseDateList(this.value) : [];
    }

    focus(options?: FocusOptions): void {
        const selector = this.view === 'days'
            ? '.day.is-roving'
            : this.view === 'months'
                ? '.view-item.is-roving'
                : '.view-item.is-roving';

        this.renderRoot.querySelector<HTMLButtonElement>(selector)?.focus(options);
    }

    goToDate(date: string | Date): void {
        const parsed = coerceToDate(date);

        if (!parsed) {
            return;
        }

        this.viewAnchor = startOfMonth(parsed);
        this.focusedDate = formatIsoDate(parsed);
        this.view = 'days';
    }

    goToToday(): void {
        this.goToDate(this.resolvedToday);
    }

    clear(): void {
        if (this.disabled || this.readonly) {
            return;
        }

        this.value = '';
        this.rangeAnchor = null;
        this.hoverDate = null;
        this.emitInput();
        this.emitChange();
    }

    private emitInput(): void {
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    private emitChange(): void {
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private emitFocusDay(date: Date): void {
        this.dispatchEvent(new CustomEvent('pk-focus-day', {
            detail: { date },
            bubbles: true,
            composed: true,
        }));
    }

    private emitViewChange(): void {
        this.dispatchEvent(new CustomEvent('pk-view-change', {
            detail: { view: this.view, date: this.resolvedFocusedDate },
            bubbles: true,
            composed: true,
        }));
    }

    private announce(message: string): void {
        this.liveAnnouncement = `${message}\u200B`;
    }

    private setView(next: PkCalendarView): void {
        if (this.view === next) {
            return;
        }

        this.view = next;
    }

    private handlePrevious = (): void => {
        if (this.view === 'days') {
            this.viewAnchor = addMonths(this.viewAnchor, -this.pageStep);
            return;
        }

        if (this.view === 'months') {
            this.viewAnchor = addYears(this.viewAnchor, -1);
            return;
        }

        this.viewAnchor = addYears(this.viewAnchor, -12);
    };

    private handleNext = (): void => {
        if (this.view === 'days') {
            this.viewAnchor = addMonths(this.viewAnchor, this.pageStep);
            return;
        }

        if (this.view === 'months') {
            this.viewAnchor = addYears(this.viewAnchor, 1);
            return;
        }

        this.viewAnchor = addYears(this.viewAnchor, 12);
    };

    private handleTitleClick = (): void => {
        if (this.disabled) {
            return;
        }

        if (this.view === 'days') {
            this.setView('months');
            this.focusedMonth = this.resolvedFocusedDate.getMonth();
            return;
        }

        if (this.view === 'months') {
            this.setView('years');
            this.focusedYear = this.resolvedFocusedDate.getFullYear();
        }
    };

    private handleDayClick(date: Date, disabled: boolean): void {
        if (this.disabled || this.readonly || disabled) {
            return;
        }

        if (this.mode === 'single') {
            this.value = formatIsoDate(date);
            this.focusedDate = formatIsoDate(date);
            this.emitInput();
            this.emitChange();
            this.announce(formatDisplayDate(date, this.resolvedLocale));
            return;
        }

        if (this.mode === 'multiple') {
            // Each click toggles the day in/out of the set; the picker keeps the panel
            // open so several dates can be chosen before dismissing.
            const wasSelected = parseDateList(this.value).some((entry) => isSameDay(entry, date));
            this.value = toggleDateInList(this.value, date);
            this.focusedDate = formatIsoDate(date);
            this.emitInput();
            this.emitChange();
            this.announce(
                `${wasSelected ? 'Removed' : 'Added'} ${formatDisplayDate(date, this.resolvedLocale)}`,
            );
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
        const ordered = from.getTime() <= to.getTime()
            ? { from, to }
            : { from: to, to: from };

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

    private handleDayHover(date: Date): void {
        if (this.mode !== 'range' || !this.rangeAnchor) {
            return;
        }

        this.hoverDate = date;
        this.emitFocusDay(date);
    }

    private handleGridMouseLeave = (): void => {
        this.hoverDate = null;
    };

    private handleMonthPick(monthIndex: number): void {
        if (this.disabled || this.readonly) {
            return;
        }

        const next = new Date(this.viewAnchor.getFullYear(), monthIndex, 1);

        if (this.isMonthFullyDisabled(next)) {
            return;
        }

        this.viewAnchor = next;
        this.focusedDate = formatIsoDate(next);
        this.setView('days');
    }

    private handleYearPick(year: number): void {
        if (this.disabled || this.readonly) {
            return;
        }

        const next = new Date(year, this.viewAnchor.getMonth(), 1);

        if (this.isYearFullyDisabled(year)) {
            return;
        }

        this.viewAnchor = next;
        this.focusedDate = formatIsoDate(next);
        this.setView('months');
        this.focusedMonth = next.getMonth();
    }

    private handleDayKeyDown(event: KeyboardEvent, date: Date, disabled: boolean): void {
        if (disabled) {
            return;
        }

        let next: Date | null = null;

        switch (event.key) {
            case 'ArrowLeft':
                next = addDays(date, -1);
                break;
            case 'ArrowRight':
                next = addDays(date, 1);
                break;
            case 'ArrowUp':
                next = addDays(date, -7);
                break;
            case 'ArrowDown':
                next = addDays(date, 7);
                break;
            case 'PageUp':
                next = addMonths(date, -1);
                break;
            case 'PageDown':
                next = addMonths(date, 1);
                break;
            case 'Home':
                next = startOfMonth(date);
                break;
            case 'End':
                next = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                this.handleDayClick(date, disabled);
                return;
            case 'Escape':
                if (this.rangeAnchor) {
                    event.preventDefault();
                    this.rangeAnchor = null;
                    this.hoverDate = null;
                    this.requestUpdate();
                }

                return;
            default:
                return;
        }

        event.preventDefault();

        if (!next) {
            return;
        }

        this.focusedDate = formatIsoDate(next);

        if (!this.visibleMonthAnchors.some((anchor) => isSameMonth(next!, anchor))) {
            this.viewAnchor = startOfMonth(next);
        }

        this.emitFocusDay(next);
        this.requestUpdate();
        queueMicrotask(() => this.focus());
    }

    private isMonthFullyDisabled(monthStart: Date): boolean {
        const end = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
        return allDisabledInRange(monthStart, end, this.isDisabledMatcher);
    }

    private isYearFullyDisabled(year: number): boolean {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        return allDisabledInRange(start, end, this.isDisabledMatcher);
    }

    private formatWeekdayLabel(date: Date): string {
        if (this.weekdayFormat === 'narrow') {
            // Match react-day-picker cccccc — two-letter labels (Su, Mo, Tu…)
            const short = new Intl.DateTimeFormat(this.resolvedLocale, { weekday: 'short' }).format(date);
            return short.slice(0, 2);
        }

        return new Intl.DateTimeFormat(this.resolvedLocale, { weekday: this.weekdayFormat }).format(date);
    }

    private buildWeekdayLabels(): string[] {
        const firstDay = resolveFirstDayOfWeek(this.firstDayOfWeek, this.resolvedLocale);
        const labels: string[] = [];

        for (let index = 0; index < 7; index += 1) {
            const day = (firstDay + index) % 7;
            const date = new Date(2024, 0, day === 0 ? 7 : day);
            labels.push(this.formatWeekdayLabel(date));
        }

        return labels;
    }

    private buildMonthDays(monthAnchor: Date): Date[] {
        const firstDay = resolveFirstDayOfWeek(this.firstDayOfWeek, this.resolvedLocale);
        const monthStart = startOfMonth(monthAnchor);
        const offset = (monthStart.getDay() - firstDay + 7) % 7;
        const gridStart = addDays(monthStart, -offset);
        const days: Date[] = [];

        for (let index = 0; index < 42; index += 1) {
            days.push(addDays(gridStart, index));
        }

        return days;
    }

    private computeDayState(date: Date, monthAnchor: Date): DayState {
        const isDisabled = this.isDisabledMatcher(date);
        const range = parseRange(this.value);
        const selectedSingle = this.mode === 'single' && isSameDay(parseIsoDate(this.value), date);
        const selectedMultiple = this.mode === 'multiple'
            && parseDateList(this.value).some((entry) => isSameDay(entry, date));
        const rangeStart = this.mode === 'range' && isSameDay(range.from, date);
        const rangeEnd = this.mode === 'range' && isSameDay(range.to, date);
        const rangeInner = this.mode === 'range'
            && range.from
            && range.to
            && date.getTime() > range.from.getTime()
            && date.getTime() < range.to.getTime();

        let rangePreview = false;

        if (this.mode === 'range' && this.rangeAnchor && this.hoverDate) {
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
            roving: isSameDay(date, this.resolvedFocusedDate),
        };
    }

    private renderDayContent(state: DayState) {
        const slotName = `day-${formatIsoDate(state.date)}`;

        if (this.daySlotNames.includes(slotName)) {
            return html`<slot name=${slotName}></slot>`;
        }

        const custom = this.dayContent?.(state.date);

        if (custom) {
            return unsafeHTML(custom);
        }

        return html`<span part="day-label">${state.date.getDate()}</span>`;
    }

    private renderDay(state: DayState) {
        if (!this.withOutsideDays && state.outside) {
            return html`<span part="day-placeholder" class="day is-placeholder" aria-hidden="true"></span>`;
        }

        const label = formatDisplayDate(state.date, this.resolvedLocale);

        return html`
            <button
                type="button"
                part="day"
                class=${classMap({
                    day: true,
                    'is-outside': state.outside,
                    'is-today': state.today,
                    'is-weekend': state.weekend,
                    'is-disabled': state.disabled,
                    'is-selected': state.selected,
                    'is-range-start': state.rangeStart,
                    'is-range-end': state.rangeEnd,
                    'is-range-inner': state.rangeInner,
                    'is-range-preview': state.rangePreview,
                    'is-roving': state.roving,
                })}
                tabindex=${state.roving ? '0' : '-1'}
                ?disabled=${state.disabled}
                aria-label=${label}
                aria-selected=${state.selected ? 'true' : 'false'}
                aria-current=${state.today ? 'date' : nothing}
                @click=${() => this.handleDayClick(state.date, state.disabled)}
                @mouseenter=${() => this.handleDayHover(state.date)}
                @keydown=${(event: KeyboardEvent) => this.handleDayKeyDown(event, state.date, state.disabled)}
            >
                ${this.renderDayContent(state)}
            </button>
        `;
    }

    private getMonthWeeks(monthAnchor: Date): Date[][] {
        const days = this.buildMonthDays(monthAnchor);
        const weeks: Date[][] = [];

        for (let index = 0; index < days.length; index += 7) {
            weeks.push(days.slice(index, index + 7));
        }

        if (this.withOutsideDays) {
            return weeks;
        }

        return weeks.filter((week) => week.some((date) => isSameMonth(date, monthAnchor)));
    }

    private renderMonth(monthAnchor: Date, showLabel = false) {
        const weekdays = this.buildWeekdayLabels();
        const title = new Intl.DateTimeFormat(this.resolvedLocale, {
            month: 'long',
            year: 'numeric',
        }).format(monthAnchor);

        const weeks = this.getMonthWeeks(monthAnchor);

        return html`
            <div part="month" class="month">
                ${showLabel
                    ? html`<div part="month-label" class="month-label">${title}</div>`
                    : nothing}
                <div part="weekdays" class="weekdays" role="row">
                    ${this.withWeekNumbers
                        ? html`<span part="weeknumbers" class="weeknumber-header" role="columnheader">#</span>`
                        : nothing}
                    ${weekdays.map((weekday) => html`
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
                    ${weeks.map((week) => html`
                        <div part="week" class="week" role="row">
                            ${this.withWeekNumbers
                                ? html`<span part="weeknumber" class="weeknumber" role="gridcell">${isoWeekNumber(week[0])}</span>`
                                : nothing}
                            ${week.map((date) => this.renderDay(this.computeDayState(date, monthAnchor)))}
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    private renderViewRows(items: Array<ReturnType<typeof html>>) {
        const rows: Array<ReturnType<typeof html>> = [];

        for (let index = 0; index < items.length; index += 3) {
            rows.push(html`
                <div part="view-row" class="view-row" role="row">
                    ${items.slice(index, index + 3)}
                </div>
            `);
        }

        return rows;
    }

    private renderMonthsView() {
        const year = this.viewAnchor.getFullYear();
        const formatter = new Intl.DateTimeFormat(this.resolvedLocale, { month: 'long' });
        const selectedDate = this.primarySelectedDate;
        const selectedMonth = selectedDate?.getMonth();
        const rovingMonth = this.focusedMonth ?? this.resolvedFocusedDate.getMonth();
        const items = [];

        for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
            const monthStart = new Date(year, monthIndex, 1);
            const disabled = this.isMonthFullyDisabled(monthStart);
            const selected = selectedMonth === monthIndex;
            const todayMonth = this.resolvedToday.getFullYear() === year && this.resolvedToday.getMonth() === monthIndex;
            const roving = rovingMonth === monthIndex;

            items.push(html`
                <div part="view-cell" class="view-cell" role="gridcell">
                    <button
                        type="button"
                        part="view-item ${todayMonth ? 'view-item-today' : ''} ${selected ? 'view-item-selected' : ''} ${disabled ? 'view-item-disabled' : ''}"
                        class=${classMap({
                            'view-item': true,
                            'is-today': todayMonth,
                            'is-selected': selected,
                            'is-disabled': disabled,
                            'is-roving': roving,
                        })}
                        tabindex=${roving ? '0' : '-1'}
                        ?disabled=${disabled}
                        @click=${() => this.handleMonthPick(monthIndex)}
                    >
                        ${formatter.format(monthStart)}
                    </button>
                </div>
            `);
        }

        return html`
            <div part="view-grid" class="view-grid" role="grid">
                ${this.renderViewRows(items)}
            </div>
        `;
    }

    private renderYearsView() {
        const centerYear = this.viewAnchor.getFullYear();
        const decadeStart = Math.floor(centerYear / 12) * 12;
        const selectedDate = this.primarySelectedDate;
        const selectedYear = selectedDate?.getFullYear();
        const rovingYear = this.focusedYear ?? this.resolvedFocusedDate.getFullYear();
        const items = [];

        for (let offset = 0; offset < 12; offset += 1) {
            const year = decadeStart + offset;
            const disabled = this.isYearFullyDisabled(year);
            const selected = selectedYear === year;
            const todayYear = this.resolvedToday.getFullYear() === year;
            const roving = rovingYear === year;

            items.push(html`
                <div part="view-cell" class="view-cell" role="gridcell">
                    <button
                        type="button"
                        part="view-item ${todayYear ? 'view-item-today' : ''} ${selected ? 'view-item-selected' : ''} ${disabled ? 'view-item-disabled' : ''}"
                        class=${classMap({
                            'view-item': true,
                            'is-today': todayYear,
                            'is-selected': selected,
                            'is-disabled': disabled,
                            'is-roving': roving,
                        })}
                        tabindex=${roving ? '0' : '-1'}
                        ?disabled=${disabled}
                        @click=${() => this.handleYearPick(year)}
                    >
                        ${year}
                    </button>
                </div>
            `);
        }

        return html`
            <div part="view-grid" class="view-grid" role="grid">
                ${this.renderViewRows(items)}
            </div>
        `;
    }

    private renderHeaderTitle() {
        if (this.view === 'months') {
            return String(this.viewAnchor.getFullYear());
        }

        if (this.view === 'years') {
            const centerYear = this.viewAnchor.getFullYear();
            const decadeStart = Math.floor(centerYear / 12) * 12;
            return `${decadeStart} – ${decadeStart + 11}`;
        }

        if (this.months === 2) {
            const first = new Intl.DateTimeFormat(this.resolvedLocale, { month: 'long', year: 'numeric' }).format(this.viewAnchor);
            const second = new Intl.DateTimeFormat(this.resolvedLocale, { month: 'long', year: 'numeric' }).format(addMonths(this.viewAnchor, 1));
            return `${first} – ${second}`;
        }

        return new Intl.DateTimeFormat(this.resolvedLocale, {
            month: 'long',
            year: 'numeric',
        }).format(this.viewAnchor);
    }

    override render() {
        const showDualLabels = this.view === 'days' && this.months === 2;

        return html`
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
                            <span class="icon" aria-hidden="true">${unsafeSVG(CHEVRON_LEFT)}</span>
                        </slot>
                    </button>
                    <button
                        type="button"
                        part="title"
                        class="title"
                        ?disabled=${this.disabled}
                        @click=${this.view === 'years' ? undefined : this.handleTitleClick}
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
                            <span class="icon" aria-hidden="true">${unsafeSVG(CHEVRON_RIGHT)}</span>
                        </slot>
                    </button>
                </div>

                <div part="months" class="months">
                    ${this.view === 'days'
                        ? this.visibleMonthAnchors.map((anchor) => this.renderMonth(anchor, showDualLabels))
                        : this.view === 'months'
                            ? this.renderMonthsView()
                            : this.renderYearsView()}
                </div>

                ${this.hasSlotController.test('footer')
                    ? html`<div part="footer"><slot name="footer"></slot></div>`
                    : nothing}

                <div class="live-region" aria-live="polite" aria-atomic="true">
                    ${this.liveAnnouncement}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-calendar': PkCalendar;
    }
}
