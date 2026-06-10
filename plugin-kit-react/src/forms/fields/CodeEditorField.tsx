import { CodeEditor } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type CodeEditorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        rows?: number;
        tabSize?: number;
        lineNumbers?: boolean;
        language?: 'html' | 'text';
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
                onChange={setValue}
                onBlur={setTouched}
                placeholder={field.placeholder}
                disabled={field.disabled}
                rows={field.rows}
                tabSize={field.tabSize}
                lineNumbers={field.lineNumbers}
                language={field.language}
                isInvalid={isInvalid}
            />
        </FieldLayout>
    );
};
