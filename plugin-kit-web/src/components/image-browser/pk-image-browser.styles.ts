import { css } from 'lit';

import { iconStyles } from '../../base/icon.styles.js';
import { popupContentAnimationStyles } from '../../styles/popup-content-animation.styles.js';

/**
 * Presentational static image / icon browser.
 * Trigger chrome mirrors combobox popup-mode; panel grid mirrors Vizy icon picker.
 */
export const pkImageBrowserStyles = [
    popupContentAnimationStyles,
    css`
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

        /* Combobox-style chrome: label + clear + chevron share one filled control.
         * 0.5rem gap keeps ellipsized filenames from kissing the clear glyph. */
        .control {
            display: inline-flex;
            align-items: stretch;
            gap: 0.5rem;
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
    `,
];
