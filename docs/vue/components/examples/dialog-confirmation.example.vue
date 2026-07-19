<script setup lang="ts">
import { Button, Dialog, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Dialog disable-pointer-dismissal>
        <Button slot="trigger" variant="primary">Delete entry</Button>
        <div slot="header" class="pk-dialog__header">
            <h3 class="pk-dialog__title">Delete this entry?</h3>
            <p
                data-slot="dialog-description"
                style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;"
            >
                This action cannot be undone. The entry will be removed from the current site.
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
        <div class="pk-dialog__body">Confirmation dialog body.</div>
        <Button slot="footer" data-dialog-close>Cancel</Button>
        <Button slot="footer" variant="primary">Delete</Button>
    </Dialog>
</template>
