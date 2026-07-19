import { translate } from '../translate';

const handleRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export const handleRule = (value: unknown) => {
    const handle = String(value ?? '');

    if (!handleRegex.test(handle)) {
        return translate('“{handle}” isn’t a valid handle.', { handle });
    }

    return null;
};
