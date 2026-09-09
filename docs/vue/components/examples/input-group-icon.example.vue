<script setup lang="ts">
import {
    Icon,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px">
        <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
                <Icon icon="magnifying-glass" aria-hidden="true" />
            </InputGroupAddon>
        </InputGroup>
        <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
                <Icon icon="magnifying-glass" aria-hidden="true" />
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>
