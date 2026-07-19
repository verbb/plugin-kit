import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type AsyncOption = { value: string; label: string };

type PkComboboxEl = HTMLElement & {
    fetchOptions: ((query: string, signal: AbortSignal) => Promise<AsyncOption[]>) | null;
};

const fruits: AsyncOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'banana', label: 'Banana' },
    { value: 'blackberry', label: 'Blackberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
];

const markup = `
<pk-combobox
  async
  clearable
  placeholder="Search fruits…"
  start-typing-message="Start typing to search fruits…"
  value="apple"
></pk-combobox>
`.trim();

/**
 * Mirror React `ComboboxInput` + `fetchOptions`: async mode with no static options.
 * Without a matching `pk-option`, the control displays the raw value (`apple`).
 */
function enhanceAsyncSearch(root: HTMLElement): void {
    const combobox = root.querySelector('pk-combobox') as PkComboboxEl | null;
    if (!combobox) {
        return;
    }

    combobox.fetchOptions = async (query: string) => {
        await new Promise((resolve) => {
            window.setTimeout(resolve, 400);
        });

        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return fruits.filter((fruit) => fruit.label.toLowerCase().includes(normalized));
    };
}

export default defineWebPreview({
    label: 'Async Search',
    title: 'Async search example',
    layout: 'stack',
    code: markup,
    html: markup,
    enhance: enhanceAsyncSearch,
});
