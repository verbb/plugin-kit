import { ComponentProps } from 'react';

import { cn } from '@verbb/plugin-kit-react/utils';

function Label({
    className,
    ...props
}: ComponentProps<'label'>) {
    return (
        <label
            data-slot="label"
            className={cn('text-sm font-bold leading-none', className)}
            {...props}
        />
    );
};

export { Label };
