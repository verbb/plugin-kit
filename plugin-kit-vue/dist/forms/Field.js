import { Field } from "../components/Field.js";
import { defineComponent, h } from "vue";
//#region src/forms/Field.ts
/**
* Schema-form field shell. Label, instructions, warnings, and errors stay owned by
* `<pk-field>` so Vue SchemaForm remains a thin facade over canonical WC chrome.
*/
var FieldLayout = defineComponent({
	name: "SchemaFieldLayout",
	props: {
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: void 0
		},
		instructions: {
			type: String,
			default: void 0
		},
		warning: {
			type: String,
			default: void 0
		},
		tip: {
			type: String,
			default: void 0
		},
		required: {
			type: Boolean,
			default: false
		},
		translatable: {
			type: Boolean,
			default: false
		},
		errors: {
			type: Array,
			default: () => []
		},
		headerEnd: {
			type: null,
			default: void 0
		},
		class: {
			type: null,
			default: void 0
		},
		style: {
			type: null,
			default: void 0
		}
	},
	setup(props, { slots }) {
		return () => h(Field, {
			class: props.class,
			style: props.style,
			label: props.label,
			instructions: props.instructions,
			warning: props.warning,
			tip: props.tip,
			required: props.required || void 0,
			translatable: props.translatable || void 0,
			errors: props.errors,
			"data-name": props.name
		}, {
			...props.headerEnd ? { "header-end": () => props.headerEnd } : {},
			default: () => slots.default?.()
		});
	}
});
//#endregion
export { FieldLayout };

//# sourceMappingURL=Field.js.map