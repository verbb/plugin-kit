import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';
import { formatChange, formatValue } from '@verbb/plugin-kit-core/utils/format';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { toLiteral } from './chart-preview';
import { activityDates, recoveredRevenue } from './chart.fixtures';

const trend = recoveredRevenue.rows.map((row) => row[1] as number);

const css = `
.revenue-tile { display: grid; gap: 4px; max-width: 320px; color: var(--pk-chart-text); }
.revenue-tile__label { color: var(--pk-chart-text-secondary); font-size: 12px; font-weight: 600; }
.revenue-tile__row { display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline; }
.revenue-tile__value { font-size: 28px; font-weight: 600; }
.revenue-tile__change { padding: 1px 7px; border-radius: 999px; font-size: 12px; font-weight: 600; background: var(--pk-chart-toggle-background); color: var(--pk-chart-text-secondary); }
.revenue-tile__change[data-tone="good"] { background: var(--pk-chart-positive-background); color: var(--pk-chart-positive); }
.revenue-tile__change[data-tone="bad"] { background: var(--pk-chart-negative-background); color: var(--pk-chart-negative); }
.revenue-tile__comparison { color: var(--pk-chart-text-muted); font-size: 12px; }
.revenue-tile pk-sparkline { margin-top: 8px; --pk-sparkline-height: 36px; }
`.trim();

const markup = `
<div class="revenue-tile">
  <div class="revenue-tile__label">Recovered revenue</div>
  <div class="revenue-tile__row">
    <span class="revenue-tile__value"></span>
    <span class="revenue-tile__change"><span aria-hidden="true"></span> <span></span></span>
    <span class="revenue-tile__comparison">vs previous 14 days</span>
  </div>
  <pk-sparkline label="Recovered revenue, last 14 days" format="money" currency="USD"></pk-sparkline>
</div>
`.trim();

const current = 9788;
const previous = 8300.9;
const spec = { type: 'money', currency: 'USD', decimals: 0 } as const;

const script = `
import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';
import { formatChange, formatValue } from '@verbb/plugin-kit-core/utils/format';

const tile = document.querySelector('.revenue-tile');
const spec = { type: 'money', currency: 'USD', decimals: 0 };
const current = ${current};
const previous = ${previous};

tile.querySelector('.revenue-tile__value').textContent = formatValue(current, spec);

// formatChange returns null when there is nothing to compare, so hide the pill then.
const change = formatChange(current, previous, spec);
const pill = tile.querySelector('.revenue-tile__change');

if (change) {
  const [arrow, text] = pill.children;
  arrow.textContent = change.direction > 0 ? '▲' : change.direction < 0 ? '▼' : '';
  text.textContent = change.text;
  pill.dataset.tone = change.tone;
} else {
  pill.hidden = true;
}

const sparkline = tile.querySelector('pk-sparkline');
sparkline.values = ${toLiteral(trend)};
sparkline.dates = ${toLiteral(activityDates)};
`.trim();

function mount(root: HTMLElement): void {
    const tile = root.querySelector<HTMLElement>('.revenue-tile')!;
    tile.querySelector('.revenue-tile__value')!.textContent = formatValue(current, spec);
    const change = formatChange(current, previous, spec);
    const pill = tile.querySelector<HTMLElement>('.revenue-tile__change')!;

    if (change) {
        const [arrow, text] = pill.children;
        arrow.textContent = change.direction > 0 ? '▲' : change.direction < 0 ? '▼' : '';
        text.textContent = change.text;
        pill.dataset.tone = change.tone;
    } else {
        pill.hidden = true;
    }

    Object.assign(tile.querySelector('pk-sparkline')!, { values: trend, dates: activityDates });
}

export default defineWebPreview({
    label: 'Stat Tile',
    title: 'A stat tile built by a plugin',
    layout: 'plain',
    code: `${markup}\n\n<style>\n${css}\n</style>\n\n<script type="module">\n${script.split('\n').map((line) => (line ? `  ${line}` : line)).join('\n')}\n</script>`,
    html: `<style>${css}</style>${markup}`,
    enhance: mount,
});
