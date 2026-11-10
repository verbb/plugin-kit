import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'vite';

const playground = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
    root: playground,
    configFile: path.join(playground, 'vite.config.ts'),
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, strictPort: false, open: false },
});

const chartIds = [
    'chart-revenue', 'chart-submissions', 'chart-devices', 'chart-views', 'chart-duration',
    'chart-months', 'chart-forms', 'chart-emails', 'chart-reasons', 'chart-share',
    'chart-countries', 'chart-sequences', 'chart-funnel', 'chart-form-funnel',
];

try {
    await server.listen();
    const url = `${server.resolvedUrls.local[0]}tools/charts`;

    for (const engine of [chromium, firefox, webkit]) {
        const browser = await engine.launch({ headless: true });

        try {
            const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(url);
            await page.locator('#chart-revenue').waitFor();

            // Every data chart draws at a real size.
            await page.waitForFunction((ids) => ids.every((id) => {
                const canvas = document.getElementById(id)?.shadowRoot?.querySelector('canvas');

                return canvas && canvas.width > 0 && canvas.height > 0;
            }), chartIds);

            const revenue = page.locator('#chart-revenue');

            // Keyboard: the plot is focusable and arrow keys drive the tooltip and live region.
            await revenue.locator('[part="plot"]').focus();
            await page.keyboard.press('End');
            const tooltip = revenue.locator('[part="tooltip"]');
            await assert.doesNotReject(() => tooltip.locator('.tooltip-title').waitFor());
            assert.match(await tooltip.innerText(), /\$[\d,]+\.\d{2}/);
            assert.match(await tooltip.innerText(), /%/, 'change against the previous period is shown');
            assert.notEqual((await revenue.locator('.live').textContent()).trim(), '');
            await page.keyboard.press('Escape');

            // Legend toggles the comparison and reports it.
            const previous = revenue.getByRole('button', { name: 'Previous 30 days' });
            await previous.click();
            assert.equal(await previous.getAttribute('aria-pressed'), 'false');
            assert.match(await page.locator('.pg-charts__log').innerText(), /pk-legend-toggle #chart-revenue .*"hidden":true/);
            await previous.click();

            // Table view: visible table with one row per bucket.
            await revenue.getByRole('button', { name: 'Table' }).click();
            const table = revenue.locator('[part="table"] table');
            await table.waitFor({ state: 'visible' });
            assert.equal(await table.locator('tbody tr').count(), 30);
            assert.match(await page.locator('.pg-charts__log').innerText(), /pk-view-change #chart-revenue \{"view":"table"\}/);
            assert.equal(await revenue.locator('[part="plot"]').isVisible(), false);
            await revenue.getByRole('button', { name: 'Chart' }).click();

            // The data table stays available to screen readers in chart view.
            assert.equal(await page.locator('#chart-months').locator('table tbody tr').count(), 12);

            // Donut folds the tail into Other but the table keeps every row.
            const countries = page.locator('#chart-countries');
            const items = countries.locator('.side-legend .legend-item');
            assert.equal(await items.count(), 6);
            assert.match(await items.last().innerText(), /Other/);
            assert.equal(await countries.locator('table tbody tr').count(), 9);
            const total = await countries.locator('.total').innerText();
            await items.first().click();
            assert.notEqual(await countries.locator('.total').innerText(), total, 'centre total follows legend toggles');

            // Funnel stage strip shows conversion from the previous step.
            assert.match(await page.locator('#chart-funnel .stages').innerText(), /82%[\s\S]*of previous step/);

            // Clicking a bar emits pk-point-select with the raw value.
            const forms = page.locator('#chart-forms [part="plot"]');
            await forms.scrollIntoViewIfNeeded();
            const box = await forms.boundingBox();
            await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.08);
            // Chart.js handles pointer events on the next animation frame.
            await page.waitForFunction(() => document.querySelector('.pg-charts__log')?.textContent?.includes('pk-point-select'));
            assert.match(await page.locator('.pg-charts__log').innerText(), /pk-point-select #chart-forms .*"value":1284/);

            // With several series, a click reports the bar under the pointer, not the first series.
            const emails = page.locator('#chart-emails');
            await emails.scrollIntoViewIfNeeded();
            const target = await emails.evaluate((element) => {
                const bar = element.chart.getDatasetMeta(1).data[0];
                const rect = element.shadowRoot.querySelector('canvas').getBoundingClientRect();

                return { x: rect.left + bar.x, y: rect.top + (bar.y + bar.base) / 2 };
            });
            await page.mouse.click(target.x, target.y);
            await page.waitForFunction(() => document.querySelector('.pg-charts__log')?.textContent?.includes('#chart-emails'));
            assert.match(await page.locator('.pg-charts__log').innerText(), /pk-point-select #chart-emails .*"series":"returning","value":14/);

            // States: empty heading, error with a slotted retry that recovers.
            await page.locator('#chart-empty').getByText('No recovered orders yet').waitFor();
            await page.locator('#chart-error').getByText("This chart couldn't be loaded").waitFor();
            await page.locator('#chart-retry').click();
            await page.waitForFunction(() => document.getElementById('chart-error')?.chart);
            assert.equal(await page.locator('#chart-loading [part="state"]').count(), 1);

            // Meters expose state in their accessible value, not colour alone.
            const spam = page.getByRole('meter', { name: 'Job Application spam rate' });
            assert.match(await spam.getAttribute('aria-valuetext'), /18%, well outside the expected range/);
            assert.equal(await page.getByRole('meter', { name: 'Contact Us completion rate' }).getAttribute('aria-valuetext'), '82%');

            // Description, axis titles and range.
            assert.equal(await revenue.locator('[part="plot"]').getAttribute('aria-describedby'), 'description');
            assert.match(await revenue.locator('#description').textContent(), /rose 18%/);
            const months = await page.evaluate(() => {
                const scales = document.getElementById('chart-months').chart.options.scales;

                return { x: scales.x.title.text, y: scales.y.title.text, max: scales.y.max };
            });
            assert.deepEqual(months, { x: 'Month', y: 'Recovered revenue (USD)', max: 15000 });

            // Refreshed data redraws without replaying the entry animation.
            await page.evaluate(() => {
                const chart = document.getElementById('chart-months');
                chart.data = { ...chart.data, rows: chart.data.rows.map(([key, value]) => [key, value * 1.1]) };
            });
            await page.waitForFunction(() => document.getElementById('chart-months').chart?.options.animation === false);

            // Reattaching a chart (e.g. a Craft slide-out moving its DOM) redraws it.
            await page.evaluate(() => {
                const chart = document.getElementById('chart-months');
                const parent = chart.parentElement;
                chart.remove();
                parent.append(chart);
            });
            await page.waitForFunction(() => document.getElementById('chart-months')?.chart);

            // Hidden series that disappear from new data are forgotten, so nothing stays hidden.
            const submissions = page.locator('#chart-submissions');
            await submissions.getByRole('button', { name: 'Incomplete' }).click();
            await page.evaluate(() => {
                const chart = document.getElementById('chart-submissions');
                const keep = [0, 1, 3];
                chart.data = { cols: keep.map((i) => chart.data.cols[i]), rows: chart.data.rows.map((row) => keep.map((i) => row[i])) };
            });
            await page.waitForFunction(() => {
                const chart = document.getElementById('chart-submissions')?.chart;

                return chart?.data.datasets.length === 2 && chart.isDatasetVisible(0) && chart.isDatasetVisible(1);
            });
            // Re-adding the series later shows it, because its hidden state was dropped.
            await page.evaluate(() => {
                const chart = document.getElementById('chart-submissions');
                chart.data = { ...chart.data, cols: [...chart.data.cols, { id: 'incomplete', label: 'Incomplete', type: 'number' }], rows: chart.data.rows.map((row) => [...row, 3]) };
            });
            await page.waitForFunction(() => {
                const chart = document.getElementById('chart-submissions')?.chart;

                return chart?.data.datasets.length === 3 && chart.isDatasetVisible(2);
            });

            // 100% stacks renormalise when a series is hidden.
            await page.locator('#chart-share').getByRole('button', { name: 'Mobile' }).click();
            await page.waitForFunction(() => {
                const chart = document.getElementById('chart-share')?.chart;
                const sum = chart?.data.datasets.reduce((total, dataset, index) => total + (chart.isDatasetVisible(index) ? dataset.data[0] : 0), 0);

                return Math.abs(sum - 100) < 0.01;
            });

            // Locale switch reformats tables and flips direction.
            await page.selectOption('[data-locale]', 'de-DE');
            await page.waitForFunction(() => /\d,\d{2}/.test(document.querySelector('#chart-revenue')?.shadowRoot?.querySelector('tbody td')?.textContent ?? ''));
            await page.selectOption('[data-locale]', 'ar-EG');
            await page.waitForFunction(() => document.querySelector('#chart-revenue')?.chart?.options.scales.x.reverse === true);

            assert.deepEqual(errors, [], `${engine.name()} page errors`);
            console.log(`charts: ${engine.name()} ok`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
