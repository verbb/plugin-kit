import { computed, defineComponent, h, type PropType } from 'vue';
import type { SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';

import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';

const prefixGroupSchema = (schema: SchemaRenderable, prefix: string, scopePath: string): SchemaRenderable => {
    if (Array.isArray(schema)) {
        return schema.map((item) => prefixGroupSchema(item, prefix, scopePath));
    }

    if (!schema || typeof schema !== 'object') {
        return schema;
    }

    const nextSchema: SchemaNode = { ...schema };
    const hasScope = typeof scopePath === 'string' && scopePath;

    if (hasScope && !nextSchema._scopePath) {
        nextSchema._scopePath = scopePath;
    }

    if (typeof nextSchema.name === 'string' && nextSchema.name && nextSchema.$field) {
        nextSchema.name = `${prefix}${nextSchema.name}`;
    }

    // Nested groups scope their own descendants so names do not get double-prefixed.
    if (nextSchema.$field !== 'group') {
        if (Array.isArray(nextSchema.schema)) {
            nextSchema.schema = prefixGroupSchema(nextSchema.schema, prefix, scopePath);
        }

        if (Array.isArray(nextSchema.children)) {
            nextSchema.children = prefixGroupSchema(nextSchema.children, prefix, scopePath);
        }
    }

    return nextSchema;
};

export const GroupField = defineComponent({
    name: 'SchemaGroupField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode>, required: true },
    },
    setup(props, { slots }) {
        const scopedSchema = computed(() => {
            const schema = props.field.schema ?? props.field.children ?? [];
            const prefix = props.field.name ? `${props.field.name}.` : '';

            if (!prefix) {
                return schema as SchemaRenderable;
            }

            return prefixGroupSchema(schema as SchemaRenderable, prefix, props.field.name || '');
        });

        return () => {
            const Renderer = props.form.SchemaRenderer;
            if (!Renderer) {
                return null;
            }

            const errors = props.field.name
                ? props.form.getGroupedErrorsForPath?.(props.field.name) ?? props.form.getErrorMapFields()[props.field.name] ?? []
                : [];
            const content = h(Renderer, { schema: scopedSchema.value });

            if (props.field.label || props.field.instructions || props.field.warning) {
                return h(FieldLayout, {
                    name: props.field.name || 'group',
                    label: props.field.label,
                    instructions: props.field.instructions as string | undefined,
                    warning: props.field.warning as string | undefined,
                    required: props.field.required,
                    errors,
                }, { default: () => content });
            }

            return slots.default?.() ?? content;
        };
    },
});
