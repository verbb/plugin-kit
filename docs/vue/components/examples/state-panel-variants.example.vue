<script setup lang="ts">
import { StatePanel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; width: 100%;"
    >
        <StatePanel variant="empty" heading="No results found">
            Try changing the current filters.
        </StatePanel>
        <StatePanel variant="info" heading="Preview unavailable">
            Save this item before opening its preview.
        </StatePanel>
        <StatePanel variant="success" heading="Import complete">
            All records were imported successfully.
        </StatePanel>
        <StatePanel variant="warning" heading="Some items were skipped">
            Review the import summary before continuing.
        </StatePanel>
        <StatePanel variant="error" heading="Report unavailable">
            The report could not be loaded.
        </StatePanel>
    </div>
</template>
