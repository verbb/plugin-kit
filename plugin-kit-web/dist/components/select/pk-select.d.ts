import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkOverlaySource } from '../../events/overlay-lifecycle.js';
import { PkValidator } from '../../validators/types.js';
import { PkPopupPlacement } from '../popup/pk-popup.js';
export type PkSelectSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * Select —  pattern: slotted `pk-option` children, form-associated, clearable, multiselect tags.
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
 */
export declare class PkSelect extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult[];
    static get validators(): PkValidator[];
    assumeInteractionOn: string[];
    open: boolean;
    multiple: boolean;
    placement: PkPopupPlacement;
    /** Gap between the trigger and listbox panel in px (default: 4). */
    sideOffset: number;
    clearable: boolean;
    withClear: boolean;
    invalid: boolean;
    size: PkSelectSize;
    /** When `full`, the trigger stretches to the host width. */
    width?: 'full';
    /** Empty by default — consumers opt in when a prompt is useful. */
    placeholder: string;
    value: string;
    defaultValue: string;
    values: string[];
    defaultValues: string[];
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
    show(): Promise<void>;
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