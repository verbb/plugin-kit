// #region example
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerStatesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DatePicker label="Required" required withClear placeholder="Required date" />
            <DatePicker label="Invalid" value="2026-01-15" invalid />
            <DatePicker label="Disabled" value="2026-05-20" disabled />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'States',
    title: 'Date picker state examples',
    language: 'tsx',
    source: true,
    render: () => <DatePickerStatesExample />,
};

export default preview;
