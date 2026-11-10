import type { ChartData } from '@verbb/plugin-kit-web/components/chart.js';

/**
 * Example figures shared by the web, React and Vue chart previews.
 * Daily keys cover 23 October to 5 November 2026; the previous period is the
 * 14 days before, so each comparison row falls on the same weekday.
 */

export const formSubmissions: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'submissions', label: 'Submissions', type: 'number' },
    ],
    rows: [
        ['2026-10-23', 44], ['2026-10-24', 19], ['2026-10-25', 16], ['2026-10-26', 52],
        ['2026-10-27', 48], ['2026-10-28', 55], ['2026-10-29', 47], ['2026-10-30', 41],
        ['2026-10-31', 21], ['2026-11-01', 18], ['2026-11-02', 57], ['2026-11-03', 53],
        ['2026-11-04', 60], ['2026-11-05', 49],
    ],
};

const weekCols: ChartData['cols'] = [
    { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
    { id: 'submissions', label: 'Submissions', type: 'number' },
];

/** The last seven days of submissions on two sites, for the updating-data example. */
export const submissionsBySite: Record<'au' | 'nz', ChartData> = {
    au: {
        cols: weekCols,
        rows: [
            ['2026-10-30', 31], ['2026-10-31', 14], ['2026-11-01', 12], ['2026-11-02', 42],
            ['2026-11-03', 39], ['2026-11-04', 45], ['2026-11-05', 36],
        ],
    },
    nz: {
        cols: weekCols,
        rows: [
            ['2026-10-30', 10], ['2026-10-31', 7], ['2026-11-01', 6], ['2026-11-02', 15],
            ['2026-11-03', 14], ['2026-11-04', 15], ['2026-11-05', 13],
        ],
    },
};

export const submissionsByStatus: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'completed', label: 'Completed', type: 'number' },
        { id: 'incomplete', label: 'Incomplete', type: 'number' },
        { id: 'spam', label: 'Spam', type: 'number', color: 8 },
    ],
    rows: [
        ['2026-10-23', 36, 6, 9], ['2026-10-24', 15, 3, 4], ['2026-10-25', 12, 3, 6],
        ['2026-10-26', 43, 7, 11], ['2026-10-27', 40, 6, 8], ['2026-10-28', 46, 7, 30],
        ['2026-10-29', 39, 6, 10], ['2026-10-30', 33, 6, 7], ['2026-10-31', 17, 3, 5],
        ['2026-11-01', 14, 3, 4], ['2026-11-02', 47, 8, 12], ['2026-11-03', 44, 7, 9],
        ['2026-11-04', 50, 8, 11], ['2026-11-05', 41, 6, 8],
    ],
};

export const recoveredRevenue: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
    ],
    currentLabel: 'Last 14 days',
    comparisonLabel: 'Previous 14 days',
    rows: [
        ['2026-10-23', 612.4], ['2026-10-24', 388], ['2026-10-25', 296.5], ['2026-10-26', 845.2],
        ['2026-10-27', 702.9], ['2026-10-28', 918.3], ['2026-10-29', 764], ['2026-10-30', 655.7],
        ['2026-10-31', 402.1], ['2026-11-01', 351.8], ['2026-11-02', 980.6], ['2026-11-03', 872.4],
        ['2026-11-04', 1104.9], ['2026-11-05', 893.2],
    ],
    comparisonRows: [
        ['2026-10-09', 540.2], ['2026-10-10', 301.6], ['2026-10-11', 255], ['2026-10-12', 720.4],
        ['2026-10-13', 668.1], ['2026-10-14', 702.5], ['2026-10-15', 690.3], ['2026-10-16', 598],
        ['2026-10-17', 344.7], ['2026-10-18', 290.9], ['2026-10-19', 811.2], ['2026-10-20', 760.4],
        ['2026-10-21', 845], ['2026-10-22', 772.6],
    ],
};

export const visitorsByDevice: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'desktop', label: 'Desktop', type: 'number' },
        { id: 'mobile', label: 'Mobile', type: 'number' },
    ],
    comparisonLabel: 'Previous 14 days',
    rows: [
        ['2026-10-23', 1840, 2210], ['2026-10-24', 920, 2650], ['2026-10-25', 860, 2580],
        ['2026-10-26', 2010, 2140], ['2026-10-27', 2090, 2190], ['2026-10-28', 2150, 2260],
        ['2026-10-29', 1980, 2230], ['2026-10-30', 1790, 2320], ['2026-10-31', 940, 2710],
        ['2026-11-01', 880, 2640], ['2026-11-02', 2120, 2280], ['2026-11-03', 2230, 2350],
        ['2026-11-04', 2310, 2420], ['2026-11-05', 2180, 2390],
    ],
    comparisonRows: [
        ['2026-10-09', 1760, 1930], ['2026-10-10', 890, 2290], ['2026-10-11', 830, 2240],
        ['2026-10-12', 1950, 1880], ['2026-10-13', 2020, 1920], ['2026-10-14', 2060, 1970],
        ['2026-10-15', 1910, 1950], ['2026-10-16', 1720, 2010], ['2026-10-17', 910, 2380],
        ['2026-10-18', 850, 2310], ['2026-10-19', 2040, 1990], ['2026-10-20', 2110, 2040],
        ['2026-10-21', 2190, 2100], ['2026-10-22', 2070, 2080],
    ],
};

export const pageViews: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'views', label: 'Page views', type: 'number' },
    ],
    rows: [
        ['2026-10-23', 8420], ['2026-10-24', 5130], ['2026-10-25', 4870], ['2026-10-26', 9640],
        ['2026-10-27', 11280], ['2026-10-28', 10350], ['2026-10-29', 9920], ['2026-10-30', 8710],
        ['2026-10-31', 5460], ['2026-11-01', 5020], ['2026-11-02', 10130], ['2026-11-03', 12940],
        ['2026-11-04', 11860], ['2026-11-05', 10470],
    ],
};

export const completionTime: ChartData = {
    cols: [
        { id: 'week', label: 'Week', type: 'date', bucket: 'week' },
        { id: 'time', label: 'Average time to complete', type: 'duration', positive: 'down' },
    ],
    rows: [
        ['2026-09-14', 312], ['2026-09-21', 298], ['2026-09-28', 305], ['2026-10-05', 276],
        ['2026-10-12', 262], ['2026-10-19', 251], ['2026-10-26', 244], ['2026-11-02', 238],
    ],
};

export const completionRate: ChartData = {
    cols: [
        { id: 'week', label: 'Week', type: 'date', bucket: 'week' },
        { id: 'rate', label: 'Completion rate', type: 'percent' },
    ],
    rows: [
        ['2026-09-14', 0.58], ['2026-09-21', 0.61], ['2026-09-28', 0.6], ['2026-10-05', 0.64],
        ['2026-10-12', 0.66], ['2026-10-19', 0.69], ['2026-10-26', 0.71], ['2026-11-02', 0.72],
    ],
};

export const completionByForm: ChartData = {
    cols: [
        { id: 'form', label: 'Form', type: 'category' },
        { id: 'completion', label: 'Completion rate', type: 'percent' },
    ],
    rows: [
        ['Newsletter', 0.94], ['Contact Us', 0.82], ['Event RSVP', 0.71],
        ['Quote Request', 0.47], ['Job Application', 0.33],
    ],
};

export const revenueByMonth: ChartData = {
    cols: [
        { id: 'month', label: 'Month', type: 'date', bucket: 'month' },
        { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
    ],
    rows: [
        ['2026-05', 8420], ['2026-06', 9180], ['2026-07', 10240],
        ['2026-08', 9870], ['2026-09', 11630], ['2026-10', 12480],
    ],
};

export const topForms: ChartData = {
    cols: [
        { id: 'form', label: 'Form', type: 'category' },
        { id: 'submissions', label: 'Submissions', type: 'number' },
    ],
    rows: [
        ['Contact Us', 1284], ['Newsletter', 932], ['Quote Request', 611],
        ['Event RSVP', 402], ['Job Application', 266],
    ],
};

export const ordersByEmail: ChartData = {
    cols: [
        { id: 'sequence', label: 'Sequence', type: 'category' },
        { id: 'email1', label: 'Email 1', type: 'number' },
        { id: 'email2', label: 'Email 2', type: 'number' },
        { id: 'email3', label: 'Email 3', type: 'number' },
    ],
    rows: [
        ['Default sequence', 42, 23, 11],
        ['High-value carts', 18, 12, 7],
        ['Win-back', 9, 6, 4],
    ],
};

export const skippedCarts: ChartData = {
    cols: [
        { id: 'week', label: 'Week', type: 'date', bucket: 'week' },
        { id: 'noEmail', label: 'No email address', type: 'number' },
        { id: 'belowMinimum', label: 'Below minimum total', type: 'number' },
        { id: 'optedOut', label: 'Customer opted out', type: 'number' },
    ],
    rows: [
        ['2026-09-28', 38, 21, 6], ['2026-10-05', 42, 18, 7], ['2026-10-12', 35, 24, 5],
        ['2026-10-19', 47, 19, 9], ['2026-10-26', 40, 22, 8], ['2026-11-02', 44, 17, 6],
    ],
};

export const deviceShare: ChartData = {
    cols: [
        { id: 'source', label: 'Traffic source', type: 'category' },
        { id: 'desktop', label: 'Desktop', type: 'number' },
        { id: 'mobile', label: 'Mobile', type: 'number' },
        { id: 'tablet', label: 'Tablet', type: 'number' },
    ],
    rows: [
        ['Search', 5820, 7410, 640],
        ['Direct', 4310, 2260, 310],
        ['Social', 1180, 4920, 290],
        ['Email', 2140, 1630, 170],
        ['Referral', 960, 720, 80],
    ],
};

export const visitorsByCountry: ChartData = {
    cols: [
        { id: 'country', label: 'Country', type: 'category' },
        { id: 'visitors', label: 'Visitors', type: 'number' },
    ],
    rows: [
        ['United States', 18420], ['United Kingdom', 6310], ['Australia', 5180],
        ['Germany', 4240], ['Canada', 3970], ['France', 2160],
        ['Netherlands', 1480], ['New Zealand', 1120], ['Japan', 860],
    ],
};

export const cartRecovery: ChartData = {
    cols: [
        { id: 'stage', label: 'Stage', type: 'category' },
        { id: 'carts', label: 'Carts', type: 'number' },
    ],
    firstNote: '$184,920 at risk',
    rows: [
        ['Abandoned', 2480], ['Emailed', 1680], ['Opened', 1092],
        ['Clicked', 386], ['Recovered', 84],
    ],
};

export const cartRecoveryTracks: ChartData = {
    cols: [
        { id: 'stage', label: 'Stage', type: 'category' },
        { id: 'carts', label: 'Carts', type: 'number' },
    ],
    rows: [
        ['Carts Abandoned', 912], ['Emailed', 748], ['Clicked Through', 203], ['Recovered', 84],
    ],
    notes: [
        '$121,880 left in carts',
        { rate: 0.82, text: 'reachable · 164 skipped' },
        { rate: 0.271, text: 'of emailed' },
        { rate: 0.112, text: 'of emailed' },
    ],
};

export const applicationCompletion: ChartData = {
    cols: [
        { id: 'page', label: 'Page', type: 'category' },
        { id: 'people', label: 'People', type: 'number' },
    ],
    rows: [
        ['Started', 3200], ['Personal details', 2410], ['Experience', 1870],
        ['References', 1640], ['Submitted', 1512],
    ],
};

export const revenueByMonthGerman: ChartData = {
    cols: [
        { id: 'month', label: 'Monat', type: 'date', bucket: 'month' },
        { id: 'revenue', label: 'Wiederhergestellter Umsatz', type: 'money', currency: 'EUR' },
    ],
    rows: revenueByMonth.rows,
};

export const revenueByMonthArabic: ChartData = {
    cols: [
        { id: 'month', label: 'الشهر', type: 'date', bucket: 'month' },
        { id: 'revenue', label: 'الإيرادات المستردة', type: 'money', currency: 'EGP' },
    ],
    rows: revenueByMonth.rows,
};

/** Submissions per form over the last 14 days, for sparkline and meter tables. */
export const formActivity = [
    { form: 'Contact Us', submissions: 1284, completion: 0.82, spam: 0.031, trend: [88, 41, 37, 102, 96, 110, 94, 90, 44, 39, 118, 104, 121, 99] },
    { form: 'Newsletter', submissions: 932, completion: 0.94, spam: 0.064, trend: [61, 52, 49, 70, 66, 64, 72, 58, 50, 47, 75, 69, 71, 68] },
    { form: 'Quote Request', submissions: 611, completion: 0.47, spam: 0.012, trend: [48, 12, 9, 51, 47, 45, 50, 46, 14, 10, 39, 41, 36, 33] },
    { form: 'Event RSVP', submissions: 402, completion: 0.71, spam: 0.004, trend: [12, 9, 8, 15, 18, 22, 27, 31, 26, 24, 38, 44, 52, 61] },
    { form: 'Job Application', submissions: 266, completion: 0.33, spam: 0.18, trend: [22, 8, 6, 24, 21, 19, 23, 20, 7, 5, 18, 17, 21, 16] },
];

export const activityDates = formSubmissions.rows.map((row) => row[0] as string);
