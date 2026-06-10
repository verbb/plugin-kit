import type { SchemaFormComponent, SchemaFormFieldComponent } from './engine/context';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { NumberField } from './fields/NumberField';
import { SelectField } from './fields/SelectField';
import { LightswitchField } from './fields/LightswitchField';
import { HandleField } from './fields/HandleField';
import { ListField } from './fields/ListField';
import { EditableTableField } from './fields/EditableTableField';
import { DateTimeField } from './fields/DateTimeField';
import { RichTextField } from './fields/RichTextField';
import { CodeEditorField } from './fields/CodeEditorField';
import { VariablePickerField } from './fields/VariablePickerField';
import { CalculationsField } from './fields/CalculationsField';
import { ElementSelectField } from './fields/ElementSelectField';
import { ColorField } from './fields/ColorField';
import { CheckboxSelectField } from './fields/CheckboxSelectField';
import { ComboboxField } from './fields/ComboboxField';
import { GroupField } from './fields/GroupField';
import { StaticTableField } from './fields/StaticTableField';
import { RadioGroupField } from './fields/RadioGroupField';
import {
    FieldWrap,
    ModalTabs,
    ModalTabsContent,
    ModalTabsList,
    ModalTabsTrigger,
} from './components';

type RegistryHotData = {
    formRegistry?: {
        fields?: Record<string, SchemaFormFieldComponent>;
        components?: Record<string, SchemaFormComponent>;
    };
};

const hmrData = (import.meta.hot?.data as RegistryHotData | undefined)?.formRegistry ?? {};
const formFieldRegistry: Record<string, SchemaFormFieldComponent> = {
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
    codeEditor: CodeEditorField,
    variablePicker: VariablePickerField,
    calculations: CalculationsField,
    elementSelect: ElementSelectField,
    color: ColorField,
    checkboxSelect: CheckboxSelectField,
    combobox: ComboboxField,
    radioGroup: RadioGroupField,
    group: GroupField,
    staticTable: StaticTableField,
    ...(hmrData.fields ?? {}),
};

const formComponentRegistry: Record<string, SchemaFormComponent> = {
    FieldWrap,
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
    ...(hmrData.components ?? {}),
};

if (import.meta.hot) {
    import.meta.hot.dispose((data: RegistryHotData) => {
        data.formRegistry = {
            fields: formFieldRegistry,
            components: formComponentRegistry,
        };
    });
}

export const registerFormField = (name: string, component: SchemaFormFieldComponent): void => {
    formFieldRegistry[name] = component;
};

export const registerFormFields = (fields: Record<string, SchemaFormFieldComponent>): void => {
    Object.assign(formFieldRegistry, fields);
};

export const registerFormComponent = (name: string, component: SchemaFormComponent): void => {
    formComponentRegistry[name] = component;
};

export const registerFormComponents = (components: Record<string, SchemaFormComponent>): void => {
    Object.assign(formComponentRegistry, components);
};

export const getFormFieldRegistry = (): Record<string, SchemaFormFieldComponent> => { return formFieldRegistry; };

export const getFormComponentRegistry = (): Record<string, SchemaFormComponent> => { return formComponentRegistry; };
