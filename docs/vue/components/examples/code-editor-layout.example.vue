<script setup lang="ts">
import { CodeEditor } from '@verbb/plugin-kit-vue/components';

const sampleMarkup = `<section>
  <h2>Order summary</h2>
  <p>Status: {{ order.status }}</p>
  <ul>
    <li>{{ line.one }}</li>
    <li>{{ line.two }}</li>
  </ul>
</section>`;

const tabIndentedMarkup = `<section>
	<h2>Order summary</h2>
	<p>Status: {{ order.status }}</p>
	<ul>
		<li>{{ line.one }}</li>
		<li>{{ line.two }}</li>
	</ul>
</section>`;

const stackStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
} as const;

const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
} as const;

const labelStyle = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#334155',
    margin: 0,
} as const;
</script>

<template>
    <div :style="stackStyle">
        <div :style="groupStyle">
            <p :style="labelStyle">rows=4</p>
            <CodeEditor :value="sampleMarkup" :rows="4" />
        </div>
        <div :style="groupStyle">
            <p :style="labelStyle">rows=16</p>
            <CodeEditor :value="sampleMarkup" :rows="16" />
        </div>
        <div :style="groupStyle">
            <p :style="labelStyle">tabSize=2 (tab-indented sample)</p>
            <CodeEditor :value="tabIndentedMarkup" :rows="8" :tab-size="2" />
        </div>
        <div :style="groupStyle">
            <p :style="labelStyle">tabSize=8 (tab-indented sample)</p>
            <CodeEditor :value="tabIndentedMarkup" :rows="8" :tab-size="8" />
        </div>
        <div :style="groupStyle">
            <p :style="labelStyle">lineNumbers=false</p>
            <CodeEditor :value="sampleMarkup" :rows="8" :line-numbers="false" />
        </div>
    </div>
</template>
