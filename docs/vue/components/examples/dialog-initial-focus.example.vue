<script setup lang="ts">
import { Button, Dialog, Field, Icon, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Dialog>
        <Button slot="trigger">Edit field</Button>
        <div slot="header" class="pk-dialog__header">
            <h3 class="pk-dialog__title">Edit Field</h3>
            <Button
                variant="none"
                aria-label="Close"
                class="pk-dialog__close"
                data-dialog-close
            >
                <Icon slot="start" icon="xmark" />
            </Button>
        </div>
        <div class="pk-dialog__body" style="display: flex; flex-direction: column; gap: 1rem;">
            <Field
                label="Label"
                instructions="The label that describes this field."
                required
                translatable
            >
                <Input value="Test" auto-focus />
            </Field>
            <Field
                label="Placeholder"
                instructions="The text that will be shown if the field doesn’t have a value."
            >
                <Input placeholder="Placeholder text" />
            </Field>
        </div>
        <Button slot="footer" data-dialog-close>Cancel</Button>
        <Button slot="footer" variant="primary">Save</Button>
    </Dialog>
</template>
