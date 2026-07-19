import { defineComponent, h, type PropType } from 'vue';
import type { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '@verbb/plugin-kit-web';
import '@verbb/plugin-kit-web/components/spinner.js';

export type SpinnerProps = {
    variant?: PkSpinnerVariant;
    size?: PkSpinnerSize;
    tone?: PkSpinnerTone;
    centered?: boolean;
};

/** Vue facade over `<pk-spinner>`. Behavior and styles live in the web component. */
export const Spinner = defineComponent({
    name: 'PkSpinner',
    inheritAttrs: false,
    props: {
        variant: { type: String as PropType<PkSpinnerVariant>, default: 'default' },
        size: { type: String as PropType<PkSpinnerSize>, default: 'sm' },
        tone: { type: String as PropType<PkSpinnerTone>, default: undefined },
        centered: { type: Boolean, default: false },
    },
    setup(props, { attrs }) {
        return () => h('pk-spinner', {
            ...attrs,
            variant: props.variant,
            size: props.size,
            ...(props.tone ? { tone: props.tone } : {}),
            ...(props.centered ? { centered: true } : {}),
        });
    },
});

export const PkSpinnerElement = Spinner;
