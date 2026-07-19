<script setup lang="ts">
import { Option, Select, Status } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Select placeholder="Select status" value="testing" style="min-width: 12rem;">
        <Option value="new">
            <Status slot="start" status="green" aria-label="New" />
            New
        </Option>
        <Option value="testing">
            <Status slot="start" status="blue" aria-label="Testing" />
            Testing
        </Option>
        <Option value="viewed">
            <Status slot="start" status="purple" aria-label="Viewed" />
            Viewed
        </Option>
    </Select>
</template>
