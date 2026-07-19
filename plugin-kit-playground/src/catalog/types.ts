export type PlaygroundSectionSpec = {
    id: string;
    title: string;
    description: string;
    /** When true, preview renders without the default card wrapper. */
    bare?: boolean;
    /** When true, card allows overflow for portaled overlays (dropdown, popover). */
    overflowVisible?: boolean;
};

export type PlaygroundSpec = {
    meta: {
        eyebrow: string;
        title: string;
        description: string;
    };
    sections: readonly PlaygroundSectionSpec[];
};

export type PlaygroundSectionRenderer = (preview: HTMLElement) => void;

export type PlaygroundSectionRendererMap = Record<string, PlaygroundSectionRenderer>;
