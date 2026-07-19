import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarRange } from './calendarDemoDates';

export function CalendarRangeExample() {
    return <Calendar mode="range" value={calendarRange(0, 7)} />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Date Ranges',
    title: 'Date ranges example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarRangeExample />
        </div>
    ),
};

export default preview;
