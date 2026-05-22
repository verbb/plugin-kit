const e=`// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function ButtonDisabledLinkExample() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>Disabled primary</Button>
            <Button variant="link" href="https://verbb.io">
                Link button
            </Button>
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{e as default};
