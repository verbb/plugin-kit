import { m as i, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate } from "./pk-base-BlxAYXJD.js";
import { _ as clock } from "./icons-B1i-oRoD.js";
import { t as createIconElement } from "./render-DApFfV9S.js";
import { n as pkSelectStyles, t as PkSelect } from "./pk-select-BDoHntmm.js";
//#region src/utils/time-options.ts
var timeOptionsCache = null;
function resolveTimepickerOptions() {
	const craft = globalThis.Craft?.timepicker;
	return {
		timeFormat: craft?.timeFormat || "g:i A",
		lang: {
			AM: craft?.lang?.AM || "AM",
			PM: craft?.lang?.PM || "PM"
		},
		locale: craft?.locale || document.documentElement.lang || "en-US"
	};
}
/** Generate time options in 30-minute increments — mirrors React `generateTimeOptions`. */
function generateTimeOptions() {
	if (timeOptionsCache) return timeOptionsCache;
	const options = [];
	const { timeFormat, lang, locale } = resolveTimepickerOptions();
	for (let hour = 0; hour < 24; hour += 1) for (let minute = 0; minute < 60; minute += 30) {
		const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		let displayTime;
		if (timeFormat === "g:i A") {
			let displayHour = hour;
			if (hour === 0) displayHour = 12;
			else if (hour > 12) displayHour = hour - 12;
			const ampm = hour >= 12 ? lang.PM : lang.AM;
			displayTime = `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
		} else if (timeFormat === "G:i") displayTime = timeString;
		else displayTime = (/* @__PURE__ */ new Date(`2000-01-01T${timeString}:00`)).toLocaleTimeString(locale, {
			hour: "numeric",
			minute: "2-digit",
			hour12: timeFormat.includes("A")
		});
		options.push({
			value: timeString,
			label: displayTime
		});
	}
	timeOptionsCache = options;
	return options;
}
//#endregion
//#region src/components/time-picker/pk-time-picker.styles.ts
var pkTimePickerStyles = i`
    @layer pk-component {
        :host {
            display: inline-block;
            width: 8.125rem;
            min-width: 8.125rem;
            color: var(--pk-color-gray-700);
            --pk-select-trigger-border-width: 1px;
            --pk-select-item-min-height: 2.125rem;
            --pk-select-item-padding-block: 0;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-font-size: var(--pk-font-size-base);
        }

        .control {
            justify-content: flex-start;
            gap: 0.5rem;
            width: 100%;
            height: 2.125rem;
            min-height: 2.125rem;
            border-color: var(--pk-color-slate-400) !important;
            border-radius: var(--pk-radius-lg) !important;
            background: transparent !important;
            background-color: transparent !important;
            text-align: left;
            font-weight: 400;
            line-height: 1.2;
            cursor: default;
        }

        :host([open]) .control {
            background: var(--pk-color-slate-150, var(--pk-color-slate-100)) !important;
            background-color: var(--pk-color-slate-150, var(--pk-color-slate-100)) !important;
            border-color: var(--pk-color-slate-400) !important;
            box-shadow: none;
        }

        :host(:not([disabled])) .control:hover:not(:disabled) {
            background: var(--pk-color-slate-50) !important;
            background-color: var(--pk-color-slate-50) !important;
        }

        :host(:not([disabled])[open]) .control:hover:not(:disabled),
        :host(:not([disabled])) .control:active:not(:disabled) {
            background: var(--pk-color-slate-150, var(--pk-color-slate-100)) !important;
            background-color: var(--pk-color-slate-150, var(--pk-color-slate-100)) !important;
        }

        :host(:not([invalid]):not(:state(user-invalid))) .control:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600) !important;
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host(:not([invalid]):not(:state(user-invalid))[open]) .control:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[open][data-state='focus-visible']) .control {
            border-color: var(--pk-color-slate-400) !important;
            box-shadow: none;
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600) !important;
        }

        :host([invalid]) .control:focus-visible,
        :host([invalid][data-state='focus-visible']) .control,
        :host(:state(user-invalid)) .control:focus-visible,
        :host(:state(user-invalid)[data-state='focus-visible']) .control {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        .control-start {
            color: var(--pk-color-gray-400);
            pointer-events: none;
        }

        .control-start svg {
            display: block;
            width: 14px;
            height: 14px;
        }

        .value {
            flex: 1;
            line-height: 1.2;
            color: inherit;
        }

        .value.is-placeholder {
            color: var(--pk-color-gray-400);
        }

        .icon {
            margin-inline-start: auto;
            color: var(--pk-color-gray-600);
        }

        .panel {
            min-width: 8rem;
            max-height: 15rem;
        }

        /* Editable-table cells: flush fill — must live here so !important beats the
         * standalone trigger chrome (external ::part cannot override it). */
        :host(.cell-pk-control) {
            display: block;
            width: 100%;
            min-width: 0;
            height: 100%;
            --pk-select-trigger-border-width: 0;
            --pk-select-item-min-height: 100%;
            --pk-select-item-padding-block: 0;
        }

        :host(.cell-pk-control) .control {
            width: 100%;
            height: 100% !important;
            min-height: 100% !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            background-color: transparent !important;
        }

        :host(.cell-pk-control:not([disabled])) .control:hover:not(:disabled),
        :host(.cell-pk-control[open]) .control,
        :host(.cell-pk-control:not([disabled])[open]) .control:hover:not(:disabled),
        :host(.cell-pk-control:not([disabled])) .control:active:not(:disabled) {
            border-radius: 0 !important;
        }

        :host(.cell-pk-control:not([invalid]):not(:state(user-invalid))) .control:focus-visible,
        :host(.cell-pk-control:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border: 0 !important;
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200, #e5e7eb);
        }
    }
`;
//#endregion
//#region src/components/time-picker/pk-time-picker.ts
var PkTimePicker = class PkTimePicker extends PkSelect {
	constructor(..._args) {
		super(..._args);
		this.optionsSeeded = false;
	}
	static {
		this.styles = [...pkSelectStyles, pkTimePickerStyles];
	}
	connectedCallback() {
		this.ensureTimeOptions();
		this.ensureClockIcon();
		super.connectedCallback();
	}
	ensureTimeOptions() {
		if (this.optionsSeeded || this.querySelector("pk-option")) {
			this.optionsSeeded = true;
			return;
		}
		for (const option of generateTimeOptions()) {
			const element = document.createElement("pk-option");
			element.value = option.value;
			element.textContent = option.label;
			this.append(element);
		}
		this.optionsSeeded = true;
	}
	ensureClockIcon() {
		if (this.querySelector("[slot=\"start\"]")) return;
		const icon = createIconElement(clock);
		icon.setAttribute("slot", "start");
		this.prepend(icon);
	}
};
PkTimePicker = __decorate([t("pk-time-picker")], PkTimePicker);
//#endregion
export { PkTimePicker as t };
