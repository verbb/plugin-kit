import { css } from 'lit';

export const pkOptionStyles = css`
    @layer pk-component {
        :host {
            display: block;
            /*
             * Slotted option labels inherit type metrics from this host (same
             * Craft-vs-Tailwind trap as pk-dropdown-item). Size tokens arrive via
             * pk-select ::slotted(pk-option) custom properties.
             */
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            color: var(--pk-color-gray-700);
        }

        .option {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            margin: 0;
            min-height: var(--pk-select-item-min-height, var(--pk-input-height));
            padding-block: var(--pk-select-item-padding-block, 6px);
            padding-inline-start: var(--pk-select-item-padding-inline, 10px);
            padding-inline-end: var(--pk-select-item-padding-inline-end, 2rem);
            border: var(--pk-select-trigger-border-width, 1px) solid transparent;
            background: transparent;
            color: inherit;
            font: inherit;
            font-family: var(--pk-font-family);
            font-size: var(--pk-select-item-font-size, var(--pk-font-size-base));
            line-height: var(--pk-select-item-line-height, 1.4);
            text-align: left;
            white-space: nowrap;
            cursor: default;
            user-select: none;
            outline: none;
            box-sizing: border-box;
        }

        .start {
            display: none;
            flex: 0 0 auto;
            align-items: center;
        }

        :host([data-has-start]) .start {
            display: inline-flex;
        }

        :host([hidden]) {
            display: none !important;
        }

        .option:focus-visible,
        :host([highlighted]) .option {
            background: var(--pk-color-slate-100);
        }

        :host([disabled]) .option,
        .option[aria-disabled='true'] {
            pointer-events: none;
            opacity: 0.5;
        }

        .check {
            position: absolute;
            inset-inline-end: var(--pk-select-item-indicator-inset, 0.5rem);
            top: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            color: var(--pk-color-gray-700);
            pointer-events: none;
            transform: translateY(-50%);
            line-height: 0;
        }

        :host([selected]) .check {
            display: inline-flex;
        }

        .check svg {
            display: block;
            width: var(--pk-select-item-indicator-size, 0.75rem);
            height: var(--pk-select-item-indicator-size, 0.75rem);
            flex-shrink: 0;
            pointer-events: none;
        }

        .label {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            /* Allow custom multi-line option layouts (title + subtitle) to stack. */
            white-space: normal;
        }

        .match {
            padding: 0;
            border-radius: 2px;
            background: var(--pk-color-blue-100);
            color: inherit;
        }
    }
`;
