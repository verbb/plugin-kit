<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { revenueByMonthArabic, revenueByMonthGerman } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <div style="display: grid; gap: 24px">
        <BarChart
            locale="de-DE"
            label="Wiederhergestellter Umsatz nach Monat"
            table-toggle
            chart-label="Diagramm"
            table-label="Tabelle"
            view-label="Anzeigen als"
            :data="revenueByMonthGerman"
            style="--pk-chart-height: 180px"
        />

        <div dir="rtl" lang="ar">
            <BarChart
                locale="ar-EG"
                label="الإيرادات المستردة حسب الشهر"
                table-toggle
                chart-label="مخطط"
                table-label="جدول"
                view-label="العرض"
                :data="revenueByMonthArabic"
                style="--pk-chart-height: 180px"
            />
        </div>
    </div>
</template>
