import type { ComponentType } from 'react';

export type VisualTestDefinition = {
    id: string;
    title: string;
    description: string;
    Component: ComponentType;
};
