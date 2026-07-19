import { Option, Select } from "../../components/Select.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { useFilteredOptions } from "./options.js";
import { defineComponent, h, watch } from "vue";
//#region src/forms/fields/SelectField.ts
var SelectField = defineComponent({
	name: "SchemaSelectField",
	props: {
		form: {
			type: Object,
			required: true
		},
		field: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const binding = useEngineField(props.form, props.field.name);
		const filteredOptions = useFilteredOptions(props.form, props.field);
		watch([filteredOptions, binding.value], ([options, value]) => {
			if (value === void 0 || value === null || value === "") return;
			if (options.some((option) => String(option.value) === String(value))) return;
			const fallback = options.find((option) => option.value !== void 0 && option.disabled !== true);
			binding.setValue(fallback ? fallback.value : "");
		}, { immediate: true });
		return () => h(FieldLayout, {
			name: props.field.name,
			label: props.field.label,
			instructions: props.field.instructions,
			warning: props.field.warning,
			required: props.field.required,
			errors: binding.errors.value
		}, { default: () => h(Select, {
			value: binding.value.value ?? "",
			placeholder: props.field.placeholder,
			disabled: props.field.disabled || void 0,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				const nextValue = readPkValue(event);
				const match = filteredOptions.value.find((option) => String(option.value) === String(nextValue));
				binding.setValue(match ? match.value : nextValue);
				binding.setTouched();
			},
			onBlur: binding.setTouched
		}, { default: () => filteredOptions.value.map((option) => h(Option, {
			key: String(option.value),
			value: String(option.value ?? ""),
			disabled: option.disabled || void 0
		}, { default: () => option.label })) }) });
	}
});
//#endregion
export { SelectField };

//# sourceMappingURL=SelectField.js.map