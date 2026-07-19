import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { assignSlotNodes, type Slots } from '@lit-labs/vue-utils/wrapper-utils.js';
import '@verbb/plugin-kit-web/components/checkbox.js';

import { readPkCheckedDetail } from '../utils/pk-change.js';

export type CheckboxProps = {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    'data-state'?: 'focus-visible';
};

/** Vue facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
export const Checkbox = defineComponent({
    name: 'PkCheckbox',
    inheritAttrs: false,
    props: {
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
    setup(props, { attrs, slots, emit }) {
        const handlePkChange = (event: Event): void => {
            const userHandler = attrs.onPkChange as ((event: Event) => void) | undefined;

            userHandler?.(event);
            emit('update:checked', readPkCheckedDetail(event));
        };

        return () => h(
            'pk-checkbox',
            {
                ...attrs,
                checked: props.checked,
                indeterminate: props.indeterminate || undefined,
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                required: props.required || undefined,
                ...(props.name ? { name: props.name } : {}),
                checkboxValue: props.value,
                ...(props.dataState ? { 'data-state': props.dataState } : {}),
                onPkChange: handlePkChange,
            },
            assignSlotNodes(slots as Slots),
        );
    },
});

export const PkCheckboxElement = Checkbox;
