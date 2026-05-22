import { Lightswitch } from "../../components/Lightswitch.js";
import "../../components/index.js";
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
			onCheckedChange: (checked) => {
				return setValue(Boolean(checked));
			},
			"aria-label": field.label,
			"aria-invalid": errors.length > 0
		})
	});
};
//#endregion
export { LightswitchField };

//# sourceMappingURL=LightswitchField.js.map