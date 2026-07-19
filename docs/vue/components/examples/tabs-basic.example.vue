<script setup lang="ts">
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tabs value="general">
        <Tab slot="nav" value="general">General</Tab>
        <Tab slot="nav" value="settings">Settings</Tab>
        <Tab slot="nav" value="advanced">Advanced</Tab>
        <TabPanel value="general">General content</TabPanel>
        <TabPanel value="settings">Settings content</TabPanel>
        <TabPanel value="advanced">Advanced content</TabPanel>
    </Tabs>
</template>
