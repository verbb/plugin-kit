import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';

import { calendar, xmark, renderIconHtml } from '../../icons/index.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { uniqueId } from '../../a11y/focus.js';
import { PkClearEvent } from '../../events/pk-clear.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { readLegacyInstructions } from '../../internal/field-labels.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { PkPopup, type PkPopupPlacement } from '../popup/pk-popup.js';
import { PkCalendar, type PkCalendarDayContent } from '../calendar/pk-calendar.js';
import { coerceToDate, formatIsoDate, parseIsoDate, parseRange } from '../../utils/date.js';
import { formatHostDate, resolveHostLocale } from '../../utils/host-date.js';
import { waitForPopupReposition } from '../../utils/popup-placement-animation.js';
import { isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import { pkDatePickerStyles } from './pk-date-picker.styles.js';

export type PkDatePickerSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkDatePickerMode = 'single' | 'range';

const CALENDAR_ICON = renderIconHtml(calendar);
const CLEAR_ICON = renderIconHtml(xmark);

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
@customElement('pk-date-picker')
export class PkDatePicker extends PkFormAssociatedElement {
    static override styles = [formControlStyles, pkDatePickerStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator()];
    }

    override assumeInteractionOn = ['input'];

    private readonly hasSlotController = new HasSlotController(
        this,
        'label',
        'instructions',
        'hint',
        'start',
        'end',
        'footer',
    );

    private readonly controlId = uniqueId('pk-date-picker');

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom';

    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 4;

    @property({ reflect: true })
    size: PkDatePickerSize = 'default';

    @property({ reflect: true })
    mode: PkDatePickerMode = 'single';

    // Accept Date at the boundary (Formie/v1); willUpdate coerces to ISO string.
    @property()
    value: string | Date = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property()
    label = '';

    @property()
    instructions = '';

    @property()
    placeholder = '';

    @property({ attribute: 'with-clear', type: Boolean })
    withClear = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    min = '';

    @property({ reflect: true })
    max = '';

    @property({ reflect: true })
    locale = '';

    @property({ attribute: 'disable-past', type: Boolean, reflect: true })
    disablePast = false;

    @property({ attribute: 'disable-future', type: Boolean, reflect: true })
    disableFuture = false;

    @property({ attribute: 'disabled-dates' })
    disabledDates = '';

    @property({ attribute: 'disabled-days-of-week', reflect: true })
    disabledDaysOfWeek = '';

    @property({ attribute: 'first-day-of-week', reflect: true })
    firstDayOfWeek: 'auto' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' = 'auto';

    @property({ attribute: 'with-outside-days', type: Boolean, reflect: true })
    withOutsideDays = true;

    @property({ attribute: 'with-week-numbers', type: Boolean, reflect: true })
    withWeekNumbers = false;

    @property({ attribute: 'weekday-format', reflect: true })
    weekdayFormat?: 'narrow' | 'short' | 'long';

    @property({ type: Number, reflect: true })
    months: 1 | 2 = 1;

    @property({ attribute: 'page-by', reflect: true })
    pageBy: 'months' | 'single' = 'months';

    @property({ attribute: 'min-range', type: Number })
    minRange = 0;

    @property({ attribute: 'max-range', type: Number })
    maxRange = 0;

    @property({ attribute: false })
    isDateDisabled?: (date: Date) => boolean;

    @property({ attribute: false })
    dayContent?: PkCalendarDayContent;

    @property({ attribute: 'with-label', type: Boolean })
    withLabel = false;

    @property({ attribute: 'with-instructions', type: Boolean })
    withInstructions = false;

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /** When `full`, the control stretches to the host width. */
    @property({ reflect: true })
    width?: 'full';

    @query('.value-input')
    override input!: HTMLInputElement;

    @query('pk-popup')
    private popupElement!: PkPopup;

    @query('pk-calendar')
    private calendarElement?: PkCalendar;

    @query('.control')
    private controlElement!: HTMLElement;

    private dismissRegistered = false;

    @state()
    private daySlotNames: string[] = [];

    private childrenObserver?: MutationObserver;

    override connectedCallback(): void {
        this.instructions = readLegacyInstructions(this, this.instructions);

        if (this.hasAttribute('with-hint')) {
            this.withInstructions = true;
        }

        super.connectedCallback();
        this.toggleAttribute('data-has-value', Boolean(this.value));
        this.setState('blank', !this.value);
        this.updateDaySlots();
        this.childrenObserver = new MutationObserver(() => this.updateDaySlots());
        this.childrenObserver.observe(this, { childList: true, attributes: true, attributeFilter: ['slot'] });
    }

    override disconnectedCallback(): void {
        this.childrenObserver?.disconnect();
        void this.closePanel('api');
        super.disconnectedCallback();
    }

    protected override willUpdate(changed: PropertyValues): void {
        if (changed.has('value')) {
            // Normalize Date → ISO so form values and parseIsoDate stay string-typed.
            // Formie/v1 pass `value={Date}`; assigning a Date used to throw in displayText.
            if (this.value instanceof Date) {
                this.value = formatIsoDate(coerceToDate(this.value));
            }

            this.toggleAttribute('data-has-value', Boolean(this.value));
            this.setState('blank', !this.value);
        }

        if (changed.has('open')) {
            this.setState('open', this.open);
            this.controlElement?.toggleAttribute('data-popup-open', this.open);
        }

        if (changed.has('mode')) {
            this.setState('range', this.mode === 'range');
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

    protected override syncFormValue(): void {
        this.setValue(this.value || '');
    }

    protected override resetToDefaultValue(): void {
        this.value = this.defaultValue;
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
        }
    }

    private get resolvedLocale(): string {
        return this.locale || this.lang || resolveHostLocale();
    }

    private get displayText(): string {
        if (!this.value) {
            return this.placeholder;
        }

        if (this.mode === 'range') {
            const range = parseRange(this.value);

            if (range.from && range.to) {
                return `${formatHostDate(range.from, this.resolvedLocale)} – ${formatHostDate(range.to, this.resolvedLocale)}`;
            }

            if (range.from) {
                return formatHostDate(range.from, this.resolvedLocale);
            }

            return this.placeholder;
        }

        const date = parseIsoDate(this.value);

        return date ? formatHostDate(date, this.resolvedLocale) : this.placeholder;
    }

    get valueAsDate(): Date | null {
        return this.mode === 'single' ? parseIsoDate(this.value) : null;
    }

    get valueAsRange() {
        return parseRange(this.value);
    }

    async show(): Promise<void> {
        await this.openPanel();
    }

    async hide(): Promise<void> {
        await this.closePanel('api');
    }

    clear(): void {
        if (this.disabled || this.readonly || !this.value) {
            return;
        }

        this.value = '';
        this.dispatchEvent(new PkClearEvent());
        this.emitValueChange();
        this.controlElement?.focus();
    }

    private emitValueChange(): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private async openPanel(): Promise<void> {
        if (this.disabled || this.open) {
            return;
        }

        if (!this.dispatchEvent(new PkShowEvent())) {
            return;
        }

        this.open = true;
        this.registerDismissHandlers();

        await this.updateComplete;
        await waitForPopupReposition(this.popupElement, this.placement);

        this.dispatchEvent(new PkAfterShowEvent());
    }

    private async closePanel(source: PkOverlaySource = 'unknown'): Promise<void> {
        if (!this.open) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            return;
        }

        this.open = false;
        this.unregisterDismissHandlers();
        this.dispatchEvent(new PkAfterHideEvent());
    }

    private registerDismissHandlers(): void {
        if (this.dismissRegistered) {
            return;
        }

        registerDismissible(this);
        document.addEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.addEventListener('keydown', this.handleDocumentKeyDown, true);
        this.dismissRegistered = true;
    }

    private unregisterDismissHandlers(): void {
        if (!this.dismissRegistered) {
            return;
        }

        unregisterDismissible(this);
        document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.removeEventListener('keydown', this.handleDocumentKeyDown, true);
        this.dismissRegistered = false;
    }

    private handleDocumentPointerDown = (event: PointerEvent): void => {
        if (!this.open || !isTopDismissible(this)) {
            return;
        }

        if (this.isPointerInside(event)) {
            return;
        }

        void this.closePanel('light-dismiss');
    };

    private isPointerInside(event: PointerEvent): boolean {
        return isPointerInsideOverlay(event, {
            host: this,
            panel: this.popupElement?.querySelector('.panel') ?? undefined,
        });
    };

    private handleDocumentKeyDown = (event: KeyboardEvent): void => {
        if (!this.open || event.key !== 'Escape') {
            return;
        }

        event.preventDefault();
        void this.closePanel('escape');
    };

    private handleControlClick = (): void => {
        if (this.disabled) {
            return;
        }

        if (this.open) {
            void this.closePanel('api');
            return;
        }

        void this.openPanel();
    };

    private handleControlKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) {
            return;
        }

        if (event.key === 'ArrowDown' && event.altKey) {
            event.preventDefault();
            void this.openPanel();
            queueMicrotask(() => this.calendarElement?.focus());
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleControlClick();
        }
    };

    private handleClearClick = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();
        this.clear();
    };

    private handleCalendarChange = (event: Event): void => {
        const calendar = event.target as PkCalendar;
        this.value = calendar.value;
        this.emitValueChange();

        if (this.mode === 'single' && calendar.value) {
            void this.closePanel('api');
        }

        if (this.mode === 'range' && parseRange(calendar.value).from && parseRange(calendar.value).to) {
            void this.closePanel('api');
        }
    };

    private handleCalendarInput = (event: Event): void => {
        const calendar = event.target as PkCalendar;
        this.value = calendar.value;
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    };

    private renderClearButton() {
        if (!this.withClear || !this.value || this.disabled) {
            return nothing;
        }

        return html`
            <button
                type="button"
                class="icon-button clear-button"
                part="clear-button"
                aria-label="Clear date"
                ?disabled=${this.disabled}
                @click=${this.handleClearClick}
            >
                <slot name="clear-icon">
                    <span class="icon" aria-hidden="true">${unsafeSVG(CLEAR_ICON)}</span>
                </slot>
            </button>
        `;
    }

    private renderCalendarIcon() {
        return html`
            <span class="calendar-icon" part="expand-icon" aria-hidden="true">
                <slot name="expand-icon">
                    <span class="icon">${unsafeSVG(CALENDAR_ICON)}</span>
                </slot>
            </span>
        `;
    }

    override render() {
        const hasValue = Boolean(this.value);
        const display = this.displayText;
        const showPlaceholder = !hasValue;

        return html`
            <div part="form-control" class="form-control">
                ${this.label || this.hasSlotController.test('label')
                    ? html`
                        <label part="label" class="label" for=${this.controlId}>
                            <slot name="label">${this.label}</slot>
                        </label>
                    `
                    : nothing}

                <div part="form-control-input" class="form-control-input">
                    <input
                        class="value-input"
                        type="hidden"
                        .value=${this.value}
                        ?required=${this.required}
                    />

                    <div
                        part="base"
                        id=${this.controlId}
                        class=${classMap({
                            control: true,
                            'is-disabled': this.disabled,
                        })}
                        role="combobox"
                        aria-expanded=${this.open ? 'true' : 'false'}
                        aria-haspopup="dialog"
                        aria-label=${this.ariaLabel ?? nothing}
                        tabindex=${this.disabled ? '-1' : '0'}
                        @click=${this.handleControlClick}
                        @keydown=${this.handleControlKeyDown}
                    >
                        ${this.hasSlotController.test('start')
                            ? html`<span part="start" class="control-start"><slot name="start"></slot></span>`
                            : nothing}

                        ${this.renderCalendarIcon()}

                        <span
                            part="input"
                            class=${classMap({
                                'display-value': true,
                                'is-placeholder': showPlaceholder,
                            })}
                        >
                            ${display}
                        </span>

                        ${this.renderClearButton()}

                        ${this.hasSlotController.test('end')
                            ? html`<span part="end" class="control-end"><slot name="end"></slot></span>`
                            : nothing}
                    </div>

                    <pk-popup
                        .active=${this.open}
                        .anchor=${this.controlElement ?? ''}
                        .placement=${this.placement}
                        .distance=${this.sideOffset}
                    >
                        <div part="popup" class="panel" role="dialog" aria-label="Choose date">
                            <pk-calendar
                                part="calendar"
                                .bordered=${false}
                                .mode=${this.mode}
                                .value=${this.value}
                                .min=${this.min}
                                .max=${this.max}
                                .locale=${this.resolvedLocale}
                                .months=${this.months}
                                .pageBy=${this.pageBy}
                                .firstDayOfWeek=${this.firstDayOfWeek}
                                .withOutsideDays=${this.withOutsideDays}
                                .withWeekNumbers=${this.withWeekNumbers}
                                .weekdayFormat=${this.weekdayFormat ?? nothing}
                                .minRange=${this.minRange}
                                .maxRange=${this.maxRange}
                                .disablePast=${this.disablePast}
                                .disableFuture=${this.disableFuture}
                                .disabledDatesRaw=${this.disabledDates}
                                .disabledDaysOfWeek=${this.disabledDaysOfWeek}
                                .isDateDisabled=${this.isDateDisabled}
                                .dayContent=${this.dayContent}
                                .disabled=${this.disabled}
                                .readonly=${this.readonly}
                                @change=${this.handleCalendarChange}
                                @input=${this.handleCalendarInput}
                            >
                                ${this.daySlotNames.map((name) => html`
                                    <slot name=${name} slot=${name}></slot>
                                `)}
                                <slot name="footer" slot="footer"></slot>
                            </pk-calendar>
                        </div>
                    </pk-popup>
                </div>

                ${this.instructions || this.hasSlotController.test('instructions') || this.hasSlotController.test('hint')
                    ? html`
                        <div part="instructions" class="instructions">
                            <slot name="instructions">
                                <slot name="hint">${this.instructions}</slot>
                            </slot>
                        </div>
                    `
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-date-picker': PkDatePicker;
    }
}
