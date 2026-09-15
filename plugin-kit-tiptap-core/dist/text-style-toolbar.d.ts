export type TiptapTextStyleOption = {
    label: string;
    value: string | null;
};
export type TiptapTextStyleColorOption = TiptapTextStyleOption & {
    value: string | null;
};
export type TiptapTextStyleToolbarConfig = {
    fontFamilies?: TiptapTextStyleOption[];
    fontSizes?: TiptapTextStyleOption[];
    textColors?: TiptapTextStyleColorOption[];
    backgroundColors?: TiptapTextStyleColorOption[];
    lineHeights?: TiptapTextStyleOption[];
};
export declare const DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG: Required<TiptapTextStyleToolbarConfig>;
export declare function resolveTiptapTextStyleToolbarConfig(config?: TiptapTextStyleToolbarConfig | null): Required<TiptapTextStyleToolbarConfig>;
//# sourceMappingURL=text-style-toolbar.d.ts.map