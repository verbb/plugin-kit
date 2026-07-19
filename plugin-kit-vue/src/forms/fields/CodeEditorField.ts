import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { CodeEditor } from '../../components/CodeEditor.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';

export const CodeEditorField = defineComponent({
    name: 'SchemaCodeEditorField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);

        return () => h(FieldLayout, {
            name: props.field.name,
            label: props.field.label,
            instructions: props.field.instructions as string | undefined,
            warning: props.field.warning as string | undefined,
            required: props.field.required,
            errors: binding.errors.value,
        }, {
            default: () => h(CodeEditor, {
                value: String(binding.value.value ?? ''),
                language: props.field.language,
                tabSize: props.field.tabSize,
                lineNumbers: props.field.lineNumbers,
                rows: props.field.rows,
                disabled: props.field.disabled || undefined,
                invalid: binding.isInvalid.value || undefined,
                onPkChange: (event: Event) => {
                    binding.setValue(readPkValue(event));
                },
                onBlur: binding.setTouched,
            }),
        });
    },
});
