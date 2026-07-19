// #region example
import { Spinner } from '@verbb/plugin-kit-react/components';

const wrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px',
} as const;

export function SpinnerColorsExample() {
    return (
        <div style={wrapStyle}>
            <Spinner tone="sky" />
            <Spinner tone="emerald" />
            <Spinner tone="violet" />
            <Spinner tone="amber" />
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Colors',
    title: 'Spinner color examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SpinnerColorsExample />
        </div>
    ),
};

export default preview;
