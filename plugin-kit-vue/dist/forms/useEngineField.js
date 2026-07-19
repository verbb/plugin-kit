import { computed, onBeforeUnmount, ref } from "vue";
//#region src/forms/useEngineField.ts
var EMPTY_ERRORS = [];
var useEngineField = (form, name) => {
	const version = ref(0);
	onBeforeUnmount(form.store.subscribe(() => {
		version.value += 1;
	}));
	const value = computed(() => {
		version.value;
		return form.getFieldValue(name);
	});
	const errors = computed(() => {
		version.value;
		return form.getErrorMapFields()[name] || EMPTY_ERRORS;
	});
	const setValue = (nextValue) => {
		form.setFieldValue(name, nextValue);
	};
	const setTouched = () => {
		form.store.setTouched(name, true);
	};
	return {
		value,
		errors,
		isInvalid: computed(() => errors.value.length > 0),
		setValue,
		setTouched
	};
};
//#endregion
export { useEngineField };

//# sourceMappingURL=useEngineField.js.map