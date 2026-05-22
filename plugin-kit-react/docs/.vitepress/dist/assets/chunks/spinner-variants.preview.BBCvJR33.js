const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Button } from '@verbb/plugin-kit-react/components';

export function SpinnerVariantsExample() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {(['default', 'primary', 'secondary', 'dashed', 'outline', 'transparent'] as const).map((variant) => {
                return (
                    <Button key={variant} variant={variant} loading>
                        {variant}
                    </Button>
                );
            })}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Button Variants',
    title: 'Button variant examples',
    language: 'tsx',
    source: true,
    render: () => <SpinnerVariantsExample />,
};

export default preview;
`;export{e as default};
