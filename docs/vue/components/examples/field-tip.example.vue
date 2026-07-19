<script setup lang="ts">
import { Field, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Field
        label="System Name"
        instructions="How you'll refer to this field in your templates."
        required
        tip="This can begin with an environment variable."
    >
        <Input placeholder="my-handle" value="testing" mono />
    </Field>
</template>
