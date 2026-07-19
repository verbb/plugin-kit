import { PropType } from 'vue';
import { SchemaIndex, SchemaNode } from '@verbb/plugin-kit-forms';
import { FormValues, SchemaFormEngineApi } from './engine/context.js';
type SchemaFormEngineErrors = Record<string, unknown> | {
    errors?: unknown;
} | unknown[];
type SchemaFormEngineOptions = {
    schemaIndex: SchemaIndex | null;
    defaultValues?: FormValues;
    errors?: SchemaFormEngineErrors;
    onChange?: (values: Record<string, unknown>, form: SchemaFormEngineApi) => void;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
    parentForm?: SchemaFormEngineApi | null;
    parentPath?: string;
};
export declare const useSchemaFormEngine: ({ schemaIndex, defaultValues, errors, onChange, getConditionContext, parentForm, parentPath, }: SchemaFormEngineOptions) => SchemaFormEngineApi;
export declare const SchemaFormEngine: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    withoutForm: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    withoutForm: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    class: undefined;
    withoutForm: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export {};
//# sourceMappingURL=SchemaFormEngine.d.ts.map