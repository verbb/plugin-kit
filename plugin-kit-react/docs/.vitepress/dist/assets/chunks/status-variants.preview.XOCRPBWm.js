const e=`// #region example
import { Status } from '@verbb/plugin-kit-react/components';

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
] as const;

export function StatusVariantsExample() {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {statusVariants.map((status) => {
                return <Status key={status} status={status} label={status} />;
            })}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Variants example',
    language: 'tsx',
    source: true,
    render: () => <StatusVariantsExample />,
};

export default preview;
`;export{e as default};
