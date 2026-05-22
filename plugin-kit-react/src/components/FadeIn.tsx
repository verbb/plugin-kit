import type { ComponentProps, ReactNode } from 'react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { cn } from '@verbb/plugin-kit-react/utils';

export interface FadeInProps extends Omit<ComponentProps<typeof motion.div>, 'children'> {
    show?: boolean;
    children?: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    ease?: Easing;
}

export const FadeIn = ({
    show = true,
    children,
    className,
    duration = 0.2,
    delay = 0,
    ease = 'easeInOut',
    ...props
}: FadeInProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration,
                        delay,
                        ease,
                    }}
                    className={cn(className)}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
