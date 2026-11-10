import React from 'react';
import { PkSparkline } from '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-sparkline>`. Behaviour and styles live in the web component. */
export const PkSparklineElement = createPluginKitComponent({
    tagName: 'pk-sparkline',
    elementClass: PkSparkline,
    react: React,
});

export const Sparkline = PkSparklineElement;
export type SparklineProps = React.ComponentProps<typeof PkSparklineElement>;
