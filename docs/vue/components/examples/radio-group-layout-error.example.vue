<script setup lang="ts">
import { Radio, RadioGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <RadioGroup name="layout" value="daily" orientation="horizontal">
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
        </RadioGroup>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <RadioGroup name="channel" value="email" invalid>
                <Radio value="email">Email</Radio>
                <Radio value="sms">SMS</Radio>
            </RadioGroup>
            <p style="margin: 0; font-size: 0.875rem; color: #e11d48;">
                Choose an available notification channel.
            </p>
        </div>
    </div>
</template>
