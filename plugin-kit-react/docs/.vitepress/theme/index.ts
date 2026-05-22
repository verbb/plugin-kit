import type { Theme } from 'vitepress';
import { createVerbbDocsTheme } from '@verbb/vitepress-theme';
import ComponentPreview from './components/ComponentPreview.vue';
import './custom.css';

const theme: Theme = createVerbbDocsTheme({
    enhanceApp({ app }) {
        app.component('ComponentPreview', ComponentPreview);
    },
});

export default theme;
