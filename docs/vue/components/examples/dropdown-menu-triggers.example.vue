<script setup lang="ts">
import { Button, DropdownItem, DropdownMenu, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DropdownMenu>
        <Button slot="trigger" with-caret>Open menu</Button>
        <DropdownItem value="profile">Profile</DropdownItem>
        <DropdownItem value="settings">Settings</DropdownItem>
    </DropdownMenu>
    <DropdownMenu>
        <Button slot="trigger" aria-label="Open menu">
            <Icon slot="start" icon="ellipsis" />
        </Button>
        <DropdownItem value="edit">Edit</DropdownItem>
        <DropdownItem value="duplicate">Duplicate</DropdownItem>
    </DropdownMenu>
</template>
