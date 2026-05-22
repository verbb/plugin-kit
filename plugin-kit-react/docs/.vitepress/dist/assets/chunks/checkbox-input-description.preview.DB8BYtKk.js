const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputDescriptionExample() {
    return (
        <CheckboxInput
            label="Send me product updates"
            description="Receive occasional release notes and plugin announcements."
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Descriptions',
    title: 'Descriptions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxInputDescriptionExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
