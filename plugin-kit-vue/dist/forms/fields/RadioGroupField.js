import { RadioGroupInput } from "../../components/RadioGroupInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useFilteredOptions } from "./options.js";
import { defineComponent, h, watch } from "vue";
//#region src/forms/fields/RadioGroupField.ts
var RadioGroupField = defineComponent({
	name: "SchemaRadioGroupField",
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
		}, { default: () => h(RadioGroupInput, {
			name: props.field.name,
			modelValue: binding.value.value,
			options: filteredOptions.value.map((option) => ({
				value: option.value,
				label: option.label,
				disabled: option.disabled
			})),
			disabled: Boolean(props.field.disabled) || void 0,
			ariaLabel: props.field.label,
			"onUpdate:modelValue": (nextValue) => {
				binding.setValue(nextValue);
				binding.setTouched();
			}
		}) });
	}
});
//#endregion
export { RadioGroupField };

//# sourceMappingURL=RadioGroupField.js.map