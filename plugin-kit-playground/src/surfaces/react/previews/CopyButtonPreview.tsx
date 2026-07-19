import { copyButtonPlaygroundMeta, copyButtonPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { copyButtonReactSectionRenderers } from '../copy-button-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function CopyButtonPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={copyButtonPlaygroundSpec}
            sectionRenderers={copyButtonReactSectionRenderers}
        />
    );
}

export const copyButtonPreview: SurfacePreviewDefinition = {
    id: 'copy-button',
    title: copyButtonPlaygroundMeta.title,
    description: copyButtonPlaygroundMeta.description,
    Component: CopyButtonPreviewPage,
};
