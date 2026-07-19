<script setup lang="ts">
import { Button, ButtonGroup, DropdownItem, DropdownMenu } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup>
        <Button variant="primary">Actions</Button>
        <DropdownMenu>
            <Button slot="trigger" variant="primary" group-trigger aria-label="More actions" />
            <DropdownItem value="duplicate">Duplicate</DropdownItem>
            <DropdownItem value="delete" destructive>Delete</DropdownItem>
        </DropdownMenu>
    </ButtonGroup>
</template>
