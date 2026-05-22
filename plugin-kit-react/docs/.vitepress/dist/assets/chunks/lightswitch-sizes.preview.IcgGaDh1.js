const e=`import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

const sizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
];

export function LightswitchSizesExample() {
    return (
        <div className="space-y-3 text-sm">
            {sizes.map(({ label, size }) => {
                return (
                    <label className="flex items-center gap-2" key={size}>
                        <Lightswitch size={size} />
                        {label}
                    </label>
                );
            })}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <LightswitchSizesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
