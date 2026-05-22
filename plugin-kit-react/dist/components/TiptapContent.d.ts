import { EditorContent } from '@tiptap/react';
import { ComponentProps } from 'react';
type TiptapContentProps = Omit<ComponentProps<typeof EditorContent>, 'editor'> & {
    value?: unknown;
    className?: string;
};
export declare const TiptapContent: ({ value, className, ...props }: TiptapContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TiptapContent.d.ts.map