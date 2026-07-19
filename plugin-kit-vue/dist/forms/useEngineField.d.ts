import { ComputedRef } from 'vue';
import { SchemaFormEngineApi } from './engine/context.js';
export type EngineFieldBinding = {
    value: ComputedRef<unknown>;
    errors: ComputedRef<string[]>;
    isInvalid: ComputedRef<boolean>;
    setValue: (nextValue: unknown) => void;
    setTouched: () => void;
};
export declare const useEngineField: (form: SchemaFormEngineApi, name: string) => EngineFieldBinding;
//# sourceMappingURL=useEngineField.d.ts.map