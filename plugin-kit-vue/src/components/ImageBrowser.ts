import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/image-browser.js';

/** Vue facade over `<pk-image-browser>`. Behavior and styles live in the web component. */
export const ImageBrowser = createPkComponent({
    name: 'PkImageBrowser',
    tagName: 'pk-image-browser',
});

export const PkImageBrowserElement = ImageBrowser;

export type ImageBrowserProps = Record<string, unknown>;
