import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { stackStyle } from './exampleStyles';

// #region example
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';

export function InputGroupButtonExample() {
    return (
        <InputGroup>
            <InputGroupInput placeholder="example.com/contact" />
            <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupButton>Search</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Button Addon',
    title: 'Button addon example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputGroupButtonExample />
        </div>
    ),
};

export default preview;
