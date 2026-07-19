/**
 * Run a CSS animation class on an element and resolve when it finishes.
 * Resolves on animationend/cancel, immediately when no CSS animation runs, or on timeout
 * so overlay hide can never hang forever (stuck `active` / missing `after-hide`).
 */
export declare function animateWithClass(el: HTMLElement, className: string, timeoutMs?: number): Promise<void>;
//# sourceMappingURL=animate-with-class.d.ts.map