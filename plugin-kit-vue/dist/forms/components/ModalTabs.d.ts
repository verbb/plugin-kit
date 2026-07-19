import { Ref, PropType } from 'vue';
import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormComponentProps } from '../engine/context.js';
export declare const useModalTabsErrors: () => Ref<Record<string, boolean>>;
/**
 * Schema `$cmp: 'ModalTabs'` wraps stock `Tabs variant="modal"` and keeps tab
 * error markers in sync with the shared SchemaForm store.
 */
export declare const ModalTabs: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        schemaNode: {
            type: PropType<SchemaFormComponentProps["schemaNode"]>;
            default: undefined;
        };
        class: {
            type: PropType<unknown>;
            default: undefined;
        };
        value: {
            type: StringConstructor;
            default: undefined;
        };
        defaultValue: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
        class: undefined;
        value: string;
        schemaNode: SchemaNode | undefined;
        defaultValue: string;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        schemaNode: {
            type: PropType<SchemaFormComponentProps["schemaNode"]>;
            default: undefined;
        };
        class: {
            type: PropType<unknown>;
            default: undefined;
        };
        value: {
            type: StringConstructor;
            default: undefined;
        };
        defaultValue: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, {
        class: undefined;
        value: string;
        schemaNode: SchemaNode | undefined;
        defaultValue: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    schemaNode: {
        type: PropType<SchemaFormComponentProps["schemaNode"]>;
        default: undefined;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: undefined;
    };
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    class: undefined;
    value: string;
    schemaNode: SchemaNode | undefined;
    defaultValue: string;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & {
    usesSchemaNode: true;
};
export declare const ModalTabsList: import('vue').DefineComponent<{}, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const ModalTabsTrigger: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: undefined;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: undefined;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    class: undefined;
    value: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const ModalTabsContent: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    class: undefined;
    value: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=ModalTabs.d.ts.map