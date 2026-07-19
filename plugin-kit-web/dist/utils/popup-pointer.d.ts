/**
 * Returns true when a pointer event occurred on pk-popup content.
 */
export declare function isPointerInPopupSurface(event: PointerEvent): boolean;
export type PointerInsideOverlayOptions = {
    host?: HTMLElement;
    anchor?: Element | null;
    panel?: Element | null;
    extraMatches?: (element: HTMLElement) => boolean;
};
/** Shared hit/focus-path testing for pk-popup consumers (pointer or keyboard events). */
export declare function isEventInsideOverlay(event: Event, options?: PointerInsideOverlayOptions): boolean;
/** Shared light-dismiss hit testing for pk-popup consumers. */
export declare function isPointerInsideOverlay(event: PointerEvent, options?: PointerInsideOverlayOptions): boolean;
//# sourceMappingURL=popup-pointer.d.ts.map