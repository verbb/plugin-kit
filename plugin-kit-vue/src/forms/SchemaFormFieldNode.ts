import {
    defineComponent,
    h,
    onMounted,
    ref,
    watch,
    type PropType,
} from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { isBuiltinFormFieldType, loadBuiltinFormField } from './builtin-field-loaders.js';
import type { SchemaFormEngineApi, SchemaFormFieldComponent } from './engine/context.js';
import {
    cacheLoadedBuiltinFormField,
    getRegisteredFormField,
} from './registry.js';

export const SchemaFormFieldNode = defineComponent({
    name: 'SchemaFormFieldNode',
    props: {
        fieldType: { type: String, required: true },
        schema: { type: Object as PropType<SchemaNode>, required: true },
        field: { type: Object as PropType<SchemaNode>, required: true },
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
    },
    setup(props, { slots }) {
        const component = ref<SchemaFormFieldComponent | null>(getRegisteredFormField(props.fieldType) ?? null);
        const loadFailed = ref(false);

        const loadComponent = async (fieldType: string): Promise<void> => {
            const registeredField = getRegisteredFormField(fieldType);
            if (registeredField) {
                component.value = registeredField;
                loadFailed.value = false;
                return;
            }

            if (!isBuiltinFormFieldType(fieldType)) {
                console.warn(`Unknown form field type: ${fieldType}`);
                component.value = null;
                loadFailed.value = true;
                return;
            }

            loadFailed.value = false;

            try {
                const loaded = await loadBuiltinFormField(fieldType);
                if (!loaded || fieldType !== props.fieldType) {
                    return;
                }

                cacheLoadedBuiltinFormField(fieldType, loaded);
                component.value = loaded;
            } catch (error) {
                if (fieldType !== props.fieldType) {
                    return;
                }

                console.error(`Failed to load form field "${fieldType}":`, error);
                component.value = null;
                loadFailed.value = true;
            }
        };

        onMounted(() => {
            void loadComponent(props.fieldType);
        });
        watch(() => props.fieldType, (fieldType) => {
            void loadComponent(fieldType);
        });

        return () => {
            if (loadFailed.value || !component.value) {
                return null;
            }

            return h(
                component.value,
                {
                    schema: props.schema,
                    field: props.field,
                    form: props.form,
                },
                slots,
            );
        };
    },
});
