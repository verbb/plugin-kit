export type TiptapTextStyleOption = {
    label: string;
    value: string | null;
};

export type TiptapTextStyleColorOption = TiptapTextStyleOption & {
    value: string | null;
};

export type TiptapTextStyleToolbarConfig = {
    fontFamilies?: TiptapTextStyleOption[];
    fontSizes?: TiptapTextStyleOption[];
    textColors?: TiptapTextStyleColorOption[];
    backgroundColors?: TiptapTextStyleColorOption[];
    lineHeights?: TiptapTextStyleOption[];
};

export const DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG: Required<TiptapTextStyleToolbarConfig> = {
    fontFamilies: [
        { label: 'Default font', value: null },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
        { label: 'Courier New', value: '"Courier New", monospace' },
    ],
    fontSizes: [
        { label: 'Default', value: null },
        ...[8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
            .map((size) => ({ label: String(size), value: `${size}px` })),
    ],
    textColors: [
        { label: 'Default', value: null },
        { label: 'Black', value: '#1f2937' },
        { label: 'Gray', value: '#6b7280' },
        { label: 'Red', value: '#dc2626' },
        { label: 'Orange', value: '#ea580c' },
        { label: 'Yellow', value: '#ca8a04' },
        { label: 'Green', value: '#16a34a' },
        { label: 'Blue', value: '#2563eb' },
        { label: 'Purple', value: '#9333ea' },
        { label: 'Pink', value: '#db2777' },
    ],
    backgroundColors: [
        { label: 'None', value: null },
        { label: 'Gray', value: '#f3f4f6' },
        { label: 'Red', value: '#fee2e2' },
        { label: 'Orange', value: '#ffedd5' },
        { label: 'Yellow', value: '#fef9c3' },
        { label: 'Green', value: '#dcfce7' },
        { label: 'Blue', value: '#dbeafe' },
        { label: 'Purple', value: '#f3e8ff' },
        { label: 'Pink', value: '#fce7f3' },
    ],
    lineHeights: [
        { label: 'Default', value: null },
        { label: 'Single (1.0)', value: '1' },
        { label: '1.15', value: '1.15' },
        { label: '1.5', value: '1.5' },
        { label: 'Double (2.0)', value: '2' },
    ],
};

export function resolveTiptapTextStyleToolbarConfig(
    config?: TiptapTextStyleToolbarConfig | null,
): Required<TiptapTextStyleToolbarConfig> {
    return {
        ...DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG,
        ...config,
    };
}
