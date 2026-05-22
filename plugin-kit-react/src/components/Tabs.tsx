import { ComponentProps } from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import { cn } from '@verbb/plugin-kit-react/utils';

function Tabs({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-3', className)}
            {...props}
        />
    );
}

function TabsList({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                // Reset and layout
                'inline-flex w-fit self-start items-center justify-center',
                'rounded-md p-0.5',

                // Themes
                'border border-gray-150 bg-gray-100/90 text-gray-500',
                'shadow-[0_1px_2px_rgba(31,41,51,0.06)]',

                className,
            )}
            {...props}
        />
    );
}

function TabsTrigger({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
    return (
        <TabsPrimitive.Tab
            data-slot="tabs-trigger"
            className={cn(
                // Reset and layout
                'inline-flex items-center justify-center whitespace-nowrap cursor-pointer outline-none',
                'min-h-8 rounded-sm px-3 py-1.5 text-[13px] font-medium',

                // Transitions
                'transition-[background-color,color,box-shadow]',

                // Default state
                'text-gray-500',
                'hover:bg-white/70 hover:text-gray-700',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                // Disabled state
                'disabled:pointer-events-none disabled:opacity-50',

                // Active state
                'data-[active]:bg-white data-[active]:text-gray-800',
                'data-[active]:shadow-[0_1px_2px_rgba(31,41,51,0.12)]',

                className,
            )}
            {...props}
        />
    );
}

function TabsContent({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
    return (
        <TabsPrimitive.Panel
            data-slot="tabs-content"
            className={cn(
                // Reset and layout
                'outline-none',
                'mt-2',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                className,
            )}
            {...props}
        />
    );
};

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
};
