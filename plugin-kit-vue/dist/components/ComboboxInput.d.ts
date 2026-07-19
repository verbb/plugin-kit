import { PropType } from 'vue';
import { PkComboboxSize } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
export type ComboboxInputOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
};
export type ComboboxFetchOptions = (query: string, signal?: AbortSignal) => Promise<ComboboxInputOption[]>;
export type ComboboxInputModelValue = string | number | Array<string | number> | null;
export type ComboboxInputProps = {
    options?: ComboboxInputOption[];
    fetchOptions?: ComboboxFetchOptions;
    modelValue?: ComboboxInputModelValue;
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    startTypingMessage?: string;
    /** Maps to `pk-combobox` `clearable` (React convenience name: `showClear`). */
    showClear?: boolean;
    invalid?: boolean;
    size?: PkComboboxSize;
    allowCreate?: boolean;
    name?: string;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
};
/**
 * Convenience facade over `<pk-combobox>` mirroring React `ComboboxInput`:
 * `options[]` (or `fetchOptions` for async search), `v-model`, and `multiple`.
 *
 * `pk-combobox` is string-valued, so values are stringified for the element and mapped
 * back to their original option value on `pk-change`.
 */
export declare const ComboboxInput: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<ComboboxInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<ComboboxFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<ComboboxInputModelValue>;
        default: null;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    loadingMessage: {
        type: StringConstructor;
        default: string;
    };
    startTypingMessage: {
        type: StringConstructor;
        default: string;
    };
    showClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkComboboxSize>;
        default: undefined;
    };
    allowCreate: {
        type: BooleanConstructor;
        default: boolean;
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
    'update:modelValue': (value: ComboboxInputModelValue) => boolean;
    create: (query: string) => boolean;
    openChange: (open: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<ComboboxInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<ComboboxFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<ComboboxInputModelValue>;
        default: null;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    loadingMessage: {
        type: StringConstructor;
        default: string;
    };
    startTypingMessage: {
        type: StringConstructor;
        default: string;
    };
    showClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkComboboxSize>;
        default: undefined;
    };
    allowCreate: {
        type: BooleanConstructor;
        default: boolean;
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
    "onUpdate:modelValue"?: ((value: ComboboxInputModelValue) => any) | undefined;
    onCreate?: ((query: string) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkComboboxSize;
    disabled: boolean;
    options: ComboboxInputOption[];
    fetchOptions: ComboboxFetchOptions;
    modelValue: ComboboxInputModelValue;
    multiple: boolean;
    placeholder: string;
    emptyMessage: string;
    loadingMessage: string;
    startTypingMessage: string;
    showClear: boolean;
    allowCreate: boolean;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkComboboxInputElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<ComboboxInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<ComboboxFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<ComboboxInputModelValue>;
        default: null;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    loadingMessage: {
        type: StringConstructor;
        default: string;
    };
    startTypingMessage: {
        type: StringConstructor;
        default: string;
    };
    showClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkComboboxSize>;
        default: undefined;
    };
    allowCreate: {
        type: BooleanConstructor;
        default: boolean;
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
    'update:modelValue': (value: ComboboxInputModelValue) => boolean;
    create: (query: string) => boolean;
    openChange: (open: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<ComboboxInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<ComboboxFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<ComboboxInputModelValue>;
        default: null;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    emptyMessage: {
        type: StringConstructor;
        default: string;
    };
    loadingMessage: {
        type: StringConstructor;
        default: string;
    };
    startTypingMessage: {
        type: StringConstructor;
        default: string;
    };
    showClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    invalid: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<PkComboboxSize>;
        default: undefined;
    };
    allowCreate: {
        type: BooleanConstructor;
        default: boolean;
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
    "onUpdate:modelValue"?: ((value: ComboboxInputModelValue) => any) | undefined;
    onCreate?: ((query: string) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkComboboxSize;
    disabled: boolean;
    options: ComboboxInputOption[];
    fetchOptions: ComboboxFetchOptions;
    modelValue: ComboboxInputModelValue;
    multiple: boolean;
    placeholder: string;
    emptyMessage: string;
    loadingMessage: string;
    startTypingMessage: string;
    showClear: boolean;
    allowCreate: boolean;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=ComboboxInput.d.ts.map