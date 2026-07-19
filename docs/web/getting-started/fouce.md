# Reducing FOUCE

Custom elements often paint before their JavaScript and styles have loaded. That flash of unstyled markup is called a **Flash of Undefined Custom Elements** (FOUCE).

Until a `<pk-*>` tag upgrades, the browser treats it like an unknown inline element. Labels, options, and panel content can briefly appear in the wrong place, jump the layout, or be focusable before the control is ready. In the Craft control panel that is especially noticeable next to Craft’s own UI.

Plugin Kit ships a FOUCE stylesheet that hides `pk-*` elements until they register — for up to two seconds — so the page does not flash unfinished controls.

## Load the stylesheet

Import FOUCE **before** your component script runs, ideally as a render-blocking stylesheet in `<head>`. The recommended path is the aggregate stylesheet (tokens + FOUCE):

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';
```

Advanced: import the pieces separately if you need to omit FOUCE:

```ts
import '@verbb/plugin-kit-web/tokens.css';
import '@verbb/plugin-kit-web/styles/utilities/fouce.css';
```

With a Craft asset bundle, register the CSS so it loads with the page CSS, not only after your JS entry executes.

Do not rely on JavaScript alone to hide undefined elements — FOUCE CSS must beat first paint.

## Per-element (automatic)

Every known `pk-*` tag is covered automatically. The stylesheet is generated from the component registry, so it only targets Plugin Kit tags and will not hide other custom elements on the page.

No markup changes are required for this tier. Strategies differ by component:

| Strategy | Behaviour | Used for |
|----------|-----------|----------|
| **Reserve** | `visibility: hidden` until defined — keeps the layout box, removes the control from tab order | Everyday in-flow controls (inputs, buttons, …) |
| **Collapse** | `display: none` until defined — no phantom block | Out-of-flow overlays (`pk-dialog`, `pk-popup`) |
| **Trigger + overlay** | Host/trigger can reserve space; panel/default-slot children stay collapsed | `pk-dropdown-menu`, `pk-popover`, `pk-tooltip` |
| **Panel** | Host reserves space; option-list children stay collapsed (no 2s reveal for that list) | `pk-select`, `pk-combobox`, and similar listboxes |

Reserve and cloak self-heal as soon as elements register, and they reveal after **two seconds** even if registration fails — so a broken import cannot leave the UI blank forever. Collapsed overlays stay hidden if their module never loads, which is the safer default for modals and panels.

## Cloaking

Sometimes hiding each control is not enough. You may want to hide a broader wrapper — or the whole page — until every Plugin Kit descendant inside it has upgraded.

Add the `pk-cloak` class to any element, or to `<html>` for the whole page:

```html
<html class="pk-cloak">
  …
</html>
```

```html
<div class="pane pk-cloak">
  <pk-field label="Title">
    <pk-input name="title"></pk-input>
  </pk-field>
</div>
```

As soon as all `pk-*` descendants are registered, or after two seconds have elapsed, the cloaked region is shown. On the [no-build loader](./no-build-step) path, `.pk-cloak` is also removed explicitly once discovery completes.

The timeout prevents blank screens from persisting on slow networks or when a component fails to load.

## Craft control panel

In Craft CP:

1. Load `plugin-kit.css` (or `tokens.css` + `fouce.css`) through your asset bundle so they appear in `<head>`.
2. Register or load components afterward.
3. Prefer per-element FOUCE for settings screens; use `pk-cloak` only when a whole pane should stay blank until ready.

## Waiting from JavaScript

FOUCE is about **visual** readiness. If your own script reads properties, focuses elements, or attaches listeners on first load, also wait until tags are defined:

```ts
import { allDefined } from '@verbb/plugin-kit-web/plugin-kit';

await allDefined();
```

## Next steps

1. [Quick Start](./quick-start) — bundler path that loads tokens + FOUCE in the CP entry.
2. [No-Build Step](./no-build-step) — loader build where FOUCE ships inside `plugin-kit.css`.
3. [Tokens & CSS](./tokens) — design tokens and shadow DOM styling.
