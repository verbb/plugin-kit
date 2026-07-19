import { Separator } from "../components/Separator.js";
import { FieldWrap } from "./components/FieldWrap.js";
import { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger } from "./components/ModalTabs.js";
//#region src/forms/registry.ts
var customFormFieldRegistry = {};
var loadedBuiltinFormFieldCache = {};
var formComponentRegistry = {
	FieldWrap,
	ModalTabs,
	ModalTabsList,
	ModalTabsTrigger,
	ModalTabsContent,
	Separator
};
var registerFormField = (name, component) => {
	customFormFieldRegistry[name] = component;
};
var registerFormFields = (fields) => {
	Object.assign(customFormFieldRegistry, fields);
};
var registerFormComponent = (name, component) => {
	formComponentRegistry[name] = component;
};
var registerFormComponents = (components) => {
	Object.assign(formComponentRegistry, components);
};
var cacheLoadedBuiltinFormField = (name, component) => {
	loadedBuiltinFormFieldCache[name] = component;
};
var getRegisteredFormField = (name) => {
	return customFormFieldRegistry[name] ?? loadedBuiltinFormFieldCache[name];
};
var getFormFieldRegistry = () => {
	return {
		...loadedBuiltinFormFieldCache,
		...customFormFieldRegistry
	};
};
var getFormComponentRegistry = () => {
	return formComponentRegistry;
};
//#endregion
export { cacheLoadedBuiltinFormField, getFormComponentRegistry, getFormFieldRegistry, getRegisteredFormField, registerFormComponent, registerFormComponents, registerFormField, registerFormFields };

//# sourceMappingURL=registry.js.map