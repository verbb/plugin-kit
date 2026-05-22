import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaWidthsExample() {
    return (
        <div className="space-y-3">
            <div className="max-w-md">
                <Textarea placeholder="Full width by default" />
            </div>

            <Textarea className="w-[320px]" placeholder="Fixed width" />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => <TextareaWidthsExample />,
};

export default preview;
