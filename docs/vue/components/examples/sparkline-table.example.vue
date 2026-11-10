<script setup lang="ts">
import { Sparkline } from '@verbb/plugin-kit-vue/components';
import { activityDates, formActivity } from '../../../web/components/examples/chart.fixtures';

const cell = { padding: '8px 10px', borderBottom: '1px solid #e4ebf3', textAlign: 'start' } as const;
const wideCell = { ...cell, width: '40%' };
</script>

<template>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px">
        <thead>
            <tr>
                <th scope="col" :style="cell">Form</th>
                <th scope="col" :style="cell">Submissions</th>
                <th scope="col" :style="cell">Last 14 days</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ form, submissions, trend } in formActivity" :key="form">
                <th scope="row" :style="cell">{{ form }}</th>
                <td :style="cell">{{ submissions.toLocaleString('en-US') }}</td>
                <td :style="wideCell">
                    <Sparkline :label="`${form} submissions, last 14 days`" :values="trend" :dates="activityDates" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
