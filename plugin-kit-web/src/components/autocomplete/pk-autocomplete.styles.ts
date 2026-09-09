import { css } from 'lit';

import { iconStyles } from '../../base/icon.styles.js';
import { popupContentAnimationStyles } from '../../styles/popup-content-animation.styles.js';

/**
 * Autocomplete chrome matches `pk-input` (text field), not Combobox’s slate
 * select fill / chevron affordance. Panel / listbox tokens stay shared with
 * Combobox so suggestion rows look the same.
 */
export const pkAutocompleteStyles = [
    popupContentAnimationStyles,
    css`
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
`,
];
