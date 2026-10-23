// #region example
import { StatusLabel } from '@verbb/plugin-kit-react/components';

export function StatusLabelExample() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <StatusLabel status="active">Active</StatusLabel>
            <StatusLabel status="active">Approved</StatusLabel>
            <StatusLabel status="pending">Awaiting review</StatusLabel>
            <StatusLabel status="inactive">Inactive</StatusLabel>
            <StatusLabel status="disabled">Disabled</StatusLabel>
            <StatusLabel status="red">Unpaid</StatusLabel>
            <StatusLabel status="blue">Packed</StatusLabel>
            <StatusLabel status="purple">Refunded</StatusLabel>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Semantic Statuses',
    title: 'Semantic Statuses',
    language: 'tsx',
    source: true,
    render: () => <StatusLabelExample />,
};
export default preview;
