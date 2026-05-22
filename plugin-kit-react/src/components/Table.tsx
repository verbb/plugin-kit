import { ComponentProps, forwardRef } from 'react';

import { cn } from '@verbb/plugin-kit-react/utils';

function Table({ className, ...props }: ComponentProps<'table'>) {
    return (
        <div data-slot="table-container" className={cn(
            // 'relative w-full overflow-x-auto',

            'border border-gray-200 rounded-md rounded-b-none overflow-x-auto',
        )}>
            <table
                data-slot="table"
                className={cn(
                    'w-full',
                    // 'w-full caption-bottom text-sm',

                    className,
                )}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
    return (
        <thead
            data-slot="table-header"
            className={cn(
                // '[&_tr]:border-b',
                'bg-gray-50',

                className,
            )}
            {...props}
        />
    );
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                '[&_tr:last-child]:border-0',
                '[&_tr]:bg-white',

                'relative',

                className,
            )}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                // 'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',

                className,
            )}
            {...props}
        />
    );
}

const TableRow = forwardRef<HTMLTableRowElement, ComponentProps<'tr'>>(({ className, ...props }, ref) => {
    return (
        <tr
            ref={ref}
            data-slot="table-row"
            className={cn(
                // 'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
                className,
            )}
            {...props}
        />
    );
});

TableRow.displayName = 'TableRow';

function TableHead({ className, ...props }: ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'whitespace-nowrap',
                // 'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0',
                'px-2 py-1.5! text-left text-xs font-medium text-gray-700',

                className,
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'h-[34px]',
                'whitespace-nowrap',
                // 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
                'p-0 border-t border-gray-100 border-l border-l-gray-100 first:border-l-0',

                className,
            )}
            {...props}
        />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
};
