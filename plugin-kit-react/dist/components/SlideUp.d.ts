import { ComponentProps, ReactNode } from 'react';
import { motion, Easing } from 'framer-motion';
export interface SlideUpProps extends Omit<ComponentProps<typeof motion.div>, 'children'> {
    show?: boolean;
    children?: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: Easing;
}
export declare const SlideUp: ({ show, children, className, duration, delay, ease, ...props }: SlideUpProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SlideUp.d.ts.map