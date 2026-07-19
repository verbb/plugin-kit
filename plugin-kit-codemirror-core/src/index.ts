export {
    CODE_EDITOR_LINE_HEIGHT_PX,
    computeCodeEditorMinHeight,
} from './constants.js';
export type { CodeEditorLanguage } from './constants.js';

export {
    createCodeEditorExtensions,
} from './extensions.js';
export type { CreateCodeEditorExtensionsOptions } from './extensions.js';

export {
    createLanguageExtension,
    languageUsesSyntaxHelpers,
} from './languages.js';
export {
    CODE_EDITOR_ACTIVE_LINE_BG,
    CODE_EDITOR_CHROME_BG,
    CODE_EDITOR_GUTTER_BG,
    CODE_EDITOR_GUTTER_BORDER,
    CODE_EDITOR_GUTTER_TEXT_COLOR,
    CODE_EDITOR_SELECTION_BG,
    CODE_EDITOR_SURFACE_BG,
    CODE_EDITOR_TEXT_COLOR,
    codeEditorTheme,
} from './theme.js';

export { CodeMirrorHost } from './host.js';
export type { CodeMirrorHostMountOptions } from './host.js';
