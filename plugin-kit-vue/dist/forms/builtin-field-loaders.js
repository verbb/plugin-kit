//#region src/forms/builtin-field-loaders.ts
/**
* Built-in SchemaForm `$field` types load on first render so Vue CP bundles only
* pay for field facades that appear in the active schema.
*/
var builtinFormFieldLoaders = {
	text: async () => (await import("./fields/TextField.js")).TextField,
	textarea: async () => (await import("./fields/TextareaField.js")).TextareaField,
	number: async () => (await import("./fields/NumberField.js")).NumberField,
	select: async () => (await import("./fields/SelectField.js")).SelectField,
	lightswitch: async () => (await import("./fields/LightswitchField.js")).LightswitchField,
	color: async () => (await import("./fields/ColorField.js")).ColorField,
	radioGroup: async () => (await import("./fields/RadioGroupField.js")).RadioGroupField,
	checkboxSelect: async () => (await import("./fields/CheckboxSelectField.js")).CheckboxSelectField,
	combobox: async () => (await import("./fields/ComboboxField.js")).ComboboxField,
	group: async () => (await import("./fields/GroupField.js")).GroupField,
	date: async () => (await import("./fields/DateTimeField.js")).DateTimeField,
	codeEditor: async () => (await import("./fields/CodeEditorField.js")).CodeEditorField
};
var isBuiltinFormFieldType = (name) => {
	return Object.prototype.hasOwnProperty.call(builtinFormFieldLoaders, name);
};
var loadBuiltinFormField = async (name) => {
	const loader = builtinFormFieldLoaders[name];
	if (!loader) return null;
	return loader();
};
//#endregion
export { isBuiltinFormFieldType, loadBuiltinFormField };

//# sourceMappingURL=builtin-field-loaders.js.map