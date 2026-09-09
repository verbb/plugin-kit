import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
export type PkImageBrowserSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/** Grid preview kind — compact glyphs vs larger photo tiles. */
export type PkImageBrowserMode = 'icon' | 'image';
/**
 * How option names appear in the grid.
 * - `tooltip` (default) — shared `pk-tooltip` on hover; `aria-label` always
 * - `inline` — caption under each cell
 * - `none` — `aria-label` only (no tooltip, no caption)
 *
 * Named `labelMode` (not `labels`) to avoid clashing with the native
 * form-associated `HTMLElement.labels` NodeList getter.
 */
export type PkImageBrowserLabelMode = 'tooltip' | 'inline' | 'none';
export type PkImageBrowserWidth = 'auto' | 'full';
/**
 * One browsable entry. Plugins own filtering / filesystem scanning and pass
 * already-resolved preview URLs or inline SVG markup.
 */
export type PkImageBrowserItem = {
    value: string;
    label: string;
    /** Public URL for `<img>`, or inline `<svg>…</svg>` markup. */
    preview?: string;
};
export type PkImageBrowserGroup = {
    name: string;
    items: PkImageBrowserItem[];
};
/**
 * Image browser — presentational picker for static filesystem icons/images.
 *
 * Plugins supply `items` / `groups` (and optional `selected-label` /
 * `selected-preview` for the closed trigger before the catalog is ready). The
 * kit does not scan disks or filter extensions.
 *
 * Keyboard: trigger opens with Enter / Space / ArrowDown; search owns focus with
 * `aria-activedescendant`; arrows move the highlight (2D in the grid); Enter
 * selects; Escape closes.
 *
 * @csspart root - Filled control chrome (trigger + clear + chevron)
 * @csspart trigger - Opens the panel (preview + label)
 * @csspart clear-button - Clear selection button (inside the control)
 * @csspart panel - Popup panel shell
 * @csspart panel-search - Search field container
 * @csspart panel-input - Search input
 * @csspart panel-body - Scrollable results region
 * @csspart loading - Catalog-loading status region (spinner)
 * @csspart option - Grid cell button
 *
 * @dependency pk-popup - Positioned panel host.
 * @dependency pk-spinner - Shown in the panel while `loading` is set.
 * @dependency pk-tooltip - Hover label when `label-mode="tooltip"`.
 */
export declare class PkImageBrowser extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    size: PkImageBrowserSize;
    /** `icon` = compact glyph tiles; `image` = larger photo tiles. */
    mode: PkImageBrowserMode;
    width: PkImageBrowserWidth;
    /**
     * How option names appear in the grid: `tooltip` (default), `inline` under
     * each cell, or `none` (`aria-label` only).
     */
    labelMode: PkImageBrowserLabelMode;
    invalid: boolean;
    readonly: boolean;
    value: string;
    defaultValue: string;
    placeholder: string;
    searchPlaceholder: string;
    emptyMessage: string;
    ariaLabel: string | null;
    /**
     * Host-driven catalog warm / refresh. Shows a centered `pk-spinner` in the
     * panel (no loading copy). Prefer this over inferring from empty `items` /
     * `groups` — empty can also mean a filter miss or a genuinely empty catalog.
     */
    loading: boolean;
    /** Show a clear control when a value is selected. */
    withClear: boolean;
    items: PkImageBrowserItem[];
    groups: PkImageBrowserGroup[];
    /**
     * Closed-trigger label when `value` is set but not yet found in `items` /
     * `groups` (e.g. catalog still loading).
     */
    selectedLabel: string;
    /** Closed-trigger preview for the same pre-catalog case as `selected-label`. */
    selectedPreview: string;
    placement: PkPopupPlacement;
    sideOffset: number;
    /** Items drawn per group before scroll reveals the next page. */
    pageSize: number;
    open: boolean;
    private query;
    /** Render budget shared across groups — raised by scrolling, reset on query/open. */
    private limit;
    private closing;
    private panelAnimated;
    /** Flat index into `flatVisibleItems()` for aria-activedescendant navigation. */
    private highlightedIndex;
    /** Shared hover tooltip target when `labelMode="tooltip"`. */
    private tooltipFor;
    private tooltipContent;
    input: HTMLInputElement;
    private triggerElement;
    private controlElement;
    private popupElement;
    private panelElement;
    private searchInput;
    private panelBody;
    private optionTooltip;
    private readonly listboxId;
    private readonly searchId;
    private closeTimer;
    private tooltipOpenTimer;
    private liveRegion;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    updated(changed: PropertyValues): void;
    protected get validationTarget(): HTMLElement;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    show(): Promise<void>;
    hide(source?: PkOverlaySource): Promise<void>;
    private optionId;
    private groupHeadingId;
    private normalizedPageSize;
    private resolveGroups;
    private findItem;
    private selectedItem;
    private triggerDisplay;
    /** Groups matching the query, each truncated to the current render budget. */
    private visibleGroups;
    private flatVisibleItems;
    private isTruncated;
    private activeDescendantId;
    private triggerAccessibleName;
    private announceResults;
    private resetHighlightForOpenCatalog;
    private setHighlightedIndex;
    private scrollHighlightedIntoView;
    /** Column count of the CSS grid that owns the highlighted option (for 2D arrows). */
    private columnCountNear;
    private moveHighlight;
    private emitChange;
    private selectValue;
    private handleClear;
    private togglePanel;
    private handleTriggerKeyDown;
    private openPanel;
    private closePanel;
    private clearCloseTimer;
    private syncPanelPlacement;
    private attachDismissListeners;
    private teardownDismissListeners;
    private onDocumentPointerDown;
    private onDocumentKeyDown;
    private handleSearchInput;
    private handleSearchKeyDown;
    private handleResultsScroll;
    private focusSearchWhenReady;
    private renderPreview;
    private usesInlineLabels;
    private usesTooltipLabels;
    /** Hover caption via one shared tooltip — avoids N×pk-tooltip in large catalogs. */
    private showOptionTooltip;
    private clearOptionTooltip;
    private clearTooltipOpenTimer;
    private handleOptionPointerEnter;
    private handleOptionPointerLeave;
    private resetHighlightToSelected;
    private renderTriggerContents;
    private renderResults;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-image-browser': PkImageBrowser;
    }
}
//# sourceMappingURL=pk-image-browser.d.ts.map