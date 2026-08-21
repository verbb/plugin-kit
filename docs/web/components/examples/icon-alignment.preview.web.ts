import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

/**
 * Visual check for `<pk-icon>` alignment optics:
 * - `1em` square host + `vertical-align: -0.125em` for inline text
 * - centered square viewBox so narrow glyphs keep even side padding
 * - flex slots (buttons) zero the baseline nudge and center optically
 */
export default defineWebPreview({
    label: 'Alignment',
    title: 'Alignment example',
    layout: 'stack',
    html: `
<div data-pk-icon-align>
  <p data-pk-icon-align-line style="font-size: 16px; line-height: 1.5; margin: 0;">
    Inline with text
    <pk-icon icon="gear"></pk-icon>
    <pk-icon icon="plus"></pk-icon>
    <pk-icon icon="ellipsis-vertical"></pk-icon>
    <pk-icon icon="arrows-rotate"></pk-icon>
    — baseline nudge is <code>-0.125em</code>
  </p>

  <p data-pk-icon-align-line style="font-size: 24px; line-height: 1.5; margin: 0;">
    Larger type
    <pk-icon icon="gear"></pk-icon>
    <pk-icon icon="plus"></pk-icon>
    <pk-icon icon="ellipsis-vertical"></pk-icon>
    scales with <code>font-size</code>
  </p>

  <div data-pk-icon-align-grid aria-label="Square canvas comparison">
    <span data-pk-icon-align-cell>
      <pk-icon icon="ellipsis-vertical" style="font-size: 32px"></pk-icon>
      <code>ellipsis-vertical</code>
      <small>128×512 → square</small>
    </span>
    <span data-pk-icon-align-cell>
      <pk-icon icon="plus" style="font-size: 32px"></pk-icon>
      <code>plus</code>
      <small>448×512 → square</small>
    </span>
    <span data-pk-icon-align-cell>
      <pk-icon icon="gear" style="font-size: 32px"></pk-icon>
      <code>gear</code>
      <small>512×512 square</small>
    </span>
    <span data-pk-icon-align-cell>
      <pk-icon icon="link" style="font-size: 32px"></pk-icon>
      <code>link</code>
      <small>576×512 → square</small>
    </span>
  </div>

  <div data-pk-icon-align-row>
    <pk-button variant="outline">
      <pk-icon slot="start" icon="plus"></pk-icon>
      Flex slot (nudge off)
    </pk-button>
    <pk-button variant="outline" aria-label="More">
      <pk-icon slot="start" icon="ellipsis-vertical"></pk-icon>
    </pk-button>
    <pk-button variant="outline" aria-label="Reload">
      <pk-icon slot="start" icon="arrows-rotate"></pk-icon>
    </pk-button>
  </div>
</div>
`.trim(),
});
