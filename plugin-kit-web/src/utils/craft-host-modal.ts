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

/** True when a Craft/Garnish modal or shade is present and visible. */
export function isCraftHostModalOpen(root: ParentNode = document): boolean {
    const nodes = root.querySelectorAll(HOST_MODAL_SELECTOR);

    for (const node of nodes) {
        if (!(node instanceof HTMLElement)) {
            continue;
        }

        // Ignore kit chrome that happens to reuse `.modal` inside a dialog.
        if (node.closest('pk-dialog')) {
            continue;
        }

        if (isVisiblyShown(node)) {
            return true;
        }
    }

    return false;
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
    options: { root?: ParentNode; getDocument?: () => Document } = {},
): CraftHostModalObserver {
    const doc = options.getDocument?.() ?? document;
    const root = options.root ?? doc.body;
    let lastOpen = isCraftHostModalOpen(doc);

    const emit = () => {
        const next = isCraftHostModalOpen(doc);
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
