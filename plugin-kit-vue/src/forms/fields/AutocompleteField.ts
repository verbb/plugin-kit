import { defineComponent, h, type Component, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import {
    AutocompleteInput,
    type AutocompleteFetchOptions,
    type AutocompleteInputOption,
} from '../../components/AutocompleteInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

/**
 * SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
 * Pair schema `warning` for plugin-owned existence checks (paths, aliases, etc.).
 */
export const AutocompleteField = defineComponent({
    name: 'SchemaAutocompleteField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);

        return () => {
            const field = props.field as SchemaNode & {
                name: string;
                options?: AutocompleteInputOption[];
                fetchOptions?: AutocompleteFetchOptions;
                placeholder?: string;
                emptyMessage?: string;
                showClear?: boolean;
                width?: 'full';
            };

            return h(FieldLayout, {
                name: field.name,
                label: field.label,
                instructions: field.instructions as string | undefined,
                warning: field.warning as string | undefined,
                required: field.required,
                errors: binding.errors.value,
            }, {
                default: () => h(AutocompleteInput as Component, {
                    options: field.options,
                    fetchOptions: field.fetchOptions,
                    modelValue: binding.value.value == null ? '' : String(binding.value.value),
                    disabled: field.disabled || undefined,
                    placeholder: field.placeholder,
                    emptyMessage: field.emptyMessage,
                    showClear: field.showClear || undefined,
                    invalid: binding.isInvalid.value || undefined,
                    width: field.width,
                    'onUpdate:modelValue': (nextValue: string) => {
                        binding.setValue(nextValue);
                        binding.setTouched();
                    },
                }),
            });
        };
    },
});
