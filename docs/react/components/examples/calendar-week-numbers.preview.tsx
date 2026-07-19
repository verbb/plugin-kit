import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate } from './calendarDemoDates';

export function CalendarWeekNumbersExample() {
    return <Calendar value={calendarDate()} withWeekNumbers />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Week Numbers',
    title: 'Week numbers example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarWeekNumbersExample />
        </div>
    ),
};

export default preview;
