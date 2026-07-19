<script setup lang="ts">
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';

const overflowTabs = [
    { value: 'general', label: 'General', content: 'General content', disabled: false },
    { value: 'content', label: 'Content', content: 'Content settings', disabled: false },
    { value: 'notifications', label: 'Notifications', content: 'Notification settings', disabled: false },
    { value: 'integrations', label: 'Integrations', content: 'Integration settings', disabled: false },
    { value: 'advanced', label: 'Advanced', content: 'Advanced settings', disabled: true },
];

const demos = [
    {
        label: 'Default',
        variant: undefined as undefined | 'pane' | 'modal',
        boxStyle: { maxWidth: '28rem' },
    },
    {
        label: 'Pane',
        variant: 'pane' as const,
        boxStyle: { maxWidth: '28rem', height: 220 },
    },
    {
        label: 'Modal',
        variant: 'modal' as const,
        boxStyle: {
            maxWidth: '28rem',
            height: 220,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
        },
    },
];
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 520px;">
        <div
            v-for="demo in demos"
            :key="demo.label"
            style="display: grid; grid-template-columns: 5rem minmax(0,1fr); gap: 1rem; align-items: start;"
        >
            <div style="padding-top: 0.625rem; font-size: 12px; font-weight: 600; color: #64748b;">
                {{ demo.label }}
            </div>
            <div :style="demo.boxStyle">
                <Tabs value="general" v-bind="demo.variant ? { variant: demo.variant } : {}">
                    <Tab
                        v-for="tab in overflowTabs"
                        :key="tab.value"
                        slot="nav"
                        :value="tab.value"
                        :disabled="tab.disabled"
                    >
                        {{ tab.label }}
                    </Tab>
                    <TabPanel
                        v-for="tab in overflowTabs"
                        :key="`panel-${tab.value}`"
                        :value="tab.value"
                    >
                        {{ tab.content }}
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    </div>
</template>
