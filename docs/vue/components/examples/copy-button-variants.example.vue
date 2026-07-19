<script setup lang="ts">
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-vue/components';

const value = 'FORMIE_LICENSE_KEY';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <Input :value="value" readonly style="width: 16rem;" />
            <CopyButton :value="value">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <CopyButton :value="value">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
            <CopyButton :value="value" variant="outline">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
            <CopyButton :value="value" variant="transparent">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
            <CopyButton :value="value" variant="none">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
        </div>
    </div>
</template>
