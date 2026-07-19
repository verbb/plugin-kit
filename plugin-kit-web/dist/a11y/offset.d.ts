/**
 * Element offset relative to a parent — adapted from  internal/offset.ts.
 * Works around shadow-DOM offsetParent quirks in Chromium.
 */
export declare function getOffset(element: HTMLElement, parent: HTMLElement): {
    top: number;
    left: number;
};
//# sourceMappingURL=offset.d.ts.map