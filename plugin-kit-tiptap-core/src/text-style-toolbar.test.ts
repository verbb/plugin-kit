import { describe, expect, it } from 'vitest';

import {
    DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG,
    resolveTiptapTextStyleToolbarConfig,
} from './text-style-toolbar.js';

describe('TextStyle toolbar configuration', () => {
    it('uses defaults and allows each option family to be replaced', () => {
        const fontFamilies = [{ label: 'Brand', value: 'Brand Sans' }];
        const resolved = resolveTiptapTextStyleToolbarConfig({ fontFamilies });

        expect(resolved.fontFamilies).toBe(fontFamilies);
        expect(resolved.fontSizes).toBe(DEFAULT_TIPTAP_TEXT_STYLE_TOOLBAR_CONFIG.fontSizes);
        expect(resolved.textColors[0]).toEqual({ label: 'Default', value: null });
    });
});
