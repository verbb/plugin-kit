import { Extension } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontVariantCaps: {
            setSmallCaps: () => ReturnType;
            unsetSmallCaps: () => ReturnType;
            toggleSmallCaps: () => ReturnType;
        };
    }
}
declare module '@tiptap/extension-text-style' {
    interface TextStyleAttributes {
        fontVariantCaps?: 'small-caps' | null;
    }
}
/** A deliberately narrow TextStyle attribute; arbitrary CSS values are never persisted. */
export declare const FontVariantCaps: Extension<any, any>;
//# sourceMappingURL=font-variant-caps.d.ts.map