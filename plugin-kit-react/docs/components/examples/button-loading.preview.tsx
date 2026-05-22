import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonLoadingExample() {
    return (
        <>
            <Button variant="primary" loading>Save</Button>
            <Button variant="secondary" loading>Save changes and continue</Button>
            <Button loading>Save</Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Loading',
    title: 'Loading example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonLoadingExample />
        </div>
    ),
};

export default preview;
