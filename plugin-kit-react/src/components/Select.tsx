import { ComponentProps, createContext, useContext } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { cva, type VariantProps } from 'class-variance-authority';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';

import { cn, getPortalClassName, getPortalContainer } from '@verbb/plugin-kit-react/utils';

const selectTriggerVariants = cva('', {
    variants: {
        size: {
            xs: 'px-2 py-1 text-[11px] rounded-sm [&_svg:not([class*="size-"])]:size-3',
            sm: 'px-2.5 py-1.5 text-[12px] rounded-md [&_svg:not([class*="size-"])]:size-3',
            default: 'px-[10px] py-[6px] text-[14px] rounded-lg [&_svg:not([class*="size-"])]:size-3',
            lg: 'px-3 py-2 text-sm rounded-lg [&_svg:not([class*="size-"])]:size-3',
            xl: 'px-3.5 py-2.5 text-sm rounded-lg [&_svg:not([class*="size-"])]:size-3',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const selectTriggerIconVariants = cva('', {
    variants: {
        size: {
            xs: 'size-[10px]',
            sm: 'size-[11px]',
            default: 'size-3',
            lg: 'size-3',
            xl: 'size-3.5',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const selectItemIndicatorVariants = cva('', {
    variants: {
        size: {
            xs: 'right-2 size-3',
            sm: 'right-2.5 size-3',
            default: 'right-2 size-3',
            lg: 'right-3 size-3',
            xl: 'right-3.5 size-3',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});
const selectItemIndicatorIconVariants = cva('', {
    variants: {
        size: {
            xs: 'size-3',
            sm: 'size-3',
            default: 'size-3',
            lg: 'size-3',
            xl: 'size-3',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const selectLabelVariants = cva([
    // Theme
    'text-slate-700',
], {
    variants: {
        size: {
            xs: 'px-2 pt-1 text-[11px]',
            sm: 'px-2.5 pt-1 text-[12px]',
            default: 'px-2.5 pt-1 text-xs',
            lg: 'px-3 pt-1 text-sm',
            xl: 'px-3.5 pt-1 text-base',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const selectItemVariants = cva('', {
    variants: {
        size: {
            xs: 'px-2 py-1 pr-7 text-[11px] [&_svg:not([class*="size-"])]:size-3',
            sm: 'px-2.5 py-1.5 pr-7 text-[12px] [&_svg:not([class*="size-"])]:size-3',
            default: 'px-[10px] py-[6px] pr-8 text-[14px] [&_svg:not([class*="size-"])]:size-3',
            lg: 'px-3 py-2 pr-8 text-sm [&_svg:not([class*="size-"])]:size-3',
            xl: 'px-3.5 py-2.5 pr-9 text-sm [&_svg:not([class*="size-"])]:size-3',


        },
        variant: {
            default: '',
            destructive: 'text-error',
        },
    },
    defaultVariants: {
        size: 'default',
        variant: 'default',
    },
});

type SelectSize = VariantProps<typeof selectTriggerVariants>['size'];

const SelectContext = createContext<{ size: SelectSize }>({ size: 'default' });

function Select({
    size = 'default',
    children,
    ...props
}: ComponentProps<typeof SelectPrimitive.Root> & { size?: SelectSize }) {
    return (
        <SelectContext.Provider value={{ size }}>
            <SelectPrimitive.Root data-slot="select" data-size={size} {...props}>
                {children}
            </SelectPrimitive.Root>
        </SelectContext.Provider>
    );
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
    return (
        <SelectPrimitive.Group
            data-slot="select-group"
            className={cn(
                className,
            )}
            {...props}
        />
    );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
    return (
        <SelectPrimitive.Value
            data-slot="select-value"
            className={cn(
                // Layout
                'min-w-0 flex-1 basis-0 overflow-hidden text-left truncate',

                className,
            )}
            {...props}
        />
    );
}

function SelectTrigger({
    className,
    size,
    children,
    ...props
}: SelectPrimitive.Trigger.Props & {
    size?: SelectSize;
}) {
    const context = useContext(SelectContext);
    const finalSize = size || context.size || 'default';

    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            data-size={finalSize}
            className={cn(
                // Reset
                'flex w-fit items-center justify-between whitespace-nowrap outline-none select-none transition-none',

                // Layout
                'gap-3',

                // Theme
                'bg-slate-250',
                'border border-transparent',

                // Hover
                'hover:not-disabled:bg-slate-300',

                // Value
                '*:data-[slot=select-value]:flex',
                '*:data-[slot=select-value]:items-center',
                '*:data-[slot=select-value]:gap-1.5',
                '*:data-[slot=select-value]:line-clamp-1',

                // Focus
                'focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                'aria-invalid:border-rose-600! aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!',

                // Disabled
                'disabled:cursor-not-allowed disabled:opacity-50',

                // Icons
                '[&_svg]:pointer-events-none [&_svg]:shrink-0',

                selectTriggerVariants({ size: finalSize }),

                className,
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon
                render={
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cn(
                            'pointer-events-none',
                            selectTriggerIconVariants({ size: finalSize }),
                        )}
                    />
                }
            />
        </SelectPrimitive.Trigger>
    );
}

/* eslint-disable no-use-before-define */
function SelectContent({
    className,
    children,
    side = 'bottom',
    sideOffset = 4,
    align = 'center',
    alignOffset = 0,
    alignItemWithTrigger = true,
    ...props
}: SelectPrimitive.Popup.Props &
    Pick<
        SelectPrimitive.Positioner.Props,
        'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
    >) {
    const resolvedPortalClassName = getPortalClassName();
    const resolvedPortalContainer = getPortalContainer();

    return (
        <SelectPrimitive.Portal className={resolvedPortalClassName} container={resolvedPortalContainer}>
            <SelectPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                alignItemWithTrigger={alignItemWithTrigger}
                className="isolate z-50"
            >
                <SelectPrimitive.Popup
                    data-slot="select-content"
                    data-align-trigger={alignItemWithTrigger}
                    className={cn(
                        // Reset
                        'relative isolate z-50 overflow-x-hidden overflow-y-auto',

                        // Layout
                        'min-w-(--anchor-width)',
                        'max-w-[min(36rem,calc(100vw-2rem))]',

                        // Theme
                        'rounded-md bg-white',
                        'shadow-[0_0_0_1px_rgba(31,41,51,0.1),0_5px_20px_rgba(31,41,51,0.25)]',

                        // Animation
                        'duration-100',
                        'data-open:animate-in data-closed:animate-out',
                        'data-open:fade-in-0 data-closed:fade-out-0',
                        'data-open:zoom-in-95 data-closed:zoom-out-95',
                        'data-[side=bottom]:slide-in-from-top-2',
                        'data-[side=top]:slide-in-from-bottom-2',
                        'data-[side=left]:slide-in-from-right-2',
                        'data-[side=right]:slide-in-from-left-2',
                        'data-[side=inline-start]:slide-in-from-right-2',
                        'data-[side=inline-end]:slide-in-from-left-2',
                        'data-[align-trigger=true]:animate-none',
                        'origin-(--transform-origin)',

                        className,
                    )}
                    {...props}
                >
                    <SelectScrollUpButton />
                    <SelectPrimitive.List>{children}</SelectPrimitive.List>
                    <SelectScrollDownButton />
                </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({
    className,
    ...props
}: SelectPrimitive.GroupLabel.Props) {
    const { size } = useContext(SelectContext);

    return (
        <SelectPrimitive.GroupLabel
            data-slot="select-label"
            className={cn(
                // Theme
                'text-slate-700',

                // Size
                selectLabelVariants({ size }),

                className,
            )}
            {...props}
        />
    );
}

function SelectItem({
    className,
    children,
    ...props
}: SelectPrimitive.Item.Props) {
    const { size } = useContext(SelectContext);

    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                // Reset
                'relative flex w-full cursor-default items-center outline-hidden select-none',

                // Layout
                'gap-1.5',
                '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',

                // Focus
                'focus:bg-slate-100 data-[highlighted]:bg-slate-100',

                // Disabled
                'data-disabled:pointer-events-none data-disabled:opacity-50',

                // Icons
                '[&_svg]:pointer-events-none [&_svg]:shrink-0',

                selectItemVariants({ size }),

                className,
            )}
            {...props}
        >
            <SelectPrimitive.ItemText className="flex min-w-0 items-center flex-1 gap-2 whitespace-nowrap">
                {children}
            </SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator
                render={
                    <span
                        className={cn(
                            'pointer-events-none absolute flex items-center justify-center',

                            selectItemIndicatorVariants({ size }),
                        )}
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={cn(
                                'pointer-events-none',
                                selectItemIndicatorIconVariants({ size }),
                            )}
                        />
                    </span>
                }
            />
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({
    className,
    ...props
}: SelectPrimitive.Separator.Props) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn(
                // Reset
                'pointer-events-none',

                // Layout
                '-mx-1 my-1 h-px',

                // Theme
                'bg-slate-200',

                className,
            )}
            {...props}
        />
    );
}

function SelectScrollUpButton({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
    return (
        <SelectPrimitive.ScrollUpArrow
            data-slot="select-scroll-up-button"
            className={cn(
                // Layout
                'top-0 w-full flex items-center justify-center',
                'cursor-default',

                // Theme
                'bg-white py-1',

                // Icons
                "[&_svg:not([class*='size-'])]:size-3",

                className,
            )}
            {...props}
        >
            <FontAwesomeIcon icon={faChevronUp} className="size-3 pointer-events-none" />
        </SelectPrimitive.ScrollUpArrow>
    );
}

function SelectScrollDownButton({
    className,
    ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
    return (
        <SelectPrimitive.ScrollDownArrow
            data-slot="select-scroll-down-button"
            className={cn(
                // Layout
                'bottom-0 w-full flex items-center justify-center',
                'cursor-default',

                // Theme
                'bg-white py-1',

                // Icons
                "[&_svg:not([class*='size-'])]:size-3",

                className,
            )}
            {...props}
        >
            <FontAwesomeIcon icon={faChevronDown} className="size-3 pointer-events-none" />
        </SelectPrimitive.ScrollDownArrow>
    );
}
/* eslint-enable no-use-before-define */

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
