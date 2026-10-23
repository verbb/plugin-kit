// #region example
import { StatusLabel } from '@verbb/plugin-kit-react/components';

export function StatusLabelExample() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <StatusLabel status="red">Red</StatusLabel>
            <StatusLabel status="orange">Orange</StatusLabel>
            <StatusLabel status="amber">Amber</StatusLabel>
            <StatusLabel status="yellow">Yellow</StatusLabel>
            <StatusLabel status="lime">Lime</StatusLabel>
            <StatusLabel status="green">Green</StatusLabel>
            <StatusLabel status="emerald">Emerald</StatusLabel>
            <StatusLabel status="teal">Teal</StatusLabel>
            <StatusLabel status="cyan">Cyan</StatusLabel>
            <StatusLabel status="sky">Sky</StatusLabel>
            <StatusLabel status="blue">Blue</StatusLabel>
            <StatusLabel status="indigo">Indigo</StatusLabel>
            <StatusLabel status="violet">Violet</StatusLabel>
            <StatusLabel status="purple">Purple</StatusLabel>
            <StatusLabel status="fuchsia">Fuchsia</StatusLabel>
            <StatusLabel status="pink">Pink</StatusLabel>
            <StatusLabel status="rose">Rose</StatusLabel>
            <StatusLabel status="gray">Gray</StatusLabel>
            <StatusLabel status="white">White</StatusLabel>
            <StatusLabel status="black">Black</StatusLabel>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Named Colours',
    title: 'Named Colours',
    language: 'tsx',
    source: true,
    render: () => <StatusLabelExample />,
};
export default preview;
