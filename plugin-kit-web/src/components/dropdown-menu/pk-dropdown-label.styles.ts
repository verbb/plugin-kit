import { css } from 'lit';

export const pkDropdownLabelStyles = css`
    @layer pk-component {
        :host {
            display: block;
        }

        /* Match v1 DropdownMenuLabel — text-slate-700, regular weight (not medium). */
        .label {
            margin: 0;
            padding-block-start: 6px;
            padding-block-end: 4px;
            padding-inline: var(--pk-dropdown-label-padding-inline, 12px);
            color: var(--pk-color-slate-700, rgba(96, 125, 159, 0.7));
            font-size: var(--pk-dropdown-label-font-size, 13px);
            font-weight: 400;
            line-height: 1.3;
            user-select: none;
            pointer-events: none;
        }
    }
`;
