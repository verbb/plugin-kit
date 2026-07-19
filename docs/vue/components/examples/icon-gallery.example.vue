<script setup lang="ts">
import { ref } from 'vue';
import { icons } from '@verbb/plugin-kit-icons';
import { Icon } from '@verbb/plugin-kit-vue/components';

const camelToKebab = (value: string): string => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/** Canonical kebab-case names from the bundled set — same source as the Web gallery. */
const galleryNames = Object.keys(icons).map(camelToKebab).sort();

const copiedName = ref<string | null>(null);

function copyIcon(name: string) {
    void navigator.clipboard?.writeText(`<Icon icon="${name}" />`);
    copiedName.value = name;
    window.setTimeout(() => {
        if (copiedName.value === name) {
            copiedName.value = null;
        }
    }, 1000);
}

function copyTitle(name: string) {
    return `Copy <Icon icon="${name}" />`;
}
</script>

<template>
    <div data-pk-icon-gallery>
        <button
            v-for="name in galleryNames"
            :key="name"
            type="button"
            :data-icon-name="name"
            :title="copyTitle(name)"
            :data-copied="copiedName === name ? '' : undefined"
            @click="copyIcon(name)"
        >
            <Icon :icon="name" :style="{ fontSize: '22px' }" aria-hidden="true" />
            <code>{{ copiedName === name ? 'Copied!' : name }}</code>
        </button>
    </div>
</template>
