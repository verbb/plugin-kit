import { PropType } from 'vue';
import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormEngineApi } from './engine/context.js';
export declare const SchemaFormFieldNode: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    fieldType: {
        type: StringConstructor;
        required: true;
    };
    schema: {
        type: PropType<SchemaNode>;
        required: true;
    };
    field: {
        type: PropType<SchemaNode>;
        required: true;
    };
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | null, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    fieldType: {
        type: StringConstructor;
        required: true;
    };
    schema: {
        type: PropType<SchemaNode>;
        required: true;
    };
    field: {
        type: PropType<SchemaNode>;
        required: true;
    };
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=SchemaFormFieldNode.d.ts.map