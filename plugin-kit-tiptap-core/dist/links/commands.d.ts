import { Editor } from '@tiptap/core';
import { InsertLinkParams, LinkEditState, LinkMarkAttributes } from './types.js';
export declare function buildLinkMarkAttributes(url: string, openInNewTab: boolean): LinkMarkAttributes;
export declare function getSelectedText(editor: Editor): string;
export declare function getLinkOpenInNewTab(editor: Editor): boolean;
export declare function getLinkEditState(editor: Editor): LinkEditState;
export declare function applyLinkToEditor(editor: Editor, params: InsertLinkParams): void;
export declare function unsetLinkFromEditor(editor: Editor): void;
//# sourceMappingURL=commands.d.ts.map