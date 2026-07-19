import type { PkSpinnerSize, PkSpinnerVariant } from './pk-spinner.js';

type ButtonSize = 'default' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'none';
type ButtonVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'transparent'
    | 'link'
    | 'dashed'
    | 'none';

export function getButtonSpinnerSize(buttonSize: ButtonSize = 'default'): PkSpinnerSize {
    if (buttonSize === 'xxs' || buttonSize === 'xs') {
        return 'xxs';
    }

    if (buttonSize === 'lg' || buttonSize === 'xl') {
        return 'sm';
    }

    return 'xs';
}

export function resolveSpinnerVariant(
    buttonVariant: ButtonVariant = 'default',
    override?: PkSpinnerVariant,
): PkSpinnerVariant {
    if (override) {
        return override;
    }

    if (
        buttonVariant === 'primary'
        || buttonVariant === 'secondary'
        || buttonVariant === 'dashed'
        || buttonVariant === 'outline'
        || buttonVariant === 'transparent'
    ) {
        return buttonVariant;
    }

    return 'default';
}
