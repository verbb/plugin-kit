import type { ComponentType } from 'react';

/** One React surface page in the workshop (component id → preview component). */
export type SurfacePreviewDefinition = {
    id: string;
    title: string;
    description?: string;
    Component: ComponentType;
};
