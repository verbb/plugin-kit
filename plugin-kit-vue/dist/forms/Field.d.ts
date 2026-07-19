import { PropType, VNodeChild } from 'vue';
export type FieldLayoutProps = {
    name: string;
    label?: string;
    instructions?: string;
    warning?: string;
    tip?: string;
    required?: boolean;
    translatable?: boolean;
    errors?: string[];
    headerEnd?: VNodeChild;
    class?: unknown;
    style?: unknown;
};
/**
 * Schema-form field shell. Label, instructions, warnings, and errors stay owned by
 * `<pk-field>` so Vue SchemaForm remains a thin facade over canonical WC chrome.
 */
export declare const FieldLayout: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    warning: {
        type: StringConstructor;
        default: undefined;
    };
    tip: {
        type: StringConstructor;
        default: undefined;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    translatable: {
        type: BooleanConstructor;
        default: boolean;
    };
    errors: {
        type: PropType<string[]>;
        default: () => never[];
    };
    headerEnd: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    style: {
        type: PropType<unknown>;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    warning: {
        type: StringConstructor;
        default: undefined;
    };
    tip: {
        type: StringConstructor;
        default: undefined;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    translatable: {
        type: BooleanConstructor;
        default: boolean;
    };
    errors: {
        type: PropType<string[]>;
        default: () => never[];
    };
    headerEnd: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
    class: {
        type: PropType<unknown>;
        default: undefined;
    };
    style: {
        type: PropType<unknown>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    label: string;
    style: undefined;
    class: undefined;
    required: boolean;
    instructions: string;
    warning: string;
    tip: string;
    translatable: boolean;
    errors: string[];
    headerEnd: VNodeChild;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Field.d.ts.map