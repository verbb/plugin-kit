import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsImageModeGroups,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="seagulls.jpg" mode="image" placeholder="Choose a preview image" search-placeholder="Search images"';

export default defineWebPreview({
    label: 'Grouped Images',
    title: 'Grouped images example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        mode: 'image',
        groups: docsImageModeGroups,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, {
            mode: 'image',
            groups: docsImageModeGroups,
            value: 'seagulls.jpg',
        });
    },
});
