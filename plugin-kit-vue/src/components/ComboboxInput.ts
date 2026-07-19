import { computed, defineComponent, h, type PropType } from 'vue';
import type { PkComboboxSize } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/combobox.js';
import '@verbb/plugin-kit-web/components/select.js';

export type ComboboxInputOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
};

export type ComboboxFetchOptions = (
    query: string,
    signal?: AbortSignal,
) => Promise<ComboboxInputOption[]>;

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

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-combobox>` mirroring React `ComboboxInput`:
 * `options[]` (or `fetchOptions` for async search), `v-model`, and `multiple`.
 *
 * `pk-combobox` is string-valued, so values are stringified for the element and mapped
 * back to their original option value on `pk-change`.
 */
export const ComboboxInput = defineComponent({
    name: 'PkComboboxInput',
    props: {
        options: { type: Array as PropType<ComboboxInputOption[]>, default: undefined },
        fetchOptions: { type: Function as PropType<ComboboxFetchOptions>, default: undefined },
        modelValue: {
            type: [String, Number, Array, null] as unknown as PropType<ComboboxInputModelValue>,
            default: null,
        },
        multiple: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        emptyMessage: { type: String, default: 'No options found.' },
        loadingMessage: { type: String, default: 'Searching…' },
        startTypingMessage: { type: String, default: 'Start typing to search…' },
        // Off by default — match pk-combobox `clearable=false` and React ComboboxInput.
        showClear: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        size: { type: String as PropType<PkComboboxSize>, default: undefined },
        allowCreate: { type: Boolean, default: false },
        name: { type: String, default: undefined },
        id: { type: String, default: undefined },
        ariaLabel: { type: String, default: undefined },
        ariaDescribedby: { type: String, default: undefined },
        ariaErrormessage: { type: String, default: undefined },
        ariaLabelledby: { type: String, default: undefined },
    },
    emits: {
        'update:modelValue': (value: ComboboxInputModelValue) => value !== undefined,
        create: (query: string) => typeof query === 'string',
        openChange: (open: boolean) => typeof open === 'boolean',
    },
    setup(props, { emit }) {
        const usesAsync = computed(() => Boolean(props.fetchOptions) && !props.options?.length);
        const flatOptions = computed(() => props.options ?? []);

        // Restore original option value types after the CE stringifies them.
        const mapBack = (raw: string): string | number => {
            const match = flatOptions.value.find((option) => toStringValue(option.value) === toStringValue(raw));

            return match ? match.value : raw;
        };

        // CE `fetchOptions` expects string values; adapt the consumer callback.
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
            // Multiple mode emits `string[]` in detail.value — do not use readPkValueDetail (string-only).
            const detail = (event as CustomEvent<{ value: string | string[] }>).detail;
            const raw = detail?.value;

            if (props.multiple) {
                const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
                emit('update:modelValue', arr.map((entry) => mapBack(entry)));
                return;
            }

            const single = Array.isArray(raw) ? raw[0] : raw;
            emit('update:modelValue', single ? mapBack(single) : null);
        };

        const handlePkCreate = (event: Event): void => {
            // `pk-create` is a PkCreateEvent with `inputValue`, not a CustomEvent `{ query }`.
            const query = (event as Event & { inputValue?: string }).inputValue ?? '';
            emit('create', query);
        };

        const handlePkOpenChange = (event: Event): void => {
            emit('openChange', Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
        };

        return () => {
            const valueProps = props.multiple
                ? {
                    values: (Array.isArray(props.modelValue) ? props.modelValue : []).map((entry) => toStringValue(entry)),
                }
                : { value: toStringValue(props.modelValue) };

            return h(
                'pk-combobox',
                {
                    multiple: props.multiple || undefined,
                    disabled: props.disabled || undefined,
                    placeholder: props.placeholder,
                    emptyMessage: props.emptyMessage,
                    loadingMessage: props.loadingMessage,
                    startTypingMessage: props.startTypingMessage,
                    clearable: props.showClear || undefined,
                    invalid: props.invalid || undefined,
                    ...(props.size ? { size: props.size } : {}),
                    allowCreate: props.allowCreate || undefined,
                    // `async` + `fetchOptions` are JS properties (attribute: false on the CE).
                    async: usesAsync.value || undefined,
                    fetchOptions: adaptedFetch.value,
                    ...(props.name ? { name: props.name } : {}),
                    ...(props.id ? { id: props.id } : {}),
                    ...(props.ariaLabel ? { 'aria-label': props.ariaLabel } : {}),
                    ...(props.ariaDescribedby ? { 'aria-describedby': props.ariaDescribedby } : {}),
                    ...(props.ariaErrormessage ? { 'aria-errormessage': props.ariaErrormessage } : {}),
                    ...(props.ariaLabelledby ? { 'aria-labelledby': props.ariaLabelledby } : {}),
                    ...valueProps,
                    onPkChange: handlePkChange,
                    onPkCreate: handlePkCreate,
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
        };
    },
});

export const PkComboboxInputElement = ComboboxInput;
