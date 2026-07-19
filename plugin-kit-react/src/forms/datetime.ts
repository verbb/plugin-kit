const pad2 = (value: string): string => {
    return value.padStart(2, '0');
};

export type DateTimeParts = {
    date: string;
    time: string;
};

/**
 * Split a stored datetime value into the string parts the string-valued `pk-date-picker`
 * (`YYYY-MM-DD`) and `pk-time-picker` (`HH:MM`) consume. Kept string-based on purpose: the
 * web-component pickers are string-valued, so there is no need to round-trip through `Date`.
 */
export const parseDateTimeParts = (value: unknown): DateTimeParts => {
    if (value === null || value === undefined || value === '') {
        return { date: '', time: '' };
    }

    const stringValue = String(value).trim();
    const match = stringValue.match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}):(\d{2}))?/);

    if (!match) {
        return { date: '', time: '' };
    }

    const [, date, hour, minute] = match;

    return {
        date,
        time: hour !== undefined && minute !== undefined ? `${hour}:${minute}` : '',
    };
};

export const formatDateTimeParts = (date: string, time: string): string => {
    if (!date) {
        return '';
    }

    const [hour = '00', minute = '00'] = (time || '00:00').split(':');

    return `${date} ${pad2(hour)}:${pad2(minute)}:00`;
};
