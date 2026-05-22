import {
    cloneElement,
    forwardRef,
    isValidElement,
    type ReactElement,
} from 'react';

import { cn } from '@verbb/plugin-kit-react/utils';

const mergeEventHandlers = <T extends (...args: unknown[]) => void>(
    parentHandler?: T,
    childHandler?: T,
) => {
    if (!parentHandler) {
        return childHandler;
    }

    if (!childHandler) {
        return parentHandler;
    }

    return ((...args: Parameters<T>) => {
        childHandler(...args);
        parentHandler(...args);
    }) as T;
};

const mergeRefs = (...refs: Array<unknown>) => {
    return (node: HTMLElement | null) => {
        refs.forEach((ref) => {
            if (!ref) {
                return;
            }

            if (typeof ref === 'function') {
                ref(node);
                return;
            }

            if (typeof ref === 'object' && 'current' in ref) {
                (ref as { current?: HTMLElement | null }).current = node;
            }
        });
    };
};

const mergeProps = (
    slotProps: Record<string, unknown>,
    childProps: Record<string, unknown>,
) => {
    const mergedProps: Record<string, unknown> = {
        ...slotProps,
        ...childProps,
    };

    mergedProps.className = cn(
        slotProps.className as string | undefined,
        childProps.className as string | undefined,
    );

    mergedProps.style = {
        ...(slotProps.style as Record<string, unknown> | undefined),
        ...(childProps.style as Record<string, unknown> | undefined),
    };

    Object.keys(childProps).forEach((propName) => {
        if (propName.startsWith('on') && typeof childProps[propName] === 'function') {
            mergedProps[propName] = mergeEventHandlers(
                slotProps[propName] as ((...args: unknown[]) => void) | undefined,
                childProps[propName] as ((...args: unknown[]) => void) | undefined,
            );
        }
    });

    if (slotProps.ref || childProps.ref) {
        mergedProps.ref = mergeRefs(slotProps.ref, childProps.ref);
    }

    return mergedProps;
};

const Slot = forwardRef<HTMLElement, { children?: ReactElement } & Record<string, unknown>>(
    ({ children, ...props }, ref) => {
        if (!isValidElement(children)) {
            return null;
        }

        const mergedProps = mergeProps(
            { ...props, ref },
            children.props as Record<string, unknown>,
        );

        return cloneElement(children, mergedProps);
    },
);

Slot.displayName = 'Slot';

export { Slot };
