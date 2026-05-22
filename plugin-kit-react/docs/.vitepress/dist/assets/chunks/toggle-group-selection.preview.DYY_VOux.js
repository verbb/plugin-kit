const e=`// #region example
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@verbb/plugin-kit-react/components';

export function ToggleGroupSelectionExample() {
    const [singleValue, setSingleValue] = useState('left');
    const [multipleValues, setMultipleValues] = useState<string[]>(['bold']);

    return (
        <div className="flex flex-col gap-4">
            <ToggleGroup value={singleValue} onValueChange={setSingleValue}>
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup multiple value={multipleValues} onValueChange={setMultipleValues}>
                <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Selection Modes',
    title: 'Toggle group selection mode examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ToggleGroupSelectionExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
