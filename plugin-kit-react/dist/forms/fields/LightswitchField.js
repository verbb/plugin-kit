import { Lightswitch } from "../../components/Lightswitch.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/LightswitchField.tsx
var LightswitchField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(Lightswitch, {
			checked: Boolean(value),
			onCheckedChange: (checked) => setValue(checked),
			"aria-label": field.label
		})
	});
};
//#endregion
export { LightswitchField };

//# sourceMappingURL=LightswitchField.js.map