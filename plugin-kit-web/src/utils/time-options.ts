export type TimeOption = {
    value: string;
    label: string;
};

export type TimepickerFormatOptions = {
    timeFormat?: string;
    lang?: {
        AM?: string;
        PM?: string;
    };
    locale?: string;
};

let timeOptionsCache: TimeOption[] | null = null;

function resolveTimepickerOptions(): Required<Pick<TimepickerFormatOptions, 'timeFormat' | 'lang'>> & { locale: string } {
    const craft = (globalThis as typeof globalThis & {
        Craft?: { timepicker?: TimepickerFormatOptions };
    }).Craft?.timepicker;

    return {
        timeFormat: craft?.timeFormat || 'g:i A',
        lang: {
            AM: craft?.lang?.AM || 'AM',
            PM: craft?.lang?.PM || 'PM',
        },
        locale: craft?.locale || document.documentElement.lang || 'en-US',
    };
}

/** Generate time options in 30-minute increments — mirrors React `generateTimeOptions`. */
export function generateTimeOptions(): TimeOption[] {
    if (timeOptionsCache) {
        return timeOptionsCache;
    }

    const options: TimeOption[] = [];
    const { timeFormat, lang, locale } = resolveTimepickerOptions();

    for (let hour = 0; hour < 24; hour += 1) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            let displayTime: string;

            if (timeFormat === 'g:i A') {
                let displayHour = hour;

                if (hour === 0) {
                    displayHour = 12;
                } else if (hour > 12) {
                    displayHour = hour - 12;
                }

                const ampm = hour >= 12 ? lang.PM : lang.AM;
                displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
            } else if (timeFormat === 'G:i') {
                displayTime = timeString;
            } else {
                displayTime = new Date(`2000-01-01T${timeString}:00`).toLocaleTimeString(locale, {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: timeFormat.includes('A'),
                });
            }

            options.push({
                value: timeString,
                label: displayTime,
            });
        }
    }

    timeOptionsCache = options;

    return options;
}

export function clearTimeOptionsCache(): void {
    timeOptionsCache = null;
}
