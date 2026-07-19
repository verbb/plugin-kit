<script setup lang="ts">
import { Button, DropdownItem, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DropdownMenu>
        <Button slot="trigger" with-caret>View</Button>
        <DropdownItem value="cards" type="radio" radio-group="view" checked>Cards</DropdownItem>
        <DropdownItem value="table" type="radio" radio-group="view">Table</DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="compact" type="checkbox">Compact density</DropdownItem>
    </DropdownMenu>
</template>
