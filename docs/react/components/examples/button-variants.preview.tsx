import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonVariantsExample() {
    return (
        <>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="dashed">Dashed</Button>
            <Button variant="transparent">Transparent</Button>
            <Button variant="link">Link</Button>
            <Button variant="none">None</Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonVariantsExample />
        </div>
    ),
};

export default preview;
