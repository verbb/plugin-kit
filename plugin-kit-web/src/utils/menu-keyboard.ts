export const MENU_NAVIGATION_KEYS = new Set([
    'ArrowDown',
    'ArrowUp',
    'Home',
    'End',
    'Enter',
    ' ',
    'Escape',
]);

export type MenuKeyboardOptions = {
    items: HTMLElement[];
    /** Explicit highlight index — preferred over DOM focus when items use shadow controls. */
    currentIndex?: number;
    onSelect?: (item: HTMLElement) => void;
    onClose?: () => void;
    /** When `loop` is omitted, menu navigation loops (Base UI `Menu` default). */
    loop?: boolean;
};

function isMenuItemFocused(item: HTMLElement): boolean {
    const active = document.activeElement;

    if (!active) {
        return false;
    }

    if (item === active) {
        return true;
    }

    return item.shadowRoot?.contains(active) ?? false;
}

export function focusMenuItem(items: HTMLElement[], index: number): void {
    const item = items[index];

    if (!item || item.hasAttribute('disabled') || item.getAttribute('aria-disabled') === 'true') {
        return;
    }

    if ('focusControl' in item && typeof item.focusControl === 'function') {
        (item as { focusControl: () => void }).focusControl();
        return;
    }

    item.focus();
}

export function getFocusedMenuItemIndex(items: HTMLElement[]): number {
    return items.findIndex((item) => isMenuItemFocused(item));
}

export function activateMenuItem(item: HTMLElement): void {
    const control = item.shadowRoot?.querySelector('.item');

    if (control instanceof HTMLButtonElement) {
        control.click();
        return;
    }

    item.click();
}

export function handleMenuKeyDown(event: KeyboardEvent, options: MenuKeyboardOptions): number {
    const { items, onSelect, onClose, loop = true } = options;
    const enabledItems = items.filter((item) => !item.hasAttribute('disabled') && item.getAttribute('aria-disabled') !== 'true');

    if (enabledItems.length === 0) {
        return options.currentIndex ?? -1;
    }

    let currentIndex = options.currentIndex ?? getFocusedMenuItemIndex(enabledItems);

    switch (event.key) {
        case 'ArrowDown': {
            event.preventDefault();
            const next = currentIndex < 0 ? 0 : currentIndex + 1;
            currentIndex = loop ? next % enabledItems.length : Math.min(next, enabledItems.length - 1);
            focusMenuItem(enabledItems, currentIndex);
            break;
        }
        case 'ArrowUp': {
            event.preventDefault();
            const prev = currentIndex < 0 ? enabledItems.length - 1 : currentIndex - 1;
            currentIndex = loop ? (prev + enabledItems.length) % enabledItems.length : Math.max(prev, 0);
            focusMenuItem(enabledItems, currentIndex);
            break;
        }
        case 'Home':
            event.preventDefault();
            currentIndex = 0;
            focusMenuItem(enabledItems, currentIndex);
            break;
        case 'End':
            event.preventDefault();
            currentIndex = enabledItems.length - 1;
            focusMenuItem(enabledItems, currentIndex);
            break;
        case 'Enter':
        case ' ': {
            event.preventDefault();
            const item = enabledItems[currentIndex];

            if (item) {
                activateMenuItem(item);
                onSelect?.(item);
            }
            break;
        }
        case 'Escape':
            event.preventDefault();
            onClose?.();
            break;
        default:
            break;
    }

    return currentIndex;
}
