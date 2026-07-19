// #region example
import { Field, Input } from '@verbb/plugin-kit-react/components';

export function FieldErrorsAndWarningsExample() {
    return (
        <Field
            label="Entry title"
            instructions="Shown on the public entry page."
            required
            warning="This title is similar to an existing entry."
            errors={['Title is required.']}
        >
            <Input placeholder="My entry" invalid />
        </Field>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Errors and Warnings',
    title: 'Errors and warnings example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <FieldErrorsAndWarningsExample />
        </div>
    ),
};

export default preview;
