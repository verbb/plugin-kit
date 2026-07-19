import { tabsPlaygroundSpec } from '../catalog/specs/tabs.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { tabsWebSectionRenderers } from './surfaces/web/tabs-sections.js';

export {
    tabsPlaygroundMeta,
    tabsPlaygroundSections,
    tabsOverflowItems,
} from '../catalog/data/meta-tabs.js';
export { tabsPlaygroundSpec } from '../catalog/specs/tabs.spec.js';

export function renderTabsPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(tabsPlaygroundSpec, tabsWebSectionRenderers, root);
}
