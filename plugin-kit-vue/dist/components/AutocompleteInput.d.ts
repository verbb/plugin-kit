import { PropType } from 'vue';
import { PkAutocompleteSize } from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
export type AutocompleteInputOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
};
export type AutocompleteFetchOptions = (query: string, signal?: AbortSignal) => Promise<AutocompleteInputOption[]>;
export type AutocompleteInputProps = {
    options?: AutocompleteInputOption[];
    fetchOptions?: AutocompleteFetchOptions;
    /** Freeform field value — always string (empty when cleared). */
    modelValue?: string | null;
    disabled?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    startTypingMessage?: string;
    /** Maps to `pk-autocomplete` `clearable` (React convenience name: `showClear`). */
    showClear?: boolean;
    invalid?: boolean;
    size?: PkAutocompleteSize;
    width?: 'full';
    name?: string;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
};
/**
 * Convenience facade over `<pk-autocomplete>` mirroring React `AutocompleteInput`:
 * `options[]` (or `fetchOptions` for async search) and freeform `v-model` text.
 */
export declare const AutocompleteInput: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<AutocompleteInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<AutocompleteFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<string | null>;
        default: string;
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
        type: PropType<PkAutocompleteSize>;
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
    'update:modelValue': (value: string) => boolean;
    openChange: (open: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<AutocompleteInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<AutocompleteFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<string | null>;
        default: string;
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
        type: PropType<PkAutocompleteSize>;
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
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkAutocompleteSize;
    disabled: boolean;
    options: AutocompleteInputOption[];
    fetchOptions: AutocompleteFetchOptions;
    modelValue: string | null;
    placeholder: string;
    emptyMessage: string;
    loadingMessage: string;
    startTypingMessage: string;
    showClear: boolean;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
    width: "full";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkAutocompleteInputElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<AutocompleteInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<AutocompleteFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<string | null>;
        default: string;
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
        type: PropType<PkAutocompleteSize>;
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
    'update:modelValue': (value: string) => boolean;
    openChange: (open: boolean) => boolean;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    options: {
        type: PropType<AutocompleteInputOption[]>;
        default: undefined;
    };
    fetchOptions: {
        type: PropType<AutocompleteFetchOptions>;
        default: undefined;
    };
    modelValue: {
        type: PropType<string | null>;
        default: string;
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
        type: PropType<PkAutocompleteSize>;
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
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    name: string;
    invalid: boolean;
    size: PkAutocompleteSize;
    disabled: boolean;
    options: AutocompleteInputOption[];
    fetchOptions: AutocompleteFetchOptions;
    modelValue: string | null;
    placeholder: string;
    emptyMessage: string;
    loadingMessage: string;
    startTypingMessage: string;
    showClear: boolean;
    id: string;
    ariaLabel: string;
    ariaDescribedby: string;
    ariaErrormessage: string;
    ariaLabelledby: string;
    width: "full";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=AutocompleteInput.d.ts.map