// #region example
import { Button, Field, Icon } from '@verbb/plugin-kit-react/components';

export function FieldHeaderEndExample() {
    return (
        <Field
            label="Static Options"
            instructions="Add, remove, or reorder option rows manually."
            headerEnd={(
                <Button size="sm">
                    <Icon slot="start" icon="plus" />
                    Bulk add options
                </Button>
            )}
        >
            <div>Option rows would render here.</div>
        </Field>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Header End',
    title: 'Header end example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <FieldHeaderEndExample />
        </div>
    ),
};

export default preview;
