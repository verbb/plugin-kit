<script setup lang="ts">
import { Field, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Field
        label="Label"
        instructions="The label that describes this field."
        required
        translatable
    >
        <Input placeholder="Test" />
    </Field>
</template>
