<script setup lang="ts">
import { StatusLabel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; gap: 12px">
        <StatusLabel status="active">Active</StatusLabel>
        <StatusLabel status="active">Approved</StatusLabel>
        <StatusLabel status="pending">Awaiting review</StatusLabel>
        <StatusLabel status="inactive">Inactive</StatusLabel>
        <StatusLabel status="disabled">Disabled</StatusLabel>
        <StatusLabel status="red">Unpaid</StatusLabel>
        <StatusLabel status="blue">Packed</StatusLabel>
        <StatusLabel status="purple">Refunded</StatusLabel>
    </div>
</template>
