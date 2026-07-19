import type { PkValidator } from './types.js';

export function CustomErrorValidator(): PkValidator {
    return {
        observedAttributes: ['custom-error'],
        checkValidity(element) {
            const result = {
                message: '',
                isValid: true,
                invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
            };

            if (element.customError) {
                result.message = element.customError;
                result.isValid = false;
                result.invalidKeys.push('customError');
            }

            return result;
        },
    };
}
