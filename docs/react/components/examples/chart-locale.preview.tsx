// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { revenueByMonthArabic, revenueByMonthGerman } from '../../../web/components/examples/chart.fixtures';

export function ChartLocaleExample() {
    return (
        <div style={{ display: 'grid', gap: 24 }}>
            <BarChart
                locale="de-DE"
                label="Wiederhergestellter Umsatz nach Monat"
                tableToggle
                chartLabel="Diagramm"
                tableLabel="Tabelle"
                viewLabel="Anzeigen als"
                data={revenueByMonthGerman}
                style={{ '--pk-chart-height': '180px' } as CSSProperties}
            />

            <div dir="rtl" lang="ar">
                <BarChart
                    locale="ar-EG"
                    label="الإيرادات المستردة حسب الشهر"
                    tableToggle
                    chartLabel="مخطط"
                    tableLabel="جدول"
                    viewLabel="العرض"
                    data={revenueByMonthArabic}
                    style={{ '--pk-chart-height': '180px' } as CSSProperties}
                />
            </div>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Locale and RTL',
    title: 'German and Arabic charts',
    language: 'tsx',
    source: true,
    render: () => <ChartLocaleExample />,
};

export default preview;
