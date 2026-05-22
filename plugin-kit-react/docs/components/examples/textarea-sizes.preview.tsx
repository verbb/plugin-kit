import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

const textareaSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
];

export function TextareaSizesExample() {
    return (
        <>
            {textareaSizes.map(({ label, size }) => {
                return (
                    <Textarea
                        key={size}
                        size={size}
                        placeholder={label}
                    />
                );
            })}
        </>
    );
}
// #endregion example

const narrowStack = { ...stackStyle, maxWidth: '520px' };

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrowStack}>
            <TextareaSizesExample />
        </div>
    ),
};

export default preview;
