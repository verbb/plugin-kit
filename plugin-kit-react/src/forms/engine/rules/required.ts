import { translate } from '@verbb/plugin-kit-react/utils/translation';
import { isEmptyValue } from './utils';

export const requiredRule = (value: unknown, label: string) => {
    if (isEmptyValue(value)) {
        return translate('{attribute} cannot be blank.', { attribute: label });
    }
    return null;
};
