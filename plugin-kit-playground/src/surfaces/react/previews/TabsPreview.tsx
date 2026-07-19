import { tabsPlaygroundMeta, tabsPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { tabsReactSectionRenderers } from '../tabs-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TabsPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={tabsPlaygroundSpec}
            sectionRenderers={tabsReactSectionRenderers}
        />
    );
}

export const tabsPreview: SurfacePreviewDefinition = {
    id: 'tabs',
    title: tabsPlaygroundMeta.title,
    description: tabsPlaygroundMeta.description,
    Component: TabsPreviewPage,
};
