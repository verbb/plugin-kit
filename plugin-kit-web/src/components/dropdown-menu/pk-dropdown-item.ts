import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { check, chevronRight } from '@verbb/plugin-kit-icons';

import { PkElement } from '../../base/pk-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { renderIconHtml } from '../../icons/render.js';
import {
    syncPopupPlacementAnimation,
    waitForPopupReposition,
} from '../../utils/popup-placement-animation.js';
import { pkDropdownItemStyles } from './pk-dropdown-item.styles.js';

const CHECK_ICON = renderIconHtml(check);
const SUBMENU_ICON = renderIconHtml(chevronRight);

export type PkDropdownItemType = 'normal' | 'checkbox' | 'radio';

type PkDropdownMenuSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

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
@customElement('pk-dropdown-item')
export class PkDropdownItem extends PkElement {
    static override styles = pkDropdownItemStyles;

    @property()
    value = '';

    @property({ reflect: true })
    type: PkDropdownItemType = 'normal';

    @property({ attribute: 'radio-group' })
    radioGroup = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    destructive = false;

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ attribute: 'submenu-open', type: Boolean, reflect: true })
    submenuOpen = false;

    /**
     * Roving highlight index for keyboard nav (`active`).
     * Visual chrome uses `:focus-visible` / hover — not this flag — so mouse-open
     * does not paint the first item selected (initial open).
     */
    @property({ type: Boolean })
    active = false;

    @state()
    private submenuAnimated = false;

    @query('.submenu-panel')
    private submenuPanelElement!: HTMLDivElement;

    @query('pk-popup')
    private submenuPopupElement!: HTMLElement;

    private readonly hasSlotController = new HasSlotController(this, 'submenu', 'details', 'start', 'prefix');

    override connectedCallback(): void {
        super.connectedCallback();
        this.syncRole();
        this.syncSubmenuAria();
        this.addEventListener('click', this.handleHostClick);
        // Bind mouseenter on the host — covers the whole row, not just the button.
        this.addEventListener('mouseenter', this.handleMouseEnter);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('click', this.handleHostClick);
        this.removeEventListener('mouseenter', this.handleMouseEnter);
        this.closeSubmenu();
        super.disconnectedCallback();
    }

    override updated(changed: Map<string, unknown>): void {
        if (changed.has('type') || changed.has('checked')) {
            this.syncRole();
        }

        if (changed.has('submenuOpen') || changed.size === 0) {
            this.syncSubmenuAria();
        }

        // Keyboard / external callers set `submenuOpen`; mouse path goes through openSubmenu().
        if (changed.has('submenuOpen')) {
            if (this.submenuOpen) {
                this.ensureSubmenuSurface();
            } else {
                this.submenuAnimated = false;
            }
        }
    }

    /** Light-DOM `slot="submenu"` — public for menu keyboard (`hasSubmenu`). */
    hasSubmenu(): boolean {
        return this.hasSlotController.test('submenu');
    }

    private syncSubmenuAria(): void {
        const hasSubmenu = this.hasSubmenu();

        if (hasSubmenu) {
            this.setAttribute('aria-haspopup', 'menu');
        } else {
            this.removeAttribute('aria-haspopup');
        }

        this.setAttribute('aria-expanded', hasSubmenu && this.submenuOpen ? 'true' : 'false');
    }

    focusControl(): void {
        this.shadowRoot?.querySelector<HTMLButtonElement>('.item')?.focus({ preventScroll: true });
    }

    /** Callers `item.focus()` — route into the shadow control button. */
    override focus(options?: FocusOptions): void {
        const button = this.shadowRoot?.querySelector<HTMLButtonElement>('.item');

        if (button) {
            button.focus(options);
            return;
        }

        super.focus(options);
    }

    /** Public for menu leave-detection (`submenuElement`). */
    get submenuElement(): HTMLDivElement | null {
        return this.submenuPanelElement ?? null;
    }

    closeSubmenu(): void {
        this.submenuAnimated = false;
        this.submenuOpen = false;
    }

    /**
     * Opens the nested submenu panel (mouse + keyboard).
     * notify parent first so siblings close, then set `submenuOpen`.
     */
    openSubmenu(): void {
        if (!this.hasSubmenu() || this.disabled || !this.isConnected) {
            return;
        }

        this.notifyParentOfOpening();
        this.submenuOpen = true;
    }

    /** `notifyParentOfOpening` — sibling close + bubble to the menu. */
    private notifyParentOfOpening(): void {
        this.dispatchEvent(new CustomEvent('pk-submenu-open', {
            bubbles: true,
            composed: true,
            detail: { item: this },
        }));

        const parent = this.parentElement;

        if (!parent) {
            return;
        }

        // Same slot + same light-DOM parent = siblings (top-level or nested submenu).
        for (const el of parent.children) {
            if (
                el !== this
                && el instanceof PkDropdownItem
                && el.getAttribute('slot') === this.getAttribute('slot')
                && el.submenuOpen
            ) {
                el.submenuOpen = false;
            }
        }
    }

    private ensureSubmenuSurface(): void {
        if (!this.hasSubmenu() || this.disabled) {
            return;
        }

        this.submenuAnimated = true;

        void this.updateComplete.then(() => {
            if (!this.submenuOpen || !this.submenuPanelElement) {
                return;
            }

            this.submenuPanelElement.hidden = false;
            syncPopupPlacementAnimation(this.submenuPanelElement, 'right-start');

            void waitForPopupReposition(this.submenuPopupElement, 'right-start').then((placement) => {
                syncPopupPlacementAnimation(this.submenuPanelElement, placement);
            });
        });
    }

    private syncRole(): void {
        if (this.type === 'checkbox') {
            this.setAttribute('role', 'menuitemcheckbox');
            this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
            return;
        }

        if (this.type === 'radio') {
            this.setAttribute('role', 'menuitemradio');
            this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
            return;
        }

        this.setAttribute('role', 'menuitem');
        this.removeAttribute('aria-checked');
    }

    /** `handleMouseEnter` — open on hover; siblings close via notify. */
    private handleMouseEnter = (): void => {
        if (!this.hasSubmenu() || this.disabled) {
            return;
        }

        this.notifyParentOfOpening();
        this.submenuOpen = true;
    };

    /** Host has `role="menuitem"` — block disabled activation; selection is handled by `pk-dropdown-menu`. */
    private handleHostClick = (event: Event): void => {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };

    private handleClick(event: Event): void {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }

        if (this.hasSubmenu()) {
            event.preventDefault();
            this.openSubmenu();
        }
    }

    override render() {
        const hasSubmenu = this.hasSubmenu();
        const showCheck = this.type === 'checkbox' || this.type === 'radio';
        // Prefer start (button parity); prefix kept as legacy alias.
        const hasLeadingIcon = this.hasSlotController.test('start') || this.hasSlotController.test('prefix');

        return html`
            <button
                part="item"
                type="button"
                class="item"
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? 'true' : nothing}
                @click=${this.handleClick}
            >
                <span
                    part="prefix"
                    class=${hasLeadingIcon ? 'prefix' : 'prefix prefix--empty'}
                >
                    <slot name="start"></slot>
                    <slot name="prefix"></slot>
                </span>
                <span class="label"><slot></slot></span>
                <span class="details"><slot name="details"></slot></span>
                ${showCheck ? html`<span class="check" aria-hidden="true">${unsafeSVG(CHECK_ICON)}</span>` : nothing}
                ${hasSubmenu ? html`<span class="submenu-icon" aria-hidden="true">${unsafeSVG(SUBMENU_ICON)}</span>` : nothing}
            </button>
            ${hasSubmenu ? html`
                <pk-popup
                    .active=${this.submenuOpen}
                    .anchor=${this}
                    placement="right-start"
                    .distance=${0}
                    .skidding=${-4}
                    flip
                    shift
                    hover-bridge
                    style="--pk-popup-z-index: 1001"
                >
                    <div
                        part="submenu"
                        class="submenu-panel pk-popup-content"
                        role="menu"
                        data-size=${resolveMenuSize(this)}
                        ?hidden=${!this.submenuOpen}
                        data-open=${this.submenuAnimated ? '' : nothing}
                        aria-orientation="vertical"
                    >
                        <slot name="submenu"></slot>
                    </div>
                </pk-popup>
            ` : nothing}
        `;
    }
}

function resolveMenuSize(item: PkDropdownItem): PkDropdownMenuSize {
    const panelSize = item.parentElement?.getAttribute('data-size');

    if (panelSize === 'xs' || panelSize === 'sm' || panelSize === 'default' || panelSize === 'lg' || panelSize === 'xl') {
        return panelSize;
    }

    const menu = item.closest('pk-dropdown-menu');
    const menuSize = menu?.getAttribute('size');

    if (menuSize === 'xs' || menuSize === 'sm' || menuSize === 'lg' || menuSize === 'xl') {
        return menuSize;
    }

    return 'default';
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-item': PkDropdownItem;
    }
}
