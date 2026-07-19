import { CodeEditor, type CodeEditorProps } from '../../components/CodeEditor.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type CodeEditorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        rows?: number;
        tabSize?: number;
        lineNumbers?: boolean;
        language?: CodeEditorProps['language'];
        required?: boolean;
        disabled?: boolean;
    };
};

export const CodeEditorField = ({ form, field }: CodeEditorFieldProps) => {
    const {
        value, setValue, setTouched, errors, isInvalid,
    } = useEngineField(form, field.name);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
        >
            <CodeEditor
                value={String(value ?? '')}
                onPkChange={(event) => {
                    return setValue((event as CustomEvent<{ value: string }>).detail?.value ?? '');
                }}
                onBlur={setTouched}
                language={field.language}
                tabSize={field.tabSize}
                lineNumbers={field.lineNumbers}
                rows={field.rows}
                disabled={field.disabled}
                invalid={isInvalid}
            />
        </FieldLayout>
    );
};
