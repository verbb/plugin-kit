import React, { ComponentProps, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import { Command as CommandPrimitive, useCommandState } from 'cmdk';

import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from '@verbb/plugin-kit-react/components';

import { cn } from '@verbb/plugin-kit-react/utils';

function Command({
    className,
    ...props
}: ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            data-slot="command"
            className={cn(
                // Layout
                'flex h-full w-full flex-col',

                'text-xs',

                // Appearance
                'rounded shadow-md focus:shadow-md',

                className,
            )}
            {...props}
        />
    );
};

function CommandDialog({
    title = 'Command Palette',
    description = 'Search for a command to run...',
    children,
    showCloseButton = true,
    ...props
}: ComponentProps<typeof Dialog> & {
    title?: string
    description?: string
    showCloseButton?: boolean
}) {
    return (
        <Dialog {...props}>
            <DialogHeader className="sr-only">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <DialogContent
                className="p-0 shadow-lg"
                showCloseButton={showCloseButton}
            >
                <Command className={cn(
                    // Layout
                    '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5',

                    // Appearance
                    '[&_[cmdk-group-heading]]:font-medium',
                    '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
                )}>
                    {children as ReactNode}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

function CommandInput({
    className,
    ...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div
            data-slot="command-input-wrapper"
            className="flex items-center border-b border-slate-150 px-2"
        >
            <FontAwesomeIcon icon={faSearch} className="mr-2 size-3 shrink-0 opacity-50" />

            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    // Layout
                    'flex w-full py-2.5',

                    // Appearance
                    'rounded-md text-xs',

                    // State
                    'shadow-none outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                {...props}
            />
        </div>
    );
};

const CommandList = React.forwardRef<
    HTMLDivElement,
    ComponentProps<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
    return (
        <CommandPrimitive.List
            ref={ref}
            data-slot="command-list"
            className={cn(
                // Layout
                'max-h-[300px] overflow-y-auto',

                // Appearance
                // 'text-xs',

                className,
            )}
            {...props}
        />
    );
});

function CommandEmpty({
    ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className={cn(
                // Layout
                'pt-4 pb-3 text-center',

                // Appearance
                'text-xs',
            )}
            {...props}
        />
    );
};

function CommandGroup({
    className,
    ...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={cn(
                // Layout
                // 'my-1',

                'text-xs',
                "text-gray-600",
                "**:[[cmdk-group-heading]]:text-gray-500",
                "overflow-hidden",
                'py-1',
                '**:[[cmdk-group-heading]]:px-2',
                '**:[[cmdk-group-heading]]:py-1',
                '**:[[cmdk-group-heading]]:text-[11px]',
                '**:[[cmdk-group-heading]]:font-medium',


                // Appearance
                // '[&_[cmdk-group-heading]]:px-2',
                // '[&_[cmdk-group-heading]]:text-[11px]',
                // '[&_[cmdk-group-heading]]:text-slate-700',
                className,
            )}
            {...props}
        />
    );
};

function CommandSeparator({
    className,
    ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={cn(
                // Reset
                'pointer-events-none',

                // Layout
                'h-px',

                // Theme
                'bg-slate-200',

                className,
            )}
            {...props}
        />
    );
};

function CommandItem({
    className,
    ...props
}: ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={cn(
                // Layout
                'relative flex gap-2 items-center px-2 py-1.5',

                // Appearance
                'text-xs data-[selected=true]:bg-slate-100',

                // State
                'cursor-default select-none outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
                '[&_svg]:pointer-events-none [&_svg]:not([class*="size-"]):size-3 [&_svg]:shrink-0',
                className,
            )}
            {...props}
        />
    );
};

function CommandShortcut({
    className,
    ...props
}: ComponentProps<'span'>) {
    return (
        <span
            data-slot="command-shortcut"
            className={cn(
                // Layout
                'ml-auto',

                // Appearance
                'text-xs tracking-widest',
                className,
            )}
            {...props}
        />
    );
};

export {
    Command,
    CommandDialog,
    useCommandState,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
