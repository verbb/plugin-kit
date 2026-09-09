import { t as icons_exports } from "./icons-BR8JcQj2.js";
import { a as query, i as property, o as state, s as customElement, t as __decorate } from "./decorate-R0X811qp.js";
import "./pk-spinner-DweuYJ_Z.js";
import { t as iconStyles } from "./icon.styles-BLTWLqYp.js";
import { t as PkFormAssociatedElement } from "./pk-form-associated-element-CCQALRGB.js";
import { t as MirrorValidator } from "./mirror-validator-DCjNYrrx.js";
import { t as RequiredValidator } from "./required-validator-CEg8dvjS.js";
import { n as renderIconHtml } from "./render-Dvc3MHQR.js";
import { i as uniqueId, t as LiveRegion } from "./focus-aa5dlv8k.js";
import { i as unregisterDismissible, n as isTopDismissible, r as registerDismissible } from "./dismissible-stack-XQUMfKO3.js";
import { i as scrollIntoView } from "./scroll-lock-Bbh3Sc5g.js";
import { t as PkClearEvent } from "./pk-clear--mPWZP7H.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-D0pkTQyI.js";
import "./pk-popup-B9AgBC2V.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "./popup-placement-animation-WlEXnS85.js";
import { n as isPointerInsideOverlay } from "./popup-pointer-CuLjk1th.js";
import { t as popupContentAnimationStyles } from "./popup-content-animation.styles-BnNiguJo.js";
import "./pk-tooltip-Cmmc0916.js";
import { css, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
//#region src/components/image-browser/pk-image-browser.styles.ts
/**
* Presentational static image / icon browser.
* Trigger chrome mirrors combobox popup-mode; panel grid mirrors Vizy icon picker.
*/
var pkImageBrowserStyles = [popupContentAnimationStyles, css`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            width: fit-content;
            max-width: 100%;
            vertical-align: top;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            --pk-image-browser-trigger-min-height: var(--pk-btn-height-default);
            --pk-image-browser-padding-block: 6px;
            --pk-image-browser-padding-inline: 10px;
            --pk-image-browser-font-size: var(--pk-font-size-base);
            --pk-image-browser-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-image-browser-glyph-size: 1rem;
            --pk-image-browser-panel-width: 26.25rem;
            /* Hit target larger than the glyph so the select ring has breathing room. */
            --pk-image-browser-cell-min: 2.25rem;
            --pk-image-browser-glyph-tile: 1.375rem;
            --pk-image-browser-fill: var(--pk-color-slate-250);
            --pk-image-browser-fill-hover: var(--pk-color-slate-300);
        }

        /* Caption under each cell — wider tracks; glyph size stays put. */
        :host([label-mode='inline']) {
            --pk-image-browser-cell-min: 3.75rem;
        }

        :host([size='xs']) {
            --pk-image-browser-trigger-min-height: var(--pk-btn-height-xs);
            --pk-image-browser-padding-block: 2px;
            --pk-image-browser-padding-inline: 6px;
            --pk-image-browser-font-size: var(--pk-font-size-xs, 0.75rem);
            --pk-image-browser-glyph-size: 0.875rem;
        }

        :host([size='sm']) {
            --pk-image-browser-trigger-min-height: var(--pk-btn-height-sm);
            --pk-image-browser-padding-block: 4px;
            --pk-image-browser-padding-inline: 8px;
            --pk-image-browser-font-size: var(--pk-font-size-sm, 0.8125rem);
            --pk-image-browser-glyph-size: 0.875rem;
        }

        :host([size='lg']),
        :host([size='xl']) {
            --pk-image-browser-trigger-min-height: var(--pk-btn-height-lg);
            --pk-image-browser-padding-block: 8px;
            --pk-image-browser-padding-inline: 12px;
            --pk-image-browser-font-size: var(--pk-font-size-lg, 1rem);
            --pk-image-browser-glyph-size: 1.125rem;
        }

        /* Image mode — roomier photo tiles; captions still opt-in via label-mode="inline". */
        :host([mode='image']) {
            --pk-image-browser-panel-width: 34rem;
            --pk-image-browser-cell-min: 7.5rem;
        }

        :host([mode='image'][label-mode='inline']) {
            /* Captions reclaim a little width; preview stays the hero. */
            --pk-image-browser-cell-min: 6.5rem;
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        .value-input {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
            opacity: 0;
            pointer-events: none;
        }

        /* Combobox-style chrome: label + clear + chevron share one filled control. */
        .control {
            display: inline-flex;
            align-items: stretch;
            gap: 0.25rem;
            min-width: 12.5rem;
            max-width: 100%;
            height: var(--pk-image-browser-trigger-min-height);
            min-height: var(--pk-image-browser-trigger-min-height);
            margin: 0;
            padding: 0 0 0 var(--pk-image-browser-padding-inline);
            border: 1px solid transparent;
            border-radius: var(--pk-input-border-radius, var(--pk-radius-lg));
            background: var(--pk-image-browser-fill);
            color: inherit;
            box-sizing: border-box;
            overflow: hidden;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        .control:hover:not(.is-disabled) {
            background: var(--pk-image-browser-fill-hover);
        }

        .control.is-open:not(.is-disabled) {
            background: var(--pk-image-browser-fill-hover);
        }

        .control:focus-within:not(.is-disabled) {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host([invalid]) .control,
        :host(:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-500, #f43f5e);
        }

        .control.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            flex: 1 1 auto;
            min-width: 0;
            margin: 0;
            padding: var(--pk-image-browser-padding-block) 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: var(--pk-image-browser-font-size);
            font-weight: 400;
            line-height: var(--pk-image-browser-line-height);
            text-align: left;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
        }

        .trigger:disabled {
            cursor: not-allowed;
        }

        .trigger-main {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
        }

        .trigger-preview {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: var(--pk-image-browser-glyph-size);
            height: var(--pk-image-browser-glyph-size);
            overflow: hidden;
        }

        .trigger-preview svg,
        .trigger-preview img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .trigger-preview svg {
            fill: currentColor;
        }

        .trigger-label {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .trigger-label.is-placeholder {
            color: var(--pk-color-gray-500);
        }

        .clear-button,
        .expand-button {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            align-self: stretch;
            box-sizing: border-box;
            width: calc(0.75rem + 0.5rem);
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            outline: none;
        }

        .expand-button {
            width: calc(0.75rem + 0.5rem + var(--pk-image-browser-padding-inline));
            padding-inline-end: var(--pk-image-browser-padding-inline);
        }

        .clear-button:hover:not(:disabled),
        .expand-button:hover:not(:disabled) {
            color: var(--pk-color-gray-800);
        }

        .clear-button:disabled,
        .expand-button:disabled {
            cursor: not-allowed;
        }

        .clear-button-icon,
        .expand-button-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            pointer-events: none;
        }

        .clear-button-icon svg,
        .expand-button-icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .panel {
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            width: var(--pk-image-browser-panel-width);
            max-width: min(100vw - 1.5rem, var(--pk-image-browser-panel-width));
            max-height: min(28.75rem, 60vh);
            border-radius: var(--pk-radius-lg);
            background: var(--pk-color-white);
            box-shadow:
                0 0 0 1px rgba(31, 41, 51, 0.1),
                0 5px 20px rgba(31, 41, 51, 0.25);
            overflow: hidden;
        }

        .panel[hidden] {
            display: none !important;
        }

        .panel-search {
            flex: none;
            /* Same inline inset as panel-body so search + grid share one vertical edge. */
            padding: 0.625rem 0.625rem 0.5rem;
            border-bottom: 1px solid var(--pk-color-gray-150, rgba(51, 64, 77, 0.1));
        }

        .panel-input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0.375rem 0.625rem;
            border: 1px solid var(--pk-color-gray-200, #d4dce4);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-md));
            background: var(--pk-color-white);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-font-size-sm, 0.8125rem);
            line-height: 1.25rem;
            outline: none;
        }

        .panel-input:focus {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
        }

        .panel-body {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            /* Match search field inset so the grid lines up with the input. */
            padding: 0.5rem 0.625rem 0.625rem;
        }

        :host([mode='image']) .panel-body {
            padding: 0.5rem 0.625rem 0.625rem;
        }

        .group + .group {
            margin-top: 0.875rem;
        }

        .group-heading {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            margin: 0 0 0.375rem;
            color: var(--pk-color-gray-500);
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            line-height: 1.25;
            text-transform: uppercase;
        }

        .group-heading-count {
            font-weight: 400;
            letter-spacing: 0;
            text-transform: none;
        }

        /* Fixed column width (not 1fr) so sparse catalogs stay dense instead of stretching. */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, var(--pk-image-browser-cell-min));
            gap: 0.375rem;
            justify-content: start;
            /* Don’t stretch short single-line cells to match taller wrapped neighbors in the row. */
            align-items: start;
        }

        :host([mode='image']) .grid {
            grid-template-columns: repeat(auto-fill, minmax(var(--pk-image-browser-cell-min), 1fr));
            gap: 0.375rem;
        }

        .option {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            width: var(--pk-image-browser-cell-min);
            height: var(--pk-image-browser-cell-min);
            margin: 0;
            /* Square hit target; glyph is smaller so the ring doesn’t clip tips. */
            padding: 0;
            border: 1px solid transparent;
            border-radius: var(--pk-radius-sm);
            background: none;
            color: inherit;
            cursor: pointer;
            outline: none;
            overflow: hidden;
        }

        /* With captions, height hugs glyph + label instead of a fixed square. */
        :host([label-mode='inline']) .option {
            justify-content: flex-start;
            gap: 0.125rem;
            height: auto;
            /* Keep glyph + caption inside the inset highlight ring. */
            padding: 0.25rem 0.125rem 0.3125rem;
        }

        :host([mode='image']) .option {
            position: relative;
            width: auto;
            height: auto;
            min-height: 0;
            gap: 0;
            padding: 0;
            overflow: hidden;
            border-radius: var(--pk-radius-md);
        }

        :host([mode='image'][label-mode='inline']) .option {
            gap: 0.375rem;
            padding: 0.375rem 0.375rem 0.5rem;
            overflow: visible;
        }

        .option:hover,
        .option:focus-visible,
        .option.is-highlighted {
            background: var(--pk-color-gray-050, #f3f7fc);
        }

        /* Selected is the durable chrome; highlight/hover share the same ring for keyboard parity. */
        .option.is-selected,
        .option.is-highlighted,
        .option:hover {
            box-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
        }

        /*
         * Flush photo tiles paint over inset box-shadow (descendants sit above it).
         * Overlay the same ring so tooltip/none match inline chrome.
         */
        :host([mode='image']) .option.is-selected,
        :host([mode='image']) .option.is-highlighted,
        :host([mode='image']) .option:hover {
            box-shadow: none;
        }

        :host([mode='image']) .option.is-selected::after,
        :host([mode='image']) .option.is-highlighted::after,
        :host([mode='image']) .option:hover::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 1;
            border-radius: inherit;
            box-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
            pointer-events: none;
        }

        .option:focus-visible {
            outline: none;
        }

        .option-preview {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            width: var(--pk-image-browser-glyph-tile);
            height: var(--pk-image-browser-glyph-tile);
            margin: 0;
            overflow: hidden;
        }

        :host([mode='image']) .option-preview {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            margin: 0;
            border-radius: inherit;
        }

        .option-preview svg,
        .option-preview img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        /* Photo tiles crop to fill — previews, not faithful aspect viewers. */
        :host([mode='image']) .option-preview svg,
        :host([mode='image']) .option-preview img {
            object-fit: cover;
        }

        .option-preview svg {
            fill: currentColor;
        }

        .option-label {
            display: -webkit-box;
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            padding-inline: 2px;
            overflow: hidden;
            color: var(--pk-color-gray-700);
            font-size: 0.625rem;
            line-height: 0.75rem;
            text-align: center;
            overflow-wrap: anywhere;
            word-break: break-word;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
        }

        :host([mode='image']) .option-label {
            display: block;
            color: var(--pk-color-gray-600);
            font-size: 0.6875rem;
            line-height: 1.2;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow-wrap: normal;
            word-break: normal;
            -webkit-line-clamp: unset;
            line-clamp: unset;
        }

        .notice {
            margin: 0.375rem 0;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-font-size-sm, 0.8125rem);
        }

        .notice.is-error {
            color: var(--pk-color-rose-600, #e11d48);
        }

        /* Host-driven catalog warm — spinner only (no loading copy). */
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            min-height: 6rem;
            padding: 1.25rem 0.75rem;
            color: var(--pk-color-gray-500);
        }

        .panel-input:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        /* Host is inert layout chrome; the floating tip lives in pk-popup. */
        .option-tooltip {
            position: absolute;
            width: 0;
            height: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
            pointer-events: none;
        }
    }
    `];
//#endregion
//#region src/components/image-browser/pk-image-browser.ts
var CHEVRON_ICON = renderIconHtml(icons_exports.chevronDown);
var XMARK_ICON = renderIconHtml(icons_exports.xmark);
/** How many matched items per group are painted before scroll reveals more. */
var DEFAULT_PAGE_SIZE = 96;
function isInlineSvg(preview) {
	return /^\s*<svg[\s>]/i.test(preview);
}
var PkImageBrowser = class PkImageBrowser extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["pk-change"];
		this.size = "default";
		this.mode = "icon";
		this.width = "auto";
		this.labelMode = "tooltip";
		this.invalid = false;
		this.readonly = false;
		this.value = "";
		this.defaultValue = "";
		this.placeholder = "Choose…";
		this.searchPlaceholder = "Search…";
		this.emptyMessage = "No items match your query.";
		this.ariaLabel = null;
		this.loading = false;
		this.withClear = true;
		this.items = [];
		this.groups = [];
		this.selectedLabel = "";
		this.selectedPreview = "";
		this.placement = "bottom-start";
		this.sideOffset = 4;
		this.pageSize = DEFAULT_PAGE_SIZE;
		this.open = false;
		this.query = "";
		this.limit = DEFAULT_PAGE_SIZE;
		this.closing = false;
		this.panelAnimated = false;
		this.highlightedIndex = -1;
		this.tooltipFor = "";
		this.tooltipContent = "";
		this.listboxId = uniqueId("pk-image-browser-listbox");
		this.searchId = uniqueId("pk-image-browser-search");
		this.closeTimer = null;
		this.tooltipOpenTimer = null;
		this.liveRegion = null;
		this.handleClear = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (this.disabled || this.readonly || this.value === "") return;
			this.emitChange("");
			this.dispatchEvent(new PkClearEvent());
			this.triggerElement?.focus({ preventScroll: true });
		};
		this.togglePanel = (event) => {
			event?.preventDefault();
			event?.stopPropagation();
			if (this.disabled || this.readonly) return;
			if (this.open || this.closing) this.closePanel("api");
			else this.openPanel();
		};
		this.handleTriggerKeyDown = (event) => {
			if (this.disabled || this.readonly) return;
			if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				if (!this.open && !this.closing) this.openPanel();
			}
		};
		this.onDocumentPointerDown = (event) => {
			if (!this.open || this.closing || !isTopDismissible(this)) return;
			if (isPointerInsideOverlay(event, {
				host: this,
				anchor: this.controlElement ?? this.triggerElement,
				panel: this.panelElement
			})) return;
			this.closePanel("pointer-dismiss");
		};
		this.onDocumentKeyDown = (event) => {
			if (!this.open || this.closing || !isTopDismissible(this)) return;
			if (event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				this.closePanel("escape");
			}
		};
		this.handleSearchInput = (event) => {
			if (this.loading) return;
			this.query = event.target.value;
			this.limit = this.normalizedPageSize();
			this.resetHighlightForOpenCatalog();
			this.announceResults();
		};
		this.handleSearchKeyDown = (event) => {
			if (!this.open || this.closing || this.loading) return;
			switch (event.key) {
				case "ArrowDown":
				case "ArrowUp":
				case "ArrowLeft":
				case "ArrowRight":
				case "Home":
				case "End":
					event.preventDefault();
					event.stopPropagation();
					this.moveHighlight(event.key);
					return;
				case "Enter": {
					event.preventDefault();
					event.stopPropagation();
					const item = this.flatVisibleItems()[this.highlightedIndex];
					if (item) this.selectValue(item.value);
					return;
				}
				default: break;
			}
		};
		this.handleResultsScroll = () => {
			this.clearOptionTooltip();
			const results = this.panelBody;
			if (!results || !this.isTruncated()) return;
			if (results.scrollTop + results.clientHeight < results.scrollHeight - 200) return;
			const anchor = results.scrollTop;
			this.limit += this.normalizedPageSize();
			this.updateComplete.then(() => {
				if (this.panelBody) this.panelBody.scrollTop = anchor;
			});
		};
		this.handleOptionPointerLeave = (event) => {
			const next = event.relatedTarget;
			if (next instanceof Node && this.panelBody?.contains(next) && Boolean(next instanceof Element ? next.closest(".option") : next.parentElement?.closest(".option"))) return;
			this.resetHighlightToSelected();
			this.clearOptionTooltip();
		};
	}
	static {
		this.styles = pkImageBrowserStyles;
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			RequiredValidator()
		];
	}
	connectedCallback() {
		super.connectedCallback();
		this.limit = this.normalizedPageSize();
	}
	disconnectedCallback() {
		this.teardownDismissListeners();
		this.clearCloseTimer();
		this.clearTooltipOpenTimer();
		this.liveRegion?.destroy();
		this.liveRegion = null;
		super.disconnectedCallback();
	}
	willUpdate(changed) {
		if (changed.has("pageSize") && !this.open) this.limit = this.normalizedPageSize();
		super.willUpdate(changed);
	}
	updated(changed) {
		super.updated(changed);
		if (changed.has("open")) {
			if (this.open) this.attachDismissListeners();
			else if (!this.closing) this.teardownDismissListeners();
		}
		if ((changed.has("open") || changed.has("closing")) && (this.open || this.closing)) this.syncPanelPlacement();
		if (this.open && (changed.has("highlightedIndex") || changed.has("query") || changed.has("limit"))) this.scrollHighlightedIntoView();
		if (this.open && changed.has("loading") && !this.loading) this.resetHighlightForOpenCatalog();
	}
	get validationTarget() {
		return this.triggerElement ?? this;
	}
	syncFormValue() {
		this.setFormValue(this.value, this.value);
	}
	resetToDefaultValue() {
		this.value = this.defaultValue;
	}
	restoreFormState(state) {
		if (typeof state === "string") this.value = state;
	}
	async show() {
		if (this.open || this.closing || this.disabled || this.readonly) return;
		await this.openPanel();
	}
	async hide(source = "api") {
		if (!this.open || this.closing) return;
		await this.closePanel(source);
	}
	optionId(index) {
		return `${this.listboxId}-opt-${index}`;
	}
	groupHeadingId(groupIndex) {
		return `${this.listboxId}-group-${groupIndex}`;
	}
	normalizedPageSize() {
		return this.pageSize > 0 ? this.pageSize : DEFAULT_PAGE_SIZE;
	}
	resolveGroups() {
		if (this.groups.length > 0) return this.groups;
		if (this.items.length > 0) return [{
			name: "",
			items: this.items
		}];
		return [];
	}
	findItem(value) {
		if (value === "") return null;
		for (const group of this.resolveGroups()) {
			const found = group.items.find((item) => item.value === value);
			if (found) return found;
		}
		return null;
	}
	selectedItem() {
		return this.findItem(this.value);
	}
	triggerDisplay() {
		const selected = this.selectedItem();
		if (selected) return {
			label: selected.label,
			preview: selected.preview,
			isPlaceholder: false
		};
		if (this.value !== "") return {
			label: this.selectedLabel || this.value,
			preview: this.selectedPreview || void 0,
			isPlaceholder: false
		};
		return {
			label: this.placeholder,
			isPlaceholder: true
		};
	}
	/** Groups matching the query, each truncated to the current render budget. */
	visibleGroups() {
		const query = this.query.trim().toLowerCase();
		return this.resolveGroups().reduce((acc, group) => {
			const matched = query === "" ? group.items : group.items.filter((item) => item.label.toLowerCase().includes(query) || item.value.toLowerCase().includes(query));
			if (matched.length === 0) return acc;
			acc.push({
				name: group.name,
				total: matched.length,
				items: matched.slice(0, this.limit)
			});
			return acc;
		}, []);
	}
	flatVisibleItems() {
		return this.visibleGroups().flatMap((group) => group.items);
	}
	isTruncated() {
		return this.visibleGroups().some((group) => group.items.length < group.total);
	}
	activeDescendantId() {
		if (!this.open || this.highlightedIndex < 0) return null;
		return this.optionId(this.highlightedIndex);
	}
	triggerAccessibleName() {
		if (this.ariaLabel) {
			const display = this.triggerDisplay();
			if (display.isPlaceholder) return this.ariaLabel;
			return `${this.ariaLabel}, ${display.label}`;
		}
		return this.triggerDisplay().label;
	}
	announceResults() {
		if (this.loading) return;
		const items = this.flatVisibleItems();
		if (!this.query.trim()) return;
		if (!this.liveRegion) this.liveRegion = new LiveRegion("polite");
		this.liveRegion.announce(items.length === 0 ? this.emptyMessage : `${items.length} ${items.length === 1 ? "result" : "results"} available`);
	}
	resetHighlightForOpenCatalog() {
		const items = this.flatVisibleItems();
		if (items.length === 0) {
			this.highlightedIndex = -1;
			return;
		}
		const selectedIdx = items.findIndex((item) => item.value === this.value);
		this.highlightedIndex = selectedIdx >= 0 ? selectedIdx : 0;
	}
	setHighlightedIndex(index) {
		const items = this.flatVisibleItems();
		if (items.length === 0) {
			this.highlightedIndex = -1;
			return;
		}
		const next = Math.max(0, Math.min(index, items.length - 1));
		this.highlightedIndex = next;
		if (next >= items.length - 4 && this.isTruncated()) this.limit += this.normalizedPageSize();
	}
	scrollHighlightedIntoView() {
		if (this.highlightedIndex < 0 || !this.panelBody) return;
		const option = this.renderRoot.querySelector(`#${CSS.escape(this.optionId(this.highlightedIndex))}`);
		if (!option) return;
		scrollIntoView(option, this.panelBody, "vertical", "auto");
	}
	/** Column count of the CSS grid that owns the highlighted option (for 2D arrows). */
	columnCountNear(index) {
		const grid = this.renderRoot.querySelector(`#${CSS.escape(this.optionId(index))}`)?.closest(".grid");
		if (!grid) return 1;
		const options = [...grid.querySelectorAll(".option")];
		if (options.length === 0) return 1;
		const firstTop = options[0].offsetTop;
		let cols = 0;
		for (const candidate of options) {
			if (candidate.offsetTop !== firstTop) break;
			cols += 1;
		}
		return Math.max(1, cols);
	}
	moveHighlight(key) {
		const items = this.flatVisibleItems();
		if (items.length === 0) {
			this.highlightedIndex = -1;
			return;
		}
		let next = this.highlightedIndex;
		if (next < 0) {
			next = key === "ArrowUp" || key === "ArrowLeft" || key === "End" ? items.length - 1 : 0;
			this.setHighlightedIndex(next);
			return;
		}
		const cols = this.columnCountNear(next);
		switch (key) {
			case "ArrowRight":
				next = Math.min(next + 1, items.length - 1);
				break;
			case "ArrowLeft":
				next = Math.max(next - 1, 0);
				break;
			case "ArrowDown":
				next = Math.min(next + cols, items.length - 1);
				break;
			case "ArrowUp":
				next = Math.max(next - cols, 0);
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = items.length - 1;
				break;
			default: return;
		}
		this.setHighlightedIndex(next);
	}
	emitChange(next) {
		this.value = next;
		this.syncFormValue();
		this.updateValidity();
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: next },
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
	selectValue(next) {
		if (this.disabled || this.readonly) return;
		const previous = this.value;
		this.closePanel("api");
		this.query = "";
		this.limit = this.normalizedPageSize();
		this.highlightedIndex = -1;
		if (previous === next) {
			if (this.withClear && previous !== "") {
				this.emitChange("");
				this.dispatchEvent(new PkClearEvent());
			}
			return;
		}
		this.emitChange(next);
	}
	async openPanel() {
		if (this.open || this.closing || this.disabled || this.readonly) return;
		this.dispatchEvent(new PkShowEvent());
		this.closing = false;
		this.panelAnimated = false;
		this.query = "";
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
	async closePanel(source) {
		if (!this.open || this.closing) return;
		const hideEvent = new PkHideEvent(source);
		this.dispatchEvent(hideEvent);
		if (hideEvent.defaultPrevented) return;
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
			this.query = "";
			this.limit = this.normalizedPageSize();
			this.closeTimer = null;
			this.dispatchEvent(new PkAfterHideEvent());
		}, 100);
	}
	clearCloseTimer() {
		if (this.closeTimer != null) {
			window.clearTimeout(this.closeTimer);
			this.closeTimer = null;
		}
	}
	async syncPanelPlacement() {
		if (!this.popupElement || !this.panelElement) return;
		syncPopupPlacementAnimation(this.panelElement, this.placement);
		const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, { requireEvent: true });
		syncPopupPlacementAnimation(this.panelElement, placement);
	}
	attachDismissListeners() {
		registerDismissible(this);
		document.addEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.addEventListener("keydown", this.onDocumentKeyDown, true);
	}
	teardownDismissListeners() {
		unregisterDismissible(this);
		document.removeEventListener("pointerdown", this.onDocumentPointerDown, true);
		document.removeEventListener("keydown", this.onDocumentKeyDown, true);
	}
	async focusSearchWhenReady() {
		const started = performance.now();
		while (this.open && performance.now() - started < 2e3) {
			const input = this.searchInput;
			if (input && getComputedStyle(input).visibility !== "hidden") {
				input.focus({ preventScroll: true });
				if (document.activeElement === input) return;
			}
			await new Promise((resolve) => requestAnimationFrame(() => resolve()));
		}
	}
	renderPreview(preview, className) {
		if (!preview) return nothing;
		if (isInlineSvg(preview)) return html`<span class=${className} aria-hidden="true">${unsafeSVG(preview)}</span>`;
		return html`<img class=${className} src=${preview} alt="" />`;
	}
	usesInlineLabels() {
		return this.labelMode === "inline";
	}
	usesTooltipLabels() {
		return this.labelMode === "tooltip";
	}
	/** Hover caption via one shared tooltip — avoids N×pk-tooltip in large catalogs. */
	showOptionTooltip(optionId, label) {
		if (!this.usesTooltipLabels()) return;
		const alreadyTracking = this.tooltipFor !== "";
		this.tooltipFor = optionId;
		this.tooltipContent = label;
		this.clearTooltipOpenTimer();
		const openNow = () => {
			this.tooltipOpenTimer = null;
			this.updateComplete.then(() => {
				this.optionTooltip?.show();
			});
		};
		if (alreadyTracking) {
			openNow();
			return;
		}
		this.tooltipOpenTimer = window.setTimeout(openNow, 280);
	}
	clearOptionTooltip() {
		this.clearTooltipOpenTimer();
		this.tooltipFor = "";
		this.tooltipContent = "";
		this.optionTooltip?.hide();
	}
	clearTooltipOpenTimer() {
		if (this.tooltipOpenTimer != null) {
			window.clearTimeout(this.tooltipOpenTimer);
			this.tooltipOpenTimer = null;
		}
	}
	handleOptionPointerEnter(index, label) {
		this.highlightedIndex = index;
		this.showOptionTooltip(this.optionId(index), label);
	}
	resetHighlightToSelected() {
		const items = this.flatVisibleItems();
		if (items.length === 0) {
			this.highlightedIndex = -1;
			return;
		}
		const selectedIdx = items.findIndex((item) => item.value === this.value);
		this.highlightedIndex = selectedIdx;
	}
	renderTriggerContents() {
		const display = this.triggerDisplay();
		return html`
            <span class="trigger-main">
                ${this.renderPreview(display.preview, "trigger-preview")}
                <span
                    class=${classMap({
			"trigger-label": true,
			"is-placeholder": display.isPlaceholder
		})}
                    aria-hidden="true"
                >${display.label}</span>
            </span>
        `;
	}
	renderResults() {
		if (this.loading) return html`
                <div
                    id=${this.listboxId}
                    role="listbox"
                    aria-label=${this.ariaLabel || "Options"}
                    aria-busy="true"
                >
                    <div part="loading" class="loading" role="status" aria-label="Loading">
                        <pk-spinner size="sm" centered></pk-spinner>
                    </div>
                </div>
            `;
		const groups = this.visibleGroups();
		if (groups.length === 0) return html`
                <div
                    id=${this.listboxId}
                    role="listbox"
                    aria-label=${this.ariaLabel || "Options"}
                >
                    <p class="notice" part="empty" role="status">${this.emptyMessage}</p>
                </div>
            `;
		let flatIndex = 0;
		return html`
            <div
                id=${this.listboxId}
                role="listbox"
                aria-label=${this.ariaLabel || "Options"}
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
					"is-highlighted": highlighted,
					"is-selected": selected
				})}
                                role="option"
                                tabindex="-1"
                                aria-label=${item.label}
                                aria-selected=${selected ? "true" : "false"}
                                @click=${() => this.selectValue(item.value)}
                                @mouseenter=${() => this.handleOptionPointerEnter(index, item.label)}
                                @mouseleave=${this.handleOptionPointerLeave}
                            >
                                ${this.renderPreview(item.preview, "option-preview")}
                                ${this.usesInlineLabels() ? html`<span class="option-label" aria-hidden="true">${item.label}</span>` : nothing}
                            </button>
                        `;
			});
			return html`
                        <div
                            class="group"
                            role=${group.name ? "group" : nothing}
                            aria-labelledby=${group.name ? headingId : nothing}
                        >
                            ${group.name ? html`
                                    <h6 class="group-heading" id=${headingId}>
                                        <span>${group.name}</span>
                                        ${group.items.length < group.total ? html`
                                                <span class="group-heading-count">
                                                    Showing ${group.items.length} of ${group.total}
                                                </span>
                                            ` : nothing}
                                    </h6>
                                ` : nothing}
                            <div class="grid">
                                ${options}
                            </div>
                        </div>
                    `;
		})}
            </div>
        `;
	}
	render() {
		const showClear = this.withClear && this.value !== "" && !this.disabled && !this.readonly;
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
			"is-disabled": this.disabled || this.readonly,
			"is-open": this.open
		})}
            >
                <button
                    type="button"
                    part="trigger"
                    class="trigger"
                    ?disabled=${this.disabled || this.readonly}
                    aria-label=${this.triggerAccessibleName()}
                    aria-haspopup="listbox"
                    aria-expanded=${this.open ? "true" : "false"}
                    aria-controls=${this.listboxId}
                    @click=${this.togglePanel}
                    @keydown=${this.handleTriggerKeyDown}
                >
                    ${this.renderTriggerContents()}
                </button>
                ${showClear ? html`
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
                    ` : nothing}
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
                .anchor=${this.controlElement ?? this.triggerElement ?? ""}
                .placement=${this.placement}
                .distance=${this.sideOffset}
                flip
                shift
            >
                <div
                    part="panel"
                    class=${classMap({
			panel: true,
			"pk-popup-content": true,
			closing: this.closing
		})}
                    tabindex="-1"
                    ?hidden=${!panelActive}
                    data-open=${this.panelAnimated && !this.closing ? "" : nothing}
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
                            aria-expanded=${this.open ? "true" : "false"}
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
                    ${this.usesTooltipLabels() && panelActive ? html`
                            <pk-tooltip
                                class="option-tooltip"
                                for=${this.tooltipFor}
                                content=${this.tooltipContent}
                                placement="top"
                                trigger="manual"
                            ></pk-tooltip>
                        ` : nothing}
                </div>
            </pk-popup>
        `;
	}
};
__decorate([property({ reflect: true })], PkImageBrowser.prototype, "size", void 0);
__decorate([property({ reflect: true })], PkImageBrowser.prototype, "mode", void 0);
__decorate([property({ reflect: true })], PkImageBrowser.prototype, "width", void 0);
__decorate([property({
	reflect: true,
	attribute: "label-mode"
})], PkImageBrowser.prototype, "labelMode", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkImageBrowser.prototype, "invalid", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkImageBrowser.prototype, "readonly", void 0);
__decorate([property()], PkImageBrowser.prototype, "value", void 0);
__decorate([property({ attribute: "default-value" })], PkImageBrowser.prototype, "defaultValue", void 0);
__decorate([property()], PkImageBrowser.prototype, "placeholder", void 0);
__decorate([property({ attribute: "search-placeholder" })], PkImageBrowser.prototype, "searchPlaceholder", void 0);
__decorate([property({ attribute: "empty-message" })], PkImageBrowser.prototype, "emptyMessage", void 0);
__decorate([property({ attribute: "aria-label" })], PkImageBrowser.prototype, "ariaLabel", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkImageBrowser.prototype, "loading", void 0);
__decorate([property({
	type: Boolean,
	reflect: true,
	attribute: "with-clear"
})], PkImageBrowser.prototype, "withClear", void 0);
__decorate([property({ attribute: false })], PkImageBrowser.prototype, "items", void 0);
__decorate([property({ attribute: false })], PkImageBrowser.prototype, "groups", void 0);
__decorate([property({ attribute: "selected-label" })], PkImageBrowser.prototype, "selectedLabel", void 0);
__decorate([property({ attribute: "selected-preview" })], PkImageBrowser.prototype, "selectedPreview", void 0);
__decorate([property({ reflect: true })], PkImageBrowser.prototype, "placement", void 0);
__decorate([property({
	type: Number,
	attribute: "side-offset"
})], PkImageBrowser.prototype, "sideOffset", void 0);
__decorate([property({
	type: Number,
	attribute: "page-size"
})], PkImageBrowser.prototype, "pageSize", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkImageBrowser.prototype, "open", void 0);
__decorate([state()], PkImageBrowser.prototype, "query", void 0);
__decorate([state()], PkImageBrowser.prototype, "limit", void 0);
__decorate([state()], PkImageBrowser.prototype, "closing", void 0);
__decorate([state()], PkImageBrowser.prototype, "panelAnimated", void 0);
__decorate([state()], PkImageBrowser.prototype, "highlightedIndex", void 0);
__decorate([state()], PkImageBrowser.prototype, "tooltipFor", void 0);
__decorate([state()], PkImageBrowser.prototype, "tooltipContent", void 0);
__decorate([query(".value-input")], PkImageBrowser.prototype, "input", void 0);
__decorate([query(".trigger")], PkImageBrowser.prototype, "triggerElement", void 0);
__decorate([query(".control")], PkImageBrowser.prototype, "controlElement", void 0);
__decorate([query("pk-popup")], PkImageBrowser.prototype, "popupElement", void 0);
__decorate([query(".panel")], PkImageBrowser.prototype, "panelElement", void 0);
__decorate([query(".panel-input")], PkImageBrowser.prototype, "searchInput", void 0);
__decorate([query(".panel-body")], PkImageBrowser.prototype, "panelBody", void 0);
__decorate([query(".option-tooltip")], PkImageBrowser.prototype, "optionTooltip", void 0);
PkImageBrowser = __decorate([customElement("pk-image-browser")], PkImageBrowser);
//#endregion
export { PkImageBrowser as t };

//# sourceMappingURL=pk-image-browser-BumEF2jS.js.map