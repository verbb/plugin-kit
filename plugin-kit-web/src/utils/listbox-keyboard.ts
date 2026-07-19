export const LISTBOX_NAVIGATION_KEYS = new Set([
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'Enter',
    ' ',
    'Escape',
]);

/** Returns true for type-to-select character keys (single printable characters). */
export function isListboxTypeToSelectKey(event: KeyboardEvent): boolean {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}

/**
 * Listbox keyboard navigation — patterns for pk-select / WAI-ARIA listbox.
 */
export type ListboxKeyboardOptions = {
    items: HTMLElement[];
    currentIndex: number;
    onSelect: (index: number) => void;
    onClose?: () => void;
    multiselect?: boolean;
    /** When true, ArrowUp/Down wrap from last→first and first→last. Default: false. */
    /** When `loop` is omitted, listbox navigation does not loop (Base UI `Select`-style default). */
    loop?: boolean;
    focusItem?: (index: number) => void;
};

export function getEnabledListboxItems(items: HTMLElement[]): HTMLElement[] {
    return items.filter((item) => {
        return !item.hasAttribute('disabled')
            && !item.hasAttribute('hidden')
            && item.getAttribute('aria-disabled') !== 'true'
            && item.getAttribute('aria-hidden') !== 'true';
    });
}

function focusListboxItem(
    enabled: HTMLElement[],
    index: number,
    focusItem?: (index: number) => void,
): void {
    if (focusItem) {
        focusItem(index);
        return;
    }

    const item = enabled[index];

    if (item instanceof HTMLElement && 'focusControl' in item && typeof item.focusControl === 'function') {
        (item as { focusControl: () => void }).focusControl();
        return;
    }

    item?.focus();
}

function activateListboxItem(item: HTMLElement | undefined): void {
    if (!item) {
        return;
    }

    const control = item.shadowRoot?.querySelector('.option');

    if (control instanceof HTMLButtonElement) {
        control.click();
        return;
    }

    item.click();
}

export function handleListboxKeyDown(event: KeyboardEvent, options: ListboxKeyboardOptions): number {
    const enabled = getEnabledListboxItems(options.items);
    const loop = options.loop === true;

    if (enabled.length === 0) {
        return options.currentIndex;
    }

    let index = Math.max(0, options.currentIndex);
    const current = enabled[index] ?? enabled[0]!;
    index = enabled.indexOf(current);

    if (index < 0) {
        index = 0;
    }

    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault();
            if (loop && index >= enabled.length - 1) {
                index = 0;
            } else {
                index = Math.min(index + 1, enabled.length - 1);
            }
            focusListboxItem(enabled, index, options.focusItem);
            options.onSelect(index);
            return index;

        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault();
            if (loop && index <= 0) {
                index = enabled.length - 1;
            } else {
                index = Math.max(index - 1, 0);
            }
            focusListboxItem(enabled, index, options.focusItem);
            options.onSelect(index);
            return index;

        case 'Home':
            event.preventDefault();
            index = 0;
            focusListboxItem(enabled, index, options.focusItem);
            options.onSelect(index);
            return index;

        case 'End':
            event.preventDefault();
            index = enabled.length - 1;
            focusListboxItem(enabled, index, options.focusItem);
            options.onSelect(index);
            return index;

        case 'Enter':
        case ' ':
            if (!options.multiselect) {
                event.preventDefault();
                activateListboxItem(enabled[index]);
            }
            return index;

        case 'Escape':
            event.preventDefault();
            options.onClose?.();
            return index;

        default:
            return index;
    }
}

/** Type-to-select string matching . */
export function createTypeToSelectHandler(
    items: HTMLElement[],
    onMatch: (index: number) => void,
): { handleKey: (event: KeyboardEvent) => void; reset: () => void } {
    let typeToSelectString = '';
    let typeToSelectTimeout = 0;

    const reset = (): void => {
        typeToSelectString = '';
        window.clearTimeout(typeToSelectTimeout);
    };

    const handleKey = (event: KeyboardEvent): void => {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }

        typeToSelectString += event.key.toLowerCase();
        window.clearTimeout(typeToSelectTimeout);
        typeToSelectTimeout = window.setTimeout(reset, 750);

        const enabled = getEnabledListboxItems(items);

        for (let index = 0; index < enabled.length; index += 1) {
            const label = (enabled[index]?.textContent ?? '').trim().toLowerCase();

            if (label.startsWith(typeToSelectString)) {
                onMatch(index);
                event.preventDefault();
                return;
            }
        }
    };

    return { handleKey, reset };
}
