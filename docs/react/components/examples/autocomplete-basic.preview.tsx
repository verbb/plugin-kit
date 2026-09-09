import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Autocomplete, Option } from '@verbb/plugin-kit-react/components';

export function AutocompleteBasicExample() {
    return (
        <Autocomplete placeholder="Type a path or pick an alias…" style={{ minWidth: '20rem' }} value="@webroot/">
            <Option value="@webroot/">@webroot/</Option>
            <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
            <Option value="@storage/">@storage/</Option>
            <Option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</Option>
        </Autocomplete>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic',
    title: 'Freeform path suggestions',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <AutocompleteBasicExample />
        </div>
    ),
};

export default preview;
