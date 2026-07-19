import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate, calendarRange } from './calendarDemoDates';

export function CalendarDropdownCaptionsExample() {
    return (
        <>
            <Calendar value={calendarDate()} />
            <Calendar mode="range" value={calendarRange(0, 7)} />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Dropdown Captions',
    title: 'Dropdown captions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <CalendarDropdownCaptionsExample />
        </div>
    ),
};

export default preview;
