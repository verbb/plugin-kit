<script setup lang="ts">
import { Button, Dialog, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Dialog>
        <Button slot="trigger">Open dialog</Button>
        <div slot="header" class="pk-dialog__header">
            <h3 class="pk-dialog__title">Dialog title</h3>
            <p
                data-slot="dialog-description"
                style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;"
            >
                Short description of the dialog content.
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
        <div class="pk-dialog__body">This is the dialog body area.</div>
        <Button slot="footer" data-dialog-close>Cancel</Button>
        <Button slot="footer" variant="primary">Save</Button>
    </Dialog>
</template>
