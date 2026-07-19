<script setup lang="ts">
import { Button, ButtonGroup, Icon } from '@verbb/plugin-kit-vue/components';

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
            <div :style="captionStyle">
                Use — disclosure end-cap with <code>groupTrigger</code> (Craft <code>.menubtn</code>)
            </div>
            <ButtonGroup>
                <Button variant="primary">
                    <Icon slot="start" icon="pen-to-square" />
                    Edit
                </Button>
                <Button variant="primary">
                    <Icon slot="start" icon="eye" />
                    Preview
                </Button>
                <Button variant="primary" group-trigger aria-label="More actions" />
            </ButtonGroup>
        </div>
        <div>
            <div :style="captionStyle">
                Avoid — chevron slotted as an icon keeps a full square hit target
            </div>
            <ButtonGroup>
                <Button variant="primary">
                    <Icon slot="start" icon="pen-to-square" />
                    Edit
                </Button>
                <Button variant="primary">
                    <Icon slot="start" icon="eye" />
                    Preview
                </Button>
                <Button variant="primary" aria-label="More actions">
                    <Icon slot="start" icon="chevron-down" />
                </Button>
            </ButtonGroup>
        </div>
        <div>
            <div :style="captionStyle">
                Different pattern — icon-only actions stay square (no <code>groupTrigger</code>)
            </div>
            <ButtonGroup>
                <Button variant="primary" aria-label="Edit">
                    <Icon slot="start" icon="pen-to-square" />
                </Button>
                <Button variant="primary" aria-label="Preview">
                    <Icon slot="start" icon="eye" />
                </Button>
                <Button variant="primary" aria-label="Export">
                    <Icon slot="start" icon="download" />
                </Button>
            </ButtonGroup>
        </div>
    </div>
</template>
