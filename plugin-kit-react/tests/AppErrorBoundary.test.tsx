import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { AppErrorBoundary } from '../src/utils/AppErrorBoundary.js';

describe('AppErrorBoundary', () => {
    it('renders its children before an error is caught', () => {
        const boundary = new AppErrorBoundary({ children: <span>Application content</span> });

        expect(renderToStaticMarkup(boundary.render())).toContain('Application content');
    });

    it('renders the shared error state with configured labels after an error', () => {
        const boundary = new AppErrorBoundary({
            children: <span>Application content</span>,
            heading: 'Builder unavailable',
            message: 'Reload the page to continue.',
            detailsLabel: 'Technical details',
            copyLabel: 'Copy technical details',
            reloadLabel: 'Reload',
            size: 'sm',
        });

        boundary.state = {
            hasError: true,
            error: new Error('Render failed'),
        };

        const markup = renderToStaticMarkup(boundary.render());

        expect(markup).toContain('<pk-state-panel');
        expect(markup).toContain('heading="Builder unavailable"');
        expect(markup).toContain('Reload the page to continue.');
        expect(markup).toContain('detailsLabel="Technical details"');
        expect(markup).toContain('copyLabel="Copy technical details"');
        expect(markup).toContain('size="sm"');
        expect(markup).toContain('Reload');
    });

    it('enters the fallback state when React reports a render error', () => {
        const error = new Error('Render failed');

        expect(AppErrorBoundary.getDerivedStateFromError(error)).toEqual({
            hasError: true,
            error,
        });
    });
});
