import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsIconItems,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="star" label-mode="none" placeholder="Choose an icon" search-placeholder="Search icons"';

export default defineWebPreview({
    label: 'Icon No Labels',
    title: 'Icon no labels example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        labelMode: 'none',
        items: docsIconItems,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, { items: docsIconItems, value: 'star', labelMode: 'none' });
    },
});
