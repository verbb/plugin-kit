<script setup lang="ts">
import { Button, Dialog, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Dialog>
        <Button slot="trigger">Open long dialog</Button>
        <div slot="header" class="pk-dialog__header">
            <h3 class="pk-dialog__title">Review settings</h3>
            <p
                data-slot="dialog-description"
                style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;"
            >
                Long content constrained inside the body.
            </p>
            <Button
                variant="none"
                class="pk-dialog__close"
                aria-label="Close"
                data-dialog-close
            >
                <Icon slot="start" icon="xmark" />
            </Button>
        </div>
        <div class="pk-dialog__body">
            <p
                v-for="index in 10"
                :key="index"
                style="margin: 0 0 12px;"
            >
                Setting group {{ index }}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.
            </p>
        </div>
        <Button slot="footer" data-dialog-close>Cancel</Button>
        <Button slot="footer" variant="primary">Save settings</Button>
    </Dialog>
</template>
