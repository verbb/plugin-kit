/** Stable unique id for aria-labelledby / aria-controls wiring inside components. */
export declare function uniqueId(prefix?: string): string;
export declare function getFocusableElements(root: ParentNode, includeDisabled?: boolean): HTMLElement[];
export type FocusTrapOptions = {
    root: HTMLElement;
    onEscape?: () => void;
};
/**
 * Focus trap for overlays — adapted from  dialog patterns.
 * Uses deepest active element so shadow-DOM controls participate correctly.
 */
export declare function createFocusTrap({ root, onEscape }: FocusTrapOptions): () => void;
/** Screen reader announcements for async overlay state changes. */
export declare class LiveRegion {
    private readonly element;
    constructor(politeness?: 'polite' | 'assertive');
    announce(message: string): void;
    destroy(): void;
}
//# sourceMappingURL=focus.d.ts.map