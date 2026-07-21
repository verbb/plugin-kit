import { css } from 'lit';

export const pkTabStyles = css`
    @layer pk-component {
        :host {
            /* Size to the shadow trigger. Prefer flex-start so a short list line
             * (or host utilities like Tailwind items-center) cannot stretch the
             * host shorter than the trigger and clip the modal active underline. */
            display: inline-flex;
            flex-shrink: 0;
            align-self: flex-start;
            height: auto;
            min-height: auto;
            align-items: stretch;
            /* Pin type metrics for slotted labels — vars cascade from pk-tabs. */
            font-family: var(--pk-font-family);
            font-size: var(--pk-tabs-trigger-font-size, 13px);
            font-weight: var(--pk-tabs-trigger-font-weight, 400);
            line-height: var(--pk-tabs-trigger-line-height, 1.4);
            color: var(--pk-tabs-trigger-color, inherit);
        }

        .trigger {
            position: relative;
            display: var(--pk-tabs-trigger-display, inline-flex);
            align-items: center;
            justify-content: var(--pk-tabs-trigger-justify, center);
            gap: var(--pk-tabs-trigger-gap, 0.5rem);
            width: var(--pk-tabs-trigger-width, auto);
            min-height: var(--pk-tabs-trigger-min-height, 2rem);
            padding: var(--pk-tabs-trigger-padding-block, 0.375rem)
                var(--pk-tabs-trigger-padding-inline, 0.75rem);
            border: 0;
            border-top: var(--pk-tabs-trigger-border-top, 0 solid transparent);
            border-radius: var(--pk-tabs-trigger-radius, var(--pk-radius-sm));
            background: transparent;
            color: inherit;
            font: inherit;
            font-family: var(--pk-font-family);
            font-size: var(--pk-tabs-trigger-font-size, 13px);
            font-weight: var(--pk-tabs-trigger-font-weight, 400);
            line-height: var(--pk-tabs-trigger-line-height, 1.4);
            text-align: var(--pk-tabs-trigger-text-align, center);
            text-transform: var(--pk-tabs-trigger-text-transform, none);
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            box-shadow: none;
            box-sizing: border-box;
            transition: background-color 0.12s ease, color 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
        }

        /* Collapse optional icon/status lanes when nothing is slotted. */
        .icon,
        .status {
            display: none;
            flex: none;
            align-items: center;
            justify-content: center;
            line-height: 0;
        }

        .icon:has(::slotted(*)),
        .status:has(::slotted(*)) {
            display: inline-flex;
        }

        .icon {
            width: var(--pk-tabs-trigger-icon-size, 1.125rem);
            height: var(--pk-tabs-trigger-icon-size, 1.125rem);
            font-size: var(--pk-tabs-trigger-icon-size, 1.125rem);
            color: var(--pk-tabs-trigger-icon-color, inherit);
        }

        .icon ::slotted(*) {
            display: block;
            max-width: 100%;
            max-height: 100%;
            /* Kill pk-icon text-baseline nudge so logos/icons sit on the flex midline. */
            vertical-align: 0;
        }

        .label {
            display: inline-flex;
            flex: var(--pk-tabs-trigger-label-flex, 0 1 auto);
            align-items: center;
            min-width: 0;
            line-height: inherit;
        }

        .status {
            margin-inline-start: var(--pk-tabs-trigger-status-margin, 0);
            color: var(--pk-tabs-trigger-status-color, inherit);
        }

        .trigger:hover:not(:disabled):not([aria-disabled='true']):not([aria-selected='true']) {
            border-top-color: transparent;
            background: var(--pk-tabs-trigger-hover-bg, rgb(255 255 255 / 0.7));
            color: var(--pk-tabs-trigger-hover-color, var(--pk-color-gray-700));
        }

        /*
         * Focus ring is only for :focus-visible on a non-selected tab (manual
         * activation). Selected + focus-visible must NOT draw a ring — active
         * chrome is the underline (mouse) or is replaced by the modal focus box
         * via --pk-tabs-trigger-focus-selected-shadow when set.
         */
        .trigger:focus-visible:not([aria-selected='true']) {
            box-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
        }

        .trigger:disabled,
        .trigger[aria-disabled='true'] {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .trigger[aria-selected='true'],
        :host([selected]) .trigger {
            border-top: var(--pk-tabs-trigger-selected-border-top, var(--pk-tabs-trigger-border-top, 0 solid transparent));
            border-radius: var(--pk-tabs-trigger-selected-radius, var(--pk-radius-sm));
            background: var(--pk-tabs-trigger-selected-bg, var(--pk-color-white));
            color: var(--pk-tabs-trigger-selected-color, var(--pk-color-gray-800));
            box-shadow: var(--pk-tabs-trigger-selected-shadow, 0 1px 2px rgba(31, 41, 51, 0.12));
        }

        .trigger[aria-selected='true']:hover,
        :host([selected]) .trigger:hover {
            background: var(--pk-tabs-trigger-selected-hover-bg, var(--pk-tabs-trigger-selected-bg, var(--pk-color-white)));
            color: var(--pk-tabs-trigger-selected-hover-color, var(--pk-tabs-trigger-selected-color, var(--pk-color-gray-800)));
        }

        /* screen3: keyboard focus on the active tab → full inset box, no underline. */
        .trigger[aria-selected='true']:focus-visible,
        :host([selected]) .trigger:focus-visible {
            box-shadow: var(
                --pk-tabs-trigger-focus-selected-shadow,
                var(--pk-tabs-trigger-selected-shadow, 0 0 #0000)
            );
        }

        .trigger[aria-selected='true']:focus-visible::after,
        :host([selected]) .trigger:focus-visible::after {
            height: var(--pk-tabs-trigger-focus-selected-underline-height, var(--pk-tabs-trigger-underline-height, 0));
        }

        .trigger[aria-selected='true']::after,
        :host([selected]) .trigger::after {
            content: '';
            position: absolute;
            right: var(--pk-tabs-trigger-underline-inset, 15px);
            bottom: 0;
            left: var(--pk-tabs-trigger-underline-inset, 15px);
            height: var(--pk-tabs-trigger-underline-height, 0);
            /* Keep the bar above the list hairline when both meet at the clip edge. */
            z-index: 1;
            background: var(--pk-color-sky-600);
            pointer-events: none;
        }

        /*
         * Validation error chrome (v1 ModalTabs / PaneTabs text-error).
         * Host sets data-has-errors; light-DOM text-* cannot pierce the trigger.
         */
        :host([data-has-errors]) {
            --pk-tabs-trigger-color: var(--pk-color-error, #d81f23);
            --pk-tabs-trigger-hover-color: var(--pk-color-rose-700, #be123c);
            --pk-tabs-trigger-selected-color: var(--pk-color-error, #d81f23);
            --pk-tabs-trigger-selected-hover-color: var(--pk-color-rose-700, #be123c);
            --pk-tabs-trigger-icon-color: inherit;
            --pk-tabs-trigger-status-color: inherit;
        }
    }
`;
