import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { PkDatePicker } from "@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js";
//#region src/components/DatePicker.tsx
var PkDatePickerElement = createPluginKitComponent({
	tagName: "pk-date-picker",
	elementClass: PkDatePicker,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onInput: "input",
		onChange: "change",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide"
	}
});
/** Local YYYY-MM-DD — keep facade free of non-exported kit util paths. */
function formatIsoDate(date) {
	return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseIsoDate(value) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
	return date;
}
/** Coerce Formie/v1 Date|string values to the CE’s ISO `YYYY-MM-DD` string. */
function toIsoValue(value) {
	if (value == null || value === "") return "";
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) return "";
		return formatIsoDate(value);
	}
	const str = String(value);
	if (str.includes("/") || str.includes(",")) return str;
	const dateOnly = str.match(/^(\d{4}-\d{2}-\d{2})/);
	return dateOnly ? dateOnly[1] : str;
}
/** React facade over `<pk-date-picker>`. Behavior and styles live in the web component. */
var DatePicker = forwardRef(function DatePicker(props, ref) {
	const { value, onValueChange, onPkChange, disabled, invalid, isInvalid, clearable, multiple, mode, open, disablePast, disableFuture, withClear, required, ...rest } = props;
	const resolvedInvalid = Boolean(invalid ?? isInvalid);
	const resolvedWithClear = withClear ?? clearable;
	const resolvedMode = mode ?? (multiple ? "multiple" : void 0);
	const isoValue = useMemo(() => toIsoValue(value), [value]);
	const handlePkChange = (event) => {
		onPkChange?.(event);
		if (!onValueChange) return;
		const next = event.detail?.value;
		onValueChange(next ? parseIsoDate(next) ?? void 0 : void 0);
	};
	return /* @__PURE__ */ jsx(PkDatePickerElement, {
		ref,
		...rest,
		value: isoValue,
		...resolvedMode ? { mode: resolvedMode } : {},
		onPkChange: handlePkChange,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"open",
			"disablePast",
			"disableFuture",
			"withClear",
			"required"
		], {
			disabled,
			invalid: resolvedInvalid,
			open,
			disablePast,
			disableFuture,
			withClear: resolvedWithClear,
			required
		})
	});
});
DatePicker.displayName = "DatePicker";
//#endregion
export { DatePicker, PkDatePickerElement };

//# sourceMappingURL=DatePicker.js.map