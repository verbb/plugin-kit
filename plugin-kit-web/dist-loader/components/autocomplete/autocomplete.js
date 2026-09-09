import { d as registerDismissible, f as unregisterDismissible, n as uniqueId, s as scrollIntoView, t as LiveRegion, u as isTopDismissible } from "../../chunks/pk-a11y-CjB4-U-R.js";
import { a as o, c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as customElement } from "../../chunks/lit-DpLik9Rf.js";
import { c as __decorate, i as PkFormAssociatedElement, s as iconStyles } from "../../chunks/pk-base-CyzwylQ7.js";
import { Y as xmark } from "../../chunks/svg-BiAlXtCn.js";
import { t as MirrorValidator } from "../../chunks/mirror-validator-C5XrXPaq.js";
import { t as HasSlotController } from "../../chunks/has-slot-BGJeJdHr.js";
import { t as PkClearEvent } from "../../chunks/pk-clear-BMZUzwDt.js";
import { n as renderIconHtml } from "../../chunks/render-BKfL_WRl.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "../../chunks/overlay-lifecycle-C3tSQ3UR.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "../../chunks/popup-placement-animation-WlEXnS85.js";
import { t as popupContentAnimationStyles } from "../../chunks/popup-content-animation.styles-duCg9-CH.js";
import "../../chunks/pk-popup-BooGjXgH.js";
import { n as isPointerInsideOverlay, t as isEventInsideOverlay } from "../../chunks/popup-pointer-caPc8kwB.js";
import { a as isListboxTypeToSelectKey, i as handleListboxKeyDown, n as LISTBOX_NAVIGATION_KEYS } from "../../chunks/sync-listbox-separators-Dk_E_IVa.js";
import { i as waitForPopupContentExitAnimation, n as AsyncOptionFetcher, r as syncFilteredOptions, t as matchesOptionFilter } from "../../chunks/option-filter-Z7bomRrK.js";
//#region src/components/autocomplete/pk-autocomplete.styles.ts
/**
* Autocomplete chrome matches `pk-input` (text field), not Combobox’s slate
* select fill / chevron affordance. Panel / listbox tokens stay shared with
* Combobox so suggestion rows look the same.
*/
var pkAutocompleteStyles = [popupContentAnimationStyles, i`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: block;
            position: relative;
            width: 100%;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            /* Match pk-input control tokens — not Combobox slate fill. */
            --pk-autocomplete-padding-block: 6px;
            --pk-autocomplete-padding-inline: 8px;
            --pk-autocomplete-control-gap: 6px;
            --pk-autocomplete-decoration-size: 0.75rem;
            --pk-autocomplete-font-size: var(--pk-font-size-base);
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 2rem;
            --pk-select-item-font-size: 14px;
            --pk-select-item-line-height: 1.4;
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            --pk-select-group-label-font-size: 12px;
        }

        /* width="full" is the documented stretch opt-in; host already fills by default. */
        :host([width='full']) {
            display: block;
            width: 100%;
        }

        .control {
            display: flex;
            align-items: center;
            gap: var(--pk-autocomplete-control-gap);
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 0;
            padding-block: var(--pk-autocomplete-padding-block);
            padding-inline: var(--pk-autocomplete-padding-inline);
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            background-clip: padding-box;
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-autocomplete-font-size);
            line-height: var(--pk-input-control-line-height, 1.25rem);
            white-space: nowrap;
            cursor: text;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        /*
         * Craft text focus: resting border stays; ring is box-shadow only
         * (--pk-input-focus-shadow already includes the 1px edge). Same when the
         * suggestion panel is open — still a text field, not a select trigger.
         */
        :host(:not([invalid]):not(:state(user-invalid))) .control:focus-within,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control,
        :host(:not([invalid]):not(:state(user-invalid))) .control[data-popup-open] {
            box-shadow: var(--pk-input-focus-shadow);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .control-start,
        .control-end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            line-height: 0;
            color: var(--pk-color-gray-400);
        }

        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            width: var(--pk-autocomplete-decoration-size);
            height: var(--pk-autocomplete-decoration-size);
        }

        .autocomplete-input {
            flex: 1 1 auto;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            line-height: var(--pk-input-control-line-height, 1.25rem);
            outline: none;
        }

        .autocomplete-input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        /* Clear: flex trailing action — same contract as pk-input / Combobox clear. */
        .clear-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            align-self: stretch;
            box-sizing: border-box;
            width: calc(var(--pk-autocomplete-decoration-size) + var(--pk-autocomplete-padding-inline));
            height: auto;
            min-height: var(--pk-autocomplete-decoration-size);
            margin-block: calc(-1 * var(--pk-autocomplete-padding-block));
            /* Match pk-copy-button[slot=end]: pull into padding but leave a 4px glyph inset. */
            margin-inline-end: calc(-1 * var(--pk-autocomplete-padding-inline) + 4px);
            margin-inline-start: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            outline: none;
        }

        .clear-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .clear-button-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            pointer-events: none;
        }

        .clear-button-icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
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
            min-width: var(--pk-autocomplete-anchor-width, 8rem);
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: var(--pk-color-white);
            box-shadow: var(--pk-shadow-popup);
            color: var(--pk-color-gray-700);
            outline: none;
        }

        .panel-body {
            max-height: 16rem;
            overflow: auto;
        }

        .panel:not([data-open]):not(.closing) {
            opacity: 0;
            pointer-events: none;
        }

        .panel[data-open]:not(.closing) {
            opacity: 1;
            pointer-events: auto;
        }

        .panel[hidden] {
            display: none !important;
        }

        .empty,
        .async-status {
            display: flex;
            align-items: center;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block);
            padding-inline: var(--pk-select-item-padding-inline);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            box-sizing: border-box;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-select-item-line-height);
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .control:focus-within,
        :host([invalid][data-state='focus-visible']) .control,
        :host(:state(user-invalid)) .control:focus-within,
        :host(:state(user-invalid)[data-state='focus-visible']) .control {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) {
            --pk-autocomplete-padding-block: 4px;
            --pk-autocomplete-padding-inline: 6px;
            --pk-autocomplete-control-gap: 4px;
            --pk-autocomplete-decoration-size: 0.625rem;
            --pk-autocomplete-font-size: 11px;
            --pk-select-item-padding-block: 4px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 11px;
            --pk-select-group-label-font-size: 11px;
        }

        :host([size='xs']) .clear-button-icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([size='sm']) {
            --pk-autocomplete-padding-block: 4px;
            --pk-autocomplete-padding-inline: 8px;
            --pk-autocomplete-control-gap: 4px;
            --pk-autocomplete-decoration-size: 0.6875rem;
            --pk-autocomplete-font-size: 12px;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 12px;
            --pk-select-group-label-font-size: 12px;
        }

        :host([size='sm']) .clear-button-icon svg {
            width: 0.6875rem;
            height: 0.6875rem;
        }

        :host([size='lg']) {
            --pk-autocomplete-padding-block: 8px;
            --pk-autocomplete-padding-inline: 12px;
            --pk-autocomplete-control-gap: 8px;
            --pk-autocomplete-decoration-size: 0.875rem;
            --pk-autocomplete-font-size: var(--pk-font-size-base);
            --pk-select-item-padding-block: 8px;
            --pk-select-item-padding-inline: 12px;
            --pk-select-item-font-size: 14px;
            --pk-select-group-label-font-size: 14px;
        }

        :host([size='xl']) {
            --pk-autocomplete-padding-block: 10px;
            --pk-autocomplete-padding-inline: 16px;
            --pk-autocomplete-control-gap: 8px;
            --pk-autocomplete-decoration-size: 1rem;
            --pk-autocomplete-font-size: 16px;
            --pk-select-item-padding-block: 10px;
            --pk-select-item-padding-inline: 14px;
            --pk-select-item-padding-inline-end: 2.25rem;
            --pk-select-item-font-size: 14px;
            --pk-select-group-label-font-size: 16px;
        }

        :host([size='xl']) .clear-button-icon svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`];
//#endregion
//#region src/components/autocomplete/pk-autocomplete.ts
var XMARK_ICON = renderIconHtml(xmark);
var PkAutocomplete = class PkAutocomplete extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.open = false;
		this.placement = "bottom-start";
		this.sideOffset = 6;
		this.clearable = false;
		this.withClear = false;
		this.autoHighlight = false;
		this.invalid = false;
		this.size = "default";
		this.placeholder = "";
		this.emptyMessage = "No options found.";
		this.value = "";
		this.defaultValue = "";
		this.label = "";
		this.instructions = "";
		this.ariaLabel = null;
		this.loopFocus = true;
		this.filter = null;
		this.async = false;
		this.loadingMessage = "Searching…";
		this.startTypingMessage = "Start typing to search…";
		this.fetchOptions = null;
		this.hasSlotController = new HasSlotController(this, "start", "end");
		this.listboxId = uniqueId("pk-autocomplete-listbox");
		this.inputId = uniqueId("pk-autocomplete-input");
		this.options = [];
		this.highlightedIndex = -1;
		this.closing = false;
		this.panelAnimated = false;
		this.dismissRegistered = false;
		this.panelEventTarget = null;
		this.asyncFetcher = null;
		this.asyncLoading = false;
		this.asyncError = null;
		this.onDocumentPointerDown = (event) => {
			if (isPointerInsideOverlay(event, {
				anchor: this.controlElement,
				panel: this.panelElement
			})) return;
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
			const panel = this.panelElement;
			const path = event.composedPath();
			if (!Boolean(panel && path.includes(panel))) return;
			if (!isEventInsideOverlay(event, {
				anchor: this.controlElement,
				panel
			})) return;
			event.preventDefault();
			event.stopPropagation();
			this.onListboxKeyDown(event);
		};
		this.handleOptionSelect = (event) => {
			const { value } = event.detail;
			this.commitValue(value, { close: true });
		};
		this.handleOptionHighlight = (event) => {
			if (!this.open) return;
			const index = this.getEnabledVisibleOptions().findIndex((option) => option.value === event.detail.value);
			if (index === -1 || index === this.highlightedIndex) return;
			this.highlightedIndex = index;
			this.syncHighlight();
		};
		this.handleControlMouseDown = (event) => {
			if (this.disabled) return;
			if (event.composedPath().some((node) => {
				if (!(node instanceof HTMLElement)) return false;
				return node.classList.contains("clear-button");
			})) return;
			const isInput = event.target === this.controlInput;
			if (!this.open && !this.closing) {
				if (!isInput) event.preventDefault();
				this.controlInput?.focus({ preventScroll: true });
				this.openPanel();
				return;
			}
			if (!isInput) {
				event.preventDefault();
				this.controlInput?.focus({ preventScroll: true });
			}
		};
		this.handleListboxKeyDownEvent = (event) => {
			this.onListboxKeyDown(event.detail.keyboardEvent);
		};
	}
	static {
		this.styles = pkAutocompleteStyles;
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			{
				observedAttributes: ["required"],
				checkValidity: (element) => {
					const field = element;
					const result = {
						message: "Please fill out this field.",
						isValid: true,
						invalidKeys: []
					};
					if (!field.required || field.value.trim()) return result;
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
	get panelBodyElement() {
		return this.panelElement?.querySelector(".panel-body");
	}
	get listScrollContainer() {
		return this.panelBodyElement ?? this.panelElement ?? this;
	}
	connectedCallback() {
		this.instructions = this.getAttribute("hint") ?? this.instructions;
		this.refreshOptions();
		super.connectedCallback();
		this.syncHasValueAttribute();
		this.addEventListener("pk-listbox-keydown", this.handleListboxKeyDownEvent);
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
		this.optionsObserver?.disconnect();
		this.liveRegion?.destroy();
		this.liveRegion = void 0;
		this.asyncFetcher?.cancel();
		this.closePanel("api");
		super.disconnectedCallback();
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (!this.value && this.defaultValue) this.value = this.defaultValue;
		this.applyOptionState();
	}
	updated(changed) {
		if (changed.has("value")) {
			this.syncHasValueAttribute();
			this.applyOptionState();
		}
		super.updated(changed);
	}
	get validationTarget() {
		return this.controlInput ?? this.controlElement;
	}
	getAriaMirrorTarget() {
		return this.controlInput ?? this.controlElement ?? null;
	}
	syncFormValue() {
		if (!this.name) {
			this.setFormValue(null);
			return;
		}
		this.setFormValue(this.value);
	}
	syncHasValueAttribute() {
		this.toggleAttribute("data-has-value", Boolean(this.value));
	}
	refreshOptions() {
		this.options = [...this.querySelectorAll("pk-option")];
	}
	handleOptionsMutation(options = {}) {
		this.refreshOptions();
		this.applyOptionState();
		if (options.render) this.requestUpdate();
	}
	bindPanelEvents() {
		const panel = this.panelElement;
		if (!panel || this.panelEventTarget === panel) return;
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
	isOptionInHiddenGroup(option) {
		const group = option.closest("pk-option-group");
		return Boolean(group?.hidden);
	}
	getFilterQuery() {
		if (!this.open) return "";
		return this.value.trim().toLowerCase();
	}
	get usesAsyncSearch() {
		return this.async && Boolean(this.fetchOptions);
	}
	getVisibleOptions() {
		if (this.usesAsyncSearch) return this.options.filter((option) => !this.isOptionInHiddenGroup(option));
		const filter = this.getFilterQuery();
		return this.options.filter((option) => {
			if (this.isOptionInHiddenGroup(option)) return false;
			if (!filter) return true;
			return matchesOptionFilter(option, filter, this.filter);
		});
	}
	getEnabledVisibleOptions() {
		return this.getVisibleOptions().filter((option) => !option.disabled);
	}
	clearAsyncOptionNodes() {
		this.querySelectorAll(":scope > pk-option, :scope > pk-option-group, :scope > pk-separator").forEach((node) => node.remove());
	}
	renderAsyncOptionNodes(items) {
		this.clearAsyncOptionNodes();
		for (const item of items) {
			const option = document.createElement("pk-option");
			option.value = item.value;
			option.textContent = item.label;
			this.append(option);
		}
		this.handleOptionsMutation({ render: true });
	}
	scheduleAsyncFetch(query) {
		this.ensureAsyncFetcher().schedule(query);
	}
	ensureAsyncFetcher() {
		if (!this.asyncFetcher) this.asyncFetcher = new AsyncOptionFetcher(() => this.fetchOptions, {
			errorLabel: "autocomplete options",
			onLoading: () => {
				this.asyncLoading = true;
				this.asyncError = null;
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
			}
		});
		return this.asyncFetcher;
	}
	getAsyncStatusMessage() {
		if (!this.usesAsyncSearch || !this.open) return null;
		if (this.asyncLoading) return this.loadingMessage;
		if (this.asyncError) return this.asyncError;
		const query = this.value.trim();
		if (!query) return this.startTypingMessage;
		if (this.getEnabledVisibleOptions().length === 0) return `No matches for "${query}".`;
		return null;
	}
	applyOptionState() {
		const visible = this.getVisibleOptions();
		const filterQuery = this.open ? this.getFilterQuery() : "";
		syncFilteredOptions({
			host: this,
			options: this.options,
			visible,
			listboxId: this.listboxId,
			filterQuery,
			isSelected: () => false
		});
		this.syncValueInput();
		if (this.open) {
			this.syncHighlight();
			this.announceFilterResults();
		}
	}
	syncValueInput() {
		if (!this.input) return;
		this.input.value = this.value;
		this.input.required = this.required;
	}
	resetHighlightedIndexOnOpen() {
		this.highlightedIndex = this.autoHighlight ? 0 : -1;
	}
	syncHighlight() {
		const enabled = this.getEnabledVisibleOptions();
		for (const option of this.options) {
			option.highlighted = false;
			option.focusIndex = -1;
		}
		if (enabled.length === 0 || this.highlightedIndex < 0) return;
		if (this.highlightedIndex >= enabled.length) this.highlightedIndex = enabled.length - 1;
		const highlighted = enabled[this.highlightedIndex];
		if (highlighted) {
			highlighted.highlighted = true;
			highlighted.focusIndex = -1;
			scrollIntoView(highlighted, this.listScrollContainer, "vertical", "auto");
			this.controlInput?.focus({ preventScroll: true });
		}
	}
	getActiveDescendantId() {
		return this.getEnabledVisibleOptions()[this.highlightedIndex]?.optionId || null;
	}
	announceFilterResults() {
		if (!this.liveRegion) this.liveRegion = new LiveRegion("polite");
		const count = this.getEnabledVisibleOptions().length;
		if (!this.getFilterQuery()) return;
		this.liveRegion.announce(count === 0 ? `${this.emptyMessage}` : `${count} ${count === 1 ? "result" : "results"} available`);
	}
	openPanel() {
		const anchor = this.controlElement;
		if (!anchor) return Promise.resolve();
		if (this.open) {
			this.controlInput?.focus({ preventScroll: true });
			return Promise.resolve();
		}
		if (this.closing) return Promise.resolve();
		this.dispatchEvent(new PkShowEvent());
		this.closing = false;
		this.panelAnimated = false;
		this.open = true;
		this.applyOptionState();
		this.resetHighlightedIndexOnOpen();
		if (this.usesAsyncSearch) {
			this.asyncError = null;
			this.renderAsyncOptionNodes([]);
			const query = this.value.trim();
			this.asyncLoading = Boolean(query);
			this.scheduleAsyncFetch(query);
		}
		this.style.setProperty("--pk-autocomplete-anchor-width", `${anchor.getBoundingClientRect().width}px`);
		this.popupElement.active = true;
		if (this.panelElement) {
			this.panelElement.hidden = false;
			syncPopupPlacementAnimation(this.panelElement, this.placement);
		}
		this.registerDismissHandlers();
		this.syncHighlight();
		this.controlInput?.focus({ preventScroll: true });
		return this.updateComplete.then(async () => {
			const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, { requireEvent: true });
			if (this.panelElement) syncPopupPlacementAnimation(this.panelElement, placement);
			this.panelAnimated = true;
			this.bindPanelEvents();
			this.refreshOptions();
			this.controlInput?.focus({ preventScroll: true });
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
		this.unbindPanelEvents();
		this.closing = true;
		this.panelAnimated = false;
		await waitForPopupContentExitAnimation(this.panelElement);
		this.open = false;
		this.closing = false;
		this.panelAnimated = false;
		if (this.panelElement) {
			this.panelElement.hidden = true;
			this.panelElement.removeAttribute("data-side");
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
		if (source !== "light-dismiss" && source !== "pointer-dismiss") this.controlInput?.focus({ preventScroll: true });
		else this.controlInput?.blur();
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
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
	commitValue(next, { close = false, emit = true } = {}) {
		const changed = this.value !== next;
		this.value = next;
		this.syncHasValueAttribute();
		this.applyOptionState();
		if (close) this.closePanel("api");
		if (changed && emit) this.emitValueChange();
	}
	handleClear(event) {
		event.preventDefault();
		event.stopPropagation();
		this.commitValue("");
		this.dispatchEvent(new PkClearEvent());
		this.controlInput?.focus();
	}
	emitValueChange() {
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: this.value },
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
	handleInput(event) {
		const next = event.target.value;
		this.value = next;
		this.syncHasValueAttribute();
		this.highlightedIndex = this.autoHighlight ? 0 : -1;
		this.applyOptionState();
		this.emitValueChange();
		if (this.usesAsyncSearch) {
			this.asyncError = null;
			this.scheduleAsyncFetch(next.trim());
		}
		if (!this.open) this.openPanel();
	}
	handleInputKeyDown(event) {
		if (event.key === "Escape" && this.open) {
			event.preventDefault();
			this.closePanel("escape");
			return;
		}
		if (event.key === "ArrowDown" && !this.open) {
			event.preventDefault();
			this.openPanel();
			return;
		}
		if (!this.open) return;
		if (event.key === "Enter") {
			const enabled = this.getEnabledVisibleOptions();
			if (this.highlightedIndex >= 0 && enabled[this.highlightedIndex]) {
				event.preventDefault();
				this.commitValue(enabled[this.highlightedIndex].value, { close: true });
			} else this.closePanel("api");
			return;
		}
		if (LISTBOX_NAVIGATION_KEYS.has(event.key) && event.key !== "Enter" && event.key !== "Escape") this.onListboxKeyDown(event);
	}
	onListboxKeyDown(event) {
		const enabled = this.getEnabledVisibleOptions();
		this.highlightedIndex = handleListboxKeyDown(event, {
			items: enabled,
			currentIndex: this.highlightedIndex,
			loop: this.loopFocus,
			onSelect: (index) => {
				const option = this.getEnabledVisibleOptions()[index];
				if (option) this.commitValue(option.value, { close: true });
			},
			onClose: () => {
				this.closePanel("escape");
			},
			focusItem: (index) => {
				this.highlightedIndex = index;
				this.syncHighlight();
			}
		});
	}
	async hide(source = "api") {
		await this.closePanel(source);
	}
	renderHostDecorationSlot(name) {
		if (!this.hasSlotController.test(name)) return A;
		return b`<slot name=${name} part=${name} class=${name === "start" ? "control-start" : "control-end"}></slot>`;
	}
	render() {
		const visibleOptions = this.getEnabledVisibleOptions();
		const showEmpty = this.open && !this.usesAsyncSearch && visibleOptions.length === 0;
		const asyncStatus = this.getAsyncStatusMessage();
		const showClear = (this.clearable || this.withClear) && Boolean(this.value) && !this.disabled;
		const activeDescendant = this.open ? this.getActiveDescendantId() : null;
		return b`
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
                class=${e({
			control: true,
			"is-disabled": this.disabled
		})}
                data-popup-open=${this.open || this.closing ? "" : A}
                @mousedown=${this.handleControlMouseDown}
            >
                ${this.renderHostDecorationSlot("start")}
                <input
                    part="input"
                    class="autocomplete-input control-input"
                    type="text"
                    role="combobox"
                    id=${this.inputId}
                    .value=${this.value}
                    placeholder=${this.placeholder || A}
                    ?disabled=${this.disabled}
                    aria-label=${this.ariaLabel ?? A}
                    aria-expanded=${this.open ? "true" : "false"}
                    aria-controls=${this.listboxId}
                    aria-autocomplete="both"
                    aria-activedescendant=${activeDescendant ?? A}
                    @input=${this.handleInput}
                    @keydown=${this.handleInputKeyDown}
                />
                ${this.renderHostDecorationSlot("end")}
                ${showClear ? b`
                        <button
                            type="button"
                            class="clear-button"
                            part="clear-button"
                            aria-label="Clear"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${o(XMARK_ICON)}</span>
                        </button>
                    ` : A}
            </div>
            <pk-popup
                .active=${this.open || this.closing}
                .anchor=${this.controlElement ?? ""}
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
                    tabindex="-1"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? "" : A}
                >
                    <div
                        part="panel-body"
                        class="panel-body"
                        id=${this.listboxId}
                        role="listbox"
                        aria-busy=${this.usesAsyncSearch && this.asyncLoading ? "true" : A}
                    >
                        <slot></slot>
                        ${asyncStatus ? b`
                                <div part="async-status" class="async-status" role="status">${asyncStatus}</div>
                            ` : A}
                        ${showEmpty ? b`
                                <div part="empty" class="empty">${this.emptyMessage}</div>
                            ` : A}
                    </div>
                </div>
            </pk-popup>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkAutocomplete.prototype, "open", void 0);
__decorate([n({ reflect: true })], PkAutocomplete.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkAutocomplete.prototype, "sideOffset", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkAutocomplete.prototype, "clearable", void 0);
__decorate([n({
	attribute: "with-clear",
	type: Boolean
})], PkAutocomplete.prototype, "withClear", void 0);
__decorate([n({
	attribute: "auto-highlight",
	type: Boolean
})], PkAutocomplete.prototype, "autoHighlight", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkAutocomplete.prototype, "invalid", void 0);
__decorate([n({ reflect: true })], PkAutocomplete.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkAutocomplete.prototype, "width", void 0);
__decorate([n()], PkAutocomplete.prototype, "placeholder", void 0);
__decorate([n({ attribute: "empty-message" })], PkAutocomplete.prototype, "emptyMessage", void 0);
__decorate([n()], PkAutocomplete.prototype, "value", void 0);
__decorate([n({ attribute: "default-value" })], PkAutocomplete.prototype, "defaultValue", void 0);
__decorate([n()], PkAutocomplete.prototype, "label", void 0);
__decorate([n()], PkAutocomplete.prototype, "instructions", void 0);
__decorate([n({ attribute: "aria-label" })], PkAutocomplete.prototype, "ariaLabel", void 0);
__decorate([n({
	attribute: "loop-focus",
	type: Boolean
})], PkAutocomplete.prototype, "loopFocus", void 0);
__decorate([n({ attribute: false })], PkAutocomplete.prototype, "filter", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkAutocomplete.prototype, "async", void 0);
__decorate([n({ attribute: "loading-message" })], PkAutocomplete.prototype, "loadingMessage", void 0);
__decorate([n({ attribute: "start-typing-message" })], PkAutocomplete.prototype, "startTypingMessage", void 0);
__decorate([n({ attribute: false })], PkAutocomplete.prototype, "fetchOptions", void 0);
__decorate([e$1("pk-popup")], PkAutocomplete.prototype, "popupElement", void 0);
__decorate([e$1(".control")], PkAutocomplete.prototype, "controlElement", void 0);
__decorate([e$1(".control-input")], PkAutocomplete.prototype, "controlInput", void 0);
__decorate([e$1(".value-input")], PkAutocomplete.prototype, "input", void 0);
__decorate([r()], PkAutocomplete.prototype, "highlightedIndex", void 0);
__decorate([r()], PkAutocomplete.prototype, "closing", void 0);
__decorate([r()], PkAutocomplete.prototype, "panelAnimated", void 0);
__decorate([r()], PkAutocomplete.prototype, "asyncLoading", void 0);
__decorate([r()], PkAutocomplete.prototype, "asyncError", void 0);
PkAutocomplete = __decorate([customElement("pk-autocomplete")], PkAutocomplete);
//#endregion
export { PkAutocomplete };
