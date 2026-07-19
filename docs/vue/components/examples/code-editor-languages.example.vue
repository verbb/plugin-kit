<script setup lang="ts">
import { CodeEditor } from '@verbb/plugin-kit-vue/components';

const javascriptSample = `export function buildSettings(config) {
  return {
    enabled: config.enabled ?? true,
    retries: Math.max(1, config.retries ?? 3),
    notify: config.notify ?? 'admin',
  };
}`;

const cssSample = `.notification-banner {
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(96, 125, 159, 0.35);
  border-radius: 0.375rem;
  background: #ffffff;
}`;

const jsonSample = `{
  "enabled": true,
  "settings": {
    "subject": "New submission",
    "template": "notifications/submission-received"
  }
}`;
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <CodeEditor :value="javascriptSample" language="javascript" :rows="8" />
        <CodeEditor :value="cssSample" language="css" :rows="7" />
        <CodeEditor :value="jsonSample" language="json" :rows="7" />
    </div>
</template>
