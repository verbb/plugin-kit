import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
    type Placement,
} from '@floating-ui/dom';

import { isTopDismissible, registerDismissible, unregisterDismissible } from '../a11y/dismissible-stack.js';

export type FloatingPlacement = Placement;

export type AttachFloatingOptions = {
    reference: HTMLElement;
    floating: HTMLElement;
    placement?: FloatingPlacement;
    offset?: number;
    dismissKey?: object;
    onDismiss?: () => void;
};

export type FloatingCleanup = () => void;

/** Position a floating element relative to a reference —  popup pattern. */
export function attachFloating({
    reference,
    floating,
    placement = 'bottom-start',
    offset: mainAxis = 4,
    dismissKey,
    onDismiss,
}: AttachFloatingOptions): FloatingCleanup {
    const update = async () => {
        const { x, y } = await computePosition(reference, floating, {
            placement,
            middleware: [
                offset(mainAxis),
                flip(),
                shift({ padding: 8 }),
            ],
        });

        Object.assign(floating.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
        });
    };

    const stopAutoUpdate = autoUpdate(reference, floating, update);
    void update();

    if (dismissKey) {
        registerDismissible(dismissKey);
    }

    const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;

        if (reference.contains(target) || floating.contains(target)) {
            return;
        }

        onDismiss?.();
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') {
            return;
        }

        if (dismissKey && !isTopDismissible(dismissKey)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        onDismiss?.();
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
        stopAutoUpdate();
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('keydown', onKeyDown, true);

        if (dismissKey) {
            unregisterDismissible(dismissKey);
        }
    };
}
