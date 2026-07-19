import { FieldLayout } from "../Field.js";
import { useSchemaEngineContext } from "../engine/context.js";
import { collectSchemaFieldNames } from "./schemaErrors.js";
import { computed, defineComponent, h, onBeforeUnmount, ref } from "vue";
//#region src/forms/components/FieldWrap.ts
var ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;
var formatWrapperMessage = (message, wrapperLabel) => {
	if (!wrapperLabel) return message;
	const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
	if (match) {
		const [, , suffix] = match;
		return `${wrapperLabel} ${suffix}`;
	}
	return `${wrapperLabel} ${message}`;
};
/**
* Schema `$cmp: 'FieldWrap'` labels a control cluster and promotes nested errors
* onto the wrapper, matching the v1/Formie field-wrap contract.
*/
var FieldWrap = Object.assign(defineComponent({
	name: "SchemaFieldWrap",
	props: {
		name: {
			type: String,
			default: void 0
		},
		label: {
			type: String,
			default: void 0
		},
		instructions: {
			type: String,
			default: void 0
		},
		required: {
			type: Boolean,
			default: false
		},
		warning: {
			type: String,
			default: void 0
		},
		schemaNode: {
			type: Object,
			default: void 0
		}
	},
	setup(props, { slots }) {
		const form = useSchemaEngineContext();
		const version = ref(0);
		onBeforeUnmount(form.store.subscribe(() => {
			version.value += 1;
		}));
		const fieldName = computed(() => props.name || props.label || "field");
		const nestedFieldNames = computed(() => {
			return Array.from(collectSchemaFieldNames(props.schemaNode?.children || []));
		});
		const errors = computed(() => {
			version.value;
			if (props.name && typeof form.getGroupedErrorsForPath === "function") return form.getGroupedErrorsForPath(props.name) || [];
			if (!nestedFieldNames.value.length) return [];
			const errorMap = form.getErrorMapFields() || {};
			const groupedErrors = [];
			nestedFieldNames.value.forEach((fieldPath) => {
				(errorMap[fieldPath] || []).forEach((message) => {
					groupedErrors.push(formatWrapperMessage(String(message), props.label || props.name || fieldName.value));
				});
				Object.entries(errorMap).forEach(([errorPath, messages]) => {
					if (!errorPath.startsWith(`${fieldPath}.`)) return;
					(messages || []).forEach((message) => {
						groupedErrors.push(formatWrapperMessage(String(message), props.label || props.name || fieldName.value));
					});
				});
			});
			return Array.from(new Set(groupedErrors));
		});
		return () => h(FieldLayout, {
			name: fieldName.value,
			label: props.label,
			instructions: props.instructions,
			required: props.required,
			warning: props.warning,
			errors: errors.value
		}, { default: () => h("div", {
			"data-pk-field-wrap-controls": "",
			style: {
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				gap: "0.5rem"
			}
		}, slots.default?.() ?? []) });
	}
}), { usesSchemaNode: true });
//#endregion
export { FieldWrap };

//# sourceMappingURL=FieldWrap.js.map