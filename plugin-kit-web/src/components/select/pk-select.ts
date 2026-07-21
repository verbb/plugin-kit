import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { PropertyValues } from 'lit';

import { chevronDown, renderIconHtml } from '../../icons/index.js';

import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../a11y/dismissible-stack.js';
import { scrollIntoView } from '../../a11y/scroll-lock.js';
import { uniqueId } from '../../a11y/focus.js';
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
    createTypeToSelectHandler,
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
import type { PkOption } from './pk-option.js';
import type { PkOptionGroup } from './pk-option-group.js';
import { pkSelectStyles } from './pk-select.styles.js';

export type PkSelectSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

const CHEVRON_ICON = renderIconHtml(chevronDown);

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
@customElement('pk-select')
export class PkSelect extends PkFormAssociatedElement {
    static override styles = pkSelectStyles;

    static override get validators(): PkValidator[] {
        return [
            ...super.validators,
            MirrorValidator(),
            {
                observedAttributes: ['required'],
                checkValidity: (element) => {
                    const select = element as PkSelect;
                    const result = {
                        message: 'Please select an item in the list.',
                        isValid: true,
                        invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
                    };

                    if (!select.required) {
                        return result;
                    }

                    const missing = select.multiple ? select.values.length === 0 : !select.value;

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

    /** Gap between the trigger and listbox panel in px (default: 4). */
    @property({ attribute: 'side-offset', type: Number })
    sideOffset = 4;

    @property({ type: Boolean, reflect: true })
    clearable = false;

    @property({ attribute: 'with-clear', type: Boolean })
    withClear = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    size: PkSelectSize = 'default';

    /** When `full`, the trigger stretches to the host width. */
    @property({ reflect: true })
    width?: 'full';

    /** Empty by default — consumers opt in when a prompt is useful. */
    @property()
    placeholder = '';

    @property()
    value = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property({ type: Array, attribute: false })
    values: string[] = [];

    @property({ attribute: false })
    defaultValues: string[] = [];

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /**
     * Whether arrow-key focus loops from the last option back to the first (and vice versa).
     * Base UI `Select` has no equivalent; default: `false`.
     */
    @property({ attribute: 'loop-focus', type: Boolean })
    loopFocus = false;

    private readonly hasSlotController = new HasSlotController(this, 'start', 'end');

    private readonly listboxId = uniqueId('pk-select-listbox');
    private readonly triggerId = uniqueId('pk-select-trigger');

    @query('.trigger-start')
    private triggerStartElement?: HTMLSpanElement;

    @query('pk-popup')
    private popupElement!: PkPopup;

    @query('.control')
    private controlElement!: HTMLElement;

    @query('button.control, .control > button.trigger')
    private triggerButton?: HTMLButtonElement;

    @query('.value-input')
    override input!: HTMLInputElement;

    private get panelElement(): HTMLDivElement | null {
        return this.popupElement?.getContentElement() as HTMLDivElement | null ?? null;
    }

    private options: PkOption[] = [];

    @state()
    private highlightedIndex = 0;

    private dismissRegistered = false;
    private panelEventTarget: HTMLElement | null = null;
    private typeToSelect = createTypeToSelectHandler([], () => {});
    private optionsObserver?: MutationObserver;

    /** True while the shared popup-content exit animation is running. */
    @state()
    private closing = false;

    /** Gates `data-open` so enter motion starts after Floating UI places the panel. */
    @state()
    private panelAnimated = false;

    override connectedCallback(): void {
        this.refreshOptions();
        super.connectedCallback();
        this.addEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
        this.addEventListener('keydown', this.onKeyDown);
        this.optionsObserver = new MutationObserver(() => {
            this.handleOptionsMutation({ render: true });
        });
        this.optionsObserver.observe(this, { childList: true, subtree: true });
    }

    override disconnectedCallback(): void {
        this.unbindPanelEvents();
        this.removeEventListener('pk-listbox-keydown', this.handleListboxKeyDownEvent as EventListener);
        this.removeEventListener('keydown', this.onKeyDown);
        this.optionsObserver?.disconnect();
        void this.closePanel('api');
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('values') || changed.has('multiple')) {
            this.applySelection();
        }

        super.updated(changed);
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
        this.updateTypeToSelect();

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

    protected override get validationTarget(): HTMLElement | undefined {
        return this.input ?? this.triggerButton ?? this.controlElement;
    }

    protected override getAriaMirrorTarget(): HTMLElement | null {
        return this.triggerButton ?? this.controlElement ?? null;
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

    private isOptionInHiddenGroup(option: PkOption): boolean {
        const group = option.closest('pk-option-group') as PkOptionGroup | null;

        return Boolean(group?.hidden);
    }

    private getVisibleOptions(): PkOption[] {
        return this.options.filter((option) => !this.isOptionInHiddenGroup(option));
    }

    private getEnabledVisibleOptions(): PkOption[] {
        return this.getVisibleOptions().filter((option) => !option.disabled);
    }

    private isSelected(value: string): boolean {
        if (this.multiple) {
            return this.values.includes(value);
        }

        return this.value === value;
    }

    private applySelection(): void {
        const visible = this.getVisibleOptions();

        for (const option of this.options) {
            option.selected = this.isSelected(option.value);
            option.hidden = !visible.includes(option);
            option.optionId = `${this.listboxId}-option-${option.value}`;
        }

        for (const group of this.querySelectorAll('pk-option-group')) {
            const groupOptions = [...group.querySelectorAll('pk-option')];
            group.hidden = groupOptions.length > 0 && groupOptions.every((option) => option.hidden);
        }

        syncListboxSeparators(this);

        this.syncValueInput();
        this.syncTriggerDecorations();

        if (this.open) {
            this.syncHighlight();
        }
    }

    private syncValueInput(): void {
        if (!this.input) {
            return;
        }

        if (this.multiple) {
            this.input.value = this.values.join(',');
            this.input.required = this.required;
            return;
        }

        this.input.value = this.value;
        this.input.required = this.required;
    }

    private getDisplayValue(): string {
        if (this.multiple) {
            const labels = this.getSelectedOptions()
                .map((option) => option.getLabel());

            return labels.length > 0 ? labels.join(', ') : this.placeholder;
        }

        const selected = this.options.find((option) => option.value === this.value);

        return selected?.getLabel() || this.placeholder;
    }

    private getSelectedOptions(): PkOption[] {
        return this.options.filter((option) => this.isSelected(option.value));
    }

    /**
     * Mirror the selected option's `slot="start"` decorations into the trigger —
     * `pk-select` start/end decoration pattern.
     */
    private syncTriggerDecorations(): void {
        const container = this.triggerStartElement;

        if (!container || this.multiple) {
            return;
        }

        container.replaceChildren();
        container.classList.remove('has-decoration');

        const selected = this.options.find((option) => option.value === this.value);

        if (!selected) {
            return;
        }

        for (const element of selected.getStartElements()) {
            container.append(element.cloneNode(true));
        }

        container.classList.toggle('has-decoration', container.childElementCount > 0);
    }

    private hasSelection(): boolean {
        if (this.multiple) {
            return this.values.length > 0;
        }

        // Empty-string values are valid when an option declares them (e.g. "Default").
        return this.options.some((option) => option.value === this.value) || Boolean(this.value);
    }

    private syncHighlightedIndexToSelection(): void {
        if (this.multiple) {
            return;
        }

        const enabled = this.getEnabledVisibleOptions();

        if (enabled.length === 0) {
            return;
        }

        const selectedIndex = enabled.findIndex((option) => option.value === this.value);

        if (selectedIndex >= 0) {
            this.highlightedIndex = selectedIndex;
        }
    }

    private syncHighlight(): void {
        const enabled = this.getEnabledVisibleOptions();

        for (const option of this.options) {
            option.highlighted = false;
            option.focusIndex = -1;
        }

        if (enabled.length === 0) {
            this.highlightedIndex = 0;
            return;
        }

        if (this.highlightedIndex >= enabled.length) {
            this.highlightedIndex = 0;
        }

        const highlighted = enabled[this.highlightedIndex];

        if (highlighted && this.panelElement) {
            highlighted.highlighted = true;
            highlighted.focusIndex = 0;
            scrollIntoView(highlighted, this.panelElement, 'vertical', 'auto');
        }
    }

    private updateTypeToSelect(): void {
        this.typeToSelect = createTypeToSelectHandler(
            this.getEnabledVisibleOptions() as unknown as HTMLElement[],
            (index) => {
                this.highlightedIndex = index;
                this.syncHighlight();
                this.getEnabledVisibleOptions()[index]?.focusControl();
            },
        );
    }

    private togglePanel = (event?: Event): void => {
        event?.preventDefault();
        event?.stopPropagation();

        if (this.disabled || this.closing) {
            return;
        }

        if (this.open) {
            void this.closePanel('api');
        } else {
            void this.openPanel();
        }
    };

    private getPopupAnchor(): HTMLElement | null {
        return this.controlElement ?? null;
    }

    private getActiveDescendantId(): string | null {
        const enabled = this.getEnabledVisibleOptions();
        const highlighted = enabled[this.highlightedIndex];
        return highlighted?.optionId || null;
    }

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
        const anchor = this.getPopupAnchor();

        if (!anchor || this.closing) {
            return Promise.resolve();
        }

        this.dispatchEvent(new PkShowEvent());
        this.closing = false;
        this.panelAnimated = false;
        this.open = true;
        this.popupElement.active = true;
        this.applySelection();
        this.syncHighlightedIndexToSelection();

        if (this.panelElement) {
            this.panelElement.hidden = false;
            // Seed side before first paint so enter keyframes pick a direction.
            syncPopupPlacementAnimation(this.panelElement, this.placement);
        }

        const anchorWidth = anchor.getBoundingClientRect().width;
        this.style.setProperty('--pk-select-anchor-width', `${anchorWidth}px`);
        this.registerDismissHandlers();
        this.syncHighlight();
        this.updateTypeToSelect();

        return this.updateComplete.then(async () => {
            const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, {
                requireEvent: true,
            });

            if (this.panelElement) {
                syncPopupPlacementAnimation(this.panelElement, placement);
            }

            // Flip data-open after placement so the shared enter animation can run.
            this.panelAnimated = true;
            this.bindPanelEvents();
            this.refreshOptions();
            this.getEnabledVisibleOptions()[this.highlightedIndex]?.focusControl();

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

        this.typeToSelect.reset();
        this.unbindPanelEvents();
        this.unregisterDismissHandlers();

        this.closing = true;
        this.panelAnimated = false;
        await this.waitForExitAnimation();

        this.open = false;
        this.closing = false;
        this.panelAnimated = false;

        if (this.panelElement) {
            this.panelElement.hidden = true;
            this.panelElement.removeAttribute('data-side');
        }

        this.popupElement.active = false;

        this.dispatchEvent(new PkAfterHideEvent());
        this.dispatchEvent(new CustomEvent('pk-open-change', {
            detail: { open: false },
            bubbles: true,
            composed: true,
        }));

        if (this.shouldReturnFocusToTrigger(source)) {
            this.triggerButton?.focus({ preventScroll: true });
        } else {
            this.triggerButton?.blur();
        }
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

    /** Base UI skips return focus on outside press — avoids an unwanted focus ring after light dismiss. */
    private shouldReturnFocusToTrigger(source: PkOverlaySource): boolean {
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

    private onDocumentPointerDown = (event: PointerEvent): void => {
        if (this.isPointerInside(event)) {
            return;
        }

        void this.closePanel('light-dismiss');
    };

    private isPointerInside(event: PointerEvent): boolean {
        return isPointerInsideOverlay(event, {
            anchor: this.getPopupAnchor(),
            panel: this.panelElement,
        });
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

        if (!isEventInsideOverlay(event, {
            anchor: this.getPopupAnchor(),
            panel: this.panelElement,
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
                ? this.values.filter((v) => v !== value)
                : [...this.values, value];
        } else {
            this.value = value;
            void this.closePanel('api');
        }

        this.applySelection();
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
    }

    private handleClear(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        if (this.multiple) {
            this.values = [];
        } else {
            this.value = '';
        }

        this.applySelection();
        this.dispatchEvent(new PkClearEvent());
        this.emitValueChange();
        this.triggerButton?.focus();
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

    private onKeyDown = (event: KeyboardEvent): void => {
        if (!this.open) {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                void this.openPanel();
            }

            return;
        }

        this.onListboxKeyDown(event);
    };

    private onListboxKeyDown(event: KeyboardEvent): void {
        const enabled = this.getEnabledVisibleOptions();

        this.highlightedIndex = handleListboxKeyDown(event, {
            items: enabled as unknown as HTMLElement[],
            currentIndex: this.highlightedIndex,
            multiselect: this.multiple,
            loop: this.loopFocus,
            onSelect: (index) => {
                this.highlightedIndex = index;
                this.syncHighlight();
            },
            focusItem: (index) => {
                enabled[index]?.focusControl();
            },
            onClose: () => { void this.closePanel('escape'); },
        });

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            this.typeToSelect.handleKey(event);
        }
    }

    private handleListboxKeyDownEvent = (event: CustomEvent<{ keyboardEvent: KeyboardEvent }>): void => {
        if (!this.open) {
            return;
        }

        this.onListboxKeyDown(event.detail.keyboardEvent);
    };

    private renderTags() {
        return this.getSelectedOptions().map((option) => html`
            <span class="tag" part="tag">
                <span class="tag-label">${option.getLabel()}</span>
                <button
                    type="button"
                    class="tag-remove"
                    part="tag-remove"
                    aria-label=${`Remove ${option.getLabel()}`}
                    @click=${(event: Event) => this.removeTag(option.value, event)}
                >
                    ×
                </button>
            </span>
        `);
    }

    private renderChevronIcon() {
        return html`
            <span class="icon" aria-hidden="true">${unsafeSVG(CHEVRON_ICON)}</span>
        `;
    }

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

    override render() {
        const displayValue = this.getDisplayValue();
        const isPlaceholder = !this.hasSelection();
        const showClear = (this.clearable || this.withClear) && this.hasSelection() && !this.disabled;

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
            ${this.multiple
                ? html`
                    <div
                        part="control"
                        class=${classMap({
                            control: true,
                            'is-disabled': this.disabled,
                        })}
                    >
                        ${this.renderHostDecorationSlot('start')}
                        ${this.hasSelection()
                            ? html`
                                <div class="tags" part="tags">${this.renderTags()}</div>
                                ${showClear
                                    ? html`
                                        <button
                                            type="button"
                                            class="clear-button"
                                            part="clear-button"
                                            aria-label="Clear selection"
                                            @click=${this.handleClear}
                                        >
                                            ×
                                        </button>
                                    `
                                    : nothing}
                            `
                            : html`
                                <button
                                    part="trigger"
                                    type="button"
                                    class="trigger"
                                    id=${this.triggerId}
                                    ?disabled=${this.disabled}
                                    aria-label=${this.ariaLabel ?? nothing}
                                    aria-haspopup="listbox"
                                    aria-expanded=${this.open ? 'true' : 'false'}
                                    aria-controls=${this.listboxId}
                                    @click=${this.togglePanel}
                                >
                                    <span class="value is-placeholder">${this.placeholder}</span>
                                </button>
                            `}
                        ${this.renderHostDecorationSlot('end')}
                        <button
                            type="button"
                            class="trigger trigger--icon"
                            part="trigger expand-button"
                            aria-label="Toggle options"
                            ?disabled=${this.disabled}
                            @click=${this.togglePanel}
                        >
                            ${this.renderChevronIcon()}
                        </button>
                    </div>
                `
                : html`
                    <button
                        part="control"
                        type="button"
                        class=${classMap({
                            control: true,
                            'is-disabled': this.disabled,
                        })}
                        id=${this.triggerId}
                        ?disabled=${this.disabled}
                        aria-label=${this.ariaLabel ?? nothing}
                        aria-haspopup="listbox"
                        aria-expanded=${this.open ? 'true' : 'false'}
                        aria-controls=${this.listboxId}
                        @click=${this.togglePanel}
                    >
                        ${this.renderHostDecorationSlot('start')}
                        <span part="trigger-start" class="trigger-start"></span>
                        <span
                            class=${classMap({
                                value: true,
                                'is-placeholder': isPlaceholder,
                            })}
                        >${displayValue}</span>
                        ${showClear
                            ? html`
                                <span
                                    class="clear-button"
                                    part="clear-button"
                                    role="button"
                                    tabindex="-1"
                                    aria-label="Clear selection"
                                    @click=${this.handleClear}
                                >
                                    ×
                                </span>
                            `
                            : nothing}
                        ${this.renderHostDecorationSlot('end')}
                        ${this.renderChevronIcon()}
                    </button>
                `}
            <pk-popup
                .anchor=${this.getPopupAnchor() ?? ''}
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
                    id=${this.listboxId}
                    role="listbox"
                    aria-multiselectable=${this.multiple ? 'true' : 'false'}
                    tabindex="-1"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? '' : nothing}
                    @slotchange=${this.syncOptions}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-select': PkSelect;
    }
}
