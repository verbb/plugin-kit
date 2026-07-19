import { defineComponent, h, type PropType, type VNodeChild } from 'vue';

import { Checkbox, type CheckboxProps } from './Checkbox.js';

export type CheckboxInputProps = CheckboxProps & {
    label: VNodeChild;
    description?: VNodeChild;
};

/**
 * Convenience facade pairing `<pk-checkbox>` with a label + optional description,
 * mirroring `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>`
 * (no utility CSS) — the checkbox itself is styled inside the web component shadow root.
 */
export const CheckboxInput = defineComponent({
    name: 'PkCheckboxInput',
    inheritAttrs: false,
    props: {
        label: { type: [String, Number, Object] as PropType<VNodeChild>, required: true },
        description: { type: [String, Number, Object] as PropType<VNodeChild>, default: undefined },
        checked: { type: Boolean, default: false },
        indeterminate: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        name: { type: String, default: undefined },
        value: { type: String, default: 'on' },
        dataState: { type: String as PropType<CheckboxProps['data-state']>, default: undefined },
    },
    emits: {
        'update:checked': (value: boolean) => typeof value === 'boolean',
    },
    setup(props, { attrs, emit }) {
        return () => h(
            'label',
            {
                'data-slot': 'checkbox-input',
                class: attrs.class,
                style: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    cursor: props.disabled ? 'not-allowed' : 'pointer',
                },
            },
            [
                h(Checkbox, {
                    checked: props.checked,
                    indeterminate: props.indeterminate,
                    disabled: props.disabled,
                    invalid: props.invalid,
                    required: props.required,
                    name: props.name,
                    value: props.value,
                    dataState: props.dataState,
                    // Checkbox already maps `pk-change` → `update:checked`.
                    'onUpdate:checked': (value: boolean) => emit('update:checked', value),
                }),
                h(
                    'span',
                    {
                        'data-slot': 'checkbox-input-body',
                        style: { minWidth: 0, opacity: props.disabled ? 0.5 : undefined },
                    },
                    [
                        h(
                            'span',
                            {
                                'data-slot': 'checkbox-input-label',
                                style: { display: 'block', lineHeight: 1.25 },
                            },
                            // Slot children accept VNodeChild; positional children reject `null`.
                            { default: () => props.label },
                        ),
                        props.description
                            ? h(
                                'span',
                                {
                                    'data-slot': 'checkbox-input-description',
                                    style: {
                                        display: 'block',
                                        marginTop: '0.25rem',
                                        color: 'var(--pk-color-text-muted, #64748b)',
                                    },
                                },
                                { default: () => props.description },
                            )
                            : null,
                    ],
                ),
            ],
        );
    },
});

export const PkCheckboxInputElement = CheckboxInput;
