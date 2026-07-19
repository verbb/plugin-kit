import { getDeepestActiveElement } from './active-elements.js';

let idCounter = 0;

/** Stable unique id for aria-labelledby / aria-controls wiring inside components. */
export function uniqueId(prefix = 'pk'): string {
    idCounter += 1;
    return `${prefix}-${idCounter}`;
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const FOCUSABLE_SELECTOR_WITH_DISABLED = [
    'a[href]',
    'button',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

function isDisplayed(element: HTMLElement): boolean {
    return element.offsetParent !== null || element.getClientRects().length > 0;
}

function matchesFocusable(element: HTMLElement, includeDisabled: boolean): boolean {
    return element.matches(includeDisabled ? FOCUSABLE_SELECTOR_WITH_DISABLED : FOCUSABLE_SELECTOR);
}

/** Walks shadow roots and assigned slot content — required for slotted dialog actions. */
function gatherFocusableElements(
    node: Node,
    includeDisabled: boolean,
    results: HTMLElement[],
    seen: Set<HTMLElement>,
): void {
    if (node instanceof HTMLSlotElement) {
        for (const assigned of node.assignedElements({ flatten: true })) {
            gatherFocusableElements(assigned, includeDisabled, results, seen);
        }

        return;
    }

    if (!(node instanceof HTMLElement)) {
        return;
    }

    if (matchesFocusable(node, includeDisabled) && isDisplayed(node) && !seen.has(node)) {
        seen.add(node);
        results.push(node);
    }

    const subtree = node.shadowRoot ?? node;

    for (const child of subtree.childNodes) {
        gatherFocusableElements(child, includeDisabled, results, seen);
    }
}

export function getFocusableElements(root: ParentNode, includeDisabled = false): HTMLElement[] {
    const results: HTMLElement[] = [];
    const seen = new Set<HTMLElement>();

    if (root instanceof DocumentFragment) {
        for (const child of root.childNodes) {
            gatherFocusableElements(child, includeDisabled, results, seen);
        }

        return results;
    }

    gatherFocusableElements(root as Node, includeDisabled, results, seen);
    return results;
}

function containsActiveElement(element: HTMLElement, active: Element | null | undefined): boolean {
    if (!active) {
        return false;
    }

    return element === active || element.contains(active);
}

function getActiveFocusIndex(focusable: HTMLElement[], active: Element | null | undefined): number {
    if (!active) {
        return -1;
    }

    return focusable.findIndex((element) => containsActiveElement(element, active));
}

export type FocusTrapOptions = {
    root: HTMLElement;
    onEscape?: () => void;
};

/**
 * Focus trap for overlays — adapted from  dialog patterns.
 * Uses deepest active element so shadow-DOM controls participate correctly.
 */
export function createFocusTrap({ root, onEscape }: FocusTrapOptions): () => void {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onEscape?.();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusable = getFocusableElements(root);

        if (focusable.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        const active = getDeepestActiveElement() ?? document.activeElement;
        const activeIndex = getActiveFocusIndex(focusable, active);

        if (event.shiftKey) {
            if (activeIndex <= 0) {
                event.preventDefault();
                last.focus();
            }

            return;
        }

        if (activeIndex === -1 || activeIndex >= focusable.length - 1) {
            event.preventDefault();
            first.focus();
        }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
    };
}

/** Screen reader announcements for async overlay state changes. */
export class LiveRegion {
    private readonly element: HTMLElement;

    constructor(politeness: 'polite' | 'assertive' = 'polite') {
        this.element = document.createElement('div');
        this.element.setAttribute('aria-live', politeness);
        this.element.setAttribute('aria-atomic', 'true');
        this.element.className = 'pk-visually-hidden';
        this.element.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
        document.body.append(this.element);
    }

    announce(message: string): void {
        this.element.textContent = '';
        requestAnimationFrame(() => {
            this.element.textContent = message;
        });
    }

    destroy(): void {
        this.element.remove();
    }
}
