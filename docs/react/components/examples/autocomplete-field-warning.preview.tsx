import { useState } from 'react';
import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Autocomplete, Field, Option } from '@verbb/plugin-kit-react/components';

export function AutocompleteFieldWarningExample() {
    const [value, setValue] = useState('@webroot/cpnav-icons-new/');

    return (
        <Field
            label="Icons Path"
            instructions="Folder of SVG files available as custom nav icons. Supports Craft aliases like `@webroot`."
            warning="This path does not exist yet — save the setting, then create the folder."
        >
            <Autocomplete width="full" value={value} onChange={setValue}>
                <Option value="@webroot/">@webroot/</Option>
                <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
                <Option value="@webroot/cpnav-icons-new/">@webroot/cpnav-icons-new/</Option>
                <Option value="@storage/icons/">@storage/icons/</Option>
            </Autocomplete>
        </Field>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Field warning',
    title: 'Missing path warning',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <AutocompleteFieldWarningExample />
        </div>
    ),
};

export default preview;
