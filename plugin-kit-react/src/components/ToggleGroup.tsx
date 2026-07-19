import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkToggleGroup, type PkToggleGroupOrientation } from '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js';

/** React facade over `<pk-toggle-group>`. Behavior and styles live in the web component. */
export const PkToggleGroupElement = createPluginKitComponent({
    tagName: 'pk-toggle-group',
    elementClass: PkToggleGroup,
    react: React,
    events: {
        onPkValueChange: 'pk-value-change',
    },
});

export const ToggleGroup = PkToggleGroupElement;
export type ToggleGroupProps = React.ComponentProps<typeof PkToggleGroupElement>;
export type { PkToggleGroupOrientation };
