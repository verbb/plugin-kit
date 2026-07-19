<script setup lang="ts">
import { CheckboxSelect, Field } from '@verbb/plugin-kit-vue/components';

const options = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];
</script>

<template>
    <Field
        label="Forms to monitor"
        instructions="Choose which forms should trigger notifications."
    >
        <CheckboxSelect :options="options" :value="['contact', 'newsletter']" />
    </Field>
</template>
