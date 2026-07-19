import { ComputedRef } from 'vue';
import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormEngineApi } from '../engine/context.js';
export type ConditionalOption = {
    value: unknown;
    label: string;
    description?: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};
export declare const useFilteredOptions: (form: SchemaFormEngineApi, field: SchemaNode) => ComputedRef<ConditionalOption[]>;
//# sourceMappingURL=options.d.ts.map