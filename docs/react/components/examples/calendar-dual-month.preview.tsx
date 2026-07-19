import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';
import { calendarRange } from './calendarDemoDates';

export function CalendarDualMonthExample() {
    return <Calendar mode="range" months={2} value={calendarRange(0, 14)} />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Two-Month Display',
    title: 'Two-month display example',
    language: 'tsx',
    source: true,
    render: () => <CalendarDualMonthExample />,
};

export default preview;
