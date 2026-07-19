// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function FieldStandaloneLabelsExample() {
    return (
        <Input
            label="Title"
            instructions="Standalone controls can still expose their own label and instructions."
            placeholder="My entry"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Standalone Labels',
    title: 'Standalone labels example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <FieldStandaloneLabelsExample />
        </div>
    ),
};

export default preview;
