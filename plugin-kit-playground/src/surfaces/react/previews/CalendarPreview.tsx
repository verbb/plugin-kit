import { calendarPlaygroundMeta, calendarPlaygroundSpec } from '@verbb/plugin-kit-playground';

import { calendarReactSectionRenderers } from '../calendar-sections.js';
import { PlaygroundFromSpec } from '../shared/PlaygroundFromSpec.js';
import type { SurfacePreviewDefinition } from '../types.js';

function CalendarPreviewPage() {
    return (
        <PlaygroundFromSpec
            spec={calendarPlaygroundSpec}
            sectionRenderers={calendarReactSectionRenderers}
        />
    );
}

export const calendarPreview: SurfacePreviewDefinition = {
    id: 'calendar',
    title: calendarPlaygroundMeta.title,
    description: calendarPlaygroundMeta.description,
    Component: CalendarPreviewPage,
};
