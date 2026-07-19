import { PropType } from 'vue';
import { PkButtonSize, PkButtonVariant, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web';
export type ButtonProps = {
    variant?: PkButtonVariant;
    size?: PkButtonSize;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    spinnerVariant?: PkSpinnerVariant;
    spinnerTone?: PkSpinnerTone;
    'data-state'?: 'hover' | 'focus-visible' | 'active';
    withCaret?: boolean;
    groupTrigger?: boolean;
};
/** Vue facade over `<pk-button>`. Behavior and styles live in the web component. */
export declare const Button: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkButtonVariant>;
        default: string;
    };
    size: {
        type: PropType<PkButtonSize>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
    };
    spinnerVariant: {
        type: PropType<PkSpinnerVariant>;
        default: undefined;
    };
    spinnerTone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    dataState: {
        type: PropType<ButtonProps["data-state"]>;
        default: undefined;
    };
    withCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    groupTrigger: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkButtonVariant>;
        default: string;
    };
    size: {
        type: PropType<PkButtonSize>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
    };
    spinnerVariant: {
        type: PropType<PkSpinnerVariant>;
        default: undefined;
    };
    spinnerTone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    dataState: {
        type: PropType<ButtonProps["data-state"]>;
        default: undefined;
    };
    withCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    groupTrigger: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: PkButtonSize;
    type: "reset" | "submit" | "button";
    disabled: boolean;
    dataState: "focus-visible" | "active" | "hover" | undefined;
    variant: PkButtonVariant;
    loading: boolean;
    spinnerVariant: PkSpinnerVariant;
    spinnerTone: PkSpinnerTone;
    withCaret: boolean;
    groupTrigger: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkButtonElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkButtonVariant>;
        default: string;
    };
    size: {
        type: PropType<PkButtonSize>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
    };
    spinnerVariant: {
        type: PropType<PkSpinnerVariant>;
        default: undefined;
    };
    spinnerTone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    dataState: {
        type: PropType<ButtonProps["data-state"]>;
        default: undefined;
    };
    withCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    groupTrigger: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkButtonVariant>;
        default: string;
    };
    size: {
        type: PropType<PkButtonSize>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
    };
    spinnerVariant: {
        type: PropType<PkSpinnerVariant>;
        default: undefined;
    };
    spinnerTone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    dataState: {
        type: PropType<ButtonProps["data-state"]>;
        default: undefined;
    };
    withCaret: {
        type: BooleanConstructor;
        default: boolean;
    };
    groupTrigger: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: PkButtonSize;
    type: "reset" | "submit" | "button";
    disabled: boolean;
    dataState: "focus-visible" | "active" | "hover" | undefined;
    variant: PkButtonVariant;
    loading: boolean;
    spinnerVariant: PkSpinnerVariant;
    spinnerTone: PkSpinnerTone;
    withCaret: boolean;
    groupTrigger: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Button.d.ts.map