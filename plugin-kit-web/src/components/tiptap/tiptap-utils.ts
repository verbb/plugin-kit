import type {
    ElementSelectorHost,
    LinkOptionsInput,
    ToolbarNode,
} from '@verbb/plugin-kit-tiptap-core';
import { parseToolbarConfig } from '@verbb/plugin-kit-tiptap-core';

declare global {
    interface Window {
        Craft?: {
            createElementSelectorModal?: ElementSelectorHost['openElementSelector'];
        };
    }
}

export function createCraftElementSelectorHost(): ElementSelectorHost {
    return {
        openElementSelector: (elementType, options) => {
            const craft = window.Craft;

            if (!craft?.createElementSelectorModal) {
                throw new Error('Craft element selector is not available in this environment.');
            }

            // Craft reads its selector registry through `this`, so preserve the global as receiver.
            craft.createElementSelectorModal(elementType, options);
        },
    };
}

export function parseLinkOptionsAttribute(raw: string | null): LinkOptionsInput | undefined {
    if (!raw) {
        return undefined;
    }

    try {
        return JSON.parse(raw) as LinkOptionsInput;
    } catch {
        return undefined;
    }
}

export function parseButtonsAttribute(raw: string | null | undefined): string[] {
    if (!raw) {
        return ['bold', 'italic'];
    }

    return raw
        .split(',')
        .map((button) => button.trim())
        .filter(Boolean);
}

export function parseToolbarAttribute(
    toolbarRaw: string | ToolbarNode[] | null | undefined,
    buttonsRaw: string | string[] | null | undefined,
): ToolbarNode[] {
    if (Array.isArray(toolbarRaw)) {
        return parseToolbarConfig(toolbarRaw);
    }

    if (typeof toolbarRaw === 'string' && toolbarRaw.trim()) {
        return parseToolbarConfig(toolbarRaw);
    }

    if (Array.isArray(buttonsRaw)) {
        return parseToolbarConfig(buttonsRaw.join(','));
    }

    return parseToolbarConfig(buttonsRaw ?? 'bold,italic');
}
