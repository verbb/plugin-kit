<script setup lang="ts">
import { Button, DropdownItem, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DropdownMenu>
        <Button slot="trigger" with-caret>Options</Button>
        <DropdownItem value="profile">Profile</DropdownItem>
        <DropdownItem value="settings">Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="delete" destructive>Delete</DropdownItem>
    </DropdownMenu>
</template>
