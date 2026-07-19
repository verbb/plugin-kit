import { PropType, VNodeChild } from 'vue';
export type RadioGroupInputOption = {
    value: unknown;
    label: VNodeChild;
    disabled?: boolean;
};
export type RadioGroupInputProps = {
    modelValue?: unknown;
    options: RadioGroupInputOption[];
    disabled?: boolean;
    invalid?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    instructions?: string;
    'aria-label'?: string;
};
/**
 * Convenience facade over `<pk-radio-group>` with an `options[]` array plus `v-model`,
 * instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
 */
export declare const RadioGroupInput: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: string;
    };
    options: {
        type: PropType<RadioGroupInputOption[]>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    orientation: {
        type: PropType<RadioGroupInputProps["orientation"]>;
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
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:modelValue': (value: unknown) => value is {} | null;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: string;
    };
    options: {
        type: PropType<RadioGroupInputOption[]>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    orientation: {
        type: PropType<RadioGroupInputProps["orientation"]>;
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
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: unknown) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    label: string;
    disabled: boolean;
    instructions: string;
    modelValue: string | number | boolean;
    ariaLabel: string;
    orientation: "horizontal" | "vertical" | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkRadioGroupInputElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: string;
    };
    options: {
        type: PropType<RadioGroupInputOption[]>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    orientation: {
        type: PropType<RadioGroupInputProps["orientation"]>;
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
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:modelValue': (value: unknown) => value is {} | null;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: string;
    };
    options: {
        type: PropType<RadioGroupInputOption[]>;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    orientation: {
        type: PropType<RadioGroupInputProps["orientation"]>;
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
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: unknown) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    label: string;
    disabled: boolean;
    instructions: string;
    modelValue: string | number | boolean;
    ariaLabel: string;
    orientation: "horizontal" | "vertical" | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=RadioGroupInput.d.ts.map