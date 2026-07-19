import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';

import { chevronDown, xmark, renderIconHtml } from '../../icons/index.js';
import { LiveRegion, uniqueId } from '../../a11y/focus.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { scrollIntoView } from '../../a11y/scroll-lock.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { PkClearEvent } from '../../events/pk-clear.js';
import { PkCreateEvent } from '../../events/pk-create.js';
import {
    PkAfterHideEvent,
    PkAfterShowEvent,
    PkHideEvent,
    PkShowEvent,
    type PkOverlaySource,
} from '../../events/overlay-lifecycle.js';
import type { PkValidator } from '../../validators/types.js';
import { MirrorValidator } from '../../validators/mirror-validator.js';
import { PkPopup, type PkPopupPlacement } from '../popup/pk-popup.js';
import {
    handleListboxKeyDown,
    isListboxTypeToSelectKey,
    LISTBOX_NAVIGATION_KEYS,
} from '../../utils/listbox-keyboard.js';
import {
    syncPopupPlacementAnimation,
    waitForPopupReposition,
} from '../../utils/popup-placement-animation.js';
import { isEventInsideOverlay, isPointerInsideOverlay } from '../../utils/popup-pointer.js';
import { syncListboxSeparators } from '../../internal/sync-listbox-separators.js';
import type { PkOption } from '../select/pk-option.js';
import type { PkOptionGroup } from '../select/pk-option-group.js';
import { pkComboboxStyles } from './pk-combobox.styles.js';

export type PkComboboxSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

export type PkComboboxFilter = (option: PkOption, query: string) => boolean;

export type PkComboboxAsyncOption = {
    value: string;
    label: string;
};

export type PkComboboxFetchHandler = (
    query: string,
    signal: AbortSignal,
) => Promise<PkComboboxAsyncOption[]>;

const CHEVRON_ICON = renderIconHtml(chevronDown);
const XMARK_ICON = renderIconHtml(xmark);

/**
 * Combobox — searchable select with separate input and selection state.
 *
 * @slot start - Presentational decoration before the input (e.g. icons)
 * @slot end - Presentational decoration before the expand/clear controls
 * @slot - `pk-option` and `pk-option-group` items
 *
 * @csspart control - Input control wrapper
 * @csspart start - Host start decoration container
 * @csspart end - Host end decoration container
 * @csspart input - Combobox text input
 * @csspart tags - Multiselect chip container
 * @csspart tag - Individual multiselect chip
 * @csspart tag-remove - Chip remove button
 * @csspart clear-button - Clear selection button
 * @csspart expand-button - Toggle listbox button
 * @csspart trigger - Popup-mode trigger button (shows the selected value)
 * @csspart panel-search - Popup-mode search field container
 * @csspart panel-input - Popup-mode search input
 * @csspart panel-body - Scrollable listbox region inside the popup panel
 * @csspart empty - Empty-state message
 * @csspart async-status - Async search status message
 *
 * @event pk-create - Cancelable. Fired before a new option is created when `allow-create` is enabled.
 */
@customElement('pk-combobox')
export class PkCombobox extends PkFormAssociatedElement {
    static override styles = pkComboboxStyles;

    static override get validators(): PkValidator[] {
        return [
            ...super.validators,
            MirrorValidator(),
            {
                observedAttributes: ['required'],
                checkValidity: (element) => {
                    const combobox = element as PkCombobox;
                    const result = {
                        message: 'Please select an item in the list.',
                        isValid: true,
                        invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
                    };

                    if (!combobox.required) {
                        return result;
                    }

                    const missing = combobox.multiple
                        ? combobox.values.length === 0
                        : !combobox.value;

                    if (!missing) {
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

    @property({ type: Boolean, reflect: true })
    multiple = false;

    @property({ reflect: true })
    placement: PkPopupPlacement = 'bottom-start';

    /** Gap between the control and listbox panel in px (default: 6). */
    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 6;

    @property({ type: Boolean, reflect: true })
    clearable = false;

    @property({ attribute: 'with-clear', type: Boolean })
    withClear = false;

    @property({ attribute: 'allow-create', type: Boolean })
    allowCreate = false;

    @property({ attribute: 'allow-custom-value', type: Boolean })
    allowCustomValue = false;

    /** When true, the first matching option is highlighted on open or when filtering. */
    @property({ attribute: 'auto-highlight', type: Boolean })
    autoHighlight = false;

    /** When true, the control shows a trigger button and the search field renders inside the popup. */
    @property({ attribute: 'popup-mode', type: Boolean, reflect: true })
    popupMode = false;

    @property({ attribute: 'search-placeholder' })
    searchPlaceholder = 'Search';

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    size: PkComboboxSize = 'default';

    /** When `full`, the control stretches to the host width. */
    @property({ reflect: true })
    width?: 'full';

    /** Empty by default — consumers opt in when a prompt is useful. */
    @property()
    placeholder = '';

    @property({ attribute: 'empty-message' })
    emptyMessage = 'No options found.';

    @property()
    value = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property({ type: Array, attribute: false })
    values: string[] = [];

    @property({ attribute: false })
    defaultValues: string[] = [];

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Mirrors Base UI `Combobox` — default: `true`.
     */
    @property({ attribute: 'loop-focus', type: Boolean })
    loopFocus = true;

    /** Custom filter — `(option, query) => boolean`. Defaults to label/value substring match. */
    @property({ attribute: false })
    filter: PkComboboxFilter | null = null;

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
    fetchOptions: PkComboboxFetchHandler | null = null;

    private readonly hasSlotController = new HasSlotController(this, 'start', 'end');

    private readonly listboxId = uniqueId('pk-combobox-listbox');
    private readonly inputId = uniqueId('pk-combobox-input');
    private readonly createOptionId = uniqueId('pk-combobox-create');

    @query('pk-popup')
    private popupElement!: PkPopup;

    @query('.control')
    private controlElement!: HTMLElement;

    @query('.control-input')
    private controlInput?: HTMLInputElement;

    @query('.popup-trigger')
    private popupTrigger?: HTMLButtonElement;

    @query('.create-option')
    private createOptionElement?: HTMLButtonElement;

    @query('.value-input')
    override input!: HTMLInputElement;

    private get panelElement(): HTMLDivElement | null {
        return this.popupElement?.getContentElement() as HTMLDivElement | null ?? null;
    }

    private get panelInput(): HTMLInputElement | undefined {
        return this.panelElement?.querySelector('.panel-input') as HTMLInputElement | undefined;
    }

    private get panelBodyElement(): HTMLDivElement | undefined {
        return this.panelElement?.querySelector('.panel-body') as HTMLDivElement | undefined;
    }

    private get usesPopupMode(): boolean {
        return this.popupMode && !this.multiple;
    }

    private get activeInput(): HTMLInputElement | undefined {
        return this.usesPopupMode ? this.panelInput : this.controlInput;
    }

    /** Combobox keeps focus on the text field and uses `aria-activedescendant` for highlight. */
    private keepsFocusOnInput(): boolean {
        return Boolean(this.activeInput);
    }

    private maintainInputFocus(): void {
        this.activeInput?.focus({ preventScroll: true });
    }

    private get listScrollContainer(): HTMLElement {
        return this.panelBodyElement ?? this.panelElement ?? this;
    }

    private options: PkOption[] = [];

    /** Filter text while the listbox is open — separate from `value`. */
    @state()
    private inputValue = '';

    /** True once the user edits the input after the current open cycle (open-cycle edit tracking). */
    private hasInputSinceOpening = false;

    @state()
    private highlightedIndex = -1;

    @state()
    private createOptionHighlighted = false;

    @state()
    private closing = false;

    @state()
    private panelAnimated = false;

    private dismissRegistered = false;
    private panelEventTarget: HTMLElement | null = null;
    private optionsObserver?: MutationObserver;
    private liveRegion?: LiveRegion;
    private fetchAbortController?: AbortController;
    private asyncFetchTimer?: number;
    private asyncFetchRequestId = 0;
    private selectedOptionMeta: PkComboboxAsyncOption | null = null;

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
        window.clearTimeout(this.asyncFetchTimer);
        this.fetchAbortController?.abort();
        void this.closePanel('api');
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('values') || changed.has('multiple')) {
            this.syncHasValueAttribute();
            this.syncSelectedOptionMeta();
            this.applySelection();
        }

        super.updated(changed);
    }

    protected override get validationTarget(): HTMLElement | undefined {
        return this.activeInput ?? this.popupTrigger ?? this.controlElement;
    }

    protected override getAriaMirrorTarget(): HTMLElement | null {
        return this.activeInput ?? this.popupTrigger ?? this.controlElement ?? null;
    }

    protected override syncFormValue(): void {
        if (!this.name) {
            this.setFormValue(null);
            return;
        }

        if (this.multiple) {
            const formData = new FormData();

            for (const item of this.values) {
                formData.append(this.name, item);
            }

            this.setFormValue(formData);
            return;
        }

        this.setFormValue(this.value || '');
    }

    protected override resetToDefaultValue(): void {
        if (this.multiple) {
            this.values = [...this.defaultValues];
        } else {
            this.value = this.defaultValue;
        }

        this.inputValue = '';
        this.applySelection();
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (state instanceof FormData && this.name) {
            this.values = state.getAll(this.name).map(String);
            return;
        }

        if (typeof state === 'string') {
            this.value = state;
        }
    }

    private syncHasValueAttribute(): void {
        this.toggleAttribute('data-has-value', this.hasSelection());
    }

    private getOptionElements(): PkOption[] {
        const portaled = this.popupElement?.getContentElement()?.querySelectorAll('pk-option');

        if (portaled && portaled.length > 0) {
            return [...portaled];
        }

        return [...this.querySelectorAll('pk-option')];
    }

    private handleOptionsMutation = (options: { render?: boolean } = {}): void => {
        const next = this.getOptionElements();
        const changed = next.length !== this.options.length
            || next.some((option, index) => option !== this.options[index]);

        this.options = next;
        this.applySelection();

        if (options.render !== false && changed) {
            this.requestUpdate();
        }
    };

    private refreshOptions(): void {
        this.handleOptionsMutation({ render: false });
    }

    private syncOptions = (): void => {
        this.handleOptionsMutation({ render: true });
    };

    /** Portaled listbox options are outside the host tree — listen on the panel instead. */
    private bindPanelEvents(): void {
        const panel = this.panelElement;

        if (!panel || panel === this.panelEventTarget) {
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

    private defaultFilter(option: PkOption, query: string): boolean {
        const label = option.getLabel().toLowerCase();
        const value = option.value.toLowerCase();
        // Rich options may set a short `label` for the closed input — still match subtitle text.
        const searchText = (option.getSearchText?.() ?? label).toLowerCase();

        return label.includes(query) || value.includes(query) || searchText.includes(query);
    }

    private matchesFilter(option: PkOption, query: string): boolean {
        if (this.filter) {
            return this.filter(option, query);
        }

        return this.defaultFilter(option, query);
    }

    private getFilterQuery(): string {
        if (!this.open) {
            return '';
        }

        if (!this.multiple && !this.hasInputSinceOpening && !this.usesPopupMode) {
            return '';
        }

        return this.inputValue.trim().toLowerCase();
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

            return this.matchesFilter(option, filter);
        });
    }

    private getEnabledVisibleOptions(): PkOption[] {
        return this.getVisibleOptions().filter((option) => !option.disabled);
    }

    private getSelectedOptions(): PkOption[] {
        if (this.multiple) {
            const optionsByValue = new Map(this.options.map((option) => [option.value, option]));

            return this.values
                .map((value) => optionsByValue.get(value))
                .filter((option): option is PkOption => option !== undefined);
        }

        const selected = this.options.find((option) => option.value === this.value);

        return selected ? [selected] : [];
    }

    private getSelectedOption(): PkOption | undefined {
        return this.options.find((option) => option.value === this.value);
    }

    private get usesAsyncSearch(): boolean {
        return this.async && Boolean(this.fetchOptions) && !this.multiple && !this.usesPopupMode;
    }

    private getSelectedLabel(): string {
        return this.getSelectedOption()?.getLabel()
            ?? this.selectedOptionMeta?.label
            ?? this.value;
    }

    private clearAsyncOptionNodes(): void {
        this.querySelectorAll(':scope > pk-option, :scope > pk-option-group, :scope > pk-separator')
            .forEach((node) => node.remove());
    }

    private renderAsyncOptionNodes(items: PkComboboxAsyncOption[]): void {
        const merged = this.mergeAsyncItems(items);
        this.clearAsyncOptionNodes();

        for (const item of merged) {
            const option = document.createElement('pk-option');
            option.value = item.value;
            option.textContent = item.label;
            this.append(option);
        }

        this.handleOptionsMutation({ render: true });
    }

    private mergeAsyncItems(items: PkComboboxAsyncOption[]): PkComboboxAsyncOption[] {
        if (!this.value) {
            return items;
        }

        const selected = this.selectedOptionMeta
            ?? { value: this.value, label: this.getSelectedOption()?.getLabel() ?? this.value };

        if (items.some((item) => item.value === selected.value)) {
            return items;
        }

        return [...items, selected];
    }

    private syncSelectedOptionMeta(): void {
        if (!this.value) {
            this.selectedOptionMeta = null;
            return;
        }

        const selected = this.getSelectedOption();

        if (selected) {
            this.selectedOptionMeta = {
                value: selected.value,
                label: selected.getLabel(),
            };
        }
    }

    private scheduleAsyncFetch(query: string): void {
        window.clearTimeout(this.asyncFetchTimer);

        this.asyncFetchTimer = window.setTimeout(() => {
            void this.runAsyncFetch(query);
        }, 200);
    }

    private async runAsyncFetch(query: string): Promise<void> {
        if (!this.fetchOptions) {
            return;
        }

        const requestId = ++this.asyncFetchRequestId;
        this.fetchAbortController?.abort();
        this.fetchAbortController = new AbortController();

        if (!query) {
            this.asyncLoading = false;
            this.asyncError = null;
            this.renderAsyncOptionNodes(this.value && this.selectedOptionMeta ? [this.selectedOptionMeta] : []);
            return;
        }

        this.asyncLoading = true;
        this.asyncError = null;

        try {
            const results = await this.fetchOptions(query, this.fetchAbortController.signal);

            if (requestId !== this.asyncFetchRequestId) {
                return;
            }

            this.renderAsyncOptionNodes(results);
        } catch (error) {
            if (this.fetchAbortController?.signal.aborted || requestId !== this.asyncFetchRequestId) {
                return;
            }

            if (error instanceof DOMException && error.name === 'AbortError') {
                return;
            }

            console.error('Failed to load combobox options:', error);
            this.asyncError = 'Failed to load options. Please try again.';
            this.renderAsyncOptionNodes([]);
        } finally {
            if (requestId === this.asyncFetchRequestId) {
                this.asyncLoading = false;
            }
        }
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

        const query = this.inputValue.trim();

        if (!query) {
            return this.value ? null : this.startTypingMessage;
        }

        if (this.getEnabledVisibleOptions().length === 0 && !this.shouldShowCreateOption()) {
            return `No matches for "${query}".`;
        }

        return null;
    }

    private shouldShowAsyncEmpty(): boolean {
        if (!this.usesAsyncSearch || !this.open) {
            return false;
        }

        const query = this.inputValue.trim();

        if (!query || this.asyncLoading || this.asyncError) {
            return false;
        }

        return this.getEnabledVisibleOptions().length === 0 && !this.shouldShowCreateOption();
    }

    private isSelected(value: string): boolean {
        if (this.multiple) {
            return this.values.includes(value);
        }

        return this.value === value;
    }

    private getDisplayInputValue(): string {
        if (this.usesPopupMode || this.multiple || this.open) {
            return this.inputValue;
        }

        // Empty-string values are valid when an option declares them (e.g. "Default (browser)").
        return this.hasSelection() ? this.getSelectedLabel() : '';
    }

    private getTriggerDisplayValue(): string {
        return this.hasSelection() ? this.getSelectedLabel() : this.placeholder;
    }

    private isTriggerPlaceholder(): boolean {
        return !this.hasSelection();
    }

    private hasSelection(): boolean {
        if (this.multiple) {
            return this.values.length > 0;
        }

        // Match pk-select: a matching option counts even when its value is "".
        return Boolean(this.getSelectedOption() || this.selectedOptionMeta || this.value);
    }

    private shouldShowCreateOption(): boolean {
        if (!this.allowCreate || !this.open) {
            return false;
        }

        if (!this.multiple && !this.hasInputSinceOpening) {
            return false;
        }

        const query = this.inputValue.trim();

        if (!query) {
            return false;
        }

        const normalized = query.toLowerCase();

        return !this.options.some((option) => {
            return option.getLabel().toLowerCase() === normalized
                || option.value.toLowerCase() === normalized;
        });
    }

    private getListboxNavItems(): HTMLElement[] {
        const enabled = this.getEnabledVisibleOptions() as unknown as HTMLElement[];

        if (this.shouldShowCreateOption() && this.createOptionElement) {
            return [...enabled, this.createOptionElement];
        }

        return enabled;
    }

    private applySelection(): void {
        const visible = this.getVisibleOptions();
        const filterQuery = this.open ? this.getFilterQuery() : '';

        for (const option of this.options) {
            option.selected = this.isSelected(option.value);
            option.hidden = !visible.includes(option);
            option.optionId = `${this.listboxId}-option-${option.value}`;
            option.matchQuery = filterQuery;
        }

        for (const group of this.querySelectorAll('pk-option-group')) {
            const groupOptions = [...group.querySelectorAll('pk-option')];
            // Use data-pk-filter-empty — not `hidden` — so clearing the query can
            // resurrect options. `hidden` is reserved for intentional author hide;
            // consulting it in getVisibleOptions would trap emptied groups forever.
            const filterEmpty = groupOptions.length > 0
                && groupOptions.every((option) => option.hidden);

            group.toggleAttribute('data-pk-filter-empty', filterEmpty);
        }

        // Sibling <pk-separator>s stay in the light DOM when groups hide — sync them.
        syncListboxSeparators(this);

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

        this.input.value = this.multiple ? this.values.join(',') : this.value;
        this.input.required = this.required;
    }

    private syncHighlightedIndexToSelection(): void {
        if (this.multiple) {
            return;
        }

        const enabled = this.getEnabledVisibleOptions();

        if (!this.value || enabled.length === 0) {
            return;
        }

        const selectedIndex = enabled.findIndex((option) => option.value === this.value);

        if (selectedIndex >= 0) {
            this.highlightedIndex = selectedIndex;
        }
    }

    private resetHighlightedIndexOnOpen(): void {
        if (this.autoHighlight) {
            if (this.value) {
                this.syncHighlightedIndexToSelection();
                return;
            }

            this.highlightedIndex = 0;
            return;
        }

        this.highlightedIndex = -1;
    }

    private syncHighlight(): void {
        const enabled = this.getEnabledVisibleOptions();
        const showCreate = this.shouldShowCreateOption();
        const totalItems = enabled.length + (showCreate ? 1 : 0);

        for (const option of this.options) {
            option.highlighted = false;
            option.focusIndex = -1;
        }

        this.createOptionHighlighted = false;

        if (totalItems === 0 || this.highlightedIndex < 0) {
            return;
        }

        if (this.highlightedIndex >= totalItems) {
            this.highlightedIndex = totalItems - 1;
        }

        if (showCreate && this.highlightedIndex === enabled.length) {
            this.createOptionHighlighted = true;

            if (!this.keepsFocusOnInput()) {
                this.createOptionElement?.focus({ preventScroll: true });
            }

            scrollIntoView(this.createOptionElement!, this.listScrollContainer, 'vertical', 'auto');

            if (this.keepsFocusOnInput()) {
                this.maintainInputFocus();
            }

            return;
        }

        const highlighted = enabled[this.highlightedIndex];

        if (highlighted) {
            highlighted.highlighted = true;
            highlighted.focusIndex = this.keepsFocusOnInput() ? -1 : 0;
            scrollIntoView(highlighted, this.listScrollContainer, 'vertical', 'auto');

            if (this.keepsFocusOnInput()) {
                this.maintainInputFocus();
            }
        }
    }

    private getActiveDescendantId(): string | null {
        const enabled = this.getEnabledVisibleOptions();

        if (this.shouldShowCreateOption() && this.highlightedIndex === enabled.length) {
            return this.createOptionId;
        }

        const highlighted = enabled[this.highlightedIndex];
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

        if (this.shouldShowCreateOption()) {
            this.liveRegion.announce(`Create ${filter}`);
            return;
        }

        this.liveRegion.announce(
            count === 0
                ? `${this.emptyMessage}`
                : `${count} ${count === 1 ? 'result' : 'results'} available`,
        );
    }

    private togglePanel = (event?: Event): void => {
        event?.preventDefault();
        event?.stopPropagation();

        if (this.disabled) {
            return;
        }

        if (this.open || this.closing) {
            void this.closePanel('api');
        } else {
            void this.openPanel();
        }
    };

    async show(): Promise<void> {
        if (this.open || this.closing || this.disabled) {
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

    private openPanel(): Promise<void> {
        const anchor = this.controlElement;

        if (!anchor) {
            return Promise.resolve();
        }

        if (this.open) {
            this.activeInput?.focus({ preventScroll: true });
            return Promise.resolve();
        }

        if (this.closing) {
            return Promise.resolve();
        }

        this.dispatchEvent(new PkShowEvent());
        this.closing = false;
        this.panelAnimated = false;
        this.open = true;
        this.hasInputSinceOpening = false;
        this.inputValue = this.usesPopupMode
            ? ''
            : (!this.multiple && this.hasSelection() ? this.getSelectedLabel() : '');
        this.applySelection();
        this.resetHighlightedIndexOnOpen();

        if (this.usesAsyncSearch) {
            this.syncSelectedOptionMeta();
            this.asyncError = null;
            this.asyncLoading = false;
            this.renderAsyncOptionNodes(this.selectedOptionMeta ? [this.selectedOptionMeta] : []);
        }

        const anchorWidth = anchor.getBoundingClientRect().width;
        this.style.setProperty('--pk-combobox-anchor-width', `${anchorWidth}px`);

        // Activate the popup synchronously (same as pk-select). Relying only on the
        // `.active=${this.open}` binding races waitForPopupReposition's 100ms fallback
        // and leaves popup-mode search focus failing against a still-closed popover.
        this.popupElement.active = true;

        if (this.panelElement) {
            this.panelElement.hidden = false;
            syncPopupPlacementAnimation(this.panelElement, this.placement);
        }

        this.registerDismissHandlers();
        this.syncHighlight();

        if (this.usesPopupMode) {
            this.popupTrigger?.blur();
        } else {
            // Input mode keeps the control field focused immediately; popup mode waits
            // until the panel is positioned so focus isn't dropped on a hidden popover.
            this.activeInput?.focus({ preventScroll: true });
        }

        return this.updateComplete.then(async () => {
            // requireEvent: true — same as pk-dropdown-menu. A leftover
            // data-current-placement from the previous open would resolve immediately
            // while .popup is still :not(.positioned) (visibility:hidden), so focus fails.
            const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, {
                requireEvent: true,
            });

            if (this.panelElement) {
                syncPopupPlacementAnimation(this.panelElement, placement);
            }

            this.panelAnimated = true;
            this.bindPanelEvents();
            this.refreshOptions();

            this.activeInput?.focus({ preventScroll: true });

            if (this.highlightedIndex >= 0 && !this.keepsFocusOnInput()) {
                const enabled = this.getEnabledVisibleOptions();
                const index = this.highlightedIndex;

                if (this.shouldShowCreateOption() && index === enabled.length) {
                    this.createOptionElement?.focus({ preventScroll: true });
                } else {
                    enabled[index]?.focusControl();
                }
            }

            this.dispatchEvent(new PkAfterShowEvent());
            this.dispatchEvent(new CustomEvent('pk-open-change', {
                detail: { open: true },
                bubbles: true,
                composed: true,
            }));
        });
    }

    private commitCustomValueIfAllowed(): boolean {
        if (this.multiple || !this.allowCustomValue) {
            return false;
        }

        const query = this.inputValue.trim();

        if (!query) {
            return false;
        }

        const exactMatch = this.options.find((option) => {
            return option.getLabel().toLowerCase() === query.toLowerCase()
                || option.value.toLowerCase() === query.toLowerCase();
        });

        const nextValue = exactMatch?.value ?? query;

        if (this.value === nextValue) {
            return false;
        }

        this.value = nextValue;
        return true;
    }

    private commitInputOnClose(source: PkOverlaySource): boolean {
        if (this.multiple || this.usesPopupMode) {
            return false;
        }

        if (!this.hasInputSinceOpening) {
            if (this.shouldCommitCustomValueOnClose(source)) {
                return this.commitCustomValueIfAllowed();
            }

            return false;
        }

        const query = this.inputValue.trim();

        if (!query) {
            if (!this.value) {
                return false;
            }

            this.value = '';
            return true;
        }

        if (this.shouldCommitCustomValueOnClose(source)) {
            return this.commitCustomValueIfAllowed();
        }

        return false;
    }

    private shouldCommitCustomValueOnClose(source: PkOverlaySource): boolean {
        return source === 'light-dismiss' || source === 'pointer-dismiss';
    }

    private async closePanel(source: PkOverlaySource = 'unknown'): Promise<void> {
        if (!this.open || this.closing) {
            return;
        }

        const hideEvent = new PkHideEvent(source);

        if (!this.dispatchEvent(hideEvent)) {
            return;
        }

        const valueChanged = this.commitInputOnClose(source);

        this.unbindPanelEvents();
        this.closing = true;
        this.panelAnimated = false;
        await this.waitForExitAnimation();

        this.open = false;
        this.closing = false;
        this.panelAnimated = false;
        this.hasInputSinceOpening = false;
        this.inputValue = '';

        if (this.panelElement) {
            this.panelElement.hidden = true;
            this.panelElement.removeAttribute('data-side');
        }

        this.popupElement.active = false;

        this.unregisterDismissHandlers();
        this.applySelection();

        if (this.usesAsyncSearch) {
            window.clearTimeout(this.asyncFetchTimer);
            this.fetchAbortController?.abort();
            this.asyncLoading = false;
            this.asyncError = null;
            this.renderAsyncOptionNodes(this.selectedOptionMeta ? [this.selectedOptionMeta] : []);
        }

        if (valueChanged) {
            this.syncHasValueAttribute();
            this.emitValueChange();
        }

        if (this.shouldReturnFocusToInput(source)) {
            if (this.usesPopupMode) {
                this.popupTrigger?.focus({ preventScroll: true });
            } else {
                this.activeInput?.focus({ preventScroll: true });
            }
        } else {
            this.activeInput?.blur();
            this.popupTrigger?.blur();
        }

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));
    }

    private waitForExitAnimation(): Promise<void> {
        const panel = this.panelElement;

        if (!panel) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            let settled = false;

            const finish = (): void => {
                if (settled) {
                    return;
                }

                settled = true;
                panel.removeEventListener('animationend', onAnimationEnd);
                window.clearTimeout(fallback);
                panel.classList.remove('closing');
                resolve();
            };

            const onAnimationEnd = (event: AnimationEvent): void => {
                if (event.target === panel && event.animationName.startsWith('pk-popup-content-out')) {
                    finish();
                }
            };

            panel.classList.add('closing');
            panel.addEventListener('animationend', onAnimationEnd);
            const fallback = window.setTimeout(finish, 150);
        });
    }

    private shouldReturnFocusToInput(source: PkOverlaySource): boolean {
        return source !== 'light-dismiss' && source !== 'pointer-dismiss';
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

    private isPointerInside(event: PointerEvent): boolean {
        // Anchor + panel only — do not treat empty host padding (min-width > control) as inside.
        return isPointerInsideOverlay(event, {
            anchor: this.controlElement,
            panel: this.panelElement,
        });
    }

    private onDocumentPointerDown = (event: PointerEvent): void => {
        if (this.isPointerInside(event)) {
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

        // Popup-mode search lives inside the panel. Capture-phase document handlers
        // must not steal typing / Space from it — `handleInputKeyDown` already
        // forwards Arrow/Enter to the listbox while keeping the filter editable.
        const panelInput = this.panelInput;

        if (panelInput && event.composedPath().includes(panelInput)) {
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

        if (this.multiple) {
            this.values = this.values.includes(value)
                ? this.values.filter((item) => item !== value)
                : [...this.values, value];
            this.inputValue = '';
            this.applySelection();
            this.emitValueChange();
            this.activeInput?.focus({ preventScroll: true });
            return;
        }

        this.value = value;
        this.syncSelectedOptionMeta();
        this.applySelection();
        void this.closePanel('api');
        this.emitValueChange();
    };

    private handleCreateOption(): void {
        const query = this.inputValue.trim();

        if (!query) {
            return;
        }

        const createEvent = new PkCreateEvent(query);

        if (!this.dispatchEvent(createEvent)) {
            return;
        }

        const option = document.createElement('pk-option');
        option.value = query;
        option.textContent = query;
        this.append(option);

        if (this.multiple) {
            if (!this.values.includes(query)) {
                this.values = [...this.values, query];
            }

            this.inputValue = '';
            this.applySelection();
            this.emitValueChange();
            this.activeInput?.focus({ preventScroll: true });
            return;
        }

        this.value = query;
        this.applySelection();
        void this.closePanel('api');
        this.emitValueChange();
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

    private removeTag(value: string, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.values = this.values.filter((item) => item !== value);
        this.applySelection();
        this.emitValueChange();
        this.activeInput?.focus({ preventScroll: true });
    }

    private handleClear(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        if (this.multiple) {
            this.values = [];
        } else {
            this.value = '';
        }

        this.inputValue = '';
        this.selectedOptionMeta = null;

        if (this.usesAsyncSearch) {
            this.renderAsyncOptionNodes([]);
        }

        this.applySelection();
        this.dispatchEvent(new PkClearEvent());
        this.emitValueChange();
        this.activeInput?.focus();
    }

    private emitValueChange(): void {
        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: {
                value: this.multiple ? [...this.values] : this.value,
            },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleInput(event: Event): void {
        this.hasInputSinceOpening = true;
        this.inputValue = (event.target as HTMLInputElement).value;
        this.highlightedIndex = this.autoHighlight ? 0 : -1;
        this.applySelection();

        if (this.usesAsyncSearch) {
            this.asyncError = null;
            this.scheduleAsyncFetch(this.inputValue.trim());
        }

        if (!this.open) {
            void this.openPanel();
        }
    }

    private handleControlMouseDown = (event: MouseEvent): void => {
        if (this.disabled || this.usesPopupMode) {
            return;
        }

        const path = event.composedPath();
        const isInteractiveChild = path.some((node) => {
            if (!(node instanceof HTMLElement)) {
                return false;
            }

            return node.classList.contains('icon-button')
                || node.classList.contains('clear-button')
                || node.classList.contains('tag-remove');
        });

        if (isInteractiveChild) {
            return;
        }

        const isInput = event.target === this.activeInput;

        if (!this.open && !this.closing) {
            if (!isInput) {
                event.preventDefault();
            }

            this.activeInput?.focus({ preventScroll: true });
            void this.openPanel();
            return;
        }

        if (!isInput) {
            event.preventDefault();
            this.activeInput?.focus({ preventScroll: true });
        }
    };

    private handleTriggerKeyDown = (event: KeyboardEvent): void => {
        if (this.disabled) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.togglePanel(event);
            return;
        }

        if (event.key === 'ArrowDown' && !this.open) {
            event.preventDefault();
            void this.openPanel();
        }
    };

    private handleInputKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Backspace' && this.multiple && !this.inputValue && this.values.length > 0) {
            event.preventDefault();
            this.values = this.values.slice(0, -1);
            this.applySelection();
            this.emitValueChange();
            return;
        }

        if (event.key === 'Escape' && this.open) {
            event.preventDefault();

            if (this.hasInputSinceOpening && this.inputValue) {
                this.hasInputSinceOpening = false;
                this.inputValue = this.usesPopupMode
                    ? ''
                    : (!this.multiple && this.hasSelection() ? this.getSelectedLabel() : '');
                this.highlightedIndex = this.autoHighlight ? 0 : -1;
                this.applySelection();
                return;
            }

            void this.closePanel('escape');
            return;
        }

        if (event.key === 'ArrowDown' && !this.open) {
            event.preventDefault();
            void this.openPanel();
            return;
        }

        if (event.key === 'Tab' && this.open) {
            let committed = false;

            if (!this.multiple) {
                committed = this.commitCustomValueIfAllowed();
            }

            void this.closePanel('api');

            if (committed) {
                this.syncHasValueAttribute();
                this.emitValueChange();
            }

            return;
        }

        if (this.open && event.key === 'Enter' && !this.multiple) {
            const enabled = this.getEnabledVisibleOptions();

            if (enabled.length === 0 && this.allowCustomValue && this.inputValue.trim() && !this.shouldShowCreateOption()) {
                event.preventDefault();
                const committed = this.commitCustomValueIfAllowed();
                void this.closePanel('api');

                if (committed) {
                    this.syncHasValueAttribute();
                    this.emitValueChange();
                }

                return;
            }
        }

        if (!this.open) {
            return;
        }

        this.onListboxKeyDown(event);
    }

    private handleListboxKeyDownEvent = (event: CustomEvent<{ keyboardEvent: KeyboardEvent }>): void => {
        if (!this.open) {
            return;
        }

        this.onListboxKeyDown(event.detail.keyboardEvent);
    };

    private onListboxKeyDown(event: KeyboardEvent): void {
        const navItems = this.getListboxNavItems();
        const enabled = this.getEnabledVisibleOptions();

        if (this.highlightedIndex < 0) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                if (enabled.length > 0 || this.shouldShowCreateOption()) {
                    event.preventDefault();
                    this.highlightedIndex = 0;
                    this.syncHighlight();
                }

                return;
            }

            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                if (enabled.length > 0 || this.shouldShowCreateOption()) {
                    event.preventDefault();
                    this.highlightedIndex = this.shouldShowCreateOption()
                        ? enabled.length
                        : Math.max(enabled.length - 1, 0);
                    this.syncHighlight();
                }

                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                return;
            }
        }

        if (event.key === 'Enter' && this.shouldShowCreateOption() && this.highlightedIndex === enabled.length) {
            event.preventDefault();
            this.handleCreateOption();
            return;
        }

        if (this.multiple && (event.key === 'Enter' || event.key === ' ')) {
            const option = enabled[this.highlightedIndex];

            if (option) {
                event.preventDefault();
                option.dispatchEvent(new CustomEvent('pk-option-select', {
                    detail: { value: option.value },
                    bubbles: true,
                    composed: true,
                }));
            }

            return;
        }

        this.highlightedIndex = handleListboxKeyDown(event, {
            items: navItems,
            currentIndex: this.highlightedIndex,
            multiselect: this.multiple,
            loop: this.loopFocus,
            onSelect: (index) => {
                this.highlightedIndex = index;
                this.syncHighlight();
            },
            focusItem: (index) => {
                if (this.keepsFocusOnInput()) {
                    return;
                }

                if (this.shouldShowCreateOption() && index === enabled.length) {
                    this.createOptionElement?.focus({ preventScroll: true });
                    return;
                }

                enabled[index]?.focusControl();
            },
            onClose: () => { void this.closePanel('escape'); },
        });
    }

    private handleCreateMouseEnter = (): void => {
        if (!this.open) {
            return;
        }

        const enabled = this.getEnabledVisibleOptions();
        this.highlightedIndex = enabled.length;
        this.syncHighlight();
    };

    private handleCreateKeyDown = (event: KeyboardEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        this.onListboxKeyDown(event);
    };

    private renderHostDecorationSlot(name: 'start' | 'end') {
        if (!this.hasSlotController.test(name)) {
            return html`<slot name=${name} hidden></slot>`;
        }

        const className = name === 'start' ? 'control-start' : 'control-end';

        return html`
            <span part=${name} class=${className}>
                <slot name=${name}></slot>
            </span>
        `;
    }

    private renderChevronButton() {
        return html`
            <button
                type="button"
                class="icon-button expand-button"
                part="expand-button"
                aria-label="Toggle options"
                ?disabled=${this.disabled}
                @click=${this.togglePanel}
            >
                <span class="icon" aria-hidden="true">${unsafeSVG(CHEVRON_ICON)}</span>
            </button>
        `;
    }

    private renderTags() {
        return this.getSelectedOptions().map((option) => html`
            <span class="tag" part="tag">
                <span class="tag-label">${option.getLabel()}</span>
                <button
                    type="button"
                    class="tag-remove"
                    part="tag-remove"
                    aria-label=${`Remove ${option.getLabel()}`}
                    ?disabled=${this.disabled}
                    @click=${(event: Event) => this.removeTag(option.value, event)}
                >
                    <span class="tag-remove-icon" aria-hidden="true">${unsafeSVG(XMARK_ICON)}</span>
                </button>
            </span>
        `);
    }

    private shouldShowPlaceholder(): boolean {
        if (this.inputValue.trim()) {
            return false;
        }

        return !this.hasSelection();
    }

    private renderInput() {
        const activeDescendant = this.open ? this.getActiveDescendantId() : null;
        const showPlaceholder = this.shouldShowPlaceholder();

        return html`
            <input
                part="input"
                class=${classMap({
                    'combobox-input': true,
                    'control-input': true,
                    'combobox-input--inline': this.multiple,
                })}
                type="text"
                role="combobox"
                id=${this.inputId}
                .value=${this.getDisplayInputValue()}
                placeholder=${showPlaceholder ? this.placeholder : nothing}
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel ?? nothing}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-controls=${this.listboxId}
                aria-autocomplete="list"
                aria-activedescendant=${activeDescendant ?? nothing}
                @input=${this.handleInput}
                @keydown=${this.handleInputKeyDown}
            />
        `;
    }

    private renderPanelInput() {
        const activeDescendant = this.open ? this.getActiveDescendantId() : null;

        return html`
            <div part="panel-search" class="panel-search">
                <input
                    part="panel-input"
                    class="combobox-input panel-input"
                    type="text"
                    role="combobox"
                    id=${this.inputId}
                    .value=${this.inputValue}
                    placeholder=${this.searchPlaceholder}
                    ?disabled=${this.disabled}
                    aria-label=${this.ariaLabel ?? this.searchPlaceholder}
                    aria-expanded="true"
                    aria-controls=${this.listboxId}
                    aria-autocomplete="list"
                    aria-activedescendant=${activeDescendant ?? nothing}
                    @input=${this.handleInput}
                    @keydown=${this.handleInputKeyDown}
                />
            </div>
        `;
    }

    private renderPopupTrigger() {
        return html`
            <button
                type="button"
                part="trigger"
                class="popup-trigger"
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel ?? nothing}
                aria-haspopup="listbox"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-controls=${this.listboxId}
                @click=${this.togglePanel}
                @keydown=${this.handleTriggerKeyDown}
            >
                <span
                    class=${classMap({
                        'popup-trigger-value': true,
                        'is-placeholder': this.isTriggerPlaceholder(),
                    })}
                >
                    ${this.getTriggerDisplayValue()}
                </span>
                <span class="icon popup-trigger-icon" aria-hidden="true">${unsafeSVG(CHEVRON_ICON)}</span>
            </button>
        `;
    }

    private renderControlContent() {
        if (this.usesPopupMode) {
            return this.renderPopupTrigger();
        }

        const showClear = (this.clearable || this.withClear) && this.hasSelection() && !this.disabled;

        if (this.multiple) {
            return html`
                ${this.renderHostDecorationSlot('start')}
                <div class="chips" part="tags">
                    ${this.renderTags()}
                    ${this.renderInput()}
                </div>
                ${this.renderHostDecorationSlot('end')}
                ${showClear
                    ? html`
                        <button
                            type="button"
                            class="clear-button"
                            part="clear-button"
                            aria-label="Clear selection"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${unsafeSVG(XMARK_ICON)}</span>
                        </button>
                    `
                    : nothing}
            `;
        }

        return html`
            ${this.renderHostDecorationSlot('start')}
            ${this.renderInput()}
            ${this.renderHostDecorationSlot('end')}
            ${showClear
                ? html`
                    <button
                        type="button"
                        class="clear-button"
                        part="clear-button"
                        aria-label="Clear selection"
                        ?disabled=${this.disabled}
                        @click=${this.handleClear}
                    >
                        <span class="clear-button-icon" aria-hidden="true">${unsafeSVG(XMARK_ICON)}</span>
                    </button>
                `
                : nothing}
            ${this.renderChevronButton()}
        `;
    }

    override render() {
        const visibleOptions = this.getEnabledVisibleOptions();
        const showCreate = this.shouldShowCreateOption();
        const showEmpty = this.open && (
            this.usesAsyncSearch
                ? this.shouldShowAsyncEmpty()
                : visibleOptions.length === 0 && !showCreate
        );
        const asyncStatus = this.getAsyncStatusMessage();
        const createQuery = this.inputValue.trim();

        return html`
            <input
                class="value-input"
                part="value-input"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.multiple ? this.values.join(',') : this.value}
                ?required=${this.required}
                @input=${() => this.updateValidity()}
            />
            <div
                part="control"
                class=${classMap({
                    control: true,
                    'is-disabled': this.disabled,
                    'control--multiple': this.multiple,
                    'control--popup': this.usesPopupMode,
                })}
                data-popup-open=${this.open ? '' : nothing}
                @mousedown=${this.handleControlMouseDown}
            >
                ${this.renderControlContent()}
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
                        'panel--popup': this.usesPopupMode,
                    })}
                    tabindex="-1"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                >
                    ${this.usesPopupMode ? this.renderPanelInput() : nothing}
                    <div
                        part="panel-body"
                        class="panel-body"
                        id=${this.listboxId}
                        role="listbox"
                        aria-multiselectable=${this.multiple ? 'true' : 'false'}
                        aria-busy=${this.usesAsyncSearch && this.asyncLoading ? 'true' : nothing}
                        @slotchange=${this.syncOptions}
                    >
                        <slot></slot>
                        ${asyncStatus
                            ? html`
                                <div part="async-status" class="async-status" role="status">${asyncStatus}</div>
                            `
                            : nothing}
                        ${showCreate
                            ? html`
                                <button
                                    type="button"
                                    part="create-option"
                                    class=${classMap({
                                        'create-option': true,
                                        'is-highlighted': this.createOptionHighlighted,
                                    })}
                                    id=${this.createOptionId}
                                    role="option"
                                    aria-selected="false"
                                    tabindex="-1"
                                    @click=${this.handleCreateOption}
                                    @mouseenter=${this.handleCreateMouseEnter}
                                    @keydown=${this.handleCreateKeyDown}
                                >
                                    Create "${createQuery}"
                                </button>
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
        'pk-combobox': PkCombobox;
    }
}
