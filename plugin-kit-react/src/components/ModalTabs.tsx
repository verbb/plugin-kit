import { ComponentProps } from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import { cn } from '@verbb/plugin-kit-react/utils';

function ModalTabs({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn(
                'overflow-hidden',
                'rounded-lg',
                'h-full',
                'min-h-0',
                'flex flex-col',

                className,
            )}
            {...props}
        />
    );
}

function ModalTabsList({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'flex flex-row flex-nowrap',
                'w-full',
                'min-w-0 max-w-full',
                'overflow-x-auto overflow-y-hidden',
                'bg-white',
                'z-11',
                'shadow-[0_1px_5px_#cdd8e440]',
                'border-b border-b-gray-100',

                className,
            )}
            {...props}
        />
    );
}

function ModalTabsTrigger({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
    return (
        <TabsPrimitive.Tab
            data-slot="tabs-trigger"
            className={cn(
                'outline-none shadow-none cursor-pointer',
                'shrink-0 whitespace-nowrap',

                'relative',
                'px-[15px]',
                'pt-[15px]',
                'pb-[15px]',
                'text-[#64788d]',
                'text-[12px]',
                'font-medium',
                'uppercase',

                // Hover state
                'hover:text-sky-600',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                // Active state
                'data-[active]:after:content-[""]',
                'data-[active]:after:absolute',
                'data-[active]:after:bottom-0',
                'data-[active]:after:left-[15px]',
                'data-[active]:after:right-0',
                'data-[active]:after:w-[calc(100%-30px)]',
                'data-[active]:after:h-[2px]',
                'data-[active]:after:bg-sky-600',

                className,
            )}
            {...props}
        />
    );
}

function ModalTabsContent({
    className,
    ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
    return (
        <TabsPrimitive.Panel
            data-slot="tabs-content"
            className={cn(
                // Reset and layout
                'outline-none',
                'flex-1 min-h-0',

                'p-4',
                'overflow-y-auto',

                // Accessibility
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]',

                className,
            )}
            {...props}
        />
    );
}

export {
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
};
