import {
    playgroundIconBold,
    playgroundIconItalic,
    playgroundIconUnderline,
} from '../../../catalog/data/icons.js';
import { togglePlaygroundSections } from '../../../catalog/data/meta-toggle.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkToggle } from '../../dom.js';

const { basicUsage, variants, sizes, pressed, disabled } = togglePlaygroundSections;

/** Web component previews — one function per section id from togglePlaygroundSpec. */
export const toggleWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        preview.append(createPkToggle({
            id: 'pg-toggle-basic',
            icon: playgroundIconBold,
            label: basicUsage.label,
        }));
    },

    variants(preview) {
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row';

        row.append(
            createPkToggle({
                id: 'pg-toggle-default',
                icon: playgroundIconBold,
                label: 'Bold',
                variant: 'default',
            }),
            createPkToggle({
                id: 'pg-toggle-outline',
                icon: playgroundIconItalic,
                label: 'Italic',
                variant: 'outline',
            }),
        );

        preview.append(row);
    },

    sizes(preview) {
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row';

        row.append(
            createPkToggle({
                id: 'pg-toggle-sm',
                icon: playgroundIconBold,
                label: 'Bold',
                size: 'sm',
            }),
            createPkToggle({
                id: 'pg-toggle-md',
                icon: playgroundIconItalic,
                label: 'Italic',
            }),
            createPkToggle({
                id: 'pg-toggle-lg',
                icon: playgroundIconUnderline,
                label: 'Underline',
                size: 'lg',
            }),
        );

        preview.append(row);
    },

    pressed(preview) {
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row';

        row.append(
            createPkToggle({
                id: 'pg-toggle-pressed-default',
                icon: playgroundIconItalic,
                label: 'Italic',
                pressed: true,
            }),
            createPkToggle({
                id: 'pg-toggle-pressed-outline',
                icon: playgroundIconItalic,
                label: 'Italic',
                variant: 'outline',
                pressed: true,
            }),
        );

        preview.append(row);
    },

    disabled(preview) {
        preview.append(createPkToggle({
            id: 'pg-toggle-disabled',
            icon: playgroundIconBold,
            label: disabled.label,
            disabled: true,
        }));
    },
};
