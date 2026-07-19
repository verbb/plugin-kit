import { PropType } from 'vue';
export type CheckboxProps = {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    'data-state'?: 'focus-visible';
};
/** Vue facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
export declare const Checkbox: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    dataState: {
        type: PropType<CheckboxProps["data-state"]>;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:checked': (value: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    dataState: {
        type: PropType<CheckboxProps["data-state"]>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    value: string;
    indeterminate: boolean;
    dataState: "focus-visible" | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkCheckboxElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    dataState: {
        type: PropType<CheckboxProps["data-state"]>;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:checked': (value: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    dataState: {
        type: PropType<CheckboxProps["data-state"]>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    value: string;
    indeterminate: boolean;
    dataState: "focus-visible" | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Checkbox.d.ts.map