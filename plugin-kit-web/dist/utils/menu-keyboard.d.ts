export declare const MENU_NAVIGATION_KEYS: Set<string>;
export type MenuKeyboardOptions = {
    items: HTMLElement[];
    /** Explicit highlight index — preferred over DOM focus when items use shadow controls. */
    currentIndex?: number;
    onSelect?: (item: HTMLElement) => void;
    onClose?: () => void;
    /** When `loop` is omitted, menu navigation loops (Base UI `Menu` default). */
    loop?: boolean;
};
export declare function focusMenuItem(items: HTMLElement[], index: number): void;
export declare function getFocusedMenuItemIndex(items: HTMLElement[]): number;
export declare function activateMenuItem(item: HTMLElement): void;
export declare function handleMenuKeyDown(event: KeyboardEvent, options: MenuKeyboardOptions): number;
//# sourceMappingURL=menu-keyboard.d.ts.map