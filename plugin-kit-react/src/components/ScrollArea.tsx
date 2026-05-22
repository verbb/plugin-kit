import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import type { RefObject } from 'react';

import { cn } from '@verbb/plugin-kit-react/utils';
import { cva, VariantProps } from 'class-variance-authority';

const scrollAreaVariants = cva('', {
    variants: {
        size: {
            xs: 'data-[orientation=horizontal]:h-[6px] data-[orientation=vertical]:w-[6px] ',
            sm: 'data-[orientation=horizontal]:h-[8px] data-[orientation=vertical]:w-[8px] ',
            default: 'data-[orientation=horizontal]:h-[10px] data-[orientation=vertical]:w-[10px] ',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type ScrollAreaSize = NonNullable<VariantProps<typeof scrollAreaVariants>['size']>;

function ScrollArea({
    className,
    children,
    size = 'default',
    orientation = 'vertical',
    viewPortClassName,
    viewPortRef,
    contentClassName,
    ...props
}: ScrollAreaPrimitive.Root.Props & VariantProps<typeof scrollAreaVariants> & {
    orientation?: 'horizontal' | 'vertical';
    size?: ScrollAreaSize;
    viewPortClassName?: string;
    viewPortRef?: RefObject<HTMLDivElement>;
    contentClassName?: string;
}) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={className}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                ref={viewPortRef}
                className={cn(
                    'focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1',
                    viewPortClassName,
                )}
            >
                <ScrollAreaPrimitive.Content
                    data-slot="scroll-area-content"
                    className={contentClassName}
                >
                    {children}
                </ScrollAreaPrimitive.Content>
            </ScrollAreaPrimitive.Viewport>

            <ScrollAreaPrimitive.Scrollbar
                data-slot="scroll-area-scrollbar"
                orientation={orientation}
                // data-hovering="true"
                className={cn(
                    'data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-[#e8e8e8]',
                    'data-[orientation=vertical]:h-full data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent',
                    'flex touch-none transition-colors select-none',
                    'opacity-0 transition-opacity data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto',
                    'rounded-full bg-[#e4edf6]',

                    scrollAreaVariants({ size }),
                )}
            >
                <ScrollAreaPrimitive.Thumb
                    data-slot="scroll-area-thumb"
                    className="rounded-full bg-[#9aa5b1] hover:bg-[#657383] relative flex-1"
                />
            </ScrollAreaPrimitive.Scrollbar>

            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

export { ScrollArea };
