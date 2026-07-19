import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';

import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { uniqueId } from '../../a11y/focus.js';
import { PkElement } from '../../base/pk-element.js';
import { resolveElementById } from '../../internal/resolve-element-by-id.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { handleMenuKeyDown, MENU_NAVIGATION_KEYS } from '../../utils/menu-keyboard.js';
import {
    syncPopupPlacementAnimation,
} from '../../utils/popup-placement-animation.js';
import { isEventInsideOverlay, isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import { PkPopup, type PkPopupPlacement } from '../popup/pk-popup.js';
import { PkDropdownItem } from './pk-dropdown-item.js';
import { pkMenuStyles } from './pk-dropdown-menu.styles.js';

function getDropdownItem(target: EventTarget | null): PkDropdownItem | null {
    if (!(target instanceof HTMLElement) || target.localName !== 'pk-dropdown-item') {
        return null;
    }

    return target as PkDropdownItem;
}

function getDropdownItemFromEvent(event: Event): PkDropdownItem | null {
    for (const node of event.composedPath()) {
        const item = getDropdownItem(node);

        if (item) {
            return item;
        }
    }

    return null;
}

export type PkDropdownMenuSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

export type PkMenuItem = {
    id: string;
    label?: string;
    type?: 'item' | 'separator';
    disabled?: boolean;
    destructive?: boolean;
};

/**
 * Dropdown menu —  pattern: trigger + floating `role="menu"` panel.
 *
 * @slot trigger - Menu trigger (button)
 * @slot - `pk-dropdown-item` elements or use `items` property
 *
 * @csspart panel - Menu panel
 */
@customElement('pk-dropdown-menu')
export class PkDropdownMenu extends PkElement {
    static override styles = pkMenuStyles;

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    /** Gap between the trigger and menu panel in px — matches Base UI `sideOffset` (default: 4). */
    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 4;

    /** Menu item scale — inherited by slotted `pk-dropdown-item` and `pk-dropdown-label`. */
    @property({ reflect: true })
    size: PkDropdownMenuSize = 'default';

    @property({ attribute: false })
    items: PkMenuItem[] = [];

    /** Anchor element id — alternative to the trigger slot. */
    @property({ reflect: true })
    for = '';

    /**
     * Whether arrow-key focus loops from the last item back to the first (and vice versa).
     * Mirrors Base UI `Menu` — default: `true`.
     */
    @property({ attribute: 'loop-focus', type: Boolean })
    loopFocus = true;

    @query('pk-popup')
    private popupElement!: PkPopup;

    private get panelElement(): HTMLDivElement | null {
        return this.popupElement?.getContentElement() as HTMLDivElement | null ?? null;
    }

    private triggerElement: HTMLElement | null = null;

    @state()
    private closing = false;

    @state()
    private panelAnimated = false;

    @state()
    private highlightedIndex = 0;

    private readonly triggerId = uniqueId('pk-dropdown-trigger');
    private dismissRegistered = false;
    private panelEventTarget: HTMLElement | null = null;
    private pendingHideSource: PkOverlaySource = 'unknown';
    private pendingFocusFirst = false;
    private hiding = false;

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('pk-select', this.onItemSelect as EventListener);
    }

    override disconnectedCallback(): void {
        this.unbindPanelEvents();
        this.removeEventListener('keydown', this.onKeyDown);
        this.removeEventListener('pk-select', this.onItemSelect as EventListener);
        this.open = false;
        super.disconnectedCallback();
    }

    override updated(changed: Map<string, unknown>): void {
        if (changed.has('items') && this.items.length > 0 && !this.open) {
            this.renderItems();
        }

        if (this.open) {
            queueMicrotask(() => {
                this.bindRenderedItemEvents();
            });
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
            void this.showMenu({ focusFirst: this.pendingFocusFirst });
            this.pendingFocusFirst = false;
        } else if (!this.hiding) {
            this.closing = true;
            void this.hideMenu(this.pendingHideSource);
            this.pendingHideSource = 'unknown';
        }
    }

    override firstUpdated(): void {
        if (this.for) {
            queueMicrotask(() => {
                this.resolveExternalTrigger();
            });
        }
    }

    private resolveExternalTrigger(): void {
        this.triggerElement = resolveElementById(this, this.for);
        this.bindTrigger(this.triggerElement);
    }

    private onTriggerSlotChange(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        const [trigger] = slot.assignedElements({ flatten: true }) as HTMLElement[];

        this.unbindTrigger(this.triggerElement);
        this.triggerElement = trigger ?? null;
        this.bindTrigger(this.triggerElement);
        this.requestUpdate();
    }

    private bindTrigger(trigger: HTMLElement | null): void {
        if (!trigger) {
            return;
        }

        if (!trigger.id) {
            trigger.id = this.triggerId;
        }

        trigger.setAttribute('aria-haspopup', 'menu');
        trigger.addEventListener('click', this.toggleMenu);
        trigger.addEventListener('keydown', this.onTriggerKeyDown);
        this.syncTriggerExpanded();
    }

    private unbindTrigger(trigger: HTMLElement | null): void {
        trigger?.removeEventListener('click', this.toggleMenu);
        trigger?.removeEventListener('keydown', this.onTriggerKeyDown);
    }

    private onTriggerKeyDown = (event: KeyboardEvent): void => {
        if (!MENU_NAVIGATION_KEYS.has(event.key)) {
            return;
        }

        if (!this.open) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                event.stopPropagation();
                this.pendingFocusFirst = true;
                this.open = true;
            }

            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.requestClose('escape');
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.highlightedIndex = this.handleMenuNavigation(event);
    };

    private renderItems(): void {
        const panel = this.panelElement;

        if (!panel) {
            return;
        }

        panel.replaceChildren();

        for (const item of this.items) {
            if (item.type === 'separator') {
                const separator = document.createElement('pk-dropdown-separator');
                panel.append(separator);
                continue;
            }

            const menuItem = document.createElement('pk-dropdown-item') as PkDropdownItem;
            menuItem.value = item.id;
            menuItem.disabled = Boolean(item.disabled);
            menuItem.destructive = Boolean(item.destructive);
            menuItem.textContent = item.label ?? '';
            menuItem.addEventListener('pk-select', this.onItemSelect as EventListener);
            panel.append(menuItem);
        }

        this.bindPanelEvents();
    }

    /** Portaled `items` may not bubble through the panel listener — bind each rendered item. */
    private bindRenderedItemEvents(): void {
        for (const menuItem of this.getMenuItems()) {
            if (menuItem.localName !== 'pk-dropdown-item') {
                continue;
            }

            menuItem.removeEventListener('pk-select', this.onItemSelect as EventListener);
            menuItem.addEventListener('pk-select', this.onItemSelect as EventListener);
        }
    }

    /** Imperative `items` in the panel, or slotted light-DOM `pk-dropdown-item` nodes. */
    private getSlottedMenuItems(): PkDropdownItem[] {
        const slot = this.panelElement?.querySelector<HTMLSlotElement>('slot:not([name])');

        if (!slot) {
            return [];
        }

        return slot.assignedElements({ flatten: true }).filter(
            (element): element is PkDropdownItem =>
                element instanceof HTMLElement && element.localName === 'pk-dropdown-item',
        );
    }

    private getMenuItems(): HTMLElement[] {
        const imperative = [
            ...(this.panelElement?.querySelectorAll<HTMLElement>(':scope > pk-dropdown-item') ?? []),
        ];

        if (imperative.length > 0) {
            return imperative;
        }

        return this.getSlottedMenuItems();
    }

    private getEnabledMenuItems(): HTMLElement[] {
        return this.getMenuItems().filter((item) => {
            return !item.hasAttribute('disabled') && item.getAttribute('aria-disabled') !== 'true';
        });
    }

    private syncMenuHighlight(): void {
        const enabled = this.getEnabledMenuItems();

        for (const item of this.getMenuItems()) {
            item.removeAttribute('data-highlighted');
        }

        const highlighted = enabled[this.highlightedIndex];

        if (highlighted) {
            highlighted.setAttribute('data-highlighted', '');
        }
    }

    /** Portaled menu items are outside the host tree — listen on the panel instead. */
    private bindPanelEvents(): void {
        const panel = this.panelElement;

        if (!panel || panel === this.panelEventTarget) {
            return;
        }

        this.unbindPanelEvents();
        this.panelEventTarget = panel;
        panel.addEventListener('pk-select', this.onItemSelect as EventListener);
        panel.addEventListener('pk-submenu-open', this.onSubmenuOpen as EventListener);
        panel.addEventListener('keydown', this.onPanelKeyDown, true);
    }

    private unbindPanelEvents(): void {
        if (!this.panelEventTarget) {
            return;
        }

        this.panelEventTarget.removeEventListener('pk-select', this.onItemSelect as EventListener);
        this.panelEventTarget.removeEventListener('pk-submenu-open', this.onSubmenuOpen as EventListener);
        this.panelEventTarget.removeEventListener('keydown', this.onPanelKeyDown, true);
        this.panelEventTarget = null;
    }

    private onItemSelect = (event: Event): void => {
        if (this.closing || this.hiding) {
            event.stopPropagation();
            return;
        }

        const item = getDropdownItemFromEvent(event);

        if (!item) {
            return;
        }

        if (item.type === 'checkbox' || item.type === 'radio') {
            if (item.type === 'radio' && item.radioGroup && this.panelElement) {
                for (const candidate of this.panelElement.querySelectorAll<PkDropdownItem>(
                    `:scope > pk-dropdown-item[type="radio"][radio-group="${item.radioGroup}"]`,
                )) {
                    candidate.checked = candidate === item;
                }
            }

            return;
        }

        event.stopPropagation();

        const itemDetail = (event as CustomEvent<{
            pointerActivated?: boolean;
            value?: string;
            type?: PkDropdownItem['type'];
            checked?: boolean;
            radioGroup?: string;
        }>).detail ?? {};

        const detail = {
            ...itemDetail,
            value: item.value,
            type: item.type,
            checked: item.checked,
            radioGroup: item.radioGroup,
        };

        const selectEvent = new CustomEvent('pk-select', {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        });

        this.dispatchEvent(selectEvent);

        if (selectEvent.defaultPrevented) {
            return;
        }

        const source = detail.pointerActivated ? 'pointer-dismiss' : 'api';
        this.requestClose(source);
    };

    private onSubmenuOpen = (event: Event): void => {
        const openingItem = getDropdownItem(event.target);

        if (!openingItem) {
            return;
        }

        for (const item of this.getMenuItems()) {
            const dropdownItem = getDropdownItem(item);

            if (dropdownItem && dropdownItem !== openingItem) {
                dropdownItem.closeSubmenu();
            }
        }
    };

    private toggleMenu = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();
        this.open = !this.open;
    };

    /** : `open = false` drives hide via `updated()` → `hideMenu()`. */
    private requestClose(source: PkOverlaySource): void {
        this.pendingHideSource = source;
        this.open = false;
    }

    /** Shows the menu — called from `updated()` when `open` becomes true. */
    private async showMenu(options: { focusFirst?: boolean } = {}): Promise<void> {
        if (this.hiding) {
            return;
        }

        const anchor = this.getAnchor();

        if (!anchor) {
            this.open = false;
            return;
        }

        const showEvent = new PkShowEvent();

        if (!this.dispatchEvent(showEvent)) {
            this.open = false;
            return;
        }

        const focusFirst = options.focusFirst === true;

        this.closing = false;
        this.panelAnimated = false;
        this.highlightedIndex = focusFirst ? 0 : -1;
        this.popupElement.active = true;

        if (this.panelElement) {
            this.panelElement.hidden = false;
            syncPopupPlacementAnimation(this.panelElement, this.placement);
        }

        this.syncTriggerExpanded();
        this.registerDismissHandlers();

        if (!this.open) {
            return;
        }

        if (this.panelElement) {
            this.panelElement.setAttribute('data-open', '');
        }

        this.panelAnimated = true;

        if (this.items.length > 0) {
            this.renderItems();
        } else {
            this.bindPanelEvents();
        }

        this.bindRenderedItemEvents();

        const items = this.getMenuItems();

        if (focusFirst) {
            focusFirstItem(items);
        } else {
            this.triggerElement?.focus({ preventScroll: true });
        }

        this.syncMenuHighlight();

        this.dispatchEvent(new PkAfterShowEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: true },
            bubbles: true,
            composed: true,
        }));
    }

    /** Called by `pk-dropdown-item` after a selection. */
    closeAfterSelect(source: PkOverlaySource = 'api'): void {
        this.requestClose(source);
    }

    /** Resolves after the exit animation and `pk-after-hide` — safe point to open another overlay. */
    whenClosed(): Promise<void> {
        if (!this.open && !this.closing && !this.hiding) {
            return Promise.resolve();
        }

        return Promise.race([
            new Promise<void>((resolve) => {
                this.addEventListener('pk-after-hide', () => resolve(), { once: true });
            }),
            new Promise<void>((resolve) => {
                window.setTimeout(resolve, 500);
            }),
        ]);
    }

    /** Hides the menu — only called from `updated()` when `open` becomes false. */
    private async hideMenu(source: PkOverlaySource = 'unknown'): Promise<void> {
        if (!this.popupElement || !this.panelElement || this.hiding) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            this.closing = false;
            this.open = true;
            return;
        }

        this.hiding = true;
        this.panelAnimated = false;
        this.panelElement.removeAttribute('data-open');
        this.panelElement.removeAttribute('data-side');
        this.unbindPanelEvents();
        this.closeAllSubmenus();
        this.unregisterDismissHandlers();
        this.syncTriggerExpanded();

        this.panelElement?.classList.remove('closing');

        this.closing = false;

        if (this.shouldReturnFocusToTrigger(source)) {
            this.triggerElement?.focus({ preventScroll: true });
        }

        // Handoff before popover teardown — app opens dialog on pk-after-hide + setTimeout(0).
        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));

        // FIFO after dialog's setTimeout(0) from pk-after-hide listeners.
        window.setTimeout(() => {
            this.popupElement.active = false;
        }, 0);

        this.hiding = false;
    }

    /** Recovery hook — clears leaked document dismiss listeners after abnormal teardown. */
    forceDismissCleanup(): void {
        this.hiding = false;
        this.closing = false;
        this.open = false;
        this.popupElement.active = false;
        this.unregisterDismissHandlers();
        this.syncTriggerExpanded();
    }

    private getAnchor(): Element | string | null {
        if (this.for) {
            return resolveElementById(this, this.for);
        }

        if (this.triggerElement) {
            return this.triggerElement;
        }

        return null;
    }

    private registerDismissHandlers(): void {
        if (this.dismissRegistered) {
            return;
        }

        registerDismissible(this);
        this.dismissRegistered = true;
        document.addEventListener('pointerup', this.onDocumentPointerUp, true);
        document.addEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private unregisterDismissHandlers(): void {
        if (this.dismissRegistered) {
            unregisterDismissible(this);
            this.dismissRegistered = false;
        }

        document.removeEventListener('pointerup', this.onDocumentPointerUp, true);
        document.removeEventListener('keydown', this.onDocumentKeyDown, true);
    }

    /** Dismiss after the full click completes — pointerdown can run before hit targets settle. */
    private onDocumentPointerUp = (event: PointerEvent): void => {
        if (!this.open && !this.closing) {
            return;
        }

        if (this.isPointerInside(event)) {
            return;
        }

        this.requestClose('light-dismiss');
    };

    private closeAllSubmenus(): void {
        for (const item of this.panelElement?.querySelectorAll<PkDropdownItem>('pk-dropdown-item') ?? []) {
            item.closeSubmenu();
        }
    }

    private isPointerInside(event: PointerEvent): boolean {
        return isPointerInsideOverlay(event, {
            host: this,
            anchor: this.getAnchorElement(),
            panel: this.panelElement,
            extraMatches: (element) => {
                return element.classList.contains('submenu-panel')
                    || element.localName === 'pk-dropdown-item';
            },
        });
    }

    private onPanelKeyDown = (event: KeyboardEvent): void => {
        if (!this.open || !MENU_NAVIGATION_KEYS.has(event.key)) {
            return;
        }

        if (event.key === 'Escape') {
            if (!isTopDismissible(this)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            this.requestClose('escape');
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.highlightedIndex = this.handleMenuNavigation(event);
    };

    private handleMenuNavigation(event: KeyboardEvent): number {
        this.highlightedIndex = handleMenuKeyDown(event, {
            items: this.getMenuItems(),
            currentIndex: this.highlightedIndex,
            loop: this.loopFocus,
            onClose: () => { this.requestClose('escape'); },
        });
        this.syncMenuHighlight();
        return this.highlightedIndex;
    }

    private onDocumentKeyDown = (event: KeyboardEvent): void => {
        if (!this.open) {
            return;
        }

        if (event.key !== 'Escape' || !isTopDismissible(this)) {
            return;
        }

        if (!isEventInsideOverlay(event, {
            anchor: this.getAnchorElement(),
            panel: this.panelElement,
            extraMatches: (element) => {
                return element.classList.contains('submenu-panel')
                    || element.localName === 'pk-dropdown-item';
            },
        })) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.requestClose('escape');
    };

    private getAnchorElement(): HTMLElement | null {
        if (this.triggerElement) {
            return this.triggerElement;
        }

        if (this.for) {
            return resolveElementById(this, this.for);
        }

        return null;
    }

    private syncTriggerExpanded(): void {
        this.triggerElement?.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }

    /** Skip return focus on pointer dismiss/selection — avoids an unwanted focus ring after mouse use. */
    private shouldReturnFocusToTrigger(source: PkOverlaySource): boolean {
        return source !== 'light-dismiss' && source !== 'pointer-dismiss';
    }

    private onKeyDown = (event: KeyboardEvent): void => {
        if (!this.open || !MENU_NAVIGATION_KEYS.has(event.key)) {
            return;
        }

        this.highlightedIndex = this.handleMenuNavigation(event);
    };

    override render() {
        const anchor = this.getAnchor();
        const panelVisible = this.open || this.closing;

        return html`
            <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
            <pk-popup
                .anchor=${anchor ?? ''}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${classMap({
                        panel: true,
                        'pk-popup-content': true,
                        closing: this.closing,
                    })}
                    role="menu"
                    data-size=${this.size}
                    ?hidden=${!panelVisible}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                    aria-orientation="vertical"
                    tabindex=${this.open ? '-1' : nothing}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
    }
}

function focusFirstItem(items: HTMLElement[]): void {
    const first = items.find((item) => {
        if (item.hasAttribute('disabled')) {
            return false;
        }

        return item.getAttribute('aria-disabled') !== 'true';
    });

    if (!first) {
        return;
    }

    if ('focusControl' in first && typeof first.focusControl === 'function') {
        (first as PkDropdownItem).focusControl();
        return;
    }

    first.focus();
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-menu': PkDropdownMenu;
    }
}
