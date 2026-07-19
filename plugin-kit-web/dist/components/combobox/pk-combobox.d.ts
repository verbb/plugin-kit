import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkValidator } from '../../validators/types.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
import { PkOption } from '../select/pk-option.js';
export type PkComboboxSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkComboboxFilter = (option: PkOption, query: string) => boolean;
export type PkComboboxAsyncOption = {
    value: string;
    label: string;
};
export type PkComboboxFetchHandler = (query: string, signal: AbortSignal) => Promise<PkComboboxAsyncOption[]>;
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
export declare class PkCombobox extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): PkValidator[];
    assumeInteractionOn: string[];
    open: boolean;
    multiple: boolean;
    placement: PkPopupPlacement;
    /** Gap between the control and listbox panel in px (default: 6). */
    sideOffset: number;
    clearable: boolean;
    withClear: boolean;
    allowCreate: boolean;
    allowCustomValue: boolean;
    /** When true, the first matching option is highlighted on open or when filtering. */
    autoHighlight: boolean;
    /** When true, the control shows a trigger button and the search field renders inside the popup. */
    popupMode: boolean;
    searchPlaceholder: string;
    invalid: boolean;
    size: PkComboboxSize;
    /** When `full`, the control stretches to the host width. */
    width?: 'full';
    /** Empty by default — consumers opt in when a prompt is useful. */
    placeholder: string;
    emptyMessage: string;
    value: string;
    defaultValue: string;
    values: string[];
    defaultValues: string[];
    label: string;
    instructions: string;
    ariaLabel: string | null;
    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Mirrors Base UI `Combobox` — default: `true`.
     */
    loopFocus: boolean;
    /** Custom filter — `(option, query) => boolean`. Defaults to label/value substring match. */
    filter: PkComboboxFilter | null;
    /**
     * When true, options are loaded via `fetchOptions` as the user types instead of
     * filtering static `pk-option` children.
     */
    async: boolean;
    /** Message shown while async results are loading. */
    loadingMessage: string;
    /** Message shown before the user types in async mode. */
    startTypingMessage: string;
    /** Remote search handler — `(query, signal) => Promise<options>`. */
    fetchOptions: PkComboboxFetchHandler | null;
    private readonly hasSlotController;
    private readonly listboxId;
    private readonly inputId;
    private readonly createOptionId;
    private popupElement;
    private controlElement;
    private controlInput?;
    private popupTrigger?;
    private createOptionElement?;
    input: HTMLInputElement;
    private get panelElement();
    private get panelInput();
    private get panelBodyElement();
    private get usesPopupMode();
    private get activeInput();
    /** Combobox keeps focus on the text field and uses `aria-activedescendant` for highlight. */
    private keepsFocusOnInput;
    private maintainInputFocus;
    private get listScrollContainer();
    private options;
    /** Filter text while the listbox is open — separate from `value`. */
    private inputValue;
    /** True once the user edits the input after the current open cycle (open-cycle edit tracking). */
    private hasInputSinceOpening;
    private highlightedIndex;
    private createOptionHighlighted;
    private closing;
    private panelAnimated;
    private dismissRegistered;
    private panelEventTarget;
    private optionsObserver?;
    private liveRegion?;
    private fetchAbortController?;
    private asyncFetchTimer?;
    private asyncFetchRequestId;
    private selectedOptionMeta;
    private asyncLoading;
    private asyncError;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    protected get validationTarget(): HTMLElement | undefined;
    protected getAriaMirrorTarget(): HTMLElement | null;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    private syncHasValueAttribute;
    private getOptionElements;
    private handleOptionsMutation;
    private refreshOptions;
    private syncOptions;
    /** Portaled listbox options are outside the host tree — listen on the panel instead. */
    private bindPanelEvents;
    private unbindPanelEvents;
    private isOptionInHiddenGroup;
    private defaultFilter;
    private matchesFilter;
    private getFilterQuery;
    private getVisibleOptions;
    private getEnabledVisibleOptions;
    private getSelectedOptions;
    private getSelectedOption;
    private get usesAsyncSearch();
    private getSelectedLabel;
    private clearAsyncOptionNodes;
    private renderAsyncOptionNodes;
    private mergeAsyncItems;
    private syncSelectedOptionMeta;
    private scheduleAsyncFetch;
    private runAsyncFetch;
    private getAsyncStatusMessage;
    private shouldShowAsyncEmpty;
    private isSelected;
    private getDisplayInputValue;
    private getTriggerDisplayValue;
    private isTriggerPlaceholder;
    private hasSelection;
    private shouldShowCreateOption;
    private getListboxNavItems;
    private applySelection;
    private syncValueInput;
    private syncHighlightedIndexToSelection;
    private resetHighlightedIndexOnOpen;
    private syncHighlight;
    private getActiveDescendantId;
    private announceFilterResults;
    private togglePanel;
    show(): Promise<void>;
    hide(source?: PkOverlaySource): Promise<void>;
    private openPanel;
    private commitCustomValueIfAllowed;
    private commitInputOnClose;
    private shouldCommitCustomValueOnClose;
    private closePanel;
    private waitForExitAnimation;
    private shouldReturnFocusToInput;
    private registerDismissHandlers;
    private unregisterDismissHandlers;
    private isPointerInside;
    private onDocumentPointerDown;
    private onDocumentKeyDown;
    private handleOptionSelect;
    private handleCreateOption;
    private handleOptionHighlight;
    private removeTag;
    private handleClear;
    private emitValueChange;
    private handleInput;
    private handleControlMouseDown;
    private handleTriggerKeyDown;
    private handleInputKeyDown;
    private handleListboxKeyDownEvent;
    private onListboxKeyDown;
    private handleCreateMouseEnter;
    private handleCreateKeyDown;
    private renderHostDecorationSlot;
    private renderChevronButton;
    private renderTags;
    private shouldShowPlaceholder;
    private renderInput;
    private renderPanelInput;
    private renderPopupTrigger;
    private renderControlContent;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-combobox': PkCombobox;
    }
}
//# sourceMappingURL=pk-combobox.d.ts.map