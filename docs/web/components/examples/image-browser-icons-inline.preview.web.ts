import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsIconItems,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="star" label-mode="inline" placeholder="Choose an icon" search-placeholder="Search icons"';

export default defineWebPreview({
    label: 'Icon Inline Labels',
    title: 'Icon inline labels example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        labelMode: 'inline',
        items: docsIconItems,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, { items: docsIconItems, value: 'star', labelMode: 'inline' });
    },
});
