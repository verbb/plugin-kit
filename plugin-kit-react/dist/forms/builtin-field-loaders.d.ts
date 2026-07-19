import { SchemaFormFieldComponent } from './engine/context.js';
type BuiltinFieldLoader = () => Promise<SchemaFormFieldComponent>;
/**
 * Built-in SchemaForm `$field` types load on first render so CP bundles only pay for
 * field modules that appear in the active schema (e.g. no CodeMirror until `codeEditor`).
 */
export declare const builtinFormFieldLoaders: Record<string, BuiltinFieldLoader>;
export declare const isBuiltinFormFieldType: (name: string) => boolean;
export declare const loadBuiltinFormField: (name: string) => Promise<SchemaFormFieldComponent | null>;
export {};
//# sourceMappingURL=builtin-field-loaders.d.ts.map