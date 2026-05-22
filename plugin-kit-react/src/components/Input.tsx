import { ComponentProps } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@verbb/plugin-kit-react/utils';

const inputVariants = cva('', {
    variants: {
        size: {
            xs: 'px-1.5 py-1 text-[11px]',
            sm: 'px-2 py-1 text-[12px]',
            default: 'px-2 py-1.5 text-sm',
            lg: 'px-3 py-2 text-sm',
            xl: 'px-4 py-2.5 text-base',
        },
        width: {
            xs: 'w-4',
            sm: 'w-8',
            lg: 'w-12',
            xl: 'w-16',
            full: 'w-full',
        },
    },
    defaultVariants: {
        size: 'default',
        width: 'full',
    },
});

function Input({
    className,
    type,
    size,
    width = 'full',
    ...props
}: Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>) {
    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            className={cn(
                // Reset
                'flex outline-none bg-clip-padding',

                'rounded-sm',
                'border border-[rgba(96,125,159,0.4)]',
                'bg-[rgb(251,252,254)]',

                // Themes
                inputVariants({ size, width }),

                // Hover & Focus
                'placeholder:text-[#7c8793]',
                'focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                'aria-invalid:border-rose-600! aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!',

                // Data States
                'disabled:cursor-not-allowed disabled:opacity-50',

                // File
                'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',

                // Custom Classes
                className,
            )}
            {...props}
        />
    );
}
export { Input };
