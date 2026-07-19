/**
 * Craft CP Garnish modals (element selector, asset picker, …) live in normal
 * document stacking — not the browser top layer. Native `<dialog>.showModal()`
 * always paints above them, so open kit dialogs must briefly yield.
 */
/** True when a Craft/Garnish modal or shade is present and visible. */
export declare function isCraftHostModalOpen(root?: ParentNode): boolean;
export type CraftHostModalObserver = {
    disconnect: () => void;
};
/**
 * Watch the document for Craft modal mount/unmount and invoke `onChange`
 * whenever presence flips. Used by `pk-dialog` to leave/re-enter the top layer.
 */
export declare function observeCraftHostModal(onChange: (open: boolean) => void, options?: {
    root?: ParentNode;
    getDocument?: () => Document;
}): CraftHostModalObserver;
//# sourceMappingURL=craft-host-modal.d.ts.map