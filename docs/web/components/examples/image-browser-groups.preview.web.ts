import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsImageGroups,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs = 'value="star" placeholder="Choose an icon" search-placeholder="Search icons"';

export default defineWebPreview({
    label: 'Grouped Icons',
    title: 'Grouped icons example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        groups: docsImageGroups,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        bindImageBrowser(root, { groups: docsImageGroups, value: 'star' });
    },
});
