import { default as React } from 'react';
import { PkToggle, PkToggleSize, PkToggleVariant } from '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
/** React facade over `<pk-toggle>`. Behavior and styles live in the web component. */
export declare const PkToggleElement: import('@lit/react').ReactWebComponent<PkToggle, {
    onPkPressedChange: string;
    onChange: string;
}>;
export declare const Toggle: import('@lit/react').ReactWebComponent<PkToggle, {
    onPkPressedChange: string;
    onChange: string;
}>;
export type ToggleProps = React.ComponentProps<typeof PkToggleElement>;
export type { PkToggleSize, PkToggleVariant };
//# sourceMappingURL=Toggle.d.ts.map