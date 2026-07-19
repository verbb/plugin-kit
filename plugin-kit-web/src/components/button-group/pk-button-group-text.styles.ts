import { css } from 'lit';

import { buttonGroupCornerRadiusStyles } from './button-group-item.styles.js';

export const pkButtonGroupTextStyles = [
    buttonGroupCornerRadiusStyles('.text', 'var(--pk-radius-lg)'),
    css`
        @layer pk-component {
            :host {
                display: inline-flex;
                vertical-align: middle;
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            .text {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0 0.625rem;
                border: 1px solid var(--pk-color-slate-400);
                background: var(--pk-color-gray-100);
                color: var(--pk-color-gray-700);
                font-family: var(--pk-font-family);
                font-size: var(--pk-font-size-sm);
                font-weight: 500;
                line-height: var(--pk-line-height);
                white-space: nowrap;
            }
        }
    `,
];
