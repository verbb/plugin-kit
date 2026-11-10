// #region example
import { Sparkline } from '@verbb/plugin-kit-react/components';
import { activityDates, formActivity } from '../../../web/components/examples/chart.fixtures';

const cell = { padding: '8px 10px', borderBottom: '1px solid #e4ebf3', textAlign: 'start' } as const;

export function SparklineTableExample() {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
                <tr>
                    <th scope="col" style={cell}>Form</th>
                    <th scope="col" style={cell}>Submissions</th>
                    <th scope="col" style={cell}>Last 14 days</th>
                </tr>
            </thead>
            <tbody>
                {formActivity.map(({ form, submissions, trend }) => (
                    <tr key={form}>
                        <th scope="row" style={cell}>{form}</th>
                        <td style={cell}>{submissions.toLocaleString('en-US')}</td>
                        <td style={{ ...cell, width: '40%' }}>
                            <Sparkline label={`${form} submissions, last 14 days`} values={trend} dates={activityDates} />
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
    label: 'In a Table',
    title: 'Sparklines in table cells',
    language: 'tsx',
    source: true,
    render: () => <SparklineTableExample />,
};

export default preview;
