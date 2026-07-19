import { DatePicker } from "../../components/DatePicker.js";
import { TimePicker } from "../../components/TimePicker.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { formatDateTimeParts, parseDateTimeParts } from "../datetime.js";
import { computed, defineComponent, h } from "vue";
//#region src/forms/fields/DateTimeField.ts
var DateTimeField = defineComponent({
	name: "SchemaDateTimeField",
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
		const parts = computed(() => parseDateTimeParts(binding.value.value));
		return () => h(FieldLayout, {
			name: props.field.name,
			label: props.field.label,
			instructions: props.field.instructions,
			warning: props.field.warning,
			required: props.field.required,
			errors: binding.errors.value
		}, { default: () => h("div", { style: {
			display: "flex",
			gap: "0.5rem"
		} }, [h(DatePicker, {
			value: parts.value.date,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				binding.setValue(formatDateTimeParts(String(readPkValue(event) ?? ""), parts.value.time));
				binding.setTouched();
			}
		}), h(TimePicker, {
			value: parts.value.time,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				binding.setValue(formatDateTimeParts(parts.value.date, String(readPkValue(event) ?? "")));
				binding.setTouched();
			}
		})]) });
	}
});
//#endregion
export { DateTimeField };

//# sourceMappingURL=DateTimeField.js.map