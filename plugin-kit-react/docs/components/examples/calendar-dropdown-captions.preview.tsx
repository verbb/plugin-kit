// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';

const gridStyle = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
} as const;

export function CalendarDropdownCaptionsExample() {
    const today = new Date();

    return (
        <div style={gridStyle}>
            <Calendar
                mode="single"
                captionLayout="dropdown"
                fromYear={2015}
                toYear={2035}
                selected={today}
                className="rounded-lg border border-slate-400"
            />
            <Calendar
                mode="range"
                captionLayout="dropdown"
                fromYear={2015}
                toYear={2035}
                selected={{
                    from: today,
                    to: new Date(new Date(today).setDate(today.getDate() + 7)),
                }}
            />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Dropdown Captions',
    title: 'Dropdown captions example',
    language: 'tsx',
    source: true,
    render: () => <CalendarDropdownCaptionsExample />,
};

export default preview;
