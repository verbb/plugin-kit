import { d as registerDismissible, f as unregisterDismissible, n as uniqueId, s as scrollIntoView, u as isTopDismissible } from "./pk-a11y-Cx5RZvhu.js";
import { a as o, c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, s as iconStyles } from "./pk-base-BlxAYXJD.js";
import { m as chevronDown } from "./icons-B1i-oRoD.js";
import { t as MirrorValidator } from "./mirror-validator-C5XrXPaq.js";
import { t as HasSlotController } from "./has-slot-BGJeJdHr.js";
import { t as PkClearEvent } from "./pk-clear-BMZUzwDt.js";
import { n as renderIconHtml } from "./render-DApFfV9S.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-C3tSQ3UR.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "./popup-placement-animation-WlEXnS85.js";
import { t as popupContentAnimationStyles } from "./popup-content-animation.styles-S6CK-zPp.js";
import { n as isPointerInsideOverlay, t as isEventInsideOverlay } from "./popup-pointer-BC4n_sNb.js";
import { a as isListboxTypeToSelectKey, i as handleListboxKeyDown, n as LISTBOX_NAVIGATION_KEYS, r as createTypeToSelectHandler, t as syncListboxSeparators } from "./sync-listbox-separators-Bcja51HC.js";
//#region src/components/select/pk-select.styles.ts
var pkSelectStyles = [popupContentAnimationStyles, i`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            width: fit-content;
            max-width: 100%;
            align-self: flex-start;
            flex: none;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            --pk-select-trigger-border-width: 1px;
            --pk-select-item-min-height: var(--pk-input-height);
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 2rem;
            --pk-select-item-font-size: var(--pk-font-size-base);
            --pk-select-item-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 SelectLabel default: text-xs → 12px */
            --pk-select-group-label-font-size: 12px;
            --pk-select-decoration-size: 0.875rem;
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        :host([width='full']) button.control .icon {
            margin-inline-start: auto;
        }

        .control {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            /* Fill the host when consumers set min-width/width on :host. */
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 0;
            padding: var(--pk-select-item-padding-block) var(--pk-select-item-padding-inline);
            border: var(--pk-select-trigger-border-width) solid transparent;
            border-radius: var(--pk-radius-lg);
            --pk-select-fill: var(--pk-color-slate-250);
            --pk-select-fill-hover: var(--pk-color-slate-300);
            background: var(--pk-select-fill);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-input-control-line-height, 1.25rem);
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        button.control {
            appearance: none;
            -webkit-appearance: none;
            text-align: left;
            background-color: var(--pk-select-fill);
            border: var(--pk-select-trigger-border-width) solid transparent;
        }

        :host(:not([disabled])) .control:hover:not(.is-disabled):not(:disabled),
        :host(:not([disabled])) button.control:hover:not(.is-disabled):not(:disabled) {
            background: var(--pk-select-fill-hover);
        }

        :host(:not([disabled])) button.control:hover:not(.is-disabled):not(:disabled) {
            background-color: var(--pk-select-fill-hover);
        }

        :host(:not([invalid]):not(:state(user-invalid))) button.control:focus-visible,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) button.control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            min-width: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: inherit;
            outline: none;
        }

        .control > .trigger:not(.trigger--icon) {
            flex: 0 1 auto;
            justify-content: flex-start;
        }

        .trigger--icon {
            width: 1.25rem;
        }

        .trigger-start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
        }

        .trigger-start.has-decoration {
            display: inline-flex;
        }

        .control-start,
        .control-end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            line-height: 0;
            color: var(--pk-color-gray-600);
        }

        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            width: var(--pk-select-decoration-size);
            height: var(--pk-select-decoration-size);
        }

        .value {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }

        .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            line-height: 0;
            pointer-events: none;
            color: var(--pk-color-gray-600);
        }

        /* Extra space before the expand chevron (control gap stays for start icon ↔ label). */
        .control > .icon,
        .control > .trigger--icon {
            margin-inline-start: 0.25rem;
        }

        .icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .tags {
            display: flex;
            flex: 0 1 auto;
            flex-wrap: wrap;
            gap: 0.25rem;
            min-width: 0;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            max-width: 10ch;
            padding: 0.125rem 0.375rem;
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-gray-200);
            color: var(--pk-color-gray-800);
            font-size: 12px;
            line-height: 1.3;
        }

        .tag-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .tag-remove {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 0.875rem;
            height: 0.875rem;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
        }

        .tag-remove:hover {
            background: rgb(0 0 0 / 8%);
        }

        .clear-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            flex-shrink: 0;
        }

        .clear-button:hover {
            background: rgb(0 0 0 / 6%);
            color: var(--pk-color-gray-800);
        }

        .value-input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .panel ::slotted(pk-separator) {
            margin: 4px 0;
        }

        .panel {
            width: max-content;
            min-width: var(--pk-select-anchor-width, 8rem);
            max-height: 16rem;
            overflow: auto;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            color: var(--pk-color-gray-700);
            outline: none;
        }

        .panel[hidden] {
            display: none !important;
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) button.control:focus-visible,
        :host([invalid][data-state='focus-visible']) button.control,
        :host(:state(user-invalid)) button.control:focus-visible,
        :host(:state(user-invalid)[data-state='focus-visible']) button.control {
            border-color: var(--pk-color-rose-600);
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 4px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.25;
            /* v1 SelectLabel xs: text-[11px] */
            --pk-select-group-label-font-size: 11px;
            --pk-select-decoration-size: 0.625rem;
        }

        :host([size='xs']) .control {
            border-radius: var(--pk-radius-sm);
            /* Match trigger line-height to the compact item token (default is 1.25rem). */
            line-height: var(--pk-select-item-line-height, 1.25);
        }

        :host([size='xs']) .icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        /* Options live in light DOM; ::slotted pushes size tokens onto each pk-option
         * host so the open listbox matches the trigger (inheritance alone is flaky when
         * the panel is promoted to the popover top layer). */
        :host([size='xs']) ::slotted(pk-option) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 4px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.25;
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host([size='xs']) .panel {
            max-height: 12rem;
        }

        /* Editable-table cells only (class set by pk-editable-table) — compact chip + menu. */
        :host(.cell-pk-control) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 5px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.5rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.2;
            /* Compact table chip — match xs label size. */
            --pk-select-group-label-font-size: 11px;
            --pk-select-decoration-size: 0.625rem;
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host(.cell-pk-control) .control {
            border-radius: var(--pk-radius-sm);
            line-height: var(--pk-select-item-line-height, 1.2);
        }

        :host(.cell-pk-control) ::slotted(pk-option) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 5px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.5rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-line-height: 1.2;
            --pk-select-item-indicator-size: 0.625rem;
        }

        :host(.cell-pk-control) .panel {
            max-height: 11rem;
        }

        :host([size='sm']) {
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 12px;
            --pk-select-item-indicator-inset: 0.625rem;
            /* v1 SelectLabel sm: text-[12px] */
            --pk-select-group-label-font-size: 12px;
            --pk-select-decoration-size: 0.6875rem;
        }

        :host([size='sm']) .control {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .icon svg {
            width: 0.6875rem;
            height: 0.6875rem;
        }

        :host([size='lg']) {
            --pk-select-item-padding-block: 8px;
            --pk-select-item-padding-inline: 12px;
            --pk-select-item-font-size: var(--pk-font-size-base);
            --pk-select-item-indicator-inset: 0.75rem;
            /* v1 SelectLabel lg: text-sm → 14px */
            --pk-select-group-label-font-size: 14px;
            --pk-select-decoration-size: 1rem;
        }

        :host([size='xl']) {
            --pk-select-item-padding-block: 10px;
            --pk-select-item-padding-inline: 14px;
            --pk-select-item-padding-inline-end: 2.25rem;
            --pk-select-item-font-size: var(--pk-font-size-base);
            --pk-select-item-indicator-inset: 0.875rem;
            /* v1 SelectLabel xl: text-base → 16px */
            --pk-select-group-label-font-size: 16px;
            --pk-select-decoration-size: 1.125rem;
        }

        :host([size='xl']) .icon svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`];
//#endregion
//#region src/components/select/pk-select.ts
var CHEVRON_ICON = renderIconHtml(chevronDown);
var PkSelect = class PkSelect extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.open = false;
		this.multiple = false;
		this.placement = "bottom-start";
		this.sideOffset = 4;
		this.clearable = false;
		this.withClear = false;
		this.invalid = false;
		this.size = "default";
		this.placeholder = "";
		this.value = "";
		this.defaultValue = "";
		this.values = [];
		this.defaultValues = [];
		this.ariaLabel = null;
		this.loopFocus = false;
		this.hasSlotController = new HasSlotController(this, "start", "end");
		this.listboxId = uniqueId("pk-select-listbox");
		this.triggerId = uniqueId("pk-select-trigger");
		this.options = [];
		this.highlightedIndex = 0;
		this.dismissRegistered = false;
		this.panelEventTarget = null;
		this.typeToSelect = createTypeToSelectHandler([], () => {});
		this.closing = false;
		this.panelAnimated = false;
		this.handleOptionsMutation = (options = {}) => {
			const next = this.getOptionElements();
			const changed = next.length !== this.options.length || next.some((option, index) => option !== this.options[index]);
			this.options = next;
			this.applySelection();
			this.updateTypeToSelect();
			if (options.render !== false && changed) this.requestUpdate();
		};
		this.syncOptions = () => {
			this.handleOptionsMutation({ render: true });
		};
		this.togglePanel = (event) => {
			event?.preventDefault();
			event?.stopPropagation();
			if (this.disabled || this.closing) return;
			if (this.open) this.closePanel("api");
			else this.openPanel();
		};
		this.onDocumentPointerDown = (event) => {
			if (this.isPointerInside(event)) return;
			this.closePanel("light-dismiss");
		};
		this.onDocumentKeyDown = (event) => {
			if (!this.open) return;
			if (event.key === "Escape") {
				if (!isTopDismissible(this)) return;
				event.preventDefault();
				event.stopPropagation();
				this.closePanel("escape");
				return;
			}
			if (!(LISTBOX_NAVIGATION_KEYS.has(event.key) || isListboxTypeToSelectKey(event))) return;
			if (!isEventInsideOverlay(event, {
				anchor: this.getPopupAnchor(),
				panel: this.panelElement
			})) return;
			event.preventDefault();
			event.stopPropagation();
			this.onListboxKeyDown(event);
		};
		this.handleOptionSelect = (event) => {
			const { value } = event.detail;
			if (this.multiple) this.values = this.values.includes(value) ? this.values.filter((v) => v !== value) : [...this.values, value];
			else {
				this.value = value;
				this.closePanel("api");
			}
			this.applySelection();
			this.emitValueChange();
		};
		this.handleOptionHighlight = (event) => {
			if (!this.open) return;
			const index = this.getEnabledVisibleOptions().findIndex((option) => option.value === event.detail.value);
			if (index === -1 || index === this.highlightedIndex) return;
			this.highlightedIndex = index;
			this.syncHighlight();
		};
		this.onKeyDown = (event) => {
			if (!this.open) {
				if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					this.openPanel();
				}
				return;
			}
			this.onListboxKeyDown(event);
		};
		this.handleListboxKeyDownEvent = (event) => {
			if (!this.open) return;
			this.onListboxKeyDown(event.detail.keyboardEvent);
		};
	}
	static {
		this.styles = pkSelectStyles;
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			{
				observedAttributes: ["required"],
				checkValidity: (element) => {
					const select = element;
					const result = {
						message: "Please select an item in the list.",
						isValid: true,
						invalidKeys: []
					};
					if (!select.required) return result;
					if (!(select.multiple ? select.values.length === 0 : !select.value)) return result;
					result.isValid = false;
					result.invalidKeys.push("valueMissing");
					return result;
				}
			}
		];
	}
	get panelElement() {
		return this.popupElement?.getContentElement() ?? null;
	}
	connectedCallback() {
		this.refreshOptions();
		super.connectedCallback();
		this.addEventListener("pk-listbox-keydown", this.handleListboxKeyDownEvent);
		this.addEventListener("keydown", this.onKeyDown);
		this.optionsObserver = new MutationObserver(() => {
			this.handleOptionsMutation({ render: true });
		});
		this.optionsObserver.observe(this, {
			childList: true,
			subtree: true
		});
	}
	disconnectedCallback() {
		this.unbindPanelEvents();
		this.removeEventListener("pk-listbox-keydown", this.handleListboxKeyDownEvent);
		this.removeEventListener("keydown", this.onKeyDown);
		this.optionsObserver?.disconnect();
		this.closePanel("api");
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") || changed.has("values") || changed.has("multiple")) this.applySelection();
		super.updated(changed);
	}
	getOptionElements() {
		const portaled = this.popupElement?.getContentElement()?.querySelectorAll("pk-option");
		if (portaled && portaled.length > 0) return [...portaled];
		return [...this.querySelectorAll("pk-option")];
	}
	refreshOptions() {
		this.handleOptionsMutation({ render: false });
	}
	/** Portaled listbox options are outside the host tree — listen on the panel instead. */
	bindPanelEvents() {
		const panel = this.panelElement;
		if (!panel || panel === this.panelEventTarget) return;
		this.unbindPanelEvents();
		this.panelEventTarget = panel;
		panel.addEventListener("pk-option-select", this.handleOptionSelect);
		panel.addEventListener("pk-option-highlight", this.handleOptionHighlight);
		panel.addEventListener("pk-listbox-keydown", this.handleListboxKeyDownEvent);
	}
	unbindPanelEvents() {
		if (!this.panelEventTarget) return;
		this.panelEventTarget.removeEventListener("pk-option-select", this.handleOptionSelect);
		this.panelEventTarget.removeEventListener("pk-option-highlight", this.handleOptionHighlight);
		this.panelEventTarget.removeEventListener("pk-listbox-keydown", this.handleListboxKeyDownEvent);
		this.panelEventTarget = null;
	}
	get validationTarget() {
		return this.input ?? this.triggerButton ?? this.controlElement;
	}
	getAriaMirrorTarget() {
		return this.triggerButton ?? this.controlElement ?? null;
	}
	syncFormValue() {
		if (!this.name) {
			this.setFormValue(null);
			return;
		}
		if (this.multiple) {
			const formData = new FormData();
			for (const item of this.values) formData.append(this.name, item);
			this.setFormValue(formData);
			return;
		}
		this.setFormValue(this.value || "");
	}
	resetToDefaultValue() {
		if (this.multiple) this.values = [...this.defaultValues];
		else this.value = this.defaultValue;
		this.applySelection();
	}
	restoreFormState(state) {
		if (state instanceof FormData && this.name) {
			this.values = state.getAll(this.name).map(String);
			return;
		}
		if (typeof state === "string") this.value = state;
	}
	isOptionInHiddenGroup(option) {
		const group = option.closest("pk-option-group");
		return Boolean(group?.hidden);
	}
	getVisibleOptions() {
		return this.options.filter((option) => !this.isOptionInHiddenGroup(option));
	}
	getEnabledVisibleOptions() {
		return this.getVisibleOptions().filter((option) => !option.disabled);
	}
	isSelected(value) {
		if (this.multiple) return this.values.includes(value);
		return this.value === value;
	}
	applySelection() {
		const visible = this.getVisibleOptions();
		for (const option of this.options) {
			option.selected = this.isSelected(option.value);
			option.hidden = !visible.includes(option);
			option.optionId = `${this.listboxId}-option-${option.value}`;
		}
		for (const group of this.querySelectorAll("pk-option-group")) {
			const groupOptions = [...group.querySelectorAll("pk-option")];
			group.hidden = groupOptions.length > 0 && groupOptions.every((option) => option.hidden);
		}
		syncListboxSeparators(this);
		this.syncValueInput();
		this.syncTriggerDecorations();
		if (this.open) this.syncHighlight();
	}
	syncValueInput() {
		if (!this.input) return;
		if (this.multiple) {
			this.input.value = this.values.join(",");
			this.input.required = this.required;
			return;
		}
		this.input.value = this.value;
		this.input.required = this.required;
	}
	getDisplayValue() {
		if (this.multiple) {
			const labels = this.getSelectedOptions().map((option) => option.getLabel());
			return labels.length > 0 ? labels.join(", ") : this.placeholder;
		}
		return this.options.find((option) => option.value === this.value)?.getLabel() || this.placeholder;
	}
	getSelectedOptions() {
		return this.options.filter((option) => this.isSelected(option.value));
	}
	/**
	* Mirror the selected option's `slot="start"` decorations into the trigger —
	* `pk-select` start/end decoration pattern.
	*/
	syncTriggerDecorations() {
		const container = this.triggerStartElement;
		if (!container || this.multiple) return;
		container.replaceChildren();
		container.classList.remove("has-decoration");
		const selected = this.options.find((option) => option.value === this.value);
		if (!selected) return;
		for (const element of selected.getStartElements()) container.append(element.cloneNode(true));
		container.classList.toggle("has-decoration", container.childElementCount > 0);
	}
	hasSelection() {
		if (this.multiple) return this.values.length > 0;
		return this.options.some((option) => option.value === this.value) || Boolean(this.value);
	}
	syncHighlightedIndexToSelection() {
		if (this.multiple) return;
		const enabled = this.getEnabledVisibleOptions();
		if (enabled.length === 0) return;
		const selectedIndex = enabled.findIndex((option) => option.value === this.value);
		if (selectedIndex >= 0) this.highlightedIndex = selectedIndex;
	}
	syncHighlight() {
		const enabled = this.getEnabledVisibleOptions();
		for (const option of this.options) {
			option.highlighted = false;
			option.focusIndex = -1;
		}
		if (enabled.length === 0) {
			this.highlightedIndex = 0;
			return;
		}
		if (this.highlightedIndex >= enabled.length) this.highlightedIndex = 0;
		const highlighted = enabled[this.highlightedIndex];
		if (highlighted && this.panelElement) {
			highlighted.highlighted = true;
			highlighted.focusIndex = 0;
			scrollIntoView(highlighted, this.panelElement, "vertical", "auto");
		}
	}
	updateTypeToSelect() {
		this.typeToSelect = createTypeToSelectHandler(this.getEnabledVisibleOptions(), (index) => {
			this.highlightedIndex = index;
			this.syncHighlight();
			this.getEnabledVisibleOptions()[index]?.focusControl();
		});
	}
	getPopupAnchor() {
		return this.controlElement ?? null;
	}
	getActiveDescendantId() {
		return this.getEnabledVisibleOptions()[this.highlightedIndex]?.optionId || null;
	}
	async show() {
		if (this.open || this.closing || this.disabled) return;
		await this.openPanel();
	}
	async hide(source = "api") {
		if (!this.open || this.closing) return;
		await this.closePanel(source);
	}
	openPanel() {
		const anchor = this.getPopupAnchor();
		if (!anchor || this.closing) return Promise.resolve();
		this.dispatchEvent(new PkShowEvent());
		this.closing = false;
		this.panelAnimated = false;
		this.open = true;
		this.popupElement.active = true;
		this.applySelection();
		this.syncHighlightedIndexToSelection();
		if (this.panelElement) {
			this.panelElement.hidden = false;
			syncPopupPlacementAnimation(this.panelElement, this.placement);
		}
		const anchorWidth = anchor.getBoundingClientRect().width;
		this.style.setProperty("--pk-select-anchor-width", `${anchorWidth}px`);
		this.registerDismissHandlers();
		this.syncHighlight();
		this.updateTypeToSelect();
		return this.updateComplete.then(async () => {
			const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, { requireEvent: true });
			if (this.panelElement) syncPopupPlacementAnimation(this.panelElement, placement);
			this.panelAnimated = true;
			this.bindPanelEvents();
			this.refreshOptions();
			this.getEnabledVisibleOptions()[this.highlightedIndex]?.focusControl();
			this.dispatchEvent(new PkAfterShowEvent());
			this.dispatchEvent(new CustomEvent("pk-open-change", {
				detail: { open: true },
				bubbles: true,
				composed: true
			}));
		});
	}
	async closePanel(source = "unknown") {
		if (!this.open || this.closing) return;
		const hideEvent = new PkHideEvent(source);
		if (!this.dispatchEvent(hideEvent)) return;
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
			this.panelElement.removeAttribute("data-side");
		}
		this.popupElement.active = false;
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
		if (this.shouldReturnFocusToTrigger(source)) this.triggerButton?.focus({ preventScroll: true });
		else this.triggerButton?.blur();
	}
	waitForExitAnimation() {
		const panel = this.panelElement;
		if (!panel) return Promise.resolve();
		return new Promise((resolve) => {
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				panel.removeEventListener("animationend", onAnimationEnd);
				window.clearTimeout(fallback);
				panel.classList.remove("closing");
				resolve();
			};
			const onAnimationEnd = (event) => {
				if (event.target === panel && event.animationName.startsWith("pk-popup-content-out")) finish();
			};
			panel.classList.add("closing");
			panel.addEventListener("animationend", onAnimationEnd);
			const fallback = window.setTimeout(finish, 150);
		});
	}
	/** Base UI skips return focus on outside press — avoids an unwanted focus ring after light dismiss. */
	shouldReturnFocusToTrigger(source) {
		return source !== "light-dismiss" && source !== "pointer-dismiss";
	}
	registerDismissHandlers() {
		registerDismissible(this);
		this.dismissRegistered = true;
		document.addEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.addEventListener("keydown", this.onDocumentKeyDown, true);
	}
	unregisterDismissHandlers() {
		if (this.dismissRegistered) {
			unregisterDismissible(this);
			this.dismissRegistered = false;
		}
		document.removeEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.removeEventListener("keydown", this.onDocumentKeyDown, true);
	}
	isPointerInside(event) {
		return isPointerInsideOverlay(event, {
			anchor: this.getPopupAnchor(),
			panel: this.panelElement
		});
	}
	removeTag(value, event) {
		event.preventDefault();
		event.stopPropagation();
		this.values = this.values.filter((item) => item !== value);
		this.applySelection();
		this.emitValueChange();
	}
	handleClear(event) {
		event.preventDefault();
		event.stopPropagation();
		if (this.multiple) this.values = [];
		else this.value = "";
		this.applySelection();
		this.dispatchEvent(new PkClearEvent());
		this.emitValueChange();
		this.triggerButton?.focus();
	}
	emitValueChange() {
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: this.multiple ? [...this.values] : this.value },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	onListboxKeyDown(event) {
		const enabled = this.getEnabledVisibleOptions();
		this.highlightedIndex = handleListboxKeyDown(event, {
			items: enabled,
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
			onClose: () => {
				this.closePanel("escape");
			}
		});
		if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) this.typeToSelect.handleKey(event);
	}
	renderTags() {
		return this.getSelectedOptions().map((option) => b`
            <span class="tag" part="tag">
                <span class="tag-label">${option.getLabel()}</span>
                <button
                    type="button"
                    class="tag-remove"
                    part="tag-remove"
                    aria-label=${`Remove ${option.getLabel()}`}
                    @click=${(event) => this.removeTag(option.value, event)}
                >
                    ×
                </button>
            </span>
        `);
	}
	renderChevronIcon() {
		return b`
            <span class="icon" aria-hidden="true">${o(CHEVRON_ICON)}</span>
        `;
	}
	renderHostDecorationSlot(name) {
		if (!this.hasSlotController.test(name)) return b`<slot name=${name} hidden></slot>`;
		return b`
            <span part=${name} class=${name === "start" ? "control-start" : "control-end"}>
                <slot name=${name}></slot>
            </span>
        `;
	}
	render() {
		const displayValue = this.getDisplayValue();
		const isPlaceholder = !this.hasSelection();
		const showClear = (this.clearable || this.withClear) && this.hasSelection() && !this.disabled;
		return b`
            <input
                class="value-input"
                part="value-input"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.multiple ? this.values.join(",") : this.value}
                ?required=${this.required}
                @input=${() => this.updateValidity()}
            />
            ${this.multiple ? b`
                    <div
                        part="control"
                        class=${e({
			control: true,
			"is-disabled": this.disabled
		})}
                    >
                        ${this.renderHostDecorationSlot("start")}
                        ${this.hasSelection() ? b`
                                <div class="tags" part="tags">${this.renderTags()}</div>
                                ${showClear ? b`
                                        <button
                                            type="button"
                                            class="clear-button"
                                            part="clear-button"
                                            aria-label="Clear selection"
                                            @click=${this.handleClear}
                                        >
                                            ×
                                        </button>
                                    ` : A}
                            ` : b`
                                <button
                                    part="trigger"
                                    type="button"
                                    class="trigger"
                                    id=${this.triggerId}
                                    ?disabled=${this.disabled}
                                    aria-label=${this.ariaLabel ?? A}
                                    aria-haspopup="listbox"
                                    aria-expanded=${this.open ? "true" : "false"}
                                    aria-controls=${this.listboxId}
                                    @click=${this.togglePanel}
                                >
                                    <span class="value is-placeholder">${this.placeholder}</span>
                                </button>
                            `}
                        ${this.renderHostDecorationSlot("end")}
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
                ` : b`
                    <button
                        part="control"
                        type="button"
                        class=${e({
			control: true,
			"is-disabled": this.disabled
		})}
                        id=${this.triggerId}
                        ?disabled=${this.disabled}
                        aria-label=${this.ariaLabel ?? A}
                        aria-haspopup="listbox"
                        aria-expanded=${this.open ? "true" : "false"}
                        aria-controls=${this.listboxId}
                        @click=${this.togglePanel}
                    >
                        ${this.renderHostDecorationSlot("start")}
                        <span part="trigger-start" class="trigger-start"></span>
                        <span
                            class=${e({
			value: true,
			"is-placeholder": isPlaceholder
		})}
                        >${displayValue}</span>
                        ${showClear ? b`
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
                            ` : A}
                        ${this.renderHostDecorationSlot("end")}
                        ${this.renderChevronIcon()}
                    </button>
                `}
            <pk-popup
                .anchor=${this.getPopupAnchor() ?? ""}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                .sync=${"width"}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${e({
			panel: true,
			"pk-popup-content": true,
			closing: this.closing
		})}
                    id=${this.listboxId}
                    role="listbox"
                    aria-multiselectable=${this.multiple ? "true" : "false"}
                    tabindex="-1"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? "" : A}
                    @slotchange=${this.syncOptions}
                >
                    <slot></slot>
                </div>
            </pk-popup>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkSelect.prototype, "open", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkSelect.prototype, "multiple", void 0);
__decorate([n({ reflect: true })], PkSelect.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkSelect.prototype, "sideOffset", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkSelect.prototype, "clearable", void 0);
__decorate([n({
	attribute: "with-clear",
	type: Boolean
})], PkSelect.prototype, "withClear", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkSelect.prototype, "invalid", void 0);
__decorate([n({ reflect: true })], PkSelect.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkSelect.prototype, "width", void 0);
__decorate([n()], PkSelect.prototype, "placeholder", void 0);
__decorate([n()], PkSelect.prototype, "value", void 0);
__decorate([n({ attribute: "default-value" })], PkSelect.prototype, "defaultValue", void 0);
__decorate([n({
	type: Array,
	attribute: false
})], PkSelect.prototype, "values", void 0);
__decorate([n({ attribute: false })], PkSelect.prototype, "defaultValues", void 0);
__decorate([n({ attribute: "aria-label" })], PkSelect.prototype, "ariaLabel", void 0);
__decorate([n({
	attribute: "loop-focus",
	type: Boolean
})], PkSelect.prototype, "loopFocus", void 0);
__decorate([e$1(".trigger-start")], PkSelect.prototype, "triggerStartElement", void 0);
__decorate([e$1("pk-popup")], PkSelect.prototype, "popupElement", void 0);
__decorate([e$1(".control")], PkSelect.prototype, "controlElement", void 0);
__decorate([e$1("button.control, .control > button.trigger")], PkSelect.prototype, "triggerButton", void 0);
__decorate([e$1(".value-input")], PkSelect.prototype, "input", void 0);
__decorate([r()], PkSelect.prototype, "highlightedIndex", void 0);
__decorate([r()], PkSelect.prototype, "closing", void 0);
__decorate([r()], PkSelect.prototype, "panelAnimated", void 0);
PkSelect = __decorate([t("pk-select")], PkSelect);
//#endregion
export { pkSelectStyles as n, PkSelect as t };
