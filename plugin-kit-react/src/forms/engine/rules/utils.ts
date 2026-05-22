export const isEmptyValue = (value: unknown) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === 'string') {
        return value === '';
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return false;
};

export const getValueSize = (value: unknown) => {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed !== '' && Number.isFinite(Number(trimmed))) {
            return Number(trimmed);
        }

        return value.length;
    }

    if (Array.isArray(value)) {
        return value.length;
    }

    return NaN;
};
