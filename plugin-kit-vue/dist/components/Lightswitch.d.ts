import { PropType } from 'vue';
export type LightswitchProps = {
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    label?: string;
    instructions?: string;
    size?: 'default' | 'sm' | 'xs' | 'xxs';
};
/** Vue facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
export declare const Lightswitch: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    checked: {
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
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<LightswitchProps["size"]>;
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
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<LightswitchProps["size"]>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    label: string;
    size: "default" | "sm" | "xs" | "xxs" | undefined;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    value: string;
    instructions: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkLightswitchElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    checked: {
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
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<LightswitchProps["size"]>;
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
    label: {
        type: StringConstructor;
        default: undefined;
    };
    instructions: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<LightswitchProps["size"]>;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    label: string;
    size: "default" | "sm" | "xs" | "xxs" | undefined;
    checked: boolean;
    disabled: boolean;
    required: boolean;
    value: string;
    instructions: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export type { PkLightswitchSize } from '@verbb/plugin-kit-web';
//# sourceMappingURL=Lightswitch.d.ts.map