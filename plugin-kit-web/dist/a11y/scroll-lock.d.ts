/**
 * Document scroll lock for overlays (dialog, etc.).
 *
 * Ref-counted so nested overlays unlock only when all close.
 *
 * Avoids the classic “fixed chrome jumps” bug from `padding-right` compensation:
 * Craft CP / playground fixed sidebars & tip bars do not inherit body padding, so
 * `body { padding-right: scrollbar }` shifts them when the scrollbar goes
 * away. v1 (Base UI) did not jump — follow that model instead:
 *
 * 1. Prefer a real `scrollbar-gutter: stable` lock (width unchanged under overflow:hidden).
 * 2. Otherwise keep `overflow-y: scroll` on `<html>` so the gutter stays painted, and
 *    constrain `<body>` so the page cannot scroll.
 */
export declare function lockBodyScrolling(lockingEl: HTMLElement): void;
export declare function unlockBodyScrolling(lockingEl: HTMLElement): void;
/** Dev/diagnostic — how many overlay hosts currently hold the scroll lock. */
export declare function getScrollLockDepth(): number;
/** Emergency clear when lock ref-count and html class drift out of sync. */
export declare function forceClearScrollLock(): void;
/** Scroll an element into view of its scroll container if needed. */
export declare function scrollIntoView(element: HTMLElement, container: HTMLElement, direction?: 'horizontal' | 'vertical' | 'both', behavior?: ScrollBehavior): void;
//# sourceMappingURL=scroll-lock.d.ts.map