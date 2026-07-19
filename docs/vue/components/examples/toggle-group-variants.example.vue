<script setup lang="ts">
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ToggleGroup :spacing="0">
        <Toggle data-value="bold" aria-label="Bold">
            <Icon icon="bold" />
        </Toggle>
        <Toggle data-value="italic" aria-label="Italic">
            <Icon icon="italic" />
        </Toggle>
    </ToggleGroup>
    <ToggleGroup variant="outline" :spacing="0">
        <Toggle data-value="bold" aria-label="Bold">
            <Icon icon="bold" />
        </Toggle>
        <Toggle data-value="italic" aria-label="Italic">
            <Icon icon="italic" />
        </Toggle>
    </ToggleGroup>
</template>
