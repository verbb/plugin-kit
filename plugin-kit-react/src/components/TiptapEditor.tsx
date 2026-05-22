import {
    useEffect, useCallback, useMemo, useRef, useState,
} from 'react';
import type { ReactNode } from 'react';
import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import { getMarkRange, type Editor as TiptapEditorInstance } from '@tiptap/core';

import { Button } from '@verbb/plugin-kit-react/components';
import { LinkDropdown } from './tiptap/LinkDropdown';
import type { LinkOptions, LinkOptionsInput } from './tiptap/LinkDropdown';
import { VariableDropdown } from './tiptap/VariableDropdown';
import type { VariableOption, VariableCategories } from './tiptap/VariableDropdown';
import type { VariableTransformerRegistry } from './tiptap/VariablePickerContext';
import { VariablePickerProvider } from './tiptap/VariablePickerContext';
import { InlineVariablePickerPopover } from './tiptap/InlineVariablePickerPopover';
import { useInlineVariablePicker } from './tiptap/useInlineVariablePicker';

export type {
    LinkOptions, LinkOptionsInput, VariableOption, VariableCategories,
};
import { LinkBubbleMenu } from './tiptap/LinkBubbleMenu';
import { InsertLinkDialog } from './tiptap/InsertLinkDialog';

import {
    createTiptapExtensions,
    getFatalTiptapContentError,
    normalizeContentArray,
    valueToContent,
} from './tiptap/editorConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faArrowRotateLeft,
    faArrowRotateRight,
    faBold,
    faBracketsCurly,
    faCode,
    faH1,
    faH2,
    faH3,
    faH4,
    faH5,
    faH6,
    faHighlighter,
    faItalic,
    faListOl,
    faListUl,
    faMinus,
    faQuoteRight,
    faStrikethrough,
    faSubscript,
    faSuperscript,
    faTriangleExclamation,

    faUnderline,
    faTextSlash,
} from '@fortawesome/pro-solid-svg-icons';

import {
    faFileDashedLine,
    faTable,
} from '@fortawesome/pro-regular-svg-icons';

import { cn } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { Tooltip, TooltipContent, TooltipTrigger } from '@verbb/plugin-kit-react/components/Tooltip';

const MenuBar = ({
    editor,
    buttons = ['bold', 'italic'],
    linkOptions,
    linkSelectorStorageKeyPrefix,
    variableCategories = {},
    variableCategoryLabels,
    variableCategoryOrder,
    variablePickerOpen,
    onVariablePickerOpenChange,
    openInsertLinkDialog,
}: {
    editor: TiptapEditorInstance | null | undefined;
    buttons?: string[];
    linkOptions?: LinkOptionsInput;
    linkSelectorStorageKeyPrefix?: string;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variablePickerOpen?: boolean;
    onVariablePickerOpenChange?: (open: boolean) => void;
    openInsertLinkDialog?: (initial?: { url?: string; text?: string; from?: number; to?: number }) => void;
}) => {
    const t = useTranslation();

    if (!editor) {
        return null;
    }

    const hasAnyVariables = Object.values(variableCategories ?? {}).some(
        items => {
            return Array.isArray(items) && items.length > 0;
        },
    );

    const visibleButtons = buttons.filter((buttonName) => {
        if (buttonName === 'variableTag') {
            return hasAnyVariables;
        }

        return true;
    });

    const buttonConfig = {
        bold: {
            icon: FontAwesomeIcon,
            iconProp: faBold,
            title: t('Bold'),
            action: () => { return editor.chain().focus().toggleBold().run(); },
            isActive: () => { return editor.isActive('bold'); },
        },
        italic: {
            icon: FontAwesomeIcon,
            iconProp: faItalic,
            title: t('Italic'),
            action: () => { return editor.chain().focus().toggleItalic().run(); },
            isActive: () => { return editor.isActive('italic'); },
        },
        underline: {
            icon: FontAwesomeIcon,
            iconProp: faUnderline,
            title: t('Underline'),
            action: () => { return editor.chain().focus().toggleUnderline().run(); },
            isActive: () => { return editor.isActive('underline'); },
        },
        strikethrough: {
            icon: FontAwesomeIcon,
            iconProp: faStrikethrough,
            title: t('Strikethrough'),
            action: () => { return editor.chain().focus().toggleStrike().run(); },
            isActive: () => { return editor.isActive('strike'); },
        },
        subscript: {
            icon: FontAwesomeIcon,
            iconProp: faSubscript,
            title: t('Subscript'),
            action: () => { return editor.chain().focus().toggleSubscript().run(); },
            isActive: () => { return editor.isActive('subscript'); },
        },
        superscript: {
            icon: FontAwesomeIcon,
            iconProp: faSuperscript,
            title: t('Superscript'),
            action: () => { return editor.chain().focus().toggleSuperscript().run(); },
            isActive: () => { return editor.isActive('superscript'); },
        },
        'unordered-list': {
            icon: FontAwesomeIcon,
            iconProp: faListUl,
            title: t('Bullet List'),
            action: () => { return editor.chain().focus().toggleBulletList().run(); },
            isActive: () => { return editor.isActive('bulletList'); },
        },
        'ordered-list': {
            icon: FontAwesomeIcon,
            iconProp: faListOl,
            title: t('Ordered List'),
            action: () => { return editor.chain().focus().toggleOrderedList().run(); },
            isActive: () => { return editor.isActive('orderedList'); },
        },
        blockquote: {
            icon: FontAwesomeIcon,
            iconProp: faQuoteRight,
            title: t('Blockquote'),
            action: () => { return editor.chain().focus().toggleBlockquote().run(); },
            isActive: () => { return editor.isActive('blockquote'); },
        },
        highlight: {
            icon: FontAwesomeIcon,
            iconProp: faHighlighter,
            title: t('Highlight'),
            action: () => { return editor.chain().focus().toggleHighlight().run(); },
            isActive: () => { return editor.isActive('highlight'); },
        },
        code: {
            icon: FontAwesomeIcon,
            iconProp: faBracketsCurly,
            title: t('Inline Code'),
            action: () => { return editor.chain().focus().toggleCode().run(); },
            isActive: () => { return editor.isActive('code'); },
        },
        'code-block': {
            icon: FontAwesomeIcon,
            iconProp: faCode,
            title: t('Code Block'),
            action: () => { return editor.chain().focus().toggleCodeBlock().run(); },
            isActive: () => { return editor.isActive('codeBlock'); },
        },
        hr: {
            icon: FontAwesomeIcon,
            iconProp: faMinus,
            title: t('Horizontal Rule'),
            action: () => { return editor.chain().focus().setHorizontalRule().run(); },
        },
        'line-break': {
            icon: FontAwesomeIcon,
            iconProp: faFileDashedLine,
            title: t('Line Break'),
            action: () => { return editor.chain().focus().setHardBreak().run(); },
        },
        'align-left': {
            icon: FontAwesomeIcon,
            iconProp: faAlignLeft,
            title: t('Align Left'),
            action: () => { return editor.chain().focus().setTextAlign('left').run(); },
            isActive: () => { return editor.isActive({ textAlign: 'left' }); },
        },
        'align-center': {
            icon: FontAwesomeIcon,
            iconProp: faAlignCenter,
            title: t('Align Center'),
            action: () => { return editor.chain().focus().setTextAlign('center').run(); },
            isActive: () => { return editor.isActive({ textAlign: 'center' }); },
        },
        'align-right': {
            icon: FontAwesomeIcon,
            iconProp: faAlignRight,
            title: t('Align Right'),
            action: () => { return editor.chain().focus().setTextAlign('right').run(); },
            isActive: () => { return editor.isActive({ textAlign: 'right' }); },
        },
        'align-justify': {
            icon: FontAwesomeIcon,
            iconProp: faAlignJustify,
            title: t('Justify'),
            action: () => { return editor.chain().focus().setTextAlign('justify').run(); },
            isActive: () => { return editor.isActive({ textAlign: 'justify' }); },
        },
        'clear-format': {
            icon: FontAwesomeIcon,
            iconProp: faTextSlash,
            title: t('Clear Format'),
            action: () => { return editor.chain().focus().clearNodes().unsetAllMarks().run(); },
        },
        undo: {
            icon: FontAwesomeIcon,
            iconProp: faArrowRotateLeft,
            title: t('Undo'),
            action: () => { return editor.chain().focus().undo().run(); },
        },
        redo: {
            icon: FontAwesomeIcon,
            iconProp: faArrowRotateRight,
            title: t('Redo'),
            action: () => { return editor.chain().focus().redo().run(); },
        },
        link: {
            title: t('Link'),
            isActive: () => { return editor.isActive('link'); },
            isDropdown: true,
        },
        table: {
            icon: FontAwesomeIcon,
            iconProp: faTable,
            title: t('Insert Table'),
            action: () => { return editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); },
        },
        variableTag: {
            title: t('Insert Variable'),
            isActive: () => { return editor.isActive('variableTag'); },
            isDropdown: true,
        },
    };

    // Add heading levels h1–h6
    [1, 2, 3, 4, 5, 6].forEach((level) => {
        buttonConfig[`h${level}`] = {
            icon: FontAwesomeIcon,
            iconProp: {
                1: faH1,
                2: faH2,
                3: faH3,
                4: faH4,
                5: faH5,
                6: faH6,
            }[level],
            title: t('Heading {level}', { level: String(level) }),
            action: () => { return editor.chain().focus().toggleHeading({ level }).run(); },
            isActive: () => { return editor.isActive('heading', { level }); },
        };
    });

    const resolveIsActive = (config) => {
        if (!config.isActive) {
            return false;
        }
        return typeof config.isActive === 'function' ? config.isActive() : config.isActive;
    };

    const renderedButtons = visibleButtons
        .map((buttonName) => {
            const config = buttonConfig[buttonName];

            if (!config) { return null; }

            if (config.isDropdown && buttonName === 'link') {
                return (
                    <LinkDropdown
                        key={buttonName}
                        editor={editor}
                        linkOptions={linkOptions}
                        linkSelectorStorageKeyPrefix={linkSelectorStorageKeyPrefix}
                        openInsertLinkDialog={openInsertLinkDialog!}
                        title={config.title}
                    />
                );
            }

            if (config.isDropdown && buttonName === 'variableTag') {
                return (
                    <VariableDropdown
                        key={buttonName}
                        editor={editor}
                        variableCategories={variableCategories}
                        variableCategoryLabels={variableCategoryLabels}
                        variableCategoryOrder={variableCategoryOrder}
                        title={config.title}
                        open={variablePickerOpen}
                        onOpenChange={onVariablePickerOpenChange}
                    />
                );
            }

            const Icon = config.icon;

            return (
                <Tooltip key={buttonName}>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="transparent"
                                onClick={config.action}
                                className={cn(
                                    'w-[32px] h-[32px]',
                                    'text-[#1c2e36]',
                                    'hover:bg-slate-100!',
                                    resolveIsActive(config) && 'bg-slate-250! hover:bg-slate-250!',
                                )}
                            >
                                <Icon icon={config.iconProp} className="size-4" />
                            </Button>
                        }
                    />
                    <TooltipContent sideOffset={4}>{config.title}</TooltipContent>
                </Tooltip>
            );
        })
        .filter(Boolean);

    if (renderedButtons.length === 0) {
        return null;
    }

    return (
        <div className={cn(
            'flex flex-wrap relative z-10 gap-1 px-[8px] py-[4px]',
            'border-b border-[rgba(96,125,159,0.4)] bg-white',
            'shadow-[0_2px_3px_rgba(49,49,93,.07)]',
        )}>
            {renderedButtons}
        </div>
    );
};

type TiptapEditorProps = {
    value?: unknown;
    onChange?: (value: unknown) => void;
    placeholder?: string;
    buttons?: string[];
    tableOptions?: Array<{ rows?: number; cols?: number; withHeaderRow?: boolean }>;
    linkOptions?: LinkOptionsInput;
    linkSelectorStorageKeyPrefix?: string;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    variablePickerTriggerCharacters?: string[];
    toolbarContent?: (params: {
        editor: TiptapEditorInstance | null;
        variableCategories: VariableCategories;
        variableCategoryLabels?: Record<string, string>;
        variableCategoryOrder?: string[];
        variablePickerOpen: boolean;
        onVariablePickerOpenChange: (open: boolean) => void;
    }) => ReactNode;
    rows?: number;
    className?: string;
    isInvalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    invalidContentMessage?: string;
    [key: string]: unknown;
};

export const TiptapEditor = ({
    value = '',
    onChange,
    buttons = ['bold', 'italic'],
    tableOptions = [],
    linkOptions,
    linkSelectorStorageKeyPrefix,
    variableCategories = {},
    variableCategoryLabels,
    variableCategoryOrder,
    variableTransformerRegistry,
    variablePickerTriggerCharacters = ['@'],
    toolbarContent,
    rows,
    className,
    isInvalid,
    disabled = false,
    readOnly = false,
    invalidContentMessage,
    ...props
}: TiptapEditorProps) => {
    // Ensure value is a string and handle null/undefined
    // const safeValue = value || '';
    const t = useTranslation();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const handleKeyDownRef = useRef<import('./tiptap/useInlineVariablePicker').InlineVariablePickerHandleKeyDown | null>(null);

    const extensions = useMemo(() => {
        return createTiptapExtensions({ trailingCursorText: '\u2060' });
    }, []);
    const [isVariablePickerOpen, setIsVariablePickerOpen] = useState(false);
    const hasAnyVariables = useMemo(() => {
        return Object.values(variableCategories || {}).some((variables) => {
            return Array.isArray(variables) && variables.length > 0;
        });
    }, [variableCategories]);
    const editorContent = useMemo(() => {
        return valueToContent(value, { trailingCursorText: '\u2060' });
    }, [value]);
    const contentError = useMemo(() => {
        const detectedError = getFatalTiptapContentError(value);
        return detectedError ? (invalidContentMessage || detectedError) : '';
    }, [invalidContentMessage, value]);

    const serializeContent = (content: unknown) => {
        return normalizeContentArray(content);
    };

    const editor = useEditor({
        extensions,
        content: contentError ? null : editorContent,
        editable: !disabled && !readOnly,
        editorProps: {
            handleKeyDown: (view, event) => {
                return handleKeyDownRef.current?.(view, event) ?? false;
            },
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(serializeContent(editor.getJSON().content));
            }
        },
    });

    const inlinePicker = useInlineVariablePicker(editor, {
        variableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variablePickerTriggerCharacters,
        disabled,
        readOnly,
        wrapperRef,
        onOpenDropdown: () => {
            return setIsVariablePickerOpen(true);
        },
    });

    useEffect(() => {
        handleKeyDownRef.current = inlinePicker.handleKeyDown;
    }, [inlinePicker.handleKeyDown]);

    const [insertLinkDialogOpen, setInsertLinkDialogOpen] = useState(false);
    const [insertLinkInitialValues, setInsertLinkInitialValues] = useState<{ url?: string; text?: string; openInNewTab?: boolean; from?: number; to?: number } | undefined>();
    const editorMinHeight = useMemo(() => {
        const normalizedRows = Math.max(1, Number(rows || 0));
        const lineHeight = 24;
        const verticalPadding = 32;

        return `${(normalizedRows * lineHeight) + verticalPadding}px`;
    }, [rows]);

    useEffect(() => {
        if (!editor?.view?.dom) {
            return;
        }

        editor.view.dom.style.minHeight = editorMinHeight;
    }, [editor, editorMinHeight]);

    const openInsertLinkDialog = useCallback((initial?: { url?: string; text?: string; from?: number; to?: number }) => {
        if (initial) {
            const openInNewTab = editor?.isActive('link') ? editor.getAttributes('link').target === '_blank' : false;
            setInsertLinkInitialValues({ ...initial, openInNewTab });
        } else {
            setInsertLinkInitialValues(undefined);
        }
        setInsertLinkDialogOpen(true);
    }, [editor]);

    const insertLink = useCallback(
        (params: { url: string; text: string; openInNewTab: boolean; from?: number; to?: number }) => {
            if (!editor) { return; }
            const {
                url, text, openInNewTab, from: fromParam, to: toParam,
            } = params;
            const chain = editor.chain().focus();
            const linkAttrs: { href: string; target?: string | null } = { href: url };
            if (openInNewTab) {
                linkAttrs.target = '_blank';
            }

            const content = {
                type: 'text',
                text: text.trim() || url,
                marks: [{ type: 'link', attrs: linkAttrs }],
            };

            if (typeof fromParam === 'number' && typeof toParam === 'number' && fromParam !== toParam) {
                chain.insertContentAt({ from: fromParam, to: toParam }, [content]).run();
            } else {
                const { from, to } = editor.state.selection;
                const selectedText = editor.state.doc.textBetween(from, to, ' ');
                if (selectedText) {
                    chain.extendMarkRange('link').setLink(linkAttrs).run();
                } else {
                    chain.insertContent([content]).run();
                }
            }
        },
        [editor],
    );

    // Watch for value changes and update editor content
    useEffect(() => {
        if (editor) {
            const newContent = contentError ? null : editorContent;
            const currentContent = editor.getJSON();

            // Only update if content has actually changed
            if (JSON.stringify(newContent) !== JSON.stringify(currentContent)) {
                editor.commands.setContent(newContent);
            }
        }
    }, [contentError, editor, editorContent]);

    const handleLinkBubbleEdit = useCallback(() => {
        if (!editor) { return; }
        const { href } = editor.getAttributes('link');
        const { state } = editor;
        const linkType = state.schema.marks.link;
        const range = getMarkRange(state.selection.$from, linkType);
        const from = range?.from ?? state.selection.from;
        const to = range?.to ?? state.selection.to;
        const text = editor.state.doc.textBetween(from, to, ' ');
        openInsertLinkDialog({
            url: href, text, from, to,
        });
    }, [editor, openInsertLinkDialog]);

    return (
        <div className={cn(
            'border border-[rgba(96,125,159,0.4)] rounded-sm overflow-hidden',
            isInvalid && [
                'border-rose-600!',
                '[focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!',
            ],
            className,
        )}>
            <VariablePickerProvider
                variableCategories={variableCategories}
                variableCategoryLabels={variableCategoryLabels}
                variableCategoryOrder={variableCategoryOrder}
                variableTransformerRegistry={variableTransformerRegistry}
            >
                <EditorContext.Provider value={{ editor }}>
                    {toolbarContent ? (
                        toolbarContent({
                            editor,
                            variableCategories,
                            variableCategoryLabels,
                            variableCategoryOrder,
                            variablePickerOpen: isVariablePickerOpen,
                            onVariablePickerOpenChange: setIsVariablePickerOpen,
                        })
                    ) : (
                        <MenuBar
                            editor={editor}
                            buttons={buttons}
                            tableOptions={tableOptions}
                            linkOptions={linkOptions}
                            linkSelectorStorageKeyPrefix={linkSelectorStorageKeyPrefix}
                            variableCategories={variableCategories}
                            variableCategoryLabels={variableCategoryLabels}
                            variableCategoryOrder={variableCategoryOrder}
                            variablePickerOpen={isVariablePickerOpen}
                            onVariablePickerOpenChange={setIsVariablePickerOpen}
                            openInsertLinkDialog={openInsertLinkDialog}
                        />
                    )}

                    <div ref={wrapperRef} className="relative">
                        {contentError && (
                            <div className="flex items-start gap-2 border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">
                                <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 size-3.5 shrink-0" />
                                <p>{contentError}</p>
                            </div>
                        )}

                        <EditorContent
                            editor={editor}
                            className={cn(
                                '[&_.ProseMirror]:outline-none',
                                '[&_.ProseMirror]:min-h-8',
                                '[&_.ProseMirror]:p-4',
                                '[&_.ProseMirror]:bg-[#fbfcfe]',
                                '[&_.ProseMirror]:shadow-none',
                                '[&_.ProseMirror]:whitespace-pre-wrap',
                                '[&_.ProseMirror_p]:m-0 [&_.ProseMirror_p]:mb-2',
                                '[&_.ProseMirror_p:last-child]:mb-0',
                                '[&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-2',
                                '[&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:mb-2',
                                '[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-2',
                                '[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-2',
                                '[&_.ProseMirror_li]:mb-1',
                                '[&_.ProseMirror_hr]:border-slate-300 [&_.ProseMirror_hr]:my-4',
                                '[&_.ProseMirror_code]:bg-slate-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm',
                                '[&_.ProseMirror_pre]:bg-slate-100 [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:mb-2',
                                '[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-slate-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-slate-600 [&_.ProseMirror_blockquote]:mb-2',
                                '[&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:mb-2',
                                '[&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-slate-300 [&_.ProseMirror_th]:px-3 [&_.ProseMirror_th]:py-2 [&_.ProseMirror_th]:bg-slate-100 [&_.ProseMirror_th]:text-left',
                                '[&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-slate-300 [&_.ProseMirror_td]:px-3 [&_.ProseMirror_td]:py-2',
                                '[&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:cursor-pointer',
                            )}
                            {...props}
                        />

                        {hasAnyVariables && !readOnly && (
                            <InlineVariablePickerPopover
                                open={inlinePicker.state.open}
                                onOpenChange={(open) => {
                                    if (!open) {
                                        inlinePicker.closePicker();
                                    }
                                }}
                                position={{ top: inlinePicker.state.top, left: inlinePicker.state.left }}
                                isChildMode={inlinePicker.filteredVariables.isChildMode}
                                query={inlinePicker.state.query}
                                onQueryChange={inlinePicker.setQuery}
                                filteredVariables={inlinePicker.filteredVariables}
                                onSelect={inlinePicker.handleSelect}
                                onBack={inlinePicker.goBack}
                            />
                        )}
                    </div>

                    {buttons.includes('link') && editor && (
                        <LinkBubbleMenu
                            editor={editor}
                            onEdit={handleLinkBubbleEdit}
                            dialogOpen={insertLinkDialogOpen}
                        />
                    )}
                </EditorContext.Provider>

                <InsertLinkDialog
                    open={insertLinkDialogOpen}
                    onOpenChange={setInsertLinkDialogOpen}
                    initialValues={insertLinkInitialValues}
                    onInsert={(values) => {
                        insertLink({
                            ...values,
                            from: insertLinkInitialValues?.from,
                            to: insertLinkInitialValues?.to,
                        });
                        setInsertLinkDialogOpen(false);
                    }}
                />
            </VariablePickerProvider>
        </div >
    );
};
