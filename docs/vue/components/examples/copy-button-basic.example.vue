<script setup lang="ts">
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Input value="https://verbb.io" readonly style="width: 16rem;">
        <CopyButton slot="end" value="https://verbb.io">
            <Icon slot="icon" icon="clipboard" aria-hidden="true" />
        </CopyButton>
    </Input>
</template>
