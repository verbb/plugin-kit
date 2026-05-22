const e=`// #region example
import { Calendar } from '@verbb/plugin-kit-react/components';

export function CalendarSingleExample() {
    return (
        <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-lg border border-slate-400"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Single Date',
    title: 'Single date example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CalendarSingleExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
