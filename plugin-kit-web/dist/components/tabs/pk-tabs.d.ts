import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
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
export declare class PkTabs extends PkElement {
    static styles: import('lit').CSSResult;
    value: string;
    /** Visual style — `default` (segmented), `pane`, `modal`, or `sidebar` (vertical nav). */
    variant: PkTabsVariant;
    orientation: PkTabsOrientation;
    placement: PkTabsPlacement;
    /**
     * `manual` — arrow keys move focus only; Enter/Space activates (Base UI default).
     * `auto` — arrow keys activate tabs immediately.
     */
    activation: PkTabsActivation;
    disabled: boolean;
    ariaLabel: string | null;
    private readonly baseId;
    private tabs;
    private panels;
    private focusedValue;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    private syncTabs;
    private syncPanels;
    private ensureDefaultValue;
    private getEnabledTabs;
    /**
     * Sidebar is inherently a vertical nav list. Layout CSS and keyboard arrows
     * both follow this effective orientation so consumers can omit the attrs.
     */
    private getEffectiveOrientation;
    private getEffectivePlacement;
    private applySelection;
    /**
     * `pk-tab-select` / `pk-tab-keydown` bubble + compose out of nested tab groups
     * (e.g. modal tabs inside a pane). Only own nav-slot tabs may drive this instance.
     */
    private isOwnTabEvent;
    private handleTabSelect;
    private selectTab;
    private handleTabKeyDown;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tabs': PkTabs;
    }
}
//# sourceMappingURL=pk-tabs.d.ts.map