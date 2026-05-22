import { translate } from '@verbb/plugin-kit-react/utils/translation';
import { getValueSize } from './utils';

export const maxRule = (value: unknown, label: string, args: string[]) => {
    const max = Number(args[0]);
    const size = getValueSize(value);
    if (!Number.isFinite(size) || size > max) {
        return translate('{attribute} must be at most {max}.', { attribute: label, max: String(args[0]) });
    }
    return null;
};
