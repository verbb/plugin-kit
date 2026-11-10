<script setup lang="ts">
import { Meter } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: grid; gap: 12px; max-width: 420px">
        <Meter label="Contact Us completion rate" :value="0.82" format="percent" show-value />
        <Meter label="Monthly email quota used" :value="8420" :max="10000" show-value />
        <Meter label="Asset volume usage" :value="0.37" format="percent" />
    </div>
</template>
