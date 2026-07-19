import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarDate } from './calendarDemoDates';

export function CalendarSingleExample() {
    return <Calendar value={calendarDate()} />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Single Date',
    title: 'Single date example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarSingleExample />
        </div>
    ),
};

export default preview;
