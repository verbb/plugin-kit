import { FieldLayout } from "../Field.js";
import { computed, defineComponent, h } from "vue";
//#region src/forms/fields/GroupField.ts
var prefixGroupSchema = (schema, prefix, scopePath) => {
	if (Array.isArray(schema)) return schema.map((item) => prefixGroupSchema(item, prefix, scopePath));
	if (!schema || typeof schema !== "object") return schema;
	const nextSchema = { ...schema };
	if (typeof scopePath === "string" && scopePath && !nextSchema._scopePath) nextSchema._scopePath = scopePath;
	if (typeof nextSchema.name === "string" && nextSchema.name && nextSchema.$field) nextSchema.name = `${prefix}${nextSchema.name}`;
	if (nextSchema.$field !== "group") {
		if (Array.isArray(nextSchema.schema)) nextSchema.schema = prefixGroupSchema(nextSchema.schema, prefix, scopePath);
		if (Array.isArray(nextSchema.children)) nextSchema.children = prefixGroupSchema(nextSchema.children, prefix, scopePath);
	}
	return nextSchema;
};
var GroupField = defineComponent({
	name: "SchemaGroupField",
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
	setup(props, { slots }) {
		const scopedSchema = computed(() => {
			const schema = props.field.schema ?? props.field.children ?? [];
			const prefix = props.field.name ? `${props.field.name}.` : "";
			if (!prefix) return schema;
			return prefixGroupSchema(schema, prefix, props.field.name || "");
		});
		return () => {
			const Renderer = props.form.SchemaRenderer;
			if (!Renderer) return null;
			const errors = props.field.name ? props.form.getGroupedErrorsForPath?.(props.field.name) ?? props.form.getErrorMapFields()[props.field.name] ?? [] : [];
			const content = h(Renderer, { schema: scopedSchema.value });
			if (props.field.label || props.field.instructions || props.field.warning) return h(FieldLayout, {
				name: props.field.name || "group",
				label: props.field.label,
				instructions: props.field.instructions,
				warning: props.field.warning,
				required: props.field.required,
				errors
			}, { default: () => content });
			return slots.default?.() ?? content;
		};
	}
});
//#endregion
export { GroupField };

//# sourceMappingURL=GroupField.js.map