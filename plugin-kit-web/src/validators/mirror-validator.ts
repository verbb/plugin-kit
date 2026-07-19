import type { PkValidator, ValidityKey } from './types.js';

/** Delegates validity to the shadow native control —  `MirrorValidator`. */
export function MirrorValidator(): PkValidator {
    return {
        checkValidity(element) {
            const formControl = element.input;
            const result = {
                message: '',
                isValid: true,
                invalidKeys: [] as ReturnType<PkValidator['checkValidity']>['invalidKeys'],
            };

            if (!formControl) {
                return result;
            }

            let isValid = true;

            if ('checkValidity' in formControl && typeof formControl.checkValidity === 'function') {
                isValid = formControl.checkValidity();
            }

            if (isValid) {
                return result;
            }

            result.isValid = false;

            if ('validationMessage' in formControl && typeof formControl.validationMessage === 'string') {
                result.message = formControl.validationMessage;
            }

            if (!('validity' in formControl) || !formControl.validity) {
                result.invalidKeys.push('customError');
                return result;
            }

            for (const key of Object.keys(formControl.validity)) {
                if (key === 'valid') {
                    continue;
                }

                const validityKey = key as ValidityKey;

                if (formControl.validity[validityKey]) {
                    result.invalidKeys.push(validityKey);
                }
            }

            return result;
        },
    };
}
