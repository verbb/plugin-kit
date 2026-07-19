import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerRangeExample() {
    return (
        <DatePicker mode="range" months={2} label="Booking" placeholder="Select a range" />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Range',
    title: 'Range example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <DatePickerRangeExample />
        </div>
    ),
};

export default preview;
