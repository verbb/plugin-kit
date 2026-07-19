import type { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '../../../../plugin-kit-web/src/components/spinner/pk-spinner.js';

import { buttonMatrixVariants } from './button-matrix.js';

type SpinnerSize = PkSpinnerSize;
type SpinnerTone = PkSpinnerTone;
type SpinnerVariant = PkSpinnerVariant;

export const spinnerPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Spinner',
    description: 'Loading indicator.',
} as const;

export const spinnerPlaygroundSections = {
    basic: {
        title: 'Basic Usage',
        description: 'Standalone spinner.',
    },
    colors: {
        title: 'Colors',
        description: 'Tone modifiers.',
    },
    buttonVariants: {
        title: 'Button Variants',
        description: 'Spinner variants inside matching button variants.',
    },
    sizes: {
        title: 'Sizes',
        description: 'Size scale.',
    },
} as const;

export const spinnerMatrixSizes: { label: string; size: SpinnerSize }[] = [
    { label: 'xxs', size: 'xxs' },
    { label: 'xs', size: 'xs' },
    { label: 'sm', size: 'sm' },
    { label: 'md', size: 'md' },
    { label: 'lg', size: 'lg' },
    { label: 'xl', size: 'xl' },
];

export const spinnerMatrixTones: { label: string; tone: SpinnerTone }[] = [
    { label: 'Sky', tone: 'sky' },
    { label: 'Emerald', tone: 'emerald' },
    { label: 'Violet', tone: 'violet' },
    { label: 'Amber', tone: 'amber' },
];

export const spinnerButtonVariants = buttonMatrixVariants.filter(({ variant }) => (
    variant === 'default'
    || variant === 'primary'
    || variant === 'secondary'
    || variant === 'dashed'
    || variant === 'outline'
    || variant === 'transparent'
));

export type SpinnerButtonVariant = SpinnerVariant;
