import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { uniqueId } from '../../a11y/focus.js';
import { PkElement } from '../../base/pk-element.js';
import type { PkTabBase } from './pk-tab-base.js';
import type { PkTabPanelBase } from './pk-tab-panel-base.js';
import { pkTabsStyles } from './pk-tabs.styles.js';

export type PkTabsVariant = 'default' | 'pane' | 'modal' | 'sidebar';
export type PkTabsOrientation = 'horizontal' | 'vertical';
export type PkTabsPlacement = 'top' | 'bottom' | 'start' | 'end';
export type PkTabsActivation = 'auto' | 'manual';

/**
 * Tab group — coordinates slotted `pk-tab` (nav) and `pk-tab-panel` children.
 *
 * @slot nav - `pk-tab` triggers and optional `pk-tab-heading` group labels
 * @slot - `pk-tab-panel` content panels
 *
 * @event pk-change - Active tab changed.
 * @event pk-tab-show - A tab panel became visible.
 * @event pk-tab-hide - A tab panel became hidden.
 *
 * @csspart base - Root container
 * @csspart list - Tab list
 */
@customElement('pk-tabs')
export class PkTabs extends PkElement {
    static override styles = pkTabsStyles;

    @property()
    value = '';

    /** Visual style — `default` (segmented), `pane`, `modal`, or `sidebar` (vertical nav). */
    @property({ reflect: true })
    variant: PkTabsVariant = 'default';

    @property({ reflect: true })
    orientation: PkTabsOrientation = 'horizontal';

    @property({ reflect: true })
    placement: PkTabsPlacement = 'top';

    /**
     * `manual` — arrow keys move focus only; Enter/Space activates (Base UI default).
     * `auto` — arrow keys activate tabs immediately.
     */
    @property({ reflect: true })
    activation: PkTabsActivation = 'manual';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    private readonly baseId = uniqueId('pk-tabs');

    @state()
    private tabs: PkTabBase[] = [];

    @state()
    private panels: PkTabPanelBase[] = [];

    @state()
    private focusedValue = '';

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('pk-tab-select', this.handleTabSelect as EventListener);
        this.addEventListener('pk-tab-keydown', this.handleTabKeyDown as EventListener);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('pk-tab-select', this.handleTabSelect as EventListener);
        this.removeEventListener('pk-tab-keydown', this.handleTabKeyDown as EventListener);
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('disabled') || changed.has('activation')) {
            if (changed.has('value')) {
                this.focusedValue = this.value;
            }

            this.applySelection();
        }
    }

    private syncTabs = (): void => {
        const slot = this.shadowRoot?.querySelector('slot[name="nav"]') as HTMLSlotElement | null;

        if (!slot) {
            return;
        }

        this.tabs = slot.assignedElements({ flatten: true }).filter(
            (element) => element.tagName === 'PK-TAB',
        ) as PkTabBase[];

        this.ensureDefaultValue();
        this.applySelection();
    };

    private syncPanels = (): void => {
        const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;

        if (!slot) {
            return;
        }

        this.panels = slot.assignedElements({ flatten: true }).filter(
            (element) => element.tagName === 'PK-TAB-PANEL',
        ) as PkTabPanelBase[];

        this.applySelection();
    };

    private ensureDefaultValue(): void {
        if (this.value || this.tabs.length === 0) {
            return;
        }

        const firstEnabled = this.tabs.find((tab) => !tab.disabled && !this.disabled);

        if (firstEnabled) {
            this.value = firstEnabled.value;
            this.focusedValue = this.value;
        }
    }

    private getEnabledTabs(): PkTabBase[] {
        return this.tabs.filter((tab) => !tab.disabled && !this.disabled);
    }

    /**
     * Sidebar is inherently a vertical nav list. Layout CSS and keyboard arrows
     * both follow this effective orientation so consumers can omit the attrs.
     */
    private getEffectiveOrientation(): PkTabsOrientation {
        return this.variant === 'sidebar' ? 'vertical' : this.orientation;
    }

    private getEffectivePlacement(): PkTabsPlacement {
        if (this.variant === 'sidebar') {
            return this.placement === 'top' || this.placement === 'bottom' ? 'start' : this.placement;
        }

        return this.placement;
    }

    private applySelection(): void {
        const previousValue = this.getAttribute('data-current-value') ?? '';
        const focusTarget = this.activation === 'manual' ? this.focusedValue : this.value;

        for (const tab of this.tabs) {
            const selected = tab.value === this.value;
            const tabId = `${this.baseId}-tab-${tab.value}`;
            const panelId = `${this.baseId}-panel-${tab.value}`;

            tab.selected = selected;
            tab.disabled = this.disabled || tab.hasAttribute('disabled');
            tab.focusIndex = tab.value === focusTarget ? 0 : -1;
            tab.panelId = panelId;
            tab.id = tabId;
        }

        for (const panel of this.panels) {
            const selected = panel.value === this.value;
            const tabId = `${this.baseId}-tab-${panel.value}`;
            const panelId = `${this.baseId}-panel-${panel.value}`;

            if (panel.hidden !== !selected) {
                if (selected) {
                    this.dispatchEvent(new CustomEvent('pk-tab-show', {
                        detail: { value: panel.value },
                        bubbles: true,
                        composed: true,
                    }));
                } else if (previousValue === panel.value) {
                    this.dispatchEvent(new CustomEvent('pk-tab-hide', {
                        detail: { value: panel.value },
                        bubbles: true,
                        composed: true,
                    }));
                }
            }

            panel.hidden = !selected;
            panel.tabId = tabId;
            panel.id = panelId;
        }

        this.setAttribute('data-current-value', this.value);
    }

    /**
     * `pk-tab-select` / `pk-tab-keydown` bubble + compose out of nested tab groups
     * (e.g. modal tabs inside a pane). Only own nav-slot tabs may drive this instance.
     */
    private isOwnTabEvent(event: Event): boolean {
        const target = event.target;

        return target instanceof HTMLElement
            && target.tagName === 'PK-TAB'
            && this.tabs.includes(target as PkTabBase);
    }

    private handleTabSelect = (event: CustomEvent<{ value: string }>): void => {
        if (!this.isOwnTabEvent(event) || this.disabled) {
            return;
        }

        // Nested groups stop here so ancestor `pk-tabs` never adopt foreign values.
        event.stopPropagation();

        const { value } = event.detail;

        if (value === this.value && this.activation === 'manual') {
            this.focusedValue = value;
            this.applySelection();
            return;
        }

        if (value === this.value) {
            return;
        }

        this.selectTab(value);
    };

    private selectTab(value: string): void {
        this.value = value;
        this.focusedValue = value;
        this.applySelection();

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private handleTabKeyDown = (event: CustomEvent<{ event: KeyboardEvent; value: string }>): void => {
        if (!this.isOwnTabEvent(event)) {
            return;
        }

        event.stopPropagation();

        const keyboardEvent = event.detail.event;
        const enabled = this.getEnabledTabs();

        if (enabled.length === 0) {
            return;
        }

        const currentIndex = enabled.findIndex((tab) => tab.value === event.detail.value);

        if (currentIndex < 0) {
            return;
        }

        let nextIndex = currentIndex;
        const isHorizontal = this.getEffectiveOrientation() === 'horizontal';

        switch (keyboardEvent.key) {
            case 'ArrowDown':
                if (isHorizontal) {
                    return;
                }
                keyboardEvent.preventDefault();
                nextIndex = currentIndex >= enabled.length - 1 ? 0 : currentIndex + 1;
                break;

            case 'ArrowUp':
                if (isHorizontal) {
                    return;
                }
                keyboardEvent.preventDefault();
                nextIndex = currentIndex <= 0 ? enabled.length - 1 : currentIndex - 1;
                break;

            case 'ArrowRight':
                if (!isHorizontal) {
                    return;
                }
                keyboardEvent.preventDefault();
                nextIndex = currentIndex >= enabled.length - 1 ? 0 : currentIndex + 1;
                break;

            case 'ArrowLeft':
                if (!isHorizontal) {
                    return;
                }
                keyboardEvent.preventDefault();
                nextIndex = currentIndex <= 0 ? enabled.length - 1 : currentIndex - 1;
                break;

            case 'Home':
                keyboardEvent.preventDefault();
                nextIndex = 0;
                break;

            case 'End':
                keyboardEvent.preventDefault();
                nextIndex = enabled.length - 1;
                break;

            default:
                return;
        }

        const next = enabled[nextIndex];

        if (!next) {
            return;
        }

        if (this.activation === 'auto') {
            if (next.value !== this.value) {
                this.selectTab(next.value);
            } else {
                next.focusControl();
            }
        } else {
            this.focusedValue = next.value;
            this.applySelection();
            next.focusControl();
        }
    };

    override render() {
        const orientation = this.getEffectiveOrientation();
        const placement = this.getEffectivePlacement();

        return html`
            <div part="base" class="tabs pk-tabs" data-placement=${placement}>
                <div
                    part="list"
                    class="list pk-tabs__list"
                    role="tablist"
                    aria-orientation=${orientation}
                    aria-label=${this.ariaLabel ?? nothing}
                    @slotchange=${this.syncTabs}
                >
                    <slot name="nav"></slot>
                </div>
                <slot @slotchange=${this.syncPanels}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tabs': PkTabs;
    }
}
