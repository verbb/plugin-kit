const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputSizesExample() {
    return (
        <>
            <Input size="xs" placeholder="Extra small" />
            <Input size="sm" placeholder="Small" />
            <Input placeholder="Default" />
            <Input size="lg" placeholder="Large" />
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputSizesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
