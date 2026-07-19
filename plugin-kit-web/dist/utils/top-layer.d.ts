/**
 * Top-layer coordination — popovers live in shadow roots, so document-level
 * `[popover]:popover-open` queries miss menu/select panels still in the layer.
 * Use before `HTMLDialogElement.showModal()` to avoid Chrome main-thread hangs.
 */
/** Popovers still in the browser top layer (`:popover-open`). */
export declare function collectOpenPopovers(): HTMLElement[];
/** Synchronously hide every open popover — call immediately before showModal(). */
export declare function forceHideOpenPopovers(): number;
/**
 * Handoff path — strip `popover` without calling hidePopover().
 * Chrome can hang when hidePopover() and showModal() run in the same macrotask.
 */
export declare function stripOpenPopoversForHandoff(): number;
/** Last resort when hidePopover() leaves a stale top-layer entry — unblocks showModal(). */
export declare function stripPopoverTopLayer(): number;
/** Two frames after popover clear — Chrome can hang on showModal() in the same frame as hidePopover(). */
export declare function awaitTopLayerHandoffFrames(): Promise<void>;
/** Wait for one popover element to leave the top layer after `hidePopover()`. */
export declare function waitForPopoverClosed(element: HTMLElement | null | undefined, timeoutMs?: number, options?: {
    relaxed?: boolean;
}): Promise<void>;
/**
 * Demote every open popover before showModal().
 * Always resolves within timeoutMs — never blocks dialog open indefinitely.
 */
/** Release menu popup hosts after top-layer strip — stops autoUpdate without hidePopover(). */
export declare function releaseNestedMenuPopups(): void;
export declare function demotePopoversForModal(timeoutMs?: number): Promise<void>;
/** @deprecated Prefer demotePopoversForModal. */
export declare function awaitTopLayerReadyForModal(timeoutMs?: number): Promise<void>;
/** @deprecated Prefer demotePopoversForModal. */
export declare function waitForPopoverTopLayerClear(timeoutMs?: number): Promise<void>;
//# sourceMappingURL=top-layer.d.ts.map