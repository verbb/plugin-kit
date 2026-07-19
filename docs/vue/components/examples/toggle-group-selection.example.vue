<script setup lang="ts">
import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ToggleGroup :spacing="0" :value="['left']">
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
    <ToggleGroup multiple :spacing="0" :value="['bold']">
        <Toggle data-value="bold" aria-label="Bold">
            <Icon icon="bold" />
        </Toggle>
        <Toggle data-value="italic" aria-label="Italic">
            <Icon icon="italic" />
        </Toggle>
        <Toggle data-value="underline" aria-label="Underline">
            <Icon icon="underline" />
        </Toggle>
    </ToggleGroup>
</template>
