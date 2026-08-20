/**
 * Document scroll lock for overlays (dialog, etc.).
 *
 * Ref-counted so nested overlays unlock only when all close.
 *
 * Aligns with Craft / Garnish.Modal where it matters:
 * - Modal + shade are `position: fixed` (hosts, not the document).
 * - Document lock is `body { overflow: hidden }` (Craft’s `.no-scroll`) — **not**
 *   `body { position: fixed }`, and **not** `overflow: hidden` on `html`.
 *   Body-only overflow keeps Craft’s sticky `#global-sidebar` stuck at the current
 *   scrollY; html overflow / body fixed both make sticky “let go” and the nav jumps.
 *
 * Craft’s class alone still lets the page scroll under the shade (wheel / scrollBy).
 * We add wheel / touch / page-key `preventDefault` outside locking overlay hosts so
 * user scrolling actually stops — without a `scroll` listener that rubber-bands the
 * position back (that felt gross).
 *
 * Also avoid: permanent/lock-time `scrollbar-gutter`, and `padding-right` compensation
 * (Craft fixed tip bars ignore body padding and jump).
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