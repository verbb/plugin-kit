import { PkElement } from '../../base/pk-element.js';
export type PkDropdownItemType = 'normal' | 'checkbox' | 'radio';
/**
 * Dropdown menu item — use inside `pk-dropdown-menu`.
 *
 * @slot - Item label
 * @slot start - Leading icon (preferred; matches pk-button)
 * @slot prefix - Alias for `start` (legacy)
 * @slot details - Trailing shortcut text
 * @slot submenu - Nested menu items (`pk-dropdown-item`, separators, labels)
 *
 * @csspart item - Menu item button
 * @csspart prefix - Leading icon wrapper (hidden when empty)
 */
export declare class PkDropdownItem extends PkElement {
    static styles: any[];
    value: string;
    type: PkDropdownItemType;
    radioGroup: string;
    disabled: boolean;
    destructive: boolean;
    checked: boolean;
    submenuOpen: boolean;
    /**
     * Roving highlight index for keyboard nav (`active`).
     * Visual chrome uses `:focus-visible` / hover — not this flag — so mouse-open
     * does not paint the first item selected (initial open).
     */
    active: boolean;
    private submenuAnimated;
    private submenuPanelElement;
    private submenuPopupElement;
    private readonly hasSlotController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /** Light-DOM `slot="submenu"` — public for menu keyboard (`hasSubmenu`). */
    hasSubmenu(): boolean;
    private syncSubmenuAria;
    focusControl(): void;
    /** Callers `item.focus()` — route into the shadow control button. */
    focus(options?: FocusOptions): void;
    /** Public for menu leave-detection (`submenuElement`). */
    get submenuElement(): HTMLDivElement | null;
    closeSubmenu(): void;
    /**
     * Opens the nested submenu panel (mouse + keyboard).
     * notify parent first so siblings close, then set `submenuOpen`.
     */
    openSubmenu(): void;
    /** `notifyParentOfOpening` — sibling close + bubble to the menu. */
    private notifyParentOfOpening;
    private ensureSubmenuSurface;
    private syncRole;
    /** `handleMouseEnter` — open on hover; siblings close via notify. */
    private handleMouseEnter;
    /** Host has `role="menuitem"` — block disabled activation; selection is handled by `pk-dropdown-menu`. */
    private handleHostClick;
    private handleClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-item': PkDropdownItem;
    }
}
//# sourceMappingURL=pk-dropdown-item.d.ts.map