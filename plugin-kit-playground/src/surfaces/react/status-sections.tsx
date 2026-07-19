import { statusPlaygroundVariants } from '@verbb/plugin-kit-playground';

import { Status } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from statusPlaygroundSpec. */
export const statusReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    variants: () => (
        <div className="pg-status-grid pg-status-grid--variants">
            {statusPlaygroundVariants.map((status) => (
                <Status key={status} status={status} />
            ))}
        </div>
    ),
};
