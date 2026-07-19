import { PropType } from 'vue';
import { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web';
export type SpinnerProps = {
    variant?: PkSpinnerVariant;
    size?: PkSpinnerSize;
    tone?: PkSpinnerTone;
    centered?: boolean;
};
/** Vue facade over `<pk-spinner>`. Behavior and styles live in the web component. */
export declare const Spinner: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkSpinnerVariant>;
        default: string;
    };
    size: {
        type: PropType<PkSpinnerSize>;
        default: string;
    };
    tone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkSpinnerVariant>;
        default: string;
    };
    size: {
        type: PropType<PkSpinnerSize>;
        default: string;
    };
    tone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: PkSpinnerSize;
    variant: PkSpinnerVariant;
    tone: PkSpinnerTone;
    centered: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkSpinnerElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkSpinnerVariant>;
        default: string;
    };
    size: {
        type: PropType<PkSpinnerSize>;
        default: string;
    };
    tone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    variant: {
        type: PropType<PkSpinnerVariant>;
        default: string;
    };
    size: {
        type: PropType<PkSpinnerSize>;
        default: string;
    };
    tone: {
        type: PropType<PkSpinnerTone>;
        default: undefined;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: PkSpinnerSize;
    variant: PkSpinnerVariant;
    tone: PkSpinnerTone;
    centered: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=Spinner.d.ts.map