<script setup lang="ts">
import { Radio, RadioGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <RadioGroup name="visibility" value="team">
        <Radio value="team">
            <span>
                <span style="font-weight: 500;">Team</span>
                <span style="display: block; color: #64748b;">Visible to the whole team.</span>
            </span>
        </Radio>
        <Radio value="private">
            <span>
                <span style="font-weight: 500;">Private</span>
                <span style="display: block; color: #64748b;">Only visible to you.</span>
            </span>
        </Radio>
    </RadioGroup>
</template>
