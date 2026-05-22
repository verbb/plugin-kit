import { translate } from '@verbb/plugin-kit-react/utils/translation';

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

export const emailRule = (value: unknown, label: string) => {
    if (!emailRegex.test(String(value))) {
        return translate('{attribute} must be a valid email address.', { attribute: label });
    }
    return null;
};
