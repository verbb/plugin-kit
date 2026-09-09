/**
 * Wait for `pk-popup-content-out` on a listbox panel, then clear the `closing` class.
 * Shared by Combobox and Autocomplete so exit motion stays one implementation.
 */
export function waitForPopupContentExitAnimation(
    panel: HTMLElement | null | undefined,
    fallbackMs = 150,
): Promise<void> {
    if (!panel) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        let settled = false;

        const finish = (): void => {
            if (settled) {
                return;
            }

            settled = true;
            panel.removeEventListener('animationend', onAnimationEnd);
            window.clearTimeout(fallback);
            panel.classList.remove('closing');
            resolve();
        };

        const onAnimationEnd = (event: AnimationEvent): void => {
            if (event.target === panel && event.animationName.startsWith('pk-popup-content-out')) {
                finish();
            }
        };

        panel.classList.add('closing');
        panel.addEventListener('animationend', onAnimationEnd);
        const fallback = window.setTimeout(finish, fallbackMs);
    });
}
