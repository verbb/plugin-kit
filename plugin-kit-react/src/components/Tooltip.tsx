import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn, getPortalContainer } from '@verbb/plugin-kit-react/utils';

function TooltipProvider({
    delay = 0,
    ...props
}: TooltipPrimitive.Provider.Props) {
    return (
        <TooltipPrimitive.Provider
            data-slot="tooltip-provider"
            delay={delay}
            {...props}
        />
    );
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
    return (
        <TooltipPrimitive.Provider delay={0}>
            <TooltipPrimitive.Root data-slot="tooltip" {...props} />
        </TooltipPrimitive.Provider>
    );
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
    className,
    side = 'top',
    sideOffset = 4,
    align = 'center',
    alignOffset = 0,
    portalContainer,
    children,
    ...props
}: TooltipPrimitive.Popup.Props &
    Pick<
        TooltipPrimitive.Positioner.Props,
        'align' | 'alignOffset' | 'side' | 'sideOffset'
    > & {
        portalContainer?: HTMLElement | ShadowRoot | null
    }) {
    const resolvedPortalContainer = getPortalContainer(portalContainer);

    return (
        <TooltipPrimitive.Portal container={resolvedPortalContainer}>
            <TooltipPrimitive.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                className="isolate z-250"
            >
                <TooltipPrimitive.Popup
                    data-slot="tooltip-content"
                    className={cn(
                        // Layout
                        'rounded-sm px-[8px] py-[4px] w-fit max-w-xs',

                        // Theme
                        'bg-[#1c2e36] text-white text-[12px]',

                        // Stacking
                        'z-50 origin-(--transform-origin)',

                        // Open animation
                        'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
                        'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',

                        // Closed animation
                        'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',

                        // Side-specific slide animations
                        'data-[side=top]:slide-in-from-bottom-2',
                        'data-[side=bottom]:slide-in-from-top-2',
                        'data-[side=left]:slide-in-from-right-2',
                        'data-[side=right]:slide-in-from-left-2',
                        'data-[side=inline-start]:slide-in-from-right-2',
                        'data-[side=inline-end]:slide-in-from-left-2',

                        className,
                    )}
                    {...props}
                >
                    {children}
                    <TooltipPrimitive.Arrow
                        className={cn(
                            // Shape
                            'size-2.5 rotate-45 rounded-[2px]',
                            'translate-y-[calc(-50%-2px)]',

                            // Theme
                            'bg-[#1c2e36] fill-[#1c2e36]',

                            // Stacking
                            'z-50',

                            // Side-specific positioning
                            'data-[side=top]:-bottom-2.5',
                            'data-[side=bottom]:top-1',
                            'data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2',
                            'data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2',
                            'data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2',
                            'data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2',
                        )}
                    />
                </TooltipPrimitive.Popup>
            </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
    );
}

export {
    Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
};
