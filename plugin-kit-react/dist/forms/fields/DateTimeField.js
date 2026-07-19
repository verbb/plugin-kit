import { DatePicker } from "../../components/DatePicker.js";
import { TimePicker } from "../../components/TimePicker.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { formatDateTimeParts, parseDateTimeParts } from "../datetime.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/fields/DateTimeField.tsx
var DateTimeField = ({ form, field }) => {
	const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
	const parts = useMemo(() => {
		return parseDateTimeParts(value);
	}, [value]);
	const isInvalid = errors.length > 0;
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsxs("div", {
			style: {
				display: "flex",
				gap: "0.5rem"
			},
			children: [/* @__PURE__ */ jsx(DatePicker, {
				value: parts.date,
				onPkChange: (event) => {
					setValue(formatDateTimeParts(event.detail?.value ?? "", parts.time));
					setTouched();
				},
				invalid: isInvalid
			}), /* @__PURE__ */ jsx(TimePicker, {
				value: parts.time,
				onPkChange: (event) => {
					setValue(formatDateTimeParts(parts.date, event.detail?.value ?? ""));
					setTouched();
				},
				invalid: isInvalid
			})]
		})
	});
};
//#endregion
export { DateTimeField };

//# sourceMappingURL=DateTimeField.js.map