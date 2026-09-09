import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkValidator } from '../../validators/types.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
import { PkAsyncOptionFetchHandler, PkAsyncOptionItem } from '../../utils/async-option-fetch.js';
import { PkOptionFilter } from '../../utils/option-filter.js';
export type PkAutocompleteSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type PkAutocompleteFilter = PkOptionFilter;
export type PkAutocompleteAsyncOption = PkAsyncOptionItem;
export type PkAutocompleteFetchHandler = PkAsyncOptionFetchHandler;
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
export declare class PkAutocomplete extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): PkValidator[];
    assumeInteractionOn: string[];
    open: boolean;
    placement: PkPopupPlacement;
    /** Gap between the control and listbox panel in px (default: 6). */
    sideOffset: number;
    clearable: boolean;
    withClear: boolean;
    /** When true, the first matching option is highlighted on open or when filtering. */
    autoHighlight: boolean;
    invalid: boolean;
    size: PkAutocompleteSize;
    /** When `full`, the control stretches to the host width. */
    width?: 'full';
    /** Empty by default — consumers opt in when a prompt is useful. */
    placeholder: string;
    emptyMessage: string;
    /** Freeform field value — always mirrors the visible input text. */
    value: string;
    defaultValue: string;
    label: string;
    instructions: string;
    ariaLabel: string | null;
    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Default: `true` (same as Combobox).
     */
    loopFocus: boolean;
    /** Custom filter — `(option, query) => boolean`. Defaults to label/value substring match. */
    filter: PkAutocompleteFilter | null;
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
    fetchOptions: PkAutocompleteFetchHandler | null;
    private readonly hasSlotController;
    private readonly listboxId;
    private readonly inputId;
    private popupElement;
    private controlElement;
    private controlInput?;
    input: HTMLInputElement;
    private get panelElement();
    private get panelBodyElement();
    private get listScrollContainer();
    private options;
    private highlightedIndex;
    private closing;
    private panelAnimated;
    private dismissRegistered;
    private panelEventTarget;
    private optionsObserver?;
    private liveRegion?;
    private asyncFetcher;
    private asyncLoading;
    private asyncError;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(changed: PropertyValues): void;
    updated(changed: PropertyValues): void;
    protected get validationTarget(): HTMLElement | undefined;
    protected getAriaMirrorTarget(): HTMLElement | null;
    protected syncFormValue(): void;
    private syncHasValueAttribute;
    private refreshOptions;
    private handleOptionsMutation;
    private bindPanelEvents;
    private unbindPanelEvents;
    private isOptionInHiddenGroup;
    private getFilterQuery;
    private get usesAsyncSearch();
    private getVisibleOptions;
    private getEnabledVisibleOptions;
    private clearAsyncOptionNodes;
    private renderAsyncOptionNodes;
    private scheduleAsyncFetch;
    private ensureAsyncFetcher;
    private getAsyncStatusMessage;
    private applyOptionState;
    private syncValueInput;
    private resetHighlightedIndexOnOpen;
    private syncHighlight;
    private getActiveDescendantId;
    private announceFilterResults;
    private openPanel;
    private closePanel;
    private registerDismissHandlers;
    private unregisterDismissHandlers;
    private onDocumentPointerDown;
    private onDocumentKeyDown;
    private handleOptionSelect;
    private handleOptionHighlight;
    private commitValue;
    private handleClear;
    private emitValueChange;
    private handleInput;
    private handleControlMouseDown;
    private handleInputKeyDown;
    private onListboxKeyDown;
    private handleListboxKeyDownEvent;
    hide(source?: PkOverlaySource): Promise<void>;
    private renderHostDecorationSlot;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-autocomplete': PkAutocomplete;
    }
}
//# sourceMappingURL=pk-autocomplete.d.ts.map