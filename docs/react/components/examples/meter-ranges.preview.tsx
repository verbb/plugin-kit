// #region example
import { Meter } from '@verbb/plugin-kit-react/components';
import { formActivity } from '../../../web/components/examples/chart.fixtures';

const cell = { padding: '8px 10px', borderBottom: '1px solid #e4ebf3', textAlign: 'start' } as const;

export function MeterRangesExample() {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
                <tr>
                    <th scope="col" style={cell}>Form</th>
                    <th scope="col" style={cell}>Completion rate</th>
                    <th scope="col" style={cell}>Spam rate</th>
                </tr>
            </thead>
            <tbody>
                {formActivity.map(({ form, completion, spam }) => (
                    <tr key={form}>
                        <th scope="row" style={cell}>{form}</th>
                        <td style={{ ...cell, width: '35%' }}>
                            <Meter
                                label={`${form} completion rate`}
                                value={completion}
                                low={0.4}
                                high={0.6}
                                optimum={1}
                                format="percent"
                                showValue
                            />
                        </td>
                        <td style={{ ...cell, width: '35%' }}>
                            <Meter
                                label={`${form} spam rate`}
                                value={spam}
                                max={0.25}
                                low={0.05}
                                high={0.15}
                                optimum={0}
                                format="percent"
                                showValue
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Ranges',
    title: 'Completion and spam rates',
    language: 'tsx',
    source: true,
    render: () => <MeterRangesExample />,
};

export default preview;
