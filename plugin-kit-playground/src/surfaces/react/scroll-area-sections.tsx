import { ScrollArea } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from scrollAreaPlaygroundSpec. */
export const scrollAreaReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <ScrollArea style={{ height: '12rem', width: '100%', maxWidth: '24rem' }}>
            <div style={{ padding: '0.75rem' }}>
                {Array.from({ length: 20 }, (_, index) => (
                    <p
                        key={index}
                        style={{
                            margin: '0 0 0.75rem',
                            fontSize: 14,
                            color: 'var(--pk-color-gray-600)',
                        }}
                    >
                        {`Scrollable row ${index + 1} — long content inside a constrained scroll region.`}
                    </p>
                ))}
            </div>
        </ScrollArea>
    ),
};
