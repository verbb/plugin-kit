/**
 * Element offset relative to a parent — adapted from  internal/offset.ts.
 * Works around shadow-DOM offsetParent quirks in Chromium.
 */
export function getOffset(element: HTMLElement, parent: HTMLElement): { top: number; left: number } {
    return {
        top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
        left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left),
    };
}
