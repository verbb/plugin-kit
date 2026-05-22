import { type ComponentProps, type Ref, forwardRef } from 'react';
import { renderMarkdown, renderInlineMarkdown } from '@verbb/plugin-kit-react/utils';
import { cn } from '@verbb/plugin-kit-react/utils';

type MarkdownProps = Omit<ComponentProps<'div'>, 'dangerouslySetInnerHTML' | 'children'> & {
    content: string;
    /** When true (default), only inline markdown (bold, italic, links) is rendered. When false, full block markdown (headers, lists, etc.) is supported. */
    inline?: boolean;
    /** The HTML element to render as. Defaults to 'div' for block, 'span' for inline. */
    as?: 'div' | 'span' | 'p';
};

export const Markdown = forwardRef<HTMLDivElement | HTMLSpanElement | HTMLParagraphElement, MarkdownProps>(
    ({
        content, inline = true, as, className, ...props
    }, ref) => {
        let html = '';
        if (content) {
            html = inline ? renderInlineMarkdown(content) : renderMarkdown(content);
        }

        const Component = as ?? (inline ? 'span' : 'div');

        if (!html) {
            return null;
        }

        if (Component === 'span') {
            return (
                <span
                    ref={ref as Ref<HTMLSpanElement>}
                    className={cn([
                        '[&_a]:text-blue-500 [&_a]:hover:underline',
                        '[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700',

                        className,
                    ])}
                    dangerouslySetInnerHTML={{ __html: html }}
                    {...props}
                />
            );
        }

        if (Component === 'p') {
            return (
                <p
                    ref={ref as Ref<HTMLParagraphElement>}
                    className={cn([
                        '[&_a]:text-blue-500 [&_a]:hover:underline',
                        '[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700',

                        className,
                    ])}
                    dangerouslySetInnerHTML={{ __html: html }}
                    {...props}
                />
            );
        }

        return (
            <div
                ref={ref as Ref<HTMLDivElement>}
                className={cn([
                    '[&_a]:text-blue-500 [&_a]:hover:underline',
                    '[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700',

                    className,
                ])}
                dangerouslySetInnerHTML={{ __html: html }}
                {...props}
            />
        );
    },
);

Markdown.displayName = 'Markdown';
