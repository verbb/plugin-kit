import { tiptapContentSampleValue } from '@verbb/plugin-kit-playground';

import { TiptapContent } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from tiptapContentPlaygroundSpec. */
export const tiptapContentReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => (
        <TiptapContent value={tiptapContentSampleValue} style={{ maxWidth: '32rem' }} />
    ),
};
