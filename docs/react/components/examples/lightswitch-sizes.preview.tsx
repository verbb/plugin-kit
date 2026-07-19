import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Lightswitch } from '@verbb/plugin-kit-react/components';

const sizes = [
    { label: 'Extra extra small', size: 'xxs' as const },
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
];

export function LightswitchSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            {sizes.map(({ label, size }) => {
                return (
                    <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Lightswitch size={size} />
                        <span>{label}</span>
                    </div>
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
