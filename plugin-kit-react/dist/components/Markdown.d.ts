import { ComponentProps } from 'react';
type MarkdownProps = Omit<ComponentProps<'div'>, 'dangerouslySetInnerHTML' | 'children'> & {
    content: string;
    /** When true (default), only inline markdown (bold, italic, links) is rendered. When false, full block markdown (headers, lists, etc.) is supported. */
    inline?: boolean;
    /** The HTML element to render as. Defaults to 'div' for block, 'span' for inline. */
    as?: 'div' | 'span' | 'p';
};
export declare const Markdown: import('react').ForwardRefExoticComponent<Omit<MarkdownProps, "ref"> & import('react').RefAttributes<HTMLDivElement | HTMLParagraphElement | HTMLSpanElement>>;
export {};
//# sourceMappingURL=Markdown.d.ts.map