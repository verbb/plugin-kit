import { computed, onBeforeUnmount, ref } from "vue";
import { evaluateCondition } from "@verbb/plugin-kit-forms";
//#region src/forms/fields/options.ts
var useFilteredOptions = (form, field) => {
	const version = ref(0);
	onBeforeUnmount(form.store.subscribe(() => {
		version.value += 1;
	}));
	return computed(() => {
		version.value;
		const scopePath = typeof field._scopePath === "string" ? field._scopePath : "";
		const scopedValues = scopePath ? form.getFieldValue(scopePath) : null;
		const scopedObject = scopedValues && typeof scopedValues === "object" && !Array.isArray(scopedValues) ? scopedValues : {};
		const fieldData = field._data && typeof field._data === "object" ? field._data : {};
		const conditionData = {
			...form.store.state.values || {},
			...scopedObject,
			...fieldData
		};
		return (Array.isArray(field.options) ? field.options : []).filter((option) => {
			if (!option?.if) return true;
			return evaluateCondition(option.if, conditionData);
		});
	});
};
//#endregion
export { useFilteredOptions };

//# sourceMappingURL=options.js.map