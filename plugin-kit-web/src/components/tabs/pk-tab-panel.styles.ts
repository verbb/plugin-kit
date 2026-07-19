import { css } from 'lit';

export const pkTabPanelStyles = css`
    @layer pk-component {
        :host {
            /* Flex column so .content can own overflow when the host is height-capped
             * by a modal/pane parent (flex: 1 1 0% + min-height: 0). */
            display: flex;
            flex-direction: column;
            flex: var(--pk-tabs-panel-flex, none);
            min-height: var(--pk-tabs-panel-min-height, 0);
            min-width: 0;
            overflow: hidden;
        }

        :host([hidden]) {
            display: none !important;
        }

        .content {
            flex: 1 1 auto;
            min-height: 0;
            padding: var(--pk-tabs-panel-padding, 0);
            overflow-y: auto;
            border-radius: var(--pk-tabs-panel-radius, 0);
            background: var(--pk-tabs-panel-bg, transparent);
            outline: none;
            font-family: var(--pk-font-family);
            font-size: var(--pk-tabs-panel-font-size, var(--pk-font-size-base));
            line-height: var(--pk-line-height);
        }

        .content:focus-visible {
            box-shadow: inset 0 0 0 2px var(--pk-color-sky-600);
            border-radius: var(--pk-radius-sm);
        }
    }
`;
