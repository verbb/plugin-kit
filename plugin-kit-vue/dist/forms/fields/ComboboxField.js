import { Combobox } from "../../components/Combobox.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/ComboboxField.ts
var ComboboxField = defineComponent({
	name: "SchemaComboboxField",
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
		return () => h(FieldLayout, {
			name: props.field.name,
			label: props.field.label,
			instructions: props.field.instructions,
			warning: props.field.warning,
			required: props.field.required,
			errors: binding.errors.value
		}, { default: () => h(Combobox, {
			options: props.field.options,
			fetchOptions: props.field.fetchOptions,
			multiple: props.field.multiple || void 0,
			value: binding.value.value,
			disabled: props.field.disabled || void 0,
			placeholder: props.field.placeholder,
			emptyMessage: props.field.emptyMessage,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				binding.setValue(readPkValue(event));
				binding.setTouched();
			}
		}) });
	}
});
//#endregion
export { ComboboxField };

//# sourceMappingURL=ComboboxField.js.map