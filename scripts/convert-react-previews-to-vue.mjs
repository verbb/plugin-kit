#!/usr/bin/env node
/**
 * One-shot converter: docs/react/components/examples/*.preview.tsx
 * → docs/vue/components/examples/*.preview.vue.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parser from '@babel/parser';
import _generate from '@babel/generator';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';

const generate = _generate.default ?? _generate;
const traverse = _traverse.default ?? _traverse;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const reactDir = path.join(repoRoot, 'docs/react/components/examples');
const vueDir = path.join(repoRoot, 'docs/vue/components/examples');

const SKIP_IMPORTS = new Set(['CheckboxInput', 'ComboboxInput', 'SelectInput']);

/** @type {Map<string, string>} */
const refState = new Map();

function shouldSkip(content) {
    const importMatch = content.match(
        /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]@verbb\/plugin-kit-react\/components['"]/,
    );
    if (!importMatch) return false;
    const names = importMatch[1]
        .split(',')
        .map((part) => part.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]);
    return names.some((name) => SKIP_IMPORTS.has(name));
}

function parseModule(code) {
    return parser.parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    });
}

function gen(node) {
    return generate(node, { retainLines: false, compact: false, jsescOption: { minimal: true } }).code;
}

function isJsxComponentName(name) {
    return /^[A-Z]/.test(name) || name.includes('.');
}

function jsxNameToString(nameNode) {
    if (t.isJSXIdentifier(nameNode)) return nameNode.name;
    if (t.isJSXMemberExpression(nameNode)) return gen(nameNode);
    return 'Fragment';
}

function propKey(name) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)
        ? t.identifier(name)
        : t.stringLiteral(name);
}

function convertJsxAttribute(attr) {
    if (t.isJSXSpreadAttribute(attr)) {
        return t.spreadElement(attr.argument);
    }
    const keyName = t.isJSXIdentifier(attr.name)
        ? attr.name.name === 'className'
            ? 'class'
            : attr.name.name
        : gen(attr.name);
    const key = propKey(keyName);

    if (!attr.value) {
        return t.objectProperty(key, t.booleanLiteral(true));
    }
    if (t.isStringLiteral(attr.value)) {
        return t.objectProperty(key, attr.value);
    }
    if (t.isJSXExpressionContainer(attr.value)) {
        return t.objectProperty(key, attr.value.expression);
    }
    return null;
}

function normalizeText(text) {
    const trimmed = text.replace(/^\s+|\s+$/g, '');
    if (!trimmed) return null;
    return t.stringLiteral(trimmed);
}

function convertJsxChildren(children) {
    const nodes = [];
    for (const child of children) {
        if (t.isJSXText(child)) {
            const lit = normalizeText(child.value);
            if (lit) nodes.push(lit);
            continue;
        }
        if (t.isJSXExpressionContainer(child)) {
            if (t.isJSXEmptyExpression(child.expression)) continue;
            nodes.push(child.expression);
            continue;
        }
        if (t.isJSXElement(child) || t.isJSXFragment(child)) {
            nodes.push(convertJsxElement(child));
        }
    }
    return nodes;
}

function buildChildrenArg(name, childNodes) {
    if (childNodes.length === 0) return null;

    const isComponent = isJsxComponentName(name);

    if (childNodes.length === 1 && t.isStringLiteral(childNodes[0])) {
        if (isComponent) {
            return t.arrowFunctionExpression([], childNodes[0]);
        }
        return childNodes[0];
    }

    const array = t.arrayExpression(childNodes);

    if (isComponent) {
        return t.arrowFunctionExpression([], array);
    }
    return array;
}

function convertJsxElement(element) {
    if (t.isJSXFragment(element)) {
        const children = convertJsxChildren(element.children);
        if (children.length === 1) return children[0];
        return t.arrayExpression(children);
    }

    const name = jsxNameToString(element.openingElement.name);
    const props = [];
    for (const attr of element.openingElement.attributes) {
        const converted = convertJsxAttribute(attr);
        if (converted) props.push(converted);
    }

    const propsArg =
        props.length === 0
            ? t.nullLiteral()
            : t.objectExpression(props.filter((p) => t.isObjectProperty(p) || t.isSpreadElement(p)));

    const tagArg = isJsxComponentName(name) ? t.identifier(name) : t.stringLiteral(name);
    const childNodes = convertJsxChildren(element.children);
    const args = [tagArg, propsArg];
    const childrenArg = buildChildrenArg(name, childNodes);
    if (childrenArg) args.push(childrenArg);

    return t.callExpression(t.identifier('h'), args);
}

function transformUseState(pathNode) {
    const decl = pathNode.node;
    if (!decl.init || !t.isCallExpression(decl.init)) return;
    if (!t.isIdentifier(decl.init.callee, { name: 'useState' })) return;

    const id = decl.id;
    if (!t.isArrayPattern(id) || id.elements.length !== 2) return;
    const stateId = id.elements[0];
    const setterId = id.elements[1];
    if (!t.isIdentifier(stateId) || !t.isIdentifier(setterId)) return;

    refState.set(stateId.name, setterId.name);
    decl.id = stateId;
    decl.init.callee = t.identifier('ref');
}

function transformSetterReferences(pathNode) {
    const node = pathNode.node;
    if (!t.isIdentifier(node)) return;
    const setterName = node.name;
    for (const [state, mappedSetter] of refState.entries()) {
        if (setterName !== mappedSetter) continue;
        if (t.isCallExpression(pathNode.parent) && pathNode.parent.callee === node) return;
        pathNode.replaceWith(
            t.arrowFunctionExpression(
                [t.identifier('next')],
                t.blockStatement([
                    t.expressionStatement(
                        t.assignmentExpression(
                            '=',
                            t.memberExpression(t.identifier(state), t.identifier('value')),
                            t.identifier('next'),
                        ),
                    ),
                ]),
            ),
        );
        break;
    }
}

function transformStateReads(pathNode) {
    const node = pathNode.node;
    if (!t.isIdentifier(node)) return;
    if (!refState.has(node.name)) return;

    const parent = pathNode.parent;
    if (t.isVariableDeclarator(parent) && parent.id === node) return;
    if (t.isArrayPattern(parent)) return;
    if (t.isObjectProperty(parent) && parent.key === node) return;
    if (t.isMemberExpression(parent) && parent.property === node && t.isIdentifier(parent.property, { name: 'value' })) return;
    if (t.isMemberExpression(parent) && parent.object === node && t.isIdentifier(parent.property, { name: 'value' })) return;
    if (t.isUpdateExpression(parent) && parent.argument === node) return;
    if (t.isAssignmentExpression(parent) && parent.left === node) return;
    if (t.isFunctionExpression(parent) && parent.params.includes(node)) return;
    if (t.isArrowFunctionExpression(parent) && parent.params.includes(node)) return;

    pathNode.replaceWith(t.memberExpression(t.identifier(node.name), t.identifier('value')));
}

function transformJsxInFunction(pathNode) {
    const body = pathNode.node.body;
    if (t.isJSXElement(body) || t.isJSXFragment(body)) {
        pathNode.node.body = convertJsxElement(body);
        return;
    }
    if (!t.isBlockStatement(body)) return;

    for (const stmt of body.body) {
        if (!t.isReturnStatement(stmt) || !stmt.argument) continue;
        if (t.isJSXElement(stmt.argument) || t.isJSXFragment(stmt.argument)) {
            stmt.argument = convertJsxElement(stmt.argument);
        }
    }
}

function transformModule(source) {
    refState.clear();
    const ast = parseModule(source);

    traverse(ast, {
        ImportDeclaration(importPath) {
            const src = importPath.node.source.value;
            if (src === 'react') {
                const specifiers = [];
                for (const s of importPath.node.specifiers) {
                    if (!t.isImportSpecifier(s)) continue;
                    const imported = s.imported.name;
                    if (['useEffect', 'useMemo', 'useRef', 'useCallback'].includes(imported)) continue;
                    if (imported === 'useState') {
                        specifiers.push(t.importSpecifier(t.identifier('ref'), t.identifier('ref')));
                        continue;
                    }
                    specifiers.push(s);
                }
                if (specifiers.length === 0) {
                    importPath.remove();
                    return;
                }
                importPath.node.specifiers = specifiers;
                importPath.node.source.value = 'vue';
                return;
            }
            if (src === '@verbb/plugin-kit-react/components') {
                importPath.node.source.value = '@verbb/plugin-kit-vue/components';
                return;
            }
            if (src.includes('@verbb/plugin-kit-react')) {
                importPath.node.source.value = src.replace('@verbb/plugin-kit-react', '@verbb/plugin-kit-vue');
            }
        },
        VariableDeclarator: transformUseState,
        CallExpression(pathNode) {
            const node = pathNode.node;
            if (!t.isCallExpression(node) || !t.isIdentifier(node.callee)) return;
            const setter = node.callee.name;
            for (const [state, setterName] of refState.entries()) {
                if (setter !== setterName) continue;
                if (node.arguments.length === 1) {
                    pathNode.replaceWith(
                        t.assignmentExpression(
                            '=',
                            t.memberExpression(t.identifier(state), t.identifier('value')),
                            node.arguments[0],
                        ),
                    );
                }
                break;
            }
        },
        Identifier(pathNode) {
            transformSetterReferences(pathNode);
            transformStateReads(pathNode);
        },
        FunctionDeclaration: transformJsxInFunction,
        FunctionExpression: transformJsxInFunction,
        ArrowFunctionExpression: transformJsxInFunction,
    });

    return gen(ast);
}

function extractPreviewMeta(source) {
    const previewBlock = source.match(/const preview:[\s\S]*?};/m)?.[0] ?? source;
    const label = previewBlock.match(/label:\s*['"]([^'"]+)['"]/)?.[1] ?? 'Example';
    const title = previewBlock.match(/title:\s*['"]([^'"]+)['"]/)?.[1] ?? `${label} example`;
    const codeMatch = previewBlock.match(/code:\s*(['"`])([\s\S]*?)\1/);
    const code = codeMatch?.[2];
    const hasRowStyle = /style=\{rowStyle\}/.test(source);
    const hasStackStyle = /style=\{stackStyle\}/.test(source);
    return { label, title, code, hasRowStyle, hasStackStyle };
}

function buildOutput(source) {
    const regionMatch = source.match(/\/\/ #region example([\s\S]*?)\/\/ #endregion example/);
    if (!regionMatch) throw new Error('Missing #region example');
    const region = regionMatch[1].trim();

    const fnName = region.match(/export function (\w+)/)?.[1];
    if (!fnName) throw new Error('Missing exported example function');

    const regionStart = source.indexOf('// #region example');
    let helpers = source.slice(0, regionStart).trim();
    helpers = helpers
        .replace(/^import\s+\{[^}]+\}\s+from\s+['"]\.\/exampleStyles['"];\s*/gm, '')
        .replace(/^import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]*codeBlocks['"];\s*/gm, '')
        .replace(/^import\s+\{[^}]+\}\s+from\s+['"]react['"];\s*/gm, '');
    const meta = extractPreviewMeta(source);

    const combined = [helpers, region].filter(Boolean).join('\n\n');
    let transformed = transformModule(combined);

    transformed = transformed.replace(
        /import type \{ PkStatusVariant \} from '@verbb\/plugin-kit-vue\/components';/g,
        "import type { PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';",
    );
    transformed = transformed.replace(
        /^import\s+type\s+\{[^}]+\}\s+from\s+['"][^'"]*codeBlocks['"];\s*/gm,
        '',
    );
    transformed = transformed.replace(
        /^import\s+\{[^}]+\}\s+from\s+['"]\.\/exampleStyles['"];\s*/gm,
        '',
    );

    const needsRef = /\bref\(/.test(transformed);
    const needsH = /\bh\(/.test(transformed);

    const vueImports = [];
    if (needsH) vueImports.push('h');
    if (needsRef) vueImports.push('ref');
    const vueImportLine = vueImports.length ? `import { ${vueImports.join(', ')} } from 'vue';\n` : '';

    // Remove duplicate vue imports inside transformed block
    transformed = transformed.replace(/^import \{[^}]+\} from ['"]vue['"];\n/gm, '');
    transformed = transformed.replace(/@verbb\/plugin-kit-react/g, '@verbb/plugin-kit-vue');

    const styleImport = meta.hasRowStyle
        ? "import { rowStyle } from './exampleStyles';"
        : meta.hasStackStyle
          ? "import { stackStyle } from './exampleStyles';"
          : '';

    const renderBody = meta.hasRowStyle
        ? `h('div', { style: rowStyle }, [${fnName}()])`
        : meta.hasStackStyle
          ? `h('div', { style: stackStyle }, [${fnName}()])`
          : `${fnName}()`;

    const codeField = meta.code ? `\n    code: ${JSON.stringify(meta.code)},` : '';

    return [
        vueImportLine.trimEnd(),
        "import type { VuePreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';",
        styleImport,
        '',
        '// #region example',
        transformed.trim(),
        '// #endregion example',
        '',
        'const preview: VuePreviewSourceDefinition = {',
        `    label: ${JSON.stringify(meta.label)},`,
        `    title: ${JSON.stringify(meta.title)},`,
        "    language: 'ts',",
        "    kind: 'vue',",
        "    source: true,",
        codeField,
        `    render: () => ${renderBody},`,
        '};',
        '',
        'export default preview;',
        '',
    ]
        .filter((line, index, arr) => !(line === '' && arr[index - 1] === ''))
        .join('\n');
}

function main() {
    fs.mkdirSync(vueDir, { recursive: true });

    const files = fs.readdirSync(reactDir).filter((f) => f.endsWith('.preview.tsx'));
    const created = [];
    const skipped = [];

    for (const file of files) {
        const srcPath = path.join(reactDir, file);
        const content = fs.readFileSync(srcPath, 'utf8');
        const outName = file.replace('.preview.tsx', '.preview.vue.ts');
        const outPath = path.join(vueDir, outName);

        if (shouldSkip(content)) {
            skipped.push({ file, reason: 'Uses CheckboxInput, ComboboxInput, or SelectInput (not exported from Vue)' });
            continue;
        }

        try {
            fs.writeFileSync(outPath, buildOutput(content), 'utf8');
            created.push(outName);
        } catch (error) {
            skipped.push({ file, reason: error instanceof Error ? error.message : String(error) });
        }
    }

    console.log(JSON.stringify({ created: created.length, skipped }, null, 2));
}

main();
