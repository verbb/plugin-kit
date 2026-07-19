import type { PkFormAssociatedElement } from '../base/pk-form-associated-element.js';

export type ValidityKey = Exclude<keyof ValidityState, 'valid'>;

export interface PkValidator {
    observedAttributes?: string[];
    message?: string | ((element: PkFormAssociatedElement) => string);
    checkValidity: (element: PkFormAssociatedElement) => {
        message: string;
        isValid: boolean;
        invalidKeys: ValidityKey[];
    };
}
