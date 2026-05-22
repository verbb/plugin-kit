const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputDisabledExample() {
    return <Input disabled defaultValue="Read only value" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputDisabledExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
