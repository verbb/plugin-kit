import type { ComponentProps, ReactNode } from 'react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { cn } from '@verbb/plugin-kit-react/utils';

export interface SlideUpProps extends Omit<ComponentProps<typeof motion.div>, 'children'> {
    show?: boolean;
    children?: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: Easing;
}

export const SlideUp = ({
    show = true,
    children,
    className,
    duration = 0.2,
    delay = 0,
    ease = 'easeInOut',
    ...props
}: SlideUpProps) => {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div
                    initial={{
                        height: 0,
                        opacity: 0,
                    }}
                    animate={{
                        height: 'auto',
                        opacity: 1,
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration,
                        delay,
                        ease,
                    }}
                    className={cn(
                        'overflow-hidden',
                        className,
                    )}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
