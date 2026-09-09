/**
 * Custom Elements Manifest — Lit sources → `custom-elements.json`.
 * Docs API tables (Attributes, Slots, Events, Methods, CSS parts/vars,
 * Custom States, Dependencies) are generated from this file via
 * `docs/scripts/generate-component-api-docs.mjs`.
 *
 * Base classes are included so form-associated attrs/methods/states
 * (name, disabled, required, :state(user-invalid), …) merge into subclass tables.
 */

/**
 * Map class-level `@cssstate` / `@dependency` JSDoc onto the declaration.
 * Open-wc’s analyzer already handles @slot / @csspart / @event / @cssproperty;
 * these two WA-style tags need a small plugin.
 */
function pkJsdocExtrasPlugin() {
    return {
        name: 'pk-jsdoc-extras',
        analyzePhase({ ts, node, moduleDoc }) {
            if (!ts.isClassDeclaration(node)) {
                return;
            }

            const className = node.name?.getText();
            if (!className) {
                return;
            }

            const classDoc = moduleDoc.declarations?.find(
                (d) => d.kind === 'class' && d.name === className,
            );
            if (!classDoc) {
                return;
            }

            const cssStates = [];
            const dependencies = [];

            for (const jsDoc of node.jsDoc ?? []) {
                for (const tag of jsDoc.tags ?? []) {
                    const tagName = tag.tagName?.getText?.() ?? '';
                    const comment = typeof tag.comment === 'string'
                        ? tag.comment.trim()
                        : (tag.comment ?? []).map((c) => c.text ?? '').join('').trim();

                    if (tagName === 'cssstate') {
                        // `@cssstate name - description` (name may include hyphens: user-invalid)
                        const match = comment.match(/^([\w-]+)\s*[-—–]\s*([\s\S]*)$/);
                        if (match) {
                            cssStates.push({
                                name: match[1],
                                description: (match[2] ?? '').trim(),
                            });
                        }
                    }

                    if (tagName === 'dependency') {
                        // `@dependency pk-spinner - optional description`
                        const match = comment.match(/^([\w-]+)(?:\s*[-—–]\s*([\s\S]*))?$/);
                        if (match) {
                            dependencies.push({
                                name: match[1],
                                description: (match[2] ?? '').trim(),
                            });
                        }
                    }
                }
            }

            if (cssStates.length) {
                classDoc.cssStates = cssStates;
            }
            if (dependencies.length) {
                classDoc.dependencies = dependencies;
            }
        },
    };
}

export default {
    globs: [
        'src/components/**/pk-*.ts',
        'src/base/**/*.ts',
    ],
    exclude: [
        'src/components/**/*.styles.ts',
        'src/components/**/*.test.ts',
        'src/components/**/*.stories.ts',
    ],
    outdir: '.',
    litelement: true,
    // Keep package.json `customElements` field in sync for tooling consumers.
    packagejson: true,
    plugins: [pkJsdocExtrasPlugin()],
};
