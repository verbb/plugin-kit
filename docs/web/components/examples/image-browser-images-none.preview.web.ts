import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsImageLabeledItems,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="seagulls.jpg" mode="image" label-mode="none" placeholder="Choose a preview image" search-placeholder="Search images"';

export default defineWebPreview({
    label: 'Image No Labels',
    title: 'Image no labels example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        mode: 'image',
        labelMode: 'none',
        items: docsImageLabeledItems,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, {
            mode: 'image',
            labelMode: 'none',
            items: docsImageLabeledItems,
            value: 'seagulls.jpg',
        });
    },
});
