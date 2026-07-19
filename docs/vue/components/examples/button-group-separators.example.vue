<script setup lang="ts">
import { Button, ButtonGroup } from '@verbb/plugin-kit-vue/components';

const captionStyle = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 8px',
};

const stackStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};
</script>

<template>
    <div :style="stackStyle">
        <div>
            <div :style="captionStyle">On (default) — 1px divider between controls</div>
            <ButtonGroup>
                <Button variant="primary">Save</Button>
                <Button variant="primary">Save and continue</Button>
            </ButtonGroup>
        </div>
        <div>
            <div :style="captionStyle">
                Off (<code>separators="false"</code>) — flush join
            </div>
            <ButtonGroup :separators="false">
                <Button variant="primary">Save</Button>
                <Button variant="primary">Save and continue</Button>
            </ButtonGroup>
        </div>
    </div>
</template>
