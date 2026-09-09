import '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type AsyncOption = { value: string; label: string };

type PkAutocompleteEl = HTMLElement & {
    fetchOptions: ((query: string, signal: AbortSignal) => Promise<AsyncOption[]>) | null;
};

const paths: AsyncOption[] = [
    { value: '@webroot/', label: '@webroot/' },
    { value: '@webroot/assets/', label: '@webroot/assets/' },
    { value: '@webroot/cpnav-icons/', label: '@webroot/cpnav-icons/' },
    { value: '@webroot/uploads/', label: '@webroot/uploads/' },
    { value: '@storage/', label: '@storage/' },
    { value: '@storage/runtime/', label: '@storage/runtime/' },
    { value: '@templates/', label: '@templates/' },
    { value: '@config/', label: '@config/' },
    { value: '$PRIMARY_SITE_URL', label: '$PRIMARY_SITE_URL' },
    { value: '$CRAFT_WEB_ROOT', label: '$CRAFT_WEB_ROOT' },
];

const markup = `
<pk-autocomplete
  async
  clearable
  width="full"
  placeholder="Search aliases and paths…"
  start-typing-message="Start typing to search paths…"
  value="@webroot/"
></pk-autocomplete>
`.trim();

function enhanceAsync(root: HTMLElement): void {
    const field = root.querySelector('pk-autocomplete') as PkAutocompleteEl | null;
    if (!field) {
        return;
    }

    field.fetchOptions = async (query: string) => {
        await new Promise((resolve) => {
            window.setTimeout(resolve, 280);
        });

        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return paths.filter((item) => item.label.toLowerCase().includes(normalized));
    };
}

export default defineWebPreview({
    label: 'Async',
    title: 'Async path suggestions',
    layout: 'stack',
    code: markup,
    html: markup,
    enhance: enhanceAsync,
});
