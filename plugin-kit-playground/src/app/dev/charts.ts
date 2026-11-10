import '@verbb/plugin-kit-web/components/button.js';
import '@verbb/plugin-kit-web/components/chart.js';
import {
    cartFunnel,
    dayKeys,
    deviceShare,
    formFunnel,
    ordersByEmail,
    ordersBySequence,
    pageViewsYear,
    recoveredRevenue,
    revenueByMonth,
    seriesFor,
    sessionDuration,
    skippedReasons,
    submissions,
    topForms,
    visitorsByCountry,
    visitorsByDevice,
} from './chart-fixtures.ts';
import './charts.css';

const CARDS: [id: string, title: string, markup: string][] = [
    ['revenue', 'Recovered revenue (area, comparison, table toggle)', '<pk-line-chart id="chart-revenue" label="Recovered revenue by day" description="Recovered revenue rose 18% on the previous 30 days, with the strongest days in the final week." area table-toggle></pk-line-chart>'],
    ['submissions', 'Form submissions (three series, pinned colour)', '<pk-line-chart id="chart-submissions" label="Submissions by day, by status"></pk-line-chart>'],
    ['devices', 'Visitors by device (two series with comparison)', '<pk-line-chart id="chart-devices" label="Visitors by device"></pk-line-chart>'],
    ['views', 'Page views, 365 days (dense)', '<pk-line-chart id="chart-views" label="Page views by day" area curve="linear"></pk-line-chart>'],
    ['duration', 'Average session (duration, week buckets)', '<pk-line-chart id="chart-duration" label="Average session by week" curve="linear"></pk-line-chart>'],
    ['months', 'Revenue by month (axis titles, fixed max)', '<pk-bar-chart id="chart-months" label="Recovered revenue by month" x-label="Month" y-label="Recovered revenue (USD)" max="15000"></pk-bar-chart>'],
    ['forms', 'Top forms (horizontal, value labels)', '<pk-bar-chart id="chart-forms" label="Top forms by submissions" orientation="horizontal" value-labels></pk-bar-chart>'],
    ['emails', 'Orders by email (grouped)', '<pk-bar-chart id="chart-emails" label="Recovered orders by email"></pk-bar-chart>'],
    ['reasons', 'Skipped carts (stacked)', '<pk-bar-chart id="chart-reasons" label="Carts skipped by reason" stacked="normal" table-toggle></pk-bar-chart>'],
    ['share', 'Device share (100% stacked, horizontal)', '<pk-bar-chart id="chart-share" label="Device share by source" orientation="horizontal" stacked="percent"></pk-bar-chart>'],
    ['countries', 'Visitors by country (folds into Other)', '<pk-donut-chart id="chart-countries" label="Visitors by country" table-toggle></pk-donut-chart>'],
    ['sequences', 'Orders by sequence', '<pk-donut-chart id="chart-sequences" label="Recovered orders by sequence"></pk-donut-chart>'],
    ['funnel', 'Cart recovery funnel (steps)', '<pk-funnel-chart id="chart-funnel" label="Cart recovery funnel" table-toggle></pk-funnel-chart>'],
    ['form-funnel', 'Form completion funnel (centered)', '<pk-funnel-chart id="chart-form-funnel" label="Form completion funnel" shape="centered"></pk-funnel-chart>'],
    ['loading', 'First load', '<pk-bar-chart id="chart-loading" label="Revenue by month" state="loading"></pk-bar-chart>'],
    ['empty', 'No data', '<pk-line-chart id="chart-empty" label="Revenue by day" empty-heading="No recovered orders yet" empty-message="Recovered orders appear here once a customer completes a cart from a recovery email."></pk-line-chart>'],
    ['error', 'Error with retry', '<pk-bar-chart id="chart-error" label="Top forms" state="error" error-message="The server took too long to respond. Try again, or narrow the date range."><pk-button size="sm" slot="state-actions" id="chart-retry">Try again</pk-button></pk-bar-chart>'],
];

const FORMS: [name: string, submissions: number, completion: number, spam: number, seed: number][] = [
    ['Contact Us', 1284, 0.82, 0.031, 51],
    ['Newsletter', 932, 0.94, 0.064, 53],
    ['Quote Request', 611, 0.47, 0.012, 57],
    ['Event RSVP', 402, 0.71, 0.004, 59],
    ['Job Application', 266, 0.33, 0.18, 61],
];

/** Every chart element and state on one page, for manual review and the interaction tests. */
export function mountChartsLab(outlet: HTMLElement): () => void {
    const page = document.createElement('div');
    page.className = 'pg-page pg-charts';
    page.innerHTML = `
        <div class="pg-page__hero">
            <div class="pg-page__eyebrow">Dev tools</div>
            <h1 class="pg-page__title">Charts</h1>
            <p class="pg-page__lead">Every chart element with example data. Hover or focus a chart and use the arrow keys; toggle legend items; switch locale and direction to check formatting and RTL.</p>
        </div>
        <section class="pg-charts__controls" aria-label="Chart lab controls">
            <label>Locale <select data-locale aria-label="Locale">
                <option value="en-US">English (US)</option><option value="de-DE">Deutsch</option><option value="ar-EG">العربية (RTL)</option>
            </select></label>
            <button type="button" data-refresh>Simulate refresh</button>
        </section>
        <div class="pg-charts__grid">
            ${CARDS.map(([id, title, markup]) => `<section class="pg-charts__card" data-card="${id}"><h2>${title}</h2>${markup}</section>`).join('')}
        </div>
        <section class="pg-charts__card">
            <h2>Sparklines and meters in a table</h2>
            <table class="pg-charts__table">
                <thead><tr><th scope="col">Form</th><th scope="col">Submissions</th><th scope="col">Last 14 days</th><th scope="col">Completion</th><th scope="col">Spam</th></tr></thead>
                <tbody></tbody>
            </table>
        </section>
        <ol class="pg-charts__log" aria-label="Chart events"></ol>
    `;
    outlet.replaceChildren(page);

    const byId = <T extends HTMLElement>(id: string) => page.querySelector<T>(`#${id}`)!;
    const data: Record<string, unknown> = {
        'chart-revenue': recoveredRevenue,
        'chart-submissions': submissions,
        'chart-devices': visitorsByDevice,
        'chart-views': pageViewsYear,
        'chart-duration': sessionDuration,
        'chart-months': revenueByMonth,
        'chart-forms': topForms,
        'chart-emails': ordersByEmail,
        'chart-reasons': skippedReasons,
        'chart-share': deviceShare,
        'chart-countries': visitorsByCountry,
        'chart-sequences': ordersBySequence,
        'chart-funnel': cartFunnel,
        'chart-form-funnel': formFunnel,
        'chart-empty': { cols: recoveredRevenue.cols, rows: [] },
    };

    for (const [id, value] of Object.entries(data)) {
        Object.assign(byId(id), { data: value });
    }

    const days14 = dayKeys('2026-11-05', 14);
    const body = page.querySelector('tbody')!;

    for (const [name, total, completion, spam, seed] of FORMS) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row"></th>
            <td class="numeric">${total.toLocaleString('en-US')}</td>
            <td><pk-sparkline></pk-sparkline></td>
            <td><pk-meter value="${completion}" low="0.4" high="0.6" optimum="1" format="percent" show-value></pk-meter></td>
            <td><pk-meter value="${spam}" max="0.25" low="0.05" high="0.15" optimum="0" format="percent" show-value></pk-meter></td>
        `;
        row.querySelector('th')!.textContent = name;
        const sparkline = row.querySelector('pk-sparkline')!;
        Object.assign(sparkline, { values: seriesFor(days14, Math.round(total / 2.1), seed), dates: days14, label: `${name} submissions, last 14 days` });
        row.querySelectorAll('pk-meter')[0].setAttribute('label', `${name} completion rate`);
        row.querySelectorAll('pk-meter')[1].setAttribute('label', `${name} spam rate`);
        body.append(row);
    }

    const log = page.querySelector('.pg-charts__log')!;
    const record = (event: Event) => {
        const item = document.createElement('li');
        const target = event.target as HTMLElement;
        const detail = { ...(event as CustomEvent).detail };

        if (Array.isArray(detail.row)) {
            detail.row = detail.row.slice(0, 3);
        }

        item.textContent = `${event.type} #${target.id} ${JSON.stringify(detail)}`;
        log.prepend(item);
    };
    const events = ['pk-point-select', 'pk-legend-toggle', 'pk-view-change'];
    events.forEach((name) => page.addEventListener(name, record));

    page.querySelector<HTMLSelectElement>('[data-locale]')!.addEventListener('change', (event) => {
        const locale = (event.target as HTMLSelectElement).value;
        page.querySelectorAll('pk-line-chart, pk-bar-chart, pk-donut-chart, pk-funnel-chart, pk-sparkline, pk-meter')
            .forEach((element) => element.setAttribute('locale', locale));
        page.dir = locale.startsWith('ar') ? 'rtl' : 'ltr';
    });

    page.querySelector('[data-refresh]')!.addEventListener('click', () => {
        const chart = byId('chart-revenue');
        chart.setAttribute('state', 'loading');
        window.setTimeout(() => chart.removeAttribute('state'), 1200);
    });

    byId('chart-retry').addEventListener('click', () => {
        const chart = byId('chart-error');
        chart.setAttribute('state', 'loading');
        window.setTimeout(() => {
            Object.assign(chart, { data: topForms, orientation: 'horizontal', valueLabels: true });
            chart.removeAttribute('state');
        }, 800);
    });

    return () => {
        events.forEach((name) => page.removeEventListener(name, record));
        page.remove();
    };
}
