import { Input } from "../../components/Input.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/NumberField.ts
var NumberField = defineComponent({
	name: "SchemaNumberField",
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
		}, { default: () => h(Input, {
			type: "number",
			value: String(binding.value.value ?? ""),
			placeholder: props.field.placeholder,
			disabled: props.field.disabled || void 0,
			invalid: binding.isInvalid.value || void 0,
			style: props.field.size ? { width: `${props.field.size}rem` } : void 0,
			onInput: (event) => {
				binding.setValue(event.target.value ?? "");
			},
			onBlur: binding.setTouched
		}) });
	}
});
//#endregion
export { NumberField };

//# sourceMappingURL=NumberField.js.map