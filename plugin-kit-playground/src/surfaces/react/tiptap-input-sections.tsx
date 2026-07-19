import { useState } from 'react';

import { TiptapInput } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from tiptapInputPlaygroundSpec. */
export const tiptapInputReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: function BasicUsageSection() {
        const [value, setValue] = useState('Hello {field:total}');

        return (
            <>
                <TiptapInput
                    value={value}
                    style={{ maxWidth: '32rem' }}
                    onPkChange={(event) => { setValue(event.detail.value); }}
                />
                <pre className="pg-code-block">{value}</pre>
            </>
        );
    },
};
