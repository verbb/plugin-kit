import { ComponentProps, ReactNode } from 'react';
import { motion, Easing } from 'framer-motion';
export interface FadeInProps extends Omit<ComponentProps<typeof motion.div>, 'children'> {
    show?: boolean;
    children?: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: Easing;
}
export declare const FadeIn: ({ show, children, className, duration, delay, ease, ...props }: FadeInProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FadeIn.d.ts.map