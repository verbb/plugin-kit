import { css } from 'lit';

export const pkToggleGroupStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .group {
            display: inline-flex;
            width: fit-content;
            align-items: center;
            border-radius: var(--pk-radius-lg);
            gap: calc(var(--pk-toggle-group-spacing, 0) * 0.25rem);
        }

        :host([size='sm']) .group {
            border-radius: min(var(--pk-radius-md), 10px);
        }

        :host([orientation='vertical']) .group {
            flex-direction: column;
            align-items: stretch;
        }
    }
`;
