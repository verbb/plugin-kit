import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsImageLabeledItems,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="seagulls.jpg" mode="image" placeholder="Choose a preview image" search-placeholder="Search images"';

export default defineWebPreview({
    label: 'Image Mode',
    title: 'Image mode example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        mode: 'image',
        items: docsImageLabeledItems,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, {
            mode: 'image',
            items: docsImageLabeledItems,
            value: 'seagulls.jpg',
        });
    },
});
