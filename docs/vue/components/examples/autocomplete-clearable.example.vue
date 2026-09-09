<script setup lang="ts">
import { Autocomplete, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Autocomplete clearable placeholder="Icons path…" style="min-width: 20rem;" value="@webroot/cpnav-icons/">
        <Option value="@webroot/">@webroot/</Option>
        <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
        <Option value="@storage/icons/">@storage/icons/</Option>
    </Autocomplete>
</template>
