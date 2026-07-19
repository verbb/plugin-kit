import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/field.js';

/** Vue facade over `<pk-field>`. Behavior and styles live in the web component. */
export const Field = createPkComponent({
    name: 'PkField',
    tagName: 'pk-field',
});

export const PkFieldElement = Field;

export type FieldProps = Record<string, unknown>;
