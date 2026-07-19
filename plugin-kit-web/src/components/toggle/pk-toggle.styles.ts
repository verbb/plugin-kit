import { css } from 'lit';

import {
    buttonGroupBorderJoinStyles,
    buttonGroupCornerRadiusStyles,
    buttonGroupCornerRoleStyles,
    buttonGroupIndentStyles,
} from '../button-group/button-group-item.styles.js';

export const pkToggleStyles = [
    buttonGroupCornerRoleStyles(),
    buttonGroupCornerRadiusStyles('.button'),
    buttonGroupIndentStyles(),
    buttonGroupBorderJoinStyles('.button'),
    css`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            min-width: 2rem;
            height: 2rem;
            margin: 0;
            padding: 0 0.5rem;
            border: 0;
            border-radius: var(--pk-radius-lg);
            background: transparent;
            color: inherit;
            font: inherit;
            line-height: 1.4;
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
            appearance: none;
            transition: background-color 0.12s ease, box-shadow 0.12s ease;
        }

        .button:focus {
            outline: none;
        }

        .button:focus-visible {
            box-shadow: var(--pk-shadow-focus);
        }

        .button[aria-pressed='true'],
        .button[data-state='on'] {
            background: var(--pk-color-slate-250);
        }

        .button:hover:not(:disabled) {
            background: var(--pk-color-slate-250);
        }

        .button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
            pointer-events: none;
        }

        :host([variant='outline']) .button {
            border: 1px solid var(--pk-color-slate-300);
            background: transparent;
            color: var(--pk-color-gray-700);
        }

        :host([variant='outline']) .button:hover:not(:disabled),
        :host([variant='outline']) .button[aria-pressed='true'],
        :host([variant='outline']) .button[data-state='on'],
        :host([variant='outline'][pressed]) .button {
            background: var(--pk-color-slate-250);
        }

        :host([size='sm']) .button {
            min-width: 1.75rem;
            height: 1.75rem;
            padding-inline: 0.375rem;
            font-size: 0.8rem;
            border-radius: min(var(--pk-radius-md), 12px);
        }

        :host([size='lg']) .button {
            min-width: 2.25rem;
            height: 2.25rem;
            padding-inline: 0.625rem;
        }

        .button ::slotted(svg) {
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
            pointer-events: none;
        }

        :host([data-pk-group-join]) .button:focus-visible {
            z-index: 1;
            position: relative;
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-first][data-pk-group-orientation='horizontal']) .button {
            border-top-left-radius: min(var(--pk-radius-md), 12px);
            border-bottom-left-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-last][data-pk-group-orientation='horizontal']) .button {
            border-top-right-radius: min(var(--pk-radius-md), 12px);
            border-bottom-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-first][data-pk-group-orientation='vertical']) .button {
            border-top-left-radius: min(var(--pk-radius-md), 12px);
            border-top-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-pk-group-join][size='sm'][data-pk-group-item-last][data-pk-group-orientation='vertical']) .button {
            border-bottom-left-radius: min(var(--pk-radius-md), 12px);
            border-bottom-right-radius: min(var(--pk-radius-md), 12px);
        }

        :host([data-tg-orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host([data-tg-orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }

        :host([data-pk-group-orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host([data-pk-group-orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }

        :host-context(pk-button-group[exclusive]):host([pressed]) .button:focus-visible {
            box-shadow: var(--pk-shadow-focus-outset, var(--pk-shadow-focus));
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline']:not([pressed])) .button {
            background: var(--pk-action-fill);
            border-color: transparent;
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline'][pressed]) .button {
            border-color: transparent;
        }

        :host-context(pk-button-group[exclusive]):host([variant='outline']) .button {
            border-radius: 0;
        }

        :host-context(pk-button-group[orientation='vertical']) {
            display: block;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        :host-context(pk-button-group[orientation='vertical']) .button {
            width: 100%;
            box-sizing: border-box;
        }
    }
    `,
    /* Unlayered — must beat buttonGroupBorderJoinStyles for outer edge on first joined outline item. */
    css`
        :host([data-pk-group-join][data-pk-group-item-first][data-pk-group-orientation='horizontal'][variant='outline']) .button {
            border-left: 1px solid var(--pk-color-slate-300);
        }

        :host([data-pk-group-join][data-pk-group-item-first][data-pk-group-orientation='vertical'][variant='outline']) .button {
            border-top: 1px solid var(--pk-color-slate-300);
        }
    `,
];
