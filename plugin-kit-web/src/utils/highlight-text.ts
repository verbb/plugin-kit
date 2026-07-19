export type HighlightPart = {
    text: string;
    match: boolean;
};

/** Split label text into matched/unmatched segments for typeahead highlighting. */
export function splitHighlightParts(text: string, search: string): HighlightPart[] {
    const label = String(text ?? '');
    const query = String(search ?? '').trim();

    if (!query) {
        return [{ text: label, match: false }];
    }

    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const parts: HighlightPart[] = [];
    let cursor = 0;
    let matchIndex = lowerLabel.indexOf(lowerQuery);

    while (matchIndex !== -1) {
        if (matchIndex > cursor) {
            parts.push({
                text: label.slice(cursor, matchIndex),
                match: false,
            });
        }

        parts.push({
            text: label.slice(matchIndex, matchIndex + query.length),
            match: true,
        });

        cursor = matchIndex + query.length;
        matchIndex = lowerLabel.indexOf(lowerQuery, cursor);
    }

    if (cursor < label.length) {
        parts.push({
            text: label.slice(cursor),
            match: false,
        });
    }

    return parts.length > 0 ? parts : [{ text: label, match: false }];
}
