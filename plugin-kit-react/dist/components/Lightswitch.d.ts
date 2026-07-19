import { default as React } from 'react';
import { PkLightswitch, PkLightswitchSize } from '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
declare const PkLightswitchElement: import('@lit/react').ReactWebComponent<PkLightswitch, {
    onPkChange: string;
    onInput: string;
    onChange: string;
}>;
export type LightswitchProps = React.ComponentProps<typeof PkLightswitchElement> & {
    /** Controlled checked updates — unwraps `pk-change` `detail.checked`. */
    onCheckedChange?: (checked: boolean) => void;
};
/** React facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
export declare function Lightswitch({ onCheckedChange, onPkChange, ...props }: LightswitchProps): import("react/jsx-runtime").JSX.Element;
export { PkLightswitchElement };
export type { PkLightswitchSize };
//# sourceMappingURL=Lightswitch.d.ts.map