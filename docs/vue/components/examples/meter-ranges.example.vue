<script setup lang="ts">
import { Meter } from '@verbb/plugin-kit-vue/components';
import { formActivity } from '../../../web/components/examples/chart.fixtures';

const cell = { padding: '8px 10px', borderBottom: '1px solid #e4ebf3', textAlign: 'start' } as const;
const wideCell = { ...cell, width: '35%' };
</script>

<template>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px">
        <thead>
            <tr>
                <th scope="col" :style="cell">Form</th>
                <th scope="col" :style="cell">Completion rate</th>
                <th scope="col" :style="cell">Spam rate</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ form, completion, spam } in formActivity" :key="form">
                <th scope="row" :style="cell">{{ form }}</th>
                <td :style="wideCell">
                    <Meter
                        :label="`${form} completion rate`"
                        :value="completion"
                        :low="0.4"
                        :high="0.6"
                        :optimum="1"
                        format="percent"
                        show-value
                    />
                </td>
                <td :style="wideCell">
                    <Meter
                        :label="`${form} spam rate`"
                        :value="spam"
                        :max="0.25"
                        :low="0.05"
                        :high="0.15"
                        :optimum="0"
                        format="percent"
                        show-value
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
