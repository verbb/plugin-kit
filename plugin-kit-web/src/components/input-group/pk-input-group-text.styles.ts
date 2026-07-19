import { css } from 'lit';

export const pkInputGroupTextStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: var(--pk-font-size-sm);
            color: var(--pk-color-gray-500);
        }

        .text ::slotted(svg) {
            width: 0.75rem;
            height: 0.75rem;
            pointer-events: none;
        }
    }
`;
