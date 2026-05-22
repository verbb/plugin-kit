import { useRender } from '@base-ui/react/use-render';
import { VariantProps } from 'class-variance-authority';
import { Separator } from './Separator';
declare const buttonGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>): import("react/jsx-runtime").JSX.Element;
declare function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<'div'>): import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>>;
declare function ButtonGroupSeparator({ className, orientation, ...props }: React.ComponentProps<typeof Separator>): import("react/jsx-runtime").JSX.Element;
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants, };
//# sourceMappingURL=ButtonGroup.d.ts.map