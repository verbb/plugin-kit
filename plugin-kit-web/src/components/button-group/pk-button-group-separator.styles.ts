import { css } from 'lit';

export const pkButtonGroupSeparatorStyles = css`
    @layer pk-component {
        :host {
            display: inline-block;
            align-self: stretch;
            flex-shrink: 0;
        }

        .separator {
            display: block;
            width: 1px;
            height: 100%;
            margin-block: 1px;
            background: var(--pk-btn-group-separator-color, transparent);
        }

        :host-context(pk-button-group[orientation='vertical']) {
            display: block;
            width: 100%;
            height: auto;
        }

        :host-context(pk-button-group[orientation='vertical']) .separator {
            width: 100%;
            height: 1px;
            margin-block: 1px;
        }
    }
`;
