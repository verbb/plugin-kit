import { DatePicker } from "../../components/DatePicker.js";
import { TimePicker } from "../../components/TimePicker.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/fields/DateTimeField.tsx
var DateTimeField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	const initialDate = value ? new Date(String(value)) : null;
	const initialTime = initialDate ? initialDate.toTimeString().slice(0, 5) : "";
	const [dateValue, setDateValue] = useState(initialDate);
	const [timeValue, setTimeValue] = useState(initialTime);
	useEffect(() => {
		let nextValue = "";
		if (dateValue && timeValue) nextValue = (/* @__PURE__ */ new Date(`${dateValue.toISOString().split("T")[0]}T${timeValue}`)).toISOString();
		else if (dateValue) nextValue = (/* @__PURE__ */ new Date(`${dateValue.toISOString().split("T")[0]}T00:00:00`)).toISOString();
		if (String(value ?? "") !== nextValue) setValue(nextValue);
	}, [
		dateValue,
		timeValue,
		setValue,
		value
	]);
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
				value: dateValue,
				onValueChange: (nextValue) => {
					setDateValue(nextValue ?? null);
				},
				isInvalid: errors.length > 0
			}), /* @__PURE__ */ jsx(TimePicker, {
				value: timeValue,
				onValueChange: setTimeValue,
				isInvalid: errors.length > 0
			})]
		})
	});
};
//#endregion
export { DateTimeField };

//# sourceMappingURL=DateTimeField.js.map