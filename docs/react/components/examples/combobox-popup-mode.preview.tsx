// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

export function ComboboxPopupModeExample() {
    return (
        <Combobox popupMode placeholder="Select a country" value="ar">
            <Option value="ar">Argentina</Option>
            <Option value="au">Australia</Option>
            <Option value="br">Brazil</Option>
            <Option value="ca">Canada</Option>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Popup Mode',
    title: 'Popup mode example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxPopupModeExample />
        </div>
    ),
};

export default preview;
