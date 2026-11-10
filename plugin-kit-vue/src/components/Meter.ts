import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-meter.js';

/** Vue facade over `<pk-meter>`. Behaviour and styles live in the web component. */
export const Meter = createPkComponent({
    name: 'PkMeter',
    tagName: 'pk-meter',
});

export const PkMeterElement = Meter;

export type MeterProps = Record<string, unknown>;
