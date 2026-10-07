import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ErrorState } from '../src/utils/ErrorState.js';

describe('ErrorState', () => {
    it('keeps the supplied safe message visible and passes technical details to the shared panel', () => {
        const error = new Error('Sensitive implementation detail');
        error.stack = 'Error: Sensitive implementation detail\n    at renderBuilder (Builder.tsx:42:7)';

        const markup = renderToStaticMarkup(
            <ErrorState
                error={error}
                message="The builder failed to load. Please try again."
            />,
        );

        expect(markup).toContain('The builder failed to load. Please try again.');
        expect(markup).toContain('<pk-state-panel');
        expect(markup).toContain('slot="details"');
        expect(markup).toContain('Sensitive implementation detail');
        expect(markup.indexOf('The builder failed to load. Please try again.')).toBeLessThan(
            markup.indexOf('slot="details"'),
        );
    });

    it('falls back to the error message when no safe message is supplied', () => {
        const markup = renderToStaticMarkup(
            <ErrorState error={new Error('Fallback error message')} />,
        );

        expect(markup).toContain('Fallback error message');
    });

    it('passes a compact size through to the shared panel', () => {
        const markup = renderToStaticMarkup(
            <ErrorState
                error={new Error('Compact error')}
                size="sm"
            />,
        );

        expect(markup).toContain('size="sm"');
    });
});
