import { PropType } from 'vue';
import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormEngineApi } from '../engine/context.js';
/**
 * SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
 * Pair schema `warning` for plugin-owned existence checks (paths, aliases, etc.).
 */
export declare const AutocompleteField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
    field: {
        type: PropType<SchemaNode & {
            name: string;
        }>;
        required: true;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    form: {
        type: PropType<SchemaFormEngineApi>;
        required: true;
    };
    field: {
        type: PropType<SchemaNode & {
            name: string;
        }>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=AutocompleteField.d.ts.map