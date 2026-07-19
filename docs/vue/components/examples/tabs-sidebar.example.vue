<script setup lang="ts">
import { Icon, Status, Tab, TabHeading, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tabs
        variant="sidebar"
        value="hubspot"
        aria-label="Sidebar"
        style="min-height: 16rem;"
    >
        <TabHeading slot="nav">CRM</TabHeading>
        <Tab slot="nav" value="hubspot">
            <Icon slot="icon" icon="gear" aria-hidden="true" />
            HubSpot
            <Status slot="status" status="inactive" aria-hidden="true" />
        </Tab>
        <TabHeading slot="nav">Email marketing</TabHeading>
        <Tab slot="nav" value="mailchimp">
            <Icon slot="icon" icon="share" aria-hidden="true" />
            Mailchimp
            <Status slot="status" status="inactive" aria-hidden="true" />
        </Tab>
        <TabHeading slot="nav">Elements</TabHeading>
        <Tab slot="nav" value="entries">
            <Icon slot="icon" icon="list" aria-hidden="true" />
            Entries
            <Status slot="status" status="inactive" aria-hidden="true" />
        </Tab>
        <Tab slot="nav" value="users">
            <Icon slot="icon" icon="house" aria-hidden="true" />
            Users
            <Status slot="status" status="inactive" aria-hidden="true" />
        </Tab>
        <TabPanel value="hubspot">HubSpot integration settings</TabPanel>
        <TabPanel value="mailchimp">Mailchimp integration settings</TabPanel>
        <TabPanel value="entries">Entries settings</TabPanel>
        <TabPanel value="users">Users settings</TabPanel>
    </Tabs>
</template>
