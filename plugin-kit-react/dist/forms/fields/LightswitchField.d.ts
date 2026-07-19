import { SchemaFormEngineApi } from '../engine/context.js';
type LightswitchFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
    };
};
export declare const LightswitchField: ({ form, field }: LightswitchFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LightswitchField.d.ts.map