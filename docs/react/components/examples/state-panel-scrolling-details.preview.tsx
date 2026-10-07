// #region example
import { StatePanel } from '@verbb/plugin-kit-react/components';

const details = `RuntimeError: Preview generation failed.
Request: preview-8f31
Plugin: example
Environment: production
Timestamp: 2026-10-07T02:13:47Z
Stack trace:
  at renderPreview (preview.ts:184:17)
  at buildContext (context.ts:96:11)
  at resolveTemplate (templates.ts:72:9)
  at loadTemplate (templates.ts:41:15)
  at async generatePreview (generator.ts:118:5)
Caused by: TemplateNotFound
  Template: emails/order-confirmation
  Site: default
  Locale: en-AU
  Search path: templates/emails
  Fallbacks checked: 3
  Cache state: miss
Reference: ERR-PREVIEW-2048`;

export function StatePanelScrollingDetailsExample() {
    return (
        <StatePanel
            variant="error"
            heading="The preview could not be generated"
            detailsLabel="Show error details"
            copyLabel="Copy error details"
            detailsOpen
            copyable
        >
            Reload the preview. If the problem continues, copy the diagnostics below.
            <pre slot="details">{details}</pre>
        </StatePanel>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Scrolling Details',
    title: 'State Panel with scrolling diagnostic details',
    language: 'tsx',
    source: true,
    render: () => <StatePanelScrollingDetailsExample />,
};

export default preview;
