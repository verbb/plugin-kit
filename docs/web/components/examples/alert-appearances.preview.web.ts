import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Appearances',
    title: 'Alert appearances',
    layout: 'stack',
    html: `
<pk-alert appearance="accent" heading="Accent">
  A leading accent gives the alert the most emphasis.
</pk-alert>
<pk-alert appearance="filled-outlined" heading="Filled and outlined">
  A quiet fill and border contain the message.
</pk-alert>
<pk-alert appearance="filled" heading="Filled">
  A quiet fill groups the message without a border.
</pk-alert>
<pk-alert appearance="outlined" heading="Outlined">
  A border defines the alert without a background fill.
</pk-alert>
<pk-alert appearance="plain" heading="Plain">
  Content appears without a fill or border.
</pk-alert>
`.trim(),
});
