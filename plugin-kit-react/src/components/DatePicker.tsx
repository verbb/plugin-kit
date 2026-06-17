import { useEffect, useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/pro-solid-svg-icons';

import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@verbb/plugin-kit-react/components';

import { cn, hostFormatDate } from '@verbb/plugin-kit-react/utils';
import { parseLocalDate, resolveCalendarMonth } from '@verbb/plugin-kit-react/utils/datetime';

const toDate = (value: Date | string | null | undefined): Date | undefined => {
    return parseLocalDate(value);
};

export function DatePicker({
    value,
    onValueChange,
    placeholder = '',
    className,
    disabled = false,
    isInvalid = false,
    ...props
}: {
    value: Date | string | null;
    onValueChange?: (value: Date | undefined) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    isInvalid?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const date = useMemo(() => toDate(value), [value]);
    const [month, setMonth] = useState(() => resolveCalendarMonth(date));

    useEffect(() => {
        if (date) {
            setMonth(resolveCalendarMonth(date));
        }
    }, [date]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (nextOpen) {
            setMonth(resolveCalendarMonth(date));
        }

        setOpen(nextOpen);
    };

    const handleSelect = (selectedDate?: Date) => {
        onValueChange?.(selectedDate);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        className={cn(
                            'min-h-[2.125rem] h-[2.125rem]',
                            'w-[130px] px-[10px] !py-0',
                            '!cursor-default',
                            'justify-start text-left font-normal',
                            'bg-transparent border border-slate-400',
                            'hover:bg-slate-50!',
                            'active:bg-slate-150!',
                            'data-[popup-open]:bg-slate-150!',
                            '[&>svg]:size-[14px]',

                            isInvalid && [
                                'border-rose-600!',
                                'focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!',
                            ],
                            className,
                        )}
                        disabled={disabled}
                        {...props}
                    >
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className={cn(
                                'mr-1 text-gray-400',
                            )}
                        />
                        {date ? hostFormatDate(date) : placeholder}
                    </Button>
                } />

            <PopoverContent
                className={cn(
                    // Popover width and padding
                    'w-auto p-0!',
                )}
            >
                <Calendar
                    mode="single"
                    selected={date}
                    month={month}
                    onMonthChange={setMonth}
                    captionLayout="dropdown"
                    onSelect={handleSelect}
                />
            </PopoverContent>
        </Popover >
    );
}
