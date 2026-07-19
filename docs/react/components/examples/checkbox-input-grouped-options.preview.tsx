import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputGroupedOptionsExample() {
    return (
        <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <legend style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Notification preferences</legend>
            <CheckboxInput label="Email updates" checked />
            <CheckboxInput label="Push notifications" />
            <CheckboxInput label="SMS alerts" disabled />
        </fieldset>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Grouped Options',
    title: 'Grouped options example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxInputGroupedOptionsExample />
        </div>
    ),
};

export default preview;
