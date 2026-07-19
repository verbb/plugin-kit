import { timePickerPlaygroundMeta, timePickerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { timePickerReactSectionRenderers } from '../time-picker-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function TimePickerPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={timePickerPlaygroundSpec}
            sectionRenderers={timePickerReactSectionRenderers}
        />
    );
}

export const timePickerPreview: SurfacePreviewDefinition = {
    id: 'time-picker',
    title: timePickerPlaygroundMeta.title,
    description: timePickerPlaygroundMeta.description,
    Component: TimePickerPreviewPage,
};
