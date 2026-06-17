import { formatDateTimeValue, parseDateTimeValue } from "../../utils/datetime.js";
import { DatePicker } from "../../components/DatePicker.js";
import { TimePicker } from "../../components/TimePicker.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/fields/DateTimeField.tsx
var DateTimeField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	const parsedValue = useMemo(() => parseDateTimeValue(value), [value]);
	const handleDateChange = (nextValue) => {
		setValue(formatDateTimeValue(nextValue ?? null, parsedValue.time));
	};
	const handleTimeChange = (nextTime) => {
		setValue(formatDateTimeValue(parsedValue.date, nextTime));
	};
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ jsx(DatePicker, {
				value: parsedValue.date,
				onValueChange: handleDateChange,
				isInvalid: errors.length > 0
			}), /* @__PURE__ */ jsx(TimePicker, {
				value: parsedValue.time,
				onValueChange: handleTimeChange,
				isInvalid: errors.length > 0
			})]
		})
	});
};
//#endregion
export { DateTimeField };

//# sourceMappingURL=DateTimeField.js.map