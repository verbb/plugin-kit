import { translate } from '../translate';

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
const variableRegex = /({.*?})/;

export const emailOrVariableRule = (value: unknown, label: string) => {
    const text = String(value);
    if (!variableRegex.test(text) && !emailRegex.test(text)) {
        return translate('{attribute} must be a valid email address or variable.', { attribute: label });
    }
    return null;
};
