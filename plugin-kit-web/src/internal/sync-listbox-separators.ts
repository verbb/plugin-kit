/**
 * Hide listbox `pk-separator` siblings that no longer sit between two visible
 * `pk-option` / `pk-option-group` items (e.g. after combobox filter hides groups).
 */
const isListboxItemHidden = (element: HTMLElement): boolean => {
    return element.hidden || element.hasAttribute('data-pk-filter-empty');
};

const syncListboxSeparators = (root: ParentNode): void => {
    const children = [
        ...root.querySelectorAll(':scope > pk-option, :scope > pk-option-group, :scope > pk-separator'),
    ] as HTMLElement[];

    const nearestItem = (from: number, direction: -1 | 1): HTMLElement | null => {
        for (
            let index = from + direction;
            direction < 0 ? index >= 0 : index < children.length;
            index += direction
        ) {
            const child = children[index];

            if (!child || child.localName === 'pk-separator') {
                continue;
            }

            return child;
        }

        return null;
    };

    for (let index = 0; index < children.length; index += 1) {
        const child = children[index];

        if (!child || child.localName !== 'pk-separator') {
            continue;
        }

        const before = nearestItem(index, -1);
        const after = nearestItem(index, 1);

        // Only keep dividers between two currently visible sections.
        child.hidden = !before || !after || isListboxItemHidden(before) || isListboxItemHidden(after);
    }
};

export { syncListboxSeparators };
