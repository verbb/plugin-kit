import { computed, defineComponent, h, type PropType } from 'vue';
import type { PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';
import type { PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';
import '@verbb/plugin-kit-web/components/select.js';
import '@verbb/plugin-kit-web/components/status.js';

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

const isGroup = (option: SelectInputOption | SelectInputOptionGroup): option is SelectInputOptionGroup => {
    return typeof option === 'object' && option !== null && 'group' in option;
};

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-select>` matching React `SelectInput` ergonomics:
 * an `options[]` array plus `v-model`, instead of slotted `<pk-option>` children.
 *
 * `pk-select` is string-valued, so option values are stringified for the element and
 * mapped back to their original value on `pk-change`.
 */
export const SelectInput = defineComponent({
    name: 'PkSelectInput',
    props: {
        options: { type: Array as PropType<Array<SelectInputOption | SelectInputOptionGroup>>, required: true },
        modelValue: { type: null as unknown as PropType<unknown>, default: undefined },
        placeholder: { type: String, default: undefined },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        clearable: { type: Boolean, default: false },
        size: { type: String as PropType<PkSelectSize>, default: undefined },
        width: { type: String as PropType<'full'>, default: undefined },
        name: { type: String, default: undefined },
        id: { type: String, default: undefined },
        ariaLabel: { type: String, default: undefined },
        ariaDescribedby: { type: String, default: undefined },
        ariaErrormessage: { type: String, default: undefined },
        ariaLabelledby: { type: String, default: undefined },
    },
    emits: {
        'update:modelValue': (value: unknown) => value !== undefined,
        blur: (event: Event) => event instanceof Event,
    },
    setup(props, { emit }) {
        const flatOptions = computed(() => props.options.flatMap((option) => (isGroup(option) ? option.options : [option])));

        const handlePkChange = (event: Event): void => {
            const detail = (event as CustomEvent<{ value: string | string[] }>).detail;
            // SelectInput is single-value; if the CE ever emits an array, take the first entry.
            const raw = Array.isArray(detail?.value) ? detail?.value[0] : detail?.value;
            const match = flatOptions.value.find((option) => toStringValue(option.value) === toStringValue(raw));

            emit('update:modelValue', match ? match.value : raw ?? '');
        };

        const handleFocusOut = (event: Event): void => {
            emit('blur', event);
        };

        const renderOption = (option: SelectInputOption) => h(
            'pk-option',
            {
                key: toStringValue(option.value),
                value: toStringValue(option.value),
                disabled: option.disabled || undefined,
            },
            {
                default: () => [
                    option.status
                        ? h('pk-status', {
                            // Named slot on the option — start decoration before the label.
                            slot: 'start',
                            status: option.status as PkStatusVariant,
                        })
                        : null,
                    option.label,
                ],
            },
        );

        return () => h(
            'pk-select',
            {
                value: toStringValue(props.modelValue),
                ...(props.placeholder !== undefined ? { placeholder: props.placeholder } : {}),
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                clearable: props.clearable || undefined,
                ...(props.size ? { size: props.size } : {}),
                ...(props.width ? { width: props.width } : {}),
                ...(props.name ? { name: props.name } : {}),
                ...(props.id ? { id: props.id } : {}),
                ...(props.ariaLabel ? { 'aria-label': props.ariaLabel } : {}),
                ...(props.ariaDescribedby ? { 'aria-describedby': props.ariaDescribedby } : {}),
                ...(props.ariaErrormessage ? { 'aria-errormessage': props.ariaErrormessage } : {}),
                ...(props.ariaLabelledby ? { 'aria-labelledby': props.ariaLabelledby } : {}),
                onPkChange: handlePkChange,
                // React maps `onBlur` → `onFocusOut`; Vue consumers listen for `@blur`.
                onFocusout: handleFocusOut,
            },
            {
                default: () => props.options.map((option) => (isGroup(option)
                    ? h(
                        'pk-option-group',
                        { key: option.group, label: option.group },
                        { default: () => option.options.map(renderOption) },
                    )
                    : renderOption(option))),
            },
        );
    },
});

export const PkSelectInputElement = SelectInput;
