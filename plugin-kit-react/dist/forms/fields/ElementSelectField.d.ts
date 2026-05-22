import { SchemaFormEngineApi } from '../engine/context';
type ElementSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        elementType?: string;
        sources?: string[];
        criteria?: Record<string, unknown>;
        limit?: number;
        elementSelectOptionsAction?: string;
        elementSelectStorageKeyPrefix?: string;
    };
};
export declare const ElementSelectField: ({ form, field }: ElementSelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ElementSelectField.d.ts.map