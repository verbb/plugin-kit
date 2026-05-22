import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';

import { cn } from '@verbb/plugin-kit-react/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
    return (
        <RadioGroupPrimitive
            data-slot="radio-group"
            className={cn(
                // Layout and spacing
                'grid gap-1.5',

                className,
            )}
            {...props}
        />
    );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
    return (
        <RadioPrimitive.Root
            data-slot="radio-group-item"
            className={cn(
                // Layout, shape, and borders
                // 'aspect-square h-4 w-4 rounded-full border border-primary',

                // // Text and focus styles
                // 'text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

                // // Disabled state
                // 'disabled:cursor-not-allowed disabled:opacity-50',

                // Reset
                'peer cursor-pointer aspect-square shrink-0 rounded-full outline-none border',

                // Themes
                'size-4 border-slate-400',

                // States
                'focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]',
                'aria-invalid:border-rose-600 aria-invalid:focus-visible:!shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]',

                'disabled:cursor-not-allowed disabled:opacity-50',
                'data-checked:bg-slate-50 data-checked:text-[#1f2933]',

                className,
            )}
            {...props}
        >
            <RadioPrimitive.Indicator
                data-slot="radio-group-indicator"
                className={cn(
                    // Flex alignment for the indicator
                    'flex items-center justify-center h-full w-full',
                )}
            >
                <FontAwesomeIcon
                    icon={faCircle}
                    className={cn(
                        // Size and color of the indicator
                        'size-2 fill-current text-current',
                    )}
                />
            </RadioPrimitive.Indicator>
        </RadioPrimitive.Root>
    );
}

export { RadioGroup, RadioGroupItem };
