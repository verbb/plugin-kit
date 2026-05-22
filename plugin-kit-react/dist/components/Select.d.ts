import { ComponentProps } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { VariantProps } from 'class-variance-authority';
declare const selectTriggerVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type SelectSize = VariantProps<typeof selectTriggerVariants>['size'];
declare function Select({ size, children, ...props }: ComponentProps<typeof SelectPrimitive.Root> & {
    size?: SelectSize;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props): import("react/jsx-runtime").JSX.Element;
declare function SelectValue({ className, ...props }: SelectPrimitive.Value.Props): import("react/jsx-runtime").JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: SelectPrimitive.Trigger.Props & {
    size?: SelectSize;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectContent({ className, children, side, sideOffset, align, alignOffset, alignItemWithTrigger, ...props }: SelectPrimitive.Popup.Props & Pick<SelectPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'>): import("react/jsx-runtime").JSX.Element;
declare function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props): import("react/jsx-runtime").JSX.Element;
declare function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props): import("react/jsx-runtime").JSX.Element;
declare function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>): import("react/jsx-runtime").JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
//# sourceMappingURL=Select.d.ts.map