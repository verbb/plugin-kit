import type { ReactElement } from 'react';
import type { VNode } from 'vue';

export type HighlightInput = string | number[] | undefined;

export type CodeBlockTabInput = {
    label?: string;
    title?: string;
    filename?: string;
    icon?: string;
    language?: string;
    code: string;
    lines?: boolean;
    wrap?: boolean;
    highlight?: HighlightInput;
    note?: string;
};

export type CodeBlockSource = {
    code?: string;
    language?: string;
    title?: string;
    filename?: string;
    icon?: string;
    lines?: boolean;
    wrap?: boolean;
    highlight?: HighlightInput;
    tabs?: CodeBlockTabInput[];
    note?: string;
};

export type WebPreviewLayout = 'row' | 'stack' | 'plain';

/** Optional post-mount hook for interactive web previews. May return a disposer. */
export type WebPreviewEnhance = (root: HTMLElement) => void | (() => void);

export type NormalizedCodeBlock = {
    key: string;
    tabLabel: string;
    headerLabel: string;
    icon?: string;
    language: string;
    code: string;
    lines: boolean;
    wrap: boolean;
    highlightLines: number[];
    note?: string;
    /** React preview mount (legacy / adapter docs). */
    render?: () => ReactElement;
    /** Vue preview mount (Vue adapter docs). */
    vueRender?: () => VNode;
    /** Web component preview HTML (canonical web docs). */
    html?: string;
    layout?: WebPreviewLayout;
    kind?: 'react' | 'web' | 'vue';
    enhance?: WebPreviewEnhance;
};

export type ReactPreviewSourceDefinition = Omit<CodeBlockTabInput, 'code'> & {
    code?: string;
    kind?: 'react';
    render: () => ReactElement;
    source?: boolean | string;
};

export type WebPreviewSourceDefinition = Omit<CodeBlockTabInput, 'code'> & {
    code?: string;
    kind: 'web';
    /** Markup injected into the preview host (custom elements must already be registered). */
    html: string;
    layout?: WebPreviewLayout;
    source?: boolean | string;
    /**
     * Optional post-mount hook for interactive previews (e.g. icon gallery copy).
     * Receives the preview root inside the shadow host. May return a disposer.
     */
    enhance?: WebPreviewEnhance;
};

export type VuePreviewSourceDefinition = Omit<CodeBlockTabInput, 'code'> & {
    code?: string;
    kind: 'vue';
    /** Returns a Vue VNode tree mounted inside the preview shadow host. */
    render: () => VNode;
    source?: boolean | string;
};

export type PreviewSourceDefinition =
    | ReactPreviewSourceDefinition
    | WebPreviewSourceDefinition
    | VuePreviewSourceDefinition;

function parseHighlightInput(input: HighlightInput) {
    if (!input) {
        return [];
    }

    if (Array.isArray(input)) {
        return input
            .map((line) => Number.parseInt(String(line), 10))
            .filter((line) => Number.isFinite(line) && line > 0);
    }

    const trimmed = input.trim();

    if (!trimmed) {
        return [];
    }

    try {
        const parsed = JSON.parse(trimmed);

        if (Array.isArray(parsed)) {
            return parsed
                .map((line) => Number.parseInt(String(line), 10))
                .filter((line) => Number.isFinite(line) && line > 0);
        }
    } catch {
        // Fall through to range parsing.
    }

    return trimmed
        .replaceAll(/^\[|\]$/g, '')
        .split(',')
        .flatMap((part) => {
            const value = part.trim();

            if (!value) {
                return [];
            }

            if (value.includes('-')) {
                const [start, end] = value.split('-').map((segment) => Number.parseInt(segment.trim(), 10));

                if (!Number.isFinite(start) || !Number.isFinite(end)) {
                    return [];
                }

                const low = Math.min(start, end);
                const high = Math.max(start, end);

                return Array.from({ length: high - low + 1 }, (_, index) => low + index);
            }

            const line = Number.parseInt(value, 10);
            return Number.isFinite(line) && line > 0 ? [line] : [];
        });
}

export function normalizeCodeBlock(input: CodeBlockTabInput & {
    key: string;
    render?: (() => ReactElement) | (() => VNode);
    html?: string;
    layout?: WebPreviewLayout;
    kind?: 'react' | 'web' | 'vue';
    enhance?: WebPreviewEnhance;
}) {
    const language = input.language ?? (input.html ? 'html' : input.kind === 'vue' ? 'ts' : 'tsx');
    const headerLabel = input.filename ?? input.title ?? input.label ?? 'Code example';
    const tabLabel = input.label ?? input.filename ?? input.title ?? headerLabel;
    const kind = input.kind ?? (input.html ? 'web' : input.render ? 'react' : undefined);
    const isVue = kind === 'vue';

    return {
        key: input.key,
        tabLabel,
        headerLabel,
        icon: input.icon,
        language,
        code: input.code,
        lines: input.lines ?? false,
        wrap: input.wrap ?? false,
        highlightLines: parseHighlightInput(input.highlight),
        note: input.note,
        render: isVue ? undefined : input.render as (() => ReactElement) | undefined,
        vueRender: isVue ? input.render as (() => VNode) | undefined : undefined,
        html: input.html,
        layout: input.layout,
        kind,
        enhance: input.enhance,
    } satisfies NormalizedCodeBlock;
}

export function resolveCodeBlocks(source: CodeBlockSource) {
    if (source.tabs?.length) {
        return source.tabs.map((tab, index) => normalizeCodeBlock({
            ...tab,
            key: `tab-${index}`,
        }));
    }

    if (!source.code) {
        return [] as NormalizedCodeBlock[];
    }

    return [normalizeCodeBlock({
        key: 'code',
        title: source.title,
        filename: source.filename,
        icon: source.icon,
        language: source.language,
        code: source.code,
        lines: source.lines,
        wrap: source.wrap,
        highlight: source.highlight,
        note: source.note,
    })];
}
