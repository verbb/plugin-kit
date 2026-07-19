import { defineComponent, h, type PropType } from 'vue';
import { assignSlotNodes, type Slots } from '@lit-labs/vue-utils/wrapper-utils.js';
import type { PkButtonSize, PkButtonVariant, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web';
import '@verbb/plugin-kit-web/components/button.js';

export type ButtonProps = {
    variant?: PkButtonVariant;
    size?: PkButtonSize;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    spinnerVariant?: PkSpinnerVariant;
    spinnerTone?: PkSpinnerTone;
    'data-state'?: 'hover' | 'focus-visible' | 'active';
    withCaret?: boolean;
    groupTrigger?: boolean;
};

/** Vue facade over `<pk-button>`. Behavior and styles live in the web component. */
export const Button = defineComponent({
    name: 'PkButton',
    inheritAttrs: false,
    props: {
        variant: { type: String as PropType<PkButtonVariant>, default: 'default' },
        size: { type: String as PropType<PkButtonSize>, default: 'default' },
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
        spinnerVariant: { type: String as PropType<PkSpinnerVariant>, default: undefined },
        spinnerTone: { type: String as PropType<PkSpinnerTone>, default: undefined },
        dataState: { type: String as PropType<ButtonProps['data-state']>, default: undefined },
        withCaret: { type: Boolean, default: false },
        groupTrigger: { type: Boolean, default: false },
    },
    setup(props, { attrs, slots }) {
        return () => h(
            'pk-button',
            {
                ...attrs,
                variant: props.variant,
                size: props.size,
                loading: props.loading || undefined,
                disabled: props.disabled || undefined,
                type: props.type,
                ...(props.spinnerVariant ? { 'spinner-variant': props.spinnerVariant } : {}),
                ...(props.spinnerTone ? { 'spinner-tone': props.spinnerTone } : {}),
                ...(props.dataState ? { 'data-state': props.dataState } : {}),
                ...(props.withCaret ? { 'with-caret': '' } : {}),
                ...(props.groupTrigger ? { 'group-trigger': '' } : {}),
            },
            assignSlotNodes(slots as Slots),
        );
    },
});

export const PkButtonElement = Button;
