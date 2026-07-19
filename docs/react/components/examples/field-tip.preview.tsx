// #region example
import { Field, Input } from '@verbb/plugin-kit-react/components';

export function FieldTipExample() {
    return (
        <Field
            label="System Name"
            instructions="How you'll refer to this field in your templates."
            required
            tip="This can begin with an environment variable."
        >
            <Input placeholder="my-handle" value="testing" mono />
        </Field>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Tip',
    title: 'Tip example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <FieldTipExample />
        </div>
    ),
};

export default preview;
