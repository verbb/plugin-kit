<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@verbb/plugin-kit-vue/components';

const maxLength = 120;
const value = ref('Short helper text for a settings screen.');

function onInput(event: Event) {
    value.value = (event.target as HTMLTextAreaElement).value;
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 4px; max-width: 24rem;">
        <Textarea
            :value="value"
            :max-length="maxLength"
            @input="onInput"
        />
        <div style="text-align: right; font-size: 12px; color: #6b7280;">
            {{ value.length }}/{{ maxLength }}
        </div>
    </div>
</template>
