type PopupSide = 'top' | 'bottom' | 'left' | 'right';
type RectLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/** Maps Floating UI placement to a physical side for motion CSS. */
export declare function getPopupSide(placement: string): PopupSide;
/**
 * Transform origin at the anchor center on the connecting edge — matches Base UI
 * (`@base-ui/react` useAnchorPositioning transformOrigin middleware), which
 * plugin-kit-react relies on via `--transform-origin`.
 */
export declare function computePopupTransformOrigin(placement: string, referenceRect: RectLike, floatingRect: RectLike, sideOffset: number, shift?: {
    x?: number;
    y?: number;
}): string;
/** Applies `data-side` for placement-aware slide/zoom CSS. */
export declare function syncPopupPlacementAnimation(element: HTMLElement, placement: string | null | undefined): void;
/** Waits for the first `pk-reposition` on a popup. */
export declare function waitForPopupReposition(popup: HTMLElement, fallbackPlacement: string, timeoutMs?: number, options?: {
    requireEvent?: boolean;
}): Promise<string>;
export {};
//# sourceMappingURL=popup-placement-animation.d.ts.map