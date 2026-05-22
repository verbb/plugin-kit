import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@verbb/plugin-kit-react/utils';
import { Separator } from '@verbb/plugin-kit-react/components/Separator';

const buttonGroupVariants = cva([
    // Layout
    'flex w-fit items-stretch',

    // Child sizing
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",

    // Focus layering
    '*:focus-visible:z-10 *:focus-visible:relative',

    // Nested group spacing
    'has-[>[data-slot=button-group]]:gap-2',

    // Select edge-case rounding
    'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg',
],
    {
        variants: {
            orientation: {
                horizontal: [
                    // Last item keeps the right edge radius
                    '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!',

                    // Remove interior seams
                    '[&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0',

                    // Ensure non-last items are flush on the right
                    '*:data-slot:rounded-r-none',
                ],
                vertical: [
                    // Stack children vertically
                    'flex-col',

                    // Last item keeps the bottom edge radius
                    '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!',

                    // Remove interior seams
                    '[&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',

                    // Ensure non-last items are flush on the bottom
                    '*:data-slot:rounded-b-none',
                ],
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    });

function ButtonGroup({
    className,
    orientation,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
    return (
        <div
            role="group"
            data-slot="button-group"
            data-orientation={orientation}
            className={cn(buttonGroupVariants({ orientation }), className)}
            {...props}
        />
    );
}

function ButtonGroupText({
    className,
    render,
    ...props
}: useRender.ComponentProps<'div'>) {
    return useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>({
            className: cn(
                // Layout
                'flex items-center gap-2 rounded-lg border px-2.5',

                // Typography
                'text-sm font-medium',

                // Theme
                'border-slate-300 bg-slate-200 text-gray-700',

                // Icons
                "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",

                className,
            ),
        },
            props),
        render,
        state: {
            slot: 'button-group-text',
        },
    });
}

function ButtonGroupSeparator({
    className,
    orientation = 'vertical',
    ...props
}: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="button-group-separator"
            orientation={orientation}
            className={cn(
                // Layout
                'relative self-stretch',

                // Theme
                'bg-white',

                // Orientation tweaks
                'data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto',
                'data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto',

                className,
            )}
            {...props}
        />
    );
}

export {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
    buttonGroupVariants,
};
