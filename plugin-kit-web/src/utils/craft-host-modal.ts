/**
 * Craft CP Garnish modals (element selector, asset picker, …) live in normal
 * document stacking — not the browser top layer. Native `<dialog>.showModal()`
 * always paints above them, so open kit dialogs must briefly yield.
 */

const HOST_MODAL_SELECTOR = '.modal-shade, .modal';

const isVisiblyShown = (element: HTMLElement): boolean => {
    const style = getComputedStyle(element);

    return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number.parseFloat(style.opacity || '1') > 0;
};

const visibleHostModals = (root: ParentNode): HTMLElement[] =>
    Array.from(root.querySelectorAll(HOST_MODAL_SELECTOR)).filter((node): node is HTMLElement =>
        node instanceof HTMLElement && !node.closest('pk-dialog') && isVisiblyShown(node),
    );

/** True when a Craft/Garnish modal or shade is present and visible. */
export function isCraftHostModalOpen(root: ParentNode = document): boolean {
    return visibleHostModals(root).length > 0;
}

export type CraftHostModalObserver = {
    disconnect: () => void;
};

/**
 * Watch the document for Craft modal mount/unmount and invoke `onChange`
 * whenever presence flips. Used by `pk-dialog` to leave/re-enter the top layer.
 */
export function observeCraftHostModal(
    onChange: (open: boolean) => void,
    options: { root?: ParentNode; getDocument?: () => Document; ignoreExisting?: boolean } = {},
): CraftHostModalObserver {
    const doc = options.getDocument?.() ?? document;
    const root = options.root ?? doc.body;
    // A dialog opened from Preview owns a newer layer than Preview's shade.
    // Only later host modals should make it yield; an existing shade must not
    // mask the opening or closing of a child element picker.
    const existing = new Set(options.ignoreExisting ? visibleHostModals(doc) : []);
    const hasNewModal = () => visibleHostModals(doc).some(node => !existing.has(node));
    let lastOpen = hasNewModal();

    const emit = () => {
        const next = hasNewModal();
        if (next === lastOpen) {
            return;
        }
        lastOpen = next;
        onChange(next);
    };

    const observer = new MutationObserver(() => {
        emit();
    });

    observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'hidden'],
    });

    // Craft sometimes toggles visibility a frame after insert.
    const intervalId = window.setInterval(emit, 250);

    return {
        disconnect: () => {
            observer.disconnect();
            window.clearInterval(intervalId);
        },
    };
}
