// #region example
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';

export function InputAdornmentsExample() {
    return (
        <div className="flex flex-col gap-3">
            <InputGroup className="max-w-sm">
                <InputGroupAddon>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search entries" />
            </InputGroup>
            <InputGroup className="max-w-sm">
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
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
