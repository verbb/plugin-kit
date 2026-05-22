import { TextField } from "./fields/TextField.js";
import { TextareaField } from "./fields/TextareaField.js";
import { NumberField } from "./fields/NumberField.js";
import { SelectField } from "./fields/SelectField.js";
import { LightswitchField } from "./fields/LightswitchField.js";
import { HandleField } from "./fields/HandleField.js";
import { ListField } from "./fields/ListField.js";
import { EditableTableField } from "./fields/EditableTableField.js";
import { DateTimeField } from "./fields/DateTimeField.js";
import { RichTextField } from "./fields/RichTextField.js";
import { VariablePickerField } from "./fields/VariablePickerField.js";
import { CalculationsField } from "./fields/CalculationsField.js";
import { ElementSelectField } from "./fields/ElementSelectField.js";
import { ColorField } from "./fields/ColorField.js";
import { CheckboxSelectField } from "./fields/CheckboxSelectField.js";
import { ComboboxField } from "./fields/ComboboxField.js";
import { GroupField } from "./fields/GroupField.js";
import { StaticTableField } from "./fields/StaticTableField.js";
import { RadioGroupField } from "./fields/RadioGroupField.js";
import { FieldWrap } from "./components/FieldWrap.js";
import { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger } from "./components/ModalTabs.js";
import "./components/index.js";
//#region src/forms/registry.ts
var hmrData = {};
var formFieldRegistry = {
	text: TextField,
	textarea: TextareaField,
	number: NumberField,
	select: SelectField,
	lightswitch: LightswitchField,
	handle: HandleField,
	list: ListField,
	table: EditableTableField,
	date: DateTimeField,
	richText: RichTextField,
	variablePicker: VariablePickerField,
	calculations: CalculationsField,
	elementSelect: ElementSelectField,
	color: ColorField,
	checkboxSelect: CheckboxSelectField,
	combobox: ComboboxField,
	radioGroup: RadioGroupField,
	group: GroupField,
	staticTable: StaticTableField,
	...hmrData.fields ?? {}
};
var formComponentRegistry = {
	FieldWrap,
	ModalTabs,
	ModalTabsList,
	ModalTabsTrigger,
	ModalTabsContent,
	...hmrData.components ?? {}
};
var registerFormField = (name, component) => {
	formFieldRegistry[name] = component;
};
var registerFormFields = (fields) => {
	Object.assign(formFieldRegistry, fields);
};
var registerFormComponent = (name, component) => {
	formComponentRegistry[name] = component;
};
var registerFormComponents = (components) => {
	Object.assign(formComponentRegistry, components);
};
var getFormFieldRegistry = () => {
	return formFieldRegistry;
};
var getFormComponentRegistry = () => {
	return formComponentRegistry;
};
//#endregion
export { getFormComponentRegistry, getFormFieldRegistry, registerFormComponent, registerFormComponents, registerFormField, registerFormFields };

//# sourceMappingURL=registry.js.map