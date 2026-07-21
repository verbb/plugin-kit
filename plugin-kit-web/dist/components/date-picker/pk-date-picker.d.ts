import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
import { PkCalendarDayContent } from '../calendar/pk-calendar.js';
export type PkDatePickerSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkDatePickerMode = 'single' | 'range' | 'multiple';
/**
 * Date picker — mirrors React `DatePicker` ( `pk-date-input` API).
 *
 * @slot label
 * @slot instructions
 * @slot hint
 * @slot start
 * @slot end
 * @slot clear-icon
 * @slot expand-icon
 * @slot footer
 *
 * @event input
 * @event change
 * @event pk-clear
 */
export declare class PkDatePicker extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly controlId;
    open: boolean;
    placement: PkPopupPlacement;
    sideOffset: number;
    size: PkDatePickerSize;
    mode: PkDatePickerMode;
    value: string | Date;
    defaultValue: string;
    label: string;
    instructions: string;
    placeholder: string;
    withClear: boolean;
    readonly: boolean;
    invalid: boolean;
    min: string;
    max: string;
    locale: string;
    disablePast: boolean;
    disableFuture: boolean;
    disabledDates: string;
    disabledDaysOfWeek: string;
    firstDayOfWeek: 'auto' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
    withOutsideDays: boolean;
    withWeekNumbers: boolean;
    weekdayFormat?: 'narrow' | 'short' | 'long';
    months: 1 | 2;
    pageBy: 'months' | 'single';
    minRange: number;
    maxRange: number;
    isDateDisabled?: (date: Date) => boolean;
    dayContent?: PkCalendarDayContent;
    withLabel: boolean;
    withInstructions: boolean;
    ariaLabel: string | null;
    /** When `full`, the control stretches to the host width. */
    width?: 'full';
    input: HTMLInputElement;
    private popupElement;
    private calendarElement?;
    private controlElement;
    private dismissRegistered;
    private daySlotNames;
    private childrenObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    private updateDaySlots;
    /**
     * `value` accepts a Date at the boundary (Formie/v1) but is normalized to an ISO
     * string in willUpdate. Coerce defensively so string-typed consumers (form value,
     * parseRange) never receive a Date if they read before the next update tick.
     */
    private get valueString();
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    private get resolvedLocale();
    private get displayText();
    get valueAsDate(): Date | null;
    get valueAsRange(): import('../../utils/date.js').DateRange;
    /** Sorted, deduped selection for `multiple` mode (empty otherwise). */
    get valueAsDates(): Date[];
    show(): Promise<void>;
    hide(): Promise<void>;
    clear(): void;
    private emitValueChange;
    private openPanel;
    private closePanel;
    private registerDismissHandlers;
    private unregisterDismissHandlers;
    private handleDocumentPointerDown;
    private isPointerInside;
    private handleDocumentKeyDown;
    private handleControlClick;
    private handleControlKeyDown;
    private handleClearClick;
    private handleCalendarChange;
    private handleCalendarInput;
    private renderClearButton;
    private renderCalendarIcon;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-date-picker': PkDatePicker;
    }
}
//# sourceMappingURL=pk-date-picker.d.ts.map