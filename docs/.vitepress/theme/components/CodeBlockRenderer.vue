<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { codeToTokens } from 'shiki';
import type { NormalizedCodeBlock } from './codeBlocks';

const props = withDefaults(defineProps<{
    blocks: NormalizedCodeBlock[];
    activeIndex: number;
    joined?: boolean;
    collapsible?: boolean;
}>(), {
    joined: false,
    collapsible: false,
});

const emit = defineEmits<{
    'update:activeIndex': [index: number];
}>();

const copied = ref(false);
const highlightedCode = ref('');
const expanded = ref(false);

const activeBlock = computed(() => props.blocks[props.activeIndex] ?? null);
const renderedBlock = computed(() => {
    if (!activeBlock.value) {
        return null;
    }

    return prepareRenderedBlock(activeBlock.value);
});
const hasTabs = computed(() => props.blocks.length > 1);
const showHeader = computed(() => hasTabs.value || !props.joined);
const showInlineActions = computed(() => !props.joined);
const showOverlayActions = computed(() => props.joined && (!props.collapsible || expanded.value));
const showRevealAction = computed(() => props.collapsible && !expanded.value);
const codeLanguageClass = computed(() => {
    return renderedBlock.value ? `language-${renderedBlock.value.language}` : '';
});
const codeBlockClasses = computed(() => {
    return [
        'component-code-block__code',
        codeLanguageClass.value,
        renderedBlock.value?.lines ? 'component-code-block__code--lines' : '',
        renderedBlock.value?.wrap ? 'component-code-block__code--wrap' : '',
    ].filter(Boolean);
});
const headerIconIsImage = computed(() => {
    if (!activeBlock.value?.icon) {
        return false;
    }

    return /^(?:https?:)?\/\//.test(activeBlock.value.icon)
        || activeBlock.value.icon.startsWith('/')
        || activeBlock.value.icon.startsWith('data:')
        || /\.[a-z0-9]+$/i.test(activeBlock.value.icon);
});

let copyTimer: ReturnType<typeof setTimeout> | null = null;
let highlightRequestId = 0;

function escapeHtml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
}

function renderToken(token: {
    content: string;
    color?: string;
    bgColor?: string;
    fontStyle?: number;
    htmlStyle?: string | Record<string, string>;
    htmlAttrs?: Record<string, string>;
}) {
    const styles: string[] = [];

    if (typeof token.htmlStyle === 'string') {
        styles.push(token.htmlStyle);
    } else if (token.htmlStyle && typeof token.htmlStyle === 'object') {
        styles.push(...Object.entries(token.htmlStyle).map(([key, value]) => `${key}:${value}`));
    } else {
        if (token.color) {
            styles.push(`color:${token.color}`);
        }

        if (token.bgColor) {
            styles.push(`background-color:${token.bgColor}`);
        }

        if (token.fontStyle) {
            if (token.fontStyle & 1) {
                styles.push('font-style:italic');
            }

            if (token.fontStyle & 2) {
                styles.push('font-weight:700');
            }

            if (token.fontStyle & 4) {
                styles.push('text-decoration:underline');
            }
        }
    }

    const attrs = Object.entries(token.htmlAttrs ?? {})
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(' ');
    const styleAttr = styles.length ? ` style="${styles.join(';')}"` : '';
    const attrsString = attrs ? ` ${attrs}` : '';

    return `<span${attrsString}${styleAttr}>${escapeHtml(token.content)}</span>`;
}

type PreparedRenderedBlock = NormalizedCodeBlock & {
    renderedCode: string;
    diffKinds: Array<'is-added' | 'is-removed' | null>;
};

function parseDiffDirective(line: string) {
    const match = line.match(/^(.*?)(?:\s(?:(?:\/\/|#|<!--|\/\*|--)\s*)\[\!code (\+\+|--)(?::(\d+))?\]\s*(?:-->|\*\/)?\s*)$/);

    if (!match) {
        return null;
    }

    return {
        code: match[1].trimEnd(),
        kind: match[2] === '++' ? 'is-added' as const : 'is-removed' as const,
        count: Number.parseInt(match[3] ?? '1', 10) || 1,
    };
}

function prepareRenderedBlock(block: NormalizedCodeBlock): PreparedRenderedBlock {
    const lines = block.code.split('\n');
    const renderedLines = [...lines];
    const diffKinds: Array<'is-added' | 'is-removed' | null> = Array.from({ length: lines.length }, () => null);

    lines.forEach((line, index) => {
        const directive = parseDiffDirective(line);

        if (!directive) {
            return;
        }

        renderedLines[index] = directive.code;

        for (let offset = 0; offset < directive.count && index + offset < diffKinds.length; offset += 1) {
            diffKinds[index + offset] = directive.kind;
        }
    });

    return {
        ...block,
        renderedCode: renderedLines.join('\n'),
        diffKinds,
    };
}

async function highlightBlock(block: PreparedRenderedBlock) {
    try {
        const result = await codeToTokens(block.renderedCode, {
            lang: block.language,
            theme: 'github-light',
        });
        const highlightedLines = new Set(block.highlightLines);

        return result.tokens.map((line, index) => {
            const lineNumber = index + 1;
            const classes = ['line'];
            const diffKind = block.diffKinds[index];

            if (diffKind) {
                classes.push(diffKind);
            }

            if (highlightedLines.has(lineNumber)) {
                classes.push('is-highlighted');
            }

            const content = line.length
                ? line.map(renderToken).join('')
                : '&nbsp;';

            return `<span class="${classes.join(' ')}" data-line-number="${lineNumber}">${content}</span>`;
        }).join('');
    } catch {
        const highlightedLines = new Set(block.highlightLines);

        return block.renderedCode.split('\n').map((line, index) => {
            const lineNumber = index + 1;
            const classes = ['line'];
            const diffKind = block.diffKinds[index];

            if (diffKind) {
                classes.push(diffKind);
            }

            if (highlightedLines.has(lineNumber)) {
                classes.push('is-highlighted');
            }

            return `<span class="${classes.join(' ')}" data-line-number="${lineNumber}">${escapeHtml(line) || '&nbsp;'}</span>`;
        }).join('');
    }
}

async function refreshHighlightedCode(block: PreparedRenderedBlock | null) {
    const requestId = ++highlightRequestId;
    const nextCode = block ? await highlightBlock(block) : '';

    if (requestId !== highlightRequestId) {
        return;
    }

    highlightedCode.value = nextCode;
}

watch(renderedBlock, async (block) => {
    await refreshHighlightedCode(block);
}, { immediate: true });

watch(activeBlock, () => {
    expanded.value = false;
});

onBeforeUnmount(() => {
    if (copyTimer) {
        clearTimeout(copyTimer);
    }
});

const copyCode = async () => {
    if (!activeBlock.value) {
        return;
    }

    await navigator.clipboard.writeText(renderedBlock.value?.renderedCode ?? activeBlock.value.code);
    copied.value = true;

    if (copyTimer) {
        clearTimeout(copyTimer);
    }

    copyTimer = setTimeout(() => {
        copied.value = false;
    }, 1500);
};

const setActiveIndex = (index: number) => {
    emit('update:activeIndex', index);
};

const expandCode = () => {
    expanded.value = true;
};
</script>

<template>
    <div v-if="activeBlock" class="component-code-block" :class="joined ? 'component-code-block--joined' : ''">
        <div
            v-if="showHeader"
            class="component-code-block__header"
            :class="!hasTabs ? 'component-code-block__header--single' : ''"
        >
            <div v-if="hasTabs" class="component-code-block__tabs" role="tablist" aria-label="Example tabs">
                <button
                    v-for="(item, index) in blocks"
                    :key="item.key"
                    type="button"
                    class="component-code-block__tab"
                    :class="index === activeIndex ? 'is-active' : ''"
                    :aria-selected="index === activeIndex"
                    role="tab"
                    @click="setActiveIndex(index)"
                >
                    {{ item.tabLabel }}
                </button>
            </div>

            <span v-else class="component-code-block__meta">
                <img
                    v-if="activeBlock.icon && headerIconIsImage"
                    :src="activeBlock.icon"
                    alt=""
                    class="component-code-block__meta-icon"
                >
                <span
                    v-else-if="activeBlock.icon"
                    class="component-code-block__meta-icon component-code-block__meta-icon--label"
                    aria-hidden="true"
                >
                    {{ activeBlock.icon }}
                </span>
                <span>{{ activeBlock.headerLabel }}</span>
            </span>

            <div v-if="showInlineActions" class="component-code-block__actions">
                <button
                    type="button"
                    class="component-code-block__copy group/copy-button"
                    :class="copied ? 'is-copied' : ''"
                    :aria-label="copied ? 'Code copied' : 'Copy code'"
                    @click="copyCode"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="component-code-block__copy-icon"
                        aria-hidden="true"
                    >
                        <path
                            d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="component-code-block__copy-icon component-code-block__copy-icon--copied"
                        aria-hidden="true"
                    >
                        <path
                            d="M4.5 9.25 7.25 12 13.5 5.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="sr-only">{{ copied ? 'Code copied' : 'Copy code' }}</span>
                </button>
            </div>
        </div>

        <div
            class="component-code-block__body"
            :class="showRevealAction ? 'component-code-block__body--collapsed' : ''"
        >
            <div v-if="showOverlayActions" class="component-code-block__overlay-actions">
                <button
                    type="button"
                    class="component-code-block__copy group/copy-button"
                    :class="copied ? 'is-copied' : ''"
                    :aria-label="copied ? 'Code copied' : 'Copy code'"
                    @click="copyCode"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="component-code-block__copy-icon"
                        aria-hidden="true"
                    >
                        <path
                            d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="component-code-block__copy-icon component-code-block__copy-icon--copied"
                        aria-hidden="true"
                    >
                        <path
                            d="M4.5 9.25 7.25 12 13.5 5.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="sr-only">{{ copied ? 'Code copied' : 'Copy code' }}</span>
                </button>
            </div>

            <pre :class="codeBlockClasses"><code :class="codeLanguageClass" v-html="highlightedCode" /></pre>

            <div v-if="showRevealAction" class="component-code-block__reveal">
                <button
                    type="button"
                    class="component-code-block__reveal-button"
                    @click="expandCode"
                >
                    View Code
                </button>
            </div>
        </div>

        <div v-if="activeBlock.note" class="component-code-block__notice">
            <strong>Note:</strong> {{ activeBlock.note }}
        </div>
    </div>
</template>
