import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/textarea.js';

/** Vue facade over `<pk-textarea>`. Behavior and styles live in the web component. */
export const Textarea = createPkComponent({
    name: 'PkTextarea',
    tagName: 'pk-textarea',
});

export const PkTextareaElement = Textarea;

export type TextareaProps = Record<string, unknown>;
