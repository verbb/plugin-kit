import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { activeElements } from '../../a11y/active-elements.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { PkElement } from '../../base/pk-element.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { resolveElementById } from '../../internal/resolve-element-by-id.js';
import { animateWithClass } from '../../utils/animate-with-class.js';
import { waitForPopupReposition } from '../../utils/popup-placement-animation.js';
import { PkPopup, type PkPopupPlacement } from '../popup/pk-popup.js';
import { PkDropdownItem } from './pk-dropdown-item.js';
import { pkDropdownMenuStyles } from './pk-dropdown-menu.styles.js';

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

/** Tracks open menus — closing one closes others ( `pk-dropdown`). */
const openDropdowns = new Set<PkDropdownMenu>();

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
@customElement('pk-dropdown-menu')
export class PkDropdownMenu extends PkElement {
    static override styles = pkDropdownMenuStyles;

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    size: PkDropdownMenuSize = 'default';

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 4;

    @property({ type: Number })
    distance = 4;

    @property({ type: Number })
    skidding = 0;

    /** External trigger id — preferred over `slot="trigger"` when set (TipTap toolbar). */
    @property({ reflect: true })
    for = '';

    @query('slot:not([name])')
    private defaultSlot!: HTMLSlotElement;

    @query('#menu')
    private menuElement!: HTMLDivElement;

    @query('pk-popup')
    private popupElement!: PkPopup;

    /** Typeahead buffer — cleared ~1s after last printable key  */
    private userTypedQuery = '';

    private userTypedTimeout = 0;

    /** Nested submenu path for ArrowLeft/Right (`openSubmenuStack`). */
    private openSubmenuStack: PkDropdownItem[] = [];

    /**
     * Set when the trigger opens the menu via ArrowUp/Down.
     * Pointer opens must not pre-activate item[0] — that made the first ArrowDown
     * advance to item[1] while nothing looked selected (our paint:false divergence).
     * Keyboard opens open with focus on the first item: focus + activate the first item.
     */
    private openedByKeyboard = false;

    /**
     * Bound trigger — either `for`-resolved or slotted.
     * Resolve from this host (not the popup) so shadow-root ids like TipTap's work.
     */
    private triggerElement: HTMLElement | null = null;

    /** Legacy compat for overlay lab snapshots and dismiss recovery. */
    get panelElement(): HTMLDivElement | null {
        return this.menuElement ?? null;
    }

    get popup(): PkPopup | null {
        return this.popupElement ?? null;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        // Host capture — do not rely on per-trigger listeners. React can replace the
        // slotted trigger (or miss slotchange) after tree remounts; getTrigger() is live.
        this.addEventListener('click', this.handleTriggerClick, true);
        this.addEventListener('keydown', this.handleTriggerKeyDown);
    }

    override firstUpdated(): void {
        // Sibling / slotted triggers may not be queryable until the parent finishes rendering.
        const sync = (): void => {
            if (this.for) {
                this.resolveExternalTrigger();
                return;
            }

            this.syncSlottedTrigger();
        };

        queueMicrotask(sync);
        // React often appends the slotted trigger after Lit's first microtask.
        requestAnimationFrame(sync);
    }

    override disconnectedCallback(): void {
        window.clearTimeout(this.userTypedTimeout);
        this.removeEventListener('click', this.handleTriggerClick, true);
        this.removeEventListener('keydown', this.handleTriggerKeyDown);
        this.unbindTrigger(this.triggerElement);
        this.triggerElement = null;
        this.closeAllSubmenus();
        // Demote popup before teardown — otherwise a remounted/reused host can hit
        // showMenu()'s `active` early-return and never paint the panel again.
        if (this.popupElement) {
            this.popupElement.active = false;
        }
        this.menuElement?.classList.remove('show', 'hide');
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.removeEventListener('mousemove', this.handleGlobalMouseMove);
        unregisterDismissible(this);
        openDropdowns.delete(this);
        super.disconnectedCallback();
    }

    override async updated(changed: Map<string, unknown>): Promise<void> {
        super.updated(changed);

        if (changed.has('for')) {
            this.resolveExternalTrigger();
        }

        if (changed.has('open')) {
            this.syncTriggerExpanded();
        }

        if (!changed.has('open')) {
            return;
        }

        const previousOpen = changed.get('open');

        if (previousOpen === this.open) {
            return;
        }

        if (previousOpen === undefined && this.open === false) {
            return;
        }

        if (this.open) {
            await this.showMenu();
        } else {
            this.closeAllSubmenus();
            await this.hideMenu('unknown');
        }
    }

    getItems(includeDisabled = false): PkDropdownItem[] {
        const items = (this.defaultSlot?.assignedElements({ flatten: true }) ?? [])
            .filter((el): el is PkDropdownItem => el.localName === 'pk-dropdown-item');

        return includeDisabled ? items : items.filter((item) => !item.disabled);
    }

    /** Submenu children of a parent item (light-DOM `slot="submenu"`). */
    getSubmenuItems(parentItem: PkDropdownItem, includeDisabled = false): PkDropdownItem[] {
        const submenuSlot = parentItem.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="submenu"]');
        const assigned = submenuSlot?.assignedElements({ flatten: true })
            ?? [...parentItem.children].filter((el) => el.getAttribute('slot') === 'submenu');

        const items = assigned.filter((el): el is PkDropdownItem => el.localName === 'pk-dropdown-item');

        return includeDisabled ? items : items.filter((item) => !item.disabled);
    }

    getTrigger(): HTMLElement | null {
        if (this.for) {
            // Prefer live resolve so TipTap re-renders of the sibling button still bind.
            return resolveElementById(this, this.for) ?? this.triggerElement;
        }

        // Prefer the live slotted node — React may replace it without rebinding.
        return this.querySelector('[slot="trigger"]') ?? this.triggerElement;
    }

    /**
     * Floating UI / light-dismiss anchor — Element (not id string) so resolution
     * happens from this host's root, not pk-popup's shadow root.
     */
    private getAnchor(): Element | '' {
        return this.getTrigger() ?? '';
    }

    private resolveExternalTrigger(): void {
        this.unbindTrigger(this.triggerElement);
        this.triggerElement = this.for ? resolveElementById(this, this.for) : null;
        this.bindTrigger(this.triggerElement);
        this.requestUpdate();
    }

    private onTriggerSlotChange(event: Event): void {
        // `for` owns the trigger when set — ignore slotted nodes.
        if (this.for) {
            return;
        }

        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        this.unbindTrigger(this.triggerElement);
        this.triggerElement = trigger ?? null;
        this.bindTrigger(this.triggerElement);
        this.requestUpdate();
    }

    /** Sync aria + cached trigger from the trigger slot (safe to call repeatedly). */
    private syncSlottedTrigger(): void {
        const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');

        if (slot) {
            this.onTriggerSlotChange({ target: slot } as unknown as Event);
        }
    }

    /** Aria (+ listeners for external `for` triggers that sit outside this host). */
    private bindTrigger(trigger: HTMLElement | null): void {
        if (!trigger) {
            return;
        }

        trigger.setAttribute('aria-haspopup', 'menu');

        // Slotted triggers are handled by host capture. External `for` triggers are not
        // descendants, so they need direct listeners.
        if (this.for) {
            trigger.addEventListener('click', this.handleExternalTriggerClick);
            trigger.addEventListener('keydown', this.handleTriggerKeyDown);
        }

        this.syncTriggerExpanded();
    }

    private unbindTrigger(trigger: HTMLElement | null): void {
        trigger?.removeEventListener('click', this.handleExternalTriggerClick);
        trigger?.removeEventListener('keydown', this.handleTriggerKeyDown);
    }

    private syncTriggerExpanded(): void {
        this.getTrigger()?.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }

    /** Called by `pk-dropdown-item` after a selection. */
    closeAfterSelect(_source: PkOverlaySource = 'api'): void {
        this.open = false;
    }

    /** `makeSelection()` — single `pk-select` on the menu host. */
    private makeSelection(item: PkDropdownItem): void {
        const trigger = this.getTrigger();

        if (item.disabled) {
            return;
        }

        if (item.type === 'checkbox') {
            item.checked = !item.checked;
        }

        if (item.type === 'radio' && !item.checked) {
            item.checked = true;
        }

        const detail = {
            value: item.value,
            type: item.type,
            checked: item.checked,
            radioGroup: item.radioGroup,
        };

        // Fire on the item first so React `DropdownItem onPkSelect` works. Non-bubbling so the
        // menu host listener (below) is not double-invoked from the same gesture.
        item.dispatchEvent(new CustomEvent('pk-select', {
            detail,
            bubbles: false,
            composed: false,
            cancelable: true,
        }));

        //  parity — also expose selection on the menu host.
        const selectEvent = new CustomEvent('pk-select', {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        });

        this.dispatchEvent(selectEvent);

        if (!selectEvent.defaultPrevented) {
            this.open = false;
            trigger?.focus({ preventScroll: true });
        }
    }

    private resolveMenuItem(event: Event): PkDropdownItem | null {
        const target = event.target;

        if (target instanceof PkDropdownItem) {
            return target;
        }

        if (target instanceof Element) {
            const closest = target.closest('pk-dropdown-item');

            if (closest instanceof PkDropdownItem) {
                return closest;
            }
        }

        const fromPath = event.composedPath().find(
            (node): node is PkDropdownItem => node instanceof PkDropdownItem,
        );

        return fromPath ?? null;
    }

    /** Resolves after exit animation and popup demotion — safe point to open a modal. */
    whenClosed(): Promise<void> {
        if (!this.open) {
            return this.popupElement?.active
                ? this.popupElement.stop()
                : Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            this.addEventListener('pk-after-hide', () => {
                void this.popupElement.stop().then(() => resolve());
            }, { once: true });
        });
    }

    /** Recovery hook — clears leaked document dismiss listeners after abnormal teardown. */
    forceDismissCleanup(): void {
        this.open = false;
        this.popupElement.active = false;
        this.menuElement?.classList.remove('show', 'hide');
        this.closeAllSubmenus();
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.removeEventListener('mousemove', this.handleGlobalMouseMove);
        unregisterDismissible(this);
        openDropdowns.delete(this);
    }

    private handleMenuClick = (event: Event): void => {
        const item = this.resolveMenuItem(event);

        if (!item || item.disabled) {
            return;
        }

        if (item.hasSubmenu()) {
            if (!item.submenuOpen) {
                this.closeSiblingSubmenus(item);
                this.addToSubmenuStack(item);
                item.openSubmenu();
            }

            event.stopPropagation();
            return;
        }

        this.makeSelection(item);
    };

    /** `handleSubmenuOpening` — keep stack in sync when items notify on hover. */
    private handleSubmenuOpening = (event: Event): void => {
        const openingItem = (event as CustomEvent<{ item: PkDropdownItem }>).detail?.item;

        if (!(openingItem instanceof PkDropdownItem)) {
            return;
        }

        this.closeSiblingSubmenus(openingItem);
        this.addToSubmenuStack(openingItem);
    };

    /**
     * `handleGlobalMouseMove` — close the current submenu when the pointer
     * leaves both the parent item and its submenu panel (with a short grace period).
     */
    private handleGlobalMouseMove = (event: MouseEvent): void => {
        const currentSubmenuItem = this.getCurrentSubmenuItem();

        if (!currentSubmenuItem?.submenuOpen || !currentSubmenuItem.submenuElement) {
            return;
        }

        const submenuElement = currentSubmenuItem.submenuElement;
        const composedPath = event.composedPath();
        const submenuItemHovered = currentSubmenuItem.matches(':hover');
        const submenuElementHovered = Boolean(submenuElement.matches(':hover'));
        const isOverItem = submenuItemHovered
            || composedPath.some((el) => el === currentSubmenuItem);
        const isOverSubmenu = submenuElementHovered
            || composedPath.some(
                (el) => el instanceof HTMLElement && el.closest('[part="submenu"]') === submenuElement,
            );

        if (!isOverItem && !isOverSubmenu) {
            // delayed close — same captured hover flags (grace for gap transit).
            window.setTimeout(() => {
                if (!submenuItemHovered && !submenuElementHovered) {
                    currentSubmenuItem.submenuOpen = false;
                }
            }, 100);
        }
    };

    private handleTriggerClick = (event: Event): void => {
        const trigger = this.getTrigger();

        // Host capture: only toggle when the composed path hits the live trigger.
        if (!trigger || !event.composedPath().includes(trigger)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.openedByKeyboard = false;
        this.open = !this.open;
    };

    /** Direct listener for `for` triggers (outside this host's composed tree). */
    private handleExternalTriggerClick = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();
        this.openedByKeyboard = false;
        this.open = !this.open;
    };

    /** ArrowDown/Up on a closed trigger opens and focuses the first item ( APG). */
    private handleTriggerKeyDown = (event: KeyboardEvent): void => {
        // Host keydown: require the live trigger in the path. External `for` binds this
        // directly on the trigger, so the path check still passes.
        const trigger = this.getTrigger();

        if (!trigger || !event.composedPath().includes(trigger)) {
            return;
        }

        if (this.open) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            this.openedByKeyboard = true;
            this.open = true;
        }
    };

    private isRtl(): boolean {
        return getComputedStyle(this).direction === 'rtl';
    }

    private addToSubmenuStack(item: PkDropdownItem): void {
        const index = this.openSubmenuStack.indexOf(item);

        if (index !== -1) {
            this.openSubmenuStack = this.openSubmenuStack.slice(0, index + 1);
        } else {
            this.openSubmenuStack.push(item);
        }
    }

    private removeFromSubmenuStack(): PkDropdownItem | undefined {
        return this.openSubmenuStack.pop();
    }

    private getCurrentSubmenuItem(): PkDropdownItem | undefined {
        return this.openSubmenuStack.length > 0
            ? this.openSubmenuStack[this.openSubmenuStack.length - 1]
            : undefined;
    }

    private closeAllSubmenus(): void {
        this.getItems(true).forEach((item) => {
            item.submenuOpen = false;
            item.active = false;
        });
        this.openSubmenuStack = [];
    }

    private closeSiblingSubmenus(item: PkDropdownItem): void {
        const parentItem = item.closest('pk-dropdown-item:not([slot="submenu"])');
        const siblings = parentItem instanceof PkDropdownItem
            ? this.getSubmenuItems(parentItem, true)
            : this.getItems(true);

        siblings.forEach((sibling) => {
            if (sibling !== item && sibling.submenuOpen) {
                sibling.submenuOpen = false;
            }
        });

        if (!this.openSubmenuStack.includes(item)) {
            this.openSubmenuStack.push(item);
        }
    }

    private setActiveItem(items: PkDropdownItem[], itemToSelect: PkDropdownItem): void {
        items.forEach((item) => {
            item.active = item === itemToSelect;

            // Keyboard-driven selection — paint explicitly:focus-visible uses :focus-visible on the
            // host; our control is a shadow button, so :focus-visible alone is unreliable from
            // the document keydown listener.
            if (item === itemToSelect) {
                item.setAttribute('data-highlighted', '');
            } else {
                item.removeAttribute('data-highlighted');
            }
        });
        itemToSelect.focus({ preventScroll: true });
        itemToSelect.scrollIntoView({ block: 'nearest' });
    }

    /** `handleDocumentKeyDown` — arrows, Home/End, typeahead, Enter/Space, submenu. */
    private handleDocumentKeyDown = (event: KeyboardEvent): void => {
        const isRtl = this.isRtl();

        if (event.key === 'Escape' && this.open && isTopDismissible(this)) {
            event.preventDefault();
            event.stopPropagation();
            this.open = false;
            this.getTrigger()?.focus({ preventScroll: true });
            return;
        }

        if (!this.open) {
            return;
        }

        const activeElement = [...activeElements()].find((el) => el.localName === 'pk-dropdown-item');
        const isFocusedOnItem = activeElement?.localName === 'pk-dropdown-item';
        const currentSubmenuItem = this.getCurrentSubmenuItem();
        const isInSubmenu = Boolean(currentSubmenuItem);

        let items: PkDropdownItem[];
        let activeItem: PkDropdownItem | undefined;
        let activeItemIndex: number;

        if (isInSubmenu && currentSubmenuItem) {
            items = this.getSubmenuItems(currentSubmenuItem);
            activeItem = items.find((item) => item.active || item === activeElement);
            activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
        } else {
            items = this.getItems();
            activeItem = items.find((item) => item.active || item === activeElement);
            activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
        }

        let itemToSelect: PkDropdownItem | undefined;

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            itemToSelect = activeItemIndex > 0
                ? items[activeItemIndex - 1]
                : items[items.length - 1];
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            itemToSelect = activeItemIndex !== -1 && activeItemIndex < items.length - 1
                ? items[activeItemIndex + 1]
                : items[0];
        }

        if (event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight') && isFocusedOnItem && activeItem) {
            if (activeItem.hasSubmenu()) {
                event.preventDefault();
                event.stopPropagation();
                this.closeSiblingSubmenus(activeItem);
                activeItem.openSubmenu();
                this.addToSubmenuStack(activeItem);
                window.setTimeout(() => {
                    const submenuItems = this.getSubmenuItems(activeItem);

                    if (submenuItems.length > 0) {
                        this.setActiveItem(submenuItems, submenuItems[0]);
                    }
                }, 0);
                return;
            }
        }

        if (event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft') && isInSubmenu) {
            event.preventDefault();
            event.stopPropagation();
            const removedItem = this.removeFromSubmenuStack();

            if (removedItem) {
                removedItem.submenuOpen = false;
                window.setTimeout(() => {
                    removedItem.focus({ preventScroll: true });
                    removedItem.active = true;
                    const parentItems = removedItem.slot === 'submenu'
                        && removedItem.parentElement instanceof PkDropdownItem
                        ? this.getSubmenuItems(removedItem.parentElement)
                        : this.getItems();
                    parentItems.forEach((item) => {
                        if (item !== removedItem) {
                            item.active = false;
                        }
                    });
                }, 0);
            }

            return;
        }

        if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            event.stopPropagation();
            itemToSelect = event.key === 'Home' ? items[0] : items[items.length - 1];
        }

        if (event.key === 'Tab') {
            this.open = false;
            return;
        }

        // Typeahead — printable keys ; Space alone activates when the buffer is empty.
        if (
            event.key.length === 1
            && !(event.metaKey || event.ctrlKey || event.altKey)
            && !(event.key === ' ' && this.userTypedQuery === '')
        ) {
            window.clearTimeout(this.userTypedTimeout);
            this.userTypedTimeout = window.setTimeout(() => {
                this.userTypedQuery = '';
            }, 1000);
            this.userTypedQuery += event.key;

            const selectionQuery = this.userTypedQuery.trim().toLowerCase();
            itemToSelect = items.find((item) => {
                const label = (item.textContent || '').trim().toLowerCase();
                return label.startsWith(selectionQuery);
            });
        }

        if (itemToSelect) {
            event.preventDefault();
            event.stopPropagation();
            this.setActiveItem(items, itemToSelect);
            return;
        }

        if (
            (event.key === 'Enter' || (event.key === ' ' && this.userTypedQuery === ''))
            && isFocusedOnItem
            && activeItem
        ) {
            event.preventDefault();
            event.stopPropagation();

            if (activeItem.hasSubmenu()) {
                this.closeSiblingSubmenus(activeItem);
                activeItem.openSubmenu();
                this.addToSubmenuStack(activeItem);
                window.setTimeout(() => {
                    const submenuItems = this.getSubmenuItems(activeItem);

                    if (submenuItems.length > 0) {
                        this.setActiveItem(submenuItems, submenuItems[0]);
                    }
                }, 0);
            } else {
                this.makeSelection(activeItem);
            }
        }
    };

    private handleDocumentPointerDown = (event: Event): void => {
        const path = event.composedPath();
        const trigger = this.getTrigger();

        // Treat the trigger as inside — otherwise pointerdown closes and the following
        // click re-opens (external `for` triggers sit outside this host).
        if (path.some((el) => el === this || el === trigger)) {
            return;
        }

        this.open = false;
    };

    /** `showMenu()` — only called from `updated()` when `open` becomes true. */
    private async showMenu(): Promise<void> {
        if (!this.popupElement || !this.menuElement) {
            return;
        }

        // TipTap / late-mounted `for` siblings — refresh before positioning.
        if (this.for && !this.triggerElement?.isConnected) {
            this.resolveExternalTrigger();
        }

        const showEvent = new PkShowEvent();

        if (!this.dispatchEvent(showEvent)) {
            this.open = false;
            return;
        }

        if (this.popupElement.active) {
            // Interrupted hide can leave `active` true while the panel is gone —
            // recover instead of no-op return (next open would silently fail).
            this.popupElement.active = false;
            this.menuElement.classList.remove('show', 'hide');
            await this.updateComplete;
        }

        openDropdowns.forEach((dropdown) => {
            if (dropdown !== this) {
                dropdown.open = false;
            }
        });

        this.popupElement.active = true;
        this.open = true;
        openDropdowns.add(this);
        registerDismissible(this);
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        document.addEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.addEventListener('mousemove', this.handleGlobalMouseMove);

        // Let Floating UI write data-current-placement before the show animation
        // (origin CSS keys off that attribute).
        await this.updateComplete;
        await waitForPopupReposition(this.popupElement, this.placement, 100, { requireEvent: true });

        if (!this.open) {
            // Show aborted mid-flight — demote so the next open is not stuck.
            this.popupElement.active = false;
            openDropdowns.delete(this);
            unregisterDismissible(this);
            document.removeEventListener('keydown', this.handleDocumentKeyDown);
            document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
            document.removeEventListener('mousemove', this.handleGlobalMouseMove);
            return;
        }

        this.menuElement.classList.remove('hide');
        await animateWithClass(this.menuElement, 'show');

        const items = this.getItems();

        if (items.length > 0) {
            if (this.openedByKeyboard) {
                // Show path — first item is the current option (and :focus-visible).
                this.setActiveItem(items, items[0]);
            } else {
                // Pointer open: do not pre-set item.active / item focus.
                // Still focuses item[0] here; with our prior paint:false that left an
                // invisible active index so the first ArrowDown skipped to item[1].
                // Leaving index at -1 makes the first ArrowDown select items[0] (index formula
                // when activeItemIndex === -1). Focus the menu panel for screen readers.
                items.forEach((item) => {
                    item.active = false;
                    item.removeAttribute('data-highlighted');
                });
                this.menuElement.focus({ preventScroll: true });
            }
        }

        this.openedByKeyboard = false;

        this.dispatchEvent(new PkAfterShowEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: true },
            bubbles: true,
            composed: true,
        }));
    }

    /**
     * `hideMenu()` — only called from `updated()` when `open` becomes false.
     * Demote popup via `active = false` after the hide animation (hide order).
     */
    private async hideMenu(source: PkOverlaySource): Promise<void> {
        if (!this.popupElement || !this.menuElement) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            this.open = true;
            return;
        }

        this.open = false;
        openDropdowns.delete(this);
        unregisterDismissible(this);
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('pointerdown', this.handleDocumentPointerDown, true);
        document.removeEventListener('mousemove', this.handleGlobalMouseMove);
        this.userTypedQuery = '';
        window.clearTimeout(this.userTypedTimeout);

        this.getItems(true).forEach((item) => {
            item.active = false;
            item.removeAttribute('data-highlighted');
        });

        this.menuElement.classList.remove('show');
        await animateWithClass(this.menuElement, 'hide');
        this.popupElement.active = false;

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));
    }

    override render() {
        const popupActive = this.hasUpdated ? this.popupElement?.active : this.open;
        // Pass Element when using `for` — string ids resolve from pk-popup's shadow and miss TipTap siblings.
        const externalAnchor = this.for ? this.getAnchor() : '';

        return html`
            <pk-popup
                .anchor=${externalAnchor}
                placement=${this.placement}
                .distance=${this.distance || this.sideOffset}
                .skidding=${this.skidding}
                ?active=${popupActive}
                flip
                shift
                .shiftPadding=${10}
                auto-size="vertical"
                .autoSizePadding=${10}
            >
                <slot
                    name="trigger"
                    slot="anchor"
                    @slotchange=${this.onTriggerSlotChange}
                ></slot>

                <div
                    id="menu"
                    part="panel"
                    class="panel"
                    role="menu"
                    tabindex="-1"
                    aria-orientation="vertical"
                    data-size=${this.size}
                    @click=${this.handleMenuClick}
                    @pk-submenu-open=${this.handleSubmenuOpening}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-menu': PkDropdownMenu;
    }
}
