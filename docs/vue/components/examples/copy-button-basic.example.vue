<script setup lang="ts">
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <Input value="https://verbb.io" readonly style="width: 16rem;" />
        <CopyButton value="https://verbb.io">
            <Icon slot="icon" icon="clipboard" aria-hidden="true" />
        </CopyButton>
    </div>
</template>
