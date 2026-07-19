// #region example
import { Field, Input } from '@verbb/plugin-kit-react/components';

export function FieldTranslatableExample() {
    return (
        <Field
            label="Label"
            instructions="The label that describes this field."
            required
            translatable
        >
            <Input placeholder="Test" />
        </Field>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Translatable',
    title: 'Translatable example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <FieldTranslatableExample />
        </div>
    ),
};

export default preview;
