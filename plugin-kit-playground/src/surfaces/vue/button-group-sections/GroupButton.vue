<script setup lang="ts">
import { Button, Icon } from '@verbb/plugin-kit-vue/components';

withDefaults(
    defineProps<{
        label?: string;
        variant?: string;
        size?: string;
        icon?: string;
        ariaLabel?: string;
        withCaret?: boolean;
        groupTrigger?: boolean;
        pressed?: boolean;
    }>(),
    {
        variant: 'default',
        size: 'default',
        withCaret: false,
        groupTrigger: false,
    },
);
</script>

<template>
  <Button
    :variant="variant as never"
    :size="size === 'default' ? undefined : (size as never)"
    :aria-label="ariaLabel"
    :with-caret="withCaret || undefined"
    :group-trigger="groupTrigger || undefined"
    :aria-pressed="pressed === undefined ? undefined : pressed ? 'true' : 'false'"
  >
    <template v-if="icon" #start>
      <Icon :icon="icon" />
    </template>
    <template v-if="!groupTrigger && !(icon && !label)">{{ label }}</template>
  </Button>
</template>
