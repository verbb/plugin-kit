// #region example
import { Status } from '@verbb/plugin-kit-react/components';
import type { PkStatusVariant } from '@verbb/plugin-kit-react/components';

/** Full built-in status aliases — same set as the playground / published docs. */
const statusVariants = [
    'all',
    'on',
    'live',
    'active',
    'enabled',
    'off',
    'suspended',
    'expired',
    'warning',
    'pending',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'turquoise',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'light',
    'gray',
    'grey',
    'white',
    'black',
    'disabled',
    'inactive',
] as const satisfies readonly PkStatusVariant[];

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
    gap: 12,
    width: '100%',
} as const;

const tileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: '#374151',
} as const;

export function StatusVariantsExample() {
    return (
        <div style={gridStyle}>
            {statusVariants.map((status) => (
                <div key={status} style={tileStyle}>
                    <Status status={status} aria-label={status} />
                    <span>{status}</span>
                </div>
            ))}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => <StatusVariantsExample />,
};

export default preview;
