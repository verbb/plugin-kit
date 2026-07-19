import { css } from 'lit';

export const pkInputGroupButtonStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
        }

        pk-button {
            --pk-btn-height: var(--pk-btn-height-sm);
            --pk-btn-font: var(--pk-btn-font-sm);
            --pk-btn-padding-inline: var(--pk-btn-padding-inline-sm);
            --pk-btn-icon-size: var(--pk-btn-icon-size-sm);
            --pk-btn-radius: var(--pk-btn-radius-sm);
        }
    }
`;
