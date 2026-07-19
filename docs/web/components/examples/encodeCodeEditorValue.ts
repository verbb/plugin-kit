/** HTML-attribute-encode so multi-line samples survive inside a `value="…"` attribute. */
export function encodeCodeEditorValue(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '&#10;')
        .replace(/\t/g, '&#9;');
}
