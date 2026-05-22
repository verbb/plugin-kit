// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';

export function CalendarRangeExample() {
    const today = new Date();

    return (
        <Calendar
            mode="range"
            selected={{
                from: today,
                to: new Date(new Date(today).setDate(today.getDate() + 7)),
            }}
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
