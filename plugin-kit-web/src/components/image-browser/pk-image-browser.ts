import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property, query, state } from '../../decorators.js';
import type { PropertyValues } from 'lit';

import { chevronDown, xmark, renderIconHtml } from '../../icons/index.js';
import { LiveRegion, uniqueId } from '../../a11y/focus.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { scrollIntoView } from '../../a11y/scroll-lock.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkClearEvent } from '../../events/pk-clear.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import {
    syncPopupPlacementAnimation,
    waitForPopupReposition,
} from '../../utils/popup-placement-animation.js';
// Keep the internal element registered when production builds erase type-only imports.
import '../popup/pk-popup.js';
import type { PkPopup, PkPopupPlacement } from '../popup/pk-popup.js';
import '../spinner/pk-spinner.js';
import '../tooltip/pk-tooltip.js';
import type { PkTooltip } from '../tooltip/pk-tooltip.js';
import { pkImageBrowserStyles } from './pk-image-browser.styles.js';

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

const CHEVRON_ICON = renderIconHtml(chevronDown);
const XMARK_ICON = renderIconHtml(xmark);

/** How many matched items per group are painted before scroll reveals more. */
const DEFAULT_PAGE_SIZE = 96;

function isInlineSvg(preview: string): boolean {
    return /^\s*<svg[\s>]/i.test(preview);
}

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
@customElement('pk-image-browser')
export class PkImageBrowser extends PkFormAssociatedElement {
    static override styles = pkImageBrowserStyles;

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator()];
    }

    override assumeInteractionOn = ['pk-change'];

    @property({ reflect: true })
    size: PkImageBrowserSize = 'default';

    /** `icon` = compact glyph tiles; `image` = larger photo tiles. */
    @property({ reflect: true })
    mode: PkImageBrowserMode = 'icon';

    @property({ reflect: true })
    width: PkImageBrowserWidth = 'auto';

    /**
     * How option names appear in the grid: `tooltip` (default), `inline` under
     * each cell, or `none` (`aria-label` only).
     */
    @property({ reflect: true, attribute: 'label-mode' })
    labelMode: PkImageBrowserLabelMode = 'tooltip';

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property()
    value = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property()
    placeholder = 'Choose…';

    @property({ attribute: 'search-placeholder' })
    searchPlaceholder = 'Search…';

    @property({ attribute: 'empty-message' })
    emptyMessage = 'No items match your query.';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /**
     * Host-driven catalog warm / refresh. Shows a centered `pk-spinner` in the
     * panel (no loading copy). Prefer this over inferring from empty `items` /
     * `groups` — empty can also mean a filter miss or a genuinely empty catalog.
     */
    @property({ type: Boolean, reflect: true })
    loading = false;

    /** Show a clear control when a value is selected. */
    @property({ type: Boolean, reflect: true, attribute: 'with-clear' })
    withClear = true;

    @property({ attribute: false })
    items: PkImageBrowserItem[] = [];

    @property({ attribute: false })
    groups: PkImageBrowserGroup[] = [];

    /**
     * Closed-trigger label when `value` is set but not yet found in `items` /
     * `groups` (e.g. catalog still loading).
     */
    @property({ attribute: 'selected-label' })
    selectedLabel = '';

    /** Closed-trigger preview for the same pre-catalog case as `selected-label`. */
    @property({ attribute: 'selected-preview' })
    selectedPreview = '';

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    @property({ type: Number, attribute: 'side-offset' })
    sideOffset = 4;

    /** Items drawn per group before scroll reveals the next page. */
    @property({ type: Number, attribute: 'page-size' })
    pageSize = DEFAULT_PAGE_SIZE;

    @property({ type: Boolean, reflect: true })
    open = false;

    @state()
    private query = '';

    /** Render budget shared across groups — raised by scrolling, reset on query/open. */
    @state()
    private limit = DEFAULT_PAGE_SIZE;

    @state()
    private closing = false;

    @state()
    private panelAnimated = false;

    /** Flat index into `flatVisibleItems()` for aria-activedescendant navigation. */
    @state()
    private highlightedIndex = -1;

    /** Shared hover tooltip target when `labelMode="tooltip"`. */
    @state()
    private tooltipFor = '';

    @state()
    private tooltipContent = '';

    @query('.value-input')
    override input!: HTMLInputElement;

    @query('.trigger')
    private triggerElement!: HTMLButtonElement;

    @query('.control')
    private controlElement!: HTMLDivElement;

    @query('pk-popup')
    private popupElement!: PkPopup;

    @query('.panel')
    private panelElement!: HTMLDivElement;

    @query('.panel-input')
    private searchInput!: HTMLInputElement | null;

    @query('.panel-body')
    private panelBody!: HTMLDivElement | null;

    @query('.option-tooltip')
    private optionTooltip!: PkTooltip | null;

    private readonly listboxId = uniqueId('pk-image-browser-listbox');
    private readonly searchId = uniqueId('pk-image-browser-search');
    private closeTimer: number | null = null;
    private tooltipOpenTimer: number | null = null;
    private liveRegion: LiveRegion | null = null;

    override connectedCallback(): void {
        super.connectedCallback();
        this.limit = this.normalizedPageSize();
    }

    override disconnectedCallback(): void {
        this.teardownDismissListeners();
        this.clearCloseTimer();
        this.clearTooltipOpenTimer();
        this.liveRegion?.destroy();
        this.liveRegion = null;
        super.disconnectedCallback();
    }

    protected override willUpdate(changed: PropertyValues): void {
        if (changed.has('pageSize') && !this.open) {
            this.limit = this.normalizedPageSize();
        }

        super.willUpdate(changed);
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (changed.has('open')) {
            if (this.open) {
                this.attachDismissListeners();
            } else if (!this.closing) {
                this.teardownDismissListeners();
            }
        }

        if ((changed.has('open') || changed.has('closing')) && (this.open || this.closing)) {
            void this.syncPanelPlacement();
        }

        if (this.open && (changed.has('highlightedIndex') || changed.has('query') || changed.has('limit'))) {
            this.scrollHighlightedIntoView();
        }

        // Catalog arrived while the panel is open — seat highlight on selection / first cell.
        if (this.open && changed.has('loading') && !this.loading) {
            this.resetHighlightForOpenCatalog();
        }
    }

    protected override get validationTarget(): HTMLElement {
        return this.triggerElement ?? this;
    }

    protected override syncFormValue(): void {
        this.setFormValue(this.value, this.value);
    }

    protected override resetToDefaultValue(): void {
        this.value = this.defaultValue;
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
        }
    }

    async show(): Promise<void> {
        if (this.open || this.closing || this.disabled || this.readonly) {
            return;
        }

        await this.openPanel();
    }

    async hide(source: PkOverlaySource = 'api'): Promise<void> {
        if (!this.open || this.closing) {
            return;
        }

        await this.closePanel(source);
    }

    private optionId(index: number): string {
        return `${this.listboxId}-opt-${index}`;
    }

    private groupHeadingId(groupIndex: number): string {
        return `${this.listboxId}-group-${groupIndex}`;
    }

    private normalizedPageSize(): number {
        return this.pageSize > 0 ? this.pageSize : DEFAULT_PAGE_SIZE;
    }

    private resolveGroups(): PkImageBrowserGroup[] {
        if (this.groups.length > 0) {
            return this.groups;
        }

        if (this.items.length > 0) {
            return [{ name: '', items: this.items }];
        }

        return [];
    }

    private findItem(value: string): PkImageBrowserItem | null {
        if (value === '') {
            return null;
        }

        for (const group of this.resolveGroups()) {
            const found = group.items.find((item) => item.value === value);
            if (found) {
                return found;
            }
        }

        return null;
    }

    private selectedItem(): PkImageBrowserItem | null {
        return this.findItem(this.value);
    }

    private triggerDisplay(): { label: string; preview?: string; isPlaceholder: boolean } {
        const selected = this.selectedItem();
        if (selected) {
            return {
                label: selected.label,
                preview: selected.preview,
                isPlaceholder: false,
            };
        }

        if (this.value !== '') {
            return {
                label: this.selectedLabel || this.value,
                preview: this.selectedPreview || undefined,
                isPlaceholder: false,
            };
        }

        return {
            label: this.placeholder,
            isPlaceholder: true,
        };
    }

    /** Groups matching the query, each truncated to the current render budget. */
    private visibleGroups(): Array<PkImageBrowserGroup & { total: number }> {
        const query = this.query.trim().toLowerCase();

        return this.resolveGroups().reduce<Array<PkImageBrowserGroup & { total: number }>>((acc, group) => {
            const matched = query === ''
                ? group.items
                : group.items.filter((item) => (
                    item.label.toLowerCase().includes(query)
                    || item.value.toLowerCase().includes(query)
                ));

            if (matched.length === 0) {
                return acc;
            }

            acc.push({
                name: group.name,
                total: matched.length,
                items: matched.slice(0, this.limit),
            });
            return acc;
        }, []);
    }

    private flatVisibleItems(): PkImageBrowserItem[] {
        return this.visibleGroups().flatMap((group) => group.items);
    }

    private isTruncated(): boolean {
        return this.visibleGroups().some((group) => group.items.length < group.total);
    }

    private activeDescendantId(): string | null {
        if (!this.open || this.highlightedIndex < 0) {
            return null;
        }

        return this.optionId(this.highlightedIndex);
    }

    private triggerAccessibleName(): string {
        if (this.ariaLabel) {
            const display = this.triggerDisplay();
            if (display.isPlaceholder) {
                return this.ariaLabel;
            }
            return `${this.ariaLabel}, ${display.label}`;
        }

        return this.triggerDisplay().label;
    }

    private announceResults(): void {
        // Skip while the host is still warming — empty would read as "no matches".
        if (this.loading) {
            return;
        }

        const items = this.flatVisibleItems();
        const filter = this.query.trim();

        if (!filter) {
            return;
        }

        if (!this.liveRegion) {
            this.liveRegion = new LiveRegion('polite');
        }

        this.liveRegion.announce(
            items.length === 0
                ? this.emptyMessage
                : `${items.length} ${items.length === 1 ? 'result' : 'results'} available`,
        );
    }

    private resetHighlightForOpenCatalog(): void {
        const items = this.flatVisibleItems();
        if (items.length === 0) {
            this.highlightedIndex = -1;
            return;
        }

        const selectedIdx = items.findIndex((item) => item.value === this.value);
        this.highlightedIndex = selectedIdx >= 0 ? selectedIdx : 0;
    }

    private setHighlightedIndex(index: number): void {
        const items = this.flatVisibleItems();
        if (items.length === 0) {
            this.highlightedIndex = -1;
            return;
        }

        const next = Math.max(0, Math.min(index, items.length - 1));
        this.highlightedIndex = next;

        // Navigating near the end of a truncated catalog should reveal more, same as scroll.
        if (next >= items.length - 4 && this.isTruncated()) {
            this.limit += this.normalizedPageSize();
        }
    }

    private scrollHighlightedIntoView(): void {
        if (this.highlightedIndex < 0 || !this.panelBody) {
            return;
        }

        const option = this.renderRoot.querySelector<HTMLElement>(
            `#${CSS.escape(this.optionId(this.highlightedIndex))}`,
        );
        if (!option) {
            return;
        }

        scrollIntoView(option, this.panelBody, 'vertical', 'auto');
    }

    /** Column count of the CSS grid that owns the highlighted option (for 2D arrows). */
    private columnCountNear(index: number): number {
        const option = this.renderRoot.querySelector<HTMLElement>(
            `#${CSS.escape(this.optionId(index))}`,
        );
        const grid = option?.closest('.grid');
        if (!grid) {
            return 1;
        }

        const options = [...grid.querySelectorAll<HTMLElement>('.option')];
        if (options.length === 0) {
            return 1;
        }

        const firstTop = options[0]!.offsetTop;
        let cols = 0;
        for (const candidate of options) {
            if (candidate.offsetTop !== firstTop) {
                break;
            }
            cols += 1;
        }

        return Math.max(1, cols);
    }

    private moveHighlight(key: string): void {
        const items = this.flatVisibleItems();
        if (items.length === 0) {
            this.highlightedIndex = -1;
            return;
        }

        let next = this.highlightedIndex;

        if (next < 0) {
            next = (key === 'ArrowUp' || key === 'ArrowLeft' || key === 'End')
                ? items.length - 1
                : 0;
            this.setHighlightedIndex(next);
            return;
        }

        const cols = this.columnCountNear(next);

        switch (key) {
            case 'ArrowRight':
                next = Math.min(next + 1, items.length - 1);
                break;
            case 'ArrowLeft':
                next = Math.max(next - 1, 0);
                break;
            case 'ArrowDown':
                next = Math.min(next + cols, items.length - 1);
                break;
            case 'ArrowUp':
                next = Math.max(next - cols, 0);
                break;
            case 'Home':
                next = 0;
                break;
            case 'End':
                next = items.length - 1;
                break;
            default:
                return;
        }

        this.setHighlightedIndex(next);
    }

    private emitChange(next: string): void {
        this.value = next;
        this.syncFormValue();
        this.updateValidity();

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: next },
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private selectValue(next: string): void {
        if (this.disabled || this.readonly) {
            return;
        }

        const previous = this.value;
        void this.closePanel('api');
        this.query = '';
        this.limit = this.normalizedPageSize();
        this.highlightedIndex = -1;

        // Re-clicking the active option clears it (same as the trigger clear control).
        if (previous === next) {
            if (this.withClear && previous !== '') {
                this.emitChange('');
                this.dispatchEvent(new PkClearEvent());
            }
            return;
        }

        this.emitChange(next);
    }

    private handleClear = (event: Event): void => {
        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || this.readonly || this.value === '') {
            return;
        }

        this.emitChange('');
        this.dispatchEvent(new PkClearEvent());
        this.triggerElement?.focus({ preventScroll: true });
    };

    private togglePanel = (event?: Event): void => {
        event?.preventDefault();
        event?.stopPropagation();

        if (this.disabled || this.readonly) {
            return;
        }

        if (this.open || this.closing) {
            void this.closePanel('api');
        } else {
            void this.openPanel();
        }
    };

    private handleTriggerKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled || this.readonly) {
            return;
        }

        if (
            event.key === 'ArrowDown'
            || event.key === 'ArrowUp'
            || event.key === 'Enter'
            || event.key === ' '
        ) {
            event.preventDefault();
            if (!this.open && !this.closing) {
                void this.openPanel();
            }
        }
    };

    private async openPanel(): Promise<void> {
        if (this.open || this.closing || this.disabled || this.readonly) {
            return;
        }

        this.dispatchEvent(new PkShowEvent());
        this.closing = false;
        this.panelAnimated = false;
        this.query = '';
        this.limit = this.normalizedPageSize();
        this.open = true;
        this.resetHighlightForOpenCatalog();

        await this.updateComplete;
        await this.syncPanelPlacement();
        this.panelAnimated = true;
        this.dispatchEvent(new PkAfterShowEvent());
        await this.focusSearchWhenReady();
        this.scrollHighlightedIntoView();
    }

    private async closePanel(source: PkOverlaySource): Promise<void> {
        if (!this.open || this.closing) {
            return;
        }

        const hideEvent = new PkHideEvent(source);
        this.dispatchEvent(hideEvent);
        if (hideEvent.defaultPrevented) {
            return;
        }

        this.closing = true;
        this.open = false;
        this.highlightedIndex = -1;
        this.clearOptionTooltip();
        this.teardownDismissListeners();
        this.triggerElement?.focus({ preventScroll: true });

        this.clearCloseTimer();
        this.closeTimer = window.setTimeout(() => {
            this.closing = false;
            this.panelAnimated = false;
            this.query = '';
            this.limit = this.normalizedPageSize();
            this.closeTimer = null;
            this.dispatchEvent(new PkAfterHideEvent());
        }, 100);
    }

    private clearCloseTimer(): void {
        if (this.closeTimer != null) {
            window.clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    private async syncPanelPlacement(): Promise<void> {
        if (!this.popupElement || !this.panelElement) {
            return;
        }

        syncPopupPlacementAnimation(this.panelElement, this.placement);
        const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, {
            requireEvent: true,
        });
        syncPopupPlacementAnimation(this.panelElement, placement);
    }

    private attachDismissListeners(): void {
        registerDismissible(this);
        document.addEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.addEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private teardownDismissListeners(): void {
        unregisterDismissible(this);
        document.removeEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.removeEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private onDocumentPointerDown = (event: PointerEvent): void => {
        if (!this.open || this.closing || !isTopDismissible(this)) {
            return;
        }

        if (isPointerInsideOverlay(event, {
            host: this,
            anchor: this.controlElement ?? this.triggerElement,
            panel: this.panelElement,
        })) {
            return;
        }

        void this.closePanel('pointer-dismiss');
    };

    private onDocumentKeyDown = (event: KeyboardEvent): void => {
        if (!this.open || this.closing || !isTopDismissible(this)) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            void this.closePanel('escape');
        }
    };

    private handleSearchInput = (event: Event): void => {
        if (this.loading) {
            return;
        }

        this.query = (event.target as HTMLInputElement).value;
        // New query = new set; don't keep a tall scroll budget from the previous browse.
        this.limit = this.normalizedPageSize();
        this.resetHighlightForOpenCatalog();
        this.announceResults();
    };

    private handleSearchKeyDown = (event: KeyboardEvent): void => {
        if (!this.open || this.closing || this.loading) {
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Home':
            case 'End':
                event.preventDefault();
                event.stopPropagation();
                this.moveHighlight(event.key);
                return;
            case 'Enter': {
                event.preventDefault();
                event.stopPropagation();
                const items = this.flatVisibleItems();
                const item = items[this.highlightedIndex];
                if (item) {
                    this.selectValue(item.value);
                }
                return;
            }
            default:
                break;
        }
    };

    private handleResultsScroll = (): void => {
        // Tip can trail a scrolled-away cell; drop it and let hover re-open.
        this.clearOptionTooltip();

        const results = this.panelBody;
        if (!results || !this.isTruncated()) {
            return;
        }

        if (results.scrollTop + results.clientHeight < results.scrollHeight - 200) {
            return;
        }

        const anchor = results.scrollTop;
        this.limit += this.normalizedPageSize();
        void this.updateComplete.then(() => {
            if (this.panelBody) {
                this.panelBody.scrollTop = anchor;
            }
        });
    };

    private async focusSearchWhenReady(): Promise<void> {
        const started = performance.now();
        while (this.open && performance.now() - started < 2000) {
            const input = this.searchInput;
            if (input && getComputedStyle(input).visibility !== 'hidden') {
                input.focus({ preventScroll: true });
                if (document.activeElement === input) {
                    return;
                }
            }
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }
    }

    private renderPreview(preview: string | undefined, className: string) {
        if (!preview) {
            return nothing;
        }

        if (isInlineSvg(preview)) {
            return html`<span class=${className} aria-hidden="true">${unsafeSVG(preview)}</span>`;
        }

        return html`<img class=${className} src=${preview} alt="" />`;
    }

    private usesInlineLabels(): boolean {
        return this.labelMode === 'inline';
    }

    private usesTooltipLabels(): boolean {
        return this.labelMode === 'tooltip';
    }

    /** Hover caption via one shared tooltip — avoids N×pk-tooltip in large catalogs. */
    private showOptionTooltip(optionId: string, label: string): void {
        if (!this.usesTooltipLabels()) {
            return;
        }

        // Already tracking a cell → re-anchor immediately; first hover waits so scans don’t flash.
        const alreadyTracking = this.tooltipFor !== '';
        this.tooltipFor = optionId;
        this.tooltipContent = label;
        this.clearTooltipOpenTimer();

        const openNow = (): void => {
            this.tooltipOpenTimer = null;
            void this.updateComplete.then(() => {
                void this.optionTooltip?.show();
            });
        };

        if (alreadyTracking) {
            openNow();
            return;
        }

        this.tooltipOpenTimer = window.setTimeout(openNow, 280);
    }

    private clearOptionTooltip(): void {
        this.clearTooltipOpenTimer();
        this.tooltipFor = '';
        this.tooltipContent = '';
        void this.optionTooltip?.hide();
    }

    private clearTooltipOpenTimer(): void {
        if (this.tooltipOpenTimer != null) {
            window.clearTimeout(this.tooltipOpenTimer);
            this.tooltipOpenTimer = null;
        }
    }

    private handleOptionPointerEnter(index: number, label: string): void {
        this.highlightedIndex = index;
        this.showOptionTooltip(this.optionId(index), label);
    }

    private handleOptionPointerLeave = (event: MouseEvent): void => {
        const next = event.relatedTarget;
        const movingToNeighbor = next instanceof Node
            && this.panelBody?.contains(next)
            && Boolean(
                next instanceof Element
                    ? next.closest('.option')
                    : next.parentElement?.closest('.option'),
            );

        if (movingToNeighbor) {
            return;
        }

        // Leave the grid — drop sticky hover chrome back onto the selected cell (or none).
        this.resetHighlightToSelected();
        this.clearOptionTooltip();
    };

    private resetHighlightToSelected(): void {
        const items = this.flatVisibleItems();
        if (items.length === 0) {
            this.highlightedIndex = -1;
            return;
        }

        const selectedIdx = items.findIndex((item) => item.value === this.value);
        this.highlightedIndex = selectedIdx;
    }

    private renderTriggerContents() {
        const display = this.triggerDisplay();

        return html`
            <span class="trigger-main">
                ${this.renderPreview(display.preview, 'trigger-preview')}
                <span
                    class=${classMap({
                        'trigger-label': true,
                        'is-placeholder': display.isPlaceholder,
                    })}
                    aria-hidden="true"
                >${display.label}</span>
            </span>
        `;
    }

    private renderResults() {
        if (this.loading) {
            return html`
                <div
                    id=${this.listboxId}
                    role="listbox"
                    aria-label=${this.ariaLabel || 'Options'}
                    aria-busy="true"
                >
                    <div part="loading" class="loading" role="status" aria-label="Loading">
                        <pk-spinner size="sm" centered></pk-spinner>
                    </div>
                </div>
            `;
        }

        const groups = this.visibleGroups();

        if (groups.length === 0) {
            return html`
                <div
                    id=${this.listboxId}
                    role="listbox"
                    aria-label=${this.ariaLabel || 'Options'}
                >
                    <p class="notice" part="empty" role="status">${this.emptyMessage}</p>
                </div>
            `;
        }

        let flatIndex = 0;

        return html`
            <div
                id=${this.listboxId}
                role="listbox"
                aria-label=${this.ariaLabel || 'Options'}
            >
                ${groups.map((group, groupIndex) => {
                    const headingId = this.groupHeadingId(groupIndex);
                    const groupStart = flatIndex;

                    const options = group.items.map((item, itemIndex) => {
                        const index = groupStart + itemIndex;
                        flatIndex = index + 1;
                        const selected = item.value === this.value;
                        const highlighted = index === this.highlightedIndex;

                        return html`
                            <button
                                type="button"
                                part="option"
                                id=${this.optionId(index)}
                                class=${classMap({
                                    option: true,
                                    'is-highlighted': highlighted,
                                    'is-selected': selected,
                                })}
                                role="option"
                                tabindex="-1"
                                aria-label=${item.label}
                                aria-selected=${selected ? 'true' : 'false'}
                                @click=${() => this.selectValue(item.value)}
                                @mouseenter=${() => this.handleOptionPointerEnter(index, item.label)}
                                @mouseleave=${this.handleOptionPointerLeave}
                            >
                                ${this.renderPreview(item.preview, 'option-preview')}
                                ${this.usesInlineLabels()
                                    ? html`<span class="option-label" aria-hidden="true">${item.label}</span>`
                                    : nothing}
                            </button>
                        `;
                    });

                    return html`
                        <div
                            class="group"
                            role=${group.name ? 'group' : nothing}
                            aria-labelledby=${group.name ? headingId : nothing}
                        >
                            ${group.name
                                ? html`
                                    <h6 class="group-heading" id=${headingId}>
                                        <span>${group.name}</span>
                                        ${group.items.length < group.total
                                            ? html`
                                                <span class="group-heading-count">
                                                    Showing ${group.items.length} of ${group.total}
                                                </span>
                                            `
                                            : nothing}
                                    </h6>
                                `
                                : nothing}
                            <div class="grid">
                                ${options}
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }

    override render() {
        const showClear = this.withClear && this.value !== '' && !this.disabled && !this.readonly;
        const panelActive = this.open || this.closing;
        const activeDescendant = this.activeDescendantId();

        return html`
            <input
                class="value-input"
                part="value-input"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.value}
                ?required=${this.required}
                @input=${() => this.updateValidity()}
            />
            <div
                part="root"
                class=${classMap({
                    control: true,
                    'is-disabled': this.disabled || this.readonly,
                    'is-open': this.open,
                })}
            >
                <button
                    type="button"
                    part="trigger"
                    class="trigger"
                    ?disabled=${this.disabled || this.readonly}
                    aria-label=${this.triggerAccessibleName()}
                    aria-haspopup="listbox"
                    aria-expanded=${this.open ? 'true' : 'false'}
                    aria-controls=${this.listboxId}
                    @click=${this.togglePanel}
                    @keydown=${this.handleTriggerKeyDown}
                >
                    ${this.renderTriggerContents()}
                </button>
                ${showClear
                    ? html`
                        <button
                            type="button"
                            part="clear-button"
                            class="clear-button"
                            aria-label="Clear selection"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${unsafeSVG(XMARK_ICON)}</span>
                        </button>
                    `
                    : nothing}
                <button
                    type="button"
                    class="expand-button"
                    tabindex="-1"
                    aria-hidden="true"
                    ?disabled=${this.disabled || this.readonly}
                    @click=${this.togglePanel}
                >
                    <span class="expand-button-icon">${unsafeSVG(CHEVRON_ICON)}</span>
                </button>
            </div>
            <pk-popup
                .active=${panelActive}
                .anchor=${this.controlElement ?? this.triggerElement ?? ''}
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
                    tabindex="-1"
                    ?hidden=${!panelActive}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                >
                    <div part="panel-search" class="panel-search">
                        <input
                            part="panel-input"
                            class="panel-input"
                            id=${this.searchId}
                            type="text"
                            role="combobox"
                            .value=${this.query}
                            placeholder=${this.searchPlaceholder}
                            aria-label=${this.searchPlaceholder}
                            aria-autocomplete="list"
                            aria-expanded=${this.open ? 'true' : 'false'}
                            aria-controls=${this.listboxId}
                            aria-activedescendant=${activeDescendant ?? nothing}
                            ?disabled=${this.loading}
                            @input=${this.handleSearchInput}
                            @keydown=${this.handleSearchKeyDown}
                        />
                    </div>
                    <div
                        part="panel-body"
                        class="panel-body"
                        @scroll=${this.handleResultsScroll}
                    >
                        ${this.renderResults()}
                    </div>
                    ${this.usesTooltipLabels() && panelActive
                        ? html`
                            <pk-tooltip
                                class="option-tooltip"
                                for=${this.tooltipFor}
                                content=${this.tooltipContent}
                                placement="top"
                                trigger="manual"
                            ></pk-tooltip>
                        `
                        : nothing}
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-image-browser': PkImageBrowser;
    }
}
