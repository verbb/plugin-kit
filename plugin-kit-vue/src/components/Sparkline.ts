import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';

/** Vue facade over `<pk-sparkline>`. Behaviour and styles live in the web component. */
export const Sparkline = createPkComponent({
    name: 'PkSparkline',
    tagName: 'pk-sparkline',
});

export const PkSparklineElement = Sparkline;

export type SparklineProps = Record<string, unknown>;
