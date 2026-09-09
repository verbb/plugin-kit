<script setup lang="ts">
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="max-width: 420px">
        <InputGroup>
            <InputGroupInput placeholder="example.com/contact" />
            <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupButton>Search</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>
