<script setup lang="ts">
import { Button, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-vue/components';

const sizeMenus: Array<{ size?: 'xs' | 'sm' | 'lg'; label: string }> = [
    { size: 'xs', label: 'xs' },
    { size: 'sm', label: 'sm' },
    { label: 'default' },
    { size: 'lg', label: 'lg' },
];
</script>

<template>
    <DropdownMenu
        v-for="menu in sizeMenus"
        :key="menu.label"
        v-bind="menu.size ? { size: menu.size } : {}"
    >
        <Button
            slot="trigger"
            v-bind="menu.size ? { size: menu.size } : {}"
            with-caret
        >
            {{ menu.label }}
        </Button>
        <DropdownLabel>Actions</DropdownLabel>
        <DropdownItem value="edit">Edit</DropdownItem>
        <DropdownItem value="duplicate">Duplicate</DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="delete" destructive>Delete</DropdownItem>
    </DropdownMenu>
</template>
