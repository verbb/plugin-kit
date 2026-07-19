import { CheckboxSelect } from "../../components/CheckboxSelect.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/CheckboxSelectField.ts
var CheckboxSelectField = defineComponent({
	name: "SchemaCheckboxSelectField",
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
		}, { default: () => h(CheckboxSelect, {
			options: props.field.options || [],
			value: binding.value.value === void 0 || binding.value.value === null ? [] : binding.value.value,
			showAllOption: props.field.showAllOption ?? false,
			allLabel: props.field.allLabel,
			disabled: props.field.disabled || void 0,
			onPkChange: (event) => {
				binding.setValue(readPkValue(event));
				binding.setTouched();
			}
		}) });
	}
});
//#endregion
export { CheckboxSelectField };

//# sourceMappingURL=CheckboxSelectField.js.map