import type { Theme } from 'vitepress';
import { createVerbbDocsTheme } from '@verbb/vitepress-theme';
import ComponentPreview from './components/ComponentPreview.vue';
import './custom.css';

// Docs previews use `<pk-icon icon="…">` by name — register the full curated set once.
import '@verbb/plugin-kit-icons/all.js';

const theme: Theme = createVerbbDocsTheme({
    enhanceApp({ app }) {
        app.component('ComponentPreview', ComponentPreview);
    },
});

export default theme;
