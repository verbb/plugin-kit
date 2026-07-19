<script setup lang="ts">
import { Button, DropdownItem, DropdownMenu } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DropdownMenu>
        <Button slot="trigger" with-caret>Open menu</Button>
        <DropdownItem value="new">New File</DropdownItem>
        <DropdownItem value="share">
            Share
            <DropdownMenu slot="submenu">
                <DropdownItem value="email">Email</DropdownItem>
                <DropdownItem value="link">Copy link</DropdownItem>
            </DropdownMenu>
        </DropdownItem>
    </DropdownMenu>
</template>
