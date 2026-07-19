import Link from '@tiptap/extension-link';

/** Shared Tiptap link mark configuration for Plugin Kit editors. */
export function createLinkExtension() {
    return Link.configure({
        openOnClick: false,
        enableClickSelection: false,
        HTMLAttributes: { target: null, rel: null },
    });
}
