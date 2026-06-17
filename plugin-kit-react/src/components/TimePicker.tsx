import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@verbb/plugin-kit-react/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-solid-svg-icons';

import { cn, generateTimeOptions } from '@verbb/plugin-kit-react/utils';

export function TimePicker({
    value,
    onValueChange,
    placeholder = '',
    className,
    disabled = false,
    isInvalid = false,
    ...props
}: {
    value: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    isInvalid?: boolean;
}) {
    // Use cached time options instead of generating on every render
    const timeOptions = generateTimeOptions();

    return (
        <Select
            value={value}
            onValueChange={(nextValue) => { onValueChange?.(String(nextValue ?? '')); }}
            disabled={disabled}
            {...props}
        >
            <SelectTrigger
                aria-invalid={isInvalid}
                className={cn(
                    'min-w-[7rem] min-h-[2.125rem]! h-[2.125rem]!',
                    'w-[130px] justify-start text-left font-normal',
                    'bg-transparent border border-slate-400!',
                    'hover:bg-slate-50!',
                    'active:bg-slate-150!',
                    'data-[popup-open]:bg-slate-150!',
                    className,
                )}>
                <FontAwesomeIcon
                    icon={faClock}
                    className={cn(
                        'mr-1 text-gray-400',
                    )}
                />
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
                alignItemWithTrigger={false}
                className={cn(
                    'max-h-[15rem] min-w-[8rem]',
                )}
            >
                {timeOptions.map((option) => {
                    return (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
