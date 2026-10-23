<script setup lang="ts">
import { StatusLabel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div
        style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
            gap: 12px;
        "
    >
        <StatusLabel status="red">Red</StatusLabel>
        <StatusLabel status="orange">Orange</StatusLabel>
        <StatusLabel status="amber">Amber</StatusLabel>
        <StatusLabel status="yellow">Yellow</StatusLabel>
        <StatusLabel status="lime">Lime</StatusLabel>
        <StatusLabel status="green">Green</StatusLabel>
        <StatusLabel status="emerald">Emerald</StatusLabel>
        <StatusLabel status="teal">Teal</StatusLabel>
        <StatusLabel status="cyan">Cyan</StatusLabel>
        <StatusLabel status="sky">Sky</StatusLabel>
        <StatusLabel status="blue">Blue</StatusLabel>
        <StatusLabel status="indigo">Indigo</StatusLabel>
        <StatusLabel status="violet">Violet</StatusLabel>
        <StatusLabel status="purple">Purple</StatusLabel>
        <StatusLabel status="fuchsia">Fuchsia</StatusLabel>
        <StatusLabel status="pink">Pink</StatusLabel>
        <StatusLabel status="rose">Rose</StatusLabel>
        <StatusLabel status="gray">Gray</StatusLabel>
        <StatusLabel status="white">White</StatusLabel>
        <StatusLabel status="black">Black</StatusLabel>
    </div>
</template>
