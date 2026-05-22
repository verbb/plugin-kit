import { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@verbb/plugin-kit-react/utils';
import { Button } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import { Textarea } from '@verbb/plugin-kit-react/components';

function InputGroup({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="input-group"
            role="group"
            className={cn(
                // Layout
                'group/input-group outline-none relative flex w-full min-w-0 items-center',
                'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col',
                'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col',
                'has-[>[data-align=block-end]]:[&>input]:pt-3',
                'has-[>[data-align=block-start]]:[&>input]:pb-3',
                'has-[>[data-align=inline-end]]:[&>input]:pr-1.5',
                'has-[>[data-align=inline-start]]:[&>input]:pl-1.5',

                // Theme
                'rounded-sm',
                'border border-[rgba(96,125,159,0.4)]',
                'bg-[rgb(251,252,254)] bg-clip-padding',

                // Focus and validation
                'has-[[data-slot=input-group-control]:focus-visible]:border-sky-600',
                'has-[[data-slot=field-control]:focus-visible]:border-sky-600',
                'has-[[data-slot=input-group-control]:focus-visible]:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                'has-[[data-slot=field-control]:focus-visible]:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                'has-[[data-slot][aria-invalid=true]]:border-rose-600!',

                // Disabled
                'has-disabled:opacity-50',

                className,
            )}
            {...props}
        />
    );
}

const inputGroupAddonVariants = cva(
    [
        // Layout
        'flex h-auto items-center justify-center gap-2',
        'px-2 text-sm',

        // Interaction
        'cursor-text select-none',

        // Disabled
        'group-data-[disabled=true]/input-group:opacity-50',

        // Children
        "[&>svg:not([class*='size-'])]:size-3",
        '[&>kbd]:rounded-[calc(var(--radius)-5px)]',
    ].join(' '),
    {
        variants: {
            align: {
                'inline-start': [
                    // Layout
                    'order-first pl-2',

                    // Child offsets
                    'has-[>button]:ml-[-0.3rem]',
                    'has-[>kbd]:ml-[-0.15rem]',
                ].join(' '),
                'inline-end': [
                    // Layout
                    'order-last pr-2',

                    // Child offsets
                    'has-[>button]:mr-[-0.3rem]',
                    'has-[>kbd]:mr-[-0.15rem]',
                ].join(' '),
                'block-start': [
                    // Layout
                    'order-first w-full justify-start',
                    'px-2.5 pt-2',

                    // State
                    'group-has-[>input]/input-group:pt-2',
                    '[.border-b]:pb-2',
                ].join(' '),
                'block-end': [
                    // Layout
                    'order-last w-full justify-start',
                    'px-2.5 pb-2',

                    // State
                    'group-has-[>input]/input-group:pb-2',
                    '[.border-t]:pt-2',
                ].join(' '),
            },
        },
        defaultVariants: {
            align: 'inline-start',
        },
    },
);

function InputGroupAddon({
    className,
    align = 'inline-start',
    ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
    return (
        <div
            role="group"
            data-slot="input-group-addon"
            data-align={align}
            className={cn(inputGroupAddonVariants({ align }), className)}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) {
                    return;
                }
                e.currentTarget.parentElement?.querySelector('input')?.focus();
            }}
            {...props}
        />
    );
}

const inputGroupButtonVariants = cva(
    [
        // Layout
        'flex items-center gap-2',
        'text-gray-500 text-sm',

        // Theme
        'shadow-none rounded-sm',

        'hover:bg-slate-100',
    ].join(' '),
    {
        variants: {
            size: {
                // xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3",
                xs: '',
                sm: '',
                'icon-xs': 'size-6 [&>svg]:size-3.5 p-0 has-[>svg]:p-0',
                'icon-sm': '',
                // 'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
            },
        },
        defaultVariants: {
            size: 'xs',
        },
    },
);

function InputGroupButton({
    className,
    type = 'button',
    variant = 'none',
    size = 'xs',
    ...props
}: Omit<ComponentProps<typeof Button>, 'size' | 'type'> &
    VariantProps<typeof inputGroupButtonVariants> & {
        type?: 'button' | 'submit' | 'reset'
        disabled?: boolean
    }) {
    return (
        <Button
            type={type}
            data-size={size}
            variant={variant}
            className={cn(inputGroupButtonVariants({ size }), className)}
            {...props}
        />
    );
}

function InputGroupText({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            className={cn(
                // Layout
                'flex items-center gap-2 text-sm',

                // Theme
                'text-gray-500',

                // Icons
                "[&_svg:not([class*='size-'])]:size-3",
                '[&_svg]:pointer-events-none',

                className,
            )}
            {...props}
        />
    );
}

function InputGroupInput({
    className,
    ...props
}: Omit<ComponentProps<'input'>, 'size' | 'width'>) {
    return (
        <Input
            data-slot="input-group-control"
            className={cn(
                // Layout
                'flex-1',
                'rounded-none border-0',

                // Theme
                'bg-transparent',
                'shadow-none!',

                // Disabled
                'disabled:bg-transparent',

                className,
            )}
            {...props}
        />
    );
}

function InputGroupTextarea({
    className,
    ...props
}: ComponentProps<'textarea'>) {
    return (
        <Textarea
            data-slot="input-group-control"
            className={cn(
                // Layout
                'flex-1',
                'rounded-none border-0 py-2',
                'resize-none',

                // Theme
                'bg-transparent',
                'shadow-none!',

                // Disabled
                'disabled:bg-transparent',

                className,
            )}
            {...props}
        />
    );
}

export {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupInput,
    InputGroupTextarea,
};
