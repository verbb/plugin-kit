/**
 * Run a CSS animation class on an element and resolve when it finishes.
 * Resolves on animationend/cancel, immediately when no CSS animation runs, or on timeout
 * so overlay hide can never hang forever (stuck `active` / missing `after-hide`).
 */
export function animateWithClass(el: HTMLElement, className: string, timeoutMs = 500): Promise<void> {
    return new Promise((resolve) => {
        const controller = new AbortController();
        const { signal } = controller;

        if (el.classList.contains(className)) {
            resolve();
            return;
        }

        el.classList.add(className);

        let resolved = false;

        const onEnd = (): void => {
            if (resolved) {
                return;
            }

            resolved = true;
            el.classList.remove(className);
            window.clearTimeout(timeoutId);
            resolve();
            controller.abort();
        };

        el.addEventListener('animationend', onEnd, { once: true, signal });
        el.addEventListener('animationcancel', onEnd, { once: true, signal });

        // If the browser reports running animations that never end (interrupted reverse
        // animations, display:none mid-flight), still settle so overlays can demote.
        const timeoutId = window.setTimeout(onEnd, timeoutMs);

        requestAnimationFrame(() => {
            if (!resolved && el.getAnimations().length === 0) {
                onEnd();
            }
        });
    });
}
