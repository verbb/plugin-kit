import { computed, defineComponent, h, type PropType } from 'vue';
import type { PkAutocompleteSize } from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import '@verbb/plugin-kit-web/components/autocomplete.js';
import '@verbb/plugin-kit-web/components/select.js';

export type AutocompleteInputOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
};

export type AutocompleteFetchOptions = (
    query: string,
    signal?: AbortSignal,
) => Promise<AutocompleteInputOption[]>;

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

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-autocomplete>` mirroring React `AutocompleteInput`:
 * `options[]` (or `fetchOptions` for async search) and freeform `v-model` text.
 */
export const AutocompleteInput = defineComponent({
    name: 'PkAutocompleteInput',
    props: {
        options: { type: Array as PropType<AutocompleteInputOption[]>, default: undefined },
        fetchOptions: { type: Function as PropType<AutocompleteFetchOptions>, default: undefined },
        modelValue: { type: [String, null] as unknown as PropType<string | null>, default: '' },
        disabled: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        emptyMessage: { type: String, default: 'No options found.' },
        loadingMessage: { type: String, default: 'Searching…' },
        startTypingMessage: { type: String, default: 'Start typing to search…' },
        showClear: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        size: { type: String as PropType<PkAutocompleteSize>, default: undefined },
        width: { type: String as PropType<'full'>, default: undefined },
        name: { type: String, default: undefined },
        id: { type: String, default: undefined },
        ariaLabel: { type: String, default: undefined },
        ariaDescribedby: { type: String, default: undefined },
        ariaErrormessage: { type: String, default: undefined },
        ariaLabelledby: { type: String, default: undefined },
    },
    emits: {
        'update:modelValue': (value: string) => typeof value === 'string',
        openChange: (open: boolean) => typeof open === 'boolean',
    },
    setup(props, { emit }) {
        const usesAsync = computed(() => Boolean(props.fetchOptions) && !props.options?.length);
        const flatOptions = computed(() => props.options ?? []);

        const adaptedFetch = computed(() => {
            if (!props.fetchOptions) {
                return null;
            }

            const fetchOptions = props.fetchOptions;

            return async (query: string, signal: AbortSignal) => {
                const results = await fetchOptions(query, signal);

                return results.map((option) => ({
                    value: toStringValue(option.value),
                    label: option.label,
                }));
            };
        });

        const handlePkChange = (event: Event): void => {
            const detail = (event as CustomEvent<{ value?: string }>).detail;
            emit('update:modelValue', detail?.value ?? '');
        };

        const handlePkOpenChange = (event: Event): void => {
            emit('openChange', Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
        };

        return () => h(
            'pk-autocomplete',
            {
                disabled: props.disabled || undefined,
                placeholder: props.placeholder,
                emptyMessage: props.emptyMessage,
                loadingMessage: props.loadingMessage,
                startTypingMessage: props.startTypingMessage,
                clearable: props.showClear || undefined,
                invalid: props.invalid || undefined,
                ...(props.size ? { size: props.size } : {}),
                ...(props.width ? { width: props.width } : {}),
                async: usesAsync.value || undefined,
                fetchOptions: adaptedFetch.value,
                ...(props.name ? { name: props.name } : {}),
                ...(props.id ? { id: props.id } : {}),
                ...(props.ariaLabel ? { 'aria-label': props.ariaLabel } : {}),
                ...(props.ariaDescribedby ? { 'aria-describedby': props.ariaDescribedby } : {}),
                ...(props.ariaErrormessage ? { 'aria-errormessage': props.ariaErrormessage } : {}),
                ...(props.ariaLabelledby ? { 'aria-labelledby': props.ariaLabelledby } : {}),
                value: toStringValue(props.modelValue),
                onPkChange: handlePkChange,
                onPkOpenChange: handlePkOpenChange,
            },
            {
                default: () => (usesAsync.value
                    ? []
                    : flatOptions.value.map((option) => h(
                        'pk-option',
                        {
                            key: toStringValue(option.value),
                            value: toStringValue(option.value),
                            disabled: option.disabled || undefined,
                        },
                        { default: () => option.label },
                    ))),
            },
        );
    },
});

export const PkAutocompleteInputElement = AutocompleteInput;
