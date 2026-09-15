import { Extension } from '@tiptap/core';
import type { RawCommands } from '@tiptap/core';

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
export const FontVariantCaps = Extension.create({
    name: 'fontVariantCaps',

    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    fontVariantCaps: {
                        default: null,
                        parseHTML: (element: HTMLElement) => (
                            element.style.fontVariantCaps === 'small-caps' ? 'small-caps' : null
                        ),
                        renderHTML: (attributes: Record<string, unknown>) => (
                            attributes.fontVariantCaps === 'small-caps'
                                ? { style: 'font-variant-caps: small-caps' }
                                : {}
                        ),
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setSmallCaps: () => ({ chain }) => (
                chain().setMark('textStyle', { fontVariantCaps: 'small-caps' }).run()
            ),
            unsetSmallCaps: () => ({ chain }) => (
                chain()
                    .setMark('textStyle', { fontVariantCaps: null })
                    .removeEmptyTextStyle()
                    .run()
            ),
            toggleSmallCaps: () => ({ editor, commands }) => (
                editor.isActive('textStyle', { fontVariantCaps: 'small-caps' })
                    ? commands.unsetSmallCaps()
                    : commands.setSmallCaps()
            ),
        } as Partial<RawCommands>;
    },
});
