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

import { getOffset } from './offset.js';

const locks = new Set<HTMLElement>();

/** Undo for the currently applied lock (only while locks.size > 0). */
let restoreLock: (() => void) | null = null;

function isOverflowScrollContainer(element: Element): boolean {
    const style = getComputedStyle(element);
    const overflowY = style.overflowY;

    return overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
}

/** True when setting gutter + toggling overflow does not change layout width. */
function supportsStableScrollbarGutterLock(): boolean {
    if (typeof CSS === 'undefined' || !CSS.supports?.('scrollbar-gutter', 'stable')) {
        return false;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollContainer = isOverflowScrollContainer(html) ? html : body;
    const prevOverflowY = scrollContainer.style.overflowY;
    const prevGutter = html.style.scrollbarGutter;

    html.style.scrollbarGutter = 'stable';
    scrollContainer.style.overflowY = 'scroll';
    const before = scrollContainer.offsetWidth;
    scrollContainer.style.overflowY = 'hidden';
    const after = scrollContainer.offsetWidth;

    scrollContainer.style.overflowY = prevOverflowY;
    html.style.scrollbarGutter = prevGutter;

    return before === after;
}

function getInsetScrollbarWidth(): number {
    return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

/**
 * Apply a lock that does not use body padding-right (fixed elements stay put).
 * Returns a restore function.
 */
function applyScrollLock(): () => void {
    const html = document.documentElement;
    const body = document.body;
    const htmlStyles = getComputedStyle(html);
    const bodyStyles = getComputedStyle(body);

    // Overlay / floating scrollbars (macOS “show when scrolling”): hiding overflow
    // does not change layout width — nothing to compensate.
    if (getInsetScrollbarWidth() < 2) {
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
        };
    }

    const elementToLock = isOverflowScrollContainer(html) ? html : body;

    // Path A — gutter stays stable under overflow:hidden (Firefox; some Chrome builds).
    if (supportsStableScrollbarGutterLock()) {
        const prevGutter = html.style.scrollbarGutter;
        const prevOverflowY = elementToLock.style.overflowY;
        const prevOverflowX = elementToLock.style.overflowX;

        html.style.scrollbarGutter = htmlStyles.scrollbarGutter?.includes('both-edges')
            ? 'stable both-edges'
            : 'stable';
        elementToLock.style.overflowY = 'hidden';
        elementToLock.style.overflowX = 'hidden';

        return () => {
            html.style.scrollbarGutter = prevGutter;
            elementToLock.style.overflowY = prevOverflowY;
            elementToLock.style.overflowX = prevOverflowX;
        };
    }

    // Path B — keep the inset scrollbar painted (`overflow-y: scroll`) so layout
    // width never changes, then freeze body scrolling. Matches Base UI inset lock.
    const scrollTop = html.scrollTop;
    const scrollLeft = html.scrollLeft;
    const scrollbarWidth = Math.max(0, window.innerWidth - body.clientWidth);
    const scrollbarHeight = Math.max(0, window.innerHeight - body.clientHeight);
    const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
    const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);

    const prevHtml = {
        scrollbarGutter: html.style.scrollbarGutter,
        overflowY: html.style.overflowY,
        overflowX: html.style.overflowX,
        scrollBehavior: html.style.scrollBehavior,
    };
    const prevBody = {
        position: body.style.position,
        height: body.style.height,
        width: body.style.width,
        boxSizing: body.style.boxSizing,
        overflow: body.style.overflow,
        overflowY: body.style.overflowY,
        overflowX: body.style.overflowX,
        scrollBehavior: body.style.scrollBehavior,
    };

    html.style.scrollbarGutter = 'stable';
    html.style.overflowY = 'scroll';
    html.style.overflowX = 'hidden';
    html.style.scrollBehavior = 'unset';

    body.style.position = 'relative';
    body.style.boxSizing = 'border-box';
    body.style.overflow = 'hidden';
    body.style.scrollBehavior = 'unset';
    body.style.width = marginX || scrollbarWidth
        ? `calc(100vw - ${marginX + scrollbarWidth}px)`
        : '100vw';
    body.style.height = marginY || scrollbarHeight
        ? `calc(100dvh - ${marginY + scrollbarHeight}px)`
        : '100dvh';

    body.scrollTop = scrollTop;
    body.scrollLeft = scrollLeft;

    return () => {
        Object.assign(html.style, prevHtml);
        Object.assign(body.style, prevBody);
        html.scrollTop = scrollTop;
        html.scrollLeft = scrollLeft;
    };
}

export function lockBodyScrolling(lockingEl: HTMLElement): void {
    locks.add(lockingEl);

    if (locks.size === 1) {
        document.documentElement.classList.add('pk-scroll-lock');
        // Keep the CSS variable for any consumer that opts in; always 0 now that we
        // no longer pad the body (fixed chrome must not shift).
        document.documentElement.style.setProperty('--pk-scroll-lock-size', '0px');
        restoreLock = applyScrollLock();
    }
}

export function unlockBodyScrolling(lockingEl: HTMLElement): void {
    locks.delete(lockingEl);

    if (locks.size === 0) {
        restoreLock?.();
        restoreLock = null;
        document.documentElement.classList.remove('pk-scroll-lock');
        document.documentElement.style.removeProperty('--pk-scroll-lock-size');
        document.documentElement.style.removeProperty('--pk-scroll-lock-gutter');
    }
}

/** Dev/diagnostic — how many overlay hosts currently hold the scroll lock. */
export function getScrollLockDepth(): number {
    return locks.size;
}

/** Emergency clear when lock ref-count and html class drift out of sync. */
export function forceClearScrollLock(): void {
    locks.clear();
    restoreLock?.();
    restoreLock = null;
    document.documentElement.classList.remove('pk-scroll-lock');
    document.documentElement.style.removeProperty('--pk-scroll-lock-size');
    document.documentElement.style.removeProperty('--pk-scroll-lock-gutter');
}

/** Scroll an element into view of its scroll container if needed. */
export function scrollIntoView(
    element: HTMLElement,
    container: HTMLElement,
    direction: 'horizontal' | 'vertical' | 'both' = 'vertical',
    behavior: ScrollBehavior = 'smooth',
): void {
    const offset = getOffset(element, container);
    const offsetTop = offset.top + container.scrollTop;
    const offsetLeft = offset.left + container.scrollLeft;
    const minX = container.scrollLeft;
    const maxX = container.scrollLeft + container.offsetWidth;
    const minY = container.scrollTop;
    const maxY = container.scrollTop + container.offsetHeight;

    if (direction === 'horizontal' || direction === 'both') {
        if (offsetLeft < minX) {
            container.scrollTo({ left: offsetLeft, behavior });
        } else if (offsetLeft + element.clientWidth > maxX) {
            container.scrollTo({
                left: offsetLeft - container.offsetWidth + element.clientWidth,
                behavior,
            });
        }
    }

    if (direction === 'vertical' || direction === 'both') {
        if (offsetTop < minY) {
            container.scrollTo({ top: offsetTop, behavior });
        } else if (offsetTop + element.clientHeight > maxY) {
            container.scrollTo({
                top: offsetTop - container.offsetHeight + element.clientHeight,
                behavior,
            });
        }
    }
}
