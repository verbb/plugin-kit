import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { stackStyle } from './exampleStyles';

// #region example
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';

export function InputGroupTextExample() {
    return (
        <InputGroup>
            <InputGroupInput placeholder="0.00" />
            <InputGroupAddon align="inline-start">
                <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Text Addons',
    title: 'Text addons example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputGroupTextExample />
        </div>
    ),
};

export default preview;
