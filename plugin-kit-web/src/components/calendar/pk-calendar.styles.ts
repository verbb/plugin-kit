import { css } from 'lit';

import { iconStyles } from '../../base/icon.styles.js';

export const pkCalendarStyles = css`
    ${iconStyles}
    @layer pk-component {
        :host {
            display: inline-block;
            width: fit-content;
            max-width: 100%;
            color: var(--pk-color-gray-900);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1;
            --pk-date-cell-size: 1.75rem;
            --pk-date-cell-radius: 100%;
            --pk-date-gap: 0.25rem;
            --pk-date-column-min: var(--pk-date-cell-size);
            --pk-date-column-gap: 0;
        }

        :host([weekday-format='short']) {
            --pk-date-column-min: 2.125rem;
            --pk-date-column-gap: 0.125rem;
        }

        :host([weekday-format='long']) {
            --pk-date-column-min: 3.375rem;
            --pk-date-column-gap: 0.125rem;
        }

        :host([weekday-format='long']) .weekday {
            font-size: 0.7rem;
        }

        :host([size='xs']) {
            --pk-date-cell-size: 1.5rem;
            font-size: 11px;
        }

        :host([size='sm']) {
            --pk-date-cell-size: 1.625rem;
            font-size: 12px;
        }

        :host([size='lg']) {
            --pk-date-cell-size: 2rem;
            font-size: 14px;
        }

        :host([size='xl']) {
            --pk-date-cell-size: 2.25rem;
            font-size: 15px;
        }

        :host([disabled]) {
            opacity: 0.5;
            pointer-events: none;
        }

        .base {
            display: flex;
            flex-direction: column;
            gap: var(--pk-date-gap);
            width: fit-content;
            padding: 0.5rem;
            border: var(--pk-calendar-border, var(--pk-input-border));
            border-radius: var(--pk-radius-md);
            background: var(--pk-calendar-background, var(--pk-color-white));
        }

        :host(:not([bordered])) {
            --pk-calendar-border: 0;
            --pk-calendar-background: transparent;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.25rem;
            min-height: var(--pk-date-cell-size);
            padding-inline: 0.125rem;
        }

        .title {
            flex: 1;
            margin: 0;
            padding: 0.25rem 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            font-weight: 500;
            line-height: 1.2;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }

        .title:hover:not(:disabled) {
            background: var(--pk-color-slate-100);
        }

        .nav-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--pk-date-cell-size);
            height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0.25rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-600);
            cursor: pointer;
        }

        .nav-button:hover:not(:disabled) {
            background: var(--pk-color-slate-100);
            color: var(--pk-color-gray-900);
        }

        .nav-button:disabled {
            opacity: 0.35;
            cursor: not-allowed;
        }

        .nav-button .icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 12px;
            height: 12px;
            flex-shrink: 0;
        }

        .nav-button .icon svg {
            display: block;
            width: 12px;
            height: 12px;
        }

        .months {
            display: flex;
            gap: 1rem;
        }

        .month {
            display: flex;
            flex-direction: column;
            width: fit-content;
            min-width: calc(var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6);
        }

        :host([data-week-numbers]) .month {
            min-width: calc(
                var(--pk-date-cell-size) + var(--pk-date-column-gap) + var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6
            );
        }

        .month-label {
            margin-bottom: 0.5rem;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            color: var(--pk-color-gray-700);
        }

        .weekdays,
        .week {
            display: grid;
            grid-template-columns: repeat(7, minmax(var(--pk-date-column-min), 1fr));
            column-gap: var(--pk-date-column-gap);
            align-items: center;
            width: 100%;
        }

        :host([data-week-numbers]) .weekdays,
        :host([data-week-numbers]) .week {
            grid-template-columns: var(--pk-date-cell-size) repeat(7, minmax(var(--pk-date-column-min), 1fr));
        }

        .grid {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            margin-top: 0.2rem;
        }

        .weeknumber-header,
        .weeknumber {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--pk-date-cell-size);
            color: var(--pk-color-gray-500);
            font-size: 0.8rem;
            font-weight: 400;
            user-select: none;
        }

        .weekday {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: var(--pk-date-column-min);
            height: var(--pk-date-cell-size);
            padding-inline: 0.125rem;
            color: var(--pk-color-gray-500);
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.1;
            text-align: center;
            white-space: nowrap;
            user-select: none;
        }

        .day,
        .day.is-placeholder {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            justify-self: center;
            width: var(--pk-date-cell-size);
            min-width: var(--pk-date-cell-size);
            max-width: var(--pk-date-cell-size);
            height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            font-weight: 400;
            line-height: 1;
            cursor: pointer;
        }

        .day.is-range-start,
        .day.is-range-end,
        .day.is-range-inner,
        .day.is-range-preview {
            justify-self: stretch;
            width: 100%;
            min-width: 0;
            max-width: none;
        }

        .day.is-range-start.is-range-end {
            justify-self: center;
            width: var(--pk-date-cell-size);
            min-width: var(--pk-date-cell-size);
            max-width: var(--pk-date-cell-size);
        }

        .day:focus-visible {
            outline: 2px solid var(--pk-color-blue-500);
            outline-offset: 1px;
            z-index: 1;
        }

        .day.is-outside {
            opacity: 0.6;
        }

        .day.is-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        /* Day grid — circular today ring (fixed cell size, not column width) */
        .day.is-today:not(.is-range-start):not(.is-range-end):not(.is-range-inner)::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px solid var(--pk-color-blue-500);
            border-radius: var(--pk-date-cell-radius);
            pointer-events: none;
        }

        .day.is-selected:not(.is-range-start):not(.is-range-end):not(.is-range-inner) {
            background: var(--pk-color-gray-200);
            border-radius: var(--pk-date-cell-radius);
            color: var(--pk-color-gray-900);
            font-weight: 400;
        }

        .day.is-range-start,
        .day.is-range-end {
            background: var(--pk-color-gray-200);
            color: var(--pk-color-gray-900);
            font-weight: 400;
        }

        .day.is-range-start.is-range-end {
            border-radius: var(--pk-date-cell-radius);
        }

        .day.is-range-start:not(.is-range-end) {
            border-radius: var(--pk-date-cell-radius) 0 0 var(--pk-date-cell-radius);
        }

        .day.is-range-end:not(.is-range-start) {
            border-radius: 0 var(--pk-date-cell-radius) var(--pk-date-cell-radius) 0;
        }

        .day.is-range-inner {
            background: var(--pk-color-gray-200);
            border-radius: 0;
        }

        .day.is-range-preview:not(.is-range-start):not(.is-range-end) {
            background: var(--pk-color-gray-200);
            opacity: 0.7;
        }

        .day.is-placeholder {
            visibility: hidden;
            pointer-events: none;
        }

        .live-region {
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

        slot[name='footer']::slotted(*) {
            display: block;
            padding-top: 0.25rem;
        }

        .view-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(var(--pk-date-cell-size), 1fr));
            gap: 0.25rem;
            width: 100%;
            min-width: calc(var(--pk-date-column-min) * 7 + var(--pk-date-column-gap) * 6);
        }

        .view-row {
            display: contents;
        }

        .view-cell {
            display: contents;
        }

        .view-item {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: var(--pk-date-cell-size);
            margin: 0;
            padding: 0.375rem 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: var(--pk-color-gray-900);
            font: inherit;
            font-size: 13px;
            cursor: pointer;
        }

        .view-item.is-selected {
            background: var(--pk-color-gray-200);
            font-weight: 500;
        }

        /* Month/year grid — rectangular today outline */
        .view-item.is-today:not(.is-selected) {
            box-shadow: inset 0 0 0 1px var(--pk-color-blue-500);
            border-radius: var(--pk-radius-sm);
        }

        .view-item.is-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .view-item:focus-visible {
            outline: 2px solid var(--pk-color-blue-500);
            outline-offset: 1px;
        }
    }
`;
