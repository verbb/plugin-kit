import type { Editor, Extensions } from '@tiptap/core';

export type TiptapDocumentSurface = 'editor' | 'content';

export type TiptapExtensionFactory = () => Extensions[number];

export type TiptapExtensionRegistration = {
    id: string;
    extension: Extensions[number] | TiptapExtensionFactory;
    /** Document surfaces that receive the extension. Defaults to both. */
    surfaces?: TiptapDocumentSurface[];
};

/** Framework-neutral icon data rendered through Plugin Kit's escaping icon helper. */
export type TiptapToolbarIcon = {
    readonly width: number;
    readonly height: number;
    readonly path: string;
};

export type TiptapToolbarControl = {
    id: string;
    label: string;
    icon?: TiptapToolbarIcon;
    run: (editor: Editor) => boolean | void;
    isActive?: (editor: Editor) => boolean;
    isVisible?: (editor: Editor) => boolean;
};

type StoredExtensionRegistration = {
    id: string;
    factory: TiptapExtensionFactory;
    extensionName: string;
    surfaces: ReadonlySet<TiptapDocumentSurface>;
};

const CORE_EXTENSION_NAMES = new Set([
    'backgroundColor',
    'blockquote',
    'bold',
    'bulletList',
    'code',
    'codeBlock',
    'color',
    'doc',
    'document',
    'dropCursor',
    'fontFamily',
    'fontSize',
    'fontVariantCaps',
    'gapCursor',
    'hardBreak',
    'heading',
    'highlight',
    'history',
    'horizontalRule',
    'italic',
    'link',
    'listItem',
    'lineHeight',
    'orderedList',
    'paragraph',
    'strike',
    'subscript',
    'superscript',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
    'text',
    'textAlign',
    'textStyle',
    'textStyleKit',
    'underline',
    'undoRedo',
    'variableTag',
]);

const STOCK_TOOLBAR_CONTROL_IDS = new Set([
    'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
    'small-caps', 'font-family', 'font-size', 'text-color', 'line-height',
    'unordered-list', 'ordered-list', 'blockquote', 'highlight', 'code',
    'code-block', 'hr', 'line-break', 'align-left', 'align-center', 'align-right',
    'align-justify', 'clear-format', 'undo', 'redo', 'link', 'table', 'variableTag',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'paragraph',
]);

const extensionRegistrations = new Map<string, StoredExtensionRegistration>();
const extensionNames = new Map<string, string>();
const toolbarControls = new Map<string, TiptapToolbarControl>();

function validateId(id: string, kind: string): void {
    if (!id || id !== id.trim() || id === '|' || id === 'separator') {
        throw new Error(`Tiptap ${kind} id must be a non-empty, trimmed identifier.`);
    }
}

function getExtensionName(extension: unknown, id: string): string {
    if (!extension || typeof extension !== 'object' || !('name' in extension)) {
        throw new Error(`Tiptap extension "${id}" factory must return an extension with a schema name.`);
    }

    const { name } = extension;

    if (typeof name !== 'string' || !name) {
        throw new Error(`Tiptap extension "${id}" factory must return an extension with a schema name.`);
    }

    return name;
}

/**
 * Register a document extension before mounting a Plugin Kit editor or renderer.
 * Core schema names cannot be replaced because stored JSON must remain portable.
 */
export function registerTiptapExtension(registration: TiptapExtensionRegistration): () => void {
    const { id, extension: extensionOrFactory } = registration;
    validateId(id, 'extension');

    if (extensionRegistrations.has(id)) {
        throw new Error(`Tiptap extension id "${id}" is already registered.`);
    }

    const initialExtension = typeof extensionOrFactory === 'function'
        ? extensionOrFactory()
        : extensionOrFactory;
    const extensionName = getExtensionName(initialExtension, id);

    if (CORE_EXTENSION_NAMES.has(extensionName)) {
        throw new Error(`Tiptap core extension "${extensionName}" cannot be replaced.`);
    }

    const existingOwner = extensionNames.get(extensionName);
    if (existingOwner) {
        throw new Error(`Tiptap extension name "${extensionName}" is already registered by "${existingOwner}".`);
    }

    const surfaces = new Set<TiptapDocumentSurface>(registration.surfaces ?? ['editor', 'content']);
    if (surfaces.size === 0 || [...surfaces].some((surface) => surface !== 'editor' && surface !== 'content')) {
        throw new Error(`Tiptap extension "${id}" must target editor, content, or both.`);
    }

    const factory = typeof extensionOrFactory === 'function'
        ? extensionOrFactory
        : () => initialExtension;

    extensionRegistrations.set(id, {
        id,
        factory,
        extensionName,
        surfaces,
    });
    extensionNames.set(extensionName, id);

    return () => {
        if (extensionRegistrations.get(id)?.extensionName === extensionName) {
            extensionRegistrations.delete(id);
            extensionNames.delete(extensionName);
        }
    };
}

export function getRegisteredTiptapExtensions(surface: TiptapDocumentSurface): Extensions {
    return [...extensionRegistrations.values()]
        .filter((registration) => registration.surfaces.has(surface))
        .map((registration) => {
            const extension = registration.factory();
            const extensionName = getExtensionName(extension, registration.id);

            if (extensionName !== registration.extensionName) {
                throw new Error(
                    `Tiptap extension factory "${registration.id}" changed its schema name from `
                    + `"${registration.extensionName}" to "${extensionName}".`,
                );
            }

            return extension;
        });
}

/** Register a stock-toolbar-compatible control without introducing a global runtime. */
export function registerTiptapToolbarControl(control: TiptapToolbarControl): () => void {
    const { id } = control;
    validateId(id, 'toolbar control');

    if (STOCK_TOOLBAR_CONTROL_IDS.has(id)) {
        throw new Error(`Tiptap stock toolbar control "${id}" cannot be replaced.`);
    }

    if (toolbarControls.has(id)) {
        throw new Error(`Tiptap toolbar control "${id}" is already registered.`);
    }

    if (!control.label.trim()) {
        throw new Error(`Tiptap toolbar control "${id}" must have a label.`);
    }

    const storedControl = { ...control };
    toolbarControls.set(id, storedControl);

    return () => {
        if (toolbarControls.get(id) === storedControl) {
            toolbarControls.delete(id);
        }
    };
}

export function getRegisteredTiptapToolbarControl(id: string): TiptapToolbarControl | undefined {
    return toolbarControls.get(id);
}

export function isRegisteredTiptapToolbarControl(id: string): boolean {
    return toolbarControls.has(id);
}
