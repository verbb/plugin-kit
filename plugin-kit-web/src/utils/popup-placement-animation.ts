type PopupSide = 'top' | 'bottom' | 'left' | 'right';

type RectLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};

/** Maps Floating UI placement to a physical side for motion CSS. */
export function getPopupSide(placement: string): PopupSide {
    const side = placement.split('-')[0];

    if (side === 'inline-start') {
        return 'left';
    }

    if (side === 'inline-end') {
        return 'right';
    }

    if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
        return side;
    }

    return 'bottom';
}

/**
 * Transform origin at the anchor center on the connecting edge — matches Base UI
 * (`@base-ui/react` useAnchorPositioning transformOrigin middleware), which
 * plugin-kit-react relies on via `--transform-origin`.
 */
export function computePopupTransformOrigin(
    placement: string,
    referenceRect: RectLike,
    floatingRect: RectLike,
    sideOffset: number,
    shift?: { x?: number; y?: number },
): string {
    const side = getPopupSide(placement);
    const transformX = referenceRect.x + referenceRect.width / 2 - floatingRect.x;
    const transformY = referenceRect.y + referenceRect.height / 2 - floatingRect.y;
    const shiftY = Math.abs(shift?.y ?? 0);
    const isOverlappingAnchor = shiftY > sideOffset;

    if (isOverlappingAnchor && (side === 'top' || side === 'bottom')) {
        return `${transformX}px ${referenceRect.y + referenceRect.height / 2 - floatingRect.y}px`;
    }

    const adjacentTransformOrigin: Record<PopupSide, string> = {
        top: `${transformX}px calc(100% + ${sideOffset}px)`,
        bottom: `${transformX}px ${-sideOffset}px`,
        left: `calc(100% + ${sideOffset}px) ${transformY}px`,
        right: `${-sideOffset}px ${transformY}px`,
    };

    return adjacentTransformOrigin[side];
}

/** Applies `data-side` for placement-aware slide/zoom CSS. */
export function syncPopupPlacementAnimation(element: HTMLElement, placement: string | null | undefined): void {
    if (!placement) {
        element.removeAttribute('data-side');
        return;
    }

    element.setAttribute('data-side', getPopupSide(placement));
}

/** Waits for the first `pk-reposition` on a popup. */
export function waitForPopupReposition(
    popup: HTMLElement,
    fallbackPlacement: string,
    timeoutMs = 100,
    options?: { requireEvent?: boolean },
): Promise<string> {
    const readPlacement = (): string => {
        return popup.getAttribute('data-current-placement') ?? fallbackPlacement;
    };

    if (!options?.requireEvent && popup.hasAttribute('data-current-placement')) {
        return Promise.resolve(readPlacement());
    }

    return new Promise((resolve) => {
        let settled = false;

        const finish = (): void => {
            if (settled) {
                return;
            }

            settled = true;
            resolve(readPlacement());
        };

        popup.addEventListener('pk-reposition', finish, { once: true });

        // Attribute-only poll races settleInitialPosition: data-current-placement is
        // written before .positioned (visibility:hidden clears). Skip when the caller
        // needs the post-reveal pk-reposition (focus / enter animation).
        if (!options?.requireEvent) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (popup.hasAttribute('data-current-placement')) {
                        finish();
                    }
                });
            });
        }

        window.setTimeout(finish, timeoutMs);
    });
}
