import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Autocomplete, Option, OptionGroup } from '@verbb/plugin-kit-react/components';

export function AutocompleteGroupedExample() {
    return (
        <Autocomplete placeholder="Path, alias, or env…" style={{ minWidth: '20rem' }}>
            <OptionGroup label="Aliases">
                <Option value="@webroot/">@webroot/</Option>
                <Option value="@storage/">@storage/</Option>
            </OptionGroup>
            <OptionGroup label="Environment">
                <Option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</Option>
                <Option value="$CRAFT_WEB_ROOT">$CRAFT_WEB_ROOT</Option>
            </OptionGroup>
        </Autocomplete>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Grouped',
    title: 'Grouped aliases and env vars',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <AutocompleteGroupedExample />
        </div>
    ),
};

export default preview;
