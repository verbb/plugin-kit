import { lightswitchPlaygroundSpec } from '../catalog/specs/lightswitch.spec.js';
import { renderPlaygroundFromSpec } from './shell/render-playground-page.js';
import { lightswitchWebSectionRenderers } from './surfaces/web/lightswitch-sections.js';

export {
    lightswitchPlaygroundMeta,
    lightswitchPlaygroundSections,
} from '../catalog/data/meta-lightswitch.js';
export { lightswitchPlaygroundSpec } from '../catalog/specs/lightswitch.spec.js';

export function renderLightswitchPlayground(root: HTMLElement): void {
    renderPlaygroundFromSpec(lightswitchPlaygroundSpec, lightswitchWebSectionRenderers, root);
}
