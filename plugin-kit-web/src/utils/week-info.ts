/** Locale week info — ported from  `date-picker/internal/week-info`. */

export type WeekdayName = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type WeekInfo = {
    /** First day of the week (1=Monday … 7=Sunday, per Intl spec). */
    firstDay: number;
    /** Weekend day numbers (1=Monday … 7=Sunday). */
    weekend: number[];
};

const SUNDAY_FIRST = new Set([
    'US', 'CA', 'MX', 'BR', 'JP', 'PH', 'IL', 'AU', 'NZ', 'ZA',
    'CO', 'VE', 'PE', 'EC', 'GT', 'HN', 'NI', 'SV', 'CR', 'PA',
    'DO', 'PR', 'JM', 'TT', 'BS', 'BB', 'BZ', 'BO', 'BM', 'TW',
    'HK', 'MO', 'SG', 'TH', 'ET', 'KE',
]);

const SATURDAY_FIRST = new Set(['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'JO', 'SY', 'IQ', 'EG', 'SD', 'DZ', 'LY']);

const FRI_SAT_WEEKEND = new Set([
    'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'JO', 'EG', 'SD',
    'DZ', 'LY', 'SY', 'IQ', 'IL',
]);

function regionFromLocale(locale: string): string | null {
    try {
        const parsed = new Intl.Locale(locale);
        const region = parsed.maximize().region;

        return region ?? null;
    } catch {
        return null;
    }
}

function fallbackWeekInfo(locale: string): WeekInfo {
    const region = regionFromLocale(locale);
    let firstDay = 1;

    if (region && SUNDAY_FIRST.has(region)) {
        firstDay = 7;
    } else if (region && SATURDAY_FIRST.has(region)) {
        firstDay = 6;
    }

    const weekend = region && FRI_SAT_WEEKEND.has(region) ? [5, 6] : [6, 7];

    return { firstDay, weekend };
}

export function getWeekInfo(locale: string): WeekInfo {
    try {
        const parsed = new Intl.Locale(locale) as Intl.Locale & {
            getWeekInfo?: () => WeekInfo;
            weekInfo?: WeekInfo;
        };

        const info = typeof parsed.getWeekInfo === 'function'
            ? parsed.getWeekInfo()
            : parsed.weekInfo;

        if (info && typeof info.firstDay === 'number' && Array.isArray(info.weekend)) {
            return { firstDay: info.firstDay, weekend: info.weekend };
        }
    } catch {
        // fall through
    }

    return fallbackWeekInfo(locale);
}

/** Convert Intl first day (1=Mon..7=Sun) to JS `Date.getDay()` (0=Sun..6=Sat). */
export function intlFirstDayToJsDay(intlFirstDay: number): number {
    return intlFirstDay === 7 ? 0 : intlFirstDay;
}

export function intlWeekendToJsDays(intlWeekend: number[]): number[] {
    return intlWeekend.map(intlFirstDayToJsDay);
}

export function resolveFirstDayOfWeek(
    attribute: 'auto' | WeekdayName,
    locale: string,
): number {
    if (attribute !== 'auto') {
        const map: Record<WeekdayName, number> = {
            sun: 0,
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5,
            sat: 6,
        };

        return map[attribute];
    }

    return intlFirstDayToJsDay(getWeekInfo(locale).firstDay);
}
