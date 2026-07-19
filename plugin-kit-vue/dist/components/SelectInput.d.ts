import { PropType } from 'vue';
import { PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';
export type SelectInputOption = {
    value: unknown;
    label: string;
    disabled?: boolean;
    status?: string;
};
export type SelectInputOptionGroup = {
    group: string;
    options: SelectInputOption[];
};
export type SelectInputProps = {
    options: Array<SelectInputOption | SelectInputOptionGroup>;
    modelValue?: unknown;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    size?: PkSelectSize;
    /** When `full`, stretch the select host to the available width (table cells). */
    width?: 'full';
    name?: string;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
};
/**
 * Convenience facade over `<pk-select>` matching React `SelectInput` ergonomics:
 * an `options[]` array plus `v-model`, instead of slotted `<pk-option>` children.
 *
 * `pk-select` is string-valued, so option values are stringified for the element and
 * mapped back to their original value on `pk-change`.
 */
export declare const SelectInput: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<Array<SelectInputOption | SelectInputOptionGroup>>;
        required: true;
    };
    modelValue: {
        type: PropType<unknown>;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkSelectSize>;
        default: undefined;
    };
    width: {
        type: PropType<"full">;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    ariaDescribedby: {
        type: StringConstructor;
        default: undefined;
    };
    ariaErrormessage: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabelledby: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:modelValue': (value: unknown) => value is {} | null;
    blur: (event: Event) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<Array<SelectInputOption | SelectInputOptionGroup>>;
        required: true;
    };
    modelValue: {
        type: PropType<unknown>;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkSelectSize>;
        default: undefined;
    };
    width: {
        type: PropType<"full">;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    ariaDescribedby: {
        type: StringConstructor;
        default: undefined;
    };
    ariaErrormessage: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabelledby: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onBlur?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: unknown) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkSelectSize;
    disabled: boolean;
    modelValue: undefined;
    placeholder: string;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
    clearable: boolean;
    width: "full";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkSelectInputElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<Array<SelectInputOption | SelectInputOptionGroup>>;
        required: true;
    };
    modelValue: {
        type: PropType<unknown>;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkSelectSize>;
        default: undefined;
    };
    width: {
        type: PropType<"full">;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    ariaDescribedby: {
        type: StringConstructor;
        default: undefined;
    };
    ariaErrormessage: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabelledby: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    'update:modelValue': (value: unknown) => value is {} | null;
    blur: (event: Event) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<Array<SelectInputOption | SelectInputOptionGroup>>;
        required: true;
    };
    modelValue: {
        type: PropType<unknown>;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkSelectSize>;
        default: undefined;
    };
    width: {
        type: PropType<"full">;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    ariaDescribedby: {
        type: StringConstructor;
        default: undefined;
    };
    ariaErrormessage: {
        type: StringConstructor;
        default: undefined;
    };
    ariaLabelledby: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onBlur?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: unknown) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkSelectSize;
    disabled: boolean;
    modelValue: undefined;
    placeholder: string;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
    clearable: boolean;
    width: "full";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=SelectInput.d.ts.map