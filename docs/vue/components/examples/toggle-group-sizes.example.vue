<script setup lang="ts">
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ToggleGroup size="sm" :spacing="0">
        <Toggle data-value="left" aria-label="Align left">
            <Icon icon="align-left" />
        </Toggle>
        <Toggle data-value="center" aria-label="Align center">
            <Icon icon="align-center" />
        </Toggle>
    </ToggleGroup>
    <ToggleGroup :spacing="0">
        <Toggle data-value="left" aria-label="Align left">
            <Icon icon="align-left" />
        </Toggle>
        <Toggle data-value="center" aria-label="Align center">
            <Icon icon="align-center" />
        </Toggle>
    </ToggleGroup>
    <ToggleGroup size="lg" :spacing="0">
        <Toggle data-value="left" aria-label="Align left">
            <Icon icon="align-left" />
        </Toggle>
        <Toggle data-value="center" aria-label="Align center">
            <Icon icon="align-center" />
        </Toggle>
    </ToggleGroup>
</template>
