import { Input } from '@verbb/plugin-kit-react/components';
import { buildUniqueHandleFromSource, cn } from '@verbb/plugin-kit-react/utils';
import { MouseEvent, useState } from 'react';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type HandleFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        source?: string;
        reservedHandles?: string[];
        reservedFieldValues?: string[];
        maxLength?: number;
        required?: boolean;
        disabled?: boolean;
    };
};

export const HandleField = ({ form, field }: HandleFieldProps) => {
    const {
        value, setValue, setTouched, errors, isInvalid,
    } = useEngineField(form, field.name);
    const [rotate, setRotate] = useState(0);

    const refreshHandle = (e: MouseEvent) => {
        e.preventDefault();

        if (field.disabled) {
            return;
        }

        setRotate((current) => { return current + 180; });

        if (!field.source) {
            return;
        }

        const uniqueHandle = buildUniqueHandleFromSource({
            sourceValue: form.getFieldValue(field.source),
            values: form.store.state.values ?? {},
            reservedHandles: field.reservedHandles || [],
            reservedFieldValues: field.reservedFieldValues || [],
            maxLength: field.maxLength,
        });
        setValue(uniqueHandle);
    };

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
        >
            <div className="relative">
                <Input
                    value={String(value ?? '')}
                    onChange={(event) => { return setValue(event.target.value); }}
                    onBlur={setTouched}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    aria-invalid={isInvalid}
                    className="font-mono text-[13px]"
                />
                <div
                    className={cn(
                        'absolute top-1/2 right-0 p-[7px_10px]',
                        field.disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-50 hover:opacity-100',
                        'text-[#606d7b]',
                        'transition-all duration-200 ease-in-out',
                        'select-none',
                        'transform',
                        'transition-transform duration-500 ease-in-out',
                        '[&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:block',
                    )}
                    style={{ transform: `translateY(-50%) rotate(${rotate}deg)` }}
                    onClick={refreshHandle}
                >
                    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" />
                    </svg>
                </div>
            </div>
        </FieldLayout>
    );
};
