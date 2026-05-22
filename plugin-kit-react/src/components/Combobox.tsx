import {
    type ComponentProps, ComponentPropsWithRef, createContext, useContext, useRef,
} from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { type VariantProps } from 'class-variance-authority';

import { cn, getPortalClassName, getPortalContainer } from '@verbb/plugin-kit-react/utils';
import { Button } from '@verbb/plugin-kit-react/components';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@verbb/plugin-kit-react/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown, faXmark, faCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { cva } from 'class-variance-authority';

const comboboxItemVariants = cva([
    // Reset
    'relative flex w-full cursor-default items-center outline-hidden select-none',

    // Layout
    'gap-1.5',

    // Focus
    'focus:bg-slate-100 data-[highlighted]:bg-slate-100',

    // Disabled
    'data-disabled:pointer-events-none data-disabled:opacity-50',

    // SVG
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
], {
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

const comboboxItemIndicatorVariants = cva('', {
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

const comboboxItemIndicatorIconVariants = cva('', {
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

const comboboxLabelVariants = cva([
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

const comboboxInputGroupVariants = cva('', {
    variants: {
        size: {
            xs: 'h-7 text-[11px]',
            sm: 'h-8 text-[12px]',
            default: 'h-9 text-[13px]',
            lg: 'h-10 text-sm',
            xl: 'h-11 text-base',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const comboboxSelectInputGroupVariants = cva('', {
    variants: {
        size: {
            xs: 'h-auto rounded-sm text-[11px]',
            sm: 'h-auto rounded-md text-[12px]',
            default: 'h-auto rounded-lg text-[14px]',
            lg: 'h-auto rounded-lg text-sm',
            xl: 'h-auto rounded-lg text-sm',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const comboboxInputControlVariants = cva('', {
    variants: {
        size: {
            xs: 'px-1.5 py-1 text-[11px]',
            sm: 'px-2 py-1 text-[12px]',
            default: 'px-2 py-1.5 text-sm',
            lg: 'px-3 py-2 text-sm',
            xl: 'px-4 py-2.5 text-base',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const comboboxSelectInputControlVariants = cva('', {
    variants: {
        size: {
            xs: 'px-2 py-1 text-[11px]',
            sm: 'px-2.5 py-1.5 text-[12px]',
            default: 'px-[10px] py-[6px] text-[14px]',
            lg: 'px-3 py-2 text-sm',
            xl: 'px-3.5 py-2.5 text-sm',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const comboboxTriggerIconVariants = cva('', {
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

const comboboxTriggerButtonIconVariants = cva('', {
    variants: {
        size: {
            xs: '[&>svg]:size-[10px]',
            sm: '[&>svg]:size-[11px]',
            default: '[&>svg]:size-3',
            lg: '[&>svg]:size-3',
            xl: '[&>svg]:size-3.5',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

const comboboxClearIconVariants = cva('', {
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

const comboboxClearButtonIconVariants = cva('', {
    variants: {
        size: {
            xs: '[&>svg]:size-[10px]',
            sm: '[&>svg]:size-[11px]',
            default: '[&>svg]:size-3',
            lg: '[&>svg]:size-3',
            xl: '[&>svg]:size-3.5',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type ComboboxSize = NonNullable<VariantProps<typeof comboboxItemVariants>['size']>;
type ComboboxHighlightedTextProps = {
    text?: string | number | null;
    search?: string | number | null;
    className?: string;
    matchClassName?: string;
};

const ComboboxContext = createContext<{ size: ComboboxSize }>({ size: 'default' });

function Combobox({
    size = 'default',
    children,
    ...props
}: ComponentProps<typeof ComboboxPrimitive.Root> & { size?: ComboboxSize }) {
    return (
        <ComboboxContext.Provider value={{ size }}>
            <ComboboxPrimitive.Root data-slot="combobox" data-size={size} {...props}>
                {children}
            </ComboboxPrimitive.Root>
        </ComboboxContext.Provider>
    );
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
    return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
    className,
    children,
    ...props
}: ComboboxPrimitive.Trigger.Props) {
    const { size } = useContext(ComboboxContext);

    return (
        <ComboboxPrimitive.Trigger
            data-slot="combobox-trigger"
            className={cn(
                // Icons
                "[&_svg:not([class*='size-'])]:size-4",

                className,
            )}
            {...props}
        >
            {children}
            <FontAwesomeIcon
                icon={faChevronDown}
                className={cn(
                    'pointer-events-none',
                    comboboxTriggerIconVariants({ size }),
                )}
            />
        </ComboboxPrimitive.Trigger>
    );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
    const { size } = useContext(ComboboxContext);

    return (
        <ComboboxPrimitive.Clear data-slot="combobox-clear" className={cn(className)} {...props} render={
            <InputGroupButton
                variant="none"
                size="icon-xs"
                className={comboboxClearButtonIconVariants({ size })}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    className={cn(
                        'pointer-events-none',
                        comboboxClearIconVariants({ size }),
                    )}
                />
            </InputGroupButton>
        } />
    );
}

function ComboboxPrimitiveInput({
    className,
    children,
    disabled = false,
    showTrigger = true,
    showClear = false,
    ...props
}: ComboboxPrimitive.Input.Props & {
    showTrigger?: boolean
    showClear?: boolean
}) {
    const { size } = useContext(ComboboxContext);
    const useSelectTriggerStyle = showTrigger;

    return (
        <InputGroup className={cn(
            'w-fit mb-1!',

            comboboxInputGroupVariants({ size }),
            useSelectTriggerStyle && [
                // Keep single comboboxes visually aligned with SelectTrigger,
                // while search-only combobox inputs retain normal input styling.
                'border-transparent bg-slate-250',
                'hover:bg-slate-300',
                'has-[[data-slot=input-group-control]:focus]:bg-white',
                'has-[[data-popup-open]]:bg-white',
                comboboxSelectInputGroupVariants({ size }),
            ],

            className,
        )}>
            <ComboboxPrimitive.Input
                render={
                    <InputGroupInput
                        disabled={disabled}
                        className={cn(
                            comboboxInputControlVariants({ size }),
                            useSelectTriggerStyle && [
                                'placeholder:text-inherit',
                                'focus:placeholder:text-gray-300',
                                comboboxSelectInputControlVariants({ size }),
                            ],
                        )}
                    />
                }
                {...props}
            />
            <InputGroupAddon align="inline-end">
                {showTrigger && (
                    <InputGroupButton
                        size="icon-xs"
                        variant="none"
                        render={<ComboboxTrigger />}
                        data-slot="input-group-button"
                        className={cn(
                            // Toggle visibility when clear button is shown
                            'group-has-data-[slot=combobox-clear]/input-group:hidden',

                            // Pressed state
                            'data-pressed:bg-transparent',

                            comboboxTriggerButtonIconVariants({ size }),
                        )}
                        disabled={disabled}
                    />
                )}
                {showClear && <ComboboxClear disabled={disabled} />}
            </InputGroupAddon>
            {children}
        </InputGroup>
    );
}

function ComboboxContent({
    className,
    side = 'bottom',
    sideOffset = 6,
    align = 'start',
    alignOffset = 0,
    anchor,
    ...props
}: ComboboxPrimitive.Popup.Props &
    Pick<
        ComboboxPrimitive.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
    >) {
    const { size } = useContext(ComboboxContext);
    const resolvedPortalClassName = getPortalClassName();
    const resolvedPortalContainer = getPortalContainer();

    return (
        <ComboboxPrimitive.Portal className={resolvedPortalClassName} container={resolvedPortalContainer}>
            <ComboboxPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                anchor={anchor}
                className="isolate z-250"
            >
                <ComboboxPrimitive.Popup
                    data-slot="combobox-content"
                    data-chips={!!anchor}
                    data-size={size}
                    className={cn(
                        // Layout
                        'group/combobox-content relative',
                        'max-h-(--available-height) w-[calc(var(--anchor-width)_+_2.25rem)] max-w-(--available-width)',
                        'min-w-[calc(var(--anchor-width)_+_2.25rem)]',
                        'overflow-hidden',
                        'origin-(--transform-origin)',

                        // Theme
                        'rounded-md bg-white',
                        'shadow-[0_0_0_1px_rgba(31,41,51,0.1),0_5px_20px_rgba(31,41,51,0.25)]',

                        // Motion
                        'duration-100',
                        'data-open:animate-in data-closed:animate-out',
                        'data-open:fade-in-0 data-closed:fade-out-0',
                        'data-open:zoom-in-95 data-closed:zoom-out-95',
                        'data-[side=bottom]:slide-in-from-top-2',
                        'data-[side=left]:slide-in-from-right-2',
                        'data-[side=right]:slide-in-from-left-2',
                        'data-[side=top]:slide-in-from-bottom-2',
                        'data-[side=inline-start]:slide-in-from-right-2',
                        'data-[side=inline-end]:slide-in-from-left-2',

                        // Chips mode
                        'data-[chips=true]:min-w-(--anchor-width)',

                        // Nested input group styling
                        '*:data-[slot=input-group]:m-1',
                        '*:data-[slot=input-group]:w-[calc(100%_-_0.5rem)]',
                        '*:data-[slot=input-group]:mb-0',
                        'data-[size=xs]:*:data-[slot=input-group]:h-7',
                        'data-[size=sm]:*:data-[slot=input-group]:h-8',
                        'data-[size=default]:*:data-[slot=input-group]:h-9',
                        'data-[size=lg]:*:data-[slot=input-group]:h-10',
                        'data-[size=xl]:*:data-[slot=input-group]:h-11',
                        '*:data-[slot=input-group]:bg-input/30',
                        '*:data-[slot=input-group]:border-input/30',
                        '*:data-[slot=input-group]:shadow-none',

                        className,
                    )}
                    {...props}
                />
            </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
    );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
    return (
        <ComboboxPrimitive.List
            data-slot="combobox-list"
            className={cn(
                // Layout
                'max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))]',
                'overflow-y-auto overscroll-contain',

                // Utilities
                'no-scrollbar',

                // State
                'data-empty:p-0',

                className,
            )}
            {...props}
        />
    );
}

function ComboboxItem({
    className,
    children,
    ...props
}: ComboboxPrimitive.Item.Props) {
    const { size } = useContext(ComboboxContext);

    return (
        <ComboboxPrimitive.Item
            data-slot="combobox-item"
            className={cn(
                comboboxItemVariants({ size }),

                className,
            )}
            {...props}
        >
            <span className="flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap">
                {children}
            </span>
            <ComboboxPrimitive.ItemIndicator render={
                <span className={cn(
                    'pointer-events-none absolute flex items-center justify-center',
                    comboboxItemIndicatorVariants({ size }),
                )}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={cn(
                            'pointer-events-none',
                            comboboxItemIndicatorIconVariants({ size }),
                        )}
                    />
                </span>
            } />
        </ComboboxPrimitive.Item>
    );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
    return (
        <ComboboxPrimitive.Group
            data-slot="combobox-group"
            className={cn([
                // 'py-1',

                className
            ])}
            {...props}
        />
    );
}

function ComboboxLabel({
    className,
    ...props
}: ComboboxPrimitive.GroupLabel.Props) {
    const { size } = useContext(ComboboxContext);

    return (
        <ComboboxPrimitive.GroupLabel
            data-slot="combobox-label"
            className={cn(
                // Theme
                'text-slate-700',

                // Size
                comboboxLabelVariants({ size }),

                className,
            )}
            {...props}
        />
    );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
    return (
        <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
    );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
    return (
        <ComboboxPrimitive.Empty
            data-slot="combobox-empty"
            className={cn(
                // Layout
                'hidden w-full justify-center py-2 text-center text-sm',

                // Theme
                'text-gray-500',

                // State
                'group-data-empty/combobox-content:flex',

                className,
            )}
            {...props}
        />
    );
}

function ComboboxSeparator({
    className,
    ...props
}: ComboboxPrimitive.Separator.Props) {
    return (
        <ComboboxPrimitive.Separator
            data-slot="combobox-separator"
            className={cn(
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

function ComboboxChips({
    className,
    ...props
}: ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
    ComboboxPrimitive.Chips.Props) {
    return (
        <ComboboxPrimitive.Chips
            data-slot="combobox-chips"
            className={cn(
                // Layout
                'flex-wrap gap-1',
                'px-2 py-1.5 text-sm',

                className,
            )}
            render={<InputGroup />}
            {...props}
        />
    );
}

function ComboboxChip({
    className,
    children,
    showRemove = true,
    ...props
}: ComboboxPrimitive.Chip.Props & {
    showRemove?: boolean
}) {
    return (
        <ComboboxPrimitive.Chip
            data-slot="combobox-chip"
            className={cn(
                // Layout
                'flex w-fit items-center justify-center gap-1',
                'rounded-sm px-1.5 py-[2px]',
                'text-xs font-medium whitespace-nowrap',

                // Theme
                'bg-slate-200',

                // State
                'has-data-[slot=combobox-chip-remove]:pr-0',
                'has-disabled:pointer-events-none',
                'has-disabled:cursor-not-allowed',
                'has-disabled:opacity-50',

                className,
            )}
            {...props}
        >
            {children}
            {showRemove && (
                <ComboboxPrimitive.ChipRemove
                    className="-ml-1 opacity-50 hover:opacity-100"
                    data-slot="combobox-chip-remove"
                    render={
                        <Button variant="none" size="xs">
                            <FontAwesomeIcon icon={faXmark} className="pointer-events-none size-2.5" />
                        </Button>
                    } />
            )}
        </ComboboxPrimitive.Chip>
    );
}

function ComboboxChipsInput({
    className,
    ...props
}: ComboboxPrimitive.Input.Props) {
    return (
        <ComboboxPrimitive.Input
            render={
                <InputGroupInput
                    className={cn(
                        'min-w-16 px-0 py-0',
                        className,
                    )}
                />
            }
            {...props}
        />
    );
}

function useComboboxAnchor() {
    return useRef<HTMLDivElement | null>(null);
}

function ComboboxHighlightedText({
    text = '',
    search = '',
    className,
    matchClassName,
}: ComboboxHighlightedTextProps) {
    const label = String(text || '');
    const query = String(search || '').trim();

    if (!query) {
        return label;
    }

    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const parts: Array<{ text: string; match: boolean }> = [];
    let cursor = 0;
    let matchIndex = lowerLabel.indexOf(lowerQuery);

    while (matchIndex !== -1) {
        if (matchIndex > cursor) {
            parts.push({
                text: label.slice(cursor, matchIndex),
                match: false,
            });
        }

        parts.push({
            text: label.slice(matchIndex, matchIndex + query.length),
            match: true,
        });

        cursor = matchIndex + query.length;
        matchIndex = lowerLabel.indexOf(lowerQuery, cursor);
    }

    if (cursor < label.length) {
        parts.push({
            text: label.slice(cursor),
            match: false,
        });
    }

    return (
        <span className={cn('min-w-0 truncate', className)}>
            {parts.map((part, index) => {
                if (!part.match) {
                    return <span key={index}>{part.text}</span>;
                }

                return (
                    <span key={index} className={cn('rounded-[2px] bg-blue-100', matchClassName)}>
                        {part.text}
                    </span>
                );
            })}
        </span>
    );
}

export {
    Combobox,
    ComboboxPrimitiveInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxSeparator,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxTrigger,
    ComboboxValue,
    ComboboxHighlightedText,
    useComboboxAnchor,
};
