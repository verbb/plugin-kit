import { lightswitchPlaygroundMeta, lightswitchPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { lightswitchReactSectionRenderers } from '../lightswitch-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function LightswitchPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={lightswitchPlaygroundSpec}
            sectionRenderers={lightswitchReactSectionRenderers}
        />
    );
}

export const lightswitchPreview: SurfacePreviewDefinition = {
    id: 'lightswitch',
    title: lightswitchPlaygroundMeta.title,
    description: lightswitchPlaygroundMeta.description,
    Component: LightswitchPreviewPage,
};
