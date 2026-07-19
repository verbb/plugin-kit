/**
 * Top-layer coordination — popovers live in shadow roots, so document-level
 * `[popover]:popover-open` queries miss menu/select panels still in the layer.
 * Use before `HTMLDialogElement.showModal()` to avoid Chrome main-thread hangs.
 */

import { SUPPORTS_POPOVER } from './supports-popover.js';

/** Hosts whose shadow tree contains a nested `pk-popup` (not in document querySelectorAll). */
const NESTED_POPUP_HOST_SELECTOR = 'pk-dropdown-menu';

/** Popup hosts in light DOM with a `[popover]` node in their shadow root. */
const POPUP_HOST_SELECTOR = 'pk-popup, pk-popover, pk-tooltip, pk-select, pk-combobox, pk-date-picker';

function readOpenPopover(host: Element): HTMLElement | null {
    const popover = host.shadowRoot?.querySelector<HTMLElement>('[popover]');

    if (!popover) {
        return null;
    }

    try {
        return popover.matches(':popover-open') ? popover : null;
    } catch {
        return null;
    }
}

/** Popovers still in the browser top layer (`:popover-open`). */
export function collectOpenPopovers(): HTMLElement[] {
    if (!SUPPORTS_POPOVER) {
        return [];
    }

    const popovers: HTMLElement[] = [];
    const seen = new Set<HTMLElement>();

    const push = (el: HTMLElement | null): void => {
        if (el && !seen.has(el)) {
            seen.add(el);
            popovers.push(el);
        }
    };

    for (const host of document.querySelectorAll(POPUP_HOST_SELECTOR)) {
        push(readOpenPopover(host));
    }

    // Menu panels: pk-popup lives inside pk-dropdown-menu shadow, invisible to document queries.
    for (const host of document.querySelectorAll(NESTED_POPUP_HOST_SELECTOR)) {
        const popupHost = host.shadowRoot?.querySelector('pk-popup');

        if (popupHost) {
            push(readOpenPopover(popupHost));
        }
    }

    return popovers;
}

/** Synchronously hide every open popover — call immediately before showModal(). */
export function forceHideOpenPopovers(): number {
    const open = collectOpenPopovers();

    for (const el of open) {
        try {
            el.hidePopover();
        } catch {
            /* noop */
        }
    }

    return open.length;
}

/**
 * Handoff path — strip `popover` without calling hidePopover().
 * Chrome can hang when hidePopover() and showModal() run in the same macrotask.
 */
export function stripOpenPopoversForHandoff(): number {
    const open = collectOpenPopovers();
    let stripped = 0;

    for (const el of open) {
        try {
            if (el.hasAttribute('popover')) {
                el.removeAttribute('popover');
                stripped += 1;
            }
        } catch {
            /* noop */
        }
    }

    return stripped;
}

/** Last resort when hidePopover() leaves a stale top-layer entry — unblocks showModal(). */
export function stripPopoverTopLayer(): number {
    const open = collectOpenPopovers();
    let stripped = 0;

    for (const el of open) {
        try {
            el.hidePopover();
        } catch {
            /* noop */
        }

        if (el.hasAttribute('popover')) {
            el.removeAttribute('popover');
            stripped += 1;
        }
    }

    return stripped;
}

function isPopoverOpen(element: HTMLElement): boolean {
    try {
        return element.isConnected && element.matches(':popover-open');
    } catch {
        return false;
    }
}

/** Two frames after popover clear — Chrome can hang on showModal() in the same frame as hidePopover(). */
export function awaitTopLayerHandoffFrames(): Promise<void> {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
        });
    });
}

/** Wait for one popover element to leave the top layer after `hidePopover()`. */
export function waitForPopoverClosed(
    element: HTMLElement | null | undefined,
    timeoutMs = 800,
    options: { relaxed?: boolean } = {},
): Promise<void> {
    if (!element || !SUPPORTS_POPOVER) {
        return Promise.resolve();
    }

    if (!isPopoverOpen(element)) {
        return Promise.resolve();
    }

    const relaxed = options.relaxed === true;
    const deadline = performance.now() + timeoutMs;

    return new Promise((resolve, reject) => {
        let settled = false;

        const settle = (ok: boolean): void => {
            if (settled) {
                return;
            }

            settled = true;
            element.removeEventListener('beforetoggle', onBeforeToggle);
            element.removeEventListener('toggle', onToggle);

            if (ok || relaxed) {
                resolve();
                return;
            }

            reject(new Error('[pk-top-layer] popover failed to close before handoff'));
        };

        const onBeforeToggle = (event: Event): void => {
            const toggle = event as ToggleEvent;

            if (toggle.newState === 'closed') {
                settle(true);
            }
        };

        const onToggle = (event: Event): void => {
            const toggle = event as ToggleEvent;

            if (toggle.newState === 'closed') {
                settle(true);
            }
        };

        element.addEventListener('beforetoggle', onBeforeToggle);
        element.addEventListener('toggle', onToggle);

        const poll = (): void => {
            if (!element.isConnected || !isPopoverOpen(element)) {
                settle(true);
                return;
            }

            if (performance.now() >= deadline) {
                if (relaxed) {
                    // Do not call hidePopover() or strip popover here — sync demotion hangs Chrome
                    // and removeAttribute breaks Lit's popover lifecycle on reopen.
                    window.requestAnimationFrame(() => {
                        window.setTimeout(() => settle(true), 0);
                    });
                    return;
                }

                window.requestAnimationFrame(() => {
                    try {
                        element.hidePopover();
                    } catch {
                        /* noop */
                    }

                    window.setTimeout(() => {
                        settle(!isPopoverOpen(element));
                    }, 0);
                });
                return;
            }

            window.setTimeout(poll, 16);
        };

        poll();
    });
}

/**
 * Demote every open popover before showModal().
 * Always resolves within timeoutMs — never blocks dialog open indefinitely.
 */
/** Release menu popup hosts after top-layer strip — stops autoUpdate without hidePopover(). */
export function releaseNestedMenuPopups(): void {
    for (const host of document.querySelectorAll(NESTED_POPUP_HOST_SELECTOR)) {
        const popup = host.shadowRoot?.querySelector('pk-popup') as {
            active?: boolean;
            releasePositioning?: () => void;
        } | null;

        if (!popup) {
            continue;
        }

        popup.releasePositioning?.();

        if (popup.active) {
            popup.active = false;
        }
    }
}

export async function demotePopoversForModal(timeoutMs = 800): Promise<void> {
    if (!SUPPORTS_POPOVER) {
        return;
    }

    stripOpenPopoversForHandoff();
    releaseNestedMenuPopups();
    await awaitTopLayerHandoffFrames();

    if (collectOpenPopovers().length === 0) {
        return;
    }

    const deadline = performance.now() + timeoutMs;

    while (performance.now() < deadline) {
        stripOpenPopoversForHandoff();
        releaseNestedMenuPopups();

        if (collectOpenPopovers().length === 0) {
            await awaitTopLayerHandoffFrames();
            return;
        }

        await new Promise<void>((resolve) => window.setTimeout(resolve, 16));
    }

    for (const el of collectOpenPopovers()) {
        try {
            el.removeAttribute('popover');
        } catch {
            /* noop */
        }
    }

    releaseNestedMenuPopups();
    await awaitTopLayerHandoffFrames();
}

/** @deprecated Prefer demotePopoversForModal. */
export async function awaitTopLayerReadyForModal(timeoutMs = 800): Promise<void> {
    await demotePopoversForModal(timeoutMs);
}

/** @deprecated Prefer demotePopoversForModal. */
export function waitForPopoverTopLayerClear(timeoutMs = 800): Promise<void> {
    return demotePopoversForModal(timeoutMs).then(() => undefined);
}
