<script setup lang="ts">
import { CodeEditor } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <CodeEditor value="<p>Invalid markup</p>" invalid :rows="4" />
        <CodeEditor value="<p>Read-only content</p>" readonly :rows="4" />
    </div>
</template>
