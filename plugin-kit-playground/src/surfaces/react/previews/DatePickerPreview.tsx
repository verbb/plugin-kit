import { datePickerPlaygroundMeta, datePickerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { datePickerReactSectionRenderers } from '../date-picker-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function DatePickerPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={datePickerPlaygroundSpec}
            sectionRenderers={datePickerReactSectionRenderers}
        />
    );
}

export const datePickerPreview: SurfacePreviewDefinition = {
    id: 'date-picker',
    title: datePickerPlaygroundMeta.title,
    description: datePickerPlaygroundMeta.description,
    Component: DatePickerPreviewPage,
};
