import { ComponentProps } from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import { cn } from '@verbb/plugin-kit-react/utils';

function PaneTabs({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn(
                // Reset and layout
                'flex flex-col h-full',

                'rounded-lg',
                'shadow-[0_0_0_1px_var(--color-gray-200),_0_2px_12px_rgb(205_216_228_/_50%)]',

                className,
            )}
            {...props}
        />
    );
}

function PaneTabsList({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                // Reset and layout
                'flex',

                'shadow-[inset_0_-1px_0_0_rgba(154,165,177,0.25)]',

                'bg-gray-50 rounded-t-lg',

                className,
            )}
            {...props}
        />
    );
}

function PaneTabsTrigger({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
    return (
        <TabsPrimitive.Tab
            data-slot="tabs-trigger"
            className={cn(
                // Reset and layout
                'flex items-center cursor-pointer outline-none whitespace-nowrap',

                'h-[45px] px-[24px] text-gray-550',

                // Hover state
                'hover:bg-slate-100',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                // Active state
                'data-[active]:rounded-t-xs data-[active]:relative data-[active]:bg-white data-[active]:hover:bg-white data-[active]:text-gray-700 data-[active]:shadow-[inset_0_2px_0_rgb(107,114,128),0_0_0_1px_rgba(51,64,77,0.1),0_2px_12px_rgba(205,216,228,0.9)]',

                className,
            )}
            {...props}
        />
    );
}

function PaneTabsContent({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
    return (
        <TabsPrimitive.Panel
            data-slot="tabs-content"
            className={cn(
                // Reset and layout
                'outline-none',
                'relative',
                'h-full',

                'overflow-y-auto',
                'bg-white rounded-b-lg',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                className,
            )}
            {...props}
        />
    );
}

export {
    PaneTabs,
    PaneTabsList,
    PaneTabsTrigger,
    PaneTabsContent,
};
