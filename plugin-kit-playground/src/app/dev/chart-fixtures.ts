import type { ChartColumn, ChartData } from '@verbb/plugin-kit-web/components/chart.js';

/** Deterministic example data for the chart lab and the chart interaction tests. */

function random(seed: number): () => number {
    let state = seed;

    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function dayKeys(end: string, count: number, step = 1): string[] {
    const [year, month, day] = end.split('-').map(Number);

    return Array.from({ length: count }, (_value, index) => iso(new Date(year, month - 1, day - (count - 1 - index) * step)));
}

/** Values that sum to `total`, with quieter weekends and an optional upward trend. */
export function seriesFor(keys: string[], total: number, seed: number, options: { weekend?: number; trend?: number; decimals?: number } = {}): number[] {
    const next = random(seed);
    const { weekend = 0.7, trend = 0, decimals = 0 } = options;
    const raw = keys.map((key, index) => {
        const weekday = new Date(`${key}T00:00:00`).getDay();

        return (1 + trend * (index / keys.length)) * (0.65 + next() * 0.7) * (weekday === 0 || weekday === 6 ? weekend : 1);
    });
    const sum = raw.reduce((a, b) => a + b, 0);
    const scale = 10 ** decimals;

    return raw.map((value) => Math.round((value / sum) * total * scale) / scale);
}

const dateCol: ChartColumn = { id: 'date', label: 'Date', type: 'date', bucket: 'day' };
const weekCol: ChartColumn = { id: 'week', label: 'Week', type: 'date', bucket: 'week' };
const moneyCol: ChartColumn = { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' };

export const currentDays = dayKeys('2026-11-05', 30);
export const previousDays = dayKeys('2026-10-06', 30);
export const revenueCurrent = seriesFor(currentDays, 12480, 7, { decimals: 2, trend: 0.3 });
const revenuePrevious = seriesFor(previousDays, 10576, 11, { decimals: 2 });

export const recoveredRevenue: ChartData = {
    cols: [dateCol, moneyCol],
    rows: currentDays.map((key, index) => [key, revenueCurrent[index]]),
    currentLabel: 'Last 30 days',
    comparisonLabel: 'Previous 30 days',
    comparisonRows: previousDays.map((key, index) => [key, revenuePrevious[index]]),
};

const complete = seriesFor(currentDays, 1190, 3, { weekend: 0.45 });
const incomplete = seriesFor(currentDays, 352, 5, { weekend: 0.6 });
const spam = seriesFor(currentDays, 212, 9, { weekend: 1.1 });

export const submissions: ChartData = {
    cols: [
        dateCol,
        { id: 'complete', label: 'Complete', type: 'number' },
        { id: 'incomplete', label: 'Incomplete', type: 'number' },
        { id: 'spam', label: 'Spam', type: 'number', color: 2 },
    ],
    rows: currentDays.map((key, index) => [key, complete[index], incomplete[index], spam[index]]),
};

const desktop = seriesFor(currentDays, 16400, 21, { weekend: 0.55, trend: 0.15 });
const mobile = seriesFor(currentDays, 13100, 23, { weekend: 1.15, trend: 0.3 });
const desktopPrevious = seriesFor(previousDays, 15200, 25, { weekend: 0.55 });
const mobilePrevious = seriesFor(previousDays, 10800, 27, { weekend: 1.15 });

export const visitorsByDevice: ChartData = {
    cols: [dateCol, { id: 'desktop', label: 'Desktop', type: 'number' }, { id: 'mobile', label: 'Mobile', type: 'number' }],
    rows: currentDays.map((key, index) => [key, desktop[index], mobile[index]]),
    comparisonLabel: 'Previous period',
    comparisonRows: previousDays.map((key, index) => [key, desktopPrevious[index], mobilePrevious[index]]),
};

const year = dayKeys('2026-11-05', 365);
const pageViews = seriesFor(year, 365 * 1850, 31, { weekend: 0.6, trend: 0.4 });

export const pageViewsYear: ChartData = {
    cols: [dateCol, { id: 'views', label: 'Page views', type: 'number' }],
    rows: year.map((key, index) => [key, pageViews[index]]),
};

const weeks12 = dayKeys('2026-11-02', 12, 7);
const durations = [142, 151, 148, 139, 160, 171, 166, 158, 174, 181, 169, 186];

export const sessionDuration: ChartData = {
    cols: [weekCol, { id: 'duration', label: 'Average session', type: 'duration' }],
    rows: weeks12.map((key, index) => [key, durations[index]]),
};

export const skippedReasons: ChartData = {
    cols: [
        weekCol,
        { id: 'optin', label: "Didn't opt in", type: 'number' },
        { id: 'recent', label: 'Contacted in the last 7 days', type: 'number' },
        { id: 'nosequence', label: 'No sequence was on', type: 'number' },
        { id: 'dne', label: 'On Do Not Email', type: 'number' },
    ],
    rows: [
        ['2026-10-05', 13, 9, 7, 4],
        ['2026-10-12', 16, 11, 5, 5],
        ['2026-10-19', 14, 8, 4, 3],
        ['2026-10-26', 15, 12, 4, 6],
        ['2026-11-02', 13, 8, 3, 4],
    ],
};

const months = ['2025-12-01', '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01', '2026-07-01', '2026-08-01', '2026-09-01', '2026-10-01', '2026-11-01'];
const monthlyRevenue = [8210, 7340, 7980, 9120, 9640, 10230, 9870, 10910, 11380, 10576, 12480, 2390];

export const revenueByMonth: ChartData = {
    cols: [{ id: 'month', label: 'Month', type: 'date', bucket: 'month' }, moneyCol],
    rows: months.map((key, index) => [key, monthlyRevenue[index]]),
};

export const topForms: ChartData = {
    cols: [{ id: 'form', label: 'Form', type: 'category' }, { id: 'submissions', label: 'Submissions', type: 'number' }],
    rows: [['Contact Us', 1284], ['Newsletter', 932], ['Quote Request', 611], ['Event RSVP', 402], ['Job Application', 266], ['Feedback', 181], ['Support', 97]],
};

export const ordersByEmail: ChartData = {
    cols: [
        { id: 'email', label: 'Email', type: 'category' },
        { id: 'high-value', label: 'High-Value Carts', type: 'number' },
        { id: 'returning', label: 'Returning Customers', type: 'number' },
        { id: 'everyone', label: 'Everyone Else', type: 'number' },
    ],
    rows: [['Email 1', 21, 14, 12], ['Email 2', 11, 7, 6], ['Email 3', 6, 0, 4], ['No click', 2, 1, 0]],
};

export const deviceShare: ChartData = {
    cols: [
        { id: 'source', label: 'Source', type: 'category' },
        { id: 'desktop', label: 'Desktop', type: 'number' },
        { id: 'mobile', label: 'Mobile', type: 'number' },
        { id: 'tablet', label: 'Tablet', type: 'number' },
    ],
    rows: [['Search', 6120, 4980, 610], ['Direct', 4410, 2210, 380], ['Social', 1180, 4630, 290], ['Referral', 1720, 1010, 140], ['Email', 980, 1270, 90]],
};

export const visitorsByCountry: ChartData = {
    cols: [{ id: 'country', label: 'Country', type: 'category' }, { id: 'visitors', label: 'Visitors', type: 'number' }],
    rows: [['Australia', 11840], ['United States', 7420], ['United Kingdom', 3910], ['Germany', 2280], ['Canada', 1630], ['New Zealand', 1240], ['France', 760], ['Japan', 520], ['Brazil', 310]],
};

export const ordersBySequence: ChartData = {
    cols: [{ id: 'sequence', label: 'Sequence', type: 'category' }, { id: 'orders', label: 'Orders', type: 'number' }],
    rows: [['High-Value Carts', 40], ['Returning Customers', 22], ['Everyone Else', 22]],
};

export const cartFunnel: ChartData = {
    cols: [{ id: 'stage', label: 'Stage', type: 'category' }, { id: 'carts', label: 'Carts', type: 'number' }],
    rows: [['Carts abandoned', 912], ['Emailed', 748], ['Clicked through', 203], ['Recovered', 84]],
    firstNote: '$121,880 left in carts',
};

export const formFunnel: ChartData = {
    cols: [{ id: 'step', label: 'Step', type: 'category' }, { id: 'visitors', label: 'Visitors', type: 'number' }],
    rows: [['Viewed form', 4210], ['Started', 1630], ['Reached page 2', 1102], ['Submitted', 874]],
};
