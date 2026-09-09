<script setup lang="ts">
import { Autocomplete, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Autocomplete placeholder="Type a path or pick an alias…" style="min-width: 20rem;" value="@webroot/">
        <Option value="@webroot/">@webroot/</Option>
        <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
        <Option value="@storage/">@storage/</Option>
        <Option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</Option>
    </Autocomplete>
</template>
