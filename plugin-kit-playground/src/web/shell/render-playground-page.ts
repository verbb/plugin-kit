import type { PlaygroundSectionRendererMap, PlaygroundSpec } from '../../catalog/types.js';
import { createCard, createPageHero, createSection, getCardInner } from '../dom.js';

/**
 * Renders the shared playground page shell (hero + sections).
 * Each section's preview is filled by the surface-specific renderer map.
 */
export function renderPlaygroundFromSpec(
    spec: PlaygroundSpec,
    sectionRenderers: PlaygroundSectionRendererMap,
    root: HTMLElement,
): void {
    root.replaceChildren();

    const page = document.createElement('div');
    page.className = 'pg-page';
    page.append(createPageHero(spec.meta));

    const sectionsHost = document.createElement('div');
    sectionsHost.className = 'pg-sections';

    for (const section of spec.sections) {
        const sectionEl = createSection(section.title, section.description);
        const preview = document.createElement('div');
        preview.className = 'pg-section__preview';
        preview.dataset.sectionId = section.id;

        const render = sectionRenderers[section.id];

        if (render) {
            if (section.bare) {
                render(preview);
            } else {
                const card = createCard(section.overflowVisible ?? false);
                render(getCardInner(card));
                preview.append(card);
            }
        }

        sectionEl.append(preview);
        sectionsHost.append(sectionEl);
    }

    page.append(sectionsHost);
    root.append(page);
}
