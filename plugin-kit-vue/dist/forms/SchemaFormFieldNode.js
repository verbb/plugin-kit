import { cacheLoadedBuiltinFormField, getRegisteredFormField } from "./registry.js";
import { isBuiltinFormFieldType, loadBuiltinFormField } from "./builtin-field-loaders.js";
import { defineComponent, h, onMounted, ref, watch } from "vue";
//#region src/forms/SchemaFormFieldNode.ts
var SchemaFormFieldNode = defineComponent({
	name: "SchemaFormFieldNode",
	props: {
		fieldType: {
			type: String,
			required: true
		},
		schema: {
			type: Object,
			required: true
		},
		field: {
			type: Object,
			required: true
		},
		form: {
			type: Object,
			required: true
		}
	},
	setup(props, { slots }) {
		const component = ref(getRegisteredFormField(props.fieldType) ?? null);
		const loadFailed = ref(false);
		const loadComponent = async (fieldType) => {
			const registeredField = getRegisteredFormField(fieldType);
			if (registeredField) {
				component.value = registeredField;
				loadFailed.value = false;
				return;
			}
			if (!isBuiltinFormFieldType(fieldType)) {
				console.warn(`Unknown form field type: ${fieldType}`);
				component.value = null;
				loadFailed.value = true;
				return;
			}
			loadFailed.value = false;
			try {
				const loaded = await loadBuiltinFormField(fieldType);
				if (!loaded || fieldType !== props.fieldType) return;
				cacheLoadedBuiltinFormField(fieldType, loaded);
				component.value = loaded;
			} catch (error) {
				if (fieldType !== props.fieldType) return;
				console.error(`Failed to load form field "${fieldType}":`, error);
				component.value = null;
				loadFailed.value = true;
			}
		};
		onMounted(() => {
			loadComponent(props.fieldType);
		});
		watch(() => props.fieldType, (fieldType) => {
			loadComponent(fieldType);
		});
		return () => {
			if (loadFailed.value || !component.value) return null;
			return h(component.value, {
				schema: props.schema,
				field: props.field,
				form: props.form
			}, slots);
		};
	}
});
//#endregion
export { SchemaFormFieldNode };

//# sourceMappingURL=SchemaFormFieldNode.js.map