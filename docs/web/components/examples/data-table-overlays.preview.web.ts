import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountOverlayExample, overlayHtml } from './data-table-overlays.example';
import exampleSource from './data-table-overlays.example.ts?raw';

export default defineWebPreview({
    label: 'Dialogs and Popovers',
    title: 'Consumer-owned email preview and delivery summary',
    layout: 'plain',
    language: 'ts',
    code: exampleSource,
    html: overlayHtml,
    enhance: mountOverlayExample,
});
