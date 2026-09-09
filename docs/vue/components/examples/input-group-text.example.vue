<script setup lang="ts">
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="max-width: 420px">
        <InputGroup>
            <InputGroupInput placeholder="0.00" />
            <InputGroupAddon align="inline-start">
                <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>
