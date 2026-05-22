const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { TiptapInput } from '@verbb/plugin-kit-react/components';

export function TiptapInputStatesExample() {
    return (
        <div className="flex flex-col gap-3">
            <TiptapInput value="Invalid value" isInvalid />
            <TiptapInput value="Disabled value" disabled />
            <TiptapInput value="Read-only value" readOnly />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'States',
    title: 'Tiptap input state examples',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputStatesExample />,
};

export default preview;
`;export{e as default};
