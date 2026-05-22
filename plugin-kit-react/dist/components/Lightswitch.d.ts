import { ComponentProps } from 'react';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { VariantProps } from 'class-variance-authority';
declare const lightswitchVariants: (props?: ({
    size?: "default" | "xs" | "sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Lightswitch({ className, size, ...props }: ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof lightswitchVariants>): import("react/jsx-runtime").JSX.Element;
export { Lightswitch };
//# sourceMappingURL=Lightswitch.d.ts.map