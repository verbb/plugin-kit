import { comboboxPlaygroundSpec } from '../catalog/specs/combobox.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { comboboxWebSectionRenderers } from './surfaces/web/combobox-sections.js';

export {
    comboboxPlaygroundAsyncFruits,
    comboboxPlaygroundColorOptions,
    comboboxPlaygroundCountryOptions,
    comboboxPlaygroundFormOptions,
    comboboxPlaygroundFruitOptions,
    comboboxPlaygroundMeta,
    comboboxPlaygroundProduceGroups,
    comboboxPlaygroundSections,
    comboboxPlaygroundSizes,
} from '../catalog/data/meta-combobox.js';
export { comboboxPlaygroundSpec } from '../catalog/specs/combobox.spec.js';

export function renderComboboxPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(comboboxPlaygroundSpec, comboboxWebSectionRenderers, root);
}
