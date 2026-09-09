import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { stackStyle } from './exampleStyles';

// #region example
import {
    Icon,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@verbb/plugin-kit-react/components';

export function InputGroupIconExample() {
    return (
        <>
            <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <Icon icon="magnifying-glass" aria-hidden="true" />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon align="inline-end">
                    <Icon icon="magnifying-glass" aria-hidden="true" />
                </InputGroupAddon>
            </InputGroup>
        </>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Icon Addons',
    title: 'Icon addons example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputGroupIconExample />
        </div>
    ),
};

export default preview;
