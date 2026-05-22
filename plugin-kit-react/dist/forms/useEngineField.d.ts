import { SchemaFormEngineApi } from './engine/context';
export declare const useEngineField: (form: SchemaFormEngineApi, name: string) => {
    value: unknown;
    errors: string[];
    isInvalid: boolean;
    setValue: (nextValue: unknown) => void;
    setTouched: () => void;
};
//# sourceMappingURL=useEngineField.d.ts.map