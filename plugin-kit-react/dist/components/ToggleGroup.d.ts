import { default as React } from 'react';
import { PkToggleGroup, PkToggleGroupOrientation } from '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js';
/** React facade over `<pk-toggle-group>`. Behavior and styles live in the web component. */
export declare const PkToggleGroupElement: import('@lit/react').ReactWebComponent<PkToggleGroup, {
    onPkValueChange: string;
}>;
export declare const ToggleGroup: import('@lit/react').ReactWebComponent<PkToggleGroup, {
    onPkValueChange: string;
}>;
export type ToggleGroupProps = React.ComponentProps<typeof PkToggleGroupElement>;
export type { PkToggleGroupOrientation };
//# sourceMappingURL=ToggleGroup.d.ts.map