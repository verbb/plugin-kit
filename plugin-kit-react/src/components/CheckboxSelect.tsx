import { useCallback, useMemo } from 'react';
import { CheckboxInput } from '@verbb/plugin-kit-react/components/CheckboxInput';
import { cn } from '@verbb/plugin-kit-react/utils';

export const ALL_VALUE = '*';

export type CheckboxSelectOption = {
    label: string;
    value: string;
};

export type CheckboxSelectValue = typeof ALL_VALUE | string[];

type CheckboxSelectProps = {
    options: CheckboxSelectOption[];
    value?: CheckboxSelectValue;
    onChange?: (value: CheckboxSelectValue) => void;
    showAllOption?: boolean;
    allLabel?: string;
    disabled?: boolean;
    name?: string;
    className?: string;
};

export function CheckboxSelect({
    options,
    value = [],
    onChange,
    showAllOption = false,
    allLabel = 'All',
    disabled = false,
    className,
}: CheckboxSelectProps) {
    const isAllSelected = value === ALL_VALUE;
    const selectedArray = useMemo(() => {
        if (isAllSelected) {
            return options.map((option) => {
                return option.value;
            });
        }

        if (Array.isArray(value)) {
            return value;
        }

        return [];
    }, [isAllSelected, options, value]);

    const handleAllChange = useCallback(
        (checked: boolean | 'indeterminate') => {
            onChange?.(checked === true ? ALL_VALUE : []);
        },
        [onChange],
    );

    const handleItemChange = useCallback(
        (optionValue: string, checked: boolean) => {
            if (isAllSelected) {
                return;
            }
            const next = checked
                ? [...selectedArray, optionValue]
                : selectedArray.filter((v) => { return v !== optionValue; });
            onChange?.(next);
        },
        [isAllSelected, selectedArray, onChange],
    );

    return (
        <fieldset
            className={cn('space-y-1', className)}
            disabled={disabled}
        >
            {showAllOption && (
                <CheckboxInput
                    label={allLabel}
                    labelClassName="font-bold"
                    className="items-start gap-1.5"
                    checked={isAllSelected}
                    onCheckedChange={handleAllChange}
                    disabled={disabled}
                />
            )}
            {options.map((option) => {
                const isChecked = isAllSelected || selectedArray.includes(option.value);
                const isItemDisabled = isAllSelected;

                return (
                    <CheckboxInput
                        key={option.value}
                        label={option.label}
                        className="items-start gap-1.5"
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                            return handleItemChange(option.value, checked === true);
                        }}
                        disabled={disabled || isItemDisabled}
                    />
                );
            })}
        </fieldset>
    );
}
