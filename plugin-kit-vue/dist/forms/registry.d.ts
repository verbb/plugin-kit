import { SchemaFormComponent, SchemaFormFieldComponent } from './engine/context.js';
export declare const registerFormField: (name: string, component: SchemaFormFieldComponent) => void;
export declare const registerFormFields: (fields: Record<string, SchemaFormFieldComponent>) => void;
export declare const registerFormComponent: (name: string, component: SchemaFormComponent) => void;
export declare const registerFormComponents: (components: Record<string, SchemaFormComponent>) => void;
export declare const cacheLoadedBuiltinFormField: (name: string, component: SchemaFormFieldComponent) => void;
export declare const getRegisteredFormField: (name: string) => SchemaFormFieldComponent | undefined;
export declare const getFormFieldRegistry: () => Record<string, SchemaFormFieldComponent>;
export declare const getFormComponentRegistry: () => Record<string, SchemaFormComponent>;
//# sourceMappingURL=registry.d.ts.map