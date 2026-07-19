<script setup lang="ts">
import { CodeEditor } from '@verbb/plugin-kit-vue/components';

const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Submission received</title>
</head>
<body>
  <p>Hi {{ user.name }},</p>
  <p>
    Your submission for <strong>{{ form.title }}</strong> was received.
  </p>
  <ul>
    <li>Reference: {{ submission.id }}</li>
    <li>Submitted: {{ submission.date }}</li>
  </ul>
  <p>Thanks,<br />{{ siteName }}</p>
</body>
</html>`;
</script>

<template>
    <CodeEditor :value="emailTemplate" language="html" :rows="14" />
</template>
