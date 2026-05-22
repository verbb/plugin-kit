import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from '@verbb/plugin-kit-react/components';

import type React from 'react';
import { ComponentProps, forwardRef } from 'react';
import { Status } from '@verbb/plugin-kit-react/components/Status';
import { cn } from '@verbb/plugin-kit-react/utils';


export interface Option<T = unknown> {
    value: T;
    label: string;
    disabled?: boolean;
    status?: string;
}

type OptionGroup<T = unknown> = {
    group: string;
    options: Option<T>[];
};

// const valueToString = (val: Option['value']) => {
//     if (val === null) { return '__null__'; }
//     if (val === undefined) {
//         console.error('option value cannot be undefined');
//         return '__undefined__';
//     }
//     if (val === Infinity) { return '__Infinity__'; }
//     if (val === -Infinity) { return '__-Infinity__'; }
//     if (Number.isNaN(val)) { return '__NaN__'; }
//     if (typeof val === 'symbol') { return `__symbol__${val.description}`; }
//     // console.log(JSON.stringify(val));
//     return JSON.stringify(val);
// };

// const stringToValue = (str: string) => {
//     switch (str) {
//         case '__null__':
//             return null;
//         case '__undefined__':
//             return undefined;
//         case '__Infinity__':
//             return Infinity;
//         case '__-Infinity__':
//             return -Infinity;
//         case '__NaN__':
//             return NaN;
//         default:
//             if (str.startsWith('__symbol__')) {
//                 return Symbol(str.slice(10));
//             }
//             return JSON.parse(str);
//     }
// };

type SelectBaseProps = ComponentProps<typeof Select>;

interface SelectProps<T = unknown>
    extends Omit<SelectBaseProps, 'children' | 'value' | 'defaultValue' | 'onValueChange'> {
    options: Array<Option<T> | OptionGroup<T>>;
    placeholder?: string;
    onChange?: (value: T) => void;
    value?: T;
    isInvalid?: boolean;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    triggerClassName?: string;
    contentClassName?: string;
    id?: string;
    'aria-invalid'?: boolean | 'true' | 'false';
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectProps>(({
    options,
    placeholder,
    size,
    onChange,
    value,
    triggerClassName,
    contentClassName,
    isInvalid,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...selectProps
}, ref) => {
    const handleValueChange = (nextValue: SelectProps['value']) => {
        if (onChange) {
            onChange(nextValue);
        }
    };

    // const hasEmptyOption = options?.find((option) => { return option.value === ''; });

    // let defaultValue = undefined;

    // // Only show placeholder when value is initially undefined,
    // // or when the value is an empty string and there's an empty option
    // if (value === undefined || value === '') {
    //     if (hasEmptyOption) {
    //         defaultValue = valueToString('');
    //     } else {
    //         defaultValue = undefined;
    //     }
    // } else {
    //     defaultValue = valueToString(value);
    // }

    const hasGroup = (option: Option<unknown> | OptionGroup<unknown>): option is OptionGroup<unknown> => {
        return typeof option === 'object' && option !== null && 'group' in option;
    };

    const groupedOptions = options.map((option, index) => {
        if (hasGroup(option)) {
            return option;
        }

        return {
            group: null,
            options: [option],
            _key: `ungrouped-${index}`,
        };
    });

    const flatOptions = options.flatMap((option) => {
        if (hasGroup(option)) {
            return option.options;
        }

        return [option];
    });

    const selectedOption = flatOptions.find((option) => {
        return option.value === value;
    });
    const resolvedPlaceholder = placeholder || '';
    const resolvedIsInvalid = Boolean(isInvalid || ariaInvalid === true || ariaInvalid === 'true');

    return (
        <Select
            value={value}
            onValueChange={handleValueChange}
            size={size}
            items={flatOptions as ComponentProps<typeof Select>['items']}
            {...selectProps}
        >
            <SelectTrigger
                ref={ref}
                id={id}
                aria-invalid={resolvedIsInvalid}
                aria-describedby={ariaDescribedBy}
                aria-errormessage={ariaErrorMessage}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                className={cn(
                    selectedOption?.status && 'relative [&_[data-slot=select-value]]:pl-5',
                    '[&_[data-slot=select-value]]:overflow-hidden [&_[data-slot=select-value]>span]:block [&_[data-slot=select-value]>span]:min-w-0 [&_[data-slot=select-value]>span]:max-w-full [&_[data-slot=select-value]>span]:truncate',
                    triggerClassName,
                )}
            >
                {selectedOption?.status && (
                    <Status
                        status={selectedOption.status}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2"
                    />
                )}
                <SelectValue placeholder={placeholder}>
                    {selectedOption ? (
                        <span className="block min-w-0 max-w-full truncate" title={selectedOption.label}>
                            {selectedOption.label}
                        </span>
                    ) : (
                        <span className="block min-w-0 max-w-full truncate text-slate-500" title={resolvedPlaceholder}>
                            {resolvedPlaceholder}
                        </span>
                    )}
                </SelectValue>
            </SelectTrigger>

            {options?.length > 0 && (
                <SelectContent className={contentClassName}>
                    {groupedOptions.map((group) => {
                        return (
                            <SelectGroup key={group.group ?? group._key}>
                                {group.group && <SelectLabel>{group.group}</SelectLabel>}

                                {group.options?.map((option) => {
                                    return (
                                        <SelectItem
                                            key={String(option.value)}
                                            value={option.value}
                                            disabled={option.disabled}
                                        >
                                            {option.status && (
                                                <Status status={option.status} />
                                            )}
                                            <span className="block min-w-0 flex-1 truncate" title={option.label}>
                                                {option.label}
                                            </span>
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            )}
        </Select>
    );
});

export default Select;
export type { SelectProps };
