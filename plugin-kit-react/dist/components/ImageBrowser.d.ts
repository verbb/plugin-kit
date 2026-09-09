import { default as React } from 'react';
import { PkImageBrowser, PkImageBrowserGroup, PkImageBrowserItem, PkImageBrowserLabelMode, PkImageBrowserMode, PkImageBrowserSize, PkImageBrowserWidth } from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';
declare const PkImageBrowserElement: import('@lit/react').ReactWebComponent<PkImageBrowser, {
    onPkChange: string;
    onPkClear: string;
    onInput: string;
    onNativeChange: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
}>;
type PkImageBrowserElementProps = React.ComponentProps<typeof PkImageBrowserElement>;
export type ImageBrowserProps = Omit<PkImageBrowserElementProps, 'onChange'> & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** React/Formie alias for the Lit `readonly` property. */
    readOnly?: boolean;
    /** Controlled value callback — sugar over `onPkChange` detail. */
    onChange?: (value: string) => void;
};
/** React facade over `<pk-image-browser>`. Behavior and styles live in the web component. */
export declare const ImageBrowser: React.ForwardRefExoticComponent<Omit<ImageBrowserProps, "ref"> & React.RefAttributes<PkImageBrowser>>;
export { PkImageBrowserElement };
export type { PkImageBrowserGroup, PkImageBrowserItem, PkImageBrowserLabelMode, PkImageBrowserMode, PkImageBrowserSize, PkImageBrowserWidth, };
//# sourceMappingURL=ImageBrowser.d.ts.map