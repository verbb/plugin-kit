import type { PkFormAssociatedElement } from '../base/pk-form-associated-element.js';
import type { PkValidator } from './types.js';

export type RequiredValidatorOptions = {
    validationElement?: HTMLInputElement | HTMLSelectElement;
    validationProperty?: string;
};

export function RequiredValidator(options: RequiredValidatorOptions = {}): PkValidator {
    let { validationElement, validationProperty } = options;

    if (!validationElement && typeof document !== 'undefined') {
        validationElement = Object.assign(document.createElement('input'), { required: true });
    }

    if (!validationProperty) {
        validationProperty = 'value';
    }

    const validator: PkValidator = {
        observedAttributes: ['required'],
        message: validationElement?.validationMessage ?? 'Please fill out this field.',
        checkValidity(element: PkFormAssociatedElement) {
            const result = {
                message: '',
                isValid: true,
                invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
            };

            if (!element.required) {
                return result;
            }

            const value = (element as unknown as Record<string, unknown>)[validationProperty!];
            const isEmpty = value === null || value === undefined || value === false || value === '';

            if (!isEmpty) {
                return result;
            }

            result.isValid = false;
            result.message = typeof validator.message === 'function'
                ? validator.message(element)
                : validator.message ?? '';
            result.invalidKeys.push('valueMissing');

            return result;
        },
    };

    return validator;
}
