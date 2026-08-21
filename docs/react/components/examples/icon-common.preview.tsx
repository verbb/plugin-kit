// #region example
import { Icon } from '@verbb/plugin-kit-react/components';

export function IconCommonExample() {
    return (
        <>
            <Icon icon="plus" />
            <Icon icon="xmark" />
            <Icon icon="chevron-down" />
            <Icon icon="pen" />
            <Icon icon="gear" />
            <Icon icon="ellipsis" />
            <Icon icon="trash" />
            <Icon icon="check" />
            <Icon icon="magnifying-glass" />
            <Icon icon="arrows-rotate" />
            <Icon icon="grip-move" />
            <Icon icon="sliders" />
            <Icon icon="lock" />
            <Icon icon="circle-info" />
            <Icon icon="circle-check" />
            <Icon icon="circle-exclamation" />
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Common Icons',
    title: 'Common icons example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <IconCommonExample />
        </div>
    ),
};

export default preview;
