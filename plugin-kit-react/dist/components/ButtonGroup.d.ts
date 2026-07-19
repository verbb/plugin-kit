import { default as React } from 'react';
import { PkButtonGroup, PkButtonGroupOrientation } from '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import { PkButtonGroupSeparator, PkButtonGroupSeparatorOrientation } from '@verbb/plugin-kit-web/components/button-group/pk-button-group-separator.js';
import { PkButtonGroupText } from '@verbb/plugin-kit-web/components/button-group/pk-button-group-text.js';
/** React facade over `<pk-button-group>`. Behavior and styles live in the web component. */
export declare const PkButtonGroupElement: import('@lit/react').ReactWebComponent<PkButtonGroup, {}>;
export declare const PkButtonGroupSeparatorElement: import('@lit/react').ReactWebComponent<PkButtonGroupSeparator, {}>;
export declare const PkButtonGroupTextElement: import('@lit/react').ReactWebComponent<PkButtonGroupText, {}>;
export declare const ButtonGroup: import('@lit/react').ReactWebComponent<PkButtonGroup, {}>;
export declare const ButtonGroupSeparator: import('@lit/react').ReactWebComponent<PkButtonGroupSeparator, {}>;
export declare const ButtonGroupText: import('@lit/react').ReactWebComponent<PkButtonGroupText, {}>;
export type ButtonGroupProps = React.ComponentProps<typeof PkButtonGroupElement>;
export type ButtonGroupSeparatorProps = React.ComponentProps<typeof PkButtonGroupSeparatorElement>;
export type ButtonGroupTextProps = React.ComponentProps<typeof PkButtonGroupTextElement>;
export type { PkButtonGroupOrientation, PkButtonGroupSeparatorOrientation };
//# sourceMappingURL=ButtonGroup.d.ts.map