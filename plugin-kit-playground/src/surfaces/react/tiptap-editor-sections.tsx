import { tiptapEditorPlaygroundSections } from '@verbb/plugin-kit-playground';

import { TiptapEditor } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

type TiptapEditorSectionKey = keyof typeof tiptapEditorPlaygroundSections;

function TiptapEditorDemo({ sectionKey }: { sectionKey: TiptapEditorSectionKey }) {
    const sectionConfig = tiptapEditorPlaygroundSections[sectionKey];

    return (
        <TiptapEditor
            value={sectionConfig.initialValue}
            placeholder={sectionConfig.placeholder}
            rows={sectionConfig.rows}
            style={{ maxWidth: sectionConfig.maxWidth }}
            {...('toolbar' in sectionConfig && sectionConfig.toolbar
                ? { toolbar: sectionConfig.toolbar }
                : { buttons: sectionConfig.buttons })}
        />
    );
}

/** React previews — one function per section id from tiptapEditorPlaygroundSpec. */
export const tiptapEditorReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => <TiptapEditorDemo sectionKey="basic" />,
    expandedToolbar: () => <TiptapEditorDemo sectionKey="expandedToolbar" />,
    groupedToolbar: () => <TiptapEditorDemo sectionKey="groupedToolbar" />,
};
