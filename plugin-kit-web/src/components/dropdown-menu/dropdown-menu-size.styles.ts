import { css } from 'lit';

const dropdownMenuSizeTokens = {
    default: css`
        --pk-dropdown-item-padding-block: 8px;
        --pk-dropdown-item-padding-inline: 12px;
        --pk-dropdown-item-gap: 0.625rem;
        --pk-dropdown-item-font-size: var(--pk-font-size-base);
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 12px;
        --pk-dropdown-label-font-size: 13px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,
    xs: css`
        --pk-dropdown-item-padding-block: 3px;
        --pk-dropdown-item-padding-inline: 8px;
        --pk-dropdown-item-gap: 0.375rem;
        --pk-dropdown-item-font-size: 12px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 10px;
        --pk-dropdown-label-padding-inline: 8px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 11px;
    `,
    sm: css`
        --pk-dropdown-item-padding-block: 4px;
        --pk-dropdown-item-padding-inline: 10px;
        --pk-dropdown-item-gap: 0.4375rem;
        --pk-dropdown-item-font-size: 13px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 12px;
        --pk-dropdown-label-padding-inline: 10px;
        --pk-dropdown-label-font-size: 11px;
        --pk-dropdown-details-font-size: 12px;
    `,
    lg: css`
        --pk-dropdown-item-padding-block: 10px;
        --pk-dropdown-item-padding-inline: 14px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 16px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 14px;
        --pk-dropdown-label-padding-inline: 14px;
        --pk-dropdown-label-font-size: 14px;
        --pk-dropdown-details-font-size: var(--pk-font-size-sm);
    `,
    xl: css`
        --pk-dropdown-item-padding-block: 12px;
        --pk-dropdown-item-padding-inline: 16px;
        --pk-dropdown-item-gap: 0.75rem;
        --pk-dropdown-item-font-size: 18px;
        --pk-dropdown-item-line-height: 1.5;
        --pk-dropdown-item-icon-size: 16px;
        --pk-dropdown-label-padding-inline: 16px;
        --pk-dropdown-label-font-size: 15px;
        --pk-dropdown-details-font-size: var(--pk-font-size-base);
    `,
} as const;

/** Size tokens on `pk-dropdown-menu` — cascades to light-DOM menu children. */
export const dropdownMenuHostSizeStyles = css`
    @layer pk-component {
        :host {
            ${dropdownMenuSizeTokens.default}
        }

        :host([size='xs']) {
            ${dropdownMenuSizeTokens.xs}
        }

        :host([size='sm']) {
            ${dropdownMenuSizeTokens.sm}
        }

        :host([size='lg']) {
            ${dropdownMenuSizeTokens.lg}
        }

        :host([size='xl']) {
            ${dropdownMenuSizeTokens.xl}
        }
    }
`;

/**
 * Size tokens on popup panels.
 * Do not include bare `:host` here; importing this in `pk-dropdown-item`
 * would reset every item back to the default size.
 */
export const dropdownMenuPanelSizeStyles = css`
    @layer pk-component {
        .panel[data-size='default'],
        .submenu-panel[data-size='default'] {
            ${dropdownMenuSizeTokens.default}
        }

        .panel[data-size='xs'],
        .submenu-panel[data-size='xs'] {
            ${dropdownMenuSizeTokens.xs}
        }

        .panel[data-size='sm'],
        .submenu-panel[data-size='sm'] {
            ${dropdownMenuSizeTokens.sm}
        }

        .panel[data-size='lg'],
        .submenu-panel[data-size='lg'] {
            ${dropdownMenuSizeTokens.lg}
        }

        .panel[data-size='xl'],
        .submenu-panel[data-size='xl'] {
            ${dropdownMenuSizeTokens.xl}
        }
    }
`;

/** @deprecated Use dropdownMenuHostSizeStyles + dropdownMenuPanelSizeStyles. */
export const dropdownMenuSizeStyles = css`
    ${dropdownMenuHostSizeStyles}
    ${dropdownMenuPanelSizeStyles}
`;
