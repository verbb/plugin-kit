export type HighlightPart = {
    text: string;
    match: boolean;
};
/** Split label text into matched/unmatched segments for typeahead highlighting. */
export declare function splitHighlightParts(text: string, search: string): HighlightPart[];
//# sourceMappingURL=highlight-text.d.ts.map