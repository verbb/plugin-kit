import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Autocomplete, Option } from '@verbb/plugin-kit-react/components';

export function AutocompleteClearableExample() {
    return (
        <Autocomplete clearable placeholder="Icons path…" style={{ minWidth: '20rem' }} value="@webroot/cpnav-icons/">
            <Option value="@webroot/">@webroot/</Option>
            <Option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</Option>
            <Option value="@storage/icons/">@storage/icons/</Option>
        </Autocomplete>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Clearable',
    title: 'Clearable autocomplete',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <AutocompleteClearableExample />
        </div>
    ),
};

export default preview;
