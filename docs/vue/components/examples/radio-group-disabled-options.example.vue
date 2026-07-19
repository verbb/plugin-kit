<script setup lang="ts">
import { Radio, RadioGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <RadioGroup name="plan" value="starter">
        <Radio value="starter">Starter</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="enterprise" disabled>Enterprise</Radio>
    </RadioGroup>
</template>
