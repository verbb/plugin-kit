<script setup lang="ts">
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ToggleGroup :spacing="0">
        <Toggle data-value="left" aria-label="Align left">
            <Icon icon="align-left" />
        </Toggle>
        <Toggle data-value="center" aria-label="Align center">
            <Icon icon="align-center" />
        </Toggle>
        <Toggle data-value="right" aria-label="Align right">
            <Icon icon="align-right" />
        </Toggle>
    </ToggleGroup>
    <ToggleGroup orientation="vertical" :spacing="0">
        <Toggle data-value="left" aria-label="Align left">
            <Icon icon="align-left" />
        </Toggle>
        <Toggle data-value="center" aria-label="Align center">
            <Icon icon="align-center" />
        </Toggle>
        <Toggle data-value="right" aria-label="Align right">
            <Icon icon="align-right" />
        </Toggle>
    </ToggleGroup>
</template>
