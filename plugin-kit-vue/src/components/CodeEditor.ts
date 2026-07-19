import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/code-editor.js';

/** Vue facade over `<pk-code-editor>`. Behavior and styles live in the web component. */
export const CodeEditor = createPkComponent({
    name: 'PkCodeEditor',
    tagName: 'pk-code-editor',
});

export const PkCodeEditorElement = CodeEditor;

export type CodeEditorProps = Record<string, unknown>;
