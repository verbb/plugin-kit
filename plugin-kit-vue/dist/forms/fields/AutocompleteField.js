import { AutocompleteInput } from "../../components/AutocompleteInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/AutocompleteField.ts
/**
* SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
* Pair schema `warning` for plugin-owned existence checks (paths, aliases, etc.).
*/
var AutocompleteField = defineComponent({
	name: "SchemaAutocompleteField",
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
		return () => {
			const field = props.field;
			return h(FieldLayout, {
				name: field.name,
				label: field.label,
				instructions: field.instructions,
				warning: field.warning,
				required: field.required,
				errors: binding.errors.value
			}, { default: () => h(AutocompleteInput, {
				options: field.options,
				fetchOptions: field.fetchOptions,
				modelValue: binding.value.value == null ? "" : String(binding.value.value),
				disabled: field.disabled || void 0,
				placeholder: field.placeholder,
				emptyMessage: field.emptyMessage,
				showClear: field.showClear || void 0,
				invalid: binding.isInvalid.value || void 0,
				width: field.width,
				"onUpdate:modelValue": (nextValue) => {
					binding.setValue(nextValue);
					binding.setTouched();
				}
			}) });
		};
	}
});
//#endregion
export { AutocompleteField };

//# sourceMappingURL=AutocompleteField.js.map