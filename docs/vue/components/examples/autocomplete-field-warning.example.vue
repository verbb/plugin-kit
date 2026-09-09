<script setup lang="ts">
import { ref } from 'vue';
import { Autocomplete, Field, Option } from '@verbb/plugin-kit-vue/components';

const value = ref('@webroot/cpnav-icons-new/');
</script>

<template>
    <Field
        label="Icons Path"
        instructions="Folder of SVG files available as custom nav icons. Supports Craft aliases like `@webroot`."
        warning="This path does not exist yet — save the setting, then create the folder."
    >
        <Autocomplete
            width="full"
            :value="value"
            @pk-change="(event: CustomEvent<{ value: string }>) => { value = event.detail.value; }"
        >
            <Option value="@webroot/">@webroot/</Option>
            <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
            <Option value="@webroot/cpnav-icons-new/">@webroot/cpnav-icons-new/</Option>
            <Option value="@storage/icons/">@storage/icons/</Option>
        </Autocomplete>
    </Field>
</template>
