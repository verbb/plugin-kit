import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { cn, getPortalClassName, getPortalContainer } from '@verbb/plugin-kit-react/utils';

function Popover({ ariaLabel = 'Popover', ...props }: PopoverPrimitive.Root.Props) {
    return <PopoverPrimitive.Root data-slot="popover" ariaLabel={ariaLabel} {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
    return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
    className,
    align = 'center',
    alignOffset = 0,
    side = 'bottom',
    sideOffset = 4,
    positionMethod,
    collisionBoundary,
    collisionPadding,
    sticky,
    collisionAvoidance,
    portalClassName,
    portalContainer,
    ...props
}: PopoverPrimitive.Popup.Props &
    Pick<
        PopoverPrimitive.Positioner.Props,
        | 'align'
        | 'alignOffset'
        | 'side'
        | 'sideOffset'
        | 'positionMethod'
        | 'collisionBoundary'
        | 'collisionPadding'
        | 'sticky'
        | 'collisionAvoidance'
    > & {
        portalClassName?: string
        portalContainer?: HTMLElement | ShadowRoot | null
    }) {
    const resolvedPortalClassName = getPortalClassName(portalClassName);
    const resolvedPortalContainer = getPortalContainer(portalContainer);
    const resolvedPositionMethod = positionMethod ?? (
        resolvedPortalContainer instanceof ShadowRoot ? 'fixed' : undefined
    );

    return (
        <PopoverPrimitive.Portal
            data-slot="popover-portal"
            className={resolvedPortalClassName}
            container={resolvedPortalContainer}
        >
            <PopoverPrimitive.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                positionMethod={resolvedPositionMethod}
                collisionBoundary={collisionBoundary}
                collisionPadding={collisionPadding}
                sticky={sticky}
                collisionAvoidance={collisionAvoidance}
                className="isolate z-50"
            >
                <PopoverPrimitive.Popup
                    data-slot="popover-content"
                    className={cn(
                        // Reset and base styles
                        'z-50 w-72 rounded-md outline-hidden will-change-[transform,opacity]',

                        // Themed styles (backgrounds, colors, shadows, spacing)
                        'bg-white p-4',
                        'shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]',
                        'focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]',

                        // Animation classes for open/closed states
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',

                        // Animation classes for side-based slide-ins
                        'data-[side=bottom]:slide-in-from-top-2',
                        'data-[side=left]:slide-in-from-right-2',
                        'data-[side=right]:slide-in-from-left-2',
                        'data-[side=top]:slide-in-from-bottom-2',

                        // Additional custom classes passed in as props
                        className,
                    )}
                    {...props}
                />
            </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
    );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="popover-header"
            className={cn(
                'flex flex-col gap-0.5 text-sm',

                className,
            )}
            {...props}
        />
    );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
    return (
        <PopoverPrimitive.Title
            data-slot="popover-title"
            className={cn(
                'font-medium text-sm',

                className,
            )}
            {...props}
        />
    );
}

function PopoverDescription({
    className,
    ...props
}: PopoverPrimitive.Description.Props) {
    return (
        <PopoverPrimitive.Description
            data-slot="popover-description"
            className={cn(
                'text-gray-500',

                className,
            )}
            {...props}
        />
    );
}


export {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
};
