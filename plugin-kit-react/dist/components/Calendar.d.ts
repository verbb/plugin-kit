import { ComponentProps } from 'react';
import { DayPicker, DayButton, Locale } from 'react-day-picker';
import { Button } from '.';
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, locale, formatters, components, ...props }: ComponentProps<typeof DayPicker> & {
    buttonVariant?: ComponentProps<typeof Button>['variant'];
}): import("react/jsx-runtime").JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, locale, ...props }: ComponentProps<typeof DayButton> & {
    locale?: Partial<Locale>;
}): import("react/jsx-runtime").JSX.Element;
export { Calendar, CalendarDayButton };
//# sourceMappingURL=Calendar.d.ts.map