import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkLightswitch, type PkLightswitchSize } from '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';

import { readPkCheckedDetail } from '../utils/pk-change.js';

const PkLightswitchElement = createPluginKitComponent({
    tagName: 'pk-lightswitch',
    elementClass: PkLightswitch,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onInput: 'input',
        onChange: 'change',
    },
});

export type LightswitchProps = React.ComponentProps<typeof PkLightswitchElement> & {
    /** Controlled checked updates — unwraps `pk-change` `detail.checked`. */
    onCheckedChange?: (checked: boolean) => void;
};

/** React facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
export function Lightswitch({
    onCheckedChange,
    onPkChange,
    ...props
}: LightswitchProps) {
    const handlePkChange = (event: Event): void => {
        onPkChange?.(event as Parameters<NonNullable<LightswitchProps['onPkChange']>>[0]);
        onCheckedChange?.(readPkCheckedDetail(event));
    };

    return (
        <PkLightswitchElement
            {...props}
            {...(onCheckedChange || onPkChange ? { onPkChange: handlePkChange } : {})}
        />
    );
}

export { PkLightswitchElement };
export type { PkLightswitchSize };
