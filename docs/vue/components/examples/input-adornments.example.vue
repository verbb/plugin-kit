<script setup lang="ts">
import { Icon, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <Input placeholder="Search entries" style="max-width: 20rem;">
            <Icon slot="start" icon="search" />
        </Input>
        <InputGroup style="max-width: 20rem;">
            <InputGroupInput value="49" />
            <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>
