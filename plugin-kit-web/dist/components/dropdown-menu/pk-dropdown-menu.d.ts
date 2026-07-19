import { PkElement } from '../../base/pk-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkPopup, PkPopupPlacement } from '../popup/pk-popup.js';
import { PkDropdownItem } from './pk-dropdown-item.js';
export type PkDropdownMenuSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * @deprecated Imperative `items` was removed with the port — slot `pk-dropdown-item`
 * (and separators) instead. Type kept for React re-exports / migration.
 */
export type PkMenuItem = {
    id: string;
    label?: string;
    type?: 'item' | 'separator';
    disabled?: boolean;
    destructive?: boolean;
};
/**
 * Dropdown menu — literal  `pk-dropdown` overlay lifecycle with Plugin Kit styling.
 * Panel motion: content-sized, scale+fade; origin from popup `--pk-transform-origin`
 * (anchor center on the connecting edge — matches v1 / Base UI).
 * Keyboard navigation matches arrows, Home/End, typeahead, Enter/Space, submenu ←/→.
 *
 * @slot trigger - Menu trigger (when not using `for`)
 * @slot - `pk-dropdown-item` elements
 *
 * @attr for - Id of an external trigger in the same root (TipTap toolbar pattern)
 *
 * @csspart panel - Menu panel
 */
export declare class PkDropdownMenu extends PkElement {
    static styles: import('lit').CSSResult[];
    open: boolean;
    size: PkDropdownMenuSize;
    placement: PkPopupPlacement;
    sideOffset: number;
    distance: number;
    skidding: number;
    /** External trigger id — preferred over `slot="trigger"` when set (TipTap toolbar). */
    for: string;
    private defaultSlot;
    private menuElement;
    private popupElement;
    /** Typeahead buffer — cleared ~1s after last printable key  */
    private userTypedQuery;
    private userTypedTimeout;
    /** Nested submenu path for ArrowLeft/Right (`openSubmenuStack`). */
    private openSubmenuStack;
    /**
     * Set when the trigger opens the menu via ArrowUp/Down.
     * Pointer opens must not pre-activate item[0] — that made the first ArrowDown
     * advance to item[1] while nothing looked selected (our paint:false divergence).
     * Keyboard opens open with focus on the first item: focus + activate the first item.
     */
    private openedByKeyboard;
    /**
     * Bound trigger — either `for`-resolved or slotted.
     * Resolve from this host (not the popup) so shadow-root ids like TipTap's work.
     */
    private triggerElement;
    /** Legacy compat for overlay lab snapshots and dismiss recovery. */
    get panelElement(): HTMLDivElement | null;
    get popup(): PkPopup | null;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): Promise<void>;
    getItems(includeDisabled?: boolean): PkDropdownItem[];
    /** Submenu children of a parent item (light-DOM `slot="submenu"`). */
    getSubmenuItems(parentItem: PkDropdownItem, includeDisabled?: boolean): PkDropdownItem[];
    getTrigger(): HTMLElement | null;
    /**
     * Floating UI / light-dismiss anchor — Element (not id string) so resolution
     * happens from this host's root, not pk-popup's shadow root.
     */
    private getAnchor;
    private resolveExternalTrigger;
    private onTriggerSlotChange;
    /** Sync aria + cached trigger from the trigger slot (safe to call repeatedly). */
    private syncSlottedTrigger;
    /** Aria (+ listeners for external `for` triggers that sit outside this host). */
    private bindTrigger;
    private unbindTrigger;
    private syncTriggerExpanded;
    /** Called by `pk-dropdown-item` after a selection. */
    closeAfterSelect(_source?: PkOverlaySource): void;
    /** `makeSelection()` — single `pk-select` on the menu host. */
    private makeSelection;
    private resolveMenuItem;
    /** Resolves after exit animation and popup demotion — safe point to open a modal. */
    whenClosed(): Promise<void>;
    /** Recovery hook — clears leaked document dismiss listeners after abnormal teardown. */
    forceDismissCleanup(): void;
    private handleMenuClick;
    /** `handleSubmenuOpening` — keep stack in sync when items notify on hover. */
    private handleSubmenuOpening;
    /**
     * `handleGlobalMouseMove` — close the current submenu when the pointer
     * leaves both the parent item and its submenu panel (with a short grace period).
     */
    private handleGlobalMouseMove;
    private handleTriggerClick;
    /** Direct listener for `for` triggers (outside this host's composed tree). */
    private handleExternalTriggerClick;
    /** ArrowDown/Up on a closed trigger opens and focuses the first item ( APG). */
    private handleTriggerKeyDown;
    private isRtl;
    private addToSubmenuStack;
    private removeFromSubmenuStack;
    private getCurrentSubmenuItem;
    private closeAllSubmenus;
    private closeSiblingSubmenus;
    private setActiveItem;
    /** `handleDocumentKeyDown` — arrows, Home/End, typeahead, Enter/Space, submenu. */
    private handleDocumentKeyDown;
    private handleDocumentPointerDown;
    /** `showMenu()` — only called from `updated()` when `open` becomes true. */
    private showMenu;
    /**
     * `hideMenu()` — only called from `updated()` when `open` becomes false.
     * Demote popup via `active = false` after the hide animation (hide order).
     */
    private hideMenu;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-menu': PkDropdownMenu;
    }
}
//# sourceMappingURL=pk-dropdown-menu.d.ts.map