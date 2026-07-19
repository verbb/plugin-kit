<script setup lang="ts">
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tabs variant="modal" value="details">
        <Tab slot="nav" value="details">Details</Tab>
        <Tab slot="nav" value="layout">Layout</Tab>
        <TabPanel value="details">Modal tab details content</TabPanel>
        <TabPanel value="layout">Modal tab layout content</TabPanel>
    </Tabs>
</template>
