/**
 * Returns true when a pointer event occurred on pk-popup content.
 *
 * Intentionally matches *any* popup surface — callers that need overlay-scoped
 * hit testing should use {@link isEventInsideOverlay} instead.
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

/** Resolve the pk-popup that owns this overlay's panel (or the host's popup). */
function resolveOwnPopup(options: PointerInsideOverlayOptions): Element | null {
    if (options.panel instanceof Element) {
        const closest = options.panel.closest('pk-popup');

        if (closest) {
            return closest;
        }

        // Panel may live in a shadow tree whose host is pk-popup.
        const root = options.panel.getRootNode();

        if (root instanceof ShadowRoot && root.host.localName === 'pk-popup') {
            return root.host;
        }
    }

    if (options.host instanceof HTMLElement) {
        return options.host.shadowRoot?.querySelector('pk-popup')
            ?? options.host.querySelector(':scope > pk-popup')
            ?? options.host.querySelector('pk-popup');
    }

    return null;
}

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

    // Only *this* overlay's popup counts. Dropdown menus slot their trigger inside
    // pk-popup as the anchor — matching any pk-popup here would treat a click on
    // another menu's trigger as "inside" and block light-dismiss (two menus open).
    const ownPopup = resolveOwnPopup(options);

    if (ownPopup && path.includes(ownPopup)) {
        return true;
    }

    return path.some((node) => {
        if (!(node instanceof HTMLElement)) {
            return false;
        }

        // Own popup internals may use a `.popup` surface node that is not the
        // custom element itself — still scoped via ancestry to ownPopup.
        if (
            ownPopup
            && node.classList.contains('popup')
            && (node === ownPopup || ownPopup.contains(node))
        ) {
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
