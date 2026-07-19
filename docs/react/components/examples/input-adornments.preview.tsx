// #region example
import {
    Icon,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';

export function InputAdornmentsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input placeholder="Search entries" style={{ maxWidth: '20rem' }}>
                <Icon slot="start" icon="search" />
            </Input>
            <InputGroup style={{ maxWidth: '20rem' }}>
                <InputGroupInput defaultValue="49" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Adornments',
    title: 'Input adornment examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputAdornmentsExample />
        </div>
    ),
};

export default preview;
