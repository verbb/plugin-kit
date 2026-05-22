import { type ComponentProps, type ReactNode } from 'react';

import { Checkbox } from '@verbb/plugin-kit-react/components/Checkbox';
import { cn } from '@verbb/plugin-kit-react/utils';

type CheckboxInputProps = Omit<ComponentProps<typeof Checkbox>, 'className' | 'children'> & {
    label: ReactNode;
    description?: ReactNode;
    className?: string;
    checkboxClassName?: string;
    labelClassName?: string;
    descriptionClassName?: string;
};

function CheckboxInput({
    label,
    description,
    className,
    checkboxClassName,
    labelClassName,
    descriptionClassName,
    disabled,
    ...props
}: CheckboxInputProps) {
    return (
        <label
            data-slot="checkbox-input"
            className={cn(
                'flex items-start gap-2 text-sm',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                className,
            )}
        >
            <Checkbox className={checkboxClassName} disabled={disabled} {...props} />
            <span className="min-w-0 peer-disabled:opacity-50 peer-data-disabled:opacity-50">
                <span
                    data-slot="checkbox-input-label"
                    className={cn('block leading-4', labelClassName)}
                >
                    {label}
                </span>
                {description && (
                    <span
                        data-slot="checkbox-input-description"
                        className={cn('mt-1 block text-gray-500', descriptionClassName)}
                    >
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}

export { CheckboxInput };
export type { CheckboxInputProps };
