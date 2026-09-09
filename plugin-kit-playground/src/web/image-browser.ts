import { imageBrowserPlaygroundSpec } from '../catalog/specs/image-browser.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { imageBrowserWebSectionRenderers } from './surfaces/web/image-browser-sections.js';

export {
    imageBrowserPlaygroundMeta,
    imageBrowserPlaygroundSections,
} from '../catalog/data/meta-image-browser.js';
export { imageBrowserPlaygroundSpec } from '../catalog/specs/image-browser.spec.js';

export function renderImageBrowserPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(imageBrowserPlaygroundSpec, imageBrowserWebSectionRenderers, root);
}
