import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { DateRange } from '../../utils/date.js';
import { WeekdayName } from '../../utils/week-info.js';
export type PkCalendarMode = 'single' | 'range';
export type PkCalendarSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkCalendarFirstDayOfWeek = 'auto' | WeekdayName;
export type PkCalendarView = 'days' | 'months' | 'years';
export type PkCalendarPageBy = 'months' | 'single';
export type PkCalendarDayContent = (date: Date) => string | null;
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
export declare class PkCalendar extends PkElement {
    static styles: import('lit').CSSResult;
    private readonly hasSlotController;
    mode: PkCalendarMode;
    size: PkCalendarSize;
    value: string;
    min: string;
    max: string;
    today: string;
    view: PkCalendarView;
    months: 1 | 2;
    pageBy: PkCalendarPageBy;
    focusedDate: string;
    firstDayOfWeek: PkCalendarFirstDayOfWeek;
    withOutsideDays: boolean;
    withWeekNumbers: boolean;
    weekdayFormat: 'narrow' | 'short' | 'long';
    disabled: boolean;
    readonly: boolean;
    /** When false, omits the outer frame — use inside popovers (e.g. `pk-date-picker`). */
    bordered: boolean;
    disabledDatesRaw: string;
    disabledDaysOfWeek: string;
    disablePast: boolean;
    disableFuture: boolean;
    minRange: number;
    maxRange: number;
    locale: string;
    isDateDisabled?: (date: Date) => boolean;
    dayContent?: PkCalendarDayContent;
    private viewAnchor;
    private rangeAnchor;
    private hoverDate;
    private liveAnnouncement;
    private focusedMonth;
    private focusedYear;
    private daySlotNames;
    private childrenObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    private updateDaySlots;
    private syncCustomStates;
    private get resolvedLocale();
    private get resolvedToday();
    private get resolvedFocusedDate();
    private get isDisabledMatcher();
    private get weekendDays();
    private get pageStep();
    private get visibleMonthAnchors();
    private syncViewAnchor;
    get valueAsDate(): Date | null;
    get valueAsRange(): DateRange;
    focus(options?: FocusOptions): void;
    goToDate(date: string | Date): void;
    goToToday(): void;
    clear(): void;
    private emitInput;
    private emitChange;
    private emitFocusDay;
    private emitViewChange;
    private announce;
    private setView;
    private handlePrevious;
    private handleNext;
    private handleTitleClick;
    private handleDayClick;
    private handleDayHover;
    private handleGridMouseLeave;
    private handleMonthPick;
    private handleYearPick;
    private handleDayKeyDown;
    private isMonthFullyDisabled;
    private isYearFullyDisabled;
    private formatWeekdayLabel;
    private buildWeekdayLabels;
    private buildMonthDays;
    private computeDayState;
    private renderDayContent;
    private renderDay;
    private getMonthWeeks;
    private renderMonth;
    private renderViewRows;
    private renderMonthsView;
    private renderYearsView;
    private renderHeaderTitle;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-calendar': PkCalendar;
    }
}
//# sourceMappingURL=pk-calendar.d.ts.map