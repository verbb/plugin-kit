/**
 * Per-component FOUCE strategy.
 *
 * Three buckets, all keyed off `:not(:defined)`:
 *
 * - COLLAPSE — the whole element renders OUT of the normal flow when defined
 *   (modals, positioned popups — `display: contents` / `position: fixed`), so
 *   while undefined it's `display: none`: no phantom block, and its slotted
 *   content can't dump into the flow before it upgrades.
 *
 * - TRIGGER_OVERLAY — an in-flow trigger PLUS overlay panel content that only
 *   shows on interaction (`slot="trigger"` + a default slot for the panel). The
 *   host itself is not hidden; the trigger can keep its natural space, while
 *   non-trigger (panel) children are collapsed so we don't reserve space for
 *   hidden panel content — that would reserve a wrong-sized box
 *   and shift the layout on upgrade.
 *
 * - Everything else (RESERVE) stays in the flow and is hidden with `visibility`,
 *   which reserves its space (no layout shift on upgrade) and removes it from the
 *   tab order / a11y tree until it's ready.
 *
 * Single source of truth — consumed by `scripts/generate-fouce-css.ts` (build)
 * and the dev FOUCE lab (`dev/fouce.ts`). Browser-safe: data only, no imports.
 */
export const FOUCE_COLLAPSE_TAGS: readonly string[] = ['pk-dialog', 'pk-popup'];

/**
 * In-flow trigger + interaction-only overlay panel. Leave the host visible so the
 * trigger can reserve space, and collapse the panel content (default-slot
 * children) while undefined.
 */
export const FOUCE_TRIGGER_OVERLAY_TAGS: readonly string[] = ['pk-dropdown-menu', 'pk-popover', 'pk-tooltip'];

/**
 * Listbox-style controls (a trigger the component renders in its shadow root, plus
 * a default slot holding the option list). The host stays in the RESERVE bucket so
 * its control box keeps space, but the default-slot children (the options) are
 * collapsed with `display: none`.
 *
 * Unlike RESERVE's `visibility: hidden`, this collapse has no 2s safety reveal, so
 * the raw option list can never dump into the flow — even if registration is slow
 * or fails. Named-slot decorations (`[slot]`) are left alone.
 */
export const FOUCE_PANEL_TAGS: readonly string[] = ['pk-select', 'pk-combobox', 'pk-time-picker', 'pk-checkbox-select'];
