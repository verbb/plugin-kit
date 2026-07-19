import '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js';
import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type ToggleGroupEl = HTMLElement & { value: string[] };

/**
 * `value` is property-only (`attribute: false`). Set after mount so selection
 * matches the React docs preview.
 */
function enhanceSelection(root: HTMLElement): () => void {
    const [single, multiple] = root.querySelectorAll('pk-toggle-group') as NodeListOf<ToggleGroupEl>;

    if (single) {
        single.value = ['left'];
    }

    if (multiple) {
        multiple.value = ['bold'];
    }

    return () => undefined;
}

export default defineWebPreview({
    label: 'Selection Modes',
    title: 'Toggle group selection mode examples',
    layout: 'stack',
    html: `
<pk-toggle-group spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group multiple spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
  <pk-toggle data-value="underline" aria-label="Underline"><pk-icon icon="underline"></pk-icon></pk-toggle>
</pk-toggle-group>
`.trim(),
    enhance: enhanceSelection,
});
