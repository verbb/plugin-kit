export declare const LISTBOX_NAVIGATION_KEYS: Set<string>;
/** Returns true for type-to-select character keys (single printable characters). */
export declare function isListboxTypeToSelectKey(event: KeyboardEvent): boolean;
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
export declare function getEnabledListboxItems(items: HTMLElement[]): HTMLElement[];
export declare function handleListboxKeyDown(event: KeyboardEvent, options: ListboxKeyboardOptions): number;
/** Type-to-select string matching . */
export declare function createTypeToSelectHandler(items: HTMLElement[], onMatch: (index: number) => void): {
    handleKey: (event: KeyboardEvent) => void;
    reset: () => void;
};
//# sourceMappingURL=listbox-keyboard.d.ts.map