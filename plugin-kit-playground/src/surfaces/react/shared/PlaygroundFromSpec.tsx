import type { ReactNode } from 'react';
import type { PlaygroundSpec } from '@verbb/plugin-kit-playground';

import { PlaygroundPage, PlaygroundSection, PreviewCard } from './playgroundLayouts.js';

export type PlaygroundSectionReactRenderer = () => ReactNode;

export type PlaygroundSectionReactRendererMap = Record<string, PlaygroundSectionReactRenderer>;

type PlaygroundFromSpecProps = {
    spec: PlaygroundSpec;
    sectionRenderers: PlaygroundSectionReactRendererMap;
};

/**
 * Shared playground page shell — section order/copy comes from the spec;
 * each surface supplies real framework previews via sectionRenderers.
 */
export function PlaygroundFromSpec({ spec, sectionRenderers }: PlaygroundFromSpecProps) {
    return (
        <PlaygroundPage
            eyebrow={spec.meta.eyebrow}
            title={spec.meta.title}
            description={spec.meta.description}
        >
            {spec.sections.map((section) => {
                const renderPreview = sectionRenderers[section.id];

                return (
                    <PlaygroundSection
                        key={section.id}
                        title={section.title}
                        description={section.description}
                    >
                        <div className="pg-section__preview" data-section-id={section.id}>
                            {renderPreview ? (
                                section.bare ? (
                                    renderPreview()
                                ) : (
                                    <PreviewCard overflowVisible={section.overflowVisible}>
                                        {renderPreview()}
                                    </PreviewCard>
                                )
                            ) : null}
                        </div>
                    </PlaygroundSection>
                );
            })}
        </PlaygroundPage>
    );
}
