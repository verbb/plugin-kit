import { defineChartPreview } from './chart-preview';
import { revenueByMonthArabic, revenueByMonthGerman } from './chart.fixtures';

export default defineChartPreview({
    label: 'Locale and RTL',
    title: 'German and Arabic charts',
    markup: `
<pk-bar-chart
  id="chart-de"
  lang="de"
  locale="de-DE"
  label="Wiederhergestellter Umsatz nach Monat"
  table-toggle
  chart-label="Diagramm"
  table-label="Tabelle"
  view-label="Anzeigen als"
  style="--pk-chart-height: 180px"
></pk-bar-chart>

<div dir="rtl" lang="ar">
  <pk-bar-chart
    id="chart-ar"
    locale="ar-EG"
    label="الإيرادات المستردة حسب الشهر"
    table-toggle
    chart-label="مخطط"
    table-label="جدول"
    view-label="العرض"
    style="--pk-chart-height: 180px"
  ></pk-bar-chart>
</div>`,
    properties: {
        '#chart-de': { data: revenueByMonthGerman },
        '#chart-ar': { data: revenueByMonthArabic },
    },
    frame: (markup) => `<div style="display:grid;gap:24px">${markup}</div>`,
});
