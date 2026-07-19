<script setup lang="ts">
import { Field, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Field
        label="Entry title"
        instructions="Shown on the public entry page."
        required
        warning="This title is similar to an existing entry."
        :errors="['Title is required.']"
    >
        <Input placeholder="My entry" invalid />
    </Field>
</template>
