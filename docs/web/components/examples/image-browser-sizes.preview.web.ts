import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import type { PkImageBrowser } from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const items = [
    { value: 'circle', label: 'Circle', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>' },
    { value: 'square', label: 'Square', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/></svg>' },
];
const sizes = ['xxs', 'xs', 'sm', 'default', 'lg', 'xl'] as const;

export default defineWebPreview({
    label: 'Sizes',
    title: 'Image browser sizes',
    layout: 'stack',
    language: 'js',
    code: `import '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';

const items = ${JSON.stringify(items, null, 4)};

for (const size of ${JSON.stringify(sizes)}) {
    const browser = document.createElement('pk-image-browser');
    browser.size = size;
    browser.items = items;
    browser.value = 'circle';
    browser.withClear = true;
    browser.ariaLabel = size + ' icon';
    document.body.append(browser);
}`,
    html: sizes.map((size) => `<div style="display:flex;gap:16px;align-items:center"><span style="width:64px">${size}</span><pk-image-browser size="${size}" value="circle" with-clear aria-label="${size} icon"></pk-image-browser></div>`).join(''),
    enhance: (root) => {
        root.querySelectorAll<PkImageBrowser>('pk-image-browser').forEach((browser) => {
            browser.items = items;
        });
    },
});
