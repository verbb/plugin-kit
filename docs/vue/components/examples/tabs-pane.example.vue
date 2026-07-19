<script setup lang="ts">
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tabs variant="pane" value="tab1">
        <Tab slot="nav" value="tab1">Tab One</Tab>
        <Tab slot="nav" value="tab2">Tab Two</Tab>
        <TabPanel value="tab1">Pane tab one content</TabPanel>
        <TabPanel value="tab2">Pane tab two content</TabPanel>
    </Tabs>
</template>
