<script setup lang="ts">
import { Autocomplete, Option, OptionGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Autocomplete placeholder="Path, alias, or env…" style="min-width: 20rem;">
        <OptionGroup label="Aliases">
            <Option value="@webroot/">@webroot/</Option>
            <Option value="@storage/">@storage/</Option>
        </OptionGroup>
        <OptionGroup label="Environment">
            <Option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</Option>
            <Option value="$CRAFT_WEB_ROOT">$CRAFT_WEB_ROOT</Option>
        </OptionGroup>
    </Autocomplete>
</template>
