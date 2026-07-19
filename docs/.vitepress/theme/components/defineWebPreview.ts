import type { WebPreviewSourceDefinition } from './codeBlocks';

/** Build a web-component preview definition for `<ComponentPreview>`. */
export function defineWebPreview(
    definition: Omit<WebPreviewSourceDefinition, 'kind' | 'language'> & {
        language?: string;
    },
): WebPreviewSourceDefinition {
    return {
        kind: 'web',
        language: definition.language ?? 'html',
        ...definition,
    };
}
