import { PkSpinnerSize, PkSpinnerVariant } from './pk-spinner.js';
type ButtonSize = 'default' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'none';
type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'transparent' | 'link' | 'dashed' | 'none';
export declare function getButtonSpinnerSize(buttonSize?: ButtonSize): PkSpinnerSize;
export declare function resolveSpinnerVariant(buttonVariant?: ButtonVariant, override?: PkSpinnerVariant): PkSpinnerVariant;
export {};
//# sourceMappingURL=spinner-utils.d.ts.map