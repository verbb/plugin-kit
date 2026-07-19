import { defineComponent, h, type PropType } from 'vue';
import { assignSlotNodes, type Slots } from '@lit-labs/vue-utils/wrapper-utils.js';
import '@verbb/plugin-kit-web/components/lightswitch.js';

import { readPkCheckedDetail } from '../utils/pk-change.js';

export type LightswitchProps = {
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    label?: string;
    instructions?: string;
    size?: 'default' | 'sm' | 'xs' | 'xxs';
};

/** Vue facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
export const Lightswitch = defineComponent({
    name: 'PkLightswitch',
    inheritAttrs: false,
    props: {
        checked: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        name: { type: String, default: undefined },
        value: { type: String, default: 'on' },
        label: { type: String, default: undefined },
        instructions: { type: String, default: undefined },
        size: { type: String as PropType<LightswitchProps['size']>, default: undefined },
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
            'pk-lightswitch',
            {
                ...attrs,
                checked: props.checked,
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                required: props.required || undefined,
                ...(props.name ? { name: props.name } : {}),
                value: props.value,
                ...(props.label ? { label: props.label } : {}),
                ...(props.instructions ? { instructions: props.instructions } : {}),
                ...(props.size ? { size: props.size } : {}),
                onPkChange: handlePkChange,
            },
            assignSlotNodes(slots as Slots),
        );
    },
});

export const PkLightswitchElement = Lightswitch;

export type { PkLightswitchSize } from '@verbb/plugin-kit-web';
