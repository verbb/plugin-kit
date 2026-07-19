export type CodeEditorLanguage = 'html' | 'text' | 'javascript' | 'css' | 'json';

export const CODE_EDITOR_LINE_HEIGHT_PX = 18;

export function computeCodeEditorMinHeight(rows = 12): string {
    const normalizedRows = Math.max(Number(rows) || 12, 4);

    return `${normalizedRows * CODE_EDITOR_LINE_HEIGHT_PX + 12}px`;
}
