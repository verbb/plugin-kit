<script setup lang="ts">
import { computed } from 'vue';
import { formatChange, formatValue } from '@verbb/plugin-kit-core/utils/format';
import { Sparkline } from '@verbb/plugin-kit-vue/components';
import { activityDates, recoveredRevenue } from '../../../web/components/examples/chart.fixtures';

// The plugin's own tile: formatting from Plugin Kit core, layout and styles from the plugin.
const spec = { type: 'money', currency: 'USD', decimals: 0 } as const;
const current = 9788;
const previous = 8300.9;
const trend = recoveredRevenue.rows.map((row) => row[1] as number);

const value = formatValue(current, spec);
const change = computed(() => formatChange(current, previous, spec));
const arrow = computed(() => (change.value?.direction ?? 0) > 0 ? '▲' : (change.value?.direction ?? 0) < 0 ? '▼' : '');

const toneStyles: Record<string, Record<string, string>> = {
    good: { background: 'var(--pk-chart-positive-background)', color: 'var(--pk-chart-positive)' },
    bad: { background: 'var(--pk-chart-negative-background)', color: 'var(--pk-chart-negative)' },
    neutral: { background: 'var(--pk-chart-toggle-background)', color: 'var(--pk-chart-text-secondary)' },
};
</script>

<template>
    <div style="display: grid; gap: 4px; max-width: 320px; color: var(--pk-chart-text)">
        <div style="color: var(--pk-chart-text-secondary); font-size: 12px; font-weight: 600">Recovered revenue</div>
        <div style="display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline">
            <span style="font-size: 28px; font-weight: 600">{{ value }}</span>
            <span
                v-if="change"
                :style="{ padding: '1px 7px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, ...toneStyles[change.tone] }"
            >
                <span aria-hidden="true">{{ arrow }}</span> {{ change.text }}
            </span>
            <span style="color: var(--pk-chart-text-muted); font-size: 12px">vs previous 14 days</span>
        </div>
        <Sparkline
            label="Recovered revenue, last 14 days"
            format="money"
            currency="USD"
            :values="trend"
            :dates="activityDates"
            style="margin-top: 8px; --pk-sparkline-height: 36px"
        />
    </div>
</template>
