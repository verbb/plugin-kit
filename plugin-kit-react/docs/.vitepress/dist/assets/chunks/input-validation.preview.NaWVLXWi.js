const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputValidationExample() {
    return <Input aria-invalid={true} defaultValue="Missing slug" />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Validation',
    title: 'Validation example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputValidationExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
