<script setup lang="ts">
import { Button, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DropdownMenu>
        <Button slot="trigger" with-caret>Open menu</Button>
        <DropdownLabel>General</DropdownLabel>
        <DropdownItem value="new-file">New File</DropdownItem>
        <DropdownItem value="duplicate">Duplicate</DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Preferences</DropdownLabel>
        <DropdownItem value="line-numbers" type="checkbox" checked>Show line numbers</DropdownItem>
        <DropdownItem value="word-wrap" type="checkbox">Word wrap</DropdownItem>
    </DropdownMenu>
</template>
