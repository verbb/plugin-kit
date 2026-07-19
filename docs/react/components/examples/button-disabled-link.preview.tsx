import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonDisabledLinkExample() {
    return (
        <>
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>Disabled primary</Button>
            <Button variant="link" href="https://verbb.io">Link button</Button>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled and Links',
    title: 'Disabled and link button examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ButtonDisabledLinkExample />
        </div>
    ),
};

export default preview;
