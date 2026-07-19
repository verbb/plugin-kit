import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate, calendarDisabledDates } from './calendarDemoDates';

export function CalendarDisabledExample() {
    return (
        <Calendar
            value={calendarDate()}
            disabledDatesRaw={calendarDisabledDates([3, 4, 5])}
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled Days',
    title: 'Disabled days example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarDisabledExample />
        </div>
    ),
};

export default preview;
