import type { PkButtonSize, PkButtonVariant } from '../../../../plugin-kit-web/src/components/button/pk-button.js';

export type ButtonSize = PkButtonSize;
export type ButtonVariant = PkButtonVariant;

export type ButtonMatrixVariant = {
    label: string;
    variant: ButtonVariant;
    /** Craft CP class mapping for comparison rows. */
    craftClassName?: string;
};

export type ButtonMatrixSize = {
    label: string;
    size: ButtonSize;
};

export type ButtonMatrixState = {
    label: string;
    state?: 'hover' | 'focus-visible' | 'active';
    disabled?: boolean;
};

/** Shared variant list for playground matrices and docs examples. */
export const buttonMatrixVariants: ButtonMatrixVariant[] = [
    { label: 'Primary', variant: 'primary', craftClassName: 'btn submit' },
    { label: 'Secondary', variant: 'secondary', craftClassName: 'btn secondary' },
    { label: 'Default', variant: 'default', craftClassName: 'btn' },
    { label: 'Outline', variant: 'outline', craftClassName: 'btn hairline-dark' },
    { label: 'Dashed', variant: 'dashed', craftClassName: 'btn dashed' },
    { label: 'Transparent', variant: 'transparent', craftClassName: 'btn' },
    { label: 'Link', variant: 'link' },
    { label: 'None', variant: 'none', craftClassName: '' },
];

/** Shared size list for playground matrices and docs examples. */
export const buttonMatrixSizes: ButtonMatrixSize[] = [
    { label: 'XX Small', size: 'xxs' },
    { label: 'X Small', size: 'xs' },
    { label: 'Small', size: 'sm' },
    { label: 'Default', size: 'default' },
    { label: 'Large', size: 'lg' },
    { label: 'Extra Large', size: 'xl' },
];

/** Interaction states for side-by-side matrix rows. */
export const buttonMatrixStates: ButtonMatrixState[] = [
    { label: 'Normal' },
    { label: 'Hover', state: 'hover' },
    { label: 'Focus', state: 'focus-visible' },
    { label: 'Active', state: 'active' },
    { label: 'Disabled', disabled: true },
];
