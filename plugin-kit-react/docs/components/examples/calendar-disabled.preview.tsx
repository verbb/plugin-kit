// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';

function getDisabledRange() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 3);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);
    return { today, startDate, endDate };
}

export function CalendarDisabledExample() {
    const { today, startDate, endDate } = getDisabledRange();

    return (
        <Calendar
            mode="single"
            className="rounded-lg border border-slate-400"
            selected={today}
            disabled={[{ from: startDate, to: endDate }]}
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
