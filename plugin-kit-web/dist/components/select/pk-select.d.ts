import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkValidator } from '../../validators/types.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
export type PkSelectSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * Select — slotted `pk-option` children, form-associated, clearable, multiselect tags.
 *
 * @slot start - Presentational decoration before the trigger label (e.g. icons)
 * @slot end - Presentational decoration before the expand chevron
 * @slot - `pk-option` and `pk-option-group` items
 *
 * @csspart control - Trigger control wrapper
 * @csspart start - Host start decoration container
 * @csspart end - Host end decoration container
 * @csspart trigger-start - Mirrored start decoration from the selected option
 * @csspart trigger - Select trigger button
 * @csspart panel - Listbox panel
 *
 * @cssproperty [--pk-select-fill=var(--pk-color-slate-250)] - Closed trigger background.
 * @cssproperty [--pk-select-fill-hover=var(--pk-color-slate-300)] - Closed trigger hover background.
 * @cssproperty [--pk-select-anchor-width] - Panel min-width; set from the trigger width while open.
 * @cssproperty [--pk-select-decoration-size=0.875rem] - Start/end decoration glyph size.
 *
 * @event pk-show - Emitted when the listbox begins to open.
 * @event pk-after-show - Emitted after the listbox opens and enter motion finishes.
 * @event {{ source: string }} pk-hide - Emitted when the listbox begins to close (cancelable).
 * @event pk-after-hide - Emitted after the listbox closes and exit motion finishes.
 * @event {{ open: boolean }} pk-open-change - Emitted when `open` changes after show/hide settles.
 * @event {{ value: string, values: string[] }} pk-change - Emitted when the selection changes.
 * @event pk-clear - Emitted when the value is cleared via the clear control.
 * @event pk-invalid - Emitted when constraint validation fails.
 * @event input - Native input event when the selection changes.
 * @event change - Native change event when the selection changes.
 *
 * @method show - Opens the listbox.
 * @method hide - Closes the listbox.
 * @method checkValidity - Runs constraint validation without showing the browser UI.
 * @method reportValidity - Runs constraint validation and shows the browser UI when invalid.
 * @method setCustomValidity - Sets or clears a custom validation message.
 * @method resetValidity - Clears custom errors and re-syncs validity state.
 *
 * @dependency pk-popup - Positioned listbox panel host.
 */
export declare class PkSelect extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): PkValidator[];
    assumeInteractionOn: string[];
    /** Whether the listbox is open. Prefer `show()` / `hide()` for animated transitions. */
    open: boolean;
    /** Allow more than one option to be selected (tag display). */
    multiple: boolean;
    /** Preferred listbox placement; may flip to stay in viewport. */
    placement: PkPopupPlacement;
    /** Gap between the trigger and listbox panel in px. */
    sideOffset: number;
    /** Alias of `with-clear` — shows a clear control when the value is non-empty. */
    clearable: boolean;
    /** Shows a clear control when the value is non-empty. */
    withClear: boolean;
    /** Marks the control invalid (visual + ARIA). */
    invalid: boolean;
    /** Shared CP size scale for the closed trigger and list items. */
    size: PkSelectSize;
    /** When `full`, the trigger stretches to the host width. */
    width?: 'full';
    /** Prompt shown when nothing is selected. Empty by default. */
    placeholder: string;
    /** Selected value (single-select). Empty string when cleared. */
    value: string;
    /** Initial value before user interaction (form reset baseline). */
    defaultValue: string;
    /** Selected values when `multiple` is set. Property-only (not an attribute). */
    values: string[];
    /** Initial multi values before user interaction. Property-only. */
    defaultValues: string[];
    /** Accessible name for the trigger when no visible label is present. */
    ariaLabel: string | null;
    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Base UI `Select` has no equivalent; default: `false`.
     */
    loopFocus: boolean;
    private readonly hasSlotController;
    private readonly listboxId;
    private readonly triggerId;
    private triggerStartElement?;
    private popupElement;
    private controlElement;
    private triggerButton?;
    input: HTMLInputElement;
    private get panelElement();
    private options;
    private highlightedIndex;
    private dismissRegistered;
    private panelEventTarget;
    private typeToSelect;
    private optionsObserver?;
    /** True while the shared popup-content exit animation is running. */
    private closing;
    /** Gates `data-open` so enter motion starts after Floating UI places the panel. */
    private panelAnimated;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    private getOptionElements;
    private handleOptionsMutation;
    private refreshOptions;
    private syncOptions;
    /** Portaled listbox options are outside the host tree — listen on the panel instead. */
    private bindPanelEvents;
    private unbindPanelEvents;
    protected get validationTarget(): HTMLElement | undefined;
    protected getAriaMirrorTarget(): HTMLElement | null;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    private isOptionInHiddenGroup;
    private getVisibleOptions;
    private getEnabledVisibleOptions;
    private isSelected;
    private applySelection;
    private syncValueInput;
    private getDisplayValue;
    private getSelectedOptions;
    /**
     * Mirror the selected option's `slot="start"` decorations into the trigger —
     * `pk-select` start/end decoration pattern.
     */
    private syncTriggerDecorations;
    private hasSelection;
    private syncHighlightedIndexToSelection;
    private syncHighlight;
    private updateTypeToSelect;
    private togglePanel;
    private getPopupAnchor;
    private getActiveDescendantId;
    /** Opens the listbox. */
    show(): Promise<void>;
    /** Closes the listbox. */
    hide(source?: PkOverlaySource): Promise<void>;
    private openPanel;
    private closePanel;
    private waitForExitAnimation;
    /** Base UI skips return focus on outside press — avoids an unwanted focus ring after light dismiss. */
    private shouldReturnFocusToTrigger;
    private registerDismissHandlers;
    private unregisterDismissHandlers;
    private onDocumentPointerDown;
    private isPointerInside;
    private onDocumentKeyDown;
    private handleOptionSelect;
    private handleOptionHighlight;
    private removeTag;
    private handleClear;
    private emitValueChange;
    private onKeyDown;
    private onListboxKeyDown;
    private handleListboxKeyDownEvent;
    private renderTags;
    private renderChevronIcon;
    private renderHostDecorationSlot;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-select': PkSelect;
    }
}
//# sourceMappingURL=pk-select.d.ts.map