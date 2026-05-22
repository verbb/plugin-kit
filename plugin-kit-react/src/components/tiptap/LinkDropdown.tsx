import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@verbb/plugin-kit-react/components/DropdownMenu';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@verbb/plugin-kit-react/components/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { cn, hostOpenElementSelector } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

export type LinkElementConfig = {
    elementType: string;
    refHandle: string;
    sources?: string[];
    criteria?: Record<string, unknown>;
};

export type LinkOptionSchemaItem = LinkElementConfig & {
    optionTitle: string;
};

export type LinkOptions = {
    elementSiteId?: number;
    linkToEntry?: LinkElementConfig;
    linkToAsset?: LinkElementConfig;
    linkToCategory?: LinkElementConfig;
};

/** linkOptions can be the object format above, or an array from schema: { optionTitle, elementType, refHandle, sources?, criteria? }[] */
export type LinkOptionsInput = LinkOptions | LinkOptionSchemaItem[];

type LinkDropdownProps = {
    editor: Editor | null | undefined;
    linkOptions?: LinkOptionsInput;
    linkSelectorStorageKeyPrefix?: string;
    openInsertLinkDialog: (initial?: { url?: string; text?: string; from?: number; to?: number }) => void;
    title?: string;
};

declare global {
    interface Window {
        Craft?: {
            createElementSelectorModal?: (
                elementType: string,
                options: {
                    storageKey: string;
                    sources?: string[];
                    criteria?: Record<string, unknown>;
                    defaultSiteId?: number;
                    autoFocusSearchBox?: boolean;
                    onSelect: (elements: Array<{ url?: string; label?: string; id?: number; siteId?: number }>) => void;
                    closeOtherModals?: boolean;
                },
            ) => void;
        };
    }
}

function openCraftElementModal(
    config: LinkElementConfig,
    elementSiteId: number | undefined,
    linkSelectorStorageKeyPrefix: string | undefined,
    onSelect: (url: string, text: string) => void,
    getSelectedText: () => string,
) {
    if (!linkSelectorStorageKeyPrefix) {
        throw new Error('LinkDropdown requires "linkSelectorStorageKeyPrefix" when using element selector links.');
    }

    hostOpenElementSelector(config.elementType, {
        storageKey: `${linkSelectorStorageKeyPrefix}.${config.elementType}`,
        sources: config.sources,
        criteria: config.criteria,
        defaultSiteId: elementSiteId,
        autoFocusSearchBox: false,
        onSelect: (elements) => {
            if (elements?.length) {
                const [element] = elements;
                const url = `${element.url || ''}#${config.refHandle}:${element.id}@${element.siteId}`;
                const text = getSelectedText() || element.label || '';
                onSelect(url, text);
            }
        },
        closeOtherModals: false,
    });
}

function isLinkOptionsArray(value: LinkOptionsInput | undefined): value is LinkOptionSchemaItem[] {
    return Array.isArray(value) && value.length > 0;
}

function getCraftOptionsFromLinkOptions(linkOptions: LinkOptionsInput | undefined): LinkOptionSchemaItem[] {
    if (!linkOptions) {
        return [];
    }
    if (isLinkOptionsArray(linkOptions)) {
        return linkOptions;
    }
    const items: LinkOptionSchemaItem[] = [];
    if (linkOptions.linkToEntry) {
        items.push({ ...linkOptions.linkToEntry, optionTitle: 'Link to an entry' });
    }
    if (linkOptions.linkToAsset) {
        items.push({ ...linkOptions.linkToAsset, optionTitle: 'Link to an asset' });
    }
    if (linkOptions.linkToCategory) {
        items.push({ ...linkOptions.linkToCategory, optionTitle: 'Link to a category' });
    }
    return items;
}

export function LinkDropdown({
    editor,
    linkOptions = {},
    linkSelectorStorageKeyPrefix,
    openInsertLinkDialog,
    title,
}: LinkDropdownProps) {
    const t = useTranslation();
    const craftOptions = getCraftOptionsFromLinkOptions(linkOptions);
    const elementSiteId = !isLinkOptionsArray(linkOptions) ? linkOptions?.elementSiteId : undefined;

    const getSelectedText = () => {
        if (!editor) {
            return '';
        }
        const { from, to } = editor.state.selection;
        return editor.state.doc.textBetween(from, to, ' ');
    };

    const handleCraftElementSelect = (url: string, text: string) => {
        openInsertLinkDialog({ url, text });
    };

    const handleCraftOption = (config: LinkElementConfig) => {
        openCraftElementModal(
            config,
            elementSiteId,
            linkSelectorStorageKeyPrefix,
            handleCraftElementSelect,
            getSelectedText,
        );
    };

    const handleLinkToEntry = () => {
        const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToEntry : undefined;
        if (config) {
            handleCraftOption(config);
        } else {
            openInsertLinkDialog();
        }
    };

    const handleLinkToAsset = () => {
        const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToAsset : undefined;
        if (config) {
            handleCraftOption(config);
        } else {
            openInsertLinkDialog();
        }
    };

    const handleLinkToCategory = () => {
        const config = !isLinkOptionsArray(linkOptions) ? linkOptions?.linkToCategory : undefined;
        if (config) {
            handleCraftOption(config);
        } else {
            openInsertLinkDialog();
        }
    };

    const handleUnlink = () => {
        editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    };

    const isLinkActive = useEditorState({
        editor,
        selector: ({ editor: ed }) => {
            return (ed?.isFocused && ed?.isActive('link')) ?? false;
        },
    });

    const showCraftOptionsFromObject = !isLinkOptionsArray(linkOptions) && (linkOptions?.linkToEntry || linkOptions?.linkToAsset || linkOptions?.linkToCategory);
    const showCraftOptions = showCraftOptionsFromObject || craftOptions.length > 0;

    const triggerButton = (
        <Button
            variant="transparent"
            className={cn(
                'w-[32px] h-[32px]',
                'text-[#1c2e36]',
                'hover:bg-slate-100!',
                isLinkActive && 'bg-slate-250! hover:bg-slate-250!',
            )}
        >
            <FontAwesomeIcon icon={faLink} className="size-4" />
        </Button>
    );

    return (
        <DropdownMenu>
            {title ? (
                <Tooltip>
                    <TooltipTrigger render={<DropdownMenuTrigger render={triggerButton} />} />
                    <TooltipContent sideOffset={4}>{title}</TooltipContent>
                </Tooltip>
            ) : (
                <DropdownMenuTrigger render={triggerButton} />
            )}
                <DropdownMenuContent align="start" side="bottom">
                    {showCraftOptions && (
                        <>
                            {craftOptions.length > 0 ? (
                                craftOptions.map((option, index) => {
                                    return (
                                        <DropdownMenuItem
                                            key={index}
                                            onClick={() => { return handleCraftOption(option); }}
                                        >
                                            {option.optionTitle}
                                        </DropdownMenuItem>
                                    );
                                })
                            ) : (
                                <>
                                    {!isLinkOptionsArray(linkOptions) && linkOptions?.linkToEntry && (
                                        <DropdownMenuItem onClick={handleLinkToEntry}>
                                            {t('Link to an entry')}
                                        </DropdownMenuItem>
                                    )}
                                    {!isLinkOptionsArray(linkOptions) && linkOptions?.linkToAsset && (
                                        <DropdownMenuItem onClick={handleLinkToAsset}>
                                            {t('Link to an asset')}
                                        </DropdownMenuItem>
                                    )}
                                    {!isLinkOptionsArray(linkOptions) && linkOptions?.linkToCategory && (
                                        <DropdownMenuItem onClick={handleLinkToCategory}>
                                            {t('Link to a category')}
                                        </DropdownMenuItem>
                                    )}
                                </>
                            )}
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem onClick={() => {
                        const selected = getSelectedText();
                        const { from, to } = editor?.state.selection ?? {};
                        const hasSelection = typeof from === 'number' && typeof to === 'number' && from !== to;
                        openInsertLinkDialog(hasSelection ? { text: selected, from, to } : undefined);
                    }}>
                        {t('Insert Link')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleUnlink}
                        disabled={!isLinkActive}
                        className={!isLinkActive ? 'opacity-50' : ''}
                    >
                        {t('Unlink')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    );
}
