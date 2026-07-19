import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate } from './calendarDemoDates';

export function CalendarDisabledDaysOfWeekExample() {
    return <Calendar value={calendarDate()} disabledDaysOfWeek="sat sun" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Days of Week',
    title: 'Disabled days of week example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarDisabledDaysOfWeekExample />
        </div>
    ),
};

export default preview;
