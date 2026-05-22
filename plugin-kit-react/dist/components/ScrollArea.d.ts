import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { RefObject } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const scrollAreaVariants: (props?: ({
    size?: "default" | "xs" | "sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type ScrollAreaSize = NonNullable<VariantProps<typeof scrollAreaVariants>['size']>;
declare function ScrollArea({ className, children, size, orientation, viewPortClassName, viewPortRef, contentClassName, ...props }: ScrollAreaPrimitive.Root.Props & VariantProps<typeof scrollAreaVariants> & {
    orientation?: 'horizontal' | 'vertical';
    size?: ScrollAreaSize;
    viewPortClassName?: string;
    viewPortRef?: RefObject<HTMLDivElement>;
    contentClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
export { ScrollArea };
//# sourceMappingURL=ScrollArea.d.ts.map