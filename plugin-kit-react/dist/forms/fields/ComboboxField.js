import { ComboboxInput } from "../../components/ComboboxInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/ComboboxField.tsx
var ComboboxField = ({ form, field }) => {
	const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
	const isInvalid = errors.length > 0;
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(ComboboxInput, {
			options: field.options,
			fetchOptions: field.fetchOptions,
			multiple: field.multiple,
			value,
			onValueChange: (nextValue) => {
				setValue(nextValue);
				setTouched();
			},
			disabled: field.disabled,
			placeholder: field.placeholder,
			emptyMessage: field.emptyMessage,
			cacheKey: field.cacheKey,
			cacheTtlMs: field.cacheTtlMs,
			className: "w-full",
			contentClassName: isInvalid ? "aria-invalid:border-destructive" : void 0
		})
	});
};
//#endregion
export { ComboboxField };

//# sourceMappingURL=ComboboxField.js.map