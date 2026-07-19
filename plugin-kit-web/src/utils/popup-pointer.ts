/**
 * Returns true when a pointer event occurred on pk-popup content.
 */
export function isPointerInPopupSurface(event: PointerEvent): boolean {
    return event.composedPath().some((node) => {
        if (!(node instanceof HTMLElement)) {
            return false;
        }

        return node.classList.contains('popup')
            || node.localName === 'pk-popup';
    });
}

export type PointerInsideOverlayOptions = {
    host?: HTMLElement;
    anchor?: Element | null;
    panel?: Element | null;
    extraMatches?: (element: HTMLElement) => boolean;
};

/** Shared hit/focus-path testing for pk-popup consumers (pointer or keyboard events). */
export function isEventInsideOverlay(
    event: Event,
    options: PointerInsideOverlayOptions = {},
): boolean {
    const path = event.composedPath();

    if (options.host && path.includes(options.host)) {
        return true;
    }

    if (options.anchor && path.includes(options.anchor)) {
        return true;
    }

    if (options.panel && path.includes(options.panel)) {
        return true;
    }

    return path.some((node) => {
        if (!(node instanceof HTMLElement)) {
            return false;
        }

        if (node.classList.contains('popup') || node.localName === 'pk-popup') {
            return true;
        }

        return options.extraMatches?.(node) ?? false;
    });
}

/** Shared light-dismiss hit testing for pk-popup consumers. */
export function isPointerInsideOverlay(
    event: PointerEvent,
    options: PointerInsideOverlayOptions = {},
): boolean {
    return isEventInsideOverlay(event, options);
}
