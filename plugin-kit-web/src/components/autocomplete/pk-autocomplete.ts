import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from '../../decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';

import { xmark, renderIconHtml } from '../../icons/index.js';
import { LiveRegion, uniqueId } from '../../a11y/focus.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { scrollIntoView } from '../../a11y/scroll-lock.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { PkClearEvent } from '../../events/pk-clear.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import type { PkValidator } from '../../validators/types.js';
import { MirrorValidator } from '../../validators/mirror-validator.js';
// Keep the internal element registered when production builds erase type-only imports.
import '../popup/pk-popup.js';
import type { PkPopup, PkPopupPlacement } from '../popup/pk-popup.js';
import {
    handleListboxKeyDown,
    isListboxTypeToSelectKey,
    LISTBOX_NAVIGATION_KEYS,
} from '../../utils/listbox-keyboard.js';
import {
    syncPopupPlacementAnimation,
    waitForPopupReposition,
} from '../../utils/popup-placement-animation.js';
import { waitForPopupContentExitAnimation } from '../../utils/popup-content-exit.js';
import { isEventInsideOverlay, isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import { syncFilteredOptions } from '../../internal/sync-filtered-options.js';
import {
    AsyncOptionFetcher,
    type PkAsyncOptionFetchHandler,
    type PkAsyncOptionItem,
} from '../../utils/async-option-fetch.js';
import { matchesOptionFilter, type PkOptionFilter } from '../../utils/option-filter.js';
import type { PkOption } from '../select/pk-option.js';
import type { PkOptionGroup } from '../select/pk-option-group.js';
// Freeform field chrome matches pk-input — not Combobox’s select fill / chevron.
import { pkAutocompleteStyles } from './pk-autocomplete.styles.js';

export type PkAutocompleteSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

export type PkAutocompleteFilter = PkOptionFilter;

export type PkAutocompleteAsyncOption = PkAsyncOptionItem;

export type PkAutocompleteFetchHandler = PkAsyncOptionFetchHandler;

const XMARK_ICON = renderIconHtml(xmark);

/**
 * Autocomplete — freeform text field with optional list suggestions.
 *
 * Unlike Combobox, the committed `value` *is* the input text. Choosing a
 * suggestion inserts that option’s value into the field; typing always wins.
 *
 * @slot start - Presentational decoration before the input (e.g. icons)
 * @slot end - Presentational decoration before the clear control
 * @slot - `pk-option` and `pk-option-group` items
 *
 * @csspart control - Input control wrapper
 * @csspart start - Host start decoration container
 * @csspart end - Host end decoration container
 * @csspart input - Autocomplete text input
 * @csspart clear-button - Clear value button
 * @csspart panel-body - Scrollable listbox region inside the popup panel
 * @csspart empty - Empty-state message
 * @csspart async-status - Async search status message
 *
 * @dependency pk-popup - Positioned suggestion panel host.
 */
@customElement('pk-autocomplete')
export class PkAutocomplete extends PkFormAssociatedElement {
    static override styles = pkAutocompleteStyles;

    static override get validators(): PkValidator[] {
        return [
            ...super.validators,
            MirrorValidator(),
            {
                observedAttributes: ['required'],
                checkValidity: (element) => {
                    const field = element as unknown as PkAutocomplete;
                    const result = {
                        message: 'Please fill out this field.',
                        isValid: true,
                        invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
                    };

                    if (!field.required || field.value.trim()) {
                        return result;
                    }

                    result.isValid = false;
                    result.invalidKeys.push('valueMissing');
                    return result;
                },
            },
        ];
    }

    override assumeInteractionOn = ['blur', 'input'];

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    /** Gap between the control and listbox panel in px (default: 6). */
    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 6;

    @property({ type: Boolean, reflect: true })
    clearable = false;

    @property({ attribute: 'with-clear', type: Boolean })
    withClear = false;

    /** When true, the first matching option is highlighted on open or when filtering. */
    @property({ attribute: 'auto-highlight', type: Boolean })
    autoHighlight = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    size: PkAutocompleteSize = 'default';

    /** When `full`, the control stretches to the host width. */
    @property({ reflect: true })
    width?: 'full';

    /** Empty by default — consumers opt in when a prompt is useful. */
    @property()
    placeholder = '';

    @property({ attribute: 'empty-message' })
    emptyMessage = 'No options found.';

    /** Freeform field value — always mirrors the visible input text. */
    @property()
    value = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Default: `true` (same as Combobox).
     */
    @property({ attribute: 'loop-focus', type: Boolean })
    loopFocus = true;

    /** Custom filter — `(option, query) => boolean`. Defaults to label/value substring match. */
    @property({ attribute: false })
    filter: PkAutocompleteFilter | null = null;

    /**
     * When true, options are loaded via `fetchOptions` as the user types instead of
     * filtering static `pk-option` children.
     */
    @property({ type: Boolean, reflect: true })
    async = false;

    /** Message shown while async results are loading. */
    @property({ attribute: 'loading-message' })
    loadingMessage = 'Searching…';

    /** Message shown before the user types in async mode. */
    @property({ attribute: 'start-typing-message' })
    startTypingMessage = 'Start typing to search…';

    /** Remote search handler — `(query, signal) => Promise<options>`. */
    @property({ attribute: false })
    fetchOptions: PkAutocompleteFetchHandler | null = null;

    private readonly hasSlotController = new HasSlotController(this, 'start', 'end');

    private readonly listboxId = uniqueId('pk-autocomplete-listbox');
    private readonly inputId = uniqueId('pk-autocomplete-input');

    @query('pk-popup')
    private popupElement!: PkPopup;

    @query('.control')
    private controlElement!: HTMLElement;

    @query('.control-input')
    private controlInput?: HTMLInputElement;

    @query('.value-input')
    override input!: HTMLInputElement;

    private get panelElement(): HTMLDivElement | null {
        return this.popupElement?.getContentElement() as HTMLDivElement | null ?? null;
    }

    private get panelBodyElement(): HTMLDivElement | undefined {
        return this.panelElement?.querySelector('.panel-body') as HTMLDivElement | undefined;
    }

    private get listScrollContainer(): HTMLElement {
        return this.panelBodyElement ?? this.panelElement ?? this;
    }

    private options: PkOption[] = [];

    @state()
    private highlightedIndex = -1;

    @state()
    private closing = false;

    @state()
    private panelAnimated = false;

    private dismissRegistered = false;
    private panelEventTarget: HTMLElement | null = null;
    private optionsObserver?: MutationObserver;
    private liveRegion?: LiveRegion;
    private asyncFetcher: AsyncOptionFetcher | null = null;

    @state()
    private asyncLoading = false;

    @state()
    private asyncError: string | null = null;

    override connectedCallback(): void {
        this.instructions = this.getAttribute('hint') ?? this.instructions;
        this.refreshOptions();
        super.connectedCallback();
        this.syncHasValueAttribute();
        this.addEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
        this.optionsObserver = new MutationObserver(() => {
            this.handleOptionsMutation({ render: true });
        });
        this.optionsObserver.observe(this, { childList: true, subtree: true });
    }

    override disconnectedCallback(): void {
        this.unbindPanelEvents();
        this.removeEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
        this.optionsObserver?.disconnect();
        this.liveRegion?.destroy();
        this.liveRegion = undefined;
        this.asyncFetcher?.cancel();
        void this.closePanel('api');
        super.disconnectedCallback();
    }

    override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);

        if (!this.value && this.defaultValue) {
            this.value = this.defaultValue;
        }

        this.applyOptionState();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value')) {
            this.syncHasValueAttribute();
            this.applyOptionState();
        }

        super.updated(changed);
    }

    protected override get validationTarget(): HTMLElement | undefined {
        return this.controlInput ?? this.controlElement;
    }

    protected override getAriaMirrorTarget(): HTMLElement | null {
        return this.controlInput ?? this.controlElement ?? null;
    }

    protected override syncFormValue(): void {
        if (!this.name) {
            this.setFormValue(null);
            return;
        }

        this.setFormValue(this.value);
    }

    private syncHasValueAttribute(): void {
        this.toggleAttribute('data-has-value', Boolean(this.value));
    }

    private refreshOptions(): void {
        this.options = [...this.querySelectorAll('pk-option')] as PkOption[];
    }

    private handleOptionsMutation(options: { render?: boolean } = {}): void {
        this.refreshOptions();
        this.applyOptionState();

        if (options.render) {
            this.requestUpdate();
        }
    }

    private bindPanelEvents(): void {
        const panel = this.panelElement;

        if (!panel || this.panelEventTarget === panel) {
            return;
        }

        this.unbindPanelEvents();
        this.panelEventTarget = panel;
        panel.addEventListener('pk-option-select', this.handleOptionSelect as EventListener);
        panel.addEventListener('pk-option-highlight', this.handleOptionHighlight as EventListener);
        panel.addEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
    }

    private unbindPanelEvents(): void {
        if (!this.panelEventTarget) {
            return;
        }

        this.panelEventTarget.removeEventListener('pk-option-select', this.handleOptionSelect as EventListener);
        this.panelEventTarget.removeEventListener('pk-option-highlight', this.handleOptionHighlight as EventListener);
        this.panelEventTarget.removeEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
        this.panelEventTarget = null;
    }

    private isOptionInHiddenGroup(option: PkOption): boolean {
        const group = option.closest('pk-option-group') as PkOptionGroup | null;
        return Boolean(group?.hidden);
    }

    private getFilterQuery(): string {
        if (!this.open) {
            return '';
        }

        return this.value.trim().toLowerCase();
    }

    private get usesAsyncSearch(): boolean {
        return this.async && Boolean(this.fetchOptions);
    }

    private getVisibleOptions(): PkOption[] {
        if (this.usesAsyncSearch) {
            return this.options.filter((option) => !this.isOptionInHiddenGroup(option));
        }

        const filter = this.getFilterQuery();

        return this.options.filter((option) => {
            if (this.isOptionInHiddenGroup(option)) {
                return false;
            }

            if (!filter) {
                return true;
            }

            return matchesOptionFilter(option, filter, this.filter);
        });
    }

    private getEnabledVisibleOptions(): PkOption[] {
        return this.getVisibleOptions().filter((option) => !option.disabled);
    }

    private clearAsyncOptionNodes(): void {
        this.querySelectorAll(':scope > pk-option, :scope > pk-option-group, :scope > pk-separator')
            .forEach((node) => node.remove());
    }

    private renderAsyncOptionNodes(items: PkAutocompleteAsyncOption[]): void {
        this.clearAsyncOptionNodes();

        for (const item of items) {
            const option = document.createElement('pk-option');
            option.value = item.value;
            option.textContent = item.label;
            this.append(option);
        }

        this.handleOptionsMutation({ render: true });
    }

    private scheduleAsyncFetch(query: string): void {
        this.ensureAsyncFetcher().schedule(query);
    }

    private ensureAsyncFetcher(): AsyncOptionFetcher {
        if (!this.asyncFetcher) {
            this.asyncFetcher = new AsyncOptionFetcher(
                () => this.fetchOptions,
                {
                    errorLabel: 'autocomplete options',
                    onLoading: () => {
                        this.asyncLoading = true;
                        this.asyncError = null;
                        // Drop previous results so loading never stacks under a stale list.
                        this.renderAsyncOptionNodes([]);
                    },
                    onResults: (results) => {
                        this.renderAsyncOptionNodes(results);
                    },
                    onError: (message) => {
                        this.asyncError = message;
                    },
                    onSettled: () => {
                        this.asyncLoading = false;
                    },
                    onEmptyQuery: () => {
                        this.asyncLoading = false;
                        this.asyncError = null;
                        this.renderAsyncOptionNodes([]);
                    },
                },
            );
        }

        return this.asyncFetcher;
    }

    private getAsyncStatusMessage(): string | null {
        if (!this.usesAsyncSearch || !this.open) {
            return null;
        }

        if (this.asyncLoading) {
            return this.loadingMessage;
        }

        if (this.asyncError) {
            return this.asyncError;
        }

        const query = this.value.trim();

        if (!query) {
            return this.startTypingMessage;
        }

        if (this.getEnabledVisibleOptions().length === 0) {
            return `No matches for "${query}".`;
        }

        return null;
    }

    private applyOptionState(): void {
        const visible = this.getVisibleOptions();
        const filterQuery = this.open ? this.getFilterQuery() : '';

        // Freeform: never mark options as the “selected” form value — the text is.
        syncFilteredOptions({
            host: this,
            options: this.options,
            visible,
            listboxId: this.listboxId,
            filterQuery,
            isSelected: () => false,
        });

        this.syncValueInput();

        if (this.open) {
            this.syncHighlight();
            this.announceFilterResults();
        }
    }

    private syncValueInput(): void {
        if (!this.input) {
            return;
        }

        this.input.value = this.value;
        this.input.required = this.required;
    }

    private resetHighlightedIndexOnOpen(): void {
        this.highlightedIndex = this.autoHighlight ? 0 : -1;
    }

    private syncHighlight(): void {
        const enabled = this.getEnabledVisibleOptions();

        for (const option of this.options) {
            option.highlighted = false;
            option.focusIndex = -1;
        }

        if (enabled.length === 0 || this.highlightedIndex < 0) {
            return;
        }

        if (this.highlightedIndex >= enabled.length) {
            this.highlightedIndex = enabled.length - 1;
        }

        const highlighted = enabled[this.highlightedIndex];

        if (highlighted) {
            highlighted.highlighted = true;
            // Keep focus on the text field; use aria-activedescendant for the option.
            highlighted.focusIndex = -1;
            scrollIntoView(highlighted, this.listScrollContainer, 'vertical', 'auto');
            this.controlInput?.focus({ preventScroll: true });
        }
    }

    private getActiveDescendantId(): string | null {
        const highlighted = this.getEnabledVisibleOptions()[this.highlightedIndex];
        return highlighted?.optionId || null;
    }

    private announceFilterResults(): void {
        if (!this.liveRegion) {
            this.liveRegion = new LiveRegion('polite');
        }

        const count = this.getEnabledVisibleOptions().length;
        const filter = this.getFilterQuery();

        if (!filter) {
            return;
        }

        this.liveRegion.announce(
            count === 0
                ? `${this.emptyMessage}`
                : `${count} ${count === 1 ? 'result' : 'results'} available`,
        );
    }

    private openPanel(): Promise<void> {
        const anchor = this.controlElement;

        if (!anchor) {
            return Promise.resolve();
        }

        if (this.open) {
            this.controlInput?.focus({ preventScroll: true });
            return Promise.resolve();
        }

        if (this.closing) {
            return Promise.resolve();
        }

        this.dispatchEvent(new PkShowEvent());
        this.closing = false;
        this.panelAnimated = false;
        this.open = true;
        this.applyOptionState();
        this.resetHighlightedIndexOnOpen();

        if (this.usesAsyncSearch) {
            this.asyncError = null;
            // Freeform async: value is the query. Clear stale nodes and show loading
            // immediately when reopening with text so “Searching…” never sits under
            // the previous result list during debounce.
            this.renderAsyncOptionNodes([]);
            const query = this.value.trim();
            this.asyncLoading = Boolean(query);
            this.scheduleAsyncFetch(query);
        }

        this.style.setProperty('--pk-autocomplete-anchor-width', `${anchor.getBoundingClientRect().width}px`);
        this.popupElement.active = true;

        if (this.panelElement) {
            this.panelElement.hidden = false;
            syncPopupPlacementAnimation(this.panelElement, this.placement);
        }

        this.registerDismissHandlers();
        this.syncHighlight();
        this.controlInput?.focus({ preventScroll: true });

        return this.updateComplete.then(async () => {
            const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, {
                requireEvent: true,
            });

            if (this.panelElement) {
                syncPopupPlacementAnimation(this.panelElement, placement);
            }

            this.panelAnimated = true;
            this.bindPanelEvents();
            this.refreshOptions();
            this.controlInput?.focus({ preventScroll: true });

            this.dispatchEvent(new PkAfterShowEvent());
            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: true },
                bubbles: true,
                composed: true,
            }));
        });
    }

    private async closePanel(source: PkOverlaySource = 'unknown'): Promise<void> {
        if (!this.open || this.closing) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            return;
        }

        this.unbindPanelEvents();
        this.closing = true;
        this.panelAnimated = false;
        await waitForPopupContentExitAnimation(this.panelElement);

        this.open = false;
        this.closing = false;
        this.panelAnimated = false;

        if (this.panelElement) {
            this.panelElement.hidden = true;
            this.panelElement.removeAttribute('data-side');
        }

        this.popupElement.active = false;
        this.unregisterDismissHandlers();
        this.applyOptionState();

        if (this.usesAsyncSearch) {
            this.asyncFetcher?.cancel();
            this.asyncLoading = false;
            this.asyncError = null;
            this.renderAsyncOptionNodes([]);
        }

        if (source !== 'light-dismiss' && source !== 'pointer-dismiss') {
            this.controlInput?.focus({ preventScroll: true });
        } else {
            this.controlInput?.blur();
        }

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));
    }

    private registerDismissHandlers(): void {
        registerDismissible(this);
        this.dismissRegistered = true;
        document.addEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.addEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private unregisterDismissHandlers(): void {
        if (this.dismissRegistered) {
            unregisterDismissible(this);
            this.dismissRegistered = false;
        }

        document.removeEventListener('pointerdown', this.onDocumentPointerDown, true);
        document.removeEventListener('keydown', this.onDocumentKeyDown, true);
    }

    private onDocumentPointerDown = (event: PointerEvent): void => {
        if (isPointerInsideOverlay(event, {
            anchor: this.controlElement,
            panel: this.panelElement,
        })) {
            return;
        }

        void this.closePanel('light-dismiss');
    };

    private onDocumentKeyDown = (event: KeyboardEvent): void => {
        if (!this.open) {
            return;
        }

        if (event.key === 'Escape') {
            if (!isTopDismissible(this)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            void this.closePanel('escape');
            return;
        }

        const isListboxKey = LISTBOX_NAVIGATION_KEYS.has(event.key) || isListboxTypeToSelectKey(event);

        if (!isListboxKey) {
            return;
        }

        const panel = this.panelElement;
        const path = event.composedPath();
        const focusInPortaledPanel = Boolean(panel && path.includes(panel));

        if (!focusInPortaledPanel) {
            return;
        }

        if (!isEventInsideOverlay(event, {
            anchor: this.controlElement,
            panel,
        })) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.onListboxKeyDown(event);
    };

    private handleOptionSelect = (event: CustomEvent<{ value: string }>): void => {
        const { value } = event.detail;
        this.commitValue(value, { close: true });
    };

    private handleOptionHighlight = (event: CustomEvent<{ value: string }>): void => {
        if (!this.open) {
            return;
        }

        const enabled = this.getEnabledVisibleOptions();
        const index = enabled.findIndex((option) => option.value === event.detail.value);

        if (index === -1 || index === this.highlightedIndex) {
            return;
        }

        this.highlightedIndex = index;
        this.syncHighlight();
    };

    private commitValue(next: string, { close = false, emit = true } = {}): void {
        const changed = this.value !== next;
        this.value = next;
        this.syncHasValueAttribute();
        this.applyOptionState();

        if (close) {
            void this.closePanel('api');
        }

        if (changed && emit) {
            this.emitValueChange();
        }
    }

    private handleClear(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.commitValue('');
        this.dispatchEvent(new PkClearEvent());
        this.controlInput?.focus();
    }

    private emitValueChange(): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleInput(event: Event): void {
        const next = (event.target as HTMLInputElement).value;
        this.value = next;
        this.syncHasValueAttribute();
        this.highlightedIndex = this.autoHighlight ? 0 : -1;
        this.applyOptionState();
        this.emitValueChange();

        if (this.usesAsyncSearch) {
            this.asyncError = null;
            this.scheduleAsyncFetch(next.trim());
        }

        if (!this.open) {
            void this.openPanel();
        }
    }

    private handleControlMouseDown = (event: MouseEvent): void => {
        if (this.disabled) {
            return;
        }

        const path = event.composedPath();
        const isInteractiveChild = path.some((node) => {
            if (!(node instanceof HTMLElement)) {
                return false;
            }

            return node.classList.contains('clear-button');
        });

        if (isInteractiveChild) {
            return;
        }

        const isInput = event.target === this.controlInput;

        if (!this.open && !this.closing) {
            if (!isInput) {
                event.preventDefault();
            }

            this.controlInput?.focus({ preventScroll: true });
            void this.openPanel();
            return;
        }

        if (!isInput) {
            event.preventDefault();
            this.controlInput?.focus({ preventScroll: true });
        }
    };

    private handleInputKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape' && this.open) {
            event.preventDefault();
            void this.closePanel('escape');
            return;
        }

        if (event.key === 'ArrowDown' && !this.open) {
            event.preventDefault();
            void this.openPanel();
            return;
        }

        if (!this.open) {
            return;
        }

        if (event.key === 'Enter') {
            const enabled = this.getEnabledVisibleOptions();

            if (this.highlightedIndex >= 0 && enabled[this.highlightedIndex]) {
                event.preventDefault();
                this.commitValue(enabled[this.highlightedIndex]!.value, { close: true });
            } else {
                void this.closePanel('api');
            }

            return;
        }

        if (LISTBOX_NAVIGATION_KEYS.has(event.key) && event.key !== 'Enter' && event.key !== 'Escape') {
            this.onListboxKeyDown(event);
        }
    }

    private onListboxKeyDown(event: KeyboardEvent): void {
        const enabled = this.getEnabledVisibleOptions() as unknown as HTMLElement[];

        this.highlightedIndex = handleListboxKeyDown(event, {
            items: enabled,
            currentIndex: this.highlightedIndex,
            loop: this.loopFocus,
            onSelect: (index) => {
                const option = this.getEnabledVisibleOptions()[index];

                if (option) {
                    this.commitValue(option.value, { close: true });
                }
            },
            onClose: () => {
                void this.closePanel('escape');
            },
            focusItem: (index) => {
                this.highlightedIndex = index;
                this.syncHighlight();
            },
        });
    }

    private handleListboxKeyDownEvent = (event: CustomEvent<{ keyboardEvent: KeyboardEvent }>): void => {
        this.onListboxKeyDown(event.detail.keyboardEvent);
    };

    async hide(source: PkOverlaySource = 'api'): Promise<void> {
        await this.closePanel(source);
    }

    private renderHostDecorationSlot(name: 'start' | 'end') {
        if (!this.hasSlotController.test(name)) {
            return nothing;
        }

        return html`<slot name=${name} part=${name} class=${name === 'start' ? 'control-start' : 'control-end'}></slot>`;
    }

    override render() {
        const visibleOptions = this.getEnabledVisibleOptions();
        // Async empty / loading / errors use `async-status` only — do not also paint
        // `emptyMessage` or the panel shows two notices for the same empty result.
        const showEmpty = this.open && !this.usesAsyncSearch && visibleOptions.length === 0;
        const asyncStatus = this.getAsyncStatusMessage();
        const showClear = (this.clearable || this.withClear) && Boolean(this.value) && !this.disabled;
        const activeDescendant = this.open ? this.getActiveDescendantId() : null;

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
                part="control"
                class=${classMap({
                    control: true,
                    'is-disabled': this.disabled,
                })}
                data-popup-open=${this.open || this.closing ? '' : nothing}
                @mousedown=${this.handleControlMouseDown}
            >
                ${this.renderHostDecorationSlot('start')}
                <input
                    part="input"
                    class="autocomplete-input control-input"
                    type="text"
                    role="combobox"
                    id=${this.inputId}
                    .value=${this.value}
                    placeholder=${this.placeholder || nothing}
                    ?disabled=${this.disabled}
                    aria-label=${this.ariaLabel ?? nothing}
                    aria-expanded=${this.open ? 'true' : 'false'}
                    aria-controls=${this.listboxId}
                    aria-autocomplete="both"
                    aria-activedescendant=${activeDescendant ?? nothing}
                    @input=${this.handleInput}
                    @keydown=${this.handleInputKeyDown}
                />
                ${this.renderHostDecorationSlot('end')}
                ${showClear
                    ? html`
                        <button
                            type="button"
                            class="clear-button"
                            part="clear-button"
                            aria-label="Clear"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${unsafeSVG(XMARK_ICON)}</span>
                        </button>
                    `
                    : nothing}
            </div>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${this.controlElement ?? ''}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .sync=${'width'}
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
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                >
                    <div
                        part="panel-body"
                        class="panel-body"
                        id=${this.listboxId}
                        role="listbox"
                        aria-busy=${this.usesAsyncSearch && this.asyncLoading ? 'true' : nothing}
                    >
                        <slot></slot>
                        ${asyncStatus
                            ? html`
                                <div part="async-status" class="async-status" role="status">${asyncStatus}</div>
                            `
                            : nothing}
                        ${showEmpty
                            ? html`
                                <div part="empty" class="empty">${this.emptyMessage}</div>
                            `
                            : nothing}
                    </div>
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-autocomplete': PkAutocomplete;
    }
}
