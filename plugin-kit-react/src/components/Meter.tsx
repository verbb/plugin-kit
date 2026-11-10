import React from 'react';
import { PkMeter } from '@verbb/plugin-kit-web/components/chart/pk-meter.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-meter>`. Behaviour and styles live in the web component. */
export const PkMeterElement = createPluginKitComponent({
    tagName: 'pk-meter',
    elementClass: PkMeter,
    react: React,
});

export const Meter = PkMeterElement;
export type MeterProps = React.ComponentProps<typeof PkMeterElement>;
