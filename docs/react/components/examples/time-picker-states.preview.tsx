// #region example
import { TimePicker } from '@verbb/plugin-kit-react/components';

export function TimePickerStatesExample() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <TimePicker value="09:30" />
            <TimePicker value="09:30" disabled />
            <TimePicker value="99:99" invalid />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'States',
    title: 'Time picker state examples',
    language: 'tsx',
    source: true,
    render: () => <TimePickerStatesExample />,
};

export default preview;
