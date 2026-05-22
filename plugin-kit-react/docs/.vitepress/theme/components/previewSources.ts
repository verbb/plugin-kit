import {
    normalizeCodeBlock,
    type NormalizedCodeBlock,
    type PreviewSourceDefinition,
} from './codeBlocks';

const previewModules = import.meta.glob('../../../**/*.preview.tsx');
const previewSourceModules = import.meta.glob('../../../**/*.preview.tsx', {
    query: '?raw',
    import: 'default',
});

type PreviewSourceModule = {
    default?: PreviewSourceDefinition | PreviewSourceDefinition[];
    preview?: PreviewSourceDefinition | PreviewSourceDefinition[];
};

function getRouteDirectory(routePath: string) {
    const sanitizedPath = routePath.split(/[?#]/, 1)[0] || '/';

    if (sanitizedPath.endsWith('/')) {
        return sanitizedPath;
    }

    return `${sanitizedPath.slice(0, sanitizedPath.lastIndexOf('/') + 1)}`;
}

function stripSiteBase(docPath: string, siteBase = '/') {
    if (siteBase === '/' || !docPath.startsWith(siteBase)) {
        return docPath;
    }

    return `/${docPath.slice(siteBase.length)}`;
}

function resolveDocPath(src: string, routePath: string, siteBase = '/') {
    if (src.startsWith('@/')) {
        return `/${src.slice(2)}`;
    }

    return stripSiteBase(new URL(src, `https://docs.local${getRouteDirectory(routePath)}`).pathname, siteBase);
}

function toModuleKey(docPath: string) {
    return `../../../${docPath.replace(/^\//, '')}`;
}

function normalizeModuleExport(
    exportedValue: PreviewSourceDefinition | PreviewSourceDefinition[] | undefined,
    keyBase: string,
    rawSource?: string,
) {
    const definitions = Array.isArray(exportedValue) ? exportedValue : exportedValue ? [exportedValue] : [];

    return definitions.map((definition, index) => normalizeCodeBlock({
        ...definition,
        code: resolveDefinitionCode(definition, rawSource),
        key: definitions.length > 1 ? `${keyBase}-${index}` : keyBase,
    }));
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSourceRegion(rawSource: string, regionName = 'example') {
    const regionPattern = new RegExp(
        `^\\s*//\\s*#region\\s+${escapeRegExp(regionName)}\\s*$([\\s\\S]*?)^\\s*//\\s*#endregion\\s+${escapeRegExp(regionName)}\\s*$`,
        'm',
    );
    const match = rawSource.match(regionPattern);

    return match?.[1]?.trim() || '';
}

function resolveDefinitionCode(definition: PreviewSourceDefinition, rawSource?: string) {
    if (definition.source && rawSource) {
        const regionName = typeof definition.source === 'string' ? definition.source : 'example';
        const source = extractSourceRegion(rawSource, regionName);

        if (source) {
            return source;
        }
    }

    return definition.code || '';
}

async function loadPreviewSource(src: string, routePath: string, siteBase: string, index: number) {
    const docPath = resolveDocPath(src, routePath, siteBase);
    const moduleKey = toModuleKey(docPath);
    const loader = previewModules[moduleKey];

    if (!loader) {
        console.warn(`[ComponentPreview] No preview source found for "${src}" resolved from "${routePath}".`);
        return [] as NormalizedCodeBlock[];
    }

    const module = await loader() as PreviewSourceModule;
    const rawLoader = previewSourceModules[moduleKey];
    const rawSource = rawLoader ? await rawLoader() as string : undefined;
    const exportedValue = module.default ?? module.preview;
    const keyBase = docPath.replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '') || `preview-${index}`;

    return normalizeModuleExport(exportedValue, keyBase, rawSource);
}

export async function resolvePreviewBlocks(src: string | string[], routePath: string, siteBase = '/') {
    const sources = Array.isArray(src) ? src : [src];
    const groups = await Promise.all(sources.map((source, index) => loadPreviewSource(source, routePath, siteBase, index)));

    return groups.flat();
}
