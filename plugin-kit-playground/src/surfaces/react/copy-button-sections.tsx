import { copyButtonPlaygroundSections } from '@verbb/plugin-kit-playground';

import { CopyButton } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from copyButtonPlaygroundSpec. */
export const copyButtonReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => {
        const { value } = copyButtonPlaygroundSections.basicUsage;

        return (
            <div className="pg-card__inner--row">
                <Input value={value} readOnly style={{ width: '16rem' }} />
                <CopyButton value={value}>
                    <Icon slot="icon" icon="clipboard" />
                </CopyButton>
            </div>
        );
    },

    variants: () => {
        const { value, variants } = copyButtonPlaygroundSections.variants;

        return (
            <>
                <div className="pg-card__inner--row" style={{ marginBottom: '0.75rem' }}>
                    <Input value={value} readOnly style={{ width: '16rem' }} />
                    <CopyButton value={value}>
                        <Icon slot="icon" icon="clipboard" />
                    </CopyButton>
                </div>
                <div className="pg-card__inner--row">
                    {variants.map((variant) => (
                        <CopyButton key={variant} value={value} variant={variant}>
                            <Icon slot="icon" icon="clipboard" />
                        </CopyButton>
                    ))}
                </div>
            </>
        );
    },
};
