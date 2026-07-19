import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerConstraintsExample() {
    return (
        <>
            <DatePicker disablePast placeholder="Future dates only" />
            <DatePicker disableFuture placeholder="Past dates only" />
            <DatePicker disabledDaysOfWeek="sat sun" placeholder="Weekdays only" />
            <DatePicker min="2026-01-01" max="2026-12-31" placeholder="Within 2026" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Constraints',
    title: 'Constraints example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <DatePickerConstraintsExample />
        </div>
    ),
};

export default preview;
