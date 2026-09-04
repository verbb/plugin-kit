/**
 * Lit decorators with Plugin Kit’s idempotent `@customElement`.
 *
 * Components must import `customElement` from here — not `lit/decorators.js`.
 * The lib build externalises `lit`, so a Vite alias on
 * `@lit/reactive-element/decorators/custom-element.js` never reaches consumers;
 * each plugin would otherwise call Lit’s bare `customElements.define` and throw
 * when two Plugin Kit bundles share a Craft CP page.
 */
export { eventOptions, property, query, queryAll, queryAsync, state, } from 'lit/decorators.js';
export { customElement } from './internal/safe-custom-element.js';
//# sourceMappingURL=decorators.d.ts.map