import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@verbb/plugin-kit-react/utils';

const spinnerVariants = cva('', {
    variants: {
        variant: {
            default: [
                'border-t-red-500 border-r-red-500',
            ],

            primary: [
                'border-t-white border-r-white',
            ],

            secondary: [
                'border-t-white border-r-white',
            ],

            dashed: [
                'border-t-gray-700 border-r-gray-700',
            ],

            outline: [
                'border-t-gray-700 border-r-gray-700',
            ],

            transparent: [
                'border-t-gray-700 border-r-gray-700',
            ],
        },
        size: {
            xxs: 'size-3 border-1',
            xs: 'size-4 border-2',
            sm: 'size-6 border-2',
            md: 'size-8 border-2',
            lg: 'size-12 border-2',
            xl: 'size-16 border-2',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'sm',
    },
});

function Spinner({
    className,
    variant,
    size,
    ...props
}: ComponentProps<'div'> & VariantProps<typeof spinnerVariants>) {
    return <div
        className={cn(
            'mx-auto border-2 border-b-transparent border-l-transparent rounded-full animate-spin',

            spinnerVariants({
                variant, size, className,
            }),
        )}
        {...props}
    />;
};

export { Spinner };
