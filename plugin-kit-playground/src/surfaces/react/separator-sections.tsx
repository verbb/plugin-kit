import { separatorPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Separator } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from separatorPlaygroundSpec. */
export const separatorReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    horizontal: () => {
        const { above, below } = separatorPlaygroundSections.horizontal;

        return (
            <>
                <p style={{ margin: '0 0 12px' }}>{above}</p>
                <Separator />
                <p style={{ margin: '12px 0 0' }}>{below}</p>
            </>
        );
    },

    vertical: () => (
        <div className="pg-separator-row">
            {separatorPlaygroundSections.vertical.items.map((item, index) => (
                <span key={item} style={{ display: 'contents' }}>
                    {index > 0 ? <Separator orientation="vertical" /> : null}
                    <span>{item}</span>
                </span>
            ))}
        </div>
    ),
};
