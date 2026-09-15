import { TiptapToolbarIcon } from './registry.js';
declare const SAFE_TEXT_STYLE_VALUES: {
    readonly 'font-variant-caps': Set<string>;
    readonly 'text-transform': Set<string>;
};
export type TiptapTextStyleCssProperty = keyof typeof SAFE_TEXT_STYLE_VALUES;
export type TiptapTextStyleDefinition = {
    /** Stable toolbar ID, such as `acme-uppercase`. */
    id: string;
    label: string;
    /** Camel-cased attribute stored on the existing `textStyle` mark. */
    attribute: string;
    cssProperty: TiptapTextStyleCssProperty;
    allowedValues: string[];
    /** The allowed value toggled by this toolbar control. */
    toolbarValue: string;
    icon?: TiptapToolbarIcon;
};
/**
 * Register a serializable, allowlisted TextStyle attribute and its toolbar toggle.
 * Register before mounting an editor or renderer; the returned disposer removes both entries.
 */
export declare function registerTiptapTextStyleDefinition(definition: TiptapTextStyleDefinition): () => void;
export {};
//# sourceMappingURL=text-style-definition.d.ts.map