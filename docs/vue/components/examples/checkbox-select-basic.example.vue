<script setup lang="ts">
import { CheckboxSelect } from '@verbb/plugin-kit-vue/components';

const options = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];
</script>

<template>
    <CheckboxSelect :options="options" :value="['contact']" />
</template>
