# CSS setup

This package ships its own CSS, and your app needs that CSS loaded before the components will look right.

One of the first styling decisions you need to make is whether your React app should render in the normal page DOM or inside a shadow root.

There is no universally correct choice here. Both approaches are valid. The important thing is understanding the tradeoff:

- the normal page DOM is simpler and easier to start with
- Shadow DOM gives you stronger style isolation

## The easy option: normal DOM

The easiest setup is to render your app into a normal page element and import the package stylesheet once in your entry file.

That means your React app lives in the same page styling environment as the rest of the Craft control panel.

For example:

```ts
import '@verbb/plugin-kit-react/style.css';
```

If you are new to this setup, this is the best place to start.

It means:

- your app works like a normal part of the page
- your CSS can be loaded normally
- you do not need any extra style-injection setup

Use the normal DOM when:

- you want the easiest possible setup
- your screen is relatively small
- you are still proving out the PHP-to-React integration
- you are happy for your app styles and Craft's styles to share the same page

## Why you might want Shadow DOM

Shadow DOM creates a styling boundary around your app.

In plain terms, it helps keep:

- Craft's CSS from bleeding into your React app
- your React app's CSS from bleeding back into the rest of the Craft control panel

That is useful when your app is more self-contained, or when you want stronger confidence that styles will not clash.

This can be especially helpful if your consumer app wants to use something like Tailwind, where global utilities, resets, or preflight styles may otherwise interfere with Craft's CP styles.

Use Shadow DOM when:

- Craft's existing CSS is interfering with your UI
- your own app CSS is interfering with the rest of the control panel
- you are building a larger, more self-contained React surface
- you want styles to feel more scoped or siloed
- you want a safer boundary between your frontend stack and Craft's CP chrome

Nothing is wrong with either approach. Shadow DOM is not "better" in every case. It just solves a different problem.

The tradeoff is that Shadow DOM needs more setup. Global page styles do not automatically cross into a shadow root, so you must inject the CSS inside that shadow tree yourself.

## Loading CSS in Shadow DOM

When you render inside a shadow root, import the package CSS as text and inject it:

```ts
import pluginKitStyles from '@verbb/plugin-kit-react/style.css?inline';
```

Then add that CSS to the shadow root:

```ts
const shadowRoot = container.attachShadow({ mode: 'open' });
const style = document.createElement('style');

style.textContent = pluginKitStyles;
shadowRoot.append(style);
```

If your own app has custom CSS too, treat it the same way and inject that into the same shadow root.

```ts
import pluginKitStyles from '@verbb/plugin-kit-react/style.css?inline';
import appStyles from './app.css?inline';

const shadowRoot = container.attachShadow({ mode: 'open' });

for (const cssText of [pluginKitStyles, appStyles]) {
  const style = document.createElement('style');
  style.textContent = cssText;
  shadowRoot.append(style);
}
```

## Which option should you choose?

If you are unsure, use this rule of thumb:

- choose the normal DOM for your first implementation
- choose **Shadow DOM** when you have a clear styling-isolation problem to solve

That keeps the first milestone small. You can always move a working normal-DOM app into Shadow DOM later.

## Tailwind and your own app styles

This package ships prebuilt CSS, so you do not need to compile the package itself.

If your own app also uses Tailwind, that is fine. The main thing to remember is:

- in the normal DOM, your styles and Craft's styles share one page
- in Shadow DOM, your styles only apply inside the shadow root unless you inject them there

So if your app wants to bring in a more opinionated styling system, Shadow DOM is often the safer long-term option. If your app is smaller and closer to Craft's native styling model, the normal DOM is often perfectly fine.

## Next steps

1. If the screen still is not rendering correctly, read [Testing and debugging](./testing-and-debugging.md).
