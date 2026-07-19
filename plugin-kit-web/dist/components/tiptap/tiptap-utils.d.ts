import { ElementSelectorHost, LinkOptionsInput, ToolbarNode } from '@verbb/plugin-kit-tiptap-core';
declare global {
    interface Window {
        Craft?: {
            createElementSelectorModal?: ElementSelectorHost['openElementSelector'];
        };
    }
}
export declare function createCraftElementSelectorHost(): ElementSelectorHost;
export declare function parseLinkOptionsAttribute(raw: string | null): LinkOptionsInput | undefined;
export declare function parseButtonsAttribute(raw: string | null | undefined): string[];
export declare function parseToolbarAttribute(toolbarRaw: string | ToolbarNode[] | null | undefined, buttonsRaw: string | string[] | null | undefined): ToolbarNode[];
//# sourceMappingURL=tiptap-utils.d.ts.map