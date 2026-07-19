<script setup lang="ts">
import { Radio, RadioGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <RadioGroup name="frequency" value="daily">
        <Radio value="daily">Daily</Radio>
        <Radio value="weekly">Weekly</Radio>
        <Radio value="monthly">Monthly</Radio>
    </RadioGroup>
</template>
