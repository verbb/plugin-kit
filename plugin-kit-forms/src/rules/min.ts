import { translate } from '../translate';
import { getValueSize } from './utils';

export const minRule = (value: unknown, label: string, args: string[]) => {
    const min = Number(args[0]);
    const size = getValueSize(value);
    if (!Number.isFinite(size) || size < min) {
        return translate('{attribute} must be at least {min}.', { attribute: label, min: String(args[0]) });
    }
    return null;
};
