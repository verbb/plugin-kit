import { d as registerDismissible, f as unregisterDismissible, n as uniqueId, s as scrollIntoView, t as LiveRegion, u as isTopDismissible } from "./pk-a11y-Cx5RZvhu.js";
import { a as o, c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, s as iconStyles } from "./pk-base-BlxAYXJD.js";
import { J as xmark, h as chevronDown } from "./svg-BCGsRUz7.js";
import { t as MirrorValidator } from "./mirror-validator-DEz3BsbN.js";
import { t as HasSlotController } from "./has-slot-BZDcCpf9.js";
import { t as PkClearEvent } from "./pk-clear-BRS8vkV-.js";
import { n as renderIconHtml } from "./render-BCU9WDSk.js";
import { i as PkShowEvent, n as PkAfterShowEvent, r as PkHideEvent, t as PkAfterHideEvent } from "./overlay-lifecycle-BG4QMRLw.js";
import { i as waitForPopupReposition, r as syncPopupPlacementAnimation } from "./popup-placement-animation-BPjq650B.js";
import { t as popupContentAnimationStyles } from "./popup-content-animation.styles-C9ffC35f.js";
import "./pk-popup-BYFbKaHH.js";
import { n as isPointerInsideOverlay, t as isEventInsideOverlay } from "./popup-pointer-BTS3Y6LE.js";
import { a as isListboxTypeToSelectKey, i as handleListboxKeyDown, n as LISTBOX_NAVIGATION_KEYS, t as syncListboxSeparators } from "./sync-listbox-separators-CT3oGzTf.js";
//#region src/events/pk-create.ts
/** Fired before a combobox creates a new option — mirrors  `pk-create`. */
var PkCreateEvent = class extends Event {
	constructor(inputValue) {
		super("pk-create", {
			bubbles: true,
			cancelable: true,
			composed: true
		});
		this.inputValue = inputValue;
	}
};
//#endregion
//#region src/components/combobox/pk-combobox.styles.ts
var pkComboboxStyles = [popupContentAnimationStyles, i`
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
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-default);
            --pk-combobox-padding-block: 6px;
            --pk-combobox-padding-inline: 10px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-line-height: var(--pk-input-control-line-height, 1.25rem);
            --pk-combobox-decoration-size: 0.875rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 2rem;
            --pk-select-item-font-size: 14px;
            --pk-select-item-line-height: 1.4;
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 ComboboxLabel default: text-xs → 12px (was 11px). */
            --pk-select-group-label-font-size: 12px;
        }

        :host([width='full']) {
            display: block;
            width: 100%;
        }

        :host([width='full']) .control {
            width: 100%;
        }

        .control {
            display: inline-flex;
            align-items: center;
            --pk-combobox-control-gap: 0.5rem;
            gap: var(--pk-combobox-control-gap);
            /* Fill the host — consumers set min-width/width on :host; fit-content here
               left a dead hit strip beside the painted field (same class of bug as dropdown). */
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: var(--pk-combobox-min-height);
            margin: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            border: 1px solid transparent;
            border-radius: var(--pk-radius-lg);
            --pk-combobox-fill: var(--pk-color-slate-250);
            --pk-combobox-fill-hover: var(--pk-color-slate-300);
            background: var(--pk-combobox-fill);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            line-height: var(--pk-input-control-line-height, 1.25rem);
            white-space: nowrap;
            cursor: text;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        .control[data-popup-open] {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host(:not([disabled])) .control:hover:not(.is-disabled) {
            background: var(--pk-combobox-fill-hover);
        }

        :host(:not([disabled])) .control[data-popup-open]:hover:not(.is-disabled),
        :host(:not([disabled])) .control[data-popup-open]:focus-within:not(.is-disabled) {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host(:not([invalid]):not(:state(user-invalid))) .control:focus-within,
        :host(:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
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
            color: var(--pk-color-gray-600);
        }

        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            width: var(--pk-combobox-decoration-size);
            height: var(--pk-combobox-decoration-size);
        }

        .combobox-input {
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

        .combobox-input::placeholder {
            color: currentColor;
        }

        :host([data-has-value]) .combobox-input::placeholder,
        .control[data-popup-open] .combobox-input::placeholder,
        .control:focus-within .combobox-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        /* Expand/clear: the button box IS the hit target. Negative margins cancel the
           control padding / half-gap in layout, while matching extra width/height keeps
           the painted (and clickable) box flush to the field edge — so flex centering
           places the glyph in the middle of the real hit area. */
        .icon-button,
        .clear-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            align-self: stretch;
            box-sizing: border-box;
            width: calc(var(--pk-combobox-decoration-size) + var(--pk-combobox-control-gap));
            height: auto;
            min-height: var(--pk-combobox-decoration-size);
            margin-block: calc(-1 * var(--pk-combobox-padding-block));
            margin-inline: calc(-0.5 * var(--pk-combobox-control-gap));
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
            outline: none;
        }

        /* Trailing control absorbs the control's inline-end padding into its hit box. */
        .control > .expand-button,
        .control > .clear-button:last-child {
            width: calc(
                var(--pk-combobox-decoration-size) + (0.5 * var(--pk-combobox-control-gap)) +
                    var(--pk-combobox-padding-inline)
            );
            margin-inline-start: calc(-0.5 * var(--pk-combobox-control-gap));
            margin-inline-end: calc(-1 * var(--pk-combobox-padding-inline));
        }

        .icon-button:disabled,
        .clear-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
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

        .icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
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

        .control--multiple {
            --pk-combobox-control-gap: 0.25rem;
            flex-wrap: wrap;
            align-items: center;
            align-content: center;
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            gap: var(--pk-combobox-control-gap);
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius);
            background: var(--pk-input-bg);
            cursor: text;
        }

        :host([multiple][width='full']) .control--multiple {
            width: 100%;
        }

        :host([multiple]) .control:hover:not(.is-disabled) {
            background: var(--pk-input-bg);
        }

        :host([multiple]:not([invalid]):not(:state(user-invalid))) .control[data-popup-open],
        :host([multiple]:not([invalid]):not(:state(user-invalid))) .control:focus-within,
        :host([multiple]:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-input-bg);
        }

        .chips {
            display: flex;
            flex: 0 1 auto;
            flex-wrap: wrap;
            gap: 0.25rem;
            align-items: center;
            min-width: 0;
        }

        .tag {
            /* v1 ComboboxChip: text-xs + py-[2px] → 20px; face color gray-700. */
            --pk-combobox-tag-height: 20px;
            --pk-combobox-tag-padding-inline-start: 6px;
            --pk-combobox-tag-remove-width: 1.25rem;
            display: inline-flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            gap: 0.125rem;
            max-width: 100%;
            height: var(--pk-combobox-tag-height);
            padding-block: 0;
            padding-inline: var(--pk-combobox-tag-padding-inline-start) 0;
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-slate-200);
            color: var(--pk-color-gray-700);
            font-size: 12px;
            font-weight: 500;
            line-height: 1rem;
            white-space: nowrap;
        }

        .tag-label {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Chip remove: fill the chip end so the glyph centers in the real target. */
        .tag-remove {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            align-self: stretch;
            box-sizing: border-box;
            width: var(--pk-combobox-tag-remove-width);
            height: auto;
            min-height: 0;
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: inherit;
            cursor: pointer;
            opacity: 0.5;
            outline: none;
        }

        .tag-remove:hover {
            opacity: 1;
        }

        .tag-remove-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            pointer-events: none;
        }

        .tag-remove-icon svg {
            display: block;
            width: 0.625rem;
            height: 0.625rem;
        }

        .combobox-input--inline {
            flex: 1 1 4rem;
            width: auto;
            min-width: 4rem;
            padding: 0;
        }

        :host([multiple]) .control:not([data-popup-open]):not(:focus-within) {
            background: var(--pk-input-bg);
        }

        :host([multiple]) .combobox-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        .create-option {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height);
            padding-block: var(--pk-select-item-padding-block);
            padding-inline: var(--pk-select-item-padding-inline);
            border: 0;
            background: transparent;
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-select-item-font-size);
            line-height: var(--pk-select-item-line-height);
            text-align: left;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
        }

        .create-option:hover,
        .create-option.is-highlighted {
            background: var(--pk-color-slate-100);
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
            min-width: var(--pk-combobox-anchor-width, 8rem);
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

        .panel--popup {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel--popup .panel-body {
            flex: 1 1 auto;
            min-height: 0;
        }

        :host([popup-mode]) .control--popup {
            display: inline-flex;
            width: 100%;
            max-width: 100%;
            min-height: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            gap: 0;
            cursor: default;
        }

        :host([popup-mode]) .control--popup:hover:not(.is-disabled) {
            background: transparent;
        }

        /* Popup mode paints chrome on the trigger / panel input — do not keep the
           shared .control[data-popup-open] focus ring around the closed-state button. */
        :host([popup-mode]) .control--popup[data-popup-open],
        :host([popup-mode]) .control--popup[data-popup-open]:hover:not(.is-disabled),
        :host([popup-mode]) .control--popup[data-popup-open]:focus-within:not(.is-disabled),
        :host([popup-mode]:not([invalid]):not(:state(user-invalid))) .control--popup:focus-within,
        :host([popup-mode]:not([invalid]):not(:state(user-invalid))[data-state='focus-visible']) .control--popup {
            border: 0;
            box-shadow: none;
            background: transparent;
        }

        .popup-trigger {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            width: 100%;
            min-width: 12rem;
            max-width: 100%;
            min-height: var(--pk-combobox-trigger-min-height);
            margin: 0;
            padding: var(--pk-combobox-padding-block) var(--pk-combobox-padding-inline);
            border: 1px solid transparent;
            border-radius: var(--pk-input-border-radius);
            /* Match input-mode fill / v1 default Button — not a white outlined field. */
            background: var(--pk-combobox-fill, var(--pk-color-slate-250));
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            font-weight: 400;
            line-height: var(--pk-combobox-line-height);
            text-align: left;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
        }

        .popup-trigger:hover:not(:disabled) {
            background: var(--pk-combobox-fill-hover, var(--pk-color-slate-300));
        }

        .popup-trigger:active:not(:disabled),
        .control--popup[data-popup-open] .popup-trigger:not(:disabled) {
            background: var(--pk-combobox-fill-hover, var(--pk-color-slate-300));
        }

        .control--popup[data-popup-open] .popup-trigger:not(:disabled) {
            border-color: transparent;
            box-shadow: none;
        }

        .control--popup:not([data-popup-open]) .popup-trigger:focus-visible,
        :host([data-state='focus-visible']) .control--popup:not([data-popup-open]) .popup-trigger {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        .popup-trigger:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .popup-trigger-value {
            flex: 1 1 auto;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .popup-trigger-value.is-placeholder {
            /* Trigger label is button text, not an input placeholder — keep it readable. */
            color: var(--pk-color-gray-700);
        }

        .popup-trigger-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            line-height: 0;
        }

        .popup-trigger-icon svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
        }

        .panel-search {
            flex: none;
            padding: 0.25rem;
        }

        .panel-input {
            display: block;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 6px 8px;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius);
            background: color-mix(in srgb, var(--pk-input-bg) 30%, transparent);
            color: var(--pk-color-gray-700);
            font: inherit;
            font-size: var(--pk-combobox-font-size);
            line-height: 1.4;
            outline: none;
            box-sizing: border-box;
        }

        .panel-input::placeholder {
            color: var(--pk-color-gray-400);
        }

        .panel-input:focus {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
            background: var(--pk-color-white);
        }

        :host([popup-mode][size='xs']) .popup-trigger-icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([popup-mode][size='xs']) .panel-input {
            padding: 4px 8px;
            font-size: 11px;
        }

        :host([popup-mode][size='sm']) .panel-input {
            font-size: 12px;
        }

        :host([popup-mode][size='lg']) .panel-input {
            padding-block: 8px;
            padding-inline: 12px;
        }

        :host([popup-mode][width='full']) .popup-trigger {
            width: 100%;
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

        .empty {
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

        :host([multiple][invalid]) .control,
        :host([multiple]:state(user-invalid)) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .control:focus-within,
        :host([invalid][data-state='focus-visible']) .control,
        :host(:state(user-invalid)) .control:focus-within,
        :host(:state(user-invalid)[data-state='focus-visible']) .control {
            border-color: var(--pk-color-rose-600);
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) {
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-xs);
            --pk-combobox-padding-block: 4px;
            --pk-combobox-padding-inline: 8px;
            --pk-combobox-font-size: 11px;
            --pk-combobox-decoration-size: 0.625rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 4px;
            --pk-select-item-padding-inline: 8px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 11px;
            --pk-select-item-indicator-size: 0.75rem;
            --pk-select-item-indicator-inset: 0.5rem;
            /* v1 ComboboxLabel xs: text-[11px] */
            --pk-select-group-label-font-size: 11px;
        }

        :host([size='xs']) .control {
            border-radius: var(--pk-radius-sm);
        }

        :host([size='xs']) .icon svg,
        :host([size='xs']) .clear-button-icon svg {
            width: 0.625rem;
            height: 0.625rem;
        }

        :host([size='sm']) {
            --pk-combobox-min-height: 0;
            --pk-combobox-trigger-min-height: var(--pk-btn-height-sm);
            --pk-combobox-padding-block: 6px;
            --pk-combobox-padding-inline: 10px;
            --pk-combobox-font-size: 12px;
            --pk-combobox-decoration-size: 0.6875rem;
            --pk-select-item-min-height: 0;
            --pk-select-item-padding-block: 6px;
            --pk-select-item-padding-inline: 10px;
            --pk-select-item-padding-inline-end: 1.75rem;
            --pk-select-item-font-size: 12px;
            --pk-select-item-indicator-inset: 0.625rem;
            /* v1 ComboboxLabel sm: text-[12px] — empty dropzone field picker uses sm. */
            --pk-select-group-label-font-size: 12px;
        }

        :host([size='sm']) .control {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .popup-trigger {
            border-radius: var(--pk-radius-md);
        }

        :host([size='sm']) .icon svg,
        :host([size='sm']) .clear-button-icon svg {
            width: 0.6875rem;
            height: 0.6875rem;
        }

        :host([size='lg']) {
            --pk-combobox-trigger-min-height: var(--pk-btn-height-lg);
            --pk-combobox-padding-block: 8px;
            --pk-combobox-padding-inline: 12px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-decoration-size: 1rem;
            --pk-select-item-padding-block: 8px;
            --pk-select-item-padding-inline: 12px;
            --pk-select-item-font-size: 14px;
            --pk-select-item-indicator-inset: 0.75rem;
            /* v1 ComboboxLabel lg: text-sm → 14px */
            --pk-select-group-label-font-size: 14px;
        }

        :host([size='xl']) {
            --pk-combobox-trigger-min-height: var(--pk-btn-height-xl);
            --pk-combobox-padding-block: 10px;
            --pk-combobox-padding-inline: 14px;
            --pk-combobox-font-size: var(--pk-font-size-base);
            --pk-combobox-decoration-size: 1.125rem;
            --pk-select-item-padding-block: 10px;
            --pk-select-item-padding-inline: 14px;
            --pk-select-item-padding-inline-end: 2.25rem;
            --pk-select-item-font-size: 14px;
            --pk-select-item-indicator-inset: 0.875rem;
            /* v1 ComboboxLabel xl: text-base → 16px */
            --pk-select-group-label-font-size: 16px;
        }

        :host([size='xl']) .icon svg,
        :host([size='xl']) .clear-button-icon svg {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`];
//#endregion
//#region src/components/combobox/pk-combobox.ts
var CHEVRON_ICON = renderIconHtml(chevronDown);
var XMARK_ICON = renderIconHtml(xmark);
var PkCombobox = class PkCombobox extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.open = false;
		this.multiple = false;
		this.placement = "bottom-start";
		this.sideOffset = 6;
		this.clearable = false;
		this.withClear = false;
		this.allowCreate = false;
		this.allowCustomValue = false;
		this.autoHighlight = false;
		this.popupMode = false;
		this.searchPlaceholder = "Search";
		this.invalid = false;
		this.size = "default";
		this.placeholder = "";
		this.emptyMessage = "No options found.";
		this.value = "";
		this.defaultValue = "";
		this.values = [];
		this.defaultValues = [];
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
		this.listboxId = uniqueId("pk-combobox-listbox");
		this.inputId = uniqueId("pk-combobox-input");
		this.createOptionId = uniqueId("pk-combobox-create");
		this.options = [];
		this.inputValue = "";
		this.hasInputSinceOpening = false;
		this.highlightedIndex = -1;
		this.createOptionHighlighted = false;
		this.closing = false;
		this.panelAnimated = false;
		this.dismissRegistered = false;
		this.panelEventTarget = null;
		this.asyncFetchRequestId = 0;
		this.selectedOptionMeta = null;
		this.asyncLoading = false;
		this.asyncError = null;
		this.handleOptionsMutation = (options = {}) => {
			const next = this.getOptionElements();
			const changed = next.length !== this.options.length || next.some((option, index) => option !== this.options[index]);
			this.options = next;
			this.applySelection();
			if (options.render !== false && changed) this.requestUpdate();
		};
		this.syncOptions = () => {
			this.handleOptionsMutation({ render: true });
		};
		this.togglePanel = (event) => {
			event?.preventDefault();
			event?.stopPropagation();
			if (this.disabled) return;
			if (this.open || this.closing) this.closePanel("api");
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
			const panelInput = this.panelInput;
			if (panelInput && event.composedPath().includes(panelInput)) return;
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
			if (this.multiple) {
				this.values = this.values.includes(value) ? this.values.filter((item) => item !== value) : [...this.values, value];
				this.inputValue = "";
				this.applySelection();
				this.emitValueChange();
				this.activeInput?.focus({ preventScroll: true });
				return;
			}
			this.value = value;
			this.syncSelectedOptionMeta();
			this.applySelection();
			this.closePanel("api");
			this.emitValueChange();
		};
		this.handleOptionHighlight = (event) => {
			if (!this.open) return;
			const index = this.getEnabledVisibleOptions().findIndex((option) => option.value === event.detail.value);
			if (index === -1 || index === this.highlightedIndex) return;
			this.highlightedIndex = index;
			this.syncHighlight();
		};
		this.handleControlMouseDown = (event) => {
			if (this.disabled || this.usesPopupMode) return;
			if (event.composedPath().some((node) => {
				if (!(node instanceof HTMLElement)) return false;
				return node.classList.contains("icon-button") || node.classList.contains("clear-button") || node.classList.contains("tag-remove");
			})) return;
			const isInput = event.target === this.activeInput;
			if (!this.open && !this.closing) {
				if (!isInput) event.preventDefault();
				this.activeInput?.focus({ preventScroll: true });
				this.openPanel();
				return;
			}
			if (!isInput) {
				event.preventDefault();
				this.activeInput?.focus({ preventScroll: true });
			}
		};
		this.handleTriggerKeyDown = (event) => {
			if (this.disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				this.togglePanel(event);
				return;
			}
			if (event.key === "ArrowDown" && !this.open) {
				event.preventDefault();
				this.openPanel();
			}
		};
		this.handleListboxKeyDownEvent = (event) => {
			if (!this.open) return;
			this.onListboxKeyDown(event.detail.keyboardEvent);
		};
		this.handleCreateMouseEnter = () => {
			if (!this.open) return;
			const enabled = this.getEnabledVisibleOptions();
			this.highlightedIndex = enabled.length;
			this.syncHighlight();
		};
		this.handleCreateKeyDown = (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.onListboxKeyDown(event);
		};
	}
	static {
		this.styles = pkComboboxStyles;
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			{
				observedAttributes: ["required"],
				checkValidity: (element) => {
					const combobox = element;
					const result = {
						message: "Please select an item in the list.",
						isValid: true,
						invalidKeys: []
					};
					if (!combobox.required) return result;
					if (!(combobox.multiple ? combobox.values.length === 0 : !combobox.value)) return result;
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
	get panelInput() {
		return this.panelElement?.querySelector(".panel-input");
	}
	get panelBodyElement() {
		return this.panelElement?.querySelector(".panel-body");
	}
	get usesPopupMode() {
		return this.popupMode && !this.multiple;
	}
	get activeInput() {
		return this.usesPopupMode ? this.panelInput : this.controlInput;
	}
	/** Combobox keeps focus on the text field and uses `aria-activedescendant` for highlight. */
	keepsFocusOnInput() {
		return Boolean(this.activeInput);
	}
	maintainInputFocus() {
		this.activeInput?.focus({ preventScroll: true });
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
		window.clearTimeout(this.asyncFetchTimer);
		this.fetchAbortController?.abort();
		this.closePanel("api");
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") || changed.has("values") || changed.has("multiple")) {
			this.syncHasValueAttribute();
			this.syncSelectedOptionMeta();
			this.applySelection();
		}
		super.updated(changed);
	}
	get validationTarget() {
		return this.activeInput ?? this.popupTrigger ?? this.controlElement;
	}
	getAriaMirrorTarget() {
		return this.activeInput ?? this.popupTrigger ?? this.controlElement ?? null;
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
		this.inputValue = "";
		this.applySelection();
	}
	restoreFormState(state) {
		if (state instanceof FormData && this.name) {
			this.values = state.getAll(this.name).map(String);
			return;
		}
		if (typeof state === "string") this.value = state;
	}
	syncHasValueAttribute() {
		this.toggleAttribute("data-has-value", this.hasSelection());
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
	isOptionInHiddenGroup(option) {
		const group = option.closest("pk-option-group");
		return Boolean(group?.hidden);
	}
	defaultFilter(option, query) {
		const label = option.getLabel().toLowerCase();
		const value = option.value.toLowerCase();
		const searchText = (option.getSearchText?.() ?? label).toLowerCase();
		return label.includes(query) || value.includes(query) || searchText.includes(query);
	}
	matchesFilter(option, query) {
		if (this.filter) return this.filter(option, query);
		return this.defaultFilter(option, query);
	}
	getFilterQuery() {
		if (!this.open) return "";
		if (!this.multiple && !this.hasInputSinceOpening && !this.usesPopupMode) return "";
		return this.inputValue.trim().toLowerCase();
	}
	getVisibleOptions() {
		if (this.usesAsyncSearch) return this.options.filter((option) => !this.isOptionInHiddenGroup(option));
		const filter = this.getFilterQuery();
		return this.options.filter((option) => {
			if (this.isOptionInHiddenGroup(option)) return false;
			if (!filter) return true;
			return this.matchesFilter(option, filter);
		});
	}
	getEnabledVisibleOptions() {
		return this.getVisibleOptions().filter((option) => !option.disabled);
	}
	getSelectedOptions() {
		if (this.multiple) {
			const optionsByValue = new Map(this.options.map((option) => [option.value, option]));
			return this.values.map((value) => optionsByValue.get(value)).filter((option) => option !== void 0);
		}
		const selected = this.options.find((option) => option.value === this.value);
		return selected ? [selected] : [];
	}
	getSelectedOption() {
		return this.options.find((option) => option.value === this.value);
	}
	get usesAsyncSearch() {
		return this.async && Boolean(this.fetchOptions) && !this.multiple && !this.usesPopupMode;
	}
	getSelectedLabel() {
		return this.getSelectedOption()?.getLabel() ?? this.selectedOptionMeta?.label ?? this.value;
	}
	clearAsyncOptionNodes() {
		this.querySelectorAll(":scope > pk-option, :scope > pk-option-group, :scope > pk-separator").forEach((node) => node.remove());
	}
	renderAsyncOptionNodes(items) {
		const merged = this.mergeAsyncItems(items);
		this.clearAsyncOptionNodes();
		for (const item of merged) {
			const option = document.createElement("pk-option");
			option.value = item.value;
			option.textContent = item.label;
			this.append(option);
		}
		this.handleOptionsMutation({ render: true });
	}
	mergeAsyncItems(items) {
		if (!this.value) return items;
		const selected = this.selectedOptionMeta ?? {
			value: this.value,
			label: this.getSelectedOption()?.getLabel() ?? this.value
		};
		if (items.some((item) => item.value === selected.value)) return items;
		return [...items, selected];
	}
	syncSelectedOptionMeta() {
		if (!this.value) {
			this.selectedOptionMeta = null;
			return;
		}
		const selected = this.getSelectedOption();
		if (selected) this.selectedOptionMeta = {
			value: selected.value,
			label: selected.getLabel()
		};
	}
	scheduleAsyncFetch(query) {
		window.clearTimeout(this.asyncFetchTimer);
		this.asyncFetchTimer = window.setTimeout(() => {
			this.runAsyncFetch(query);
		}, 200);
	}
	async runAsyncFetch(query) {
		if (!this.fetchOptions) return;
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
			if (requestId !== this.asyncFetchRequestId) return;
			this.renderAsyncOptionNodes(results);
		} catch (error) {
			if (this.fetchAbortController?.signal.aborted || requestId !== this.asyncFetchRequestId) return;
			if (error instanceof DOMException && error.name === "AbortError") return;
			console.error("Failed to load combobox options:", error);
			this.asyncError = "Failed to load options. Please try again.";
			this.renderAsyncOptionNodes([]);
		} finally {
			if (requestId === this.asyncFetchRequestId) this.asyncLoading = false;
		}
	}
	getAsyncStatusMessage() {
		if (!this.usesAsyncSearch || !this.open) return null;
		if (this.asyncLoading) return this.loadingMessage;
		if (this.asyncError) return this.asyncError;
		const query = this.inputValue.trim();
		if (!query) return this.value ? null : this.startTypingMessage;
		if (this.getEnabledVisibleOptions().length === 0 && !this.shouldShowCreateOption()) return `No matches for "${query}".`;
		return null;
	}
	shouldShowAsyncEmpty() {
		if (!this.usesAsyncSearch || !this.open) return false;
		if (!this.inputValue.trim() || this.asyncLoading || this.asyncError) return false;
		return this.getEnabledVisibleOptions().length === 0 && !this.shouldShowCreateOption();
	}
	isSelected(value) {
		if (this.multiple) return this.values.includes(value);
		return this.value === value;
	}
	getDisplayInputValue() {
		if (this.usesPopupMode || this.multiple || this.open) return this.inputValue;
		return this.hasSelection() ? this.getSelectedLabel() : "";
	}
	getTriggerDisplayValue() {
		return this.hasSelection() ? this.getSelectedLabel() : this.placeholder;
	}
	isTriggerPlaceholder() {
		return !this.hasSelection();
	}
	hasSelection() {
		if (this.multiple) return this.values.length > 0;
		return Boolean(this.getSelectedOption() || this.selectedOptionMeta || this.value);
	}
	shouldShowCreateOption() {
		if (!this.allowCreate || !this.open) return false;
		if (!this.multiple && !this.hasInputSinceOpening) return false;
		const query = this.inputValue.trim();
		if (!query) return false;
		const normalized = query.toLowerCase();
		return !this.options.some((option) => {
			return option.getLabel().toLowerCase() === normalized || option.value.toLowerCase() === normalized;
		});
	}
	getListboxNavItems() {
		const enabled = this.getEnabledVisibleOptions();
		if (this.shouldShowCreateOption() && this.createOptionElement) return [...enabled, this.createOptionElement];
		return enabled;
	}
	applySelection() {
		const visible = this.getVisibleOptions();
		const filterQuery = this.open ? this.getFilterQuery() : "";
		for (const option of this.options) {
			option.selected = this.isSelected(option.value);
			option.hidden = !visible.includes(option);
			option.optionId = `${this.listboxId}-option-${option.value}`;
			option.matchQuery = filterQuery;
		}
		for (const group of this.querySelectorAll("pk-option-group")) {
			const groupOptions = [...group.querySelectorAll("pk-option")];
			const filterEmpty = groupOptions.length > 0 && groupOptions.every((option) => option.hidden);
			group.toggleAttribute("data-pk-filter-empty", filterEmpty);
		}
		syncListboxSeparators(this);
		this.syncValueInput();
		if (this.open) {
			this.syncHighlight();
			this.announceFilterResults();
		}
	}
	syncValueInput() {
		if (!this.input) return;
		this.input.value = this.multiple ? this.values.join(",") : this.value;
		this.input.required = this.required;
	}
	syncHighlightedIndexToSelection() {
		if (this.multiple) return;
		const enabled = this.getEnabledVisibleOptions();
		if (!this.value || enabled.length === 0) return;
		const selectedIndex = enabled.findIndex((option) => option.value === this.value);
		if (selectedIndex >= 0) this.highlightedIndex = selectedIndex;
	}
	resetHighlightedIndexOnOpen() {
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
	syncHighlight() {
		const enabled = this.getEnabledVisibleOptions();
		const showCreate = this.shouldShowCreateOption();
		const totalItems = enabled.length + (showCreate ? 1 : 0);
		for (const option of this.options) {
			option.highlighted = false;
			option.focusIndex = -1;
		}
		this.createOptionHighlighted = false;
		if (totalItems === 0 || this.highlightedIndex < 0) return;
		if (this.highlightedIndex >= totalItems) this.highlightedIndex = totalItems - 1;
		if (showCreate && this.highlightedIndex === enabled.length) {
			this.createOptionHighlighted = true;
			if (!this.keepsFocusOnInput()) this.createOptionElement?.focus({ preventScroll: true });
			scrollIntoView(this.createOptionElement, this.listScrollContainer, "vertical", "auto");
			if (this.keepsFocusOnInput()) this.maintainInputFocus();
			return;
		}
		const highlighted = enabled[this.highlightedIndex];
		if (highlighted) {
			highlighted.highlighted = true;
			highlighted.focusIndex = this.keepsFocusOnInput() ? -1 : 0;
			scrollIntoView(highlighted, this.listScrollContainer, "vertical", "auto");
			if (this.keepsFocusOnInput()) this.maintainInputFocus();
		}
	}
	getActiveDescendantId() {
		const enabled = this.getEnabledVisibleOptions();
		if (this.shouldShowCreateOption() && this.highlightedIndex === enabled.length) return this.createOptionId;
		return enabled[this.highlightedIndex]?.optionId || null;
	}
	announceFilterResults() {
		if (!this.liveRegion) this.liveRegion = new LiveRegion("polite");
		const count = this.getEnabledVisibleOptions().length;
		const filter = this.getFilterQuery();
		if (!filter) return;
		if (this.shouldShowCreateOption()) {
			this.liveRegion.announce(`Create ${filter}`);
			return;
		}
		this.liveRegion.announce(count === 0 ? `${this.emptyMessage}` : `${count} ${count === 1 ? "result" : "results"} available`);
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
		const anchor = this.controlElement;
		if (!anchor) return Promise.resolve();
		if (this.open) {
			this.activeInput?.focus({ preventScroll: true });
			return Promise.resolve();
		}
		if (this.closing) return Promise.resolve();
		this.dispatchEvent(new PkShowEvent());
		this.closing = false;
		this.panelAnimated = false;
		this.open = true;
		this.hasInputSinceOpening = false;
		this.inputValue = this.usesPopupMode ? "" : !this.multiple && this.hasSelection() ? this.getSelectedLabel() : "";
		this.applySelection();
		this.resetHighlightedIndexOnOpen();
		if (this.usesAsyncSearch) {
			this.syncSelectedOptionMeta();
			this.asyncError = null;
			this.asyncLoading = false;
			this.renderAsyncOptionNodes(this.selectedOptionMeta ? [this.selectedOptionMeta] : []);
		}
		const anchorWidth = anchor.getBoundingClientRect().width;
		this.style.setProperty("--pk-combobox-anchor-width", `${anchorWidth}px`);
		this.popupElement.active = true;
		if (this.panelElement) {
			this.panelElement.hidden = false;
			syncPopupPlacementAnimation(this.panelElement, this.placement);
		}
		this.registerDismissHandlers();
		this.syncHighlight();
		if (this.usesPopupMode) this.popupTrigger?.blur();
		else this.activeInput?.focus({ preventScroll: true });
		return this.updateComplete.then(async () => {
			const placement = await waitForPopupReposition(this.popupElement, this.placement, 300, { requireEvent: true });
			if (this.panelElement) syncPopupPlacementAnimation(this.panelElement, placement);
			this.panelAnimated = true;
			this.bindPanelEvents();
			this.refreshOptions();
			this.activeInput?.focus({ preventScroll: true });
			if (this.highlightedIndex >= 0 && !this.keepsFocusOnInput()) {
				const enabled = this.getEnabledVisibleOptions();
				const index = this.highlightedIndex;
				if (this.shouldShowCreateOption() && index === enabled.length) this.createOptionElement?.focus({ preventScroll: true });
				else enabled[index]?.focusControl();
			}
			this.dispatchEvent(new PkAfterShowEvent());
			this.dispatchEvent(new CustomEvent("pk-open-change", {
				detail: { open: true },
				bubbles: true,
				composed: true
			}));
		});
	}
	commitCustomValueIfAllowed() {
		if (this.multiple || !this.allowCustomValue) return false;
		const query = this.inputValue.trim();
		if (!query) return false;
		const nextValue = this.options.find((option) => {
			return option.getLabel().toLowerCase() === query.toLowerCase() || option.value.toLowerCase() === query.toLowerCase();
		})?.value ?? query;
		if (this.value === nextValue) return false;
		this.value = nextValue;
		return true;
	}
	commitInputOnClose(source) {
		if (this.multiple || this.usesPopupMode) return false;
		if (!this.hasInputSinceOpening) {
			if (this.shouldCommitCustomValueOnClose(source)) return this.commitCustomValueIfAllowed();
			return false;
		}
		if (!this.inputValue.trim()) {
			if (!this.value) return false;
			this.value = "";
			return true;
		}
		if (this.shouldCommitCustomValueOnClose(source)) return this.commitCustomValueIfAllowed();
		return false;
	}
	shouldCommitCustomValueOnClose(source) {
		return source === "light-dismiss" || source === "pointer-dismiss";
	}
	async closePanel(source = "unknown") {
		if (!this.open || this.closing) return;
		const hideEvent = new PkHideEvent(source);
		if (!this.dispatchEvent(hideEvent)) return;
		const valueChanged = this.commitInputOnClose(source);
		this.unbindPanelEvents();
		this.closing = true;
		this.panelAnimated = false;
		await this.waitForExitAnimation();
		this.open = false;
		this.closing = false;
		this.panelAnimated = false;
		this.hasInputSinceOpening = false;
		this.inputValue = "";
		if (this.panelElement) {
			this.panelElement.hidden = true;
			this.panelElement.removeAttribute("data-side");
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
		if (this.shouldReturnFocusToInput(source)) if (this.usesPopupMode) this.popupTrigger?.focus({ preventScroll: true });
		else this.activeInput?.focus({ preventScroll: true });
		else {
			this.activeInput?.blur();
			this.popupTrigger?.blur();
		}
		this.dispatchEvent(new PkAfterHideEvent());
		this.dispatchEvent(new CustomEvent("pk-open-change", {
			detail: { open: false },
			bubbles: true,
			composed: true
		}));
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
	shouldReturnFocusToInput(source) {
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
			anchor: this.controlElement,
			panel: this.panelElement
		});
	}
	handleCreateOption() {
		const query = this.inputValue.trim();
		if (!query) return;
		const createEvent = new PkCreateEvent(query);
		if (!this.dispatchEvent(createEvent)) return;
		const option = document.createElement("pk-option");
		option.value = query;
		option.textContent = query;
		this.append(option);
		if (this.multiple) {
			if (!this.values.includes(query)) this.values = [...this.values, query];
			this.inputValue = "";
			this.applySelection();
			this.emitValueChange();
			this.activeInput?.focus({ preventScroll: true });
			return;
		}
		this.value = query;
		this.applySelection();
		this.closePanel("api");
		this.emitValueChange();
	}
	removeTag(value, event) {
		event.preventDefault();
		event.stopPropagation();
		this.values = this.values.filter((item) => item !== value);
		this.applySelection();
		this.emitValueChange();
		this.activeInput?.focus({ preventScroll: true });
	}
	handleClear(event) {
		event.preventDefault();
		event.stopPropagation();
		if (this.multiple) this.values = [];
		else this.value = "";
		this.inputValue = "";
		this.selectedOptionMeta = null;
		if (this.usesAsyncSearch) this.renderAsyncOptionNodes([]);
		this.applySelection();
		this.dispatchEvent(new PkClearEvent());
		this.emitValueChange();
		this.activeInput?.focus();
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
	handleInput(event) {
		this.hasInputSinceOpening = true;
		this.inputValue = event.target.value;
		this.highlightedIndex = this.autoHighlight ? 0 : -1;
		this.applySelection();
		if (this.usesAsyncSearch) {
			this.asyncError = null;
			this.scheduleAsyncFetch(this.inputValue.trim());
		}
		if (!this.open) this.openPanel();
	}
	handleInputKeyDown(event) {
		if (event.key === "Backspace" && this.multiple && !this.inputValue && this.values.length > 0) {
			event.preventDefault();
			this.values = this.values.slice(0, -1);
			this.applySelection();
			this.emitValueChange();
			return;
		}
		if (event.key === "Escape" && this.open) {
			event.preventDefault();
			if (this.hasInputSinceOpening && this.inputValue) {
				this.hasInputSinceOpening = false;
				this.inputValue = this.usesPopupMode ? "" : !this.multiple && this.hasSelection() ? this.getSelectedLabel() : "";
				this.highlightedIndex = this.autoHighlight ? 0 : -1;
				this.applySelection();
				return;
			}
			this.closePanel("escape");
			return;
		}
		if (event.key === "ArrowDown" && !this.open) {
			event.preventDefault();
			this.openPanel();
			return;
		}
		if (event.key === "Tab" && this.open) {
			let committed = false;
			if (!this.multiple) committed = this.commitCustomValueIfAllowed();
			this.closePanel("api");
			if (committed) {
				this.syncHasValueAttribute();
				this.emitValueChange();
			}
			return;
		}
		if (this.open && event.key === "Enter" && !this.multiple) {
			if (this.getEnabledVisibleOptions().length === 0 && this.allowCustomValue && this.inputValue.trim() && !this.shouldShowCreateOption()) {
				event.preventDefault();
				const committed = this.commitCustomValueIfAllowed();
				this.closePanel("api");
				if (committed) {
					this.syncHasValueAttribute();
					this.emitValueChange();
				}
				return;
			}
		}
		if (!this.open) return;
		this.onListboxKeyDown(event);
	}
	onListboxKeyDown(event) {
		const navItems = this.getListboxNavItems();
		const enabled = this.getEnabledVisibleOptions();
		if (this.highlightedIndex < 0) {
			if (event.key === "ArrowDown" || event.key === "ArrowRight") {
				if (enabled.length > 0 || this.shouldShowCreateOption()) {
					event.preventDefault();
					this.highlightedIndex = 0;
					this.syncHighlight();
				}
				return;
			}
			if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
				if (enabled.length > 0 || this.shouldShowCreateOption()) {
					event.preventDefault();
					this.highlightedIndex = this.shouldShowCreateOption() ? enabled.length : Math.max(enabled.length - 1, 0);
					this.syncHighlight();
				}
				return;
			}
			if (event.key === "Enter" || event.key === " ") return;
		}
		if (event.key === "Enter" && this.shouldShowCreateOption() && this.highlightedIndex === enabled.length) {
			event.preventDefault();
			this.handleCreateOption();
			return;
		}
		if (this.multiple && (event.key === "Enter" || event.key === " ")) {
			const option = enabled[this.highlightedIndex];
			if (option) {
				event.preventDefault();
				option.dispatchEvent(new CustomEvent("pk-option-select", {
					detail: { value: option.value },
					bubbles: true,
					composed: true
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
				if (this.keepsFocusOnInput()) return;
				if (this.shouldShowCreateOption() && index === enabled.length) {
					this.createOptionElement?.focus({ preventScroll: true });
					return;
				}
				enabled[index]?.focusControl();
			},
			onClose: () => {
				this.closePanel("escape");
			}
		});
	}
	renderHostDecorationSlot(name) {
		if (!this.hasSlotController.test(name)) return b`<slot name=${name} hidden></slot>`;
		return b`
            <span part=${name} class=${name === "start" ? "control-start" : "control-end"}>
                <slot name=${name}></slot>
            </span>
        `;
	}
	renderChevronButton() {
		return b`
            <button
                type="button"
                class="icon-button expand-button"
                part="expand-button"
                aria-label="Toggle options"
                ?disabled=${this.disabled}
                @click=${this.togglePanel}
            >
                <span class="icon" aria-hidden="true">${o(CHEVRON_ICON)}</span>
            </button>
        `;
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
                    ?disabled=${this.disabled}
                    @click=${(event) => this.removeTag(option.value, event)}
                >
                    <span class="tag-remove-icon" aria-hidden="true">${o(XMARK_ICON)}</span>
                </button>
            </span>
        `);
	}
	shouldShowPlaceholder() {
		if (this.inputValue.trim()) return false;
		return !this.hasSelection();
	}
	renderInput() {
		const activeDescendant = this.open ? this.getActiveDescendantId() : null;
		const showPlaceholder = this.shouldShowPlaceholder();
		return b`
            <input
                part="input"
                class=${e({
			"combobox-input": true,
			"control-input": true,
			"combobox-input--inline": this.multiple
		})}
                type="text"
                role="combobox"
                id=${this.inputId}
                .value=${this.getDisplayInputValue()}
                placeholder=${showPlaceholder ? this.placeholder : A}
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel ?? A}
                aria-expanded=${this.open ? "true" : "false"}
                aria-controls=${this.listboxId}
                aria-autocomplete="list"
                aria-activedescendant=${activeDescendant ?? A}
                @input=${this.handleInput}
                @keydown=${this.handleInputKeyDown}
            />
        `;
	}
	renderPanelInput() {
		const activeDescendant = this.open ? this.getActiveDescendantId() : null;
		return b`
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
                    aria-activedescendant=${activeDescendant ?? A}
                    @input=${this.handleInput}
                    @keydown=${this.handleInputKeyDown}
                />
            </div>
        `;
	}
	renderPopupTrigger() {
		return b`
            <button
                type="button"
                part="trigger"
                class="popup-trigger"
                ?disabled=${this.disabled}
                aria-label=${this.ariaLabel ?? A}
                aria-haspopup="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-controls=${this.listboxId}
                @click=${this.togglePanel}
                @keydown=${this.handleTriggerKeyDown}
            >
                <span
                    class=${e({
			"popup-trigger-value": true,
			"is-placeholder": this.isTriggerPlaceholder()
		})}
                >
                    ${this.getTriggerDisplayValue()}
                </span>
                <span class="icon popup-trigger-icon" aria-hidden="true">${o(CHEVRON_ICON)}</span>
            </button>
        `;
	}
	renderControlContent() {
		if (this.usesPopupMode) return this.renderPopupTrigger();
		const showClear = (this.clearable || this.withClear) && this.hasSelection() && !this.disabled;
		if (this.multiple) return b`
                ${this.renderHostDecorationSlot("start")}
                <div class="chips" part="tags">
                    ${this.renderTags()}
                    ${this.renderInput()}
                </div>
                ${this.renderHostDecorationSlot("end")}
                ${showClear ? b`
                        <button
                            type="button"
                            class="clear-button"
                            part="clear-button"
                            aria-label="Clear selection"
                            ?disabled=${this.disabled}
                            @click=${this.handleClear}
                        >
                            <span class="clear-button-icon" aria-hidden="true">${o(XMARK_ICON)}</span>
                        </button>
                    ` : A}
            `;
		return b`
            ${this.renderHostDecorationSlot("start")}
            ${this.renderInput()}
            ${this.renderHostDecorationSlot("end")}
            ${showClear ? b`
                    <button
                        type="button"
                        class="clear-button"
                        part="clear-button"
                        aria-label="Clear selection"
                        ?disabled=${this.disabled}
                        @click=${this.handleClear}
                    >
                        <span class="clear-button-icon" aria-hidden="true">${o(XMARK_ICON)}</span>
                    </button>
                ` : A}
            ${this.renderChevronButton()}
        `;
	}
	render() {
		const visibleOptions = this.getEnabledVisibleOptions();
		const showCreate = this.shouldShowCreateOption();
		const showEmpty = this.open && (this.usesAsyncSearch ? this.shouldShowAsyncEmpty() : visibleOptions.length === 0 && !showCreate);
		const asyncStatus = this.getAsyncStatusMessage();
		const createQuery = this.inputValue.trim();
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
            <div
                part="control"
                class=${e({
			control: true,
			"is-disabled": this.disabled,
			"control--multiple": this.multiple,
			"control--popup": this.usesPopupMode
		})}
                data-popup-open=${this.open ? "" : A}
                @mousedown=${this.handleControlMouseDown}
            >
                ${this.renderControlContent()}
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
			closing: this.closing,
			"panel--popup": this.usesPopupMode
		})}
                    tabindex="-1"
                    ?hidden=${!this.open && !this.closing}
                    data-open=${this.panelAnimated && !this.closing ? "" : A}
                >
                    ${this.usesPopupMode ? this.renderPanelInput() : A}
                    <div
                        part="panel-body"
                        class="panel-body"
                        id=${this.listboxId}
                        role="listbox"
                        aria-multiselectable=${this.multiple ? "true" : "false"}
                        aria-busy=${this.usesAsyncSearch && this.asyncLoading ? "true" : A}
                        @slotchange=${this.syncOptions}
                    >
                        <slot></slot>
                        ${asyncStatus ? b`
                                <div part="async-status" class="async-status" role="status">${asyncStatus}</div>
                            ` : A}
                        ${showCreate ? b`
                                <button
                                    type="button"
                                    part="create-option"
                                    class=${e({
			"create-option": true,
			"is-highlighted": this.createOptionHighlighted
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
})], PkCombobox.prototype, "open", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCombobox.prototype, "multiple", void 0);
__decorate([n({ reflect: true })], PkCombobox.prototype, "placement", void 0);
__decorate([n({
	attribute: "side-offset",
	type: Number
})], PkCombobox.prototype, "sideOffset", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCombobox.prototype, "clearable", void 0);
__decorate([n({
	attribute: "with-clear",
	type: Boolean
})], PkCombobox.prototype, "withClear", void 0);
__decorate([n({
	attribute: "allow-create",
	type: Boolean
})], PkCombobox.prototype, "allowCreate", void 0);
__decorate([n({
	attribute: "allow-custom-value",
	type: Boolean
})], PkCombobox.prototype, "allowCustomValue", void 0);
__decorate([n({
	attribute: "auto-highlight",
	type: Boolean
})], PkCombobox.prototype, "autoHighlight", void 0);
__decorate([n({
	attribute: "popup-mode",
	type: Boolean,
	reflect: true
})], PkCombobox.prototype, "popupMode", void 0);
__decorate([n({ attribute: "search-placeholder" })], PkCombobox.prototype, "searchPlaceholder", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCombobox.prototype, "invalid", void 0);
__decorate([n({ reflect: true })], PkCombobox.prototype, "size", void 0);
__decorate([n({ reflect: true })], PkCombobox.prototype, "width", void 0);
__decorate([n()], PkCombobox.prototype, "placeholder", void 0);
__decorate([n({ attribute: "empty-message" })], PkCombobox.prototype, "emptyMessage", void 0);
__decorate([n()], PkCombobox.prototype, "value", void 0);
__decorate([n({ attribute: "default-value" })], PkCombobox.prototype, "defaultValue", void 0);
__decorate([n({
	type: Array,
	attribute: false
})], PkCombobox.prototype, "values", void 0);
__decorate([n({ attribute: false })], PkCombobox.prototype, "defaultValues", void 0);
__decorate([n()], PkCombobox.prototype, "label", void 0);
__decorate([n()], PkCombobox.prototype, "instructions", void 0);
__decorate([n({ attribute: "aria-label" })], PkCombobox.prototype, "ariaLabel", void 0);
__decorate([n({
	attribute: "loop-focus",
	type: Boolean
})], PkCombobox.prototype, "loopFocus", void 0);
__decorate([n({ attribute: false })], PkCombobox.prototype, "filter", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCombobox.prototype, "async", void 0);
__decorate([n({ attribute: "loading-message" })], PkCombobox.prototype, "loadingMessage", void 0);
__decorate([n({ attribute: "start-typing-message" })], PkCombobox.prototype, "startTypingMessage", void 0);
__decorate([n({ attribute: false })], PkCombobox.prototype, "fetchOptions", void 0);
__decorate([e$1("pk-popup")], PkCombobox.prototype, "popupElement", void 0);
__decorate([e$1(".control")], PkCombobox.prototype, "controlElement", void 0);
__decorate([e$1(".control-input")], PkCombobox.prototype, "controlInput", void 0);
__decorate([e$1(".popup-trigger")], PkCombobox.prototype, "popupTrigger", void 0);
__decorate([e$1(".create-option")], PkCombobox.prototype, "createOptionElement", void 0);
__decorate([e$1(".value-input")], PkCombobox.prototype, "input", void 0);
__decorate([r()], PkCombobox.prototype, "inputValue", void 0);
__decorate([r()], PkCombobox.prototype, "highlightedIndex", void 0);
__decorate([r()], PkCombobox.prototype, "createOptionHighlighted", void 0);
__decorate([r()], PkCombobox.prototype, "closing", void 0);
__decorate([r()], PkCombobox.prototype, "panelAnimated", void 0);
__decorate([r()], PkCombobox.prototype, "asyncLoading", void 0);
__decorate([r()], PkCombobox.prototype, "asyncError", void 0);
PkCombobox = __decorate([t("pk-combobox")], PkCombobox);
//#endregion
export { PkCombobox as t };
