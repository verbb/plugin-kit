import { ComponentProps, createContext, useContext } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cva, type VariantProps } from 'class-variance-authority';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/pro-solid-svg-icons';

import { cn, getPortalClassName, getPortalContainer } from '@verbb/plugin-kit-react/utils';

const dropdownMenuItemVariants = cva([
    // Reset
    'relative flex w-full cursor-default items-center outline-hidden select-none',

    // Focus
    'focus:bg-slate-100 data-[highlighted]:bg-slate-100',

    // Disabled
    'data-disabled:pointer-events-none data-disabled:opacity-50',

    // SVG — use single-quoted attribute selectors so Tailwind emits
    // svg:not([class*=size-]) rather than a broken escaped form.
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
], {
    variants: {
        size: {
            xs: 'py-[3px] px-[8px] gap-1.5 text-[12px] [&_svg:not([class*=\'size-\'])]:size-2.5',
            sm: 'py-[4px] px-[10px] gap-1.75 text-[13px] [&_svg:not([class*=\'size-\'])]:size-3',
            default: 'py-[8px] px-[12px] gap-2.5 text-sm [&_svg:not([class*=\'size-\'])]:size-3',
            lg: 'py-[10px] px-[14px] gap-3 text-base [&_svg:not([class*=\'size-\'])]:size-3.5',
            xl: 'py-[12px] px-[16px] gap-3 text-lg [&_svg:not([class*=\'size-\'])]:size-4',
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

const dropdownMenuLabelVariants = cva([
    // Theme
    'text-slate-700',
], {
    variants: {
        size: {
            xs: 'py-[0px] px-[8px] text-[11px]',
            sm: 'py-[0px] px-[10px] text-[11px]',
            default: 'py-[0px] px-[12px] text-[13px]',
            lg: 'py-[0px] px-[14px] text-[14px]',
            xl: 'py-[0px] px-[16px] text-[15px]',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const dropdownMenuShortcutVariants = cva('', {
    variants: {
        size: {
            xs: 'text-[11px]',
            sm: 'text-xs',
            default: 'text-sm',
            lg: 'text-sm',
            xl: 'text-base',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type DropdownMenuSize = VariantProps<typeof dropdownMenuItemVariants>['size'];

const DropdownMenuContext = createContext<{ size?: DropdownMenuSize }>({});

function DropdownMenu({
    size,
    children,
    ...props
}: ComponentProps<typeof MenuPrimitive.Root> & { size?: DropdownMenuSize }) {
    return (
        <DropdownMenuContext.Provider value={{ size }}>
            <MenuPrimitive.Root data-slot="dropdown-menu" {...props}>
                {children}
            </MenuPrimitive.Root>
        </DropdownMenuContext.Provider>
    );
}
function DropdownMenuPortal({
    container,
    ...props
}: ComponentProps<typeof MenuPrimitive.Portal>) {
    const resolvedPortalContainer = getPortalContainer(container);

    return (
        <MenuPrimitive.Portal
            data-slot="dropdown-menu-portal"
            container={resolvedPortalContainer}
            {...props}
        />
    );
}

function DropdownMenuTrigger({
    size,
    ...props
}: ComponentProps<typeof MenuPrimitive.Trigger> & { size?: DropdownMenuSize }) {
    const context = useContext(DropdownMenuContext);
    const finalSize = size || context.size || 'default';

    return (
        <MenuPrimitive.Trigger
            data-slot="dropdown-menu-trigger"
            data-size={finalSize}
            {...props}
        />
    );
}

function DropdownMenuContent({
    align = 'start',
    alignOffset = 0,
    side = 'bottom',
    sideOffset = 4,
    className,
    portalClassName,
    portalContainer,
    ...props
}: MenuPrimitive.Popup.Props &
    Pick<
        MenuPrimitive.Positioner.Props,
        'align' | 'alignOffset' | 'side' | 'sideOffset'
    > & {
        portalClassName?: string
        portalContainer?: HTMLElement | ShadowRoot | null
    }) {
    const resolvedPortalClassName = getPortalClassName(portalClassName);
    const resolvedPortalContainer = getPortalContainer(portalContainer);

    return (
        <MenuPrimitive.Portal className={resolvedPortalClassName} container={resolvedPortalContainer}>
            <MenuPrimitive.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                className="z-[250]"
            >
                <MenuPrimitive.Popup
                    data-slot="dropdown-menu-content"
                    className={cn(
                        // Reset
                        'relative isolate z-[250] overflow-x-hidden overflow-y-auto',

                        // Layout
                        'min-w-(--anchor-width)',
                        // "min-w-36 max-h-(--available-height) w-(--anchor-width)",

                        // Theme
                        'py-1',
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
                />
            </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
    );
};

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
    return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
    className,
    inset,
    size,
    ...props
}: ComponentProps<typeof MenuPrimitive.GroupLabel> & VariantProps<typeof dropdownMenuLabelVariants> & {
    inset?: boolean
}) {
    const context = useContext(DropdownMenuContext);
    const finalSize = size || context.size || 'default';

    return (
        <MenuPrimitive.GroupLabel
            data-slot="dropdown-menu-label"
            data-inset={inset}
            data-size={finalSize}
            className={cn(
                dropdownMenuLabelVariants({ size: finalSize, className }),
            )}
            {...props}
        />
    );
};

function DropdownMenuItem({
    className,
    inset,
    size,
    variant = 'default',
    ...props
}: ComponentProps<typeof MenuPrimitive.Item> & VariantProps<typeof dropdownMenuItemVariants> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
}) {
    const context = useContext(DropdownMenuContext);
    const finalSize = size || context.size || 'default';

    return (
        <MenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            data-size={finalSize}
            className={cn(
                dropdownMenuItemVariants({ size: finalSize, variant, className }),

                inset && 'pl-8',
            )}
            {...props}
        />
    );
};

function DropdownMenuSub({
    ...props
}: ComponentProps<typeof MenuPrimitive.SubmenuRoot>) {
    return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    size,
    ...props
}: ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & {
    inset?: boolean
    size?: DropdownMenuSize
}) {
    const context = useContext(DropdownMenuContext);
    const finalSize = size || context.size || 'default';

    return (
        <MenuPrimitive.SubmenuTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            data-size={finalSize}
            className={cn(
                dropdownMenuItemVariants({ size: finalSize }),

                // Keep submenu triggers visually active while their child menu is open
                'data-[popup-open]:bg-slate-100',

                // SVG
                '[&_svg]:pointer-events-none [&_svg]:shrink-0',

                inset && 'pl-8',

                className,
            )}
            {...props}
        >
            {children}
            <FontAwesomeIcon icon={faChevronRight} className="ml-auto size-3 text-slate-700" />
        </MenuPrimitive.SubmenuTrigger>
    );
};

function DropdownMenuSubContent({
    align = 'start',
    alignOffset = -3,
    side = 'right',
    sideOffset = 0,
    className,
    ...props
}: ComponentProps<typeof DropdownMenuContent>) {

    return (
        <DropdownMenuContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                'min-w-32 w-auto',
                className,
            )}
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            {...props}
        />
    );
};

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    inset,
    ...props
}: MenuPrimitive.CheckboxItem.Props & {
    inset?: boolean
}) {
    const context = useContext(DropdownMenuContext);
    const finalSize = context?.size || 'default';

    return (
        <MenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            data-inset={inset}
            className={cn(
                dropdownMenuItemVariants({ size: finalSize, className }),
            )}
            checked={checked}
            {...props}
        >
            {children}
            <span
                data-slot="dropdown-menu-checkbox-item-indicator"
                className={cn(
                    'ml-auto pl-4',
                )}
            >
                <MenuPrimitive.CheckboxItemIndicator>
                    <FontAwesomeIcon icon={faCheck} className={cn('size-3')} />
                </MenuPrimitive.CheckboxItemIndicator>
            </span>
        </MenuPrimitive.CheckboxItem>
    );
};

function DropdownMenuRadioGroup({
    ...props
}: ComponentProps<typeof MenuPrimitive.RadioGroup>) {
    return (
        <MenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    );
}

function DropdownMenuRadioItem({
    className,
    children,
    inset,
    ...props
}: MenuPrimitive.RadioItem.Props & {
    inset?: boolean
}) {
    const context = useContext(DropdownMenuContext);
    const finalSize = context?.size || 'default';

    return (
        <MenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            data-inset={inset}
            className={cn(
                dropdownMenuItemVariants({ size: finalSize, className }),
            )}
            {...props}
        >
            {children}
            <span
                data-slot="dropdown-menu-radio-item-indicator"
                className={cn(
                    'ml-auto pl-4',
                )}
            >
                <MenuPrimitive.RadioItemIndicator>
                    <FontAwesomeIcon icon={faCheck} className={cn('size-3')} />
                </MenuPrimitive.RadioItemIndicator>
            </span>
        </MenuPrimitive.RadioItem>
    );
};

function DropdownMenuSeparator({
    className,
    ...props
}: MenuPrimitive.Separator.Props) {
    return (
        <MenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn(
                // Theme
                'my-1 h-px bg-slate-200',

                className,
            )}
            {...props}
        />
    );
};

function DropdownMenuShortcut({
    className,
    ...props
}: ComponentProps<'span'>) {
    const context = useContext(DropdownMenuContext);
    const finalSize = context?.size || 'default';

    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn(
                'text-slate-700 group-focus/dropdown-menu-item:text-slate-700 ml-auto tracking-widest',

                dropdownMenuShortcutVariants({ size: finalSize, className }),

                className,
            )}
            {...props}
        />
    );
};

export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
};
