import type { ComponentType } from 'react';
import type { ComponentRegistryEntry } from '@verbb/plugin-kit-playground';

import { PlaygroundPage, PlaygroundSection, PreviewCard } from './playgroundLayouts.js';
import type { SurfacePreviewDefinition } from '../types.js';
import { reactBasicDemos } from '../basic-demos.js';

/** Minimal single-section preview for components without a dedicated workshop page yet. */
export function createBasicReactPreview(entry: ComponentRegistryEntry): SurfacePreviewDefinition {
    const Demo = reactBasicDemos[entry.id];

    return {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        Component: Demo
            ? function BasicReactPreviewPage() {
                return (
                    <PlaygroundPage
                        eyebrow="Components"
                        title={entry.title}
                        description={entry.description}
                    >
                        <PlaygroundSection
                            title="Basic usage"
                            description={`React facade over the matching <pk-${entry.id}> web component.`}
                        >
                            <PreviewCard>
                                <Demo />
                            </PreviewCard>
                        </PlaygroundSection>
                    </PlaygroundPage>
                );
            }
            : function MissingReactDemoPage() {
                return (
                    <PlaygroundPage
                        eyebrow="Components"
                        title={entry.title}
                        description={entry.description}
                    >
                        <PlaygroundSection
                            title="Basic usage"
                            description="Adapter exists — add a demo to react/basic-demos.tsx."
                        >
                            <PreviewCard>
                                <p className="pg-placeholder__meta">Demo not wired yet</p>
                            </PreviewCard>
                        </PlaygroundSection>
                    </PlaygroundPage>
                );
            },
    };
}

export type ReactBasicDemoMap = Partial<Record<string, ComponentType>>;
