import { defineComponent, h, type PropType, type VNodeChild } from 'vue';

import { Field as PkFieldFacade } from '../components/Field.js';

export type FieldLayoutProps = {
    name: string;
    label?: string;
    instructions?: string;
    warning?: string;
    tip?: string;
    required?: boolean;
    translatable?: boolean;
    errors?: string[];
    headerEnd?: VNodeChild;
    class?: unknown;
    style?: unknown;
};

/**
 * Schema-form field shell. Label, instructions, warnings, and errors stay owned by
 * `<pk-field>` so Vue SchemaForm remains a thin facade over canonical WC chrome.
 */
export const FieldLayout = defineComponent({
    name: 'SchemaFieldLayout',
    props: {
        name: { type: String, required: true },
        label: { type: String, default: undefined },
        instructions: { type: String, default: undefined },
        warning: { type: String, default: undefined },
        tip: { type: String, default: undefined },
        required: { type: Boolean, default: false },
        translatable: { type: Boolean, default: false },
        errors: { type: Array as PropType<string[]>, default: () => [] },
        headerEnd: { type: null as unknown as PropType<VNodeChild>, default: undefined },
        class: { type: null as unknown as PropType<unknown>, default: undefined },
        style: { type: null as unknown as PropType<unknown>, default: undefined },
    },
    setup(props, { slots }) {
        return () => h(
            PkFieldFacade,
            {
                class: props.class,
                style: props.style,
                label: props.label,
                instructions: props.instructions,
                warning: props.warning,
                tip: props.tip,
                required: props.required || undefined,
                translatable: props.translatable || undefined,
                errors: props.errors,
                'data-name': props.name,
            },
            {
                ...(props.headerEnd ? { 'header-end': () => props.headerEnd } : {}),
                default: () => slots.default?.(),
            },
        );
    },
});
