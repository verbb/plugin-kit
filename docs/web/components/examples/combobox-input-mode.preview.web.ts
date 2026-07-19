import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Next.js',
    title: 'Input mode example',
    layout: 'stack',
    html: `
<pk-combobox placeholder="Select a framework"><pk-option value="next-js">Next.js</pk-option>
<pk-option value="sveltekit">SvelteKit</pk-option>
<pk-option value="nuxt-js">Nuxt.js</pk-option>
<pk-option value="remix">Remix</pk-option>
<pk-option value="astro">Astro</pk-option></pk-combobox>
`.trim(),
});
