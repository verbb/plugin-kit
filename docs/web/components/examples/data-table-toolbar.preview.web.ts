import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountToolbarExample, toolbarHtml } from './data-table-toolbar.example';
import exampleSource from './data-table-toolbar.example.ts?raw';

export default defineWebPreview({
    label: 'Toolbar Controls',
    title: 'A status selector, table density controls and a new-member action.',
    layout: 'plain',
    language: 'ts',
    code: exampleSource,
    html: toolbarHtml,
    enhance: mountToolbarExample,
});
