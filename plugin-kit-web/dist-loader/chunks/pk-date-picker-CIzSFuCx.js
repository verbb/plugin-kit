import { d as registerDismissible, f as unregisterDismissible, n as uniqueId, u as isTopDismissible } from "./pk-a11y-Cx5RZvhu.js";
import { a as o, c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles, s as iconStyles } from "./pk-base-BlxAYXJD.js";
import { f as calendar, q as xmark } from "./icons-B1i-oRoD.js";
import { t as MirrorValidator } from "./mirror-validator-C5XrXPaq.js";
import { t as RequiredValidator } from "./required-validator-0XwZtX9k.js";
import { t as HasSlotController } from "./has-slot-BGJeJdHr.js";
import { t as PkClearEvent } from "./pk-clear-BMZUzwDt.js";
import { n as readLegacyInstructions } from "./field-labels-D3lKQ2nq.js";
import { n as renderIconHtml } from "./render-DApFfV9S.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-C3tSQ3UR.js";
import { i as waitForPopupReposition } from "./popup-placement-animation-WlEXnS85.js";
import { n as isPointerInsideOverlay } from "./popup-pointer-f9MKZ5v9.js";
import { a as parseRange, i as parseIsoDate, n as coerceToDate, r as formatIsoDate } from "./pk-calendar-RXCDDhLI.js";
//#region src/utils/host-date.ts
function getCraft() {
	return globalThis.Craft;
}
/** Locale chain aligned with React `hostGetLocale` / Craft CP. */
function resolveHostLocale() {
	return getCraft()?.locale || document.documentElement.lang || "en-US";
}
/**
* Display date in the host locale — mirrors React `hostFormatDate` → `Craft.formatDate`.
* Falls back to numeric `Intl` when Craft is unavailable (e.g. playground).
*/
function formatHostDate(date, locale) {
	const craftFormat = getCraft()?.formatDate;
	if (typeof craftFormat === "function") try {
		return craftFormat(date);
	} catch {}
	const resolved = locale || resolveHostLocale();
	return new Intl.DateTimeFormat(resolved, {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).format(date);
}
//#endregion
//#region src/components/date-picker/pk-date-picker.styles.ts
var pkDatePickerStyles = i`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            width: fit-content;
            max-width: 100%;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            --pk-date-picker-height: 2.125rem;
            --pk-date-picker-min-width: 8.125rem;
            --pk-date-picker-padding-inline: 10px;
            --pk-date-picker-font-size: var(--pk-font-size-base);
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        .control {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            width: fit-content;
            min-width: var(--pk-date-picker-min-width);
            max-width: 100%;
            height: var(--pk-date-picker-height);
            min-height: var(--pk-date-picker-height);
            margin: 0;
            padding: 0 var(--pk-date-picker-padding-inline);
            border: 1px solid var(--pk-color-slate-400);
            border-radius: var(--pk-radius-lg);
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: var(--pk-date-picker-font-size);
            font-weight: 400;
            line-height: 1.2;
            cursor: default;
            outline: none;
            box-sizing: border-box;
            transition: background-color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .control[data-popup-open] {
            background: var(--pk-color-slate-150);
            border-color: var(--pk-color-slate-400);
            box-shadow: none;
        }

        :host(:not([disabled])) .control:hover:not(.is-disabled) {
            background: var(--pk-color-slate-50);
        }

        :host(:not([disabled])) .control[data-popup-open]:hover:not(.is-disabled),
        :host(:not([disabled])) .control:active:not(.is-disabled) {
            background: var(--pk-color-slate-150);
        }

        /* Outline-button focus — lighter than --pk-shadow-focus (see React DatePicker trigger). */
        :host(:not([invalid]):not(:state(user-invalid))) .control:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host(:not([invalid]):not(:state(user-invalid))) .control[data-popup-open]:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control[data-popup-open] {
            border-color: var(--pk-color-slate-400);
            box-shadow: none;
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .control:focus-visible,
        :host([invalid][data-state='focus-visible']) .control,
        :host(:state(user-invalid)) .control:focus-visible,
        :host(:state(user-invalid)[data-state='focus-visible']) .control {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .display-value {
            display: inline-flex;
            align-items: center;
            flex: 1;
            min-width: 0;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            color: inherit;
        }

        .display-value.is-placeholder {
            color: var(--pk-color-gray-400);
        }

        .calendar-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            line-height: 0;
            color: var(--pk-color-gray-400);
            pointer-events: none;
        }

        .calendar-icon .icon,
        .calendar-icon svg {
            display: block;
            width: 14px;
            height: 14px;
        }

        .icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-inline-start: auto;
            width: 1.25rem;
            height: 1.25rem;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-500);
            cursor: pointer;
        }

        .icon-button:hover:not(:disabled) {
            color: var(--pk-color-gray-800);
            background: var(--pk-color-slate-100);
        }

        .icon-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .icon-button .icon {
            width: 0.875rem;
            height: 0.875rem;
        }

        .panel {
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
        }

        .panel pk-calendar {
            display: block;
        }

        :host([size='xs']) {
            --pk-date-picker-height: 1.5rem;
            --pk-date-picker-padding-inline: 8px;
            --pk-date-picker-font-size: 11px;
        }

        :host([size='sm']) {
            --pk-date-picker-height: 1.625rem;
            --pk-date-picker-padding-inline: 9px;
            --pk-date-picker-font-size: 12px;
        }

        :host([size='lg']) {
            --pk-date-picker-height: 2.125rem;
            --pk-date-picker-padding-inline: 11px;
            --pk-date-picker-font-size: 14px;
        }

        :host([size='xl']) {
            --pk-date-picker-height: 2.375rem;
            --pk-date-picker-padding-inline: 12px;
            --pk-date-picker-font-size: 15px;
        }
    }
`;
//#endregion
//#region src/components/date-picker/pk-date-picker.ts
var CALENDAR_ICON = renderIconHtml(calendar);
var CLEAR_ICON = renderIconHtml(xmark);
var PkDatePicker = class PkDatePicker extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["input"];
		this.hasSlotController = new HasSlotController(this, "label", "instructions", "hint", "start", "end", "footer");
		this.controlId = uniqueId("pk-date-picker");
		this.open = false;
		this.placement = "bottom";
		this.sideOffset = 4;
		this.size = "default";
		this.mode = "single";
		this.value = "";
		this.defaultValue = "";
		this.label = "";
		this.instructions = "";
		this.placeholder = "";
		this.withClear = false;
		this.readonly = false;
		this.invalid = false;
		this.min = "";
		this.max = "";
		this.locale = "";
		this.disablePast = false;
		this.disableFuture = false;
		this.disabledDates = "";
		this.disabledDaysOfWeek = "";
		this.firstDayOfWeek = "auto";
		this.withOutsideDays = true;
		this.withWeekNumbers = false;
		this.months = 1;
		this.pageBy = "months";
		this.minRange = 0;
		this.maxRange = 0;
		this.withLabel = false;
		this.withInstructions = false;
		this.ariaLabel = null;
		this.dismissRegistered = false;
		this.daySlotNames = [];
		this.handleDocumentPointerDown = (event) => {
			if (!this.open || !isTopDismissible(this)) return;
			if (this.isPointerInside(event)) return;
			this.closePanel("light-dismiss");
		};
		this.handleDocumentKeyDown = (event) => {
			if (!this.open || event.key !== "Escape") return;
			event.preventDefault();
			this.closePanel("escape");
		};
		this.handleControlClick = () => {
			if (this.disabled) return;
			if (this.open) {
				this.closePanel("api");
				return;
			}
			this.openPanel();
		};
		this.handleControlKeyDown = (event) => {
			if (this.disabled) return;
			if (event.key === "ArrowDown" && event.altKey) {
				event.preventDefault();
				this.openPanel();
				queueMicrotask(() => this.calendarElement?.focus());
				return;
			}
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				this.handleControlClick();
			}
		};
		this.handleClearClick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.clear();
		};
		this.handleCalendarChange = (event) => {
			const calendar = event.target;
			this.value = calendar.value;
			this.emitValueChange();
			if (this.mode === "single" && calendar.value) this.closePanel("api");
			if (this.mode === "range" && parseRange(calendar.value).from && parseRange(calendar.value).to) this.closePanel("api");
		};
		this.handleCalendarInput = (event) => {
			const calendar = event.target;
			this.value = calendar.value;
			this.dispatchEvent(new Event("input", {
				bubbles: true,
				composed: true
			}));
		};
	}
	static {
		this.styles = [formControlStyles, pkDatePickerStyles];
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			RequiredValidator()
		];
	}
	connectedCallback() {
		this.instructions = readLegacyInstructions(this, this.instructions);
		if (this.hasAttribute("with-hint")) this.withInstructions = true;
		super.connectedCallback();
		this.toggleAttribute("data-has-value", Boolean(this.value));
		this.setState("blank", !this.value);
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
		this.closePanel("api");
		super.disconnectedCallback();
	}
	willUpdate(changed) {
		if (changed.has("value")) {
			if (this.value instanceof Date) this.value = formatIsoDate(coerceToDate(this.value));
			this.toggleAttribute("data-has-value", Boolean(this.value));
			this.setState("blank", !this.value);
		}
		if (changed.has("open")) {
			this.setState("open", this.open);
			this.controlElement?.toggleAttribute("data-popup-open", this.open);
		}
		if (changed.has("mode")) this.setState("range", this.mode === "range");
		super.willUpdate(changed);
	}
	updateDaySlots() {
		const names = [...this.children].map((child) => child.getAttribute("slot")).filter((name) => Boolean(name?.startsWith("day-")));
		if (names.join(",") !== this.daySlotNames.join(",")) this.daySlotNames = names;
	}
	syncFormValue() {
		this.setValue(this.value || "");
	}
	resetToDefaultValue() {
		this.value = this.defaultValue;
	}
	restoreFormState(state) {
		if (typeof state === "string") this.value = state;
	}
	get resolvedLocale() {
		return this.locale || this.lang || resolveHostLocale();
	}
	get displayText() {
		if (!this.value) return this.placeholder;
		if (this.mode === "range") {
			const range = parseRange(this.value);
			if (range.from && range.to) return `${formatHostDate(range.from, this.resolvedLocale)} – ${formatHostDate(range.to, this.resolvedLocale)}`;
			if (range.from) return formatHostDate(range.from, this.resolvedLocale);
			return this.placeholder;
		}
		const date = parseIsoDate(this.value);
		return date ? formatHostDate(date, this.resolvedLocale) : this.placeholder;
	}
	get valueAsDate() {
		return this.mode === "single" ? parseIsoDate(this.value) : null;
	}
	get valueAsRange() {
		return parseRange(this.value);
	}
	async show() {
		await this.openPanel();
	}
	async hide() {
		await this.closePanel("api");
	}
	clear() {
		if (this.disabled || this.readonly || !this.value) return;
		this.value = "";
		this.dispatchEvent(new PkClearEvent());
		this.emitValueChange();
		this.controlElement?.focus();
	}
	emitValueChange() {
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: this.value },
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
	async openPanel() {
		if (this.disabled || this.open) return;
		if (!this.dispatchEvent(new PkShowEvent())) return;
		this.open = true;
		this.registerDismissHandlers();
		await this.updateComplete;
		await waitForPopupReposition(this.popupElement, this.placement);
		this.dispatchEvent(new PkAfterShowEvent());
	}
	async closePanel(source = "unknown") {
		if (!this.open) return;
		const hideEvent = new PkHideEvent(source);
		if (!this.dispatchEvent(hideEvent)) return;
		this.open = false;
		this.unregisterDismissHandlers();
		this.dispatchEvent(new PkAfterHideEvent());
	}
	registerDismissHandlers() {
		if (this.dismissRegistered) return;
		registerDismissible(this);
		document.addEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.addEventListener("keydown", this.handleDocumentKeyDown, true);
		this.dismissRegistered = true;
	}
	unregisterDismissHandlers() {
		if (!this.dismissRegistered) return;
		unregisterDismissible(this);
		document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
		document.removeEventListener("keydown", this.handleDocumentKeyDown, true);
		this.dismissRegistered = false;
	}
	isPointerInside(event) {
		return isPointerInsideOverlay(event, {
			host: this,
			panel: this.popupElement?.querySelector(".panel") ?? void 0
		});
	}
	renderClearButton() {
		if (!this.withClear || !this.value || this.disabled) return A;
		return b`
            <button
                type="button"
                class="icon-button clear-button"
                part="clear-button"
                aria-label="Clear date"
                ?disabled=${this.disabled}
                @click=${this.handleClearClick}
            >
                <slot name="clear-icon">
                    <span class="icon" aria-hidden="true">${o(CLEAR_ICON)}</span>
                </slot>
            </button>
        `;
	}
	renderCalendarIcon() {
		return b`
            <span class="calendar-icon" part="expand-icon" aria-hidden="true">
                <slot name="expand-icon">
                    <span class="icon">${o(CALENDAR_ICON)}</span>
                </slot>
            </span>
        `;
	}
	render() {
		const hasValue = Boolean(this.value);
		const display = this.displayText;
		const showPlaceholder = !hasValue;
		return b`
            <div part="form-control" class="form-control">
                ${this.label || this.hasSlotController.test("label") ? b`
                        <label part="label" class="label" for=${this.controlId}>
                            <slot name="label">${this.label}</slot>
                        </label>
                    ` : A}

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
                        class=${e({
			control: true,
			"is-disabled": this.disabled
		})}
                        role="combobox"
                        aria-expanded=${this.open ? "true" : "false"}
                        aria-haspopup="dialog"
                        aria-label=${this.ariaLabel ?? A}
                        tabindex=${this.disabled ? "-1" : "0"}
                        @click=${this.handleControlClick}
                        @keydown=${this.handleControlKeyDown}
                    >
                        ${this.hasSlotController.test("start") ? b`<span part="start" class="control-start"><slot name="start"></slot></span>` : A}

                        ${this.renderCalendarIcon()}

                        <span
                            part="input"
                            class=${e({
			"display-value": true,
			"is-placeholder": showPlaceholder
		})}
                        >
                            ${display}
                        </span>

                        ${this.renderClearButton()}

                        ${this.hasSlotController.test("end") ? b`<span part="end" class="control-end"><slot name="end"></slot></span>` : A}
                    </div>

                    <pk-popup
                        .active=${this.open}
                        .anchor=${this.controlElement ?? ""}
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
                                .weekdayFormat=${this.weekdayFormat ?? A}
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
                                ${this.daySlotNames.map((name) => b`
                                    <slot name=${name} slot=${name}></slot>
                                `)}
                                <slot name="footer" slot="footer"></slot>
                            </pk-calendar>
                        </div>
                    </pk-popup>
                </div>

                ${this.instructions || this.hasSlotController.test("instructions") || this.hasSlotController.test("hint") ? b`
                        <div part="instructions" class="instructions">
                            <slot name="instructions">
                                <slot name="hint">${this.instructions}</slot>
                            </slot>
                        </div>
                    ` : A}
            </div>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "open", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkDatePicker.prototype, "sideOffset", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "mode", void 0);
__decorate([n()], PkDatePicker.prototype, "value", void 0);
__decorate([n({ attribute: "default-value" })], PkDatePicker.prototype, "defaultValue", void 0);
__decorate([n()], PkDatePicker.prototype, "label", void 0);
__decorate([n()], PkDatePicker.prototype, "instructions", void 0);
__decorate([n()], PkDatePicker.prototype, "placeholder", void 0);
__decorate([n({
	attribute: "with-clear",
	type: Boolean
})], PkDatePicker.prototype, "withClear", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "invalid", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "min", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "max", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "locale", void 0);
__decorate([n({
	attribute: "disable-past",
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "disablePast", void 0);
__decorate([n({
	attribute: "disable-future",
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "disableFuture", void 0);
__decorate([n({ attribute: "disabled-dates" })], PkDatePicker.prototype, "disabledDates", void 0);
__decorate([n({
	attribute: "disabled-days-of-week",
	reflect: true
})], PkDatePicker.prototype, "disabledDaysOfWeek", void 0);
__decorate([n({
	attribute: "first-day-of-week",
	reflect: true
})], PkDatePicker.prototype, "firstDayOfWeek", void 0);
__decorate([n({
	attribute: "with-outside-days",
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "withOutsideDays", void 0);
__decorate([n({
	attribute: "with-week-numbers",
	type: Boolean,
	reflect: true
})], PkDatePicker.prototype, "withWeekNumbers", void 0);
__decorate([n({
	attribute: "weekday-format",
	reflect: true
})], PkDatePicker.prototype, "weekdayFormat", void 0);
__decorate([n({
	type: Number,
	reflect: true
})], PkDatePicker.prototype, "months", void 0);
__decorate([n({
	attribute: "page-by",
	reflect: true
})], PkDatePicker.prototype, "pageBy", void 0);
__decorate([n({
	attribute: "min-range",
	type: Number
})], PkDatePicker.prototype, "minRange", void 0);
__decorate([n({
	attribute: "max-range",
	type: Number
})], PkDatePicker.prototype, "maxRange", void 0);
__decorate([n({ attribute: false })], PkDatePicker.prototype, "isDateDisabled", void 0);
__decorate([n({ attribute: false })], PkDatePicker.prototype, "dayContent", void 0);
__decorate([n({
	attribute: "with-label",
	type: Boolean
})], PkDatePicker.prototype, "withLabel", void 0);
__decorate([n({
	attribute: "with-instructions",
	type: Boolean
})], PkDatePicker.prototype, "withInstructions", void 0);
__decorate([n({ attribute: "aria-label" })], PkDatePicker.prototype, "ariaLabel", void 0);
__decorate([n({ reflect: true })], PkDatePicker.prototype, "width", void 0);
__decorate([e$1(".value-input")], PkDatePicker.prototype, "input", void 0);
__decorate([e$1("pk-popup")], PkDatePicker.prototype, "popupElement", void 0);
__decorate([e$1("pk-calendar")], PkDatePicker.prototype, "calendarElement", void 0);
__decorate([e$1(".control")], PkDatePicker.prototype, "controlElement", void 0);
__decorate([r()], PkDatePicker.prototype, "daySlotNames", void 0);
PkDatePicker = __decorate([t("pk-date-picker")], PkDatePicker);
//#endregion
export { PkDatePicker as t };
