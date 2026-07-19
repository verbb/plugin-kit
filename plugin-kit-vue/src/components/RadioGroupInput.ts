import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import '@verbb/plugin-kit-web/components/radio-group.js';

import { readPkValueDetail } from '../utils/pk-change.js';

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

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-radio-group>` with an `options[]` array plus `v-model`,
 * instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
 */
export const RadioGroupInput = defineComponent({
    name: 'PkRadioGroupInput',
    props: {
        modelValue: { type: [String, Number, Boolean], default: '' },
        options: { type: Array as PropType<RadioGroupInputOption[]>, required: true },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        name: { type: String, default: undefined },
        orientation: { type: String as PropType<RadioGroupInputProps['orientation']>, default: undefined },
        label: { type: String, default: undefined },
        instructions: { type: String, default: undefined },
        ariaLabel: { type: String, default: undefined },
    },
    emits: {
        'update:modelValue': (value: unknown) => value !== undefined,
    },
    setup(props, { emit }) {
        const handlePkChange = (event: Event): void => {
            const nextValue = readPkValueDetail(event);
            const match = props.options.find((option) => toStringValue(option.value) === nextValue);

            emit('update:modelValue', match ? match.value : nextValue);
        };

        return () => h(
            'pk-radio-group',
            {
                value: toStringValue(props.modelValue),
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                ...(props.name ? { name: props.name } : {}),
                ...(props.orientation ? { orientation: props.orientation } : {}),
                ...(props.label ? { label: props.label } : {}),
                ...(props.instructions ? { instructions: props.instructions } : {}),
                ...(props.ariaLabel ? { 'aria-label': props.ariaLabel } : {}),
                onPkChange: handlePkChange,
            },
            {
                default: () => props.options.map((option) => h(
                    'pk-radio',
                    {
                        key: toStringValue(option.value),
                        value: toStringValue(option.value),
                        disabled: option.disabled || undefined,
                    },
                    { default: () => option.label },
                )),
            },
        );
    },
});

export const PkRadioGroupInputElement = RadioGroupInput;
