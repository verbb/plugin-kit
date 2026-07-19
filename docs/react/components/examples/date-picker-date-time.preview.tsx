import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { DatePicker, TimePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerDateTimeExample() {
    return (
        <>
            <DatePicker value="2026-05-20" placeholder="Pick a date" />
            <TimePicker value="09:00" placeholder="Select time" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Date and Time',
    title: 'Date and time example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <DatePickerDateTimeExample />
        </div>
    ),
};

export default preview;
