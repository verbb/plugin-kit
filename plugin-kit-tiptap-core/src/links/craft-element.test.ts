import { describe, expect, it } from 'vitest';
import {
    buildCraftElementLinkUrl,
    isCraftElementLink,
    parseCraftElementLink,
} from './craft-element.js';

describe('craft element links', () => {
    it('builds Craft element URLs with the standard ref fragment', () => {
        expect(buildCraftElementLinkUrl({
            url: 'https://example.com/blog/post',
            id: 42,
            siteId: 1,
        }, 'element')).toBe('https://example.com/blog/post#element:42@1');
    });

    it('parses Craft element URLs back into their parts', () => {
        expect(parseCraftElementLink('https://example.com/blog/post#element:42@1')).toEqual({
            baseUrl: 'https://example.com/blog/post',
            refHandle: 'element',
            id: 42,
            siteId: 1,
        });
    });

    it('detects Craft element links', () => {
        expect(isCraftElementLink('https://example.com#entry:9@2')).toBe(true);
        expect(isCraftElementLink('https://example.com/page')).toBe(false);
    });
});
