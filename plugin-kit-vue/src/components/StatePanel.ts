import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/state-panel.js';

/** Vue facade over `<pk-state-panel>`. Behaviour and styles live in the web component. */
export const StatePanel = createPkComponent({
    name: 'PkStatePanel',
    tagName: 'pk-state-panel',
});

export const PkStatePanelElement = StatePanel;

export type StatePanelProps = Record<string, unknown>;
