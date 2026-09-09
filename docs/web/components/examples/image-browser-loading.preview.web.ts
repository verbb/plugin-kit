import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindImageBrowser,
    docsIconSvg,
    imageBrowserPreviewSource,
} from './image-browser.fixtures';

const htmlAttrs =
    'loading value="star" selected-label="Star" placeholder="Choose an icon" search-placeholder="Search icons" open';

export default defineWebPreview({
    label: 'Loading',
    title: 'Loading catalog example',
    layout: 'stack',
    language: 'js',
    code: imageBrowserPreviewSource({
        htmlAttrs,
        loading: true,
        selectedLabel: 'Star',
        selectedPreview: docsIconSvg.star,
    }),
    html: `<pk-image-browser ${htmlAttrs}></pk-image-browser>`,
    enhance: (root) => {
        // Sticky loading + open so the panel spinner is visible without racing a warm.
        bindImageBrowser(root, {
            loading: true,
            selectedLabel: 'Star',
            selectedPreview: docsIconSvg.star,
            value: 'star',
            open: true,
        });
    },
});
