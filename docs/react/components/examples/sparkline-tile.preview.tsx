// #region example
import type { CSSProperties } from 'react';
import { formatChange, formatValue } from '@verbb/plugin-kit-core/utils/format';
import { Sparkline } from '@verbb/plugin-kit-react/components';
import { activityDates, recoveredRevenue } from '../../../web/components/examples/chart.fixtures';

const spec = { type: 'money', currency: 'USD', decimals: 0 } as const;

const toneStyles: Record<string, CSSProperties> = {
    good: { background: 'var(--pk-chart-positive-background)', color: 'var(--pk-chart-positive)' },
    bad: { background: 'var(--pk-chart-negative-background)', color: 'var(--pk-chart-negative)' },
    neutral: { background: 'var(--pk-chart-toggle-background)', color: 'var(--pk-chart-text-secondary)' },
};

type RevenueTileProps = { current: number; previous: number; trend: number[]; dates: string[] };

/** The plugin's own tile: formatting from Plugin Kit core, layout and styles from the plugin. */
function RevenueTile({ current, previous, trend, dates }: RevenueTileProps) {
    const change = formatChange(current, previous, spec);

    return (
        <div style={{ display: 'grid', gap: 4, maxWidth: 320, color: 'var(--pk-chart-text)' }}>
            <div style={{ color: 'var(--pk-chart-text-secondary)', fontSize: 12, fontWeight: 600 }}>Recovered revenue</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', alignItems: 'baseline' }}>
                <span style={{ fontSize: 28, fontWeight: 600 }}>{formatValue(current, spec)}</span>
                {change && (
                    <span style={{ padding: '1px 7px', borderRadius: 999, fontSize: 12, fontWeight: 600, ...toneStyles[change.tone] }}>
                        <span aria-hidden="true">{change.direction > 0 ? '▲' : change.direction < 0 ? '▼' : ''}</span> {change.text}
                    </span>
                )}
                <span style={{ color: 'var(--pk-chart-text-muted)', fontSize: 12 }}>vs previous 14 days</span>
            </div>
            <Sparkline
                label="Recovered revenue, last 14 days"
                format="money"
                currency="USD"
                values={trend}
                dates={dates}
                style={{ marginTop: 8, '--pk-sparkline-height': '36px' } as CSSProperties}
            />
        </div>
    );
}

export function SparklineTileExample() {
    return (
        <RevenueTile
            current={9788}
            previous={8300.9}
            trend={recoveredRevenue.rows.map((row) => row[1] as number)}
            dates={activityDates}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Stat Tile',
    title: 'A stat tile built by a plugin',
    language: 'tsx',
    source: true,
    render: () => <SparklineTileExample />,
};

export default preview;
