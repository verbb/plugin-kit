import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type PkComboboxEl = HTMLElement & {
    values: string[];
};

const markup = `
<pk-combobox multiple placeholder="Add frameworks…">
  <pk-option value="next-js">Next.js</pk-option>
  <pk-option value="sveltekit">SvelteKit</pk-option>
  <pk-option value="nuxt-js">Nuxt.js</pk-option>
  <pk-option value="remix">Remix</pk-option>
  <pk-option value="astro">Astro</pk-option>
</pk-combobox>
`.trim();

/**
 * `values` is a JS property (`attribute: false`) — HTML cannot seed multi-select.
 * Match React's `values={['next-js']}` by assigning after mount.
 */
function enhanceDefaultValues(root: HTMLElement): void {
    const combobox = root.querySelector('pk-combobox') as PkComboboxEl | null;
    if (!combobox) {
        return;
    }

    combobox.values = ['next-js'];
}

export default defineWebPreview({
    label: 'Multiple Selection',
    title: 'Multiple selection example',
    layout: 'stack',
    code: markup,
    html: markup,
    enhance: enhanceDefaultValues,
});
