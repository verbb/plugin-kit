import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate } from './calendarDemoDates';

export function CalendarViewStepperExample() {
    return (
        <>
            <div style={{ fontSize: 12, color: '#6b7280', margin: '0 0 8px' }}>
                Click the month/year title to step into month and year views.
            </div>
            <Calendar value={calendarDate()} />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'View Stepper',
    title: 'View stepper example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarViewStepperExample />
        </div>
    ),
};

export default preview;
