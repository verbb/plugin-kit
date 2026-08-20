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

import { getOffset } from './offset.js';

const locks = new Set<HTMLElement>();

/** Undo for the currently applied lock (only while locks.size > 0). */
let restoreLock: (() => void) | null = null;

const SCROLL_KEYS = new Set([
    ' ',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'PageUp',
    'PageDown',
    'Home',
    'End',
]);

function eventPathContainsLock(event: Event): boolean {
    for (const node of event.composedPath()) {
        if (node instanceof HTMLElement && locks.has(node)) {
            return true;
        }
    }
    return false;
}

function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    if (target.isContentEditable) {
        return true;
    }
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

/**
 * Craft-like body overflow + gesture block (no scroll-position pin).
 * Returns a restore function.
 */
function applyScrollLock(): () => void {
    const body = document.body;
    const prevOverflow = body.style.overflow;

    // Same idea as Craft `.no-scroll { overflow: hidden !important }` — body only.
    body.style.setProperty('overflow', 'hidden', 'important');

    const onWheel = (event: WheelEvent) => {
        if (eventPathContainsLock(event)) {
            return;
        }
        event.preventDefault();
    };

    const onTouchMove = (event: TouchEvent) => {
        if (eventPathContainsLock(event)) {
            return;
        }
        event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (!SCROLL_KEYS.has(event.key)) {
            return;
        }
        if (eventPathContainsLock(event) || isEditableTarget(event.target)) {
            return;
        }
        event.preventDefault();
    };

    // Capture + non-passive so preventDefault actually stops scrolling.
    // Deliberately no `scroll` listener — resetting scrollY after the fact rubber-bands.
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown, { capture: true });

    return () => {
        window.removeEventListener('wheel', onWheel, { capture: true } as EventListenerOptions);
        window.removeEventListener('touchmove', onTouchMove, { capture: true } as EventListenerOptions);
        window.removeEventListener('keydown', onKeyDown, { capture: true } as EventListenerOptions);
        body.style.removeProperty('overflow');
        if (prevOverflow) {
            body.style.overflow = prevOverflow;
        }
    };
}

export function lockBodyScrolling(lockingEl: HTMLElement): void {
    locks.add(lockingEl);

    if (locks.size === 1) {
        document.documentElement.classList.add('pk-scroll-lock');
        // Always 0 — we never pad the body (Craft fixed chrome must not shift).
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
