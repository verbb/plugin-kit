import { PropType } from 'vue';
import { SchemaFormComponentProps } from '../engine/context.js';
/**
 * Schema `$cmp: 'FieldWrap'` labels a control cluster and promotes nested errors
 * onto the wrapper, matching the v1/Formie field-wrap contract.
 */
export declare const FieldWrap: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        name: {
            type: StringConstructor;
            default: undefined;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        instructions: {
            type: StringConstructor;
            default: undefined;
        };
        required: {
            type: BooleanConstructor;
            default: boolean;
        };
        warning: {
            type: StringConstructor;
            default: undefined;
        };
        schemaNode: {
            type: PropType<SchemaFormComponentProps["schemaNode"]>;
            default: undefined;
        };
    }>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
        name: string;
        label: string;
        required: boolean;
        instructions: string;
        warning: string;
        schemaNode: import('@verbb/plugin-kit-forms').SchemaNode | undefined;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        name: {
            type: StringConstructor;
            default: undefined;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        instructions: {
            type: StringConstructor;
            default: undefined;
        };
        required: {
            type: BooleanConstructor;
            default: boolean;
        };
        warning: {
            type: StringConstructor;
            default: undefined;
        };
        schemaNode: {
            type: PropType<SchemaFormComponentProps["schemaNode"]>;
            default: undefined;
        };
    }>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, {
        name: string;
        label: string;
        required: boolean;
        instructions: string;
        warning: string;
        schemaNode: import('@verbb/plugin-kit-forms').SchemaNode | undefined;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    warning: {
        type: StringConstructor;
        default: undefined;
    };
    schemaNode: {
        type: PropType<SchemaFormComponentProps["schemaNode"]>;
        default: undefined;
    };
}>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    name: string;
    label: string;
    required: boolean;
    instructions: string;
    warning: string;
    schemaNode: import('@verbb/plugin-kit-forms').SchemaNode | undefined;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & {
    usesSchemaNode: true;
};
//# sourceMappingURL=FieldWrap.d.ts.map