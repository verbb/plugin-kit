import { PropType, VNodeChild } from 'vue';
import { CheckboxProps } from './Checkbox.js';
export type CheckboxInputProps = CheckboxProps & {
    label: VNodeChild;
    description?: VNodeChild;
};
/**
 * Convenience facade pairing `<pk-checkbox>` with a label + optional description,
 * mirroring `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>`
 * (no utility CSS) — the checkbox itself is styled inside the web component shadow root.
 */
export declare const CheckboxInput: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    label: {
        type: PropType<VNodeChild>;
        required: true;
    };
    description: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
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
    label: {
        type: PropType<VNodeChild>;
        required: true;
    };
    description: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
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
    description: VNodeChild;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkCheckboxInputElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    label: {
        type: PropType<VNodeChild>;
        required: true;
    };
    description: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
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
    label: {
        type: PropType<VNodeChild>;
        required: true;
    };
    description: {
        type: PropType<VNodeChild>;
        default: undefined;
    };
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
    description: VNodeChild;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=CheckboxInput.d.ts.map